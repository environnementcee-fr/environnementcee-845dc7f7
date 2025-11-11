import { z } from "zod";

export const chaudiereBiomasseFormSchema = z.object({
  // Type de logement
  building_type: z.enum(["maison", "appartement"], {
    required_error: "Sélectionnez le type de logement",
  }),
  
  // Détails chaudière biomasse
  type_biomasse: z.enum(["granules", "buches", "mixte"], {
    required_error: "Sélectionnez le type de combustible biomasse",
  }),
  puissance_souhaitee: z.number()
    .min(5, "La puissance doit être d'au moins 5 kW")
    .max(100, "Maximum 100 kW pour particuliers"),
  current_heating_system: z.enum(["fioul", "gaz", "electrique", "charbon", "autre"], {
    required_error: "Sélectionnez votre système de chauffage actuel",
  }),
  surface_chauffee: z.number()
    .min(20, "La surface doit être d'au moins 20 m²")
    .max(500, "Maximum 500 m²"),
  
  // Informations logement
  construction_year: z.number()
    .min(1900, "L'année doit être supérieure à 1900")
    .max(new Date().getFullYear(), "L'année ne peut pas être dans le futur"),
  postal_code: z.string()
    .regex(/^[0-9]{5}$/, "Le code postal doit contenir 5 chiffres"),
  
  // Revenus (pour MaPrimeRénov')
  revenu_fiscal: z.number().min(0, "Le revenu fiscal doit être positif"),
  nb_personnes_foyer: z.number().min(1, "Le nombre de personnes doit être d'au moins 1").max(15, "Maximum 15 personnes"),
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

export type ChaudiereBiomasseFormData = z.infer<typeof chaudiereBiomasseFormSchema>;
