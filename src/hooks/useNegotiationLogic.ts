
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface NegotiationPhase {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  startDate?: Date;
  endDate?: Date;
  requirements: string[];
}

export const useNegotiationLogic = (groupId: string) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<NegotiationPhase | null>(null);

  const negotiationPhases: NegotiationPhase[] = [
    {
      id: 'preparation',
      name: 'مرحلة التحضير',
      description: 'تحديد المتطلبات والشروط الأساسية',
      status: 'pending',
      requirements: ['تحديد المنتجات', 'وضع الميزانية', 'اختيار الموردين']
    },
    {
      id: 'proposal',
      name: 'مرحلة الاقتراحات',
      description: 'استقبال ومراجعة عروض الموردين',
      status: 'pending',
      requirements: ['استلام العروض', 'تقييم المقترحات', 'مقارنة الأسعار']
    },
    {
      id: 'negotiation',
      name: 'مرحلة التفاوض',
      description: 'التفاوض مع الموردين المختارين',
      status: 'pending',
      requirements: ['تفاوض الأسعار', 'تحديد الشروط', 'الاتفاق على التسليم']
    },
    {
      id: 'voting',
      name: 'مرحلة التصويت',
      description: 'تصويت أعضاء المجموعة على الاتفاق النهائي',
      status: 'pending',
      requirements: ['عرض الاتفاق', 'تصويت الأعضاء', 'موافقة الأغلبية']
    },
    {
      id: 'contracting',
      name: 'مرحلة التعاقد',
      description: 'إبرام العقود وتوقيعها',
      status: 'pending',
      requirements: ['صياغة العقود', 'مراجعة قانونية', 'التوقيع النهائي']
    }
  ];

  const startNegotiations = useCallback(async () => {
    setLoading(true);
    try {
      // تحديث حالة المجموعة إلى مرحلة التفاوض
      const { error: updateError } = await supabase
        .from('groups')
        .update({
          current_phase: 'negotiation',
          status: 'active'
        })
        .eq('id', groupId);

      if (updateError) throw updateError;

      // إنشاء جلسة تفاوض جديدة
      const { error: sessionError } = await supabase
        .from('group_discussions')
        .insert({
          group_id: groupId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          message: 'تم بدء مرحلة التفاوض الرسمية',
          message_type: 'system_announcement'
        });

      if (sessionError) throw sessionError;

      // تحديث المرحلة الحالية
      setCurrentPhase({
        ...negotiationPhases[0],
        status: 'active',
        startDate: new Date()
      });

      toast({
        title: "تم بدء التفاوضات",
        description: "تم تفعيل مرحلة التفاوض بنجاح"
      });

    } catch (error: any) {
      toast({
        title: "خطأ في بدء التفاوضات",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [groupId, toast]);

  const moveToNextPhase = useCallback(async (currentPhaseId: string) => {
    setLoading(true);
    try {
      const currentIndex = negotiationPhases.findIndex(p => p.id === currentPhaseId);
      if (currentIndex === -1 || currentIndex === negotiationPhases.length - 1) {
        return;
      }

      const nextPhase = negotiationPhases[currentIndex + 1];
      
      // تحديث قاعدة البيانات
      const { error } = await supabase
        .from('groups')
        .update({
          current_phase: nextPhase.id
        })
        .eq('id', groupId);

      if (error) throw error;

      // تحديث المرحلة الحالية محلياً
      setCurrentPhase({
        ...nextPhase,
        status: 'active',
        startDate: new Date()
      });

      toast({
        title: "انتقال إلى المرحلة التالية",
        description: `تم الانتقال إلى ${nextPhase.name}`
      });

    } catch (error: any) {
      toast({
        title: "خطأ في الانتقال للمرحلة التالية",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [groupId, toast]);

  const canStartNegotiations = useCallback(async (): Promise<boolean> => {
    try {
      // التحقق من وجود الحد الأدنى من الأعضاء
      const { data: members } = await supabase
        .from('group_members')
        .select('id')
        .eq('group_id', groupId);

      const { data: group } = await supabase
        .from('groups')
        .select('min_members, current_phase')
        .eq('id', groupId)
        .single();

      if (!group || !members) return false;

      return members.length >= (group.min_members || 5) && 
             group.current_phase !== 'negotiation';
    } catch (error) {
      return false;
    }
  }, [groupId]);

  return {
    negotiationPhases,
    currentPhase,
    loading,
    startNegotiations,
    moveToNextPhase,
    canStartNegotiations
  };
};
