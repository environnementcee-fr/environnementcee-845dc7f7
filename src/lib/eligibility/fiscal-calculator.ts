/**
 * Calculateur d'avantages fiscaux (TVA, crédit d'impôt, amortissement)
 */

/**
 * Calcule l'économie de TVA (20% → 5,5%)
 */
export function calculateTVAReduction(montantHT: number): {
  economie: number;
  montantTTC_normal: number;
  montantTTC_reduit: number;
} {
  const montantTTC_normal = montantHT * 1.20;
  const montantTTC_reduit = montantHT * 1.055;
  const economie = montantTTC_normal - montantTTC_reduit;

  return {
    economie: Math.round(economie),
    montantTTC_normal: Math.round(montantTTC_normal),
    montantTTC_reduit: Math.round(montantTTC_reduit)
  };
}

/**
 * Calcule le crédit d'impôt pour les particuliers (si applicable)
 * Note: Remplacé en grande partie par MaPrimeRénov', mais reste pour certains équipements
 */
export function calculateCreditImpotParticulier(
  montantTravaux: number,
  typeEquipement: 'pompe_chaleur' | 'borne_recharge' | 'systeme_charge'
): number {
  const taux: Record<string, number> = {
    pompe_chaleur: 0, // Désormais remplacé par MPR
    borne_recharge: 0.75, // 75% plafonné à 300€
    systeme_charge: 0.75
  };

  const plafonds: Record<string, number> = {
    pompe_chaleur: 0,
    borne_recharge: 300,
    systeme_charge: 300
  };

  const tauxApplicable = taux[typeEquipement] || 0;
  const plafondApplicable = plafonds[typeEquipement] || 0;

  const creditCalcule = montantTravaux * tauxApplicable;
  return Math.min(creditCalcule, plafondApplicable);
}

/**
 * Calcule l'amortissement exceptionnel pour les entreprises
 */
export function calculateAmortissementExceptionnel(
  montantInvestissement: number,
  typeEquipement: 'renovation_energetique' | 'robotique' | 'transition_ecologique'
): {
  amortissementNormal: number;
  amortissementExceptionnel: number;
  gain: number;
  dureeAmortissement: number;
} {
  // Amortissement normal sur durée classique
  const dureeNormale: Record<string, number> = {
    renovation_energetique: 10, // ans
    robotique: 5,
    transition_ecologique: 10
  };

  const duree = dureeNormale[typeEquipement] || 10;
  const amortissementNormal = montantInvestissement / duree;

  // Amortissement exceptionnel: déduction de 40% la première année
  const tauxExceptionnel = 0.40;
  const amortissementExceptionnel = montantInvestissement * tauxExceptionnel;

  // Gain fiscal estimé (supposant un taux d'IS de 25%)
  const tauxIS = 0.25;
  const gain = (amortissementExceptionnel - amortissementNormal) * tauxIS;

  return {
    amortissementNormal: Math.round(amortissementNormal),
    amortissementExceptionnel: Math.round(amortissementExceptionnel),
    gain: Math.round(gain),
    dureeAmortissement: duree
  };
}

/**
 * Calcule le montant de l'Éco-PTZ selon le projet
 */
export function calculateDetailedEcoPTZ(
  nbPostes: number,
  travaux: Array<{ type: string; montant: number }>
): {
  montantMax: number;
  montantRecommande: number;
  dureeMax: number;
  mensualiteEstimee: number;
} {
  // Plafonds selon nombre de postes
  const plafonds: Record<number, number> = {
    1: 15000,
    2: 25000,
    3: 30000,
    4: 50000
  };

  const montantMax = plafonds[Math.min(nbPostes, 4)] || 50000;
  
  // Montant recommandé: couvrir le reste à charge
  const montantTotalTravaux = travaux.reduce((sum, t) => sum + t.montant, 0);
  const montantRecommande = Math.min(montantTotalTravaux, montantMax);

  // Durée maximale de remboursement
  const dureeMax = nbPostes >= 3 ? 20 : 15; // ans

  // Mensualité estimée (taux 0%)
  const mensualiteEstimee = montantRecommande / (dureeMax * 12);

  return {
    montantMax,
    montantRecommande: Math.round(montantRecommande),
    dureeMax,
    mensualiteEstimee: Math.round(mensualiteEstimee)
  };
}

/**
 * Vérifie l'éligibilité à la TVA réduite
 */
export function checkTVAReducedEligibility(
  constructionYear: number,
  workType: string
): {
  eligible: boolean;
  taux: 5.5 | 10 | 20;
  raison: string;
} {
  const currentYear = new Date().getFullYear();
  const age = currentYear - constructionYear;

  // TVA 5,5% pour travaux d'amélioration énergétique
  const travauxEligibles55 = [
    'isolation',
    'chauffage',
    'ventilation',
    'regulation',
    'fenetre',
    'chauffe_eau'
  ];

  const isTravaux55 = travauxEligibles55.some(type => workType.includes(type));

  if (age >= 2 && isTravaux55) {
    return {
      eligible: true,
      taux: 5.5,
      raison: 'Travaux d\'amélioration de la qualité énergétique - TVA 5,5%'
    };
  }

  // TVA 10% pour travaux d'amélioration (hors énergie)
  if (age >= 2) {
    return {
      eligible: true,
      taux: 10,
      raison: 'Travaux d\'amélioration dans logement de plus de 2 ans - TVA 10%'
    };
  }

  // TVA 20% pour construction neuve ou travaux non éligibles
  return {
    eligible: false,
    taux: 20,
    raison: 'TVA normale 20%'
  };
}
