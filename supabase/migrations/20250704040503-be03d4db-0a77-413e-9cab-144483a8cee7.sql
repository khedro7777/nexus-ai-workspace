
-- Create freelancer_offers table
CREATE TABLE public.freelancer_offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  delivery_time TEXT NOT NULL,
  skills_required TEXT[],
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.freelancer_offers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for freelancer_offers
CREATE POLICY "Anyone can view freelancer offers"
  ON public.freelancer_offers
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create freelancer offers"
  ON public.freelancer_offers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = freelancer_id);

CREATE POLICY "Freelancers can update their own offers"
  ON public.freelancer_offers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = freelancer_id);
