import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { project_id } = await req.json();

    if (!project_id) {
      return new Response(
        JSON.stringify({ error: "project_id est requis" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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

    // Get project details
    const { data: project, error: projectError } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", project_id)
      .single();

    if (projectError || !project) {
      console.error("Project not found:", projectError);
      return new Response(
        JSON.stringify({ error: "Projet introuvable" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract department from zip code (first 2 digits)
    const department = project.zip_code.substring(0, 2);

    // Find matching artisans
    const { data: artisans, error: artisansError } = await supabaseAdmin
      .from("artisan_profiles")
      .select("*")
      .eq("status", "approved")
      .contains("trades", [project.category])
      .limit(5);

    if (artisansError) {
      console.error("Error finding artisans:", artisansError);
      return new Response(
        JSON.stringify({ error: "Erreur lors de la recherche d'artisans" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Filter artisans by zone (must include the department)
    const matchedArtisans = (artisans || []).filter(artisan => 
      artisan.zones.some((zone: string) => 
        zone.startsWith(department) || zone === department
      )
    );

    // Prioritize subscribed artisans
    matchedArtisans.sort((a, b) => {
      if (a.subscription_active && !b.subscription_active) return -1;
      if (!a.subscription_active && b.subscription_active) return 1;
      return 0;
    });

    // Take only top 5
    const selectedArtisans = matchedArtisans.slice(0, 5);

    console.log(`Found ${selectedArtisans.length} matching artisans for project ${project_id}`);

    // Update project status to published
    await supabaseAdmin
      .from("projects")
      .update({ status: "published" })
      .eq("id", project_id);

    // Log to audit_log
    await supabaseAdmin
      .from("audit_log")
      .insert({
        type: "project_matched",
        payload: { 
          project_id, 
          artisan_count: selectedArtisans.length,
          artisan_ids: selectedArtisans.map(a => a.id)
        },
      });

    // TODO: Send email notifications to artisans
    // This will be implemented when Resend email templates are ready

    return new Response(
      JSON.stringify({ 
        success: true, 
        matched_count: selectedArtisans.length,
        artisans: selectedArtisans.map(a => ({
          id: a.id,
          company_name: a.company_name,
          email: a.email
        }))
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Error in match-artisans function:", error);
    return new Response(
      JSON.stringify({ error: "Une erreur est survenue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
