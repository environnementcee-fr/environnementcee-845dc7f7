import { z } from "zod";

export const brasseurAirStep1Schema = z.object({
  usage_type: z.string().min(1, "Veuillez sélectionner un usage"),
  ceiling_height: z.coerce.number().min(2.5, "La hauteur minimale est de 2.5 m").max(15, "La hauteur maximale est de 15 m"),
  surface: z.coerce.number().min(10, "La surface minimale est de 10 m²").max(10000, "La surface maximale est de 10 000 m²"),
  room_count: z.coerce.number().min(1, "Le nombre de pièces/zones doit être supérieur à 0").max(100, "Nombre maximal: 100"),
  postal_code: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
});

export const brasseurAirStep2PartSchema = z.object({
  first_name: z.string().min(2, "Le prénom est requis").max(50),
  last_name: z.string().min(2, "Le nom est requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Numéro de téléphone français invalide"),
  consent_privacy: z.boolean().refine((val) => val === true, "Vous devez accepter la politique de confidentialité"),
  consent_partner: z.boolean(),
});

export const brasseurAirStep2ProSchema = z.object({
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

export type BrasseurAirStep1Data = z.infer<typeof brasseurAirStep1Schema>;
export type BrasseurAirStep2PartData = z.infer<typeof brasseurAirStep2PartSchema>;
export type BrasseurAirStep2ProData = z.infer<typeof brasseurAirStep2ProSchema>;
