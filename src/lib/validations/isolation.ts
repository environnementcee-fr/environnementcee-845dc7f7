import { z } from "zod";

// Étape 1: Type de bâtiment
export const isolationStep1Schema = z.object({
  building_type: z.string().min(1, "Veuillez sélectionner un type de bâtiment"),
  user_type: z.string().min(1, "Veuillez sélectionner un type"),
});

// Étape 2: Détails du projet
export const isolationStep2Schema = z.object({
  surface: z.coerce.number().min(10, "La surface minimale est de 10 m²").max(5000, "La surface maximale est de 5 000 m²"),
  insulation_type: z.string().min(1, "Veuillez sélectionner un type d'isolation"),
  wall_material: z.string().min(1, "Veuillez sélectionner un matériau"),
  construction_year: z.coerce.number().min(1800, "Année invalide").max(new Date().getFullYear() - 2, "Le bâtiment doit avoir au moins 2 ans"),
  postal_code: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
});

// Étape 3: Situation (Particulier)
export const isolationStep3PartSchema = z.object({
  income_bracket: z.string().min(1, "Veuillez sélectionner une tranche de revenus"),
});

// Étape 3: Situation (Professionnel)
export const isolationStep3ProSchema = z.object({
  company_name: z.string().min(2, "Le nom de l'entreprise est requis").max(100),
  siren: z.string().regex(/^\d{9}$/, "Le SIREN doit contenir 9 chiffres"),
  employees: z.string().min(1, "Veuillez sélectionner un effectif"),
});

// Étape 4: Coordonnées (Particulier)
export const isolationStep4PartSchema = z.object({
  first_name: z.string().min(2, "Le prénom est requis").max(50),
  last_name: z.string().min(2, "Le nom est requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Numéro de téléphone français invalide"),
  consent_privacy: z.boolean().refine((val) => val === true, "Vous devez accepter la politique de confidentialité"),
  consent_partner: z.boolean().optional(),
});

// Étape 4: Coordonnées (Professionnel)
export const isolationStep4ProSchema = z.object({
  first_name: z.string().min(2, "Le prénom est requis").max(50),
  last_name: z.string().min(2, "Le nom est requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Numéro de téléphone français invalide"),
  consent_privacy: z.boolean().refine((val) => val === true, "Vous devez accepter la politique de confidentialité"),
  consent_partner: z.boolean().optional(),
});

export type IsolationStep1Data = z.infer<typeof isolationStep1Schema>;
export type IsolationStep2Data = z.infer<typeof isolationStep2Schema>;
export type IsolationStep3PartData = z.infer<typeof isolationStep3PartSchema>;
export type IsolationStep3ProData = z.infer<typeof isolationStep3ProSchema>;
export type IsolationStep4PartData = z.infer<typeof isolationStep4PartSchema>;
export type IsolationStep4ProData = z.infer<typeof isolationStep4ProSchema>;
