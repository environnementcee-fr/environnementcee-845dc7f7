-- Création de la table pour stocker les demandes CEE
CREATE TABLE public.lead_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Étape 1 : Informations du projet
  building_type TEXT NOT NULL,
  surface INTEGER NOT NULL,
  current_lighting TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  
  -- Étape 2 : Coordonnées de l'entreprise
  company_name TEXT NOT NULL,
  siren TEXT NOT NULL,
  employees TEXT NOT NULL,
  last_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Consentements RGPD
  consent_partner BOOLEAN NOT NULL DEFAULT false,
  consent_privacy BOOLEAN NOT NULL DEFAULT false,
  
  -- Métadonnées de gestion
  status TEXT NOT NULL DEFAULT 'nouveau',
  notes TEXT,
  assigned_to UUID,
  
  -- Traçabilité technique
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT
);

-- Index pour améliorer les performances des requêtes
CREATE INDEX idx_lead_submissions_created_at ON public.lead_submissions(created_at DESC);
CREATE INDEX idx_lead_submissions_status ON public.lead_submissions(status);
CREATE INDEX idx_lead_submissions_email ON public.lead_submissions(email);
CREATE INDEX idx_lead_submissions_postal_code ON public.lead_submissions(postal_code);

-- Activer Row Level Security
ALTER TABLE public.lead_submissions ENABLE ROW LEVEL SECURITY;

-- Policy : Tout le monde peut insérer (formulaire public)
CREATE POLICY "Permettre insertion publique" 
ON public.lead_submissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Policy : Seuls les admins peuvent consulter (sera mis à jour plus tard avec le système de rôles)
CREATE POLICY "Admins peuvent tout voir" 
ON public.lead_submissions 
FOR SELECT 
TO authenticated
USING (true);

-- Policy : Admins peuvent modifier
CREATE POLICY "Admins peuvent modifier" 
ON public.lead_submissions 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Fonction pour mettre à jour automatiquement le timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour actualiser le champ updated_at (si on ajoute cette colonne plus tard)
COMMENT ON TABLE public.lead_submissions IS 'Stocke toutes les demandes d''éligibilité CEE LED';