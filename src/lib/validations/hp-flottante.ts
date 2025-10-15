import { z } from "zod";

export const hpFlottanteStep1Schema = z.object({
  building_type: z.string().min(1, "Veuillez sélectionner un type de bâtiment"),
  cold_room_volume: z.coerce.number().min(10, "Le volume minimal est de 10 m³").max(10000, "Le volume maximal est de 10 000 m³"),
  current_temperature: z.coerce.number().min(-30, "Température minimale: -30°C").max(25, "Température maximale: 25°C"),
  operating_hours: z.coerce.number().min(1, "Minimum 1 heure par jour").max(24, "Maximum 24 heures par jour"),
  postal_code: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
});

export const hpFlottanteStep2ProSchema = z.object({
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

export type HPFlottanteStep1Data = z.infer<typeof hpFlottanteStep1Schema>;
export type HPFlottanteStep2ProData = z.infer<typeof hpFlottanteStep2ProSchema>;
