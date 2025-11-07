/**
 * Base de données des aides locales par département/région
 * À enrichir au fil du temps avec les dispositifs locaux
 */

export interface AideLocale {
  name: string;
  type: 'region' | 'departement' | 'metropole' | 'commune';
  description: string;
  amount: string;
  conditions: string[];
  url?: string;
  contact?: string;
}

export const AIDES_LOCALES: Record<string, AideLocale[]> = {
  // Île-de-France
  "75": [
    {
      name: "ParisRénov'",
      type: "commune",
      description: "Aide de la Ville de Paris pour la rénovation énergétique",
      amount: "Jusqu'à 50% du montant des travaux",
      conditions: [
        "Propriétaire occupant ou bailleur",
        "Logement dans Paris",
        "Travaux éligibles aux aides de l'État"
      ],
      url: "https://www.paris.fr/pages/parisrenov-157",
      contact: "01 53 63 22 22"
    }
  ],
  
  "69": [
    {
      name: "ÉcoRéno'v Lyon Métropole",
      type: "metropole",
      description: "Subvention de la Métropole de Lyon pour les travaux d'économies d'énergie",
      amount: "Jusqu'à 20% du montant HT des travaux (max 3 000€)",
      conditions: [
        "Propriétaire occupant",
        "Résidence principale dans la Métropole",
        "Gain énergétique > 35%"
      ],
      url: "https://www.grandlyon.com/services/ecorenov.html"
    }
  ],

  "13": [
    {
      name: "Métropole Aix-Marseille-Provence - Aide à la rénovation",
      type: "metropole",
      description: "Soutien financier pour les travaux de rénovation énergétique",
      amount: "Jusqu'à 1 500€ selon revenus",
      conditions: [
        "Propriétaire occupant",
        "Logement de plus de 15 ans",
        "Réalisation d'un audit énergétique"
      ]
    }
  ],

  "31": [
    {
      name: "Toulouse Métropole - Chèque Éco-Énergie",
      type: "metropole",
      description: "Aide de Toulouse Métropole pour les travaux d'isolation et chauffage",
      amount: "500€ à 1 500€ selon travaux",
      conditions: [
        "Propriétaire occupant",
        "Revenu fiscal < plafonds",
        "Logement > 15 ans"
      ]
    }
  ],

  "33": [
    {
      name: "Bordeaux Métropole - Rénovation énergétique",
      type: "metropole",
      description: "Aide aux copropriétés et propriétaires pour la rénovation",
      amount: "Variable selon projet",
      conditions: [
        "Audit énergétique préalable",
        "Gain énergétique significatif"
      ]
    }
  ],

  "44": [
    {
      name: "Nantes Métropole - ÉcoRénov'",
      type: "metropole",
      description: "Accompagnement et aide financière pour la rénovation",
      amount: "Jusqu'à 3 000€",
      conditions: [
        "Propriétaire occupant",
        "Logement > 15 ans",
        "Travaux éligibles CEE/MPR"
      ]
    }
  ],

  "59": [
    {
      name: "MEL (Métropole Européenne de Lille) - Aide Réno",
      type: "metropole",
      description: "Prime pour les travaux de rénovation énergétique",
      amount: "500€ à 2 000€",
      conditions: [
        "Propriétaire occupant sous conditions de ressources",
        "Travaux d'isolation ou chauffage"
      ]
    }
  ],

  // Régions
  "auvergne_rhone_alpes": [
    {
      name: "OSER - Région Auvergne-Rhône-Alpes",
      type: "region",
      description: "Offre de Service Énergie Rénovation",
      amount: "Variable selon projet",
      conditions: [
        "Accompagnement gratuit",
        "Audit énergétique subventionné"
      ],
      url: "https://www.auvergnerhonealpes.fr/aide/94/oser"
    }
  ],

  "occitanie": [
    {
      name: "Éco-chèque Région Occitanie",
      type: "region",
      description: "Chèque pour les travaux de rénovation énergétique",
      amount: "1 500€ à 3 000€",
      conditions: [
        "Propriétaire occupant modeste/très modeste",
        "Travaux éligibles MPR"
      ]
    }
  ],

  "nouvelle_aquitaine": [
    {
      name: "Région Nouvelle-Aquitaine - Aide à la rénovation",
      type: "region",
      description: "Soutien régional pour la transition énergétique",
      amount: "Variable",
      conditions: [
        "Couplé avec les aides nationales"
      ]
    }
  ]
};

/**
 * Recherche les aides locales par code postal
 */
export function getAidesLocalesByPostalCode(postalCode: string): AideLocale[] {
  const departement = postalCode.substring(0, 2);
  return AIDES_LOCALES[departement] || [];
}

/**
 * Recherche les aides régionales par région
 */
export function getAidesLocalesByRegion(region: string): AideLocale[] {
  const regionKey = region.toLowerCase().replace(/[\s'-]/g, '_');
  return AIDES_LOCALES[regionKey] || [];
}

/**
 * Vérifie si des aides locales existent pour un code postal
 */
export function hasAidesLocales(postalCode: string): boolean {
  const departement = postalCode.substring(0, 2);
  return departement in AIDES_LOCALES && AIDES_LOCALES[departement].length > 0;
}
