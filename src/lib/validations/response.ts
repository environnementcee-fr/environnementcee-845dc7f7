import { z } from "zod";

export const responseSchema = z.object({
  project_id: z.string().uuid("ID de projet invalide"),
  artisan_id: z.string().uuid("ID d'artisan invalide"),
  message: z.string()
    .min(50, "Votre message doit contenir au moins 50 caractères")
    .max(1000, "Votre message ne peut pas dépasser 1000 caractères"),
  estimated_timeline: z.string()
    .max(200, "Le délai est trop long")
    .optional(),
});

export type ResponseFormData = z.infer<typeof responseSchema>;
