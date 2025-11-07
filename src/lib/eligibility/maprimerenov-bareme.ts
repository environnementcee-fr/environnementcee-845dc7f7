/**
 * Barèmes MaPrimeRénov' 2025
 * Source: Document "Aides à la rénovation énergétique en France 2025"
 */

export type MPRCategory = 'bleu' | 'jaune' | 'violet' | 'rose';
export type Region = 'idf' | 'autre';

// Barèmes de revenus fiscaux de référence par composition du ménage
export const MPR_REVENUE_BRACKETS: Record<string, Record<MPRCategory, number>> = {
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
  "par_personne_supp_idf": { bleu: 6970, jaune: 8486, violet: 12006, rose: 0 },
  "par_personne_supp_autre": { bleu: 5045, jaune: 6462, violet: 8744, rose: 0 },
};

// Forfaits MaPrimeRénov' par type de travaux (en €)
export const MPR_FORFAITS = {
  // Isolation
  isolation_murs_ext: { bleu: 75, jaune: 60, violet: 40, rose: 0 }, // €/m²
  isolation_murs_int: { bleu: 25, jaune: 20, violet: 15, rose: 0 }, // €/m²
  isolation_combles_perdus: { bleu: 25, jaune: 20, violet: 15, rose: 0 }, // €/m²
  isolation_combles_amenages: { bleu: 75, jaune: 60, violet: 40, rose: 0 }, // €/m²
  isolation_toiture_terrasse: { bleu: 75, jaune: 60, violet: 40, rose: 0 }, // €/m²
  isolation_plancher_bas: { bleu: 50, jaune: 40, violet: 25, rose: 0 }, // €/m²
  
  // Fenêtres et menuiseries
  fenetres_double_vitrage: { bleu: 100, jaune: 80, violet: 40, rose: 0 }, // par fenêtre
  porte_entree: { bleu: 150, jaune: 100, violet: 75, rose: 0 }, // par porte
  
  // Chauffage
  pac_air_eau: { bleu: 5000, jaune: 4000, violet: 3000, rose: 0 },
  pac_geothermique: { bleu: 11000, jaune: 9000, violet: 5000, rose: 0 },
  chaudiere_bois_buches: { bleu: 8000, jaune: 6500, violet: 3000, rose: 0 },
  chaudiere_bois_granules: { bleu: 10000, jaune: 8000, violet: 4000, rose: 0 },
  poele_bois_buches: { bleu: 2500, jaune: 2000, violet: 1000, rose: 0 },
  poele_bois_granules: { bleu: 2500, jaune: 2000, violet: 1500, rose: 0 },
  chauffe_eau_thermodynamique: { bleu: 1200, jaune: 800, violet: 400, rose: 0 },
  chauffe_eau_solaire: { bleu: 4000, jaune: 3000, violet: 2000, rose: 0 },
  systeme_solaire_combine: { bleu: 10000, jaune: 8000, violet: 4000, rose: 0 },
  
  // Ventilation
  vmc_double_flux: { bleu: 4000, jaune: 3000, violet: 2000, rose: 0 },
  vmc_simple_flux: { bleu: 0, jaune: 0, violet: 0, rose: 0 }, // Non éligible
  
  // Raccordements
  raccordement_reseau_chaleur: { bleu: 1200, jaune: 800, violet: 400, rose: 0 },
};

// Bonifications (dépose cuve fioul, sortie passoire énergétique, etc.)
export const MPR_BONIFICATIONS = {
  depose_cuve_fioul: 1200, // Forfait fixe
  sortie_passoire_f_g: 0.1, // +10% du montant total (plafonné à 2000€)
  bbc_renovation: 0.1, // +10% du montant total (plafonné à 2000€)
};

/**
 * Calcule la catégorie MaPrimeRénov' d'un ménage
 */
export function calculateMPRCategory(
  revenuFiscal: number,
  nbPersonnes: number,
  region: Region
): MPRCategory {
  // Gérer les ménages de plus de 5 personnes
  let key: string;
  let adjustedRevenu = revenuFiscal;

  if (nbPersonnes <= 5) {
    key = `${nbPersonnes}_${nbPersonnes === 1 ? 'personne' : 'personnes'}_${region}`;
  } else {
    // Pour plus de 5 personnes, utiliser le barème 5 personnes + supplément par personne
    const personnesSupp = nbPersonnes - 5;
    const keyBase = `5_personnes_${region}`;
    const keySupp = `par_personne_supp_${region}`;
    
    // Ajuster le revenu en retirant le supplément par personne
    const suppParPersonne = MPR_REVENUE_BRACKETS[keySupp];
    adjustedRevenu = revenuFiscal - (personnesSupp * suppParPersonne.bleu);
    key = keyBase;
  }

  const brackets = MPR_REVENUE_BRACKETS[key];
  
  if (!brackets) {
    console.error(`Barème introuvable pour: ${key}`);
    return 'rose'; // Par défaut, non éligible
  }

  // Déterminer la catégorie
  if (adjustedRevenu <= brackets.bleu) return 'bleu';
  if (adjustedRevenu <= brackets.jaune) return 'jaune';
  if (adjustedRevenu <= brackets.violet) return 'violet';
  return 'rose';
}

/**
 * Calcule le montant MaPrimeRénov' pour un type de travaux
 */
export function calculateMPRAmount(
  workType: keyof typeof MPR_FORFAITS,
  category: MPRCategory,
  quantity: number = 1
): number {
  const forfait = MPR_FORFAITS[workType];
  if (!forfait) return 0;
  
  const unitAmount = forfait[category];
  return unitAmount * quantity;
}

/**
 * Vérifie l'éligibilité MaPrimeRénov' selon le type de logement
 */
export function checkMPREligibility(
  constructionYear: number,
  isOwner: boolean,
  propertyType: 'principale' | 'location'
): { eligible: boolean; reason?: string } {
  const currentYear = new Date().getFullYear();
  const age = currentYear - constructionYear;

  // Règle générale: logement de plus de 15 ans
  if (age < 15) {
    return { 
      eligible: false, 
      reason: "Le logement doit avoir plus de 15 ans pour être éligible à MaPrimeRénov'" 
    };
  }

  // Propriétaire occupant ou bailleur
  if (!isOwner) {
    return {
      eligible: false,
      reason: "Seuls les propriétaires (occupants ou bailleurs) sont éligibles"
    };
  }

  return { eligible: true };
}

/**
 * Calcule le plafond Éco-PTZ selon le nombre de travaux
 */
export function calculateEcoPTZCap(nbTravaux: number): number {
  if (nbTravaux === 1) return 15000;
  if (nbTravaux === 2) return 25000;
  if (nbTravaux >= 3) return 50000;
  return 0;
}
