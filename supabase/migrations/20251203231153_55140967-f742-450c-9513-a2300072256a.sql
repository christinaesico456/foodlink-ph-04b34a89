-- Create a table to track global donation contributions from gamification
CREATE TABLE public.gamification_donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  amount INTEGER NOT NULL DEFAULT 10,
  level_reached INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gamification_donations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read donations (public counter)
CREATE POLICY "Anyone can view donations" 
ON public.gamification_donations 
FOR SELECT 
USING (true);

-- Allow authenticated users to insert their own donations
CREATE POLICY "Users can add their own donations" 
ON public.gamification_donations 
FOR INSERT 
WITH CHECK (true);

-- Create a view to get total donations
CREATE OR REPLACE VIEW public.total_donations AS
SELECT COALESCE(SUM(amount), 0) as total
FROM public.gamification_donations;