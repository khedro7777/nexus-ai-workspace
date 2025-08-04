
import React, { useState } from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import HomepageFilters, { FilterState } from '@/components/filters/HomepageFilters';
import PortalSlider from '@/components/home/PortalSlider';
import FeatureCards from '@/components/cards/FeatureCards';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    portalType: '',
    country: '',
    status: '',
    role: ''
  });

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Here you can implement filtering logic
    console.log('Filters updated:', newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <HomepageFilters onFiltersChange={handleFiltersChange} />
        
        {/* Portal Slider */}
        <PortalSlider />
        
        {/* Feature Cards */}
        <FeatureCards />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
