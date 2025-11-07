import { z } from "zod";

export const chauffeEauSolaireFormSchema = z.object({
  // Type de logement
  building_type: z.string().min(1, "Sélectionnez le type de logement"),
  
  // Chauffe-eau solaire
  surface_capteurs: z.number().min(2, "La surface doit être d'au moins 2m²").max(20, "Maximum 20m²"),
  orientation_toiture: z.enum(["sud", "sud_est", "sud_ouest", "est", "ouest", "autre"], {
    required_error: "Sélectionnez l'orientation de votre toiture",
  }),
  pente_toiture: z.number().min(0, "La pente doit être positive").max(90, "La pente ne peut pas dépasser 90°"),
  nb_personnes_foyer: z.number().min(1, "Le nombre de personnes doit être d'au moins 1").max(15, "Maximum 15 personnes"),
  current_heating_system: z.enum(["electrique", "gaz", "fioul", "autre"], {
    required_error: "Sélectionnez votre système actuel",
  }),
  
  // Informations logement
  construction_year: z.number()
    .min(1900, "L'année doit être supérieure à 1900")
    .max(new Date().getFullYear(), "L'année ne peut pas être dans le futur"),
  postal_code: z.string()
    .regex(/^[0-9]{5}$/, "Le code postal doit contenir 5 chiffres"),
  
  // Revenus (pour MaPrimeRénov')
  revenu_fiscal: z.number().min(0, "Le revenu fiscal doit être positif"),
  region: z.enum(["idf", "autre"], {
    required_error: "Sélectionnez votre région",
  }),
  
  // Statut propriétaire
  owner_status: z.enum(["occupant", "bailleur"], {
    required_error: "Sélectionnez votre statut",
  }),
  
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

export type ChauffeEauSolaireFormData = z.infer<typeof chauffeEauSolaireFormSchema>;
