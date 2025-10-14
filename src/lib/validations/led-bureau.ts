import { z } from "zod";

export const ledBureauStep1Schema = z.object({
  surface: z.coerce.number().min(20, "La surface minimale est de 20 m²").max(10000, "La surface maximale est de 10 000 m²"),
  fixture_count: z.coerce.number().min(1, "Le nombre de luminaires doit être supérieur à 0").max(5000, "Nombre maximal: 5 000"),
  current_fixture_type: z.string().min(1, "Veuillez sélectionner un type de luminaires"),
  postal_code: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
});

export const ledBureauStep2ProSchema = z.object({
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

export type LEDBureauStep1Data = z.infer<typeof ledBureauStep1Schema>;
export type LEDBureauStep2ProData = z.infer<typeof ledBureauStep2ProSchema>;
