import { z } from "zod";

export const photovoltaiqueProFormSchema = z.object({
  // Type de bâtiment
  building_type: z.enum(["bureaux", "usine", "entrepot", "commerce", "hangar_agricole", "autre"], {
    required_error: "Sélectionnez le type de bâtiment",
  }),
  
  // Installation photovoltaïque
  puissance_souhaitee: z.number().min(3, "La puissance doit être d'au moins 3 kWc").max(1000, "Maximum 1000 kWc"),
  type_installation: z.enum(["autoconsommation", "revente_totale", "autoconso_surplus"], {
    required_error: "Sélectionnez le type d'installation",
  }),
  surface_toiture_disponible: z.number().min(20, "La surface doit être d'au moins 20m²").max(10000, "Maximum 10 000m²"),
  orientation_toiture: z.enum(["sud", "sud_est", "sud_ouest", "est", "ouest", "autre"], {
    required_error: "Sélectionnez l'orientation de votre toiture",
  }),
  pente_toiture: z.number().min(0, "La pente doit être positive").max(90, "La pente ne peut pas dépasser 90°"),
  
  // Consommation électrique
  conso_annuelle_kwh: z.number().min(0, "La consommation doit être positive").max(10000000, "Maximum 10 000 000 kWh"),
  
  // Informations bâtiment
  construction_year: z.number()
    .min(1900, "L'année doit être supérieure à 1900")
    .max(new Date().getFullYear(), "L'année ne peut pas être dans le futur"),
  postal_code: z.string()
    .regex(/^[0-9]{5}$/, "Le code postal doit contenir 5 chiffres"),
  
  // Informations entreprise
  company_name: z.string().min(1, "Le nom de l'entreprise est requis").max(255),
  siren: z.string().regex(/^[0-9]{9}$/, "Le SIREN doit contenir 9 chiffres"),
  employees: z.string().min(1, "Sélectionnez le nombre de salariés"),
  secteur: z.string().min(1, "Sélectionnez votre secteur d'activité"),
  
  // Contact
  first_name: z.string().min(1, "Le prénom est requis").max(100),
  last_name: z.string().min(1, "Le nom est requis").max(100),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^\+?[0-9\s\-\(\)]{6,20}$/, "Numéro de téléphone invalide"),
  
  // Consentements
  consent_privacy: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
  consent_partner: z.boolean().default(false),
});

export type PhotovoltaiqueProFormData = z.infer<typeof photovoltaiqueProFormSchema>;
