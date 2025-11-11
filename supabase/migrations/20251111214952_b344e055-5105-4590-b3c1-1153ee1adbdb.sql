-- Supprimer l'ancienne contrainte valid_aid_type
ALTER TABLE public.lead_submissions
  DROP CONSTRAINT IF EXISTS valid_aid_type;

-- Ajouter la nouvelle contrainte avec TOUS les types d'aides
ALTER TABLE public.lead_submissions
  ADD CONSTRAINT valid_aid_type CHECK (
    aid_type IN (
      -- Professionnels
      'led_entrepot', 'led_bureaux', 'led_ext_solaire', 
      'isolation_murs', 'brasseur_air', 'pac_pro', 'hp_flottante',
      -- Particuliers
      'pac_part', 'pv_part', 'isolation_toiture', 'isolation_murs_part',
      'fenetres_part', 'chaudiere_biomasse', 'vmc_double_flux', 'cet_part',
      -- Anciens (rétrocompatibilité)
      'isolation', 'pac', 'led_bureau', 'led_solaire',
      -- Multi-travaux
      'multi_led_pro', 'multi_particulier', 'ma_prime_renov', 'renovation_globale',
      -- Autres
      'housse_piscine', 'led_unifie'
    )
  );