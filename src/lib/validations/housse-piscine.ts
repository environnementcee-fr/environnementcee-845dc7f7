import { z } from "zod";

export const houssePiscineStep1Schema = z.object({
  surface: z.coerce.number().min(5, "La surface minimale est de 5 m²").max(200, "La surface maximale est de 200 m²"),
  usage_type: z.string().min(1, "Veuillez sélectionner un type d'usage"),
  postal_code: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
});

export const houssePiscineStep2PartSchema = z.object({
  first_name: z.string().min(2, "Le prénom est requis").max(50),
  last_name: z.string().min(2, "Le nom est requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Numéro de téléphone français invalide"),
  consent_privacy: z.boolean().refine((val) => val === true, "Vous devez accepter la politique de confidentialité"),
  consent_partner: z.boolean(),
});

export type HoussePiscineStep1Data = z.infer<typeof houssePiscineStep1Schema>;
export type HoussePiscineStep2PartData = z.infer<typeof houssePiscineStep2PartSchema>;
