
import React from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  Activity,
  ShoppingCart,
  Megaphone,
  UserCheck,
  Building,
  Bell,
  MessageSquare,
  Calendar,
  Target,
  Award,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const userStats = [
    { title: "مجموعاتي", value: "5", icon: Users, color: "text-blue-600" },
    { title: "النقاط المتاحة", value: "1,250", icon: Award, color: "text-green-600" },
    { title: "المفاوضات النشطة", value: "3", icon: Activity, color: "text-orange-600" },
    { title: "معدل النجاح", value: "95%", icon: Target, color: "text-purple-600" }
  ];

  const quickActions = [
    { title: "إنشاء مجموعة", description: "ابدأ مجموعة جديدة", icon: Building, color: "bg-blue-500", path: "/create-group" },
    { title: "البحث عن مجموعات", description: "اكتشف مجموعات جديدة", icon: Users, color: "bg-green-500", path: "/explore-groups" },
    { title: "مجموعاتي", description: "إدارة مجموعاتي", icon: MessageSquare, color: "bg-purple-500", path: "/my-groups" },
    { title: "المحفظة", description: "إدارة النقاط والمحفظة", icon: Award, color: "bg-orange-500", path: "/wallet" }
  ];

  const recentActivity = [
    { type: "join", title: "انضممت إلى مجموعة", description: "مجموعة شراء الحاسوب المكتبي", time: "منذ 10 دقائق", icon: Users },
    { type: "vote", title: "تصويت جديد", description: "تصويت على عرض شركة التقنية", time: "منذ 30 دقيقة", icon: Activity },
    { type: "offer", title: "عرض جديد", description: "عرض من مورد معتمد", time: "منذ ساعة", icon: ShoppingCart }
  ];

  const notifications = [
    { title: "تصويت مطلوب", description: "مجموعة التسويق الرقمي", urgent: true },
    { title: "عرض جديد", description: "مجموعة الشراء التعاوني", urgent: false },
    { title: "موعد اجتماع", description: "مجموعة تأسيس الشركات", urgent: true }
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

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
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
                  <Zap className="w-5 h-5" />
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

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${notification.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                      </div>
                      {notification.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          عاجل
                        </Badge>
                      )}
                    </div>
                  </div>
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
    </div>
  );
};

export default Dashboard;
