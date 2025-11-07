import { z } from "zod";

export const pacProFormSchema = z.object({
  // Type de bâtiment
  building_type: z.enum(["bureaux", "usine", "entrepot", "commerce", "autre"], {
    required_error: "Sélectionnez le type de bâtiment",
  }),
  
  // PAC
  pac_type: z.enum(["air_eau", "geothermique", "air_air"], {
    required_error: "Sélectionnez le type de pompe à chaleur",
  }),
  usage_type: z.enum(["chauffage_batiment", "process_industriel", "eau_chaude_sanitaire"], {
    required_error: "Sélectionnez l'usage prévu",
  }),
  puissance_estimee: z.number().min(10, "La puissance doit être d'au moins 10kW").max(1000, "Maximum 1000kW"),
  current_heating: z.enum(["fioul", "gaz", "electrique", "charbon", "autre"], {
    required_error: "Sélectionnez votre système actuel",
  }),
  
  // Informations bâtiment
  construction_year: z.number()
    .min(1900, "L'année doit être supérieure à 1900")
    .max(new Date().getFullYear(), "L'année ne peut pas être dans le futur"),
  surface_chauffee: z.number().min(100, "La surface doit être d'au moins 100m²").max(50000, "Maximum 50 000m²"),
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

export type PACProFormData = z.infer<typeof pacProFormSchema>;
