
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, MapPin, Calendar, ArrowLeft, UserPlus, Vote, Building, Briefcase } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

interface GroupData {
  id: string;
  name: string;
  description: string;
  country: string;
  sector: string;
  group_type: string;
  contract_type: string;
  max_members: number;
  current_members: number;
  status: string;
  created_at: string;
  creator_id: string;
  profiles: {
    full_name: string;
  };
}

interface GroupMember {
  id: string;
  role: string;
  joined_at: string;
  profiles: {
    full_name: string;
  };
}

const GroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<GroupData | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [isMember, setIsMember] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    if (id && user) {
      fetchGroupDetails();
    }
  }, [id, user]);

  const fetchGroupDetails = async () => {
    try {
      // Fetch group details
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .select(`
          *,
          profiles!groups_creator_id_fkey (full_name)
        `)
        .eq('id', id)
        .single();

      if (groupError) throw groupError;

      // Fetch group members
      const { data: membersData, error: membersError } = await supabase
        .from('group_members')
        .select(`
          id,
          role,
          joined_at,
          user_id,
          profiles!group_members_user_id_fkey (full_name)
        `)
        .eq('group_id', id)
        .eq('status', 'active');

      if (membersError) throw membersError;

      // Check if current user is member or creator
      const userMembership = membersData?.find(m => m.user_id === user?.id);
      setIsMember(!!userMembership);
      setIsCreator(groupData.creator_id === user?.id);

      setGroup(groupData);
      setMembers(membersData || []);
    } catch (error: any) {
      console.error('Error fetching group details:', error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: error.message,
        variant: "destructive"
      });
      navigate('/my-groups');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async () => {
    if (!user || !group) return;

    try {
      const { error } = await supabase
        .from('group_members')
        .insert({
          group_id: group.id,
          user_id: user.id,
          role: 'member',
          status: 'active'
        });

      if (error) throw error;

      // Update group current_members count
      await supabase
        .from('groups')
        .update({ current_members: group.current_members + 1 })
        .eq('id', group.id);

      toast({
        title: "تم الانضمام بنجاح",
        description: "تم انضمامك إلى المجموعة بنجاح"
      });

      fetchGroupDetails();
    } catch (error: any) {
      console.error('Error joining group:', error);
      toast({
        title: "خطأ في الانضمام",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getGroupTypeText = (type: string) => {
    switch (type) {
      case 'group_buying': return 'شراء تعاوني';
      case 'marketing': return 'تسويق تعاوني';
      case 'freelance_request': return 'طلب مستقلين';
      case 'supplier_request': return 'طلب موردين';
      default: return type;
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

  const getRoleText = (role: string) => {
    switch (role) {
      case 'creator': return 'المؤسس';
      case 'moderator': return 'مشرف';
      case 'member': return 'عضو';
      default: return role;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">جارٍ تحميل تفاصيل المجموعة...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900">المجموعة غير موجودة</h1>
              <Button onClick={() => navigate('/my-groups')} className="mt-4">
                العودة إلى مجموعاتي
              </Button>
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
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              onClick={() => navigate('/my-groups')}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 ml-1" />
              العودة إلى مجموعاتي
            </Button>

            {/* Group Header */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">
                        {getGroupTypeText(group.group_type)}
                      </Badge>
                      <Badge className={`
                        ${group.status === 'active' ? 'bg-green-500' : ''}
                        ${group.status === 'pending' ? 'bg-yellow-500' : ''}
                        ${group.status === 'closed' ? 'bg-red-500' : ''}
                      `}>
                        {getStatusText(group.status)}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">{group.name}</CardTitle>
                    <p className="text-gray-600">{group.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{group.current_members}/{group.max_members}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{group.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      {new Date(group.created_at).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">المؤسس: {group.profiles?.full_name}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {!isMember && !isCreator && group.status === 'active' && (
                  <Button onClick={handleJoinGroup} className="w-full md:w-auto">
                    <UserPlus className="w-4 h-4 ml-1" />
                    انضم إلى المجموعة
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Tabs */}
            {(isMember || isCreator) && (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="members">الأعضاء</TabsTrigger>
                  <TabsTrigger value="suppliers">الموردين</TabsTrigger>
                  <TabsTrigger value="voting">التصويت</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>تفاصيل المجموعة</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">الوصف الكامل:</h4>
                          <p className="text-gray-600">{group.description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">القطاع:</h4>
                          <p className="text-gray-600">{group.sector}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">نوع العقد:</h4>
                          <p className="text-gray-600">
                            {group.contract_type === 'group' ? 'عقد جماعي' : 'عقد فردي'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="members">
                  <Card>
                    <CardHeader>
                      <CardTitle>أعضاء المجموعة ({members.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {members.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>
                                  {member.profiles?.full_name?.charAt(0) || 'م'}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.profiles?.full_name}</p>
                                <p className="text-sm text-gray-500">
                                  انضم في {new Date(member.joined_at).toLocaleDateString('ar-SA')}
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline">
                              {getRoleText(member.role)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="suppliers">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        عروض الموردين
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          لا توجد عروض من الموردين بعد
                        </h3>
                        <p className="text-gray-600">
                          سيتم عرض العروض المقدمة من الموردين هنا
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="voting">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Vote className="w-5 h-5" />
                        جلسات التصويت
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Vote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          لا توجد جلسات تصويت نشطة
                        </h3>
                        <p className="text-gray-600">
                          سيتم عرض جلسات التصويت النشطة هنا
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GroupDetails;
