import { z } from "zod";

// Step 1: Type de bâtiment
export const pacStep1Schema = z.object({
  building_type: z.string().min(1, "Veuillez sélectionner un type de bâtiment"),
});

// Step 2: Détails du projet
export const pacStep2Schema = z.object({
  surface: z.coerce.number().min(20, "La surface minimale est de 20 m²").max(500, "La surface maximale est de 500 m²"),
  current_heating_type: z.string().min(1, "Veuillez sélectionner un type de chauffage"),
  construction_year: z.coerce.number().min(1900, "Année minimale: 1900").max(new Date().getFullYear(), "Année invalide"),
  postal_code: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
});

// Step 3: Situation (Particulier)
export const pacStep3PartSchema = z.object({
  household_size: z.coerce.number().min(1, "Minimum 1 personne").max(20, "Maximum 20 personnes"),
  revenue_bracket: z.string().optional(),
});

// Step 3: Situation (Professionnel)
export const pacStep3ProSchema = z.object({
  company_name: z.string().min(2, "Le nom de l'entreprise est requis").max(100),
  siren: z.string().regex(/^\d{9}$/, "Le SIREN doit contenir 9 chiffres"),
  employees: z.string().min(1, "Veuillez sélectionner un effectif"),
});

// Step 4: Coordonnées (Particulier)
export const pacStep4PartSchema = z.object({
  first_name: z.string().min(2, "Le prénom est requis").max(50),
  last_name: z.string().min(2, "Le nom est requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Numéro de téléphone français invalide"),
  consent_privacy: z.boolean().refine((val) => val === true, "Vous devez accepter la politique de confidentialité"),
  consent_partner: z.boolean(),
});

// Step 4: Coordonnées (Professionnel)
export const pacStep4ProSchema = z.object({
  first_name: z.string().min(2, "Le prénom est requis").max(50),
  last_name: z.string().min(2, "Le nom est requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Numéro de téléphone français invalide"),
  consent_privacy: z.boolean().refine((val) => val === true, "Vous devez accepter la politique de confidentialité"),
  consent_partner: z.boolean(),
});

export type PACStep1Data = z.infer<typeof pacStep1Schema>;
export type PACStep2Data = z.infer<typeof pacStep2Schema>;
export type PACStep3PartData = z.infer<typeof pacStep3PartSchema>;
export type PACStep3ProData = z.infer<typeof pacStep3ProSchema>;
export type PACStep4PartData = z.infer<typeof pacStep4PartSchema>;
export type PACStep4ProData = z.infer<typeof pacStep4ProSchema>;
