
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Users, Star, MapPin, Award } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import SupplierCard from '@/components/suppliers/SupplierCard';
import SupplierFilters from '@/components/suppliers/SupplierFilters';
import { useSuppliersData } from '@/hooks/useSuppliersData';

const Suppliers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const { suppliers, loading, addSupplier, updateSupplier } = useSuppliersData();

  const stats = [
    {
      title: 'إجمالي الموردين',
      value: suppliers.length.toString(),
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'موردين موثقين',
      value: suppliers.filter(s => s.verified).length.toString(),
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
    if (filters.sector && filters.sector !== 'all' && !supplier.sector.includes(filters.sector)) {
      return false;
    }
    if (filters.verified && !supplier.verified) {
      return false;
    }
    return true;
  });

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
          <Button 
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600"
            onClick={() => addSupplier({
              name: 'مورد جديد',
              description: 'وصف المورد',
              sector: ['عام'],
              location: 'الرياض'
            })}
          >
            <Plus className="w-4 h-4" />
            انضم كمورد
          </Button>
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
            {filteredSuppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
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
