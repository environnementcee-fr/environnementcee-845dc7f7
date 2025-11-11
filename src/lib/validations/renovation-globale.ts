import { z } from "zod";

export const renovationGlobaleSchema = z.object({
  // Profil
  segment: z.enum(["part", "pro"]),
  
  // Aides souhaitées
  aides_souhaitees: z.array(z.string()).min(1, "Sélectionnez au moins une aide"),
  
  // Travaux sélectionnés
  travaux_selectionnes: z.array(z.string()).min(1, "Sélectionnez au moins un type de travaux"),
  
  // Contexte chantier - Commun
  postal_code: z.string().regex(/^\d{5}$/, "Code postal invalide"),
  ville: z.string().min(2, "Ville requise"),
  surface: z.number().min(1, "Surface requise"),
  construction_year: z.number()
    .min(1800, "Année invalide")
    .max(new Date().getFullYear(), "Année invalide"),
  
  // Contexte - Particulier
  building_type: z.enum(["maison", "appartement"]).optional(),
  statut_occupant: z.enum(["proprietaire_occupant", "proprietaire_bailleur", "locataire"]).optional(),
  nb_personnes: z.number().min(1).optional(),
  revenu_fiscal: z.number().min(0).optional(),
  
  // Contexte - Pro
  siret: z.string().optional(),
  raison_sociale: z.string().optional(),
  type_site: z.enum(["tertiaire", "industriel", "commercial"]).optional(),
  
  // Détails travaux (structure flexible)
  details_travaux: z.record(z.any()).optional(),
  
  // Coordonnées
  first_name: z.string().min(2, "Prénom requis"),
  last_name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(/^[0-9\s\-\+]{10,}$/, "Téléphone invalide"),
  
  // Consentements
  consent_privacy: z.boolean().refine(val => val === true, "Consentement RGPD requis"),
  consent_partner: z.boolean().refine(val => val === true, "Consentement transmission requis"),
  
  // Optionnels
  description: z.string().optional(),
  budget: z.string().optional(),
  delai: z.string().optional(),
});

export type RenovationGlobaleData = z.infer<typeof renovationGlobaleSchema>;
