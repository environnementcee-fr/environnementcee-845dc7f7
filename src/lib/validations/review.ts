import { z } from "zod";

export const reviewSchema = z.object({
  artisan_id: z.string().uuid("ID d'artisan invalide"),
  project_id: z.string().uuid("ID de projet invalide"),
  rating: z.number()
    .min(1, "La note doit être entre 1 et 5")
    .max(5, "La note doit être entre 1 et 5"),
  comment: z.string()
    .min(20, "Votre commentaire doit contenir au moins 20 caractères")
    .max(500, "Votre commentaire ne peut pas dépasser 500 caractères")
    .optional(),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
