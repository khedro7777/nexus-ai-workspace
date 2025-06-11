
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { DollarSign, Briefcase, TrendingUp, Clock, Plus, Eye, Star, Award } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const FreelancerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const freelancerStats = {
    totalEarnings: 45000,
    activeProjects: 5,
    completedProjects: 23,
    completionRate: 96,
    rating: 4.8,
    pendingPayments: 3
  };

  const skills = [
    { name: 'تطوير الويب', proficiency: 95, category: 'تقني' },
    { name: 'تصميم UI/UX', proficiency: 87, category: 'إبداعي' },
    { name: 'إدارة المشاريع', proficiency: 82, category: 'أعمال' },
    { name: 'الكتابة التقنية', proficiency: 78, category: 'محتوى' }
  ];

  const recentProjects = [
    {
      id: 'PROJ-001',
      title: 'تطوير متجر إلكتروني',
      client: 'مجموعة التجارة الرقمية',
      amount: 8500,
      status: 'active',
      progress: 65,
      deadline: '2024-02-15'
    },
    {
      id: 'PROJ-002',
      title: 'تصميم هوية بصرية',
      client: 'شركة الإبداع المحدودة',
      amount: 3200,
      status: 'completed',
      progress: 100,
      deadline: '2024-01-20'
    }
  ];

  const recentPayments = [
    {
      id: 'PAY-001',
      project: 'تطوير نظام إدارة',
      amount: 5500,
      status: 'completed',
      date: '2024-01-18'
    },
    {
      id: 'PAY-002',
      project: 'استشارة تقنية',
      amount: 1200,
      status: 'pending',
      date: '2024-01-15'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'paused': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getSkillColor = (proficiency: number) => {
    if (proficiency >= 90) return 'bg-green-500';
    if (proficiency >= 75) return 'bg-blue-500';
    if (proficiency >= 60) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">جارٍ تحميل لوحة التحكم...</p>
              </div>
            </div>
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
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم المستقل</h1>
                <p className="text-gray-600 mt-2">إدارة مشاريعك وأرباحك ومهاراتك</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 ml-1" />
                البحث عن مشاريع
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي الأرباح</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${freelancerStats.totalEarnings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+18% من الشهر الماضي</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المشاريع النشطة</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{freelancerStats.activeProjects}</div>
                  <p className="text-xs text-muted-foreground">مشروع واحد جديد هذا الأسبوع</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">معدل الإنجاز</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{freelancerStats.completionRate}%</div>
                  <p className="text-xs text-muted-foreground">{freelancerStats.completedProjects} مشروع مكتمل</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">التقييم</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center">
                    {freelancerStats.rating}
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  </div>
                  <p className="text-xs text-muted-foreground">من 23 تقييم</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="projects">المشاريع</TabsTrigger>
                <TabsTrigger value="skills">المهارات</TabsTrigger>
                <TabsTrigger value="payments">المدفوعات</TabsTrigger>
                <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>المشاريع الحديثة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentProjects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium">{project.title}</h3>
                              <Badge className={`text-white ${getStatusColor(project.status)}`}>
                                {project.status === 'active' ? 'نشط' : 'مكتمل'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{project.client}</p>
                            <div className="flex items-center space-x-4 space-x-reverse">
                              <span className="text-sm">التقدم: {project.progress}%</span>
                              <Progress value={project.progress} className="flex-1 max-w-[200px]" />
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 space-x-reverse mr-4">
                            <span className="font-bold">${project.amount.toLocaleString()}</span>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      مهاراتي
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 ml-1" />
                        إضافة مهارة
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {skills.map((skill, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{skill.name}</h3>
                            <Badge variant="outline">{skill.category}</Badge>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Progress 
                              value={skill.proficiency} 
                              className="flex-1"
                            />
                            <span className="text-sm font-medium">{skill.proficiency}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>المدفوعات الحديثة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentPayments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{payment.project}</p>
                            <p className="text-sm text-gray-500">تاريخ: {payment.date}</p>
                          </div>
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <Badge className={`text-white ${getStatusColor(payment.status)}`}>
                              {payment.status === 'completed' ? 'مكتمل' : 'معلق'}
                            </Badge>
                            <span className="font-bold">${payment.amount.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>معلومات الملف الشخصي</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <Award className="w-16 h-16 text-blue-500" />
                          <div>
                            <h3 className="font-medium">مستقل محترف</h3>
                            <p className="text-sm text-gray-500">عضو منذ يناير 2023</p>
                          </div>
                        </div>
                        <Button className="w-full">
                          تحديث الملف الشخصي
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>الإحصائيات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>معدل الاستجابة:</span>
                          <span className="font-medium">98%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>متوسط وقت التسليم:</span>
                          <span className="font-medium">2.3 يوم</span>
                        </div>
                        <div className="flex justify-between">
                          <span>مشاريع في الوقت المحدد:</span>
                          <span className="font-medium">22/23</span>
                        </div>
                        <div className="flex justify-between">
                          <span>العملاء المتكررون:</span>
                          <span className="font-medium">12</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
