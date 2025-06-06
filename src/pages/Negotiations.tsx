
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, TrendingUp, Clock, Users, DollarSign } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import NegotiationCard from '@/components/negotiations/NegotiationCard';
import NegotiationFilters from '@/components/negotiations/NegotiationFilters';

const Negotiations = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const negotiations = [
    {
      id: '1',
      title: 'مفاوضة شراء أجهزة كمبيوتر',
      description: 'مفاوضة جماعية لشراء 50 جهاز كمبيوتر مكتبي بأفضل سعر',
      group: 'مجموعة التكنولوجيا',
      supplier: 'شركة الإمداد المتميز',
      currentOffer: '145,000 ر.س',
      targetPrice: '130,000 ر.س',
      progress: 75,
      status: 'active' as const,
      participants: 12,
      rounds: 3,
      currentRound: 2,
      deadline: '2024-03-15',
      lastActivity: 'منذ ساعتين'
    },
    {
      id: '2',
      title: 'مفاوضة توريد مواد البناء',
      description: 'مفاوضة لتوريد مواد البناء الأساسية لمشاريع الأعضاء',
      group: 'مجموعة المقاولين',
      supplier: 'مجموعة التجارة الذكية',
      currentOffer: '480,000 ر.س',
      targetPrice: '450,000 ر.س',
      progress: 50,
      status: 'active' as const,
      participants: 8,
      rounds: 5,
      currentRound: 3,
      deadline: '2024-04-01',
      lastActivity: 'منذ 30 دقيقة'
    },
    {
      id: '3',
      title: 'مفاوضة مواد غذائية',
      description: 'مفاوضة شهرية للمواد الغذائية الطازجة',
      group: 'مجموعة المطاعم',
      supplier: 'شركة الأغذية الطازجة',
      currentOffer: '72,000 ر.س',
      targetPrice: '70,000 ر.س',
      progress: 90,
      status: 'completed' as const,
      participants: 15,
      rounds: 2,
      currentRound: 2,
      deadline: '2024-02-28',
      lastActivity: 'أمس'
    }
  ];

  const stats = [
    {
      title: 'المفاوضات النشطة',
      value: '18',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'في الانتظار',
      value: '6',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'المشاركون',
      value: '156',
      icon: Users,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'القيمة المتفاوض عليها',
      value: '2.8M ر.س',
      icon: DollarSign,
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">المفاوضات</h1>
            <p className="text-gray-600">إدارة ومتابعة جميع المفاوضات الجماعية</p>
          </div>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="w-4 h-4" />
            بدء مفاوضة جديدة
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
            <NegotiationFilters 
              onFilterChange={setFilters}
              activeFilters={filters}
            />
          </div>

          {/* Negotiations List */}
          <div className="lg:col-span-3 space-y-6">
            {negotiations.map((negotiation) => (
              <NegotiationCard key={negotiation.id} negotiation={negotiation} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Negotiations;
