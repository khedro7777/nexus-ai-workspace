
-- Add missing columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS skills TEXT,
ADD COLUMN IF NOT EXISTS experience_years INTEGER DEFAULT 0;

-- Add missing columns to supplier_offers table
ALTER TABLE public.supplier_offers 
ADD COLUMN IF NOT EXISTS price NUMERIC,
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS delivery_time TEXT,
ADD COLUMN IF NOT EXISTS terms TEXT;

-- Add missing columns to freelancer_offers table  
ALTER TABLE public.freelancer_offers
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS delivery_time TEXT;

-- Update supplier_offers to use offer_description as description if title is empty
UPDATE public.supplier_offers 
SET title = COALESCE(title, 'عرض مورد'),
    description = COALESCE(description, offer_description)
WHERE title IS NULL OR title = '';

-- Update freelancer_offers to use offer_description as description if title is empty  
UPDATE public.freelancer_offers
SET title = COALESCE(title, 'عرض مستقل'),
    description = COALESCE(description, offer_description)  
WHERE title IS NULL OR title = '';
