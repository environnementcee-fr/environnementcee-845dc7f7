import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const responseSchema = z.object({
  project_id: z.string().uuid(),
  artisan_id: z.string().uuid(),
  message: z.string().min(50).max(1000),
  estimated_timeline: z.string().max(200).optional(),
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const validatedData = responseSchema.parse(body);

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

    // Verify artisan is subscribed
    const { data: artisan, error: artisanError } = await supabaseAdmin
      .from("artisan_profiles")
      .select("subscription_active")
      .eq("id", validatedData.artisan_id)
      .single();

    if (artisanError || !artisan) {
      return new Response(
        JSON.stringify({ error: "Profil artisan introuvable" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!artisan.subscription_active) {
      return new Response(
        JSON.stringify({ error: "Abonnement requis pour répondre aux projets" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert response
    const { data: response, error: insertError } = await supabaseAdmin
      .from("responses")
      .insert({
        ...validatedData,
        status: "sent",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      
      // Check if it's a duplicate
      if (insertError.code === '23505') {
        return new Response(
          JSON.stringify({ error: "Vous avez déjà répondu à ce projet" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Erreur lors de l'enregistrement de votre réponse" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log to audit_log
    await supabaseAdmin
      .from("audit_log")
      .insert({
        type: "response_submitted",
        payload: { response_id: response.id, project_id: validatedData.project_id },
      });

    console.log("Response submitted successfully:", response.id);

    // TODO: Send email notification to client
    // This will be implemented when Resend email templates are ready

    return new Response(
      JSON.stringify({ success: true, response_id: response.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in submit-response function:", error);

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
