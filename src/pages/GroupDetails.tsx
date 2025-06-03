
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, MapPin, Building, ArrowLeft, Vote, FileText, Gavel } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
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
  creator_id: string;
  max_members: number;
  current_members: number;
  status: string;
  created_at: string;
  creator_profile?: {
    full_name: string;
  };
}

interface GroupMember {
  id: string;
  user_id: string;
  role: string;
  joined_at: string;
  profile?: {
    full_name: string;
  };
}

const GroupDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [group, setGroup] = useState<GroupData | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchGroupDetails();
    fetchGroupMembers();
  }, [id]);

  const fetchGroupDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('groups')
        .select(`
          *,
          profiles:creator_id(full_name)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        setGroup({
          ...data,
          creator_profile: Array.isArray(data.profiles) ? data.profiles[0] : data.profiles
        });
      }
    } catch (error) {
      console.error('Error fetching group:', error);
    }
  };

  const fetchGroupMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          id,
          user_id,
          role,
          joined_at,
          profiles:user_id(full_name)
        `)
        .eq('group_id', id);

      if (error) throw error;
      
      if (data) {
        const formattedMembers = data.map(member => ({
          ...member,
          profile: Array.isArray(member.profiles) ? member.profiles[0] : member.profiles
        }));
        setMembers(formattedMembers);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinGroup = async () => {
    if (!user || !group) return;

    try {
      const { error } = await supabase
        .from('group_members')
        .insert({
          group_id: group.id,
          user_id: user.id,
          role: 'member'
        });

      if (error) throw error;

      // Update current members count
      await supabase
        .from('groups')
        .update({ current_members: group.current_members + 1 })
        .eq('id', group.id);

      fetchGroupDetails();
      fetchGroupMembers();
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex justify-center items-center h-64">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex justify-center items-center h-64">
          <div className="text-center text-red-600">لم يتم العثور على المجموعة</div>
        </div>
      </div>
    );
  }

  const isCreator = user?.id === group.creator_id;
  const isMember = members.some(member => member.user_id === user?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 ml-2" />
              العودة إلى لوحة التحكم
            </Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{group.name}</CardTitle>
                <CardDescription className="text-lg">
                  {group.description}
                </CardDescription>
              </div>
              <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                {group.status === 'active' ? 'نشطة' : 'قيد المراجعة'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{group.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span>{group.sector}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{group.current_members} من أصل {group.max_members} عضو</span>
              </div>
            </div>

            {!isMember && !isCreator && group.status === 'active' && (
              <Button onClick={joinGroup} className="w-full md:w-auto">
                انضم إلى المجموعة
              </Button>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="members">الأعضاء</TabsTrigger>
            <TabsTrigger value="voting">التصويت</TabsTrigger>
            <TabsTrigger value="offers">العروض</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل المجموعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <strong>النوع:</strong> {group.group_type}
                  </div>
                  <div>
                    <strong>نوع العقد:</strong> {group.contract_type}
                  </div>
                  <div>
                    <strong>المؤسس:</strong> {group.creator_profile?.full_name || 'غير معروف'}
                  </div>
                  <div>
                    <strong>تاريخ الإنشاء:</strong> {new Date(group.created_at).toLocaleDateString('ar-SA')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>أعضاء المجموعة ({members.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{member.profile?.full_name || 'عضو'}</div>
                        <div className="text-sm text-gray-500">
                          انضم في {new Date(member.joined_at).toLocaleDateString('ar-SA')}
                        </div>
                      </div>
                      <Badge variant={member.role === 'creator' ? 'default' : 'secondary'}>
                        {member.role === 'creator' ? 'مؤسس' : 'عضو'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="w-5 h-5" />
                  جلسات التصويت
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  لا توجد جلسات تصويت نشطة حالياً
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  العروض المقدمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  لا توجد عروض مقدمة حالياً
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GroupDetails;
