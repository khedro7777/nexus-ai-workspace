
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Briefcase, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Star,
  Award,
  Users,
  Plus
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const FreelancerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock skills data - in real app this would come from database
  const skills = [
    { name: 'تطوير الويب', proficiency: 90 },
    { name: 'التصميم الجرافيكي', proficiency: 85 },
    { name: 'الترجمة', proficiency: 95 },
    { name: 'التسويق الرقمي', proficiency: 80 }
  ];

  // Fetch freelancer data
  const { data: freelancerData, isLoading } = useQuery({
    queryKey: ['freelancer-dashboard'],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const [profileResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('*')
          .eq('id', user.user.id)
          .single()
      ]);

      // Mock data for now since freelancer_offers table structure needs to be confirmed
      const mockOffers = [
        {
          id: '1',
          title: 'تطوير موقع إلكتروني',
          status: 'completed',
          price: 500,
          delivery_time: '7 أيام',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          groups: { name: 'مجموعة التقنية' }
        }
      ];

      return {
        offers: mockOffers,
        profile: profileResult.data,
        totalEarnings: mockOffers.filter(o => o.status === 'completed').reduce((sum, o) => sum + (o.price || 0), 0),
        activeProjects: mockOffers.filter(o => o.status === 'accepted').length,
        completedProjects: mockOffers.filter(o => o.status === 'completed').length,
        completionRate: mockOffers.length ? Math.round((mockOffers.filter(o => o.status === 'completed').length / mockOffers.length) * 100) : 0
      };
    }
  });

  const stats = [
    {
      title: 'إجمالي الأرباح',
      value: `$${freelancerData?.totalEarnings?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
      currency: 'USD'
    },
    {
      title: 'المشاريع النشطة',
      value: freelancerData?.activeProjects || 0,
      icon: Briefcase,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'معدل الإكمال',
      value: `${freelancerData?.completionRate || 0}%`,
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'المدفوعات المعلقة',
      value: freelancerData?.offers?.filter((o: any) => o.status === 'pending').length || 0,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  const quickActions = [
    {
      title: 'البحث عن مشاريع',
      description: 'ابحث عن فرص عمل جديدة',
      icon: Plus,
      color: 'bg-blue-500',
      href: '/find-projects'
    },
    {
      title: 'تحديث المهارات',
      description: 'إدارة مهاراتك ومستوى خبرتك',
      icon: Award,
      color: 'bg-green-500',
      href: '/update-skills'
    },
    {
      title: 'عرض المدفوعات',
      description: 'تتبع تاريخ المدفوعات',
      icon: DollarSign,
      color: 'bg-purple-500',
      href: '/payments'
    },
    {
      title: 'تحديث الملف الشخصي',
      description: 'إدارة معلوماتك الشخصية',
      icon: Users,
      color: 'bg-orange-500',
      href: '/profile'
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
            مرحباً، {freelancerData?.profile?.full_name || 'المستقل'}
          </h1>
          <p className="text-gray-600">إدارة مشاريعك وأرباحك</p>
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
          <div className="lg:col-span-1 space-y-6">
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

            {/* Skills Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  المهارات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.proficiency}%</span>
                    </div>
                    <Progress value={skill.proficiency} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Projects */}
            <Card>
              <CardHeader>
                <CardTitle>المشاريع الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {freelancerData?.offers?.slice(0, 5).map((offer: any) => (
                    <div key={offer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{offer.title}</h3>
                        <p className="text-sm text-gray-500">{offer.groups?.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            ${offer.price} USD
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {offer.delivery_time}
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
                  ))}
                  {(!freelancerData?.offers || freelancerData.offers.length === 0) && (
                    <p className="text-gray-500 text-center py-8">لا توجد مشاريع بعد</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <Card>
              <CardHeader>
                <CardTitle>المدفوعات الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {freelancerData?.offers?.filter((o: any) => o.status === 'completed').slice(0, 3).map((payment: any) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{payment.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(payment.updated_at).toLocaleDateString('ar')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">${payment.price} USD</p>
                        <Badge variant="default" className="text-xs">مكتمل</Badge>
                      </div>
                    </div>
                  ))}
                  {(!freelancerData?.offers || freelancerData.offers.filter((o: any) => o.status === 'completed').length === 0) && (
                    <p className="text-gray-500 text-center py-8">لا توجد مدفوعات بعد</p>
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

export default FreelancerDashboard;
