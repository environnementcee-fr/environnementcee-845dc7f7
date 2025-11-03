import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const selectSchema = z.object({
  project_id: z.string().uuid(),
  response_id: z.string().uuid(),
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const validatedData = selectSchema.parse(body);

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

    // Get response details
    const { data: response, error: responseError } = await supabaseAdmin
      .from("responses")
      .select("*, artisan_profiles(*)")
      .eq("id", validatedData.response_id)
      .single();

    if (responseError || !response) {
      return new Response(
        JSON.stringify({ error: "Réponse introuvable" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update selected response
    await supabaseAdmin
      .from("responses")
      .update({ status: "selected" })
      .eq("id", validatedData.response_id);

    // Update other responses to not_selected
    await supabaseAdmin
      .from("responses")
      .update({ status: "not_selected" })
      .eq("project_id", validatedData.project_id)
      .neq("id", validatedData.response_id);

    // Update project status to matched
    await supabaseAdmin
      .from("projects")
      .update({ 
        status: "matched",
        contact_unlocked_for: response.artisan_profiles.user_id
      })
      .eq("id", validatedData.project_id);

    // Log to audit_log
    await supabaseAdmin
      .from("audit_log")
      .insert({
        type: "artisan_selected",
        payload: { 
          project_id: validatedData.project_id,
          response_id: validatedData.response_id,
          artisan_id: response.artisan_id
        },
      });

    console.log("Artisan selected successfully for project:", validatedData.project_id);

    // TODO: Send email notifications to both parties
    // This will be implemented when Resend email templates are ready

    return new Response(
      JSON.stringify({ 
        success: true,
        artisan_contact: {
          company_name: response.artisan_profiles.company_name,
          email: response.artisan_profiles.email,
          phone: response.artisan_profiles.phone
        }
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in select-artisan function:", error);

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
