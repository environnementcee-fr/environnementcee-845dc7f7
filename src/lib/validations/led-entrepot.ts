import { z } from "zod";

// Étape 1: Type de bâtiment
export const ledEntrepotStep1Schema = z.object({
  building_type: z.string().min(1, "Veuillez sélectionner un type de bâtiment"),
});

// Étape 2: Détails du projet
export const ledEntrepotStep2Schema = z.object({
  surface: z.coerce.number().min(100, "La surface minimale est de 100 m²").max(50000, "La surface maximale est de 50 000 m²"),
  ceiling_height: z.coerce.number().min(4, "La hauteur minimale est de 4 m").max(20, "La hauteur maximale est de 20 m"),
  current_fixture_type: z.string().min(1, "Veuillez sélectionner un type de luminaires"),
  fixture_count: z.coerce.number().min(1, "Le nombre de luminaires doit être supérieur à 0").max(10000, "Nombre maximal: 10 000"),
  postal_code: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
});

// Étape 3: Situation
export const ledEntrepotStep3Schema = z.object({
  company_name: z.string().min(2, "Le nom de l'entreprise est requis").max(100),
  siren: z.string().regex(/^\d{9}$/, "Le SIREN doit contenir 9 chiffres"),
  employees: z.string().min(1, "Veuillez sélectionner un effectif"),
});

// Étape 4: Coordonnées
export const ledEntrepotStep4Schema = z.object({
  first_name: z.string().min(2, "Le prénom est requis").max(50),
  last_name: z.string().min(2, "Le nom est requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Numéro de téléphone français invalide"),
  consent_privacy: z.boolean().refine((val) => val === true, "Vous devez accepter la politique de confidentialité"),
  consent_partner: z.boolean().optional(),
});

export type LEDEntrepotStep1Data = z.infer<typeof ledEntrepotStep1Schema>;
export type LEDEntrepotStep2Data = z.infer<typeof ledEntrepotStep2Schema>;
export type LEDEntrepotStep3Data = z.infer<typeof ledEntrepotStep3Schema>;
export type LEDEntrepotStep4Data = z.infer<typeof ledEntrepotStep4Schema>;
