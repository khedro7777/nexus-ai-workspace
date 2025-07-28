
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface GroupAccess {
  canView: boolean;
  canEdit: boolean;
  canManage: boolean;
  canInvite: boolean;
  canVote: boolean;
  canDiscuss: boolean;
  userRole?: string;
  isMember: boolean;
  isCreator: boolean;
  isAdmin: boolean;
  membershipStatus: 'none' | 'pending' | 'active' | 'suspended';
}

export const useGroupAccess = (groupId: string) => {
  const { user } = useAuth();
  const [access, setAccess] = useState<GroupAccess>({
    canView: false,
    canEdit: false,
    canManage: false,
    canInvite: false,
    canVote: false,
    canDiscuss: false,
    isMember: false,
    isCreator: false,
    isAdmin: false,
    membershipStatus: 'none'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!groupId || !user?.id) {
      setAccess(prev => ({ ...prev, canView: false }));
      setLoading(false);
      return;
    }

    const checkAccess = async () => {
      try {
        // التحقق من المجموعة والعضوية في استعلام واحد
        const [groupResult, memberResult] = await Promise.all([
          supabase
            .from('groups')
            .select('creator_id, visibility, status, current_phase')
            .eq('id', groupId)
            .single(),
          supabase
            .from('group_members')
            .select('role, status, voting_weight')
            .eq('group_id', groupId)
            .eq('user_id', user.id)
            .maybeSingle()
        ]);

        const group = groupResult.data;
        const member = memberResult.data;

        if (!group) {
          setAccess({
            canView: false,
            canEdit: false,
            canManage: false,
            canInvite: false,
            canVote: false,
            canDiscuss: false,
            isMember: false,
            isCreator: false,
            isAdmin: false,
            membershipStatus: 'none'
          });
          return;
        }

        const isCreator = group.creator_id === user.id;
        const isMember = !!member || isCreator;
        const isAdmin = member?.role === 'admin' || isCreator;
        const membershipStatus = member?.status || (isCreator ? 'active' : 'none');
        
        // منطق الوصول المتقدم:
        const canView = determineViewAccess(group, isMember, membershipStatus);
        const canEdit = determineEditAccess(group, isCreator, isAdmin, membershipStatus);
        const canManage = determineManageAccess(group, isCreator, isAdmin);
        const canInvite = determineInviteAccess(group, isCreator, isAdmin, membershipStatus);
        const canVote = determineVoteAccess(group, isMember, membershipStatus);
        const canDiscuss = determineDiscussAccess(group, isMember, membershipStatus);

        setAccess({
          canView,
          canEdit,
          canManage,
          canInvite,
          canVote,
          canDiscuss,
          userRole: member?.role || (isCreator ? 'creator' : undefined),
          isMember,
          isCreator,
          isAdmin,
          membershipStatus: membershipStatus as any
        });

      } catch (error) {
        console.error('Error checking group access:', error);
        setAccess({
          canView: false,
          canEdit: false,
          canManage: false,
          canInvite: false,
          canVote: false,
          canDiscuss: false,
          isMember: false,
          isCreator: false,
          isAdmin: false,
          membershipStatus: 'none'
        });
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [groupId, user?.id]);

  // وظائف مساعدة لتحديد الصلاحيات
  const determineViewAccess = (group: any, isMember: boolean, membershipStatus: string) => {
    // المنشئ والأعضاء يمكنهم الوصول دائماً
    if (isMember && membershipStatus === 'active') return true;
    
    // المجموعات العامة النشطة يمكن لأي أحد مشاهدتها
    if (group.visibility === 'public' && group.status === 'active') return true;
    
    // المجموعات في مرحلة التفاوض مرئية للعامة
    if (group.current_phase === 'negotiation' && group.status === 'active') return true;
    
    return false;
  };

  const determineEditAccess = (group: any, isCreator: boolean, isAdmin: boolean, membershipStatus: string) => {
    // فقط المنشئ والمديرين النشطين
    return (isCreator || isAdmin) && membershipStatus === 'active';
  };

  const determineManageAccess = (group: any, isCreator: boolean, isAdmin: boolean) => {
    // فقط المنشئ والمديرين، بغض النظر عن حالة المجموعة
    return isCreator || isAdmin;
  };

  const determineInviteAccess = (group: any, isCreator: boolean, isAdmin: boolean, membershipStatus: string) => {
    // المنشئ والمديرين يمكنهم الدعوة إذا كانت المجموعة ليست مغلقة أو تحت التحكيم
    const canInviteByRole = isCreator || isAdmin;
    const groupAllowsInvites = !['closed', 'under_arbitration'].includes(group.status);
    const memberIsActive = membershipStatus === 'active';
    
    return canInviteByRole && groupAllowsInvites && memberIsActive;
  };

  const determineVoteAccess = (group: any, isMember: boolean, membershipStatus: string) => {
    // الأعضاء النشطين يمكنهم التصويت في مراحل معينة
    const memberCanVote = isMember && membershipStatus === 'active';
    const phaseAllowsVoting = ['vote_admins', 'negotiation', 'contracting'].includes(group.current_phase);
    const groupIsActive = group.status === 'active';
    
    return memberCanVote && phaseAllowsVoting && groupIsActive;
  };

  const determineDiscussAccess = (group: any, isMember: boolean, membershipStatus: string) => {
    // الأعضاء النشطين يمكنهم المناقشة في المراحل النشطة
    const memberCanDiscuss = isMember && membershipStatus === 'active';
    const phaseAllowsDiscussion = !['closed', 'under_arbitration'].includes(group.current_phase);
    const groupIsActive = ['active', 'negotiation'].includes(group.status);
    
    return memberCanDiscuss && phaseAllowsDiscussion && groupIsActive;
  };

  return { access, loading };
};
