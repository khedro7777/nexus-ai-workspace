import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useGroupPhase } from '@/hooks/useGroupPhase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  FileText, 
  Vote, 
  Building2, 
  UserCheck, 
  Gavel,
  Clock,
  MapPin,
  Calendar,
  MessageSquare,
  Plus,
  UserPlus,
  Send,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import VotingSystem from '@/components/voting/VotingSystem';
import DiscussionSystem from '@/components/discussions/DiscussionSystem';
import CreateSupplierOffer from '@/components/offers/CreateSupplierOffer';
import SupplierOffers from '@/components/offers/SupplierOffers';
import AdminElection from '@/components/voting/AdminElection';

const GroupRoom = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [showCreateOffer, setShowCreateOffer] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { groupContext, loading: phaseLoading, canShowComponent, getPhaseDisplayName } = useGroupPhase(id || '');

  // Fetch group data
  const { data: group, isLoading } = useQuery({
    queryKey: ['group', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch group members
  const { data: members } = useQuery({
    queryKey: ['group-members', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          *,
          profiles!inner(full_name, role, company_name)
        `)
        .eq('group_id', id);
      
      if (error) {
        console.warn('Failed to fetch with profiles, trying without:', error);
        // Fallback without profiles
        const { data: fallbackData } = await supabase
          .from('group_members')
          .select('*')
          .eq('group_id', id);
        return fallbackData;
      }
      return data;
    }
  });

  const handleInviteMember = async () => {
    if (!inviteEmail || !canShowComponent('invite_button')) return;
    
    console.log('Inviting member:', { email: inviteEmail, role: inviteRole, groupId: id });
    toast({
      title: "تم إرسال الدعوة",
      description: `تم إرسال دعوة انضمام إلى ${inviteEmail}`
    });
    setInviteEmail('');
    setInviteRole('member');
  };

  const handleJoinGroup = async () => {
    if (!canShowComponent('join_request_button') || !user?.id) return;
    
    try {
      const { error } = await supabase
        .from('group_members')
        .insert({
          group_id: id,
          user_id: user.id,
          role: 'member',
          voting_weight: 1.0
        });

      if (error) throw error;
      
      toast({
        title: "تم الانضمام بنجاح",
        description: "أهلاً بك في المجموعة!"
      });
      
      // Refresh the page to update member count
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "خطأ في الانضمام",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleElectionComplete = (admins: string[]) => {
    toast({
      title: "تم انتخاب المديرين",
      description: "تم انتخاب 3 مديرين جدد للمجموعة"
    });
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleBackToMyGroups = () => {
    navigate('/my-groups');
  };

  if (isLoading || phaseLoading) {
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

  const getStatusColor = (phase: string) => {
    switch (phase) {
      case 'active': 
      case 'negotiation': return 'bg-green-100 text-green-800';
      case 'pending_members': return 'bg-yellow-100 text-yellow-800';
      case 'contracting': return 'bg-blue-100 text-blue-800';
      case 'under_arbitration': return 'bg-red-100 text-red-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToDashboard}
            className="flex items-center gap-1 hover:bg-gray-100"
          >
            <ArrowRight className="w-4 h-4" />
            لوحة التحكم
          </Button>
          <span>/</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToMyGroups}
            className="hover:bg-gray-100"
          >
            مجموعاتي
          </Button>
          <span>/</span>
          <span className="font-medium text-gray-900">{group?.name}</span>
        </div>

        {/* Group Header with Phase Information */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{group?.name}</CardTitle>
                <p className="text-gray-600 mb-4">{group?.description}</p>
                
                {/* Phase Status */}
                <div className="flex items-center gap-4 mb-4">
                  <Badge className={getStatusColor(groupContext?.current_phase || 'initial')}>
                    {getPhaseDisplayName(groupContext?.current_phase || 'initial')}
                  </Badge>
                  
                  {groupContext?.current_phase === 'pending_members' && (
                    <div className="flex items-center gap-2 text-amber-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {groupContext.member_count}/{groupContext.min_members} أعضاء - 
                        {groupContext.min_members - groupContext.member_count} عضو لبدء التفاوض
                      </span>
                    </div>
                  )}
                  
                  {groupContext?.current_phase === 'negotiation' && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">مجموعة نشطة - يمكن بدء التفاوض</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{group?.jurisdiction}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{groupContext?.member_count || 0} أعضاء</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{group?.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{new Date(group?.created_at).toLocaleDateString('ar')}</span>
              </div>
            </div>

            {/* Conditional Action Buttons based on Phase */}
            <div className="flex flex-wrap gap-3">
              {canShowComponent('join_request_button') && (
                <Button onClick={handleJoinGroup} className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  انضمام للمجموعة
                </Button>
              )}
              
              {canShowComponent('invite_button') && (
                <Button variant="outline" className="flex items-center gap-2" onClick={() => {
                  if (inviteEmail) {
                    handleInviteMember();
                  } else {
                    toast({
                      title: "أدخل البريد الإلكتروني",
                      description: "يرجى إدخال بريد إلكتروني صحيح",
                      variant: "destructive"
                    });
                  }
                }}>
                  <UserPlus className="w-4 h-4" />
                  دعوة أعضاء
                </Button>
              )}
              
              {canShowComponent('submit_proposal_button') && (
                <Button onClick={() => setShowCreateOffer(!showCreateOffer)} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  {showCreateOffer ? 'إخفاء النموذج' : 'إنشاء اقتراح'}
                </Button>
              )}
            </div>

            {/* Invite Form */}
            {canShowComponent('invite_button') && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex gap-3">
                  <Input
                    placeholder="البريد الإلكتروني للعضو الجديد"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">عضو</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleInviteMember} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Phase-specific Content */}
        {groupContext?.current_phase === 'pending_members' && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                المجموعة في انتظار الأعضاء
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                تحتاج المجموعة إلى {groupContext.min_members - groupContext.member_count} عضو إضافي لبدء مرحلة التفاوض.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  💡 المجموعة ستصبح مرئية للعامة وتدخل مرحلة التفاوض تلقائياً عند اكتمال العدد المطلوب
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin Election for vote_admins phase */}
        {groupContext?.current_phase === 'vote_admins' && (
          <div className="mb-8">
            <AdminElection groupId={id || ''} onElectionComplete={handleElectionComplete} />
          </div>
        )}

        {/* Show offer creation form if enabled */}
        {showCreateOffer && canShowComponent('submit_proposal_button') && (
          <div className="mb-8">
            <CreateSupplierOffer 
              groupId={id || ''} 
              onOfferCreated={() => {
                setShowCreateOffer(false);
                toast({
                  title: "تم إنشاء الاقتراح",
                  description: "تم إرسال اقتراحك بنجاح"
                });
              }}
            />
          </div>
        )}

        {/* Conditional Tabs based on Phase */}
        {groupContext?.current_phase !== 'initial' && groupContext?.current_phase !== 'pending_members' && (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="members">الأعضاء</TabsTrigger>
              
              {canShowComponent('join_vote_panel') && (
                <TabsTrigger value="voting">التصويت</TabsTrigger>
              )}
              
              {canShowComponent('discussion_panel') && (
                <TabsTrigger value="discussions">المناقشات</TabsTrigger>
              )}
              
              <TabsTrigger value="suppliers">عروض الموردين</TabsTrigger>
              
              {canShowComponent('arbitration_status') && (
                <TabsTrigger value="arbitration">التحكيم</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">معلومات المشروع</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium">نوع المجموعة:</span>
                      <span className="mr-2">{group?.type}</span>
                    </div>
                    <div>
                      <span className="font-medium">بوابة الخدمة:</span>
                      <span className="mr-2">{group?.service_gateway}</span>
                    </div>
                    <div>
                      <span className="font-medium">الإطار القانوني:</span>
                      <span className="mr-2">{group?.legal_framework}</span>
                    </div>
                    <div>
                      <span className="font-medium">الولاية القضائية:</span>
                      <span className="mr-2">{group?.jurisdiction}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">إحصائيات سريعة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>الأعضاء:</span>
                      <Badge variant="outline">{members?.length || 0}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>جلسات التصويت:</span>
                      <Badge variant="outline">0</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>الأعضاء النشطون:</span>
                      <Badge variant="outline">{members?.filter(m => m.role === 'admin' || m.role === 'member').length || 0}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">الإجراءات السريعة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate(`/voting/create?groupId=${id}`)}
                    >
                      إنشاء جلسة تصويت
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setShowCreateOffer(true)}
                    >
                      دعوة أعضاء جدد
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setShowCreateOffer(true)}
                    >
                      طلب عروض موردين
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.print()}
                    >
                      تصدير تقرير
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>قائمة الأعضاء</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {members?.map((member: any) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{member.profiles?.full_name || 'مستخدم'}</h4>
                            <p className="text-sm text-gray-500">{member.profiles?.company_name || 'لا يوجد اسم شركة'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                            {member.role === 'admin' ? 'مشرف' : 'عضو'}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            انضم: {new Date(member.joined_at).toLocaleDateString('ar')}
                          </p>
                        </div>
                      </div>
                    ))}
                    {(!members || members.length === 0) && (
                      <p className="text-gray-500 text-center py-8">لا يوجد أعضاء في هذه المجموعة</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {canShowComponent('join_vote_panel') && (
              <TabsContent value="voting" className="space-y-6">
                <VotingSystem sessionId={id || 'default'} groupId={id || 'default'} />
              </TabsContent>
            )}

            {canShowComponent('discussion_panel') && (
              <TabsContent value="discussions" className="space-y-6">
                <DiscussionSystem groupId={id || 'default'} />
              </TabsContent>
            )}

            <TabsContent value="suppliers" className="space-y-6">
              <SupplierOffers groupId={id || 'default'} />
            </TabsContent>

            {canShowComponent('arbitration_status') && (
              <TabsContent value="arbitration" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <Gavel className="w-5 h-5" />
                      المجموعة تحت التحكيم
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-red-600">
                      <Gavel className="w-12 h-12 mx-auto mb-4" />
                      <p>جميع الأنشطة معلقة حتى انتهاء إجراءات التحكيم</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => navigate('/arbitration')}
                      >
                        عرض تفاصيل التحكيم
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default GroupRoom;
