
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Check, 
  X, 
  AlertTriangle,
  Settings,
  Shield,
  FileText,
  Bell
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const adminStats = {
    totalUsers: 1247,
    activeGroups: 58,
    totalRevenue: 425000,
    pendingApprovals: 12,
    totalContracts: 189,
    disputeCases: 3
  };

  const pendingApprovals = [
    {
      id: 'APP-001',
      type: 'group',
      title: 'مجموعة استيراد المعدات الطبية',
      user: 'أحمد محمد',
      date: '2024-01-20',
      priority: 'high'
    },
    {
      id: 'APP-002',
      type: 'supplier',
      title: 'شركة التكنولوجيا المتطورة',
      user: 'فاطمة علي',
      date: '2024-01-19',
      priority: 'medium'
    }
  ];

  const recentActivities = [
    {
      id: 'ACT-001',
      type: 'contract_signed',
      description: 'تم توقيع عقد جديد',
      user: 'مجموعة التطوير',
      amount: 35000,
      time: '2 ساعات'
    },
    {
      id: 'ACT-002',
      type: 'dispute_opened',
      description: 'فتح نزاع جديد',
      user: 'خالد سالم',
      time: '4 ساعات'
    }
  ];

  const systemAlerts = [
    {
      id: 'ALERT-001',
      type: 'security',
      message: 'محاولة دخول مشبوهة من IP: 192.168.1.100',
      severity: 'high',
      time: '30 دقيقة'
    },
    {
      id: 'ALERT-002',
      type: 'performance',
      message: 'زمن استجابة قاعدة البيانات مرتفع',
      severity: 'medium',
      time: '1 ساعة'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
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
                <p className="mt-4 text-gray-600">جارٍ تحميل لوحة المشرف...</p>
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
                <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم المشرف</h1>
                <p className="text-gray-600 mt-2">إدارة ومراقبة جميع أنشطة المنصة</p>
              </div>
              <Button>
                <Settings className="w-4 h-4 ml-1" />
                إعدادات النظام
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">المجموعات النشطة</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.activeGroups}</div>
                  <p className="text-xs text-muted-foreground">+5 مجموعات جديدة</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${adminStats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+8% من الشهر الماضي</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">موافقات معلقة</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.pendingApprovals}</div>
                  <p className="text-xs text-muted-foreground">تحتاج مراجعة</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="approvals" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="approvals">الموافقات</TabsTrigger>
                <TabsTrigger value="users">المستخدمون</TabsTrigger>
                <TabsTrigger value="disputes">النزاعات</TabsTrigger>
                <TabsTrigger value="analytics">التحليلات</TabsTrigger>
                <TabsTrigger value="system">النظام</TabsTrigger>
              </TabsList>

              <TabsContent value="approvals" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>طلبات الموافقة المعلقة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingApprovals.map((approval) => (
                        <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 space-x-reverse mb-2">
                              <h3 className="font-medium">{approval.title}</h3>
                              <Badge className={`text-white ${getPriorityColor(approval.priority)}`}>
                                {approval.priority === 'high' ? 'عالي' : 'متوسط'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">بواسطة: {approval.user}</p>
                            <p className="text-sm text-gray-500">التاريخ: {approval.date}</p>
                          </div>
                          <div className="flex space-x-2 space-x-reverse">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-green-600">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>العملاء</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">890</div>
                      <p className="text-sm text-gray-500">مستخدم نشط</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>المستقلون</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">247</div>
                      <p className="text-sm text-gray-500">مستقل معتمد</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>الموردون</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">110</div>
                      <p className="text-sm text-gray-500">مورد معتمد</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="disputes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>النزاعات النشطة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نزاعات نشطة</h3>
                      <p className="text-gray-600">ستظهر النزاعات الجديدة هنا عند فتحها</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>النشاط الحديث</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{activity.description}</p>
                              <p className="text-xs text-gray-500">{activity.user} • منذ {activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>إحصائيات العقود</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>إجمالي العقود:</span>
                          <span className="font-medium">{adminStats.totalContracts}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>العقود النشطة:</span>
                          <span className="font-medium">67</span>
                        </div>
                        <div className="flex justify-between">
                          <span>العقود المكتملة:</span>
                          <span className="font-medium">122</span>
                        </div>
                        <div className="flex justify-between">
                          <span>معدل النجاح:</span>
                          <span className="font-medium">94%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="system" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>تنبيهات النظام</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {systemAlerts.map((alert) => (
                        <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <AlertTriangle className="w-5 h-5" />
                              <span className="font-medium">{alert.message}</span>
                            </div>
                            <span className="text-xs">منذ {alert.time}</span>
                          </div>
                        </div>
                      ))}
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

export default AdminDashboard;
