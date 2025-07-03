
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import RFQCard from '@/components/rfq/RFQCard';
import RFQFilters from '@/components/rfq/RFQFilters';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';

const RFQ = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  // Mock RFQ data
  const mockRFQs = [
    {
      id: '1',
      title: 'تطوير تطبيق جوال للتجارة الإلكترونية',
      description: 'نحتاج إلى تطوير تطبيق جوال شامل للتجارة الإلكترونية يدعم النظامين iOS و Android',
      category: 'تطوير البرمجيات',
      budget: {
        min: 50000,
        max: 100000,
        currency: 'ريال'
      },
      deadline: '2025-08-15',
      location: 'الرياض، السعودية',
      requirements: ['Flutter', 'Firebase', 'دفع إلكتروني', 'تصميم UI/UX'],
      status: 'open' as const,
      submissionsCount: 12,
      createdAt: '2025-07-01',
      clientName: 'شركة التقنية المتقدمة'
    },
    {
      id: '2',
      title: 'حملة تسويق رقمي لمنتج جديد',
      description: 'تصميم وتنفيذ حملة تسويق رقمي شاملة لإطلاق منتج تقني جديد في السوق',
      category: 'التسويق الرقمي',
      budget: {
        min: 25000,
        max: 50000,
        currency: 'ريال'
      },
      deadline: '2025-07-30',
      location: 'دبي، الإمارات',
      requirements: ['إدارة وسائل التواصل', 'إعلانات جوجل', 'تسويق بالمحتوى', 'تحليل البيانات'],
      status: 'open' as const,
      submissionsCount: 8,
      createdAt: '2025-06-25',
      clientName: 'مؤسسة الابتكار التقني'
    }
  ];

  const handleViewDetails = (id: string) => {
    console.log('Viewing details for RFQ:', id);
  };

  const handleSubmitProposal = (id: string) => {
    console.log('Submitting proposal for RFQ:', id);
  };

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">طلبات الخدمة (RFQ)</h1>
            <p className="text-gray-600">تصفح واستجب لطلبات الخدمة المتاحة</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            إنشاء طلب جديد
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <RFQFilters 
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
            />
          </div>

          {/* RFQ List */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في طلبات الخدمة..."
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockRFQs.map((rfq) => (
                <RFQCard
                  key={rfq.id}
                  rfq={rfq}
                  onViewDetails={handleViewDetails}
                  onSubmitProposal={handleSubmitProposal}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" disabled>السابق</Button>
                <Button variant="outline" className="bg-blue-500 text-white">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">التالي</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQ;
