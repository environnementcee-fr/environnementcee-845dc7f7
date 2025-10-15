import { z } from "zod";

// Étape 1: Type d'usage
export const brasseurAirStep1Schema = z.object({
  usage_type: z.string().min(1, "Veuillez sélectionner un usage"),
  user_type: z.string().min(1, "Veuillez sélectionner un type"),
});

// Étape 2: Détails du projet
export const brasseurAirStep2Schema = z.object({
  ceiling_height: z.coerce.number().min(2.5, "La hauteur minimale est de 2.5 m").max(15, "La hauteur maximale est de 15 m"),
  surface: z.coerce.number().min(10, "La surface minimale est de 10 m²").max(10000, "La surface maximale est de 10 000 m²"),
  room_count: z.coerce.number().min(1, "Le nombre de pièces/zones doit être supérieur à 0").max(100, "Nombre maximal: 100"),
  postal_code: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
});

// Étape 3: Situation (Particulier)
export const brasseurAirStep3PartSchema = z.object({
  household_size: z.coerce.number().min(1).max(20),
});

// Étape 3: Situation (Professionnel)
export const brasseurAirStep3ProSchema = z.object({
  company_name: z.string().min(2, "Le nom de l'entreprise est requis").max(100),
  siren: z.string().regex(/^\d{9}$/, "Le SIREN doit contenir 9 chiffres"),
  employees: z.string().min(1, "Veuillez sélectionner un effectif"),
});

// Étape 4: Coordonnées (Particulier)
export const brasseurAirStep4PartSchema = z.object({
  first_name: z.string().min(2, "Le prénom est requis").max(50),
  last_name: z.string().min(2, "Le nom est requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Numéro de téléphone français invalide"),
  consent_privacy: z.boolean().refine((val) => val === true, "Vous devez accepter la politique de confidentialité"),
  consent_partner: z.boolean().optional(),
});

// Étape 4: Coordonnées (Professionnel)
export const brasseurAirStep4ProSchema = z.object({
  first_name: z.string().min(2, "Le prénom est requis").max(50),
  last_name: z.string().min(2, "Le nom est requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Numéro de téléphone français invalide"),
  consent_privacy: z.boolean().refine((val) => val === true, "Vous devez accepter la politique de confidentialité"),
  consent_partner: z.boolean().optional(),
});

export type BrasseurAirStep1Data = z.infer<typeof brasseurAirStep1Schema>;
export type BrasseurAirStep2Data = z.infer<typeof brasseurAirStep2Schema>;
export type BrasseurAirStep3PartData = z.infer<typeof brasseurAirStep3PartSchema>;
export type BrasseurAirStep3ProData = z.infer<typeof brasseurAirStep3ProSchema>;
export type BrasseurAirStep4PartData = z.infer<typeof brasseurAirStep4PartSchema>;
export type BrasseurAirStep4ProData = z.infer<typeof brasseurAirStep4ProSchema>;
