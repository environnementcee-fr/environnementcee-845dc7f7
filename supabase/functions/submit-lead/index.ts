import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schema
const leadSchema = z.object({
  building_type: z.string().min(1).max(100),
  surface: z.number().int().positive().max(999999),
  current_lighting: z.string().min(1).max(100),
  postal_code: z.string().regex(/^[0-9]{5}$/),
  company_name: z.string().min(1).max(200),
  siren: z.string().regex(/^[0-9]{9}$/),
  employees: z.string().min(1).max(50),
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().regex(/^\+?[0-9\s\-\(\)]{6,20}$/),
  consent_privacy: z.boolean().refine(val => val === true),
  consent_partner: z.boolean(),
});

// Simple in-memory rate limiting (IP-based)
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
    const validatedData = leadSchema.parse(body);

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
    const { data: existingLead } = await supabaseAdmin
      .from("lead_submissions")
      .select("id")
      .eq("email", validatedData.email)
      .gte("created_at", oneDayAgo)
      .maybeSingle();

    if (existingLead) {
      console.log(`Duplicate submission detected for email: ${validatedData.email}`);
      return new Response(
        JSON.stringify({ 
          error: "Une demande avec cet email a déjà été soumise récemment." 
        }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Collect metadata
    const metadata = {
      ip_address: clientIp,
      user_agent: req.headers.get("user-agent") || null,
      referrer: req.headers.get("referer") || null,
    };

    // Insert lead into database using admin client (bypasses RLS)
    const { data: lead, error: insertError } = await supabaseAdmin
      .from("lead_submissions")
      .insert({
        ...validatedData,
        ...metadata,
        status: "nouveau",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de l'enregistrement de votre demande." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Lead submitted successfully:", lead.id);

    // Call notify-new-lead function to send emails
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    supabase.functions.invoke("notify-new-lead", {
      body: lead,
    }).catch(err => console.error("Email notification failed:", err));

    return new Response(
      JSON.stringify({ success: true, id: lead.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in submit-lead function:", error);

    // Sanitize error messages for users
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
