import { z } from "zod";

export const maPrimeRenovSchema = z.object({
  selected_aids: z.array(z.enum([
    'isolation', 'pac', 'panneaux_solaires',
    'brasseur_air', 'audit_energetique', 'ventilation'
  ])).min(1, "Sélectionnez au moins une aide"),

  // Infos logement
  building_type: z.enum(['maison', 'appartement']),
  postal_code: z.string().regex(/^\d{5}$/, "Code postal invalide"),
  surface: z.number().min(10, "Minimum 10m²").max(500, "Maximum 500m²"),
  construction_year: z.number().min(1800, "Année invalide").max(2025, "Année invalide"),

  // Champs conditionnels - Isolation
  isolation_type: z.string().optional(),
  isolation_surface: z.number().optional(),
  isolation_wall_material: z.string().optional(),

  // Champs conditionnels - PAC
  pac_heating_system: z.string().optional(),
  pac_surface: z.number().optional(),

  // Champs conditionnels - Panneaux Solaires
  solar_roof_surface: z.number().optional(),
  solar_orientation: z.string().optional(),
  solar_roof_type: z.string().optional(),
  solar_annual_consumption: z.number().optional(),

  // Champs conditionnels - Brasseur Air
  brasseur_ceiling_height: z.number().optional(),
  brasseur_room_count: z.number().optional(),
  brasseur_surface: z.number().optional(),

  income_bracket: z.enum(['tres_modeste', 'modeste', 'intermediaire', 'superieur']),

  first_name: z.string().min(2, "Prénom requis").max(50),
  last_name: z.string().min(2, "Nom requis").max(50),
  email: z.string().email("Email invalide").max(255),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, "Téléphone invalide"),
  consent_privacy: z.boolean().refine(val => val === true, "Consentement requis"),
  consent_partner: z.boolean().optional()
}).refine((data) => {
  if (data.selected_aids.includes('isolation')) {
    return data.isolation_type && data.isolation_surface;
  }
  return true;
}, {
  message: "Les détails de l'isolation sont requis",
  path: ["isolation_type"]
}).refine((data) => {
  if (data.selected_aids.includes('pac')) {
    return data.pac_heating_system && data.pac_surface;
  }
  return true;
}, {
  message: "Les détails de la pompe à chaleur sont requis",
  path: ["pac_heating_system"]
}).refine((data) => {
  if (data.selected_aids.includes('panneaux_solaires')) {
    return data.solar_roof_surface && data.solar_orientation && data.solar_roof_type;
  }
  return true;
}, {
  message: "Les détails des panneaux solaires sont requis",
  path: ["solar_roof_surface"]
}).refine((data) => {
  if (data.selected_aids.includes('brasseur_air')) {
    return data.brasseur_ceiling_height && data.brasseur_room_count;
  }
  return true;
}, {
  message: "Les détails du brasseur d'air sont requis",
  path: ["brasseur_ceiling_height"]
});

export type MaPrimeRenovFormData = z.infer<typeof maPrimeRenovSchema>;
