import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const reviewSchema = z.object({
  artisan_id: z.string().uuid(),
  project_id: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(20).max(500).optional(),
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const validatedData = reviewSchema.parse(body);

    // Get authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authentification requise" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Utilisateur non authentifié" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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

    // Verify project exists and is closed
    const { data: project, error: projectError } = await supabaseAdmin
      .from("projects")
      .select("status, user_id")
      .eq("id", validatedData.project_id)
      .single();

    if (projectError || !project) {
      return new Response(
        JSON.stringify({ error: "Projet introuvable" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify user owns the project
    if (project.user_id !== user.id) {
      return new Response(
        JSON.stringify({ error: "Non autorisé" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert review
    const { data: review, error: insertError } = await supabaseAdmin
      .from("reviews")
      .insert({
        ...validatedData,
        user_id: user.id,
        is_moderated: false,
        is_approved: false,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      
      // Check if it's a duplicate
      if (insertError.code === '23505') {
        return new Response(
          JSON.stringify({ error: "Vous avez déjà laissé un avis pour cet artisan" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Erreur lors de l'enregistrement de votre avis" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log to audit_log
    await supabaseAdmin
      .from("audit_log")
      .insert({
        type: "review_submitted",
        payload: { review_id: review.id, artisan_id: validatedData.artisan_id },
      });

    console.log("Review submitted successfully:", review.id);

    // TODO: Send email notification to admin for moderation
    // This will be implemented when Resend email templates are ready

    return new Response(
      JSON.stringify({ success: true, review_id: review.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in submit-review function:", error);

    let userMessage = "Une erreur est survenue. Veuillez réessayer.";
    
    if (error instanceof z.ZodError) {
      userMessage = "Les données sont invalides.";
      console.error("Validation errors:", error.errors);
    }

    return new Response(
      JSON.stringify({ error: userMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
