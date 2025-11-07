/**
 * Calculateur de Primes CEE (Certificats d'Économies d'Énergie)
 * Source: Document "Aides à la rénovation énergétique en France 2025"
 */

export type UserType = 'particulier' | 'professionnel';

// Primes CEE standards pour particuliers (en €)
export const CEE_PRIMES_PARTICULIERS = {
  // Isolation (€/m²)
  isolation_combles_perdus: (surface: number, modeste: boolean) => {
    const baseRate = 10; // €/m²
    return surface * baseRate * (modeste ? 1.2 : 1);
  },
  isolation_murs: (surface: number, modeste: boolean) => {
    const baseRate = 15; // €/m²
    return surface * baseRate * (modeste ? 1.2 : 1);
  },
  isolation_plancher: (surface: number, modeste: boolean) => {
    const baseRate = 12; // €/m²
    return surface * baseRate * (modeste ? 1.2 : 1);
  },
  
  // Chauffage - Coup de Pouce
  pac_air_eau_remplacement_fioul: (modeste: boolean) => modeste ? 5000 : 4000,
  pac_air_eau_remplacement_gaz: (modeste: boolean) => modeste ? 4000 : 2500,
  pac_geothermique: (modeste: boolean) => modeste ? 5000 : 4000,
  chaudiere_bois: (modeste: boolean) => modeste ? 4000 : 2500,
  
  // Chauffe-eau
  chauffe_eau_thermodynamique: (modeste: boolean) => modeste ? 150 : 100,
  chauffe_eau_solaire: (modeste: boolean) => modeste ? 180 : 130,
  
  // Ventilation
  vmc_double_flux: (modeste: boolean) => modeste ? 500 : 350,
  
  // Fenêtres
  fenetres: (nombre: number, modeste: boolean) => {
    const baseRate = 80; // €/fenêtre
    return nombre * baseRate * (modeste ? 1.2 : 1);
  },
  
  // Brasseur d'air (si hauteur >4m)
  brasseur_air: (hauteurSousPlafond: number) => {
    if (hauteurSousPlafond < 4) return 0;
    return 200; // Prime forfaitaire
  },
};

// Primes CEE pour professionnels (en €)
export const CEE_PRIMES_PROFESSIONNELS = {
  // LED
  led_bureau: (nbLuminaires: number) => nbLuminaires * 15,
  led_entrepot: (nbLuminaires: number, puissance: number) => {
    // Calcul selon puissance et nombre
    const basePrime = nbLuminaires * 20;
    const bonusPuissance = puissance > 150 ? 500 : 0;
    return basePrime + bonusPuissance;
  },
  led_solaire: (nbLampadaires: number) => nbLampadaires * 100,
  
  // Isolation bâtiment tertiaire/industriel
  isolation_toiture_pro: (surface: number) => surface * 20, // €/m²
  isolation_murs_pro: (surface: number) => surface * 25, // €/m²
  
  // Chauffage industriel
  pac_industrielle: (puissance: number) => {
    // €/kW installé
    const baseRate = 150; // €/kW
    return puissance * baseRate;
  },
  
  // Brasseurs d'air industriels (>5m de hauteur)
  brasseur_air_pro: (hauteur: number, surface: number) => {
    if (hauteur < 5) return 0;
    return surface * 5; // €/m² couvert
  },
  
  // CVC (Chauffage, Ventilation, Climatisation)
  systeme_regulation_chauffage: () => 2000, // Forfait
  
  // Récupération chaleur
  recuperateur_chaleur: (puissance: number) => puissance * 100, // €/kW
};

/**
 * Détermine si un ménage est considéré comme "modeste" pour les primes bonifiées
 */
export function isModeste(revenuFiscal: number, nbPersonnes: number, region: 'idf' | 'autre'): boolean {
  // Basé sur les barèmes "Bleu" et "Jaune" de MaPrimeRénov'
  const seuilsModestes: Record<string, number> = {
    "1_idf": 28657,
    "1_autre": 21805,
    "2_idf": 42058,
    "2_autre": 31889,
    "3_idf": 50513,
    "3_autre": 38349,
    "4_idf": 58981,
    "4_autre": 44802,
    "5_idf": 67473,
    "5_autre": 51281,
  };

  const key = `${Math.min(nbPersonnes, 5)}_${region}`;
  const seuil = seuilsModestes[key];

  return seuil ? revenuFiscal <= seuil : false;
}

/**
 * Calcule la prime CEE totale pour un projet particulier
 */
export function calculateCEEParticulier(
  workType: keyof typeof CEE_PRIMES_PARTICULIERS,
  params: {
    surface?: number;
    nombre?: number;
    hauteur?: number;
    revenuFiscal: number;
    nbPersonnes: number;
    region: 'idf' | 'autre';
  }
): number {
  const modeste = isModeste(params.revenuFiscal, params.nbPersonnes, params.region);
  const calculator = CEE_PRIMES_PARTICULIERS[workType];

  if (!calculator) return 0;

  // Appeler le calculateur avec les bons paramètres
  if (workType.includes('isolation')) {
    return calculator(params.surface || 0, modeste);
  } else if (workType === 'fenetres') {
    return calculator(params.nombre || 0, modeste);
  } else if (workType === 'brasseur_air') {
    return calculator(params.hauteur || 0);
  } else {
    return calculator(modeste);
  }
}

/**
 * Calcule la prime CEE totale pour un projet professionnel
 */
export function calculateCEEProfessionnel(
  workType: keyof typeof CEE_PRIMES_PROFESSIONNELS,
  params: {
    nbLuminaires?: number;
    puissance?: number;
    surface?: number;
    hauteur?: number;
  }
): number {
  const calculator = CEE_PRIMES_PROFESSIONNELS[workType];

  if (!calculator) return 0;

  // Appeler le calculateur avec les bons paramètres
  if (workType === 'led_bureau' || workType === 'led_solaire') {
    return (calculator as any)(params.nbLuminaires || 0);
  } else if (workType === 'led_entrepot') {
    return (calculator as any)(params.nbLuminaires || 0, params.puissance || 0);
  } else if (workType.includes('isolation')) {
    return (calculator as any)(params.surface || 0);
  } else if (workType === 'pac_industrielle' || workType === 'recuperateur_chaleur') {
    return (calculator as any)(params.puissance || 0);
  } else if (workType === 'brasseur_air_pro') {
    return (calculator as any)(params.hauteur || 0, params.surface || 0);
  } else if (workType === 'systeme_regulation_chauffage') {
    return (calculator as any)();
  } else {
    return 0;
  }
}

/**
 * Vérifie la cumulabilité CEE + MaPrimeRénov'
 */
export function checkCEEMPRCumul(workType: string): {
  cumul: boolean;
  note?: string;
} {
  // Liste des travaux cumulables
  const cumulables = [
    'isolation',
    'chauffage',
    'ventilation',
    'chauffe_eau',
    'fenetres',
  ];

  const isCumulable = cumulables.some(type => workType.includes(type));

  return {
    cumul: isCumulable,
    note: isCumulable 
      ? "CEE et MaPrimeRénov' sont cumulables pour ce type de travaux"
      : "Vérifier la cumulabilité avec votre conseiller"
  };
}

/**
 * Calcule le crédit d'impôt PME (30% pour TPE/PME)
 */
export function calculateCreditImpotPME(
  montantTravaux: number,
  effectif: number
): number {
  // Éligible si entreprise <250 salariés
  if (effectif >= 250) return 0;

  const tauxCredit = 0.30; // 30%
  const plafond = 25000; // Plafond annuel

  const creditCalcule = montantTravaux * tauxCredit;
  return Math.min(creditCalcule, plafond);
}
