import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, MapPin, Eye, Settings, Plus } from 'lucide-react';
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
  created_at: string;
  creator_id: string;
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
        .select('*')
        .eq('creator_id', user?.id);

      if (createdError) throw createdError;

      // Fetch groups user joined
      const { data: memberGroups, error: memberError } = await supabase
        .from('group_members')
        .select(`
          role,
          groups (*)
        `)
        .eq('user_id', user?.id)
        .neq('role', 'creator');

      if (memberError) throw memberError;

      setMyGroups(createdGroups || []);
      setJoinedGroups(
        memberGroups?.map(m => ({ 
          ...m.groups, 
          role: m.role 
        })) || []
      );
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-500';
      case 'active': return 'bg-green-500';
      case 'closed': return 'bg-red-500';
      case 'under_review': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'قيد المراجعة';
      case 'active': return 'نشطة';
      case 'closed': return 'مغلقة';
      case 'under_review': return 'قيد التفاوض';
      default: return status;
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
          <Badge className={`text-white ${getStatusColor(group.status)}`}>
            {getStatusText(group.status)}
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
              <span>مجموعة {group.type}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Link to={`/group/${group.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="w-4 h-4 ml-1" />
                عرض التفاصيل
              </Button>
            </Link>
            {isCreator && group.status === 'pending' && (
              <Button variant="ghost" size="sm">
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
                  تابع جميع المجموعات التي أنشأتها أو انضممت إليها
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myGroups.map((group) => (
                      <GroupCard key={group.id} group={group} isCreator={true} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      لم تنشئ أي مجموعات بعد
                    </h3>
                    <p className="text-gray-600 mb-4">
                      ابدأ بإنشاء مجموعتك الأولى للشراء أو التسويق التعاوني
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
