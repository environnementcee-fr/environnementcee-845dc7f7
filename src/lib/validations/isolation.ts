import { z } from "zod";

export const isolationStep1Schema = z.object({
  building_type: z.string().min(1, "Veuillez sélectionner un type de bâtiment"),
  surface: z.coerce.number().min(10, "La surface minimale est de 10 m²").max(5000, "La surface maximale est de 5 000 m²"),
  wall_material: z.string().min(1, "Veuillez sélectionner un matériau"),
  insulation_type: z.string().min(1, "Veuillez sélectionner un type d'isolation"),
  construction_year: z.coerce.number().min(1800, "Année invalide").max(new Date().getFullYear() - 2, "Le bâtiment doit avoir au moins 2 ans"),
  postal_code: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
});

export const isolationStep2PartSchema = z.object({
  first_name: z.string().min(2, "Le prénom est requis").max(50),
  last_name: z.string().min(2, "Le nom est requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Numéro de téléphone français invalide"),
  income_bracket: z.string().min(1, "Veuillez sélectionner une tranche de revenus"),
  consent_privacy: z.boolean().refine((val) => val === true, "Vous devez accepter la politique de confidentialité"),
  consent_partner: z.boolean(),
});

export const isolationStep2ProSchema = z.object({
  company_name: z.string().min(2, "Le nom de l'entreprise est requis").max(100),
  siren: z.string().regex(/^\d{9}$/, "Le SIREN doit contenir 9 chiffres"),
  employees: z.string().min(1, "Veuillez sélectionner un effectif"),
  first_name: z.string().min(2, "Le prénom est requis").max(50),
  last_name: z.string().min(2, "Le nom est requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Numéro de téléphone français invalide"),
  consent_privacy: z.boolean().refine((val) => val === true, "Vous devez accepter la politique de confidentialité"),
  consent_partner: z.boolean(),
});

export type IsolationStep1Data = z.infer<typeof isolationStep1Schema>;
export type IsolationStep2PartData = z.infer<typeof isolationStep2PartSchema>;
export type IsolationStep2ProData = z.infer<typeof isolationStep2ProSchema>;
