import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Barèmes MaPrimeRénov' 2025 (revenus annuels en €)
const MPR_BAREME_IDF = {
  bleu: { 1: 23541, 2: 34551, 3: 41493, 4: 48447, 5: 55427, extra: 6984 },
  jaune: { 1: 28657, 2: 42058, 3: 50513, 4: 58981, 5: 67473, extra: 8486 },
  violet: { 1: 39192, 2: 57557, 3: 69189, 4: 80831, 5: 92454, extra: 11623 },
  rose: { 1: Infinity, 2: Infinity, 3: Infinity, 4: Infinity, 5: Infinity, extra: Infinity },
};

const MPR_BAREME_PROVINCE = {
  bleu: { 1: 17009, 2: 24875, 3: 29917, 4: 34948, 5: 40002, extra: 5045 },
  jaune: { 1: 21805, 2: 31889, 3: 38349, 4: 44802, 5: 51281, extra: 6462 },
  violet: { 1: 29148, 2: 42848, 3: 51592, 4: 60336, 5: 69081, extra: 8744 },
  rose: { 1: Infinity, 2: Infinity, 3: Infinity, 4: Infinity, 5: Infinity, extra: Infinity },
};

// Montants forfaitaires MaPrimeRénov' par catégorie (en €)
const MPR_MONTANTS = {
  pac_air_eau: { bleu: 5000, jaune: 4000, violet: 3000, rose: 0 },
  isolation_murs_ext: { bleu: 75, jaune: 60, violet: 40, rose: 0 }, // par m²
  isolation_murs_int: { bleu: 25, jaune: 20, violet: 15, rose: 0 }, // par m²
  isolation_toiture: { bleu: 25, jaune: 20, violet: 15, rose: 0 }, // par m²
  chaudiere_biomasse_auto: { bleu: 5000, jaune: 4000, violet: 2500, rose: 0 },
  vmc_double_flux: { bleu: 2500, jaune: 2000, violet: 1500, rose: 0 },
  chauffe_eau_thermo: { bleu: 1200, jaune: 800, violet: 400, rose: 0 },
  chauffe_eau_solaire: { bleu: 4000, jaune: 3000, violet: 2000, rose: 0 },
  fenetres: { bleu: 100, jaune: 80, violet: 40, rose: 0 }, // par fenêtre (si modeste uniquement)
};

// Primes CEE indicatives (en €)
const CEE_MONTANTS = {
  pac_air_eau: { standard: 800, modeste: 1000 },
  isolation_murs: { standard: 15, modeste: 20 }, // par m²
  isolation_toiture: { standard: 10, modeste: 12 }, // par m²
  chaudiere_biomasse: { standard: 800, modeste: 1000 },
  vmc_double_flux: { standard: 400, modeste: 500 },
  chauffe_eau_thermo: { standard: 150, modeste: 200 },
  led_bureaux: { standard: 30, modeste: 30 }, // par luminaire
  led_entrepot: { standard: 40, modeste: 40 }, // par luminaire
  brasseur_air: { standard: 5, modeste: 5 }, // par m² de surface chauffée
};

interface LeadData {
  aid_type: string;
  user_type: "particulier" | "professionnel";
  building_type?: string;
  postal_code: string;
  construction_year?: number;
  surface?: number;
  project_data?: any;
  income_bracket?: string;
  nb_personnes?: number;
  revenu_fiscal?: number;
  heating_system?: string;
  [key: string]: any;
}

function determineRevenuCategory(
  revenu: number,
  nbPersonnes: number,
  codePostal: string
): "bleu" | "jaune" | "violet" | "rose" {
  const isIDF = codePostal.startsWith("75") || 
                 codePostal.startsWith("77") || 
                 codePostal.startsWith("78") ||
                 codePostal.startsWith("91") || 
                 codePostal.startsWith("92") || 
                 codePostal.startsWith("93") ||
                 codePostal.startsWith("94") || 
                 codePostal.startsWith("95");

  const bareme = isIDF ? MPR_BAREME_IDF : MPR_BAREME_PROVINCE;

  const plafond = nbPersonnes <= 5 
    ? bareme.bleu[nbPersonnes as keyof typeof bareme.bleu]
    : bareme.bleu[5] + (nbPersonnes - 5) * bareme.bleu.extra;

  if (revenu <= plafond) return "bleu";

  const plafondJaune = nbPersonnes <= 5
    ? bareme.jaune[nbPersonnes as keyof typeof bareme.jaune]
    : bareme.jaune[5] + (nbPersonnes - 5) * bareme.jaune.extra;

  if (revenu <= plafondJaune) return "jaune";

  const plafondViolet = nbPersonnes <= 5
    ? bareme.violet[nbPersonnes as keyof typeof bareme.violet]
    : bareme.violet[5] + (nbPersonnes - 5) * bareme.violet.extra;

  if (revenu <= plafondViolet) return "violet";

  return "rose";
}

function calculateEligibility(data: LeadData) {
  const eligibilite: any = {
    mpr: { eligible: false, montant: 0, details: "" },
    cee: { eligible: false, montant: 0, details: "" },
    eco_ptz: { eligible: false, montant: 0, details: "" },
    tva_reduite: { eligible: false, details: "" },
    credit_impot: { eligible: false, montant: 0, details: "" },
    aides_locales: { eligible: false, details: "" },
  };

  let score = 0;
  const constructionYear = data.construction_year || 2020;
  const buildingAge = 2025 - constructionYear;
  const isOldBuilding = buildingAge >= 15;

  // Déterminer catégorie revenus pour particuliers
  let revenuCat: "bleu" | "jaune" | "violet" | "rose" | null = null;
  let isModeste = false;

  if (data.user_type === "particulier") {
    if (data.revenu_fiscal && data.nb_personnes) {
      revenuCat = determineRevenuCategory(
        data.revenu_fiscal,
        data.nb_personnes,
        data.postal_code
      );
      isModeste = revenuCat === "bleu" || revenuCat === "jaune";
    } else if (data.income_bracket) {
      revenuCat = data.income_bracket as any;
      isModeste = revenuCat === "bleu" || revenuCat === "jaune";
    }
  }

  // === MaPrimeRénov' (Particuliers uniquement) ===
  if (data.user_type === "particulier" && isOldBuilding && revenuCat && revenuCat !== "rose") {
    switch (data.aid_type) {
      case "pac_part":
        if (data.heating_system !== "pac") {
          eligibilite.mpr.eligible = true;
          eligibilite.mpr.montant = MPR_MONTANTS.pac_air_eau[revenuCat];
          eligibilite.mpr.details = "Remplacement système de chauffage par PAC air/eau";
          score += 50;
        }
        break;

      case "isolation_murs":
      case "isolation_murs_part":
        const surface = data.surface || 0;
        const typeIso = data.project_data?.typeIso;
        const montantM2 = typeIso === "exterieur" 
          ? MPR_MONTANTS.isolation_murs_ext[revenuCat]
          : MPR_MONTANTS.isolation_murs_int[revenuCat];
        eligibilite.mpr.eligible = true;
        eligibilite.mpr.montant = montantM2 * surface;
        eligibilite.mpr.details = `Isolation des murs (${typeIso}) - ${montantM2}€/m²`;
        score += 40;
        break;

      case "isolation_toiture":
        eligibilite.mpr.eligible = true;
        eligibilite.mpr.montant = MPR_MONTANTS.isolation_toiture[revenuCat] * (data.surface || 0);
        eligibilite.mpr.details = "Isolation des combles/toiture";
        score += 40;
        break;

      case "chaudiere_biomasse":
        eligibilite.mpr.eligible = true;
        eligibilite.mpr.montant = MPR_MONTANTS.chaudiere_biomasse_auto[revenuCat];
        eligibilite.mpr.details = "Chaudière biomasse performante";
        score += 45;
        break;

      case "vmc_double_flux":
        eligibilite.mpr.eligible = true;
        eligibilite.mpr.montant = MPR_MONTANTS.vmc_double_flux[revenuCat];
        eligibilite.mpr.details = "VMC double flux avec récupération de chaleur";
        score += 35;
        break;

      case "cet_part":
        const typeCET = data.project_data?.typeEnergieCET;
        if (typeCET === "thermodynamique") {
          eligibilite.mpr.eligible = true;
          eligibilite.mpr.montant = MPR_MONTANTS.chauffe_eau_thermo[revenuCat];
          eligibilite.mpr.details = "Chauffe-eau thermodynamique";
        } else if (typeCET === "solaire") {
          eligibilite.mpr.eligible = true;
          eligibilite.mpr.montant = MPR_MONTANTS.chauffe_eau_solaire[revenuCat];
          eligibilite.mpr.details = "Chauffe-eau solaire";
        }
        score += 30;
        break;

      case "fenetres_part":
        if (revenuCat === "bleu" || revenuCat === "jaune") {
          const nbFenetres = parseInt(data.project_data?.nbFenetres || "0");
          eligibilite.mpr.eligible = true;
          eligibilite.mpr.montant = MPR_MONTANTS.fenetres[revenuCat] * nbFenetres;
          eligibilite.mpr.details = `Remplacement fenêtres (ménages modestes uniquement)`;
          score += 25;
        }
        break;
    }
  }

  // === CEE (Particuliers et Professionnels) ===
  eligibilite.cee.eligible = true;

  if (data.aid_type === "pac_part" || data.aid_type === "pac_pro") {
    eligibilite.cee.montant = isModeste 
      ? CEE_MONTANTS.pac_air_eau.modeste 
      : CEE_MONTANTS.pac_air_eau.standard;
    eligibilite.cee.details = "Prime Coup de Pouce Chauffage";
    score += 20;
  } else if (data.aid_type.includes("isolation")) {
    const surface = data.surface || 0;
    const montantM2 = isModeste 
      ? CEE_MONTANTS.isolation_toiture.modeste 
      : CEE_MONTANTS.isolation_toiture.standard;
    eligibilite.cee.montant = montantM2 * surface;
    eligibilite.cee.details = "Prime Coup de Pouce Isolation";
    score += 20;
  } else if (data.aid_type === "led_bureaux" || data.aid_type === "led_entrepot") {
    const nbLuminaires = parseInt(data.project_data?.nbLuminaires || "10");
    const montant = data.aid_type === "led_entrepot"
      ? CEE_MONTANTS.led_entrepot.standard
      : CEE_MONTANTS.led_bureaux.standard;
    eligibilite.cee.montant = montant * nbLuminaires;
    eligibilite.cee.details = "CEE Éclairage performant";
    score += 30;
  } else if (data.aid_type === "brasseur_air") {
    eligibilite.cee.montant = CEE_MONTANTS.brasseur_air.standard * (data.surface || 0);
    eligibilite.cee.details = "CEE Destratification air";
    score += 20;
  } else if (data.aid_type === "chaudiere_biomasse") {
    eligibilite.cee.montant = isModeste
      ? CEE_MONTANTS.chaudiere_biomasse.modeste
      : CEE_MONTANTS.chaudiere_biomasse.standard;
    eligibilite.cee.details = "CEE Chauffage biomasse";
    score += 20;
  } else if (data.aid_type === "vmc_double_flux") {
    eligibilite.cee.montant = isModeste
      ? CEE_MONTANTS.vmc_double_flux.modeste
      : CEE_MONTANTS.vmc_double_flux.standard;
    eligibilite.cee.details = "CEE Ventilation performante";
    score += 15;
  } else {
    eligibilite.cee.montant = 500; // Montant indicatif par défaut
    eligibilite.cee.details = "Prime CEE disponible";
    score += 15;
  }

  // === Éco-PTZ (Particuliers uniquement) ===
  if (data.user_type === "particulier" && isOldBuilding) {
    eligibilite.eco_ptz.eligible = true;
    eligibilite.eco_ptz.montant = 30000;
    eligibilite.eco_ptz.details = "Prêt à taux zéro jusqu'à 30 000€ (ou 50 000€ si rénovation globale)";
    score += 10;
  }

  // === TVA réduite ===
  if (buildingAge >= 2) {
    eligibilite.tva_reduite.eligible = true;
    eligibilite.tva_reduite.details = "TVA à 5,5% sur travaux et équipements";
    score += 5;
  }

  // === Crédit d'impôt 30% (Professionnels PME uniquement) ===
  if (data.user_type === "professionnel") {
    if (["led_bureaux", "led_entrepot", "isolation_pro", "pac_pro"].includes(data.aid_type)) {
      eligibilite.credit_impot.eligible = true;
      eligibilite.credit_impot.details = "Crédit d'impôt PME 30% (jusqu'à fin 2024)";
      score += 25;
    }
  }

  // === Aides locales ===
  eligibilite.aides_locales.eligible = true;
  eligibilite.aides_locales.details = "Aides locales possibles selon votre commune/région";

  // === Photovoltaïque (cas particulier) ===
  if (data.aid_type === "pv_part") {
    eligibilite.mpr.eligible = false;
    eligibilite.mpr.details = "Non éligible MPR (production d'énergie)";
    eligibilite.cee.eligible = false;
    eligibilite.cee.details = "Non éligible CEE";
    
    const puissance = data.project_data?.puissance_souhaitee || "6kwc";
    eligibilite.prime_autoconso = {
      eligible: true,
      montant: puissance === "3kwc" ? 240 : puissance === "6kwc" ? 480 : 560,
      details: "Prime à l'autoconsommation (versée par EDF OA)",
    };
    eligibilite.obligation_achat = {
      eligible: true,
      details: "Rachat surplus à ~0,10€/kWh par EDF",
    };
    score += 30;
  }

  return {
    eligibilite,
    score,
    total_aides_estimees: Object.values(eligibilite)
      .reduce((sum: number, aide: any) => sum + (aide.montant || 0), 0),
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const leadData: LeadData = await req.json();
    console.log("Calculating eligibility for:", leadData);

    const result = calculateEligibility(leadData);

    console.log("Eligibility result:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in calculate-eligibility function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
