
-- Create supplier_offers table
CREATE TABLE public.supplier_offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL,
  company_name TEXT NOT NULL,
  offer_description TEXT NOT NULL,
  price_details JSONB,
  delivery_terms TEXT,
  payment_terms TEXT,
  valid_until DATE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create voting_sessions table
CREATE TABLE public.voting_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  options JSONB NOT NULL,
  deadline TIMESTAMP WITH TIME ZONE,
  created_by UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.supplier_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voting_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for supplier_offers
CREATE POLICY "Anyone can view supplier offers"
  ON public.supplier_offers
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create supplier offers"
  ON public.supplier_offers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = supplier_id);

CREATE POLICY "Suppliers can update their own offers"
  ON public.supplier_offers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = supplier_id);

-- Create RLS policies for voting_sessions
CREATE POLICY "Anyone can view voting sessions"
  ON public.voting_sessions
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create voting sessions"
  ON public.voting_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Creators can update their voting sessions"
  ON public.voting_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Update votes table to use voting_session_id instead of proposal_id
ALTER TABLE public.votes DROP COLUMN IF EXISTS proposal_id;
ALTER TABLE public.votes ADD COLUMN voting_session_id UUID REFERENCES public.voting_sessions(id) ON DELETE CASCADE;

-- Update RLS policy for votes
DROP POLICY IF EXISTS "Users can vote" ON public.votes;
CREATE POLICY "Users can vote"
  ON public.votes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
