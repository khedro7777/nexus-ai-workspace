
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Users, Star, MapPin, Award } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import SupplierCard from '@/components/suppliers/SupplierCard';
import SupplierFilters from '@/components/suppliers/SupplierFilters';

const Suppliers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const suppliers = [
    {
      id: '1',
      name: 'شركة الإمداد المتميز',
      description: 'متخصصون في توريد الأجهزة التقنية والحلول الذكية للشركات والمؤسسات',
      rating: 4.8,
      reviewCount: 124,
      location: 'الرياض',
      sector: ['تكنولوجيا', 'أجهزة إلكترونية'],
      verified: true,
      responseTime: 'خلال ساعة',
      completedOrders: 89,
      joinedDate: '2020',
      specialties: ['أجهزة كمبيوتر', 'شبكات', 'أنظمة أمان'],
      deliveryRadius: '50 كم'
    },
    {
      id: '2',
      name: 'مجموعة التجارة الذكية',
      description: 'رائدون في توريد مواد البناء والمقاولات مع خدمات لوجستية متكاملة',
      rating: 4.6,
      reviewCount: 89,
      location: 'جدة',
      sector: ['إنشاءات', 'مواد بناء'],
      verified: true,
      responseTime: 'خلال 30 دقيقة',
      completedOrders: 156,
      joinedDate: '2019',
      specialties: ['أسمنت', 'حديد', 'مواد عازلة', 'أدوات كهربائية'],
      deliveryRadius: '100 كم'
    },
    {
      id: '3',
      name: 'شركة الأغذية الطازجة',
      description: 'متخصصون في توريد المواد الغذائية الطازجة والمنتجات العضوية للمطاعم',
      rating: 4.9,
      reviewCount: 201,
      location: 'الدمام',
      sector: ['أغذية', 'مشروبات'],
      verified: true,
      responseTime: 'خلال 15 دقيقة',
      completedOrders: 234,
      joinedDate: '2021',
      specialties: ['خضروات طازجة', 'لحوم', 'منتجات ألبان', 'توابل'],
      deliveryRadius: '30 كم'
    },
    {
      id: '4',
      name: 'مؤسسة الخدمات الطبية',
      description: 'توريد المعدات والمستلزمات الطبية للمستشفيات والعيادات',
      rating: 4.7,
      reviewCount: 67,
      location: 'الرياض',
      sector: ['خدمات طبية', 'معدات طبية'],
      verified: false,
      responseTime: 'خلال ساعتين',
      completedOrders: 45,
      joinedDate: '2022',
      specialties: ['أجهزة طبية', 'مستلزمات جراحية', 'أدوية'],
      deliveryRadius: '40 كم'
    }
  ];

  const stats = [
    {
      title: 'إجمالي الموردين',
      value: '156',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'موردين موثقين',
      value: '89',
      icon: Award,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'متوسط التقييم',
      value: '4.7',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'مدن التغطية',
      value: '15',
      icon: MapPin,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

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
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
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
            {suppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
