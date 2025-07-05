
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface GroupAccess {
  canView: boolean;
  canEdit: boolean;
  userRole?: string;
  isMember: boolean;
  isCreator: boolean;
}

export const useGroupAccess = (groupId: string) => {
  const { user } = useAuth();
  const [access, setAccess] = useState<GroupAccess>({
    canView: false,
    canEdit: false,
    isMember: false,
    isCreator: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!groupId || !user?.id) {
      setLoading(false);
      return;
    }

    const checkAccess = async () => {
      try {
        // التحقق من المجموعة والعضوية
        const [groupResult, memberResult] = await Promise.all([
          supabase
            .from('groups')
            .select('creator_id, visibility, status')
            .eq('id', groupId)
            .single(),
          supabase
            .from('group_members')
            .select('role')
            .eq('group_id', groupId)
            .eq('user_id', user.id)
            .single()
        ]);

        const group = groupResult.data;
        const member = memberResult.data;

        if (!group) {
          setAccess({
            canView: false,
            canEdit: false,
            isMember: false,
            isCreator: false
          });
          return;
        }

        const isCreator = group.creator_id === user.id;
        const isMember = !!member || isCreator;
        
        // منطق الوصول:
        // 1. المنشئ يمكنه الوصول دائماً
        // 2. الأعضاء يمكنهم الوصول
        // 3. المجموعات العامة النشطة يمكن لأي أحد مشاهدتها
        const canView = isMember || 
                        (group.visibility === 'public' && group.status === 'active');
        
        const canEdit = isMember && (isCreator || member?.role === 'admin');

        setAccess({
          canView,
          canEdit,
          userRole: member?.role,
          isMember,
          isCreator
        });

      } catch (error) {
        console.error('Error checking group access:', error);
        setAccess({
          canView: false,
          canEdit: false,
          isMember: false,
          isCreator: false
        });
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [groupId, user?.id]);

  return { access, loading };
};
