import { z } from "zod";

export const leadProSchema = z.object({
  // Étape 1 - Projet
  type_travaux: z.string().min(1, "Type de travaux requis"),
  description_besoins: z.string().min(20, "Décrivez votre projet (minimum 20 caractères)").max(1000),
  budget_estime: z.enum(['moins_5k', '5_20k', '20_100k', 'plus_100k', 'a_definir']),
  delai_souhaite: z.enum(['immediat', 'moins_1_mois', '1_3_mois', 'plus_3_mois']),
  
  // Étape 2 - Lieu & volumétrie
  adresse_site: z.string().min(5, "Adresse requise"),
  ville: z.string().min(2, "Ville requise"),
  code_postal: z.string().regex(/^\d{5}$/, "Code postal invalide (5 chiffres)"),
  type_batiment: z.enum(['entrepot', 'bureaux', 'commerce', 'industriel', 'autre']),
  
  // Conditionnels LED
  nb_luminaires: z.number().optional(),
  hauteur_plafond: z.number().optional(),
  usage_eclairage: z.enum(['continu', 'intermittent', 'mixte']).optional(),
  
  // Conditionnels Isolation
  surface_isolation: z.number().optional(),
  type_isolation: z.enum(['ITI', 'ITE', 'a_definir']).optional(),
  
  // Conditionnels PAC
  puissance_actuelle: z.number().optional(),
  energie_existante: z.enum(['gaz', 'fioul', 'electrique', 'autre']).optional(),
  surface_chauffage: z.number().optional(),
  
  // Conditionnels Chambre froide
  volume_chambre: z.number().optional(),
  usage_chambre: z.string().optional(),
  temperature_cible: z.number().optional(),
  
  // Étape 3 - Société & contact
  raison_sociale: z.string().min(2, "Raison sociale requise").max(100),
  siren: z.string().regex(/^\d{9}$/, "SIREN invalide (9 chiffres)"),
  secteur_activite: z.string().min(2, "Secteur d'activité requis"),
  nom: z.string().min(2, "Nom requis").max(50),
  prenom: z.string().min(2, "Prénom requis").max(50),
  email: z.string().email("Email invalide").max(255),
  telephone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Téléphone invalide"),
  consent_privacy: z.boolean().refine(val => val === true, "Consentement requis"),
  consent_partner: z.boolean().optional(),
});

export type LeadProFormData = z.infer<typeof leadProSchema>;
