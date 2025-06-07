
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, TrendingUp, Clock, Users, DollarSign } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import NegotiationCard from '@/components/negotiations/NegotiationCard';
import NegotiationFilters from '@/components/negotiations/NegotiationFilters';
import { useNegotiationsData } from '@/hooks/useNegotiationsData';

interface FilterState {
  search?: string;
  status?: string;
}

const Negotiations = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  const { negotiations, loading, updateNegotiationStatus, addMessage, submitOffer } = useNegotiationsData();

  const stats = [
    {
      title: 'المفاوضات النشطة',
      value: negotiations.filter(n => n.status === 'active').length.toString(),
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'في الانتظار',
      value: negotiations.filter(n => n.status === 'paused').length.toString(),
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'المشاركون',
      value: negotiations.reduce((sum, n) => sum + n.participants.length, 0).toString(),
      icon: Users,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'القيمة المتفاوض عليها',
      value: `${(negotiations.reduce((sum, n) => sum + n.currentOffer, 0) / 1000).toFixed(1)}K ر.س`,
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const filteredNegotiations = negotiations.filter(negotiation => {
    if (filters.search && !negotiation.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status && filters.status !== 'all' && negotiation.status !== filters.status) {
      return false;
    }
    return true;
  });

  const handleStartNewNegotiation = () => {
    // In a real app, this would open a modal to create new negotiation
    console.log('Starting new negotiation...');
  };

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">المفاوضات</h1>
            <p className="text-gray-600">إدارة ومتابعة جميع المفاوضات الجماعية</p>
          </div>
          <Button 
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600"
            onClick={handleStartNewNegotiation}
          >
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
            {filteredNegotiations.map((negotiation) => (
              <div key={negotiation.id}>
                <NegotiationCard 
                  negotiation={{
                    id: negotiation.id,
                    title: negotiation.title,
                    description: negotiation.groupName,
                    group: negotiation.groupName,
                    supplier: negotiation.supplierName,
                    currentOffer: `${negotiation.currentOffer.toLocaleString()} ر.س`,
                    targetPrice: `${negotiation.targetPrice.toLocaleString()} ر.س`,
                    progress: negotiation.progress,
                    status: negotiation.status,
                    participants: negotiation.participants.length,
                    rounds: negotiation.maxRounds,
                    currentRound: negotiation.currentRound,
                    deadline: negotiation.deadline,
                    lastActivity: 'منذ ساعة'
                  }}
                />
              </div>
            ))}
            {filteredNegotiations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                لا توجد مفاوضات متاحة حاليًا
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Negotiations;
