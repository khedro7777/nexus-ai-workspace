
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ProjectManagement from '@/components/project/ProjectManagement';
import SmartContractManagement from '@/components/contracts/SmartContractManagement';
import { 
  Users, 
  TrendingUp, 
  ShoppingCart, 
  FileText, 
  Calendar,
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  MessageCircle,
  Bell
} from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // بيانات وهمية للإحصائيات
  const stats = {
    totalGroups: 12,
    activeGroups: 8,
    completedProjects: 15,
    totalRevenue: 125000,
    pendingContracts: 5,
    activeContracts: 18,
    notifications: 7,
    messages: 12
  };

  const recentActivities = [
    {
      id: 1,
      type: 'contract',
      title: 'تم توقيع عقد تطوير التطبيق',
      description: 'العقد مع فريق التطوير الذكي',
      time: '2024-01-15T10:30:00Z',
      status: 'completed'
    },
    {
      id: 2,
      type: 'project',
      title: 'مرحلة جديدة في مشروع التجارة الإلكترونية',
      description: 'تم الانتهاء من تصميم واجهة المستخدم',
      time: '2024-01-14T16:45:00Z',
      status: 'in_progress'
    },
    {
      id: 3,
      type: 'group',
      title: 'انضمام عضو جديد للمجموعة',
      description: 'مجموعة استيراد أجهزة طبية',
      time: '2024-01-14T09:15:00Z',
      status: 'new'
    },
    {
      id: 4,
      type: 'negotiation',
      title: 'عرض جديد من مورد',
      description: 'عرض شراء معدات مكتبية',
      time: '2024-01-13T14:20:00Z',
      status: 'pending'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'مراجعة عقد الشراكة',
      dueDate: '2024-01-20',
      priority: 'high',
      category: 'contract'
    },
    {
      id: 2,
      title: 'اجتماع فريق التطوير',
      dueDate: '2024-01-18',
      priority: 'medium',
      category: 'meeting'
    },
    {
      id: 3,
      title: 'تسليم المرحلة الثانية',
      dueDate: '2024-01-25',
      priority: 'high',
      category: 'delivery'
    },
    {
      id: 4,
      title: 'مراجعة الميزانية الشهرية',
      dueDate: '2024-01-30',
      priority: 'low',
      category: 'finance'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'contract': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'project': return <Target className="w-4 h-4 text-green-600" />;
      case 'group': return <Users className="w-4 h-4 text-purple-600" />;
      case 'negotiation': return <MessageCircle className="w-4 h-4 text-orange-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in_progress': return 'text-blue-600';
      case 'pending': return 'text-yellow-600';
      case 'new': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const userRole = user?.user_metadata?.user_role || 'client';

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 p-6 lg:mr-64">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              مرحباً، {user?.user_metadata?.full_name || 'المستخدم'}
            </h1>
            <p className="text-gray-600">
              إليك نظرة سريعة على أنشطتك ومشاريعك اليوم
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="projects">إدارة المشاريع</TabsTrigger>
              <TabsTrigger value="contracts">العقود الذكية</TabsTrigger>
              <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* إحصائيات سريعة */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">المجموعات النشطة</p>
                        <p className="text-2xl font-bold text-green-600">{stats.activeGroups}</p>
                        <p className="text-xs text-gray-500">من إجمالي {stats.totalGroups}</p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">المشاريع المكتملة</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.completedProjects}</p>
                        <p className="text-xs text-green-500">+12% من الشهر الماضي</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">الإيرادات الإجمالية</p>
                        <p className="text-2xl font-bold text-purple-600">${stats.totalRevenue.toLocaleString()}</p>
                        <p className="text-xs text-green-500">+8% من الشهر الماضي</p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <DollarSign className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">العقود النشطة</p>
                        <p className="text-2xl font-bold text-orange-600">{stats.activeContracts}</p>
                        <p className="text-xs text-yellow-500">{stats.pendingContracts} في الانتظار</p>
                      </div>
                      <div className="p-3 bg-orange-100 rounded-full">
                        <FileText className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* الأنشطة الأخيرة */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      الأنشطة الأخيرة
                    </CardTitle>
                    <CardDescription>
                      آخر التحديثات على مشاريعك ومجموعاتك
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-white rounded-full">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{activity.title}</h4>
                          <p className="text-xs text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(activity.time).toLocaleDateString('ar')} - {new Date(activity.time).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)}`} />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* المهام القادمة */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      المهام القادمة
                    </CardTitle>
                    <CardDescription>
                      المهام والمواعيد المقررة لهذا الأسبوع
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(task.dueDate).toLocaleDateString('ar')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority === 'high' ? 'عالية' : task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* روابط سريعة */}
              <Card>
                <CardHeader>
                  <CardTitle>روابط سريعة</CardTitle>
                  <CardDescription>
                    الإجراءات الشائعة والمفيدة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col gap-2"
                      onClick={() => navigate('/create-group')}
                    >
                      <Users className="w-6 h-6" />
                      إنشاء مجموعة
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col gap-2"
                      onClick={() => navigate('/suppliers')}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      تصفح الموردين
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col gap-2"
                      onClick={() => navigate('/contracts')}
                    >
                      <FileText className="w-6 h-6" />
                      العقود
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col gap-2"
                      onClick={() => navigate('/analytics')}
                    >
                      <BarChart3 className="w-6 h-6" />
                      التحليلات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects">
              <ProjectManagement />
            </TabsContent>

            <TabsContent value="contracts">
              <SmartContractManagement />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>التحليلات والإحصائيات</CardTitle>
                  <CardDescription>
                    رؤى مفصلة حول أداء مشاريعك ومجموعاتك
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>قريباً: تحليلات متقدمة وتقارير شاملة</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
