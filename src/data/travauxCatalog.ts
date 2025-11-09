export interface TravauxItem {
  id: string;
  label: string;
  description: string;
  segment: 'pro' | 'part' | 'pro_part';
  icon: string;
  tag?: string;
}

export const TRAVAUX_CATALOG: TravauxItem[] = [
  // Professionnels
  {
    id: "led_interieur_entrepot",
    label: "LED intérieur – Entrepôt",
    description: "Luminaires haute performance pour espaces de stockage et logistique",
    segment: "pro",
    icon: "Lightbulb",
    tag: "Jusqu'à 100% financé"
  },
  {
    id: "led_interieur_bureau",
    label: "LED intérieur – Bureaux",
    description: "Solutions d'éclairage professionnel pour espaces tertiaires",
    segment: "pro",
    icon: "Building",
    tag: "Économies garanties"
  },
  {
    id: "led_exterieur_solaire",
    label: "LED extérieur – Solaire",
    description: "Éclairage autonome et écologique pour extérieurs",
    segment: "pro",
    icon: "Sun",
    tag: "Autonome"
  },
  {
    id: "isolation_murs",
    label: "Isolation murs (ITI/ITE)",
    description: "Isolation thermique intérieure ou extérieure",
    segment: "pro_part",
    icon: "Home",
    tag: "Confort toute l'année"
  },
  {
    id: "brasseur_air",
    label: "Brasseur d'air",
    description: "Ventilation et circulation d'air efficace",
    segment: "pro_part",
    icon: "Fan",
    tag: "Confort thermique"
  },
  {
    id: "pac_pro",
    label: "Pompe à chaleur – Pro",
    description: "Chauffage et climatisation haute performance",
    segment: "pro",
    icon: "Thermometer",
    tag: "Zéro investissement"
  },
  {
    id: "hp_flottante_chambre_froide",
    label: "HP flottante – Chambre froide",
    description: "Optimisation énergétique des chambres froides",
    segment: "pro",
    icon: "Snowflake",
    tag: "Économies garanties"
  },
  
  // Particuliers
  {
    id: "pac_part",
    label: "Pompe à chaleur – Particulier",
    description: "Chauffage écologique et économique pour votre logement",
    segment: "part",
    icon: "Home",
    tag: "MaPrimeRénov'"
  },
  {
    id: "pv_part",
    label: "Panneaux photovoltaïques",
    description: "Produisez votre électricité verte",
    segment: "part",
    icon: "Sun",
    tag: "Autoconsommation"
  },
  {
    id: "isolation_part",
    label: "Isolation – Particulier",
    description: "Isolation thermique pour votre maison",
    segment: "part",
    icon: "Home",
    tag: "Jusqu'à 90% d'aides"
  },
];

export const getTravauxBySegment = (segment: 'pro' | 'part') => {
  return TRAVAUX_CATALOG.filter(
    item => item.segment === segment || item.segment === 'pro_part'
  );
};

export const getTravauxById = (id: string) => {
  return TRAVAUX_CATALOG.find(item => item.id === id);
};
