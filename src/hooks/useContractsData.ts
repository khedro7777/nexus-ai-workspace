
import { useState, useEffect } from 'react';

export interface Contract {
  id: string;
  title: string;
  parties: string[];
  type: 'شراء' | 'بيع' | 'خدمات' | 'شراكة';
  status: 'مسودة' | 'قيد المراجعة' | 'موقع' | 'منتهي';
  value: number;
  startDate: string;
  endDate: string;
  progress: number;
}

export const useContractsData = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setContracts([
        {
          id: 'CNT-001',
          title: 'عقد توريد مواد البناء',
          parties: ['شركة الإنشاءات المتطورة', 'مصنع الأسمنت الوطني'],
          type: 'شراء',
          status: 'موقع',
          value: 500000,
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          progress: 65
        },
        {
          id: 'CNT-002',
          title: 'عقد خدمات استشارية',
          parties: ['شركة التطوير', 'مكتب الاستشارات الهندسية'],
          type: 'خدمات',
          status: 'قيد المراجعة',
          value: 150000,
          startDate: '2024-02-01',
          endDate: '2024-08-01',
          progress: 30
        },
        {
          id: 'CNT-003',
          title: 'عقد شراكة تجارية',
          parties: ['الشركة التجارية الكبرى', 'مؤسسة التصدير'],
          type: 'شراكة',
          status: 'مسودة',
          value: 750000,
          startDate: '2024-03-01',
          endDate: '2025-03-01',
          progress: 10
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
      progress: 0
    };
    setContracts(prev => [newContract, ...prev]);
    return newContract;
  };

  const updateContract = (updatedContract: Contract) => {
    setContracts(prev => prev.map(contract => 
      contract.id === updatedContract.id ? updatedContract : contract
    ));
  };

  const updateContractStatus = (contractId: string, status: Contract['status']) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId ? { ...contract, status } : contract
    ));
  };

  const updateProgress = (contractId: string, progress: number) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId ? { ...contract, progress } : contract
    ));
  };

  return {
    contracts,
    loading,
    createContract,
    updateContract,
    updateContractStatus,
    updateProgress
  };
};
