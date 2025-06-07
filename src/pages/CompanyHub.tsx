
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
import { useCompanyData } from '@/hooks/useCompanyData';

const CompanyHub = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { companies, loading, updateCompanyStatus, addCompany } = useCompanyData();

  const companyServices = [
    {
      title: 'إدارة الفرق',
      description: 'تنظيم وإدارة فرق العمل المختلفة',
      icon: Users,
      color: 'bg-blue-500',
      count: companies.reduce((sum, c) => sum + Math.floor(c.employees / 10), 0)
    },
    {
      title: 'المشاريع النشطة',
      description: 'متابعة وإدارة المشاريع الجارية',
      icon: Briefcase,
      color: 'bg-green-500',
      count: companies.reduce((sum, c) => sum + c.activeGroups, 0)
    },
    {
      title: 'العقود والاتفاقيات',
      description: 'إدارة العقود مع الموردين والعملاء',
      icon: FileText,
      color: 'bg-purple-500',
      count: companies.filter(c => c.status === 'active').length * 5
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
    { title: `انضمام ${companies.filter(c => c.status === 'pending').length} شركات جديدة`, time: 'منذ ساعتين', type: 'team' },
    { title: 'إكمال مشروع تطوير التطبيق', time: 'منذ 3 ساعات', type: 'project' },
    { title: 'مراجعة تقرير الأداء الشهري', time: 'منذ يوم', type: 'report' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <main className="flex-1 p-6">
            <div className="text-center">جاري التحميل...</div>
          </main>
        </div>
      </div>
    );
  }

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
                إدارة شاملة لعمليات الشركة والفرق والمشاريع - {companies.length} شركة مسجلة
              </p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="companies">الشركات</TabsTrigger>
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

              <TabsContent value="companies" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        الشركات المسجلة
                      </CardTitle>
                      <Button onClick={() => addCompany({ name: 'شركة جديدة' })}>
                        <Plus className="w-4 h-4 ml-2" />
                        إضافة شركة
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {companies.map((company) => (
                        <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                              {company.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold">{company.name}</h3>
                              <p className="text-sm text-gray-600">{company.industry} - {company.location}</p>
                              <p className="text-xs text-gray-500">{company.employees} موظف - {company.activeGroups} مجموعة نشطة</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={
                              company.status === 'active' ? 'bg-green-100 text-green-800' :
                              company.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {company.status === 'active' ? 'نشطة' : 
                               company.status === 'pending' ? 'في الانتظار' : 'معلقة'}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateCompanyStatus(company.id, 
                                company.status === 'active' ? 'suspended' : 'active'
                              )}
                            >
                              {company.status === 'active' ? 'تعليق' : 'تفعيل'}
                            </Button>
                          </div>
                        </div>
                      ))}
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-6 bg-blue-50 rounded-lg">
                        <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-lg mb-2">مشاريع نشطة</h3>
                        <p className="text-3xl font-bold text-blue-600">{companies.reduce((sum, c) => sum + c.activeGroups, 0)}</p>
                      </div>
                      <div className="text-center p-6 bg-green-50 rounded-lg">
                        <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-lg mb-2">مشاريع مكتملة</h3>
                        <p className="text-3xl font-bold text-green-600">{companies.length * 3}</p>
                      </div>
                      <div className="text-center p-6 bg-purple-50 rounded-lg">
                        <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-lg mb-2">معدل النجاح</h3>
                        <p className="text-3xl font-bold text-purple-600">87%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      تحليلات الشركات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-gray-700">إجمالي التوفير</h4>
                        <p className="text-2xl font-bold text-blue-600">
                          {(companies.reduce((sum, c) => sum + c.totalSavings, 0) / 1000000).toFixed(1)}M ر.س
                        </p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-gray-700">متوسط الإيرادات</h4>
                        <p className="text-2xl font-bold text-green-600">
                          {(companies.reduce((sum, c) => sum + c.revenue, 0) / companies.length / 1000000).toFixed(1)}M ر.س
                        </p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-medium text-gray-700">متوسط الموظفين</h4>
                        <p className="text-2xl font-bold text-yellow-600">
                          {Math.round(companies.reduce((sum, c) => sum + c.employees, 0) / companies.length)}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-gray-700">شركات نشطة</h4>
                        <p className="text-2xl font-bold text-purple-600">
                          {companies.filter(c => c.status === 'active').length}
                        </p>
                      </div>
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
