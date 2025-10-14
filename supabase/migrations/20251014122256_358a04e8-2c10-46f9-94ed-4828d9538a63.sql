-- Migration pour adapter lead_submissions aux formulaires spécifiques par aide

-- Ajouter les nouveaux champs à la table lead_submissions
ALTER TABLE public.lead_submissions
  ADD COLUMN IF NOT EXISTS aid_type TEXT NOT NULL DEFAULT 'led_entrepot',
  ADD COLUMN IF NOT EXISTS user_type TEXT NOT NULL DEFAULT 'professionnel',
  ADD COLUMN IF NOT EXISTS project_data JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS ceiling_height DECIMAL(5,2),
  ADD COLUMN IF NOT EXISTS fixture_count INTEGER,
  ADD COLUMN IF NOT EXISTS current_fixture_type TEXT,
  ADD COLUMN IF NOT EXISTS insulation_type TEXT,
  ADD COLUMN IF NOT EXISTS heating_system TEXT,
  ADD COLUMN IF NOT EXISTS wall_material TEXT,
  ADD COLUMN IF NOT EXISTS construction_year INTEGER,
  ADD COLUMN IF NOT EXISTS income_bracket TEXT,
  ADD COLUMN IF NOT EXISTS zone_type TEXT,
  ADD COLUMN IF NOT EXISTS sun_exposure TEXT,
  ADD COLUMN IF NOT EXISTS lamppost_height DECIMAL(5,2),
  ADD COLUMN IF NOT EXISTS room_count INTEGER,
  ADD COLUMN IF NOT EXISTS usage_type TEXT,
  ADD COLUMN IF NOT EXISTS pac_type TEXT,
  ADD COLUMN IF NOT EXISTS cold_room_volume DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS target_temperature DECIMAL(5,2);

-- Rendre optionnels les champs qui ne s'appliquent pas à tous les types d'aides
ALTER TABLE public.lead_submissions
  ALTER COLUMN building_type DROP NOT NULL,
  ALTER COLUMN surface DROP NOT NULL,
  ALTER COLUMN current_lighting DROP NOT NULL,
  ALTER COLUMN company_name DROP NOT NULL,
  ALTER COLUMN siren DROP NOT NULL,
  ALTER COLUMN employees DROP NOT NULL;

-- Ajouter une contrainte pour valider aid_type
ALTER TABLE public.lead_submissions
  ADD CONSTRAINT valid_aid_type CHECK (
    aid_type IN (
      'led_entrepot',
      'led_bureau', 
      'led_solaire',
      'isolation',
      'pac',
      'brasseur_air',
      'housse_piscine'
    )
  );

-- Ajouter une contrainte pour valider user_type
ALTER TABLE public.lead_submissions
  ADD CONSTRAINT valid_user_type CHECK (
    user_type IN ('particulier', 'professionnel')
  );

-- Ajouter un index sur aid_type pour améliorer les performances des requêtes
CREATE INDEX IF NOT EXISTS idx_lead_submissions_aid_type ON public.lead_submissions(aid_type);

-- Ajouter un index sur user_type
CREATE INDEX IF NOT EXISTS idx_lead_submissions_user_type ON public.lead_submissions(user_type);

-- Ajouter un commentaire sur la table pour documenter les changements
COMMENT ON COLUMN public.lead_submissions.aid_type IS 'Type d''aide CEE demandée (led_entrepot, led_bureau, led_solaire, isolation, pac, brasseur_air, housse_piscine)';
COMMENT ON COLUMN public.lead_submissions.user_type IS 'Type d''utilisateur (particulier, professionnel)';
COMMENT ON COLUMN public.lead_submissions.project_data IS 'Données flexibles du projet au format JSON';