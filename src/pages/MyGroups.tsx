import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, MapPin, Eye, Settings, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Link } from 'react-router-dom';

interface Group {
  id: string;
  name: string;
  description: string;
  type: string;
  service_gateway: string;
  business_objective: string;
  legal_framework: string;
  jurisdiction: string;
  status: string;
  current_phase: string;
  visibility: string;
  min_members: number;
  max_members: number;
  created_at: string;
  creator_id: string;
  member_count?: number;
  role?: string;
}

const MyGroups = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);

  useEffect(() => {
    if (user) {
      fetchMyGroups();
    }
  }, [user]);

  const fetchMyGroups = async () => {
    try {
      // Fetch groups created by user
      const { data: createdGroups, error: createdError } = await supabase
        .from('groups')
        .select(`
          *,
          group_members(id)
        `)
        .eq('creator_id', user?.id);

      if (createdError) throw createdError;

      // Fetch groups user joined (excluding ones they created)
      const { data: memberGroups, error: memberError } = await supabase
        .from('group_members')
        .select(`
          role,
          groups (
            *,
            group_members(id)
          )
        `)
        .eq('user_id', user?.id)
        .neq('groups.creator_id', user?.id);

      if (memberError) throw memberError;

      // Process created groups with member count
      const processedCreatedGroups = createdGroups?.map(group => ({
        ...group,
        member_count: group.group_members?.length || 0
      })) || [];

      // Process joined groups with member count and user role
      const processedJoinedGroups = memberGroups?.map(m => ({
        ...m.groups,
        role: m.role,
        member_count: m.groups.group_members?.length || 0
      })) || [];

      setMyGroups(processedCreatedGroups);
      setJoinedGroups(processedJoinedGroups);
    } catch (error: any) {
      console.error('Error fetching groups:', error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (phase: string) => {
    switch (phase) {
      case 'pending_members': return 'bg-yellow-500';
      case 'active': 
      case 'negotiation': return 'bg-green-500';
      case 'contracting': return 'bg-blue-500';
      case 'closed': return 'bg-gray-500';
      case 'under_arbitration': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (phase: string) => {
    switch (phase) {
      case 'pending_members': return 'في انتظار الأعضاء';
      case 'active': return 'نشطة';
      case 'negotiation': return 'مرحلة التفاوض';
      case 'contracting': return 'مرحلة التعاقد';
      case 'closed': return 'مغلقة';
      case 'under_arbitration': return 'تحت التحكيم';
      default: return phase;
    }
  };

  const getGroupTypeText = (type: string) => {
    switch (type) {
      case 'procurement': return 'مشتريات';
      case 'services': return 'خدمات';
      case 'investment': return 'استثمار';
      case 'partnership': return 'شراكة';
      default: return type;
    }
  };

  const GroupCard = ({ group, isCreator = false }: { group: Group; isCreator?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge className={`text-white ${getStatusColor(group.current_phase || group.status)}`}>
            {getStatusText(group.current_phase || group.status)}
          </Badge>
          <span className="text-sm text-gray-500">
            {new Date(group.created_at).toLocaleDateString('ar-SA')}
          </span>
        </div>
        <CardTitle className="text-lg leading-tight">{group.name}</CardTitle>
        <Badge variant="outline" className="w-fit">
          {getGroupTypeText(group.type)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-gray-600 line-clamp-2">{group.description}</p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{group.jurisdiction || 'غير محدد'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{group.member_count || 0}/{group.max_members} عضو</span>
            </div>
          </div>

          {/* Phase-specific indicators */}
          {group.current_phase === 'pending_members' && (
            <div className="flex items-center gap-2 text-amber-600 text-sm">
              <Clock className="w-4 h-4" />
              <span>يحتاج {(group.min_members || 5) - (group.member_count || 0)} عضو للتفعيل</span>
            </div>
          )}

          {group.current_phase === 'negotiation' && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>جاهزة للتفاوض</span>
            </div>
          )}

          {group.current_phase === 'under_arbitration' && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>معلقة - تحت التحكيم</span>
            </div>
          )}

          <div className="flex gap-2">
            <Link to={`/group/${group.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="w-4 h-4 ml-1" />
                عرض التفاصيل
              </Button>
            </Link>
            {isCreator && group.current_phase === 'pending_members' && (
              <Button variant="ghost" size="sm" title="لا توجد إعدادات خاصة - أنت عضو عادي">
                <Settings className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
                <p className="mt-4 text-gray-600">جارٍ تحميل مجموعاتك...</p>
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
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">مجموعاتي</h1>
                <p className="text-gray-600 mt-2">
                  تابع جميع المجموعات التي أنشأتها أو انضممت إليها - منشئ المجموعة عضو عادي
                </p>
              </div>
              <Link to="/create-group">
                <Button>
                  <Plus className="w-4 h-4 ml-1" />
                  إنشاء مجموعة جديدة
                </Button>
              </Link>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="created" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="created">
                  المجموعات التي أنشأتها ({myGroups.length})
                </TabsTrigger>
                <TabsTrigger value="joined">
                  المجموعات التي انضممت إليها ({joinedGroups.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="created" className="space-y-6">
                {myGroups.length > 0 ? (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <p className="text-sm text-blue-800">
                        💡 كمنشئ للمجموعة، أنت عضو عادي بدون امتيازات إدارية تلقائية. 
                        المديرون يتم انتخابهم ديمقراطياً من قبل الأعضاء.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {myGroups.map((group) => (
                        <GroupCard key={group.id} group={group} isCreator={true} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      لم تنشئ أي مجموعات بعد
                    </h3>
                    <p className="text-gray-600 mb-4">
                      ابدأ بإنشاء مجموعتك الأولى للشراء أو التسويق التعاوني - ستكون عضواً عادياً
                    </p>
                    <Link to="/create-group">
                      <Button>
                        <Plus className="w-4 h-4 ml-1" />
                        إنشاء مجموعة الآن
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="joined" className="space-y-6">
                {joinedGroups.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {joinedGroups.map((group) => (
                      <GroupCard key={group.id} group={group} isCreator={false} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      لم تنضم إلى أي مجموعات بعد
                    </h3>
                    <p className="text-gray-600 mb-4">
                      تصفح المجموعات المتاحة وانضم إلى ما يناسبك
                    </p>
                    <Link to="/">
                      <Button variant="outline">
                        تصفح المجموعات المتاحة
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyGroups;
