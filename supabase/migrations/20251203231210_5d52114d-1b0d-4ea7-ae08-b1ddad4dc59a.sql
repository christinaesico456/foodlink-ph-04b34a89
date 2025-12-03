-- Fix the search_path security warning
DROP FUNCTION IF EXISTS public.get_total_donations();

CREATE OR REPLACE FUNCTION public.get_total_donations()
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT COALESCE(SUM(amount)::INTEGER, 0)
  FROM public.gamification_donations;
$$;