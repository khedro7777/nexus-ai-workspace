
import { useState, useEffect } from 'react';

export interface Contract {
  id: string;
  title: string;
  parties: string[];
  type: 'شراء' | 'بيع' | 'خدمات' | 'شراكة' | 'توظيف' | 'ترخيص';
  status: 'مسودة' | 'قيد المراجعة' | 'موقع' | 'منتهي' | 'متنازع عليه' | 'نشط';
  value: number;
  startDate: string;
  endDate: string;
  progress: number;
  description?: string;
  milestones?: ContractMilestone[];
  documents?: ContractDocument[];
  lastModified?: string;
  autoRenewal?: boolean;
  currency?: string;
}

export interface ContractMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  value: number;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  completedAt?: string;
}

export interface ContractDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  version: string;
}

export const useContractsData = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setContracts([
        {
          id: 'CNT-001',
          title: 'عقد توريد مواد البناء المتقدمة',
          parties: ['شركة الإنشاءات المتطورة', 'مصنع الأسمنت الوطني', 'شركة الحديد والصلب'],
          type: 'شراء',
          status: 'موقع',
          value: 750000,
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          progress: 68,
          description: 'عقد شامل لتوريد مواد البناء عالية الجودة لمشروع الأبراج السكنية الجديدة',
          currency: 'USD',
          autoRenewal: true,
          lastModified: '2024-02-15T10:30:00Z',
          milestones: [
            {
              id: 'M1',
              title: 'التوريد الأول - أساسات',
              description: 'توريد مواد الأساسات والخرسانة',
              dueDate: '2024-03-01',
              value: 250000,
              status: 'completed',
              completedAt: '2024-02-28T14:00:00Z'
            },
            {
              id: 'M2',
              title: 'التوريد الثاني - هيكل البناء',
              description: 'توريد الحديد والصلب للهيكل الأساسي',
              dueDate: '2024-06-01',
              value: 300000,
              status: 'in_progress'
            }
          ]
        },
        {
          id: 'CNT-002',
          title: 'عقد خدمات استشارية تقنية متخصصة',
          parties: ['شركة التطوير التقني', 'مكتب الاستشارات الهندسية المتقدم'],
          type: 'خدمات',
          status: 'قيد المراجعة',
          value: 280000,
          startDate: '2024-02-01',
          endDate: '2024-10-01',
          progress: 45,
          description: 'تقديم استشارات تقنية شاملة وحلول هندسية مبتكرة للمشاريع الكبيرة',
          currency: 'USD',
          autoRenewal: false,
          lastModified: '2024-02-10T16:45:00Z'
        },
        {
          id: 'CNT-003',
          title: 'عقد شراكة تجارية استراتيجية',
          parties: ['الشركة التجارية الكبرى', 'مؤسسة التصدير الدولية', 'شركة اللوجستيات المتقدمة'],
          type: 'شراكة',
          status: 'مسودة',
          value: 1200000,
          startDate: '2024-03-01',
          endDate: '2025-03-01',
          progress: 15,
          description: 'شراكة استراتيجية طويلة المدى لتطوير الأسواق الجديدة وزيادة حجم الصادرات',
          currency: 'USD',
          autoRenewal: true,
          lastModified: '2024-02-08T09:20:00Z'
        },
        {
          id: 'CNT-004',
          title: 'عقد توظيف المواهب التقنية',
          parties: ['شركة التقنيات الذكية', 'وكالة التوظيف المتخصصة'],
          type: 'توظيف',
          status: 'نشط',
          value: 180000,
          startDate: '2024-01-15',
          endDate: '2024-07-15',
          progress: 70,
          description: 'توظيف وتدريب الكوادر التقنية المتخصصة في مجال الذكاء الاصطناعي',
          currency: 'USD',
          autoRenewal: false,
          lastModified: '2024-02-12T11:10:00Z'
        },
        {
          id: 'CNT-005',
          title: 'عقد ترخيص التكنولوجيا المتقدمة',
          parties: ['شركة الابتكار التقني', 'مختبر الأبحاث الدولي'],
          type: 'ترخيص',
          status: 'موقع',
          value: 450000,
          startDate: '2024-01-01',
          endDate: '2026-01-01',
          progress: 25,
          description: 'ترخيص استخدام التقنيات المتقدمة في مجال الطاقة المتجددة والذكاء الاصطناعي',
          currency: 'USD',
          autoRenewal: true,
          lastModified: '2024-01-20T13:30:00Z'
        }
      ]);
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const createContract = (contractData: Partial<Contract>) => {
    const newContract: Contract = {
      id: `CNT-${Date.now()}`,
      title: contractData.title || '',
      parties: contractData.parties || [],
      type: contractData.type || 'خدمات',
      status: 'مسودة',
      value: contractData.value || 0,
      startDate: contractData.startDate || new Date().toISOString().split('T')[0],
      endDate: contractData.endDate || '',
      progress: 0,
      description: contractData.description || '',
      currency: contractData.currency || 'USD',
      autoRenewal: contractData.autoRenewal || false,
      lastModified: new Date().toISOString()
    };
    setContracts(prev => [newContract, ...prev]);
    return newContract;
  };

  const updateContractStatus = (contractId: string, status: Contract['status']) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId ? { 
        ...contract, 
        status, 
        lastModified: new Date().toISOString() 
      } : contract
    ));
  };

  const updateProgress = (contractId: string, progress: number) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId ? { 
        ...contract, 
        progress: Math.max(0, Math.min(100, progress)),
        lastModified: new Date().toISOString()
      } : contract
    ));
  };

  const updateContract = (contractId: string, updates: Partial<Contract>) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId ? { 
        ...contract, 
        ...updates,
        lastModified: new Date().toISOString()
      } : contract
    ));
  };

  const deleteContract = (contractId: string) => {
    setContracts(prev => prev.filter(contract => contract.id !== contractId));
  };

  const getContractById = (contractId: string) => {
    return contracts.find(contract => contract.id === contractId);
  };

  const getContractsByStatus = (status: Contract['status']) => {
    return contracts.filter(contract => contract.status === status);
  };

  const getContractsByType = (type: Contract['type']) => {
    return contracts.filter(contract => contract.type === type);
  };

  const getContractsStats = () => {
    const total = contracts.length;
    const active = contracts.filter(c => c.status === 'موقع' || c.status === 'نشط').length;
    const completed = contracts.filter(c => c.status === 'منتهي').length;
    const pending = contracts.filter(c => c.status === 'قيد المراجعة').length;
    const draft = contracts.filter(c => c.status === 'مسودة').length;
    const totalValue = contracts.reduce((sum, c) => sum + c.value, 0);
    const avgProgress = total > 0 ? contracts.reduce((sum, c) => sum + c.progress, 0) / total : 0;

    return {
      total,
      active,
      completed,
      pending,
      draft,
      totalValue,
      avgProgress: Math.round(avgProgress)
    };
  };

  return {
    contracts,
    loading,
    createContract,
    updateContractStatus,
    updateProgress,
    updateContract,
    deleteContract,
    getContractById,
    getContractsByStatus,
    getContractsByType,
    getContractsStats
  };
};
