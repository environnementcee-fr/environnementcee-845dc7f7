/**
 * Catalogue unique des travaux éligibles aux aides 2025
 * Source: PDF "Aides à la rénovation énergétique en France 2025"
 */

export interface TravauxItem {
  id: string;
  label: string;
  description: string;
  segment: 'pro' | 'part' | 'mixte';
  icon: string;
  tag?: string;
  questions: string[]; // Champs spécifiques à afficher dans le formulaire
}

export const TRAVAUX_CATALOG: TravauxItem[] = [
  // ==== Professionnels / Mixte ====
  {
    id: "led_entrepot",
    label: "LED intérieur – Entrepôt",
    description: "Luminaires haute performance pour espaces de stockage et logistique",
    segment: "pro",
    icon: "Lightbulb",
    tag: "CEE + Crédit 30%",
    questions: ["nbLuminaires", "hauteurPlafond", "typeFixtureActuelle"]
  },
  {
    id: "led_bureaux",
    label: "LED intérieur – Bureaux",
    description: "Solutions d'éclairage professionnel pour espaces tertiaires",
    segment: "pro",
    icon: "Building",
    tag: "CEE + Crédit 30%",
    questions: ["nbLuminaires", "hauteurPlafond", "surfaceBureau"]
  },
  {
    id: "led_ext_solaire",
    label: "LED extérieur – Solaire",
    description: "Éclairage autonome et écologique pour extérieurs",
    segment: "pro",
    icon: "Sun",
    tag: "CEE",
    questions: ["nbPointsLum", "typeInstallation"]
  },
  {
    id: "isolation_murs",
    label: "Isolation des murs (ITI/ITE)",
    description: "Isolation thermique intérieure ou extérieure pour bâtiments pro et maisons",
    segment: "mixte",
    icon: "Home",
    tag: "CEE + MPR + Crédit 30%",
    questions: ["surfaceIso", "typeIso", "materiauMur"]
  },
  {
    id: "brasseur_air",
    label: "Brasseur d'air / Destratificateur",
    description: "Optimisation du confort thermique et économies d'énergie",
    segment: "pro",
    icon: "Fan",
    tag: "CEE",
    questions: ["volume", "hauteurPlafond", "typeActivite"]
  },
  {
    id: "pac_pro",
    label: "Pompe à chaleur – Bâtiment professionnel",
    description: "Chauffage et climatisation haute performance pour entreprises",
    segment: "pro",
    icon: "Thermometer",
    tag: "CEE + Fonds Chaleur + Crédit 30%",
    questions: ["energieActuelle", "surfaceChauffee", "puissanceActuelle"]
  },
  {
    id: "hp_flottante",
    label: "HP flottante – Chambre froide",
    description: "Optimisation énergétique des chambres froides professionnelles",
    segment: "pro",
    icon: "Snowflake",
    tag: "CEE",
    questions: ["volumeCF", "tCible", "typeUsage"]
  },

  // ==== Particuliers ====
  {
    id: "pac_part",
    label: "Pompe à chaleur – Maison",
    description: "Chauffage écologique et économique pour votre logement",
    segment: "part",
    icon: "Home",
    tag: "MPR + CEE + Éco-PTZ",
    questions: ["energieActuelle", "surfaceChauffee", "revenuMenage", "nbPersonnes"]
  },
  {
    id: "pv_part",
    label: "Panneaux photovoltaïques",
    description: "Produisez votre électricité verte et réduisez vos factures",
    segment: "part",
    icon: "Sun",
    tag: "Prime autoconso + TVA 10%",
    questions: ["puissanceSouhaitee", "typeToiture", "orientationToiture"]
  },
  {
    id: "isolation_toiture",
    label: "Isolation combles/toiture",
    description: "Réduisez jusqu'à 30% de vos pertes de chaleur",
    segment: "part",
    icon: "Home",
    tag: "MPR + CEE + Éco-PTZ",
    questions: ["surfaceIso", "typeCombles", "accesComblesExistant"]
  },
  {
    id: "isolation_murs_part",
    label: "Isolation murs maison",
    description: "Amélioration du confort thermique et économies d'énergie",
    segment: "part",
    icon: "Home",
    tag: "MPR + CEE + Éco-PTZ",
    questions: ["surfaceIso", "typeIso", "materiauMur"]
  },
  {
    id: "fenetres_part",
    label: "Remplacement fenêtres",
    description: "Fenêtres double/triple vitrage haute performance",
    segment: "part",
    icon: "Home",
    tag: "MPR + CEE + Éco-PTZ",
    questions: ["nbFenetres", "typeFenetres", "materiauCadre"]
  },
  {
    id: "chaudiere_biomasse",
    label: "Chaudière biomasse – Maison",
    description: "Chauffage au bois performant et économique",
    segment: "part",
    icon: "Flame",
    tag: "MPR + CEE + Éco-PTZ",
    questions: ["energieActuelle", "surfaceChauffee", "typeBiomasse"]
  },
  {
    id: "vmc_double_flux",
    label: "VMC double flux",
    description: "Ventilation performante avec récupération de chaleur",
    segment: "part",
    icon: "Wind",
    tag: "MPR + CEE + Éco-PTZ",
    questions: ["surfaceLogement", "nbPiecesHumides", "vmcExistante"]
  },
  {
    id: "cet_part",
    label: "Chauffe-eau thermodynamique/solaire",
    description: "Production d'eau chaude sanitaire économique et écologique",
    segment: "part",
    icon: "Droplet",
    tag: "MPR + CEE + Éco-PTZ",
    questions: ["nbPersonnes", "typeEnergieCET", "volumeBallon"]
  }
];

export const getTravauxBySegment = (segment: 'pro' | 'part') => {
  return TRAVAUX_CATALOG.filter(
    item => item.segment === segment || item.segment === 'mixte'
  );
};

export const getTravauxById = (id: string) => {
  return TRAVAUX_CATALOG.find(item => item.id === id);
};
