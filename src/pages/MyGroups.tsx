
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Crown,
  User,
  Settings,
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageSquare,
  Bell,
  Eye,
  UserPlus,
  Filter,
  Grid,
  List,
  BarChart3
} from 'lucide-react';

const MyGroups = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGateway, setFilterGateway] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock user groups data
  const userGroups = [
    {
      id: 'group-1',
      name: 'مجموعة شراء معدات المكاتب الذكية',
      gateway: 'cooperative-purchasing',
      gatewayName: 'الشراء التعاوني',
      phase: 'مرحلة التفاوض',
      userRole: 'founder',
      members: 23,
      maxMembers: 50,
      location: 'الرياض، السعودية',
      createdAt: '2024-01-15',
      lastActivity: '2024-01-24',
      status: 'active',
      progress: 65,
      hasNotifications: true,
      unreadMessages: 5,
      urgentActions: 2,
      estimatedSavings: '25-35%',
      category: 'معدات مكتبية'
    },
    {
      id: 'group-2',
      name: 'فريق تطوير تطبيقات الجوال',
      gateway: 'freelancers-group',
      gatewayName: 'المستقلين الجماعي',
      phase: 'مرحلة التنفيذ',
      userRole: 'admin',
      members: 15,
      maxMembers: 30,
      location: 'دبي، الإمارات',
      createdAt: '2024-01-20',
      lastActivity: '2024-01-25',
      status: 'active',
      progress: 45,
      hasNotifications: true,
      unreadMessages: 3,
      urgentActions: 1,
      estimatedSavings: '40-50%',
      category: 'تطوير تطبيقات'
    },
    {
      id: 'group-3',
      name: 'شبكة موردي المواد الغذائية',
      gateway: 'suppliers-group',
      gatewayName: 'الموردين الجماعي',
      phase: 'مرحلة التأهيل',
      userRole: 'member',
      members: 18,
      maxMembers: 25,
      location: 'القاهرة، مصر',
      createdAt: '2024-01-10',
      lastActivity: '2024-01-23',
      status: 'pending',
      progress: 30,
      hasNotifications: false,
      unreadMessages: 1,
      urgentActions: 0,
      estimatedSavings: '20-30%',
      category: 'مواد غذائية'
    },
    {
      id: 'group-4',
      name: 'مجموعة التسويق الرقمي',
      gateway: 'cooperative-marketing',
      gatewayName: 'التسويق التعاوني',
      phase: 'مرحلة التخطيط',
      userRole: 'admin',
      members: 12,
      maxMembers: 20,
      location: 'الكويت، الكويت',
      createdAt: '2024-01-18',
      lastActivity: '2024-01-24',
      status: 'active',
      progress: 20,
      hasNotifications: true,
      unreadMessages: 8,
      urgentActions: 3,
      estimatedSavings: '35-45%',
      category: 'تسويق رقمي'
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'founder': return Crown;
      case 'admin': return Settings;
      case 'member': return User;
      default: return User;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'founder': return 'مؤسس';
      case 'admin': return 'مدير';
      case 'member': return 'عضو';
      default: return 'عضو';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'founder': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'member': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEnterGroup = (groupId: string) => {
    navigate(`/group/${groupId}`);
  };

  const filteredGroups = userGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGateway = filterGateway === 'all' || group.gateway === filterGateway;
    const matchesRole = filterRole === 'all' || group.userRole === filterRole;
    return matchesSearch && matchesGateway && matchesRole;
  });

  // Stats calculation
  const totalGroups = userGroups.length;
  const activeGroups = userGroups.filter(g => g.status === 'active').length;
  const totalNotifications = userGroups.reduce((sum, g) => sum + g.unreadMessages, 0);
  const urgentActions = userGroups.reduce((sum, g) => sum + g.urgentActions, 0);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center" dir="rtl">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              تسجيل الدخول مطلوب
            </h3>
            <p className="text-gray-600 mb-6">
              يرجى تسجيل الدخول لعرض مجموعاتك
            </p>
            <Button onClick={() => navigate('/auth')}>
              تسجيل الدخول
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            مجموعاتي
          </h1>
          <p className="text-gray-600 text-lg">
            إدارة ومتابعة جميع المجموعات التي تنتمي إليها
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">إجمالي المجموعات</p>
                  <p className="text-3xl font-bold">{totalGroups}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">المجموعات النشطة</p>
                  <p className="text-3xl font-bold">{activeGroups}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">رسائل غير مقروءة</p>
                  <p className="text-3xl font-bold">{totalNotifications}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">إجراءات عاجلة</p>
                  <p className="text-3xl font-bold">{urgentActions}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Left Side - Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="البحث في المجموعات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                  <select 
                    value={filterGateway} 
                    onChange={(e) => setFilterGateway(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-md text-sm bg-white"
                  >
                    <option value="all">جميع البوابات</option>
                    <option value="cooperative-purchasing">الشراء التعاوني</option>
                    <option value="cooperative-marketing">التسويق التعاوني</option>
                    <option value="freelancers-group">المستقلين</option>
                    <option value="suppliers-group">الموردين</option>
                  </select>

                  <select 
                    value={filterRole} 
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-md text-sm bg-white"
                  >
                    <option value="all">جميع الأدوار</option>
                    <option value="founder">مؤسس</option>
                    <option value="admin">مدير</option>
                    <option value="member">عضو</option>
                  </select>
                </div>
              </div>

              {/* Right Side - View Mode Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Groups Display */}
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGroups.map((group) => {
              const RoleIcon = getRoleIcon(group.userRole);
              return (
                <Card key={group.id} className="hover:shadow-xl transition-all duration-300 hover:scale-102 border-0 shadow-lg relative overflow-hidden">
                  {/* Status Bar */}
                  <div className={`h-1 ${group.status === 'active' ? 'bg-green-500' : 
                                           group.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
                  
                  {/* Notification Badge */}
                  {(group.hasNotifications || group.urgentActions > 0) && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-red-500 text-white border-0 animate-pulse">
                        {group.urgentActions > 0 ? `${group.urgentActions} عاجل` : 'جديد'}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    {/* Header Info */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex flex-col gap-2">
                        <Badge variant="outline" className="text-xs w-fit">
                          {group.gatewayName}
                        </Badge>
                        <Badge className={`${getRoleColor(group.userRole)} text-xs w-fit`} variant="outline">
                          <RoleIcon className="w-3 h-3 ml-1" />
                          {getRoleLabel(group.userRole)}
                        </Badge>
                      </div>
                      <div className="text-left">
                        <Badge className={`${getStatusColor(group.status)} text-xs mb-1`}>
                          {group.status === 'active' ? 'نشط' : 
                           group.status === 'pending' ? 'معلق' : 'مكتمل'}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{group.members}/{group.maxMembers}</span>
                        </div>
                      </div>
                    </div>

                    <CardTitle className="text-lg leading-tight line-clamp-2">
                      {group.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{group.phase}</span>
                        <span className="text-blue-600 font-medium">{group.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${group.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{group.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>آخر نشاط: {new Date(group.lastActivity).toLocaleDateString('ar')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <Star className="w-4 h-4" />
                        <span>توفير متوقع: {group.estimatedSavings}</span>
                      </div>
                    </div>

                    {/* Messages and Actions */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {group.unreadMessages > 0 && (
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{group.unreadMessages} رسالة جديدة</span>
                          </div>
                        )}
                        {group.urgentActions > 0 && (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>{group.urgentActions} إجراء عاجل</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleEnterGroup(group.id)}
                    >
                      دخول إلى المجموعة
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredGroups.map((group) => {
              const RoleIcon = getRoleIcon(group.userRole);
              return (
                <Card key={group.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      {/* Left Side - Group Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{group.name}</h3>
                            {(group.hasNotifications || group.urgentActions > 0) && (
                              <Badge className="bg-red-500 text-white border-0 text-xs">
                                {group.urgentActions > 0 ? `${group.urgentActions} عاجل` : 'جديد'}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{group.gatewayName}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <RoleIcon className="w-4 h-4" />
                              <span>{getRoleLabel(group.userRole)}</span>
                            </div>
                            <span>•</span>
                            <span>{group.members}/{group.maxMembers} عضو</span>
                            <span>•</span>
                            <span>{group.phase}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Actions */}
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{group.progress}%</div>
                          <div className="text-xs text-gray-500">التقدم</div>
                        </div>
                        <Button 
                          onClick={() => handleEnterGroup(group.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          دخول المجموعة
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <Card className="text-center py-16">
            <CardContent>
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                لا توجد مجموعات
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterGateway !== 'all' || filterRole !== 'all' 
                  ? 'لا توجد مجموعات تطابق المرشحات المحددة'
                  : 'لم تنضم لأي مجموعة بعد'}
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
                  استكشف المجموعات
                </Button>
                <Button onClick={() => navigate('/create-group')} variant="outline">
                  إنشاء مجموعة جديدة
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyGroups;
