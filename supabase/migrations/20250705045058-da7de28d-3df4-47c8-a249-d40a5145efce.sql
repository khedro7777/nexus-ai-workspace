
-- Create table for user services/gateways that can be sold
CREATE TABLE public.user_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price_points INTEGER NOT NULL DEFAULT 0,
  features TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  total_sales INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for service purchases
CREATE TABLE public.service_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES public.user_services(id) ON DELETE CASCADE NOT NULL,
  buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  points_paid INTEGER NOT NULL,
  commission_points INTEGER NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for point withdrawals
CREATE TABLE public.point_withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  points_amount INTEGER NOT NULL,
  money_amount DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2) DEFAULT 5.00,
  commission_amount DECIMAL(10,2) NOT NULL,
  net_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE NULL
);

-- Enable RLS
ALTER TABLE public.user_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_withdrawals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_services
CREATE POLICY "Anyone can view active services" ON public.user_services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can manage their own services" ON public.user_services
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for service_purchases
CREATE POLICY "Users can view their purchases and sales" ON public.service_purchases
  FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Users can create purchases" ON public.service_purchases
  FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- RLS Policies for point_withdrawals
CREATE POLICY "Users can view their own withdrawals" ON public.point_withdrawals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own withdrawals" ON public.point_withdrawals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to handle service purchase
CREATE OR REPLACE FUNCTION public.purchase_service(
  p_service_id UUID,
  p_buyer_id UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  service_record RECORD;
  commission_points INTEGER;
  net_points INTEGER;
BEGIN
  -- Get service details
  SELECT * INTO service_record 
  FROM public.user_services 
  WHERE id = p_service_id AND is_active = true;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Calculate commission (5%)
  commission_points := ROUND(service_record.price_points * 0.05);
  net_points := service_record.price_points - commission_points;
  
  -- Deduct points from buyer
  IF NOT public.manage_user_points(
    p_buyer_id, 
    p_service_id, 
    service_record.price_points, 
    'deduct', 
    'Purchase: ' || service_record.title
  ) THEN
    RETURN FALSE;
  END IF;
  
  -- Add points to seller (minus commission)
  PERFORM public.manage_user_points(
    service_record.user_id, 
    p_service_id, 
    net_points, 
    'earn', 
    'Sale: ' || service_record.title
  );
  
  -- Record the purchase
  INSERT INTO public.service_purchases (
    service_id, buyer_id, seller_id, points_paid, commission_points
  ) VALUES (
    p_service_id, p_buyer_id, service_record.user_id, 
    service_record.price_points, commission_points
  );
  
  -- Update service sales count
  UPDATE public.user_services 
  SET total_sales = total_sales + 1 
  WHERE id = p_service_id;
  
  RETURN TRUE;
END;
$$;
