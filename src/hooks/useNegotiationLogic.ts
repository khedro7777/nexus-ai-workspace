
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
  progress: number;
}

export const useNegotiationLogic = (groupId: string) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<NegotiationPhase | null>(null);

  const negotiationPhases: NegotiationPhase[] = [
    {
      id: 'preparation',
      name: 'مرحلة التحضير',
      description: 'تحديد المتطلبات والشروط الأساسية للمشروع',
      status: 'pending',
      requirements: ['تحديد المنتجات والخدمات', 'وضع الميزانية المبدئية', 'اختيار الموردين المحتملين'],
      progress: 0
    },
    {
      id: 'rfq',
      name: 'مرحلة طلب العروض',
      description: 'إرسال طلبات عروض للموردين المختارين',
      status: 'pending',
      requirements: ['إعداد مستند طلب العروض', 'إرسال للموردين', 'تحديد مواعيد التسليم'],
      progress: 0
    },
    {
      id: 'evaluation',
      name: 'مرحلة تقييم العروض',
      description: 'تقييم ومقارنة العروض المستلمة',
      status: 'pending',
      requirements: ['مراجعة العروض الفنية', 'مقارنة الأسعار', 'تقييم الموردين'],
      progress: 0
    },
    {
      id: 'negotiation',
      name: 'مرحلة التفاوض النشط',
      description: 'التفاوض المباشر مع الموردين المختارين',
      status: 'pending',
      requirements: ['تفاوض الأسعار والشروط', 'مناقشة التفاصيل التقنية', 'الاتفاق على التسليم'],
      progress: 0
    },
    {
      id: 'voting',
      name: 'مرحلة التصويت',
      description: 'تصويت أعضاء المجموعة على العرض النهائي',
      status: 'pending',
      requirements: ['عرض الاتفاق على الأعضاء', 'إجراء التصويت', 'الحصول على موافقة الأغلبية'],
      progress: 0
    },
    {
      id: 'contracting',
      name: 'مرحلة التعاقد',
      description: 'إبرام العقود النهائية وتوقيعها',
      status: 'pending',
      requirements: ['صياغة العقود النهائية', 'المراجعة القانونية', 'التوقيع والتنفيذ'],
      progress: 0
    }
  ];

  const startNegotiations = useCallback(async () => {
    if (!groupId) return;
    
    setLoading(true);
    try {
      // التحقق من جاهزية المجموعة للتفاوض
      const readinessCheck = await checkGroupReadiness();
      if (!readinessCheck.ready) {
        toast({
          title: "المجموعة غير جاهزة",
          description: readinessCheck.reason,
          variant: "destructive"
        });
        return;
      }

      // تحديث حالة المجموعة إلى مرحلة التفاوض
      const { error: updateError } = await supabase
        .from('groups')
        .update({
          current_phase: 'negotiation',
          status: 'active',
          visibility: 'public'
        })
        .eq('id', groupId);

      if (updateError) throw updateError;

      // إنشاء سجل لبداية التفاوضات
      const { error: logError } = await supabase
        .from('group_discussions')
        .insert({
          group_id: groupId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          message: 'تم بدء مرحلة التفاوض الرسمية - المجموعة جاهزة لاستقبال العروض',
          message_type: 'system_announcement'
        });

      if (logError) throw logError;

      // إنشاء جلسة تصويت لانتخاب المديرين إذا لم تكن موجودة
      await createAdminElectionIfNeeded();

      // تحديث المرحلة الحالية
      setCurrentPhase({
        ...negotiationPhases[0],
        status: 'active',
        startDate: new Date(),
        progress: 10
      });

      toast({
        title: "تم بدء التفاوضات بنجاح",
        description: "المجموعة الآن جاهزة لاستقبال العروض من الموردين"
      });

    } catch (error: any) {
      console.error('Error starting negotiations:', error);
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
    if (!groupId) return;
    
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

      // إضافة سجل للانتقال
      await supabase
        .from('group_discussions')
        .insert({
          group_id: groupId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          message: `تم الانتقال إلى ${nextPhase.name}`,
          message_type: 'phase_transition'
        });

      // تحديث المرحلة الحالية محلياً
      setCurrentPhase({
        ...nextPhase,
        status: 'active',
        startDate: new Date(),
        progress: Math.round(((currentIndex + 1) / negotiationPhases.length) * 100)
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

  const checkGroupReadiness = useCallback(async () => {
    try {
      // التحقق من وجود الحد الأدنى من الأعضاء
      const { data: members } = await supabase
        .from('group_members')
        .select('id, role')
        .eq('group_id', groupId);

      const { data: group } = await supabase
        .from('groups')
        .select('min_members, current_phase, status')
        .eq('id', groupId)
        .single();

      if (!group || !members) {
        return { ready: false, reason: 'لا يمكن الوصول لبيانات المجموعة' };
      }

      if (members.length < (group.min_members || 5)) {
        return { 
          ready: false, 
          reason: `المجموعة تحتاج إلى ${(group.min_members || 5) - members.length} عضو إضافي على الأقل`
        };
      }

      if (group.current_phase === 'negotiation') {
        return { ready: false, reason: 'المجموعة في مرحلة التفاوض بالفعل' };
      }

      return { ready: true, reason: '' };

    } catch (error) {
      return { ready: false, reason: 'خطأ في التحقق من جاهزية المجموعة' };
    }
  }, [groupId]);

  const createAdminElectionIfNeeded = useCallback(async () => {
    try {
      // التحقق من وجود انتخابات مديرين نشطة
      const { data: existingElection } = await supabase
        .from('admin_elections')
        .select('id')
        .eq('group_id', groupId)
        .eq('status', 'active')
        .single();

      if (existingElection) return; // توجد انتخابات نشطة بالفعل

      // إنشاء انتخابات جديدة للمديرين
      const { error } = await supabase
        .from('admin_elections')
        .insert({
          group_id: groupId,
          title: 'انتخاب مديري مرحلة التفاوض',
          phase: 'negotiation',
          candidates: [], // سيتم ملؤها لاحقاً من قائمة الأعضاء
          status: 'active'
        });

      if (error) throw error;

    } catch (error) {
      console.error('Error creating admin election:', error);
    }
  }, [groupId]);

  const canStartNegotiations = useCallback(async (): Promise<boolean> => {
    const readiness = await checkGroupReadiness();
    return readiness.ready;
  }, [checkGroupReadiness]);

  const getPhaseProgress = useCallback((phaseId: string) => {
    const phase = negotiationPhases.find(p => p.id === phaseId);
    return phase ? phase.progress : 0;
  }, []);

  return {
    negotiationPhases,
    currentPhase,
    loading,
    startNegotiations,
    moveToNextPhase,
    canStartNegotiations,
    checkGroupReadiness,
    getPhaseProgress
  };
};
