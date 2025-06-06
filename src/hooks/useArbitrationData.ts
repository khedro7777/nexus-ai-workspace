
import { useState, useEffect } from 'react';

export interface ArbitrationCase {
  id: string;
  title: string;
  parties: string[];
  status: 'جاري' | 'معلق' | 'مكتمل';
  priority: 'عالي' | 'متوسط' | 'منخفض';
  assignedTo: string;
  createdAt: string;
  deadline: string;
  evidence?: string[];
  amount?: number;
}

export interface Arbitrator {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  cases: number;
  rating: number;
  status: 'متاح' | 'مشغول';
}

export const useArbitrationData = () => {
  const [cases, setCases] = useState<ArbitrationCase[]>([]);
  const [arbitrators, setArbitrators] = useState<Arbitrator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل البيانات
    const fetchData = async () => {
      setLoading(true);
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCases([
        {
          id: 'ARB-001',
          title: 'نزاع حول جودة المنتج',
          parties: ['شركة الأحمد التجارية', 'مؤسسة البناء الحديث'],
          status: 'جاري',
          priority: 'عالي',
          assignedTo: 'المحكم أحمد سالم',
          createdAt: '2024-01-15',
          deadline: '2024-02-15',
          amount: 50000
        },
        {
          id: 'ARB-002',
          title: 'خلاف في شروط التسليم',
          parties: ['مصنع الكيماويات', 'شركة النقل السريع'],
          status: 'معلق',
          priority: 'متوسط',
          assignedTo: 'المحكمة فاطمة النور',
          createdAt: '2024-01-10',
          deadline: '2024-02-10',
          amount: 75000
        },
        {
          id: 'ARB-003',
          title: 'نزاع مالي',
          parties: ['البنك التجاري', 'شركة الاستثمار'],
          status: 'مكتمل',
          priority: 'عالي',
          assignedTo: 'المحكم محمد عبدالله',
          createdAt: '2024-01-05',
          deadline: '2024-01-20',
          amount: 120000
        }
      ]);

      setArbitrators([
        {
          id: '1',
          name: 'المحكم أحمد سالم',
          specialty: 'القانون التجاري',
          experience: '15 سنة',
          cases: 45,
          rating: 4.9,
          status: 'متاح'
        },
        {
          id: '2',
          name: 'المحكمة فاطمة النور',
          specialty: 'قانون العقود',
          experience: '12 سنة',
          cases: 38,
          rating: 4.8,
          status: 'مشغول'
        },
        {
          id: '3',
          name: 'المحكم محمد عبدالله',
          specialty: 'القانون المصرفي',
          experience: '20 سنة',
          cases: 67,
          rating: 4.9,
          status: 'متاح'
        }
      ]);
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const createNewCase = (caseData: Partial<ArbitrationCase>) => {
    const newCase: ArbitrationCase = {
      id: `ARB-${Date.now()}`,
      title: caseData.title || '',
      parties: caseData.parties || [],
      status: 'معلق',
      priority: caseData.priority || 'متوسط',
      assignedTo: '',
      createdAt: new Date().toISOString().split('T')[0],
      deadline: caseData.deadline || '',
      amount: caseData.amount
    };
    setCases(prev => [newCase, ...prev]);
    return newCase;
  };

  const updateCaseStatus = (caseId: string, status: ArbitrationCase['status']) => {
    setCases(prev => prev.map(case_item => 
      case_item.id === caseId ? { ...case_item, status } : case_item
    ));
  };

  const assignArbitrator = (caseId: string, arbitratorName: string) => {
    setCases(prev => prev.map(case_item => 
      case_item.id === caseId ? { ...case_item, assignedTo: arbitratorName } : case_item
    ));
  };

  return {
    cases,
    arbitrators,
    loading,
    createNewCase,
    updateCaseStatus,
    assignArbitrator
  };
};
