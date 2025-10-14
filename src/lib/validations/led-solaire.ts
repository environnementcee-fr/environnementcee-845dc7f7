import { z } from "zod";

export const ledSolaireStep1Schema = z.object({
  fixture_count: z.coerce.number().min(1, "Le nombre de points lumineux doit être supérieur à 0").max(1000, "Nombre maximal: 1 000"),
  zone_type: z.string().min(1, "Veuillez sélectionner un type de zone"),
  sun_exposure: z.string().min(1, "Veuillez sélectionner une exposition"),
  lamppost_height: z.coerce.number().min(2, "La hauteur minimale est de 2 m").max(15, "La hauteur maximale est de 15 m"),
  postal_code: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
});

export const ledSolaireStep2ProSchema = z.object({
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

export type LEDSolaireStep1Data = z.infer<typeof ledSolaireStep1Schema>;
export type LEDSolaireStep2ProData = z.infer<typeof ledSolaireStep2ProSchema>;
