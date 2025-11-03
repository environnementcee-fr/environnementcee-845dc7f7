import { z } from "zod";

export const projectSchema = z.object({
  // Type de travaux
  category: z.enum(['led', 'isolation', 'pac', 'ventilation', 'renovation_globale', 'autre'], {
    required_error: "Veuillez sélectionner un type de travaux"
  }),
  description: z.string()
    .min(120, "La description doit contenir au moins 120 caractères")
    .max(2000, "La description ne peut pas dépasser 2000 caractères"),
  budget_band: z.enum(['<3k', '3-10k', '10-30k', '>30k'], {
    required_error: "Veuillez sélectionner un budget"
  }),
  urgency: z.enum(['urgent', '1-3_mois', '>3_mois'], {
    required_error: "Veuillez sélectionner un délai"
  }),
  photos: z.array(z.string().url()).max(5, "Maximum 5 photos").optional(),
  
  // Lieu
  zip_code: z.string()
    .regex(/^[0-9]{5}$/, "Le code postal doit contenir 5 chiffres"),
  city: z.string()
    .min(1, "La ville est requise")
    .max(100, "Le nom de la ville est trop long"),
  building_type: z.enum(['residentiel', 'tertiaire', 'copropriete'], {
    required_error: "Veuillez sélectionner un type de bâtiment"
  }),
  area_m2: z.number()
    .min(1, "La surface doit être supérieure à 0")
    .max(100000, "La surface semble incorrecte")
    .optional(),
  
  // Coordonnées
  first_name: z.string()
    .min(1, "Le prénom est requis")
    .max(100, "Le prénom est trop long"),
  last_name: z.string()
    .min(1, "Le nom est requis")
    .max(100, "Le nom est trop long"),
  email: z.string()
    .email("Email invalide")
    .max(255, "L'email est trop long"),
  phone: z.string()
    .regex(/^\+?[0-9\s\-\(\)]{6,20}$/, "Numéro de téléphone invalide"),
  
  // Consentement
  consent_rgpd: z.boolean()
    .refine(val => val === true, "Vous devez accepter la politique de confidentialité"),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
