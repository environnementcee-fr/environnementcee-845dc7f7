-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role-based access control
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Drop existing overly permissive RLS policies on lead_submissions
DROP POLICY IF EXISTS "Admins peuvent tout voir" ON public.lead_submissions;
DROP POLICY IF EXISTS "Admins peuvent modifier" ON public.lead_submissions;
DROP POLICY IF EXISTS "Permettre insertion publique" ON public.lead_submissions;

-- Create proper admin-only SELECT policy
CREATE POLICY "Admin users can view all leads"
ON public.lead_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create proper admin-only UPDATE policy
CREATE POLICY "Admin users can update leads"
ON public.lead_submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create admin-only DELETE policy
CREATE POLICY "Admin users can delete leads"
ON public.lead_submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Remove public INSERT policy (will use Edge Function instead)
-- No INSERT policy = no direct client inserts allowed

-- Add database constraints for data validation
ALTER TABLE public.lead_submissions
ADD CONSTRAINT email_format CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
ADD CONSTRAINT surface_positive CHECK (surface > 0 AND surface < 1000000),
ADD CONSTRAINT phone_format CHECK (phone ~* '^\+?[0-9\s\-\(\)]{6,20}$'),
ADD CONSTRAINT postal_code_format CHECK (postal_code ~* '^[0-9]{5}$'),
ADD CONSTRAINT siren_format CHECK (siren ~* '^[0-9]{9}$');

-- Create RLS policy for user_roles (admins can view all roles, users can view their own)
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Create policy for admins to manage roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));