import { z } from "zod";

export const isolationProFormSchema = z.object({
  // Type de bâtiment
  building_type: z.enum(["bureaux", "usine", "entrepot", "commerce", "autre"], {
    required_error: "Sélectionnez le type de bâtiment",
  }),
  
  // Isolation
  isolation_type: z.enum(["toiture", "murs_ext", "murs_int", "plancher"], {
    required_error: "Sélectionnez le type d'isolation",
  }),
  surface: z.number().min(50, "La surface doit être d'au moins 50m²").max(10000, "Maximum 10 000m²"),
  current_insulation: z.enum(["aucune", "ancienne", "partielle"], {
    required_error: "Sélectionnez l'isolation actuelle",
  }),
  
  // Informations bâtiment
  construction_year: z.number()
    .min(1900, "L'année doit être supérieure à 1900")
    .max(new Date().getFullYear(), "L'année ne peut pas être dans le futur"),
  surface_totale: z.number().min(100, "La surface doit être d'au moins 100m²").max(50000, "Maximum 50 000m²"),
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

export type IsolationProFormData = z.infer<typeof isolationProFormSchema>;
