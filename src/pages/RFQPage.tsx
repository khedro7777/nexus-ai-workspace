
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Search, Filter } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import RFQCard from '@/components/rfq/RFQCard';
import RFQFilters from '@/components/rfq/RFQFilters';

interface RFQ {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  deadline: string;
  location: string;
  requirements: string[];
  status: 'open' | 'closed' | 'awarded';
  submissionsCount: number;
  createdAt: string;
  clientName: string;
}

const RFQPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});

  // بيانات تجريبية
  const rfqs: RFQ[] = [
    {
      id: 'RFQ-001',
      title: 'تطوير تطبيق جوال للتجارة الإلكترونية',
      description: 'نحتاج إلى تطوير تطبيق جوال متكامل للتجارة الإلكترونية يتضمن واجهة العميل ولوحة تحكم البائع',
      category: 'تطوير البرمجيات',
      budget: { min: 15000, max: 25000, currency: 'ريال' },
      deadline: '2024-02-15',
      location: 'الرياض، السعودية',
      requirements: ['React Native', 'Node.js', 'MongoDB', 'API Integration'],
      status: 'open',
      submissionsCount: 12,
      createdAt: '2024-01-15',
      clientName: 'شركة التجارة الذكية'
    },
    {
      id: 'RFQ-002',
      title: 'تصميم هوية بصرية متكاملة',
      description: 'تصميم شعار وهوية بصرية كاملة لشركة ناشئة في مجال التقنية المالية',
      category: 'التصميم الجرافيكي',
      budget: { min: 3000, max: 8000, currency: 'ريال' },
      deadline: '2024-01-30',
      location: 'جدة، السعودية',
      requirements: ['Adobe Creative Suite', 'Brand Design', 'Logo Design'],
      status: 'open',
      submissionsCount: 8,
      createdAt: '2024-01-10',
      clientName: 'فين تك السعودية'
    },
    {
      id: 'RFQ-003',
      title: 'حملة تسويق رقمي شاملة',
      description: 'تخطيط وتنفيذ حملة تسويق رقمي شاملة لإطلاق منتج جديد في السوق السعودي',
      category: 'التسويق الرقمي',
      budget: { min: 10000, max: 20000, currency: 'ريال' },
      deadline: '2024-02-28',
      location: 'الدمام، السعودية',
      requirements: ['Social Media Marketing', 'Google Ads', 'Content Creation'],
      status: 'awarded',
      submissionsCount: 15,
      createdAt: '2024-01-05',
      clientName: 'مؤسسة الابتكار التجاري'
    }
  ];

  const filteredRFQs = rfqs.filter(rfq => {
    if (filters.search && !rfq.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !rfq.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.category && rfq.category !== filters.category) {
      return false;
    }
    if (filters.status && rfq.status !== filters.status) {
      return false;
    }
    return true;
  });

  const handleViewDetails = (id: string) => {
    console.log('عرض تفاصيل RFQ:', id);
  };

  const handleSubmitProposal = (id: string) => {
    console.log('تقديم عرض لـ RFQ:', id);
  };

  const stats = [
    { title: 'إجمالي الطلبات', value: rfqs.length.toString(), color: 'bg-blue-100 text-blue-600' },
    { title: 'مفتوحة للعروض', value: rfqs.filter(r => r.status === 'open').length.toString(), color: 'bg-green-100 text-green-600' },
    { title: 'تم الترسية', value: rfqs.filter(r => r.status === 'awarded').length.toString(), color: 'bg-purple-100 text-purple-600' },
    { title: 'متوسط العروض', value: Math.round(rfqs.reduce((sum, r) => sum + r.submissionsCount, 0) / rfqs.length).toString(), color: 'bg-orange-100 text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">طلبات الخدمة (RFQ)</h1>
            <p className="text-gray-600">اكتشف الفرص وقدم عروضك للمشاريع المتاحة</p>
          </div>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="w-4 h-4" />
            إنشاء طلب جديد
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
                    <Search className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <RFQFilters 
              onFilterChange={setFilters}
              activeFilters={filters}
            />
          </div>

          {/* RFQ List */}
          <div className="lg:col-span-3 space-y-6">
            {filteredRFQs.map((rfq) => (
              <RFQCard 
                key={rfq.id} 
                rfq={rfq}
                onViewDetails={handleViewDetails}
                onSubmitProposal={handleSubmitProposal}
              />
            ))}
            {filteredRFQs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                لا توجد طلبات خدمة متاحة حاليًا
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQPage;
