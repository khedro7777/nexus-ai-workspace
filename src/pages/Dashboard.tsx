
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  ShoppingCart, 
  Briefcase, 
  Building2, 
  TrendingUp, 
  Clock,
  Plus,
  Eye,
  Bot,
  Bell
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MCPChat from '@/components/mcp/MCPChat';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMCP, setShowMCP] = useState(false);
  const { user } = useAuth();

  const userStats = {
    activeGroups: 3,
    totalEarnings: 15000,
    pendingTasks: 5,
    completedProjects: 12
  };

  const recentActivities = [
    {
      id: '1',
      type: 'group_joined',
      title: 'انضممت إلى مجموعة تطوير الأنظمة',
      time: '2 ساعات',
      status: 'success'
    },
    {
      id: '2',
      type: 'contract_signed',
      title: 'تم توقيع عقد مع شركة التقنية المتطورة',
      time: '1 يوم',
      status: 'success'
    },
    {
      id: '3',
      type: 'payment_received',
      title: 'تم استلام دفعة بقيمة $2,500',
      time: '3 أيام',
      status: 'success'
    }
  ];

  const quickActions = [
    {
      title: 'إنشاء مجموعة جديدة',
      description: 'ابدأ مشروع تعاوني جديد',
      icon: Users,
      color: 'bg-blue-500',
      link: '/create-group'
    },
    {
      title: 'تصفح الموردين',
      description: 'اعثر على أفضل الموردين',
      icon: Building2,
      color: 'bg-green-500',
      link: '/suppliers'
    },
    {
      title: 'المستقلون',
      description: 'وظف المواهب المتخصصة',
      icon: Briefcase,
      color: 'bg-purple-500',
      link: '/freelancer-dashboard'
    },
    {
      title: 'المفاوضات',
      description: 'إدارة المفاوضات النشطة',
      icon: ShoppingCart,
      color: 'bg-orange-500',
      link: '/negotiations'
    }
  ];

  const notifications = [
    {
      id: '1',
      title: 'طلب انضمام جديد',
      message: 'محمد أحمد يريد الانضمام لمجموعتك',
      time: '30 دقيقة',
      type: 'info'
    },
    {
      id: '2',
      title: 'عرض جديد من مورد',
      message: 'شركة التقنية قدمت عرضاً محدثاً',
      time: '1 ساعة',
      type: 'success'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  مرحباً، {user?.full_name || 'المستخدم'}
                </h1>
                <p className="text-gray-600 mt-2">إليك نظرة عامة على نشاطك اليوم</p>
              </div>
              <div className="flex space-x-3 space-x-reverse">
                <Button 
                  variant="outline"
                  onClick={() => setShowMCP(!showMCP)}
                  className="flex items-center space-x-2 space-x-reverse"
                >
                  <Bot className="w-4 h-4" />
                  <span>المساعد الذكي</span>
                </Button>
                <Button>
                  <Plus className="w-4 h-4 ml-1" />
                  إجراء سريع
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">المجموعات النشطة</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userStats.activeGroups}</div>
                      <p className="text-xs text-muted-foreground">+1 هذا الأسبوع</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">الأرباح الإجمالية</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${userStats.totalEarnings.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">المهام المعلقة</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userStats.pendingTasks}</div>
                      <p className="text-xs text-muted-foreground">تحتاج انتباه</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">المشاريع المكتملة</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userStats.completedProjects}</div>
                      <p className="text-xs text-muted-foreground">معدل نجاح 95%</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>إجراءات سريعة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quickActions.map((action, index) => (
                        <Link key={index} to={action.link}>
                          <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3 space-x-reverse">
                                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center`}>
                                  <action.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{action.title}</h3>
                                  <p className="text-sm text-gray-500">{action.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>النشاط الأخير</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-gray-500">منذ {activity.time}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Content */}
              <div className="space-y-6">
                {/* MCP Assistant */}
                {showMCP && <MCPChat />}

                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse">
                      <Bell className="w-5 h-5" />
                      <span>الإشعارات</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-3 border rounded-lg">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">منذ {notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>روابط سريعة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link to="/my-groups">
                        <Button variant="outline" className="w-full justify-start">
                          <Users className="w-4 h-4 ml-2" />
                          مجموعاتي
                        </Button>
                      </Link>
                      <Link to="/profile">
                        <Button variant="outline" className="w-full justify-start">
                          <Users className="w-4 h-4 ml-2" />
                          الملف الشخصي
                        </Button>
                      </Link>
                      <Link to="/contracts">
                        <Button variant="outline" className="w-full justify-start">
                          <Briefcase className="w-4 h-4 ml-2" />
                          العقود
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
