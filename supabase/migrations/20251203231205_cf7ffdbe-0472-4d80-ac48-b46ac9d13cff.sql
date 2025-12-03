-- Drop the security definer view and create a regular function instead
DROP VIEW IF EXISTS public.total_donations;

-- Create a regular function to get total donations (safer)
CREATE OR REPLACE FUNCTION public.get_total_donations()
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY INVOKER
AS $$
  SELECT COALESCE(SUM(amount)::INTEGER, 0)
  FROM public.gamification_donations;
$$;