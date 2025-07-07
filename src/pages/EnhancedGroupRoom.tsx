
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useGroupPhase } from '@/hooks/useGroupPhase';
import { useGroupAccess } from '@/hooks/useGroupAccess';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  MessageSquare, 
  Vote, 
  FileText, 
  Inbox,
  Send,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  Scale,
  Building2,
  UserCheck,
  BookOpen,
  MessageCircleQuestion,
  ShoppingCart,
  Briefcase,
  AlertTriangle,
  Shield,
  User,
  Package
} from 'lucide-react';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
import Sidebar from '@/components/layout/Sidebar';
import GroupOverview from '@/components/group/GroupOverview';
import GroupMembers from '@/components/group/GroupMembers';
import GroupInbox from '@/components/group/GroupInbox';
import GroupOutbox from '@/components/group/GroupOutbox';
import GroupDecisionBox from '@/components/group/GroupDecisionBox';
import GroupVotingBox from '@/components/group/GroupVotingBox';
import GroupSuggestions from '@/components/group/GroupSuggestions';
import GroupSupplierOffers from '@/components/group/GroupSupplierOffers';
import GroupFreelancerOffers from '@/components/group/GroupFreelancerOffers';
import GroupContracts from '@/components/group/GroupContracts';
import GroupComplaints from '@/components/group/GroupComplaints';
import GroupManagerSection from '@/components/group/GroupManagerSection';
import GroupIndependentParties from '@/components/group/GroupIndependentParties';
import GroupRequestForms from '@/components/group/GroupRequestForms';
import LoomioDiscussions from '@/components/discussions/LoomioDiscussions';
import SnapshotVoting from '@/components/voting/SnapshotVoting';

const EnhancedGroupRoom = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { groupContext, loading: phaseLoading, canShowComponent, getPhaseDisplayName } = useGroupPhase(id || '');
  const { access, loading: accessLoading } = useGroupAccess(id || '');

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
    },
    enabled: !!id && access.canView
  });

  // Fetch group members
  const { data: members } = useQuery({
    queryKey: ['group-members', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('group_members')
        .select('*')
        .eq('group_id', id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!id && access.canView
  });

  if (accessLoading || isLoading || phaseLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
        <EnhancedHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!access.canView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
        <EnhancedHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-red-600">
                <Shield className="w-6 h-6" />
                غير مصرح بالوصول
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                عذراً، لا يمكنك الوصول إلى هذه المجموعة. قد تكون مجموعة خاصة أو تحتاج إلى دعوة للانضمام.
              </p>
              <Button onClick={() => navigate('/')}>
                العودة للرئيسية
              </Button>
            </CardContent>
          </Card>
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

  const calculateProgress = () => {
    if (!groupContext) return 0;
    const phases = ['initial', 'pending_members', 'active', 'negotiation', 'contracting', 'supervised', 'closed'];
    const currentIndex = phases.indexOf(groupContext.current_phase);
    return ((currentIndex + 1) / phases.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <EnhancedHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Group Header */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2 font-bold">{group?.name}</CardTitle>
                <p className="text-blue-100 mb-4 text-lg">{group?.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <Badge className={`${getStatusColor(groupContext?.current_phase || 'initial')} text-gray-800`}>
                    {getPhaseDisplayName(groupContext?.current_phase || 'initial')}
                  </Badge>
                  
                  <div className="flex items-center gap-2 text-blue-100">
                    <Users className="w-4 h-4" />
                    <span>{groupContext?.member_count || 0} أعضاء</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-blue-100">
                    <Building2 className="w-4 h-4" />
                    <span>{group?.type}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-blue-100">
                    <span>تقدم المجموعة</span>
                    <span>{Math.round(calculateProgress())}%</span>
                  </div>
                  <Progress value={calculateProgress()} className="bg-blue-500/30" />
                </div>
              </div>
              
              {access.canManage && (
                <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  <Settings className="w-4 h-4 ml-2" />
                  إدارة المجموعة
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-7 lg:grid-cols-14 bg-white shadow-lg rounded-lg p-1">
            <TabsTrigger value="overview" className="flex items-center gap-1 text-xs">
              <BookOpen className="w-3 h-3" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-1 text-xs">
              <Users className="w-3 h-3" />
              الأعضاء
            </TabsTrigger>
            <TabsTrigger value="inbox" className="flex items-center gap-1 text-xs">
              <Inbox className="w-3 h-3" />
              الواردات
            </TabsTrigger>
            <TabsTrigger value="outbox" className="flex items-center gap-1 text-xs">
              <Send className="w-3 h-3" />
              الصادرات
            </TabsTrigger>
            <TabsTrigger value="decisions" className="flex items-center gap-1 text-xs">
              <Scale className="w-3 h-3" />
              صندوق القرارات
            </TabsTrigger>
            <TabsTrigger value="voting" className="flex items-center gap-1 text-xs">
              <Vote className="w-3 h-3" />
              صندوق التصويت
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex items-center gap-1 text-xs">
              <MessageCircleQuestion className="w-3 h-3" />
              الاقتراحات
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center gap-1 text-xs">
              <ShoppingCart className="w-3 h-3" />
              عروض الموردين
            </TabsTrigger>
            <TabsTrigger value="freelancers" className="flex items-center gap-1 text-xs">
              <Briefcase className="w-3 h-3" />
              عروض المستقلين
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-1 text-xs">
              <FileText className="w-3 h-3" />
              العقود
            </TabsTrigger>
            <TabsTrigger value="complaints" className="flex items-center gap-1 text-xs">
              <AlertTriangle className="w-3 h-3" />
              الشكاوى
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center gap-1 text-xs">
              <Shield className="w-3 h-3" />
              قسم الإدارة
            </TabsTrigger>
            <TabsTrigger value="parties" className="flex items-center gap-1 text-xs">
              <User className="w-3 h-3" />
              الأطراف المستقلة
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-1 text-xs">
              <Package className="w-3 h-3" />
              طلبات التوريد
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <GroupOverview group={group} members={members} groupContext={groupContext} />
          </TabsContent>

          <TabsContent value="members" className="mt-6">
            <GroupMembers members={members} groupId={id || ''} userAccess={access} />
          </TabsContent>

          <TabsContent value="inbox" className="mt-6">
            <GroupInbox groupId={id || ''} />
          </TabsContent>

          <TabsContent value="outbox" className="mt-6">
            <GroupOutbox groupId={id || ''} />
          </TabsContent>

          <TabsContent value="decisions" className="mt-6">
            <GroupDecisionBox groupId={id || ''} userAccess={access} />
          </TabsContent>

          <TabsContent value="voting" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GroupVotingBox groupId={id || ''} />
              <SnapshotVoting groupId={id || ''} />
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GroupSuggestions groupId={id || ''} />
              <LoomioDiscussions groupId={id || ''} />
            </div>
          </TabsContent>

          <TabsContent value="suppliers" className="mt-6">
            <GroupSupplierOffers groupId={id || ''} />
          </TabsContent>

          <TabsContent value="freelancers" className="mt-6">
            <GroupFreelancerOffers groupId={id || ''} />
          </TabsContent>

          <TabsContent value="contracts" className="mt-6">
            <GroupContracts groupId={id || ''} userAccess={access} />
          </TabsContent>

          <TabsContent value="complaints" className="mt-6">
            <GroupComplaints groupId={id || ''} />
          </TabsContent>

          <TabsContent value="management" className="mt-6">
            <GroupManagerSection groupId={id || ''} userAccess={access} />
          </TabsContent>

          <TabsContent value="parties" className="mt-6">
            <GroupIndependentParties groupId={id || ''} />
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <GroupRequestForms groupId={id || ''} userAccess={access} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedGroupRoom;
