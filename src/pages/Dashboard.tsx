import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  TrendingUp, 
  Building2, 
  Bell, 
  Wallet, 
  Brain, 
  Gavel, 
  Archive, 
  Store, 
  Briefcase,
  MessageSquare,
  FileText,
  BarChart3,
  Plus,
  Eye,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userStats = [
    { label: 'المجموعات النشطة', value: '12', icon: Users, color: 'text-blue-600' },
    { label: 'إجمالي التوفير', value: '₪84,250', icon: TrendingUp, color: 'text-green-600' },
    { label: 'المفاوضات الجارية', value: '8', icon: MessageSquare, color: 'text-orange-600' },
    { label: 'معدل النجاح', value: '92%', icon: Star, color: 'text-purple-600' }
  ];

  const quickActions = [
    { title: 'إنشاء مجموعة جديدة', icon: Plus, href: '/create-group', color: 'bg-blue-500' },
    { title: 'بدء مفاوضة', icon: MessageSquare, href: '/negotiations', color: 'bg-green-500' },
    { title: 'تنفيذ عقد', icon: FileText, href: '/contracts', color: 'bg-purple-500' }
  ];

  const recentActivities = [
    { type: 'group', title: 'انضممت إلى مجموعة شراء الأجهزة الإلكترونية', time: 'منذ ساعتين', status: 'success' },
    { type: 'negotiation', title: 'تم قبول عرضك في مفاوضة المواد الخام', time: 'منذ 4 ساعات', status: 'success' },
    { type: 'contract', title: 'عقد جديد في انتظار التوقيع', time: 'منذ يوم', status: 'pending' },
    { type: 'arbitration', title: 'تم حل نزاع التحكيم بنجاح', time: 'منذ يومين', status: 'success' }
  ];

  const myGroups = [
    { 
      id: 1, 
      name: 'مجموعة شراء الأجهزة الإلكترونية', 
      type: 'شراء تعاوني', 
      members: '12/50', 
      status: 'نشط',
      progress: 24
    },
    { 
      id: 2, 
      name: 'استثمار في العقارات', 
      type: 'استثمار', 
      members: '15/20', 
      status: 'تفاوض',
      progress: 75
    },
    { 
      id: 3, 
      name: 'مجموعة تطوير التطبيقات', 
      type: 'مستقلين', 
      members: '8/10', 
      status: 'نشط',
      progress: 80
    }
  ];

  const dashboardTabs = [
    { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
    { id: 'groups', label: 'مجموعاتي', icon: Users },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'wallet', label: 'محفظة النقاط', icon: Wallet },
    { id: 'ai-assistant', label: 'المساعد الذكي', icon: Brain },
    { id: 'arbitration', label: 'التحكيم', icon: Gavel },
    { id: 'archive', label: 'الأرشيف', icon: Archive },
    { id: 'marketplace', label: 'المتجر', icon: Store },
    { id: 'services', label: 'الخدمات', icon: Briefcase }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'pending': return 'text-orange-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'pending': return Clock;
      case 'error': return AlertCircle;
      default: return Eye;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/" className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🧠</span>
                </div>
                <div className="mr-3">
                  <h1 className="text-xl font-bold text-gray-900">GPODO</h1>
                  <p className="text-xs text-gray-500">Smart Collaborative Platform</p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">الرئيسية</Link>
              <Link to="/dashboard" className="text-blue-600 font-medium">لوحة التحكم</Link>
              <Link to="/my-groups" className="text-gray-700 hover:text-blue-600 font-medium">مجموعاتي</Link>
              <Link to="/create-group" className="text-gray-700 hover:text-blue-600 font-medium">إنشاء مجموعة</Link>
            </nav>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 ml-2" />
                الإشعارات
              </Button>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 ml-2" />
                  {user?.name || 'المستخدم'}
                </Button>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">الرئيسية</Link>
                <Link to="/dashboard" className="text-blue-600 font-medium">لوحة التحكم</Link>
                <Link to="/my-groups" className="text-gray-700 hover:text-blue-600 font-medium">مجموعاتي</Link>
                <Link to="/create-group" className="text-gray-700 hover:text-blue-600 font-medium">إنشاء مجموعة</Link>
                <Button variant="outline" size="sm" className="w-full">
                  <Bell className="h-4 w-4 ml-2" />
                  الإشعارات
                </Button>
                <Button variant="ghost" size="sm" onClick={logout} className="w-full">
                  <LogOut className="h-4 w-4 ml-2" />
                  تسجيل الخروج
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم الذكية</h1>
              <p className="text-gray-600 mt-1">نظرة شاملة على أداء مجموعاتك ومشاريعك</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 ml-2" />
                الإشعارات
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 ml-2" />
                إنشاء مجموعة
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9">
              {dashboardTabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>الإجراءات السريعة</CardTitle>
                  <CardDescription>ابدأ المهام الشائعة بسرعة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                      <Link key={index} to={action.href}>
                        <Button 
                          variant="outline" 
                          className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow"
                        >
                          <div className={`p-2 rounded-full ${action.color} text-white`}>
                            <action.icon className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium">{action.title}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* My Groups and Recent Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* My Groups */}
                <Card>
                  <CardHeader>
                    <CardTitle>مجموعاتي</CardTitle>
                    <CardDescription>المجموعات التي أنت عضو فيها</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {myGroups.map((group) => (
                      <div key={group.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{group.name}</h4>
                          <Badge variant="outline">{group.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{group.type}</p>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">الأعضاء: {group.members}</span>
                          <span className="text-sm text-gray-500">{group.progress}%</span>
                        </div>
                        <Progress value={group.progress} className="h-2" />
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 ml-1" />
                            عرض
                          </Button>
                          <Button size="sm">
                            دخول الغرفة
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Link to="/my-groups">
                      <Button variant="outline" className="w-full">
                        عرض جميع المجموعات
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle>النشاطات الأخيرة</CardTitle>
                    <CardDescription>آخر التحديثات والأنشطة</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.map((activity, index) => {
                      const StatusIcon = getStatusIcon(activity.status);
                      return (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className={`p-2 rounded-full bg-gray-100 ${getStatusColor(activity.status)}`}>
                            <StatusIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                    <Link to="/archive">
                      <Button variant="outline" className="w-full">
                        عرض جميع الأنشطة
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Other tabs content remains the same */}
            <TabsContent value="groups">
              <Card>
                <CardHeader>
                  <CardTitle>إدارة المجموعات</CardTitle>
                  <CardDescription>جميع المجموعات التي أنت عضو فيها أو تديرها</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">سيتم عرض تفاصيل المجموعات هنا</p>
                    <Link to="/my-groups">
                      <Button>عرض المجموعات</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>مركز الإشعارات</CardTitle>
                  <CardDescription>جميع الإشعارات والتنبيهات</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">لا توجد إشعارات جديدة</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wallet">
              <Card>
                <CardHeader>
                  <CardTitle>محفظة النقاط</CardTitle>
                  <CardDescription>إدارة نقاطك وعمليات الشراء</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">رصيدك الحالي: 1,250 نقطة</p>
                    <Link to="/points">
                      <Button>إدارة النقاط</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-assistant">
              <Card>
                <CardHeader>
                  <CardTitle>المساعد الذكي MCP</CardTitle>
                  <CardDescription>مساعدك الذكي للتحليل والترجمة والملخصات</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">مساعدك الذكي جاهز لمساعدتك</p>
                    <Button>بدء محادثة</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="arbitration">
              <Card>
                <CardHeader>
                  <CardTitle>مركز التحكيم</CardTitle>
                  <CardDescription>رفع الشكاوى وحل النزاعات</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Gavel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">لا توجد قضايا تحكيم حالياً</p>
                    <Link to="/arbitration">
                      <Button>رفع شكوى</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="archive">
              <Card>
                <CardHeader>
                  <CardTitle>الأرشيف</CardTitle>
                  <CardDescription>سجل كامل لكل تفاعلاتك والتوثيق</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Archive className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">جميع أنشطتك موثقة ومحفوظة</p>
                    <Button>عرض الأرشيف</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="marketplace">
              <Card>
                <CardHeader>
                  <CardTitle>المتجر</CardTitle>
                  <CardDescription>عرض المنتجات C2C داخل المنصة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">اكتشف المنتجات والخدمات</p>
                    <Button>تصفح المتجر</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>الخدمات</CardTitle>
                  <CardDescription>التقديم كمستقل أو مورد أو مؤسس شركة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">قدم خدماتك أو ابحث عن مقدمي خدمات</p>
                    <Link to="/services">
                      <Button>عرض الخدمات</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

