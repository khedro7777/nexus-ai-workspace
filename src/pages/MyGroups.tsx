
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Users, 
  Building2, 
  Search, 
  Plus, 
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Home,
  ArrowLeft,
  ArrowRight,
  Filter,
  Calendar,
  TrendingUp,
  Target,
  Settings
} from 'lucide-react';

const MyGroups = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch user's groups
  const { data: userGroups, isLoading } = useQuery({
    queryKey: ['user-groups', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          *,
          groups:group_id (
            id,
            name,
            description,
            type,
            status,
            current_phase,
            created_at,
            min_members,
            max_members,
            creator_id
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  // Fetch groups where user is creator
  const { data: createdGroups } = useQuery({
    queryKey: ['created-groups', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('creator_id', user.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending_members': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-blue-100 text-blue-800';
      case 'contracting': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseDisplayName = (phase: string) => {
    switch (phase) {
      case 'initial': return 'مرحلة التأسيس';
      case 'pending_members': return 'في انتظار الأعضاء';
      case 'active': return 'نشطة';
      case 'negotiation': return 'مرحلة التفاوض';
      case 'vote_admins': return 'انتخاب المديرين';
      case 'contracting': return 'مرحلة التعاقد';
      case 'closed': return 'مغلقة';
      default: return phase;
    }
  };

  const filteredGroups = userGroups?.filter(group => {
    const matchesSearch = group.groups?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.groups?.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || group.groups?.status === filterStatus;
    return matchesSearch && matchesFilter;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              الصفحة الرئيسية
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              السابق
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.history.forward()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              التالي
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => navigate('/create-group')} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إنشاء مجموعة جديدة
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              لوحة التحكم
            </Button>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مجموعاتي</h1>
          <p className="text-gray-600">إدارة ومتابعة المجموعات التي أنضممت إليها أو أنشأتها</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{userGroups?.length || 0}</p>
                  <p className="text-sm text-gray-600">إجمالي المجموعات</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">{createdGroups?.length || 0}</p>
                  <p className="text-sm text-gray-600">المجموعات المُنشأة</p>
                </div>
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {filteredGroups.filter(g => g.groups?.status === 'active').length}
                  </p>
                  <p className="text-sm text-gray-600">المجموعات النشطة</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {filteredGroups.filter(g => g.groups?.status === 'negotiation').length}
                  </p>
                  <p className="text-sm text-gray-600">في التفاوض</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في المجموعات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              size="sm"
            >
              الكل
            </Button>
            <Button
              variant={filterStatus === 'active' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('active')}
              size="sm"
            >
              نشطة
            </Button>
            <Button
              variant={filterStatus === 'negotiation' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('negotiation')}
              size="sm"
            >
              تفاوض
            </Button>
            <Button
              variant={filterStatus === 'pending_members' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('pending_members')}
              size="sm"
            >
              معلقة
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="joined" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="joined">المجموعات المنضم إليها</TabsTrigger>
            <TabsTrigger value="created">المجموعات المُنشأة</TabsTrigger>
          </TabsList>

          <TabsContent value="joined" className="space-y-6">
            {filteredGroups.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مجموعات</h3>
                  <p className="text-gray-600 mb-4">لم تنضم إلى أي مجموعة بعد</p>
                  <Button onClick={() => navigate('/create-group')}>
                    <Plus className="w-4 h-4 ml-2" />
                    إنشاء مجموعة جديدة
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map((groupMember) => (
                  <Card key={groupMember.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{groupMember.groups?.name}</CardTitle>
                        <Badge className={getStatusColor(groupMember.groups?.status || '')}>
                          {getPhaseDisplayName(groupMember.groups?.current_phase || '')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {groupMember.groups?.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">نوع المجموعة:</span>
                          <span>{groupMember.groups?.type}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">دوري:</span>
                          <Badge variant="outline">
                            {groupMember.role === 'creator' ? 'مؤسس' : 
                             groupMember.role === 'admin' ? 'مشرف' : 'عضو'}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">تاريخ الانضمام:</span>
                          <span>{new Date(groupMember.joined_at).toLocaleDateString('ar')}</span>
                        </div>
                        <div className="flex gap-2 pt-3">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => navigate(`/group/${groupMember.groups?.id}`)}
                          >
                            <Eye className="w-4 h-4 ml-1" />
                            عرض
                          </Button>
                          {groupMember.role === 'creator' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => navigate(`/group/${groupMember.groups?.id}/settings`)}
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="created" className="space-y-6">
            {!createdGroups || createdGroups.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لم تنشئ أي مجموعة بعد</h3>
                  <p className="text-gray-600 mb-4">ابدأ بإنشاء مجموعة جديدة لتجمع الأعضاء</p>
                  <Button onClick={() => navigate('/create-group')}>
                    <Plus className="w-4 h-4 ml-2" />
                    إنشاء مجموعة جديدة
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {createdGroups.map((group) => (
                  <Card key={group.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <Badge className={getStatusColor(group.status || '')}>
                          {getPhaseDisplayName(group.current_phase || '')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{group.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">نوع المجموعة:</span>
                          <span>{group.type}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">حد الأعضاء:</span>
                          <span>{group.min_members} - {group.max_members}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">تاريخ الإنشاء:</span>
                          <span>{new Date(group.created_at).toLocaleDateString('ar')}</span>
                        </div>
                        <div className="flex gap-2 pt-3">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => navigate(`/group/${group.id}`)}
                          >
                            <Eye className="w-4 h-4 ml-1" />
                            إدارة
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigate(`/group/${group.id}/settings`)}
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyGroups;
