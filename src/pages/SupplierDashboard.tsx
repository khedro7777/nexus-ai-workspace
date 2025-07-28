
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Package, 
  TrendingUp, 
  Clock, 
  DollarSign,
  FileText,
  Users,
  Star,
  Plus
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const SupplierDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch supplier data
  const { data: supplierData, isLoading } = useQuery({
    queryKey: ['supplier-dashboard'],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const [offersResult, profileResult] = await Promise.all([
        supabase
          .from('supplier_offers')
          .select(`
            *,
            groups (
              name,
              description
            )
          `)
          .eq('supplier_id', user.user.id),
        supabase
          .from('profiles')
          .select('*')
          .eq('id', user.user.id)
          .single()
      ]);

      const offers = offersResult.data || [];
      
      // Calculate earnings from price_details JSON field
      const totalEarnings = offers.filter(o => o.status === 'completed').reduce((sum, o) => {
        const priceDetails = o.price_details as any;
        const amount = priceDetails?.amount || 0;
        return sum + Number(amount);
      }, 0);

      return {
        offers,
        profile: profileResult.data,
        totalEarnings,
        activeOffers: offers.filter(o => o.status === 'pending' || o.status === 'accepted').length,
        completedOffers: offers.filter(o => o.status === 'completed').length,
        successRate: offers.length ? Math.round((offers.filter(o => o.status === 'completed').length / offers.length) * 100) : 0
      };
    }
  });

  const stats = [
    {
      title: 'إجمالي الأرباح',
      value: `$${supplierData?.totalEarnings?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
      currency: 'USD'
    },
    {
      title: 'العروض النشطة',
      value: supplierData?.activeOffers || 0,
      icon: Package,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'العروض المكتملة',
      value: supplierData?.completedOffers || 0,
      icon: FileText,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'معدل النجاح',
      value: `${supplierData?.successRate || 0}%`,
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const quickActions = [
    {
      title: 'إنشاء عرض جديد',
      description: 'قم بإنشاء عرض للمجموعات',
      icon: Plus,
      color: 'bg-blue-500',
      href: '/create-offer'
    },
    {
      title: 'عرض العروض',
      description: 'إدارة العروض الحالية',
      icon: Package,
      color: 'bg-green-500',
      href: '/my-offers'
    },
    {
      title: 'المدفوعات',
      description: 'عرض تاريخ المدفوعات',
      icon: DollarSign,
      color: 'bg-purple-500',
      href: '/payments'
    },
    {
      title: 'تقييم العملاء',
      description: 'عرض تقييمات العملاء',
      icon: Star,
      color: 'bg-yellow-500',
      href: '/reviews'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مرحباً، {supplierData?.profile?.full_name || 'المورد'}
          </h1>
          <p className="text-gray-600">إدارة عروضك ومبيعاتك</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                      {stat.currency && <span className="text-sm text-gray-500 mr-1">{stat.currency}</span>}
                    </p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>الإجراءات السريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4"
                    onClick={() => window.location.href = action.href}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color} text-white ml-4`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Offers */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>العروض الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supplierData?.offers?.slice(0, 5).map((offer: any) => {
                    const priceDetails = offer.price_details as any;
                    const amount = priceDetails?.amount || 0;
                    
                    return (
                      <div key={offer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{offer.company_name}</h3>
                          <p className="text-sm text-gray-500">{offer.groups?.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              ${Number(amount).toFixed(2)} USD
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {offer.delivery_terms || 'غير محدد'}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            offer.status === 'completed' ? 'default' :
                            offer.status === 'accepted' ? 'secondary' :
                            offer.status === 'pending' ? 'outline' : 'destructive'
                          }>
                            {offer.status === 'pending' ? 'قيد الانتظار' :
                             offer.status === 'accepted' ? 'مقبول' :
                             offer.status === 'completed' ? 'مكتمل' : 'مرفوض'}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(offer.created_at).toLocaleDateString('ar')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {(!supplierData?.offers || supplierData.offers.length === 0) && (
                    <p className="text-gray-500 text-center py-8">لا توجد عروض بعد</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
