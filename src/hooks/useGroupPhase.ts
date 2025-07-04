
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type GroupPhase = 'initial' | 'pending_members' | 'active' | 'negotiation' | 'vote_admins' | 'contracting' | 'supervised' | 'under_arbitration' | 'closed';

export interface GroupContext {
  id: string;
  current_phase: GroupPhase;
  status: string;
  visibility: string;
  min_members: number;
  max_members: number;
  member_count: number;
  user_role?: string;
  is_member: boolean;
  admins: string[];
  round_number: number;
}

export const useGroupPhase = (groupId: string) => {
  const { user } = useAuth();
  const [groupContext, setGroupContext] = useState<GroupContext | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!groupId) return;

    const fetchGroupContext = async () => {
      try {
        // Get group info with all required fields
        const { data: group } = await supabase
          .from('groups')
          .select('*')
          .eq('id', groupId)
          .single();

        if (!group) return;

        // Get member count and user role
        const { data: members } = await supabase
          .from('group_members')
          .select('user_id, role')
          .eq('group_id', groupId);

        const userMember = members?.find(m => m.user_id === user?.id);
        const memberCount = members?.length || 0;

        // Check if group should be activated
        const minMembers = group.min_members || 5;
        if (group.status === 'pending_members' && memberCount >= minMembers) {
          await activateGroup(groupId);
        }

        setGroupContext({
          id: groupId,
          current_phase: (group.current_phase as GroupPhase) || 'initial',
          status: group.status || 'pending_members',
          visibility: group.visibility || 'private',
          min_members: group.min_members || 5,
          max_members: group.max_members || 20,
          member_count: memberCount,
          user_role: userMember?.role,
          is_member: !!userMember,
          admins: group.admins || [],
          round_number: group.round_number || 1
        });

      } catch (error) {
        console.error('Error fetching group context:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupContext();
  }, [groupId, user?.id]);

  const activateGroup = async (groupId: string) => {
    try {
      await supabase
        .from('groups')
        .update({
          status: 'active',
          current_phase: 'negotiation',
          visibility: 'public'
        })
        .eq('id', groupId);

      // Create admin election voting session
      await supabase
        .from('voting_sessions')
        .insert({
          group_id: groupId,
          title: 'انتخاب مديري المجموعة',
          description: 'اختر 3 أعضاء ليكونوا مديري هذه الجولة',
          options: JSON.stringify(['admin_election']),
          created_by: user?.id,
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        });

    } catch (error) {
      console.error('Error activating group:', error);
    }
  };

  const canShowComponent = (component: string): boolean => {
    if (!groupContext) return false;

    const { current_phase, is_member, status } = groupContext;

    switch (component) {
      case 'discussion_panel':
        return is_member && current_phase === 'negotiation';
      
      case 'submit_proposal_button':
        return is_member && current_phase === 'negotiation';
      
      case 'join_vote_panel':
        return is_member && (current_phase === 'vote_admins' || current_phase === 'negotiation');
      
      case 'invite_button':
        return is_member && current_phase !== 'under_arbitration' && current_phase !== 'closed';
      
      case 'view_contract':
        return current_phase === 'contracting';
      
      case 'sign_button':
        return is_member && current_phase === 'contracting';
      
      case 'arbitration_status':
        return current_phase === 'under_arbitration';
      
      case 'join_request_button':
        return !is_member && status === 'active' && groupContext.member_count < groupContext.max_members;
      
      default:
        return false;
    }
  };

  const getPhaseDisplayName = (phase: GroupPhase): string => {
    switch (phase) {
      case 'initial': return 'مرحلة التأسيس';
      case 'pending_members': return 'في انتظار اكتمال الأعضاء';
      case 'active': return 'نشطة';
      case 'negotiation': return 'مرحلة التفاوض';
      case 'vote_admins': return 'انتخاب المديرين';
      case 'contracting': return 'مرحلة التعاقد';
      case 'supervised': return 'تحت الإشراف';
      case 'under_arbitration': return 'في التحكيم';
      case 'closed': return 'مغلقة';
      default: return phase;
    }
  };

  return {
    groupContext,
    loading,
    canShowComponent,
    getPhaseDisplayName,
    activateGroup
  };
};
