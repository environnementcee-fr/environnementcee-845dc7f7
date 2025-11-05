import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const projectSchema = z.object({
  category: z.enum(['led', 'isolation', 'pac', 'ventilation', 'renovation_globale', 'autre']),
  description: z.string().min(120).max(2000),
  budget_band: z.enum(['<3k', '3-10k', '10-30k', '>30k']),
  urgency: z.enum(['urgent', '1-3_mois', '>3_mois']),
  photos: z.array(z.string().url()).max(5).optional(),
  zip_code: z.string().regex(/^[0-9]{5}$/),
  city: z.string().min(1).max(100),
  building_type: z.enum(['residentiel', 'tertiaire', 'copropriete']),
  area_m2: z.number().min(1).max(100000).optional(),
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().regex(/^\+?[0-9\s\-\(\)]{6,20}$/),
  consent_rgpd: z.boolean().refine(val => val === true),
});

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour
const MAX_SUBMISSIONS_PER_HOUR = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_SUBMISSIONS_PER_HOUR) {
    return false;
  }

  record.count++;
  return true;
}

// Calculate eligibility score (0-10)
function calculateEligibilityScore(data: any): number {
  let score = 0;
  
  // +2 if category is compatible
  if (['led', 'isolation', 'pac'].includes(data.category)) {
    score += 2;
  }
  
  // +2 if surface >= 50m²
  if (data.area_m2 && data.area_m2 >= 50) {
    score += 2;
  }
  
  // +2 if not urgent
  if (data.urgency !== 'urgent') {
    score += 2;
  }
  
  // +2 if residential
  if (data.building_type === 'residentiel') {
    score += 2;
  }
  
  // +2 if budget > 3k
  if (data.budget_band !== '<3k') {
    score += 2;
  }
  
  return Math.min(score, 10);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || 
                     req.headers.get("x-real-ip") || 
                     "unknown";

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          error: "Trop de demandes. Veuillez réessayer plus tard." 
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validatedData = projectSchema.parse(body);

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Check for duplicate submissions (same email within last 24 hours)
    const oneDayAgo = new Date(Date.now() - 86400000).toISOString();
    const { data: existingProject } = await supabaseAdmin
      .from("projects")
      .select("id")
      .eq("email", validatedData.email)
      .gte("created_at", oneDayAgo)
      .maybeSingle();

    if (existingProject) {
      console.log(`Duplicate submission detected for email: ${validatedData.email}`);
      return new Response(
        JSON.stringify({ 
          error: "Une demande avec cet email a déjà été soumise récemment." 
        }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Calculate eligibility score
    const eligibilityScore = calculateEligibilityScore(validatedData);

    // Insert project into database
    const { data: project, error: insertError } = await supabaseAdmin
      .from("projects")
      .insert({
        ...validatedData,
        eligibility_score: eligibilityScore,
        status: "pending_review",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de l'enregistrement de votre projet." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log to audit_log
    await supabaseAdmin
      .from("audit_log")
      .insert({
        type: "project_created",
        payload: { project_id: project.id, score: eligibilityScore },
      });

    console.log("Project submitted successfully:", project.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: project.id, 
        score: eligibilityScore 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in submit-project function:", error);

    let userMessage = "Une erreur est survenue. Veuillez réessayer.";
    
    if (error instanceof z.ZodError) {
      userMessage = "Les données du formulaire sont invalides.";
      console.error("Validation errors:", error.errors);
    }

    return new Response(
      JSON.stringify({ error: userMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
