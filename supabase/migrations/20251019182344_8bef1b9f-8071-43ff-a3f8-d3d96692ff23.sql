-- Supprimer l'ancienne contrainte
ALTER TABLE public.lead_submissions
  DROP CONSTRAINT IF EXISTS valid_aid_type;

-- Ajouter la nouvelle contrainte avec multi_particulier et led_unifie
ALTER TABLE public.lead_submissions
  ADD CONSTRAINT valid_aid_type CHECK (
    aid_type IN (
      'led_entrepot',
      'led_bureau', 
      'led_solaire',
      'led_unifie',
      'isolation',
      'pac',
      'brasseur_air',
      'housse_piscine',
      'multi_particulier'
    )
  );