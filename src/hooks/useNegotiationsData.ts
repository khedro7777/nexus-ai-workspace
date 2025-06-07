
import { useState, useEffect } from 'react';

export interface Negotiation {
  id: string;
  title: string;
  groupName: string;
  supplierName: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled' | 'paused';
  currentRound: number;
  maxRounds: number;
  startDate: string;
  deadline: string;
  initialOffer: number;
  currentOffer: number;
  targetPrice: number;
  progress: number;
  messages: Array<{
    id: string;
    sender: string;
    message: string;
    timestamp: string;
    type: 'offer' | 'counter' | 'message';
  }>;
  participants: string[];
}

export const useNegotiationsData = () => {
  const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setNegotiations([
        {
          id: 'NEG-001',
          title: 'تطوير نظام إدارة المخزون',
          groupName: 'مجموعة تطوير الأنظمة',
          supplierName: 'شركة التقنية المتطورة',
          status: 'active',
          currentRound: 2,
          maxRounds: 3,
          startDate: '2024-01-10',
          deadline: '2024-01-25',
          initialOffer: 50000,
          currentOffer: 35000,
          targetPrice: 30000,
          progress: 60,
          messages: [
            {
              id: 'MSG-001',
              sender: 'شركة التقنية المتطورة',
              message: 'نقدم عرضنا المحدث بقيمة 35,000 ريال مع ضمان سنة كاملة',
              timestamp: '2024-01-15 14:30',
              type: 'offer'
            },
            {
              id: 'MSG-002',
              sender: 'مجموعة تطوير الأنظمة',
              message: 'نحتاج لمراجعة العرض مع أعضاء المجموعة',
              timestamp: '2024-01-15 16:00',
              type: 'message'
            }
          ],
          participants: ['أحمد محمد', 'فاطمة علي', 'محمد سالم']
        },
        {
          id: 'NEG-002',
          title: 'توريد أثاث مكتبي',
          groupName: 'مجموعة الأثاث المكتبي',
          supplierName: 'مصنع الأثاث الحديث',
          status: 'paused',
          currentRound: 1,
          maxRounds: 2,
          startDate: '2024-01-12',
          deadline: '2024-01-20',
          initialOffer: 25000,
          currentOffer: 25000,
          targetPrice: 20000,
          progress: 25,
          messages: [
            {
              id: 'MSG-003',
              sender: 'مصنع الأثاث الحديث',
              message: 'العرض الأولي شامل التركيب والضمان',
              timestamp: '2024-01-12 10:00',
              type: 'offer'
            }
          ],
          participants: ['سارة أحمد', 'خالد محمد']
        },
        {
          id: 'NEG-003',
          title: 'خدمات النقل واللوجستيات',
          groupName: 'مجموعة الشحن والنقل',
          supplierName: 'مؤسسة الخدمات اللوجستية',
          status: 'completed',
          currentRound: 3,
          maxRounds: 3,
          startDate: '2024-01-05',
          deadline: '2024-01-15',
          initialOffer: 15000,
          currentOffer: 12000,
          targetPrice: 12000,
          progress: 100,
          messages: [
            {
              id: 'MSG-004',
              sender: 'مؤسسة الخدمات اللوجستية',
              message: 'تم قبول العرض النهائي بقيمة 12,000 ريال',
              timestamp: '2024-01-15 12:00',
              type: 'offer'
            }
          ],
          participants: ['علي محمد', 'نورا سالم', 'محمد علي']
        }
      ]);
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const updateNegotiationStatus = (negotiationId: string, status: Negotiation['status']) => {
    setNegotiations(prev => prev.map(negotiation => 
      negotiation.id === negotiationId ? { ...negotiation, status } : negotiation
    ));
  };

  const addMessage = (negotiationId: string, message: Omit<Negotiation['messages'][0], 'id' | 'timestamp'>) => {
    setNegotiations(prev => prev.map(negotiation => 
      negotiation.id === negotiationId ? {
        ...negotiation,
        messages: [...negotiation.messages, {
          ...message,
          id: `MSG-${Date.now()}`,
          timestamp: new Date().toLocaleString('ar-SA')
        }]
      } : negotiation
    ));
  };

  const submitOffer = (negotiationId: string, offerAmount: number) => {
    setNegotiations(prev => prev.map(negotiation => 
      negotiation.id === negotiationId ? {
        ...negotiation,
        currentOffer: offerAmount,
        currentRound: negotiation.currentRound + 1,
        progress: Math.min(((negotiation.maxRounds - negotiation.currentRound + 1) / negotiation.maxRounds) * 100, 100)
      } : negotiation
    ));
  };

  return {
    negotiations,
    loading,
    updateNegotiationStatus,
    addMessage,
    submitOffer
  };
};
