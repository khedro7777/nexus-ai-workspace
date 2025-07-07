
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Activity,
  Eye,
  Settings,
  Bell,
  Clock,
  MapPin,
  Star,
  Target,
  Award,
  Zap
} from 'lucide-react';

const MyGroups = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');

  if (!user) {
    navigate('/auth');
    return null;
  }

  const myGroups = [
    {
      id: '1',
      name: 'مجموعة شراء الحاسوب المكتبي',
      description: 'شراء جماعي لأجهزة الحاسوب المكتبية',
      phase: 'مرحلة التفاوض',
      status: 'نشط',
      role: 'عضو',
      memberCount: 15,
      joinDate: '2024-01-15',
      lastActivity: 'منذ ساعتين',
      unreadMessages: 3,
      upcomingVotes: 1,
      estimatedSavings: '25%',
      category: 'شراء تعاوني'
    },
    {
      id: '2',
      name: 'مجموعة التسويق الرقمي',
      description: 'حملة تسويقية مشتركة للمتاجر الإلكترونية',
      phase: 'مرحلة التنفيذ',
      status: 'نشط',
      role: 'مدير',
      memberCount: 8,
      joinDate: '2024-01-20',
      lastActivity: 'منذ 30 دقيقة',
      unreadMessages: 7,
      upcomingVotes: 0,
      estimatedSavings: '40%',
      category: 'تسويق تعاوني'
    },
    {
      id: '3',
      name: 'مجموعة تأسيس شركة التقنية',
      description: 'تأسيس شركة تقنية مشتركة',
      phase: 'مرحلة التوثيق',
      status: 'معلق',
      role: 'مؤسس',
      memberCount: 4,
      joinDate: '2024-01-10',
      lastActivity: 'منذ يوم',
      unreadMessages: 0,
      upcomingVotes: 2,
      estimatedSavings: 'غير محدد',
      category: 'تأسيس شركات'
    }
  ];

  const stats = [
    { title: "المجموعات النشطة", value: "3", icon: Users, color: "text-blue-600" },
    { title: "الرسائل غير المقروءة", value: "10", icon: MessageSquare, color: "text-green-600" },
    { title: "التصويتات المعلقة", value: "3", icon: Activity, color: "text-orange-600" },
    { title: "معدل المشاركة", value: "95%", icon: TrendingUp, color: "text-purple-600" }
  ];

  const getActiveGroups = () => myGroups.filter(group => group.status === 'نشط');
  const getPendingGroups = () => myGroups.filter(group => group.status === 'معلق');
  const getCompletedGroups = () => myGroups.filter(group => group.status === 'مكتمل');

  const handleGroupClick = (groupId: string) => {
    navigate(`/group/${groupId}`);
  };

  const GroupCard = ({ group }: { group: any }) => (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => handleGroupClick(group.id)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant={group.status === 'نشط' ? 'default' : group.status === 'معلق' ? 'secondary' : 'outline'}>
              {group.status}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {group.role}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>4.8</span>
          </div>
        </div>
        
        <CardTitle className="text-lg leading-tight mb-2">
          {group.name}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {group.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Group Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{group.memberCount} عضو</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span>توفير {group.estimatedSavings}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-xs">{group.phase}</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-gray-600" />
            <span className="text-xs">{group.lastActivity}</span>
          </div>
        </div>

        {/* Notifications */}
        {(group.unreadMessages > 0 || group.upcomingVotes > 0) && (
          <div className="flex gap-2">
            {group.unreadMessages > 0 && (
              <Badge variant="destructive" className="text-xs">
                <MessageSquare className="w-3 h-3 ml-1" />
                {group.unreadMessages} رسائل
              </Badge>
            )}
            {group.upcomingVotes > 0 && (
              <Badge variant="secondary" className="text-xs">
                <Activity className="w-3 h-3 ml-1" />
                {group.upcomingVotes} تصويت
              </Badge>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={(e) => { e.stopPropagation(); handleGroupClick(group.id); }}
          >
            <Eye className="w-4 h-4 ml-1" />
            دخول الغرفة
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مجموعاتي
          </h1>
          <p className="text-gray-600 text-lg">
            إدارة مجموعاتك النشطة والمشاركة في الأنشطة
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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

        {/* Groups Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">النشطة ({getActiveGroups().length})</TabsTrigger>
            <TabsTrigger value="pending">المعلقة ({getPendingGroups().length})</TabsTrigger>
            <TabsTrigger value="completed">المكتملة ({getCompletedGroups().length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getActiveGroups().map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getPendingGroups().map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مجموعات مكتملة</h3>
              <p className="text-gray-600">ستظهر هنا المجموعات التي اكتملت بنجاح</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate('/create-group')}>
                إنشاء مجموعة جديدة
              </Button>
              <Button variant="outline" onClick={() => navigate('/explore-groups')}>
                استكشاف المجموعات
              </Button>
              <Button variant="outline" onClick={() => navigate('/notifications')}>
                <Bell className="w-4 h-4 ml-2" />
                الإشعارات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyGroups;
