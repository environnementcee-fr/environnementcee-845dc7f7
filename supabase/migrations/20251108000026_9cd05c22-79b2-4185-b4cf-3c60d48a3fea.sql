-- Add eligibility columns to lead_submissions table
ALTER TABLE public.lead_submissions
ADD COLUMN IF NOT EXISTS eligibility_score integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS estimated_aids jsonb DEFAULT '{}',
ADD COLUMN IF NOT EXISTS mpr_category text;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_lead_submissions_eligibility_score 
ON public.lead_submissions(eligibility_score);

CREATE INDEX IF NOT EXISTS idx_lead_submissions_mpr_category 
ON public.lead_submissions(mpr_category);

-- Add comment for documentation
COMMENT ON COLUMN public.lead_submissions.eligibility_score IS 'Score d''éligibilité calculé automatiquement (0-100)';
COMMENT ON COLUMN public.lead_submissions.estimated_aids IS 'Montants estimés des aides disponibles (MaPrimeRénov, CEE, etc.)';
COMMENT ON COLUMN public.lead_submissions.mpr_category IS 'Catégorie MaPrimeRénov (bleu, jaune, violet, rose) si applicable';