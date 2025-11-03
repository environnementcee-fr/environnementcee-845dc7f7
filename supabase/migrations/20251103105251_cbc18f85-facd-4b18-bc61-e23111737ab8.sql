-- Migration 2: Création de toutes les tables du module artisans

-- Table projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Type de travaux
  category TEXT NOT NULL CHECK (category IN ('led', 'isolation', 'pac', 'ventilation', 'renovation_globale', 'autre')),
  description TEXT NOT NULL CHECK (char_length(description) >= 120),
  budget_band TEXT NOT NULL CHECK (budget_band IN ('<3k', '3-10k', '10-30k', '>30k')),
  urgency TEXT NOT NULL CHECK (urgency IN ('urgent', '1-3_mois', '>3_mois')),
  photos JSONB DEFAULT '[]'::jsonb,
  
  -- Lieu
  zip_code TEXT NOT NULL,
  city TEXT NOT NULL,
  building_type TEXT NOT NULL CHECK (building_type IN ('residentiel', 'tertiaire', 'copropriete')),
  area_m2 INTEGER,
  
  -- Coordonnées client
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Score d'éligibilité
  eligibility_score INTEGER DEFAULT 0 CHECK (eligibility_score >= 0 AND eligibility_score <= 10),
  
  -- Statuts
  status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'published', 'matched', 'closed')),
  
  -- Coordonnées débloquées pour
  contact_unlocked_for UUID REFERENCES auth.users(id),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_zip_code ON public.projects(zip_code);

-- Table artisan_profiles
CREATE TABLE IF NOT EXISTS public.artisan_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Infos entreprise
  company_name TEXT NOT NULL,
  siret TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Métiers & zones
  trades TEXT[] NOT NULL,
  zones TEXT[] NOT NULL,
  
  -- Certifications
  certifications JSONB DEFAULT '[]'::jsonb,
  website TEXT,
  
  -- Notation
  rating_avg NUMERIC(2,1) DEFAULT 0 CHECK (rating_avg >= 0 AND rating_avg <= 5),
  rating_count INTEGER DEFAULT 0,
  
  -- Abonnement
  subscription_active BOOLEAN DEFAULT FALSE,
  subscription_expires_at TIMESTAMPTZ,
  
  -- Modération
  status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'rejected', 'suspended')),
  
  -- Slug pour URL publique
  slug TEXT UNIQUE,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_artisan_profiles_user_id ON public.artisan_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_artisan_profiles_status ON public.artisan_profiles(status);
CREATE INDEX IF NOT EXISTS idx_artisan_profiles_trades ON public.artisan_profiles USING GIN(trades);
CREATE INDEX IF NOT EXISTS idx_artisan_profiles_zones ON public.artisan_profiles USING GIN(zones);
CREATE INDEX IF NOT EXISTS idx_artisan_profiles_slug ON public.artisan_profiles(slug);

-- Table responses
CREATE TABLE IF NOT EXISTS public.responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  artisan_id UUID NOT NULL REFERENCES public.artisan_profiles(id) ON DELETE CASCADE,
  
  message TEXT NOT NULL,
  estimated_timeline TEXT,
  
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'selected', 'not_selected')),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(project_id, artisan_id)
);

CREATE INDEX IF NOT EXISTS idx_responses_project_id ON public.responses(project_id);
CREATE INDEX IF NOT EXISTS idx_responses_artisan_id ON public.responses(artisan_id);
CREATE INDEX IF NOT EXISTS idx_responses_status ON public.responses(status);

-- Table reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artisan_id UUID NOT NULL REFERENCES public.artisan_profiles(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  is_moderated BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(project_id, artisan_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_artisan_id ON public.reviews(artisan_id);
CREATE INDEX IF NOT EXISTS idx_reviews_project_id ON public.reviews(project_id);
CREATE INDEX IF NOT EXISTS idx_reviews_is_approved ON public.reviews(is_approved);

-- Table audit_log
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_type ON public.audit_log(type);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at DESC);

-- Triggers pour updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_artisan_profiles_updated_at
  BEFORE UPDATE ON public.artisan_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Fonction pour générer le slug artisan
CREATE OR REPLACE FUNCTION public.generate_artisan_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL THEN
    NEW.slug := lower(regexp_replace(NEW.company_name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substring(NEW.id::text, 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER generate_artisan_slug_trigger
  BEFORE INSERT ON public.artisan_profiles
  FOR EACH ROW EXECUTE FUNCTION public.generate_artisan_slug();

-- RLS Policies pour projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Clients can create projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Clients can update own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Artisans can view published projects"
  ON public.projects FOR SELECT
  USING (
    status = 'published' 
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'artisan'::app_role
    )
  );

CREATE POLICY "Admins can view all projects"
  ON public.projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'::app_role
    )
  );

CREATE POLICY "Admins can update all projects"
  ON public.projects FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'::app_role
    )
  );

-- RLS Policies pour artisan_profiles
ALTER TABLE public.artisan_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artisans can view own profile"
  ON public.artisan_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Artisans can create profile"
  ON public.artisan_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Artisans can update own profile"
  ON public.artisan_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Everyone can view approved artisans"
  ON public.artisan_profiles FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Admins can view all artisan profiles"
  ON public.artisan_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'::app_role
    )
  );

CREATE POLICY "Admins can update all artisan profiles"
  ON public.artisan_profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'::app_role
    )
  );

-- RLS Policies pour responses
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artisans can view own responses"
  ON public.responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.artisan_profiles
      WHERE artisan_profiles.id = responses.artisan_id
      AND artisan_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Clients can view responses to own projects"
  ON public.responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = responses.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Subscribed artisans can create responses"
  ON public.responses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.artisan_profiles
      WHERE artisan_profiles.id = responses.artisan_id
      AND artisan_profiles.user_id = auth.uid()
      AND artisan_profiles.subscription_active = TRUE
    )
  );

CREATE POLICY "Admins can view all responses"
  ON public.responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'::app_role
    )
  );

-- RLS Policies pour reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Everyone can view approved reviews"
  ON public.reviews FOR SELECT
  USING (is_approved = TRUE);

CREATE POLICY "Admins can view all reviews"
  ON public.reviews FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'::app_role
    )
  );

CREATE POLICY "Admins can update all reviews"
  ON public.reviews FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'::app_role
    )
  );

-- RLS Policies pour audit_log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit log"
  ON public.audit_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'::app_role
    )
  );