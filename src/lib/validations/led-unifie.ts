import { z } from "zod";

export const ledUnifieSchema = z.object({
  led_types: z.array(z.enum(['bureau', 'entrepot', 'solaire']))
    .min(1, "Sélectionnez au moins un type d'éclairage"),
  company_name: z.string().min(2, "Nom requis").max(100),
  siren: z.string().regex(/^\d{9}$/, "SIREN invalide (9 chiffres)"),
  employees: z.enum(['1-10', '11-50', '51-200', '200+']),
  postal_code: z.string().regex(/^\d{5}$/, "Code postal invalide"),
  total_surface: z.number().min(10, "Minimum 10m²").max(50000, "Maximum 50000m²"),
  first_name: z.string().min(2, "Prénom requis").max(50),
  last_name: z.string().min(2, "Nom requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Téléphone invalide"),
  consent_privacy: z.boolean().refine(val => val === true, "Consentement requis"),
  consent_partner: z.boolean().optional()
});

export type LEDUnifieFormData = z.infer<typeof ledUnifieSchema>;
