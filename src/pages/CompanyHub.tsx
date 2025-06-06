
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  FileText, 
  BarChart3, 
  Settings,
  Plus,
  Clock,
  Target,
  Award,
  MessageSquare,
  Briefcase,
  TrendingUp
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const CompanyHub = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const companyServices = [
    {
      title: 'إدارة الفرق',
      description: 'تنظيم وإدارة فرق العمل المختلفة',
      icon: Users,
      color: 'bg-blue-500',
      count: 12
    },
    {
      title: 'المشاريع النشطة',
      description: 'متابعة وإدارة المشاريع الجارية',
      icon: Briefcase,
      color: 'bg-green-500',
      count: 8
    },
    {
      title: 'العقود والاتفاقيات',
      description: 'إدارة العقود مع الموردين والعملاء',
      icon: FileText,
      color: 'bg-purple-500',
      count: 25
    },
    {
      title: 'تقارير الأداء',
      description: 'تحليلات شاملة لأداء الشركة',
      icon: BarChart3,
      color: 'bg-orange-500',
      count: null
    }
  ];

  const recentActivities = [
    { title: 'تم توقيع عقد جديد مع مورد التقنية', time: 'منذ ساعة', type: 'contract' },
    { title: 'انضمام 5 أعضاء جدد لفريق التسويق', time: 'منذ ساعتين', type: 'team' },
    { title: 'إكمال مشروع تطوير التطبيق', time: 'منذ 3 ساعات', type: 'project' },
    { title: 'مراجعة تقرير الأداء الشهري', time: 'منذ يوم', type: 'report' }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Building2 className="w-8 h-8" />
                بوابة الشركات
              </h1>
              <p className="text-gray-600">
                إدارة شاملة لعمليات الشركة والفرق والمشاريع
              </p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="teams">الفرق</TabsTrigger>
                <TabsTrigger value="projects">المشاريع</TabsTrigger>
                <TabsTrigger value="analytics">التحليلات</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {companyServices.map((service, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <service.icon className="w-6 h-6 text-white" />
                          </div>
                          {service.count && (
                            <Badge variant="secondary">{service.count}</Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                        <Button className="w-full" variant="outline">
                          إدارة
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      الأنشطة الأخيرة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              activity.type === 'contract' ? 'bg-green-500' :
                              activity.type === 'team' ? 'bg-blue-500' :
                              activity.type === 'project' ? 'bg-purple-500' : 'bg-orange-500'
                            }`} />
                            <span className="text-sm font-medium">{activity.title}</span>
                          </div>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="teams" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      إدارة الفرق
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      ستتوفر إدارة الفرق قريباً
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      إدارة المشاريع
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      ستتوفر إدارة المشاريع قريباً
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      تحليلات الشركة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      ستتوفر التحليلات المتقدمة قريباً
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompanyHub;
