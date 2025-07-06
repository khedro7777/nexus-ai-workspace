
import React, { useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity,
  Lightbulb,
  Workflow,
  Play,
  ShoppingCart,
  Megaphone,
  UserCheck,
  Building,
  Gavel,
  TrendingDown,
  Package,
  Globe
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  // بيانات وهمية للإحصائيات
  const stats = [
    {
      title: "المجموعات النشطة",
      value: "12",
      change: "+3",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "إجمالي التوفير",
      value: "₪84,250",
      change: "+15%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "المفاوضات الجارية",
      value: "8",
      change: "5 تحتاج متابعة",
      icon: Activity,
      color: "text-orange-600"
    },
    {
      title: "معدل النجاح",
      value: "92%",
      change: "+2%",
      icon: BarChart3,
      color: "text-purple-600"
    }
  ];

  const quickActions = [
    {
      title: "إنشاء مجموعة شراء",
      description: "ابدأ مجموعة شراء تعاوني جديدة",
      icon: ShoppingCart,
      color: "bg-blue-500",
      path: "/create-group"
    },
    {
      title: "انضم لمجموعة تسويق",
      description: "ابحث عن مجموعات تسويق نشطة",
      icon: Megaphone,
      color: "bg-green-500",
      path: "/cooperative-marketing"
    },
    {
      title: "عرض خدماتك",
      description: "سجل كمستقل أو مورد",
      icon: UserCheck,
      color: "bg-purple-500",
      path: "/freelancers-individual"
    },
    {
      title: "تأسيس شركة",
      description: "ابدأ رحلة تأسيس شركتك",
      icon: Building,
      color: "bg-indigo-500",
      path: "/company-formation-individual"
    }
  ];

  const recentActivity = [
    {
      type: "join",
      title: "انضمام عضو جديد",
      description: "انضم أحمد محمد إلى مجموعة شراء المعدات المكتبية",
      time: "منذ 5 دقائق",
      icon: Users
    },
    {
      type: "vote",
      title: "تصويت جديد",
      description: "بدأ تصويت على عرض شركة التقنية المتقدمة",
      time: "منذ 15 دقيقة",
      icon: Activity
    },
    {
      type: "offer",
      title: "عرض جديد",
      description: "وصل عرض جديد لمجموعة الخدمات اللوجستية",
      time: "منذ ساعة",
      icon: Package
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مرحباً، {user.name}
          </h1>
          <p className="text-gray-600 text-lg">
            نظرة شاملة على أداء مجموعاتك ومشاريعك
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <stat.icon className={`w-12 h-12 ${stat.color} opacity-20`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  الإجراءات السريعة
                </CardTitle>
                <CardDescription>ابدأ المهام الشائعة بسرعة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform"
                      onClick={() => navigate(action.path)}
                    >
                      <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center`}>
                        <action.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-sm">{action.title}</div>
                        <div className="text-xs text-gray-500">{action.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                النشاط الأخير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="w-5 h-5" />
              التوصيات الذكية - MCP
            </CardTitle>
            <CardDescription>اقتراحات مخصصة لتحسين أدائك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">فرصة توفير</span>
                </div>
                <p className="text-sm text-blue-700">
                  يمكنك توفير 15% إضافية في مجموعة المعدات المكتبية بدمج طلبات أخرى
                </p>
              </div>

              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">انضم الآن</span>
                </div>
                <p className="text-sm text-green-700">
                  هناك 3 مجموعات تسويق جديدة تناسب ملفك الشخصي
                </p>
              </div>

              <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">تذكير</span>
                </div>
                <p className="text-sm text-orange-700">
                  لديك تصويت معلق في مجموعة الخدمات اللوجستية
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
