import { z } from "zod";

export const artisanProfileSchema = z.object({
  // Entreprise
  company_name: z.string()
    .min(1, "La raison sociale est requise")
    .max(200, "La raison sociale est trop longue"),
  siret: z.string()
    .regex(/^[0-9]{14}$/, "Le SIRET doit contenir 14 chiffres"),
  contact_person: z.string()
    .min(1, "Le nom du contact est requis")
    .max(100, "Le nom du contact est trop long"),
  email: z.string()
    .email("Email invalide")
    .max(255, "L'email est trop long"),
  phone: z.string()
    .regex(/^\+?[0-9\s\-\(\)]{6,20}$/, "Numéro de téléphone invalide"),
  
  // Métiers et zones
  trades: z.array(z.string())
    .min(1, "Veuillez sélectionner au moins un métier")
    .max(10, "Maximum 10 métiers"),
  zones: z.array(z.string())
    .min(1, "Veuillez sélectionner au moins une zone d'intervention")
    .max(50, "Maximum 50 zones"),
  
  // Certifications (optionnel)
  certifications: z.array(z.object({
    type: z.string(),
    file_url: z.string().url().optional(),
  })).optional(),
  
  website: z.string()
    .url("URL invalide")
    .optional()
    .or(z.literal("")),
  
  // Consentement
  consent_rgpd: z.boolean()
    .refine(val => val === true, "Vous devez accepter la politique de confidentialité"),
  consent_cgu: z.boolean()
    .refine(val => val === true, "Vous devez accepter les conditions générales d'utilisation"),
});

export type ArtisanProfileFormData = z.infer<typeof artisanProfileSchema>;
