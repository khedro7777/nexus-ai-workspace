
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Users, Star, MapPin, Award } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import SupplierCard from '@/components/suppliers/SupplierCard';
import EnhancedSupplierCard from '@/components/suppliers/EnhancedSupplierCard';
import SupplierFilters from '@/components/suppliers/SupplierFilters';
import { useSuppliersData } from '@/hooks/useSuppliersData';

interface FilterState {
  search?: string;
  sector?: string;
  verified?: boolean;
}

const Suppliers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  const [useEnhancedView, setUseEnhancedView] = useState(false);
  const { suppliers, loading, addSupplier, updateSupplierStatus } = useSuppliersData();

  const stats = [
    {
      title: 'إجمالي الموردين',
      value: suppliers.length.toString(),
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'موردين موثقين',
      value: suppliers.filter(s => s.status === 'verified').length.toString(),
      icon: Award,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'متوسط التقييم',
      value: suppliers.length > 0 ? (suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1) : '0',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'مدن التغطية',
      value: new Set(suppliers.map(s => s.location)).size.toString(),
      icon: MapPin,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    if (filters.search && !supplier.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.sector && filters.sector !== 'all' && !supplier.category.includes(filters.sector)) {
      return false;
    }
    if (filters.verified && supplier.status !== 'verified') {
      return false;
    }
    return true;
  });

  // Convert suppliers to enhanced format
  const enhancedSuppliers = filteredSuppliers.map(supplier => ({
    id: supplier.id,
    name: supplier.name,
    description: supplier.category,
    logo: supplier.logo,
    rating: supplier.rating,
    reviewCount: Math.floor(Math.random() * 100) + 10,
    location: supplier.location,
    sectors: [supplier.category],
    verified: supplier.status === 'verified',
    responseTime: supplier.responseTime,
    completedOrders: supplier.completedProjects,
    joinedDate: supplier.createdAt,
    specialties: supplier.specialties,
    deliveryRadius: '50 كم',
    contactInfo: supplier.contactInfo,
    portfolioItems: Math.floor(Math.random() * 20) + 5,
    certifications: ['ISO 9001', 'سجل تجاري'],
    workingHours: '8 ص - 6 م',
    languages: ['العربية', 'الإنجليزية']
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">دليل الموردين</h1>
            <p className="text-gray-600">اكتشف وتواصل مع أفضل الموردين المعتمدين</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setUseEnhancedView(!useEnhancedView)}
            >
              {useEnhancedView ? 'العرض العادي' : 'العرض المحسن'}
            </Button>
            <Button 
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600"
              onClick={() => addSupplier({
                name: 'مورد جديد',
                category: 'عام',
                location: 'الرياض'
              })}
            >
              <Plus className="w-4 h-4" />
              انضم كمورد
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SupplierFilters 
              onFilterChange={setFilters}
              activeFilters={filters}
            />
          </div>

          {/* Suppliers List */}
          <div className="lg:col-span-3 space-y-6">
            {useEnhancedView ? (
              // Enhanced view with more detailed cards
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {enhancedSuppliers.map((supplier) => (
                  <EnhancedSupplierCard 
                    key={supplier.id} 
                    supplier={supplier}
                    onContact={(id) => console.log('اتصال بـ:', id)}
                    onViewProfile={(id) => console.log('عرض ملف:', id)}
                    onRequestQuote={(id) => console.log('طلب عرض من:', id)}
                  />
                ))}
              </div>
            ) : (
              // Regular view
              filteredSuppliers.map((supplier) => (
                <SupplierCard key={supplier.id} supplier={{
                  id: supplier.id,
                  name: supplier.name,
                  description: supplier.category,
                  logo: supplier.logo,
                  rating: supplier.rating,
                  reviewCount: Math.floor(Math.random() * 100) + 10,
                  location: supplier.location,
                  sector: [supplier.category],
                  verified: supplier.status === 'verified',
                  responseTime: '2 ساعات',
                  completedOrders: Math.floor(Math.random() * 500) + 50,
                  joinedDate: supplier.createdAt,
                  specialties: [supplier.category],
                  deliveryRadius: '50 كم'
                }} />
              ))
            )}
            {filteredSuppliers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                لا توجد موردين متاحين حاليًا
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
