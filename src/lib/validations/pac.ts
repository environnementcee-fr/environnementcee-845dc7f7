import { z } from "zod";

export const pacStep1Schema = z.object({
  heating_system: z.string().min(1, "Veuillez sélectionner un système de chauffage"),
  surface: z.coerce.number().min(20, "La surface minimale est de 20 m²").max(5000, "La surface maximale est de 5 000 m²"),
  pac_type: z.string().min(1, "Veuillez sélectionner un type de PAC"),
  construction_year: z.coerce.number().min(1800, "Année invalide").max(new Date().getFullYear() - 2, "Le bâtiment doit avoir au moins 2 ans"),
  postal_code: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
});

export const pacStep2PartSchema = z.object({
  first_name: z.string().min(2, "Le prénom est requis").max(50),
  last_name: z.string().min(2, "Le nom est requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Numéro de téléphone français invalide"),
  income_bracket: z.string().min(1, "Veuillez sélectionner une tranche de revenus"),
  consent_privacy: z.boolean().refine((val) => val === true, "Vous devez accepter la politique de confidentialité"),
  consent_partner: z.boolean(),
});

export const pacStep2ProSchema = z.object({
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

export type PACStep1Data = z.infer<typeof pacStep1Schema>;
export type PACStep2PartData = z.infer<typeof pacStep2PartSchema>;
export type PACStep2ProData = z.infer<typeof pacStep2ProSchema>;
