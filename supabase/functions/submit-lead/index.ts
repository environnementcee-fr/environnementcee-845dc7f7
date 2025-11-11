import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// ==================== ELIGIBILITY CALCULATIONS ====================

type MPRCategory = 'bleu' | 'jaune' | 'violet' | 'rose';
type Region = 'idf' | 'autre';

const MPR_REVENUE_BRACKETS: Record<string, Record<MPRCategory, number>> = {
  "1_personne_idf": { bleu: 23541, jaune: 28657, violet: 40018, rose: Infinity },
  "1_personne_autre": { bleu: 17009, jaune: 21805, violet: 29148, rose: Infinity },
  "2_personnes_idf": { bleu: 34551, jaune: 42058, violet: 58827, rose: Infinity },
  "2_personnes_autre": { bleu: 24875, jaune: 31889, violet: 42848, rose: Infinity },
  "3_personnes_idf": { bleu: 41493, jaune: 50513, violet: 70382, rose: Infinity },
  "3_personnes_autre": { bleu: 29917, jaune: 38349, violet: 51592, rose: Infinity },
  "4_personnes_idf": { bleu: 48447, jaune: 58981, violet: 82839, rose: Infinity },
  "4_personnes_autre": { bleu: 34948, jaune: 44802, violet: 60336, rose: Infinity },
  "5_personnes_idf": { bleu: 55427, jaune: 67473, violet: 94844, rose: Infinity },
  "5_personnes_autre": { bleu: 40002, jaune: 51281, violet: 69081, rose: Infinity },
};

const MPR_FORFAITS: Record<string, Record<MPRCategory, number>> = {
  isolation_murs_ext: { bleu: 75, jaune: 60, violet: 40, rose: 0 },
  isolation_combles: { bleu: 25, jaune: 20, violet: 15, rose: 0 },
  isolation_toiture: { bleu: 25, jaune: 20, violet: 15, rose: 0 },
  pac_air_eau: { bleu: 5000, jaune: 4000, violet: 3000, rose: 0 },
  pac_geothermique: { bleu: 11000, jaune: 9000, violet: 5000, rose: 0 },
  chauffe_eau_thermodynamique: { bleu: 1200, jaune: 800, violet: 400, rose: 0 },
  chauffe_eau_solaire: { bleu: 4000, jaune: 3000, violet: 2000, rose: 0 },
  chaudiere_biomasse_auto: { bleu: 10000, jaune: 8000, violet: 4000, rose: 0 },
  vmc_double_flux: { bleu: 4000, jaune: 3000, violet: 2000, rose: 0 },
  fenetres: { bleu: 100, jaune: 80, violet: 40, rose: 0 },
};

function calculateMPRCategory(revenuFiscal: number, nbPersonnes: number, region: Region): MPRCategory {
  const key = `${Math.min(nbPersonnes, 5)}_${nbPersonnes === 1 ? 'personne' : 'personnes'}_${region}`;
  const brackets = MPR_REVENUE_BRACKETS[key];
  
  if (!brackets) return 'rose';
  
  if (revenuFiscal <= brackets.bleu) return 'bleu';
  if (revenuFiscal <= brackets.jaune) return 'jaune';
  if (revenuFiscal <= brackets.violet) return 'violet';
  return 'rose';
}

function isModeste(revenuFiscal: number, nbPersonnes: number, region: Region): boolean {
  const category = calculateMPRCategory(revenuFiscal, nbPersonnes, region);
  return category === 'bleu' || category === 'jaune';
}

function calculateCEEParticulier(aidType: string, surface: number, modeste: boolean, projectData?: any): number {
  if ((aidType === 'isolation' || aidType === 'isolation_toiture' || aidType === 'isolation_murs_part') && surface) {
    return surface * 12 * (modeste ? 1.2 : 1);
  }
  if (aidType === 'pac' || aidType === 'pac_part') {
    return modeste ? 4500 : 3000;
  }
  if (aidType === 'brasseur_air') {
    return 200;
  }
  if (aidType === 'fenetres_part' && projectData?.nb_fenetres) {
    const nbFenetres = parseInt(projectData.nb_fenetres);
    return nbFenetres * (modeste ? 100 : 80);
  }
  if (aidType === 'chaudiere_biomasse') {
    return modeste ? 1000 : 800;
  }
  if (aidType === 'vmc_double_flux') {
    return modeste ? 500 : 400;
  }
  if (aidType === 'cet_part') {
    return modeste ? 200 : 150;
  }
  return 0;
}

function calculateCEEProfessionnel(aidType: string, data: any): number {
  if (aidType.includes('led_entrepot') && data.fixture_count) {
    return data.fixture_count * 20;
  }
  if (aidType.includes('led_bureau') && data.fixture_count) {
    return data.fixture_count * 15;
  }
  if (aidType.includes('led_solaire') && data.fixture_count) {
    return data.fixture_count * 100;
  }
  if (aidType.includes('isolation') && data.surface) {
    return data.surface * 22;
  }
  if (aidType.includes('pac') && data.surface) {
    const puissance = (data.surface * 100) / 1000;
    return puissance * 150;
  }
  if (aidType === 'brasseur_air' && data.surface) {
    return data.surface * 5;
  }
  return 0;
}

function calculateEligibility(leadData: any): { score: number; aids: any; mprCategory?: string } {
  const aids: any = {};
  let score = 0;
  let mprCategory: MPRCategory | undefined;

  if (leadData.user_type === 'particulier') {
    // Extraire les données nécessaires
    const revenuFiscal = leadData.project_data?.revenu_fiscal || 
                        (leadData.income_bracket ? parseIncomeBracket(leadData.income_bracket) : 30000);
    const nbPersonnes = leadData.project_data?.nb_personnes || 
                       (leadData.room_count ? Math.ceil(leadData.room_count / 2) : 2);
    const region: Region = leadData.postal_code?.startsWith('75') || 
                          leadData.postal_code?.startsWith('77') ||
                          leadData.postal_code?.startsWith('78') ||
                          leadData.postal_code?.startsWith('91') ||
                          leadData.postal_code?.startsWith('92') ||
                          leadData.postal_code?.startsWith('93') ||
                          leadData.postal_code?.startsWith('94') ||
                          leadData.postal_code?.startsWith('95') ? 'idf' : 'autre';

    mprCategory = calculateMPRCategory(revenuFiscal, nbPersonnes, region);
    const modeste = isModeste(revenuFiscal, nbPersonnes, region);

    // MaPrimeRénov'
    if (mprCategory !== 'rose' && leadData.construction_year && 
        (new Date().getFullYear() - leadData.construction_year) >= 15) {
      
      let mprAmount = 0;
      
      // Isolation
      if (leadData.aid_type === 'isolation' && leadData.surface) {
        mprAmount = (MPR_FORFAITS.isolation_combles[mprCategory] || 0) * leadData.surface;
      } else if (leadData.aid_type === 'isolation_toiture' && leadData.surface) {
        mprAmount = (MPR_FORFAITS.isolation_toiture[mprCategory] || 0) * leadData.surface;
      } else if (leadData.aid_type === 'isolation_murs_part' && leadData.surface) {
        mprAmount = (MPR_FORFAITS.isolation_murs_ext[mprCategory] || 0) * leadData.surface;
      }
      
      // Pompes à chaleur
      else if (leadData.aid_type === 'pac' || leadData.aid_type === 'pac_part') {
        mprAmount = MPR_FORFAITS.pac_air_eau[mprCategory] || 0;
      }
      
      // Fenêtres
      else if (leadData.aid_type === 'fenetres_part' && leadData.project_data?.nb_fenetres) {
        const nbFenetres = parseInt(leadData.project_data.nb_fenetres);
        mprAmount = (MPR_FORFAITS.fenetres[mprCategory] || 0) * nbFenetres;
      }
      
      // Chaudière biomasse
      else if (leadData.aid_type === 'chaudiere_biomasse') {
        mprAmount = MPR_FORFAITS.chaudiere_biomasse_auto[mprCategory] || 0;
      }
      
      // VMC double flux
      else if (leadData.aid_type === 'vmc_double_flux') {
        mprAmount = MPR_FORFAITS.vmc_double_flux[mprCategory] || 0;
      }
      
      // Chauffe-eau
      else if (leadData.aid_type === 'cet_part') {
        const typeCET = leadData.project_data?.type_chauffe_eau;
        if (typeCET === 'thermodynamique') {
          mprAmount = MPR_FORFAITS.chauffe_eau_thermodynamique[mprCategory] || 0;
        } else if (typeCET === 'solaire') {
          mprAmount = MPR_FORFAITS.chauffe_eau_solaire[mprCategory] || 0;
        }
      }
      
      if (mprAmount > 0) {
        aids.mpr = mprAmount;
        score += 30;
      }
    }
    
    // Photovoltaïque - Prime à l'autoconsommation (pas de MPR mais prime spécifique)
    if (leadData.aid_type === 'pv_part') {
      const puissance = leadData.project_data?.puissance_souhaitee || 6;
      aids.prime_autoconso = {
        montant: puissance <= 3 ? 300 * puissance : puissance <= 9 ? 230 * puissance : 200 * puissance,
        description: "Prime à l'autoconsommation photovoltaïque"
      };
      aids.rachat_edf = "Rachat surplus EDF (0,13€/kWh)";
      score += 25;
    }

    // CEE Particulier
    const ceeAmount = calculateCEEParticulier(leadData.aid_type, leadData.surface || 0, modeste, leadData.project_data);
    if (ceeAmount > 0) {
      aids.cee = ceeAmount;
      score += 25;
    }

    // Éco-PTZ
    aids.ecoptz = 15000;
    score += 15;

    // TVA réduite
    aids.tva = 'Taux réduit 5,5%';
    score += 10;

  } else if (leadData.user_type === 'professionnel') {
    // CEE Professionnel
    const ceeAmount = calculateCEEProfessionnel(leadData.aid_type, {
      fixture_count: leadData.fixture_count,
      surface: leadData.surface,
      ceiling_height: leadData.ceiling_height
    });
    
    if (ceeAmount > 0) {
      aids.cee = ceeAmount;
      score += 35;
    }

    // Crédit d'impôt PME
    if (leadData.employees) {
      const effectif = parseEmployees(leadData.employees);
      if (effectif < 250) {
        aids.credit_impot_pme = '30% des travaux (max 25 000€)';
        score += 20;
      }
    }
  }

  return { score, aids, mprCategory };
}

function parseIncomeBracket(bracket: string): number {
  if (bracket.includes('20000')) return 20000;
  if (bracket.includes('30000')) return 30000;
  if (bracket.includes('40000')) return 40000;
  if (bracket.includes('50000')) return 50000;
  return 35000;
}

function parseEmployees(employees: string): number {
  if (employees.includes('10')) return 5;
  if (employees.includes('50')) return 25;
  if (employees.includes('250')) return 100;
  return 500;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schema - Universal pour tous types d'aides
const leadSchema = z.object({
  aid_type: z.enum([
    // Professionnels
    "led_entrepot", "led_bureaux", "led_ext_solaire", 
    "isolation_murs", "brasseur_air", "pac_pro", "hp_flottante",
    // Particuliers
    "pac_part", "pv_part", "isolation_toiture", "isolation_murs_part",
    "fenetres_part", "chaudiere_biomasse", "vmc_double_flux", "cet_part",
    // Anciens (rétrocompatibilité)
    "isolation", "pac", "led_bureau", "led_solaire",
    // Multi-travaux
    "multi_led_pro", "multi_particulier", "ma_prime_renov",
    // Autres
    "housse_piscine"
  ]),
  user_type: z.enum(["particulier", "professionnel"]),
  project_data: z.any().optional(),
  // Champs communs requis
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().regex(/^\+?[0-9\s\-\(\)]{6,20}$/),
  postal_code: z.string().regex(/^[0-9]{5}$/),
  consent_privacy: z.boolean().refine(val => val === true),
  consent_partner: z.boolean().default(false),
  // Champs optionnels (selon le type d'aide)
  building_type: z.string().optional(),
  surface: z.number().optional(),
  current_lighting: z.string().optional(),
  company_name: z.string().optional(),
  siren: z.string().optional(),
  employees: z.string().optional(),
  ceiling_height: z.number().optional(),
  fixture_count: z.number().optional(),
  current_fixture_type: z.string().optional(),
  zone_type: z.string().optional(),
  sun_exposure: z.string().optional(),
  lamppost_height: z.number().optional(),
  wall_material: z.string().optional(),
  insulation_type: z.string().optional(),
  construction_year: z.number().optional(),
  income_bracket: z.string().optional(),
  heating_system: z.string().optional(),
  pac_type: z.string().optional(),
  usage_type: z.string().optional(),
  room_count: z.number().optional(),
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

    // Calculate eligibility
    const eligibilityResult = calculateEligibility(validatedData);
    console.log(`Eligibility calculated: score=${eligibilityResult.score}, category=${eligibilityResult.mprCategory}`);

    // Insert lead into database using admin client (bypasses RLS)
    const { data: lead, error: insertError } = await supabaseAdmin
      .from("lead_submissions")
      .insert({
        ...validatedData,
        ...metadata,
        status: "nouveau",
        eligibility_score: eligibilityResult.score,
        estimated_aids: eligibilityResult.aids,
        mpr_category: eligibilityResult.mprCategory || null,
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
      JSON.stringify({ 
        success: true, 
        id: lead.id,
        // Retourner les résultats de calcul pour affichage immédiat
        eligibility_score: eligibilityResult.score,
        estimated_aids: eligibilityResult.aids,
        mpr_category: eligibilityResult.mprCategory || null,
      }),
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
