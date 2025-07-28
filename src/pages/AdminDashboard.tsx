import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch admin dashboard data
  const { data: adminData, isLoading } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const [usersResult, groupsResult, supplierOffersResult, votingSessionsResult] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('groups').select('*'),
        supabase.from('supplier_offers').select('*'),
        supabase.from('voting_sessions').select('*')
      ]);

      const totalUsers = usersResult.data?.length || 0;
      const totalGroups = groupsResult.data?.length || 0;
      const totalOffers = (supplierOffersResult.data?.length || 0);
      const pendingOffers = (supplierOffersResult.data?.filter(o => o.status === 'pending') || []).length;

      const totalRevenue = (supplierOffersResult.data?.filter(o => o.status === 'completed') || []).reduce((sum, offer) => {
        const priceDetails = offer.price_details as any;
        const amount = priceDetails?.amount || 0;
        return sum + Number(amount);
      }, 0);

      return {
        totalUsers,
        totalGroups,
        totalOffers,
        pendingOffers,
        totalRevenue,
        activeGroups: groupsResult.data?.filter(g => g.status === 'active').length || 0,
        recentUsers: usersResult.data?.slice(-5) || [],
        recentGroups: groupsResult.data?.slice(-5) || [],
        systemHealth: 95 // Mock data
      };
    }
  });

  const stats = [
    {
      title: 'إجمالي المستخدمين',
      value: adminData?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      trend: '+12%'
    },
    {
      title: 'المجموعات النشطة',
      value: adminData?.activeGroups || 0,
      icon: Activity,
      color: 'bg-green-100 text-green-600',
      trend: '+8%'
    },
    {
      title: 'إجمالي العوائد',
      value: `$${adminData?.totalRevenue?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600',
      trend: '+15%',
      currency: 'USD'
    },
    {
      title: 'العروض المعلقة',
      value: adminData?.pendingOffers || 0,
      icon: AlertTriangle,
      color: 'bg-yellow-100 text-yellow-600',
      trend: '-5%'
    }
  ];

  const systemMetrics = [
    {
      title: 'صحة النظام',
      value: `${adminData?.systemHealth || 0}%`,
      icon: Shield,
      status: 'excellent'
    },
    {
      title: 'معدل النجاح',
      value: '92%',
      icon: CheckCircle,
      status: 'good'
    },
    {
      title: 'النمو الشهري',
      value: '+18%',
      icon: TrendingUp,
      status: 'excellent'
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8" />
            لوحة تحكم المشرف
          </h1>
          <p className="text-gray-600">إدارة ومراقبة النظام بالكامل</p>
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
                    <Badge variant="outline" className="text-xs mt-1">
                      {stat.trend}
                    </Badge>
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
          {/* System Metrics */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>مؤشرات النظام</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        metric.status === 'excellent' ? 'bg-green-100 text-green-600' :
                        metric.status === 'good' ? 'bg-blue-100 text-blue-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        <metric.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{metric.title}</span>
                    </div>
                    <span className="font-bold">{metric.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle>المستخدمون الجدد</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {adminData?.recentUsers?.map((user: any) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{user.full_name || 'مستخدم جديد'}</h3>
                        <p className="text-sm text-gray-500">{user.id}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">
                          {new Date(user.created_at).toLocaleDateString('ar')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {(!adminData?.recentUsers || adminData.recentUsers.length === 0) && (
                    <p className="text-gray-500 text-center py-4">لا توجد مستخدمون جدد</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Groups */}
            <Card>
              <CardHeader>
                <CardTitle>المجموعات الحديثة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {adminData?.recentGroups?.map((group: any) => (
                    <div key={group.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{group.name}</h3>
                        <p className="text-sm text-gray-500">{group.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                          {group.status === 'active' ? 'نشط' : 'غير نشط'}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(group.created_at).toLocaleDateString('ar')}
                        </p>
                      </div>
                    </div>
                  ))}
                  {(!adminData?.recentGroups || adminData.recentGroups.length === 0) && (
                    <p className="text-gray-500 text-center py-4">لا توجد مجموعات حديثة</p>
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

export default AdminDashboard;
