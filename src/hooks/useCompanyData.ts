
import { useState, useEffect } from 'react';

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  location: string;
  establishedYear: number;
  employees: number;
  revenue: number;
  activeGroups: number;
  totalSavings: number;
  status: 'active' | 'pending' | 'suspended';
  contactPerson: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
  services: string[];
  certification: string[];
  lastActivity: string;
}

export const useCompanyData = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 900));
      
      setCompanies([
        {
          id: 'COMP-001',
          name: 'شركة الابتكار التقني',
          industry: 'تقنية المعلومات',
          size: 'medium',
          location: 'الرياض',
          establishedYear: 2015,
          employees: 150,
          revenue: 25000000,
          activeGroups: 8,
          totalSavings: 450000,
          status: 'active',
          contactPerson: {
            name: 'أحمد محمد السالم',
            position: 'مدير المشتريات',
            email: 'ahmed@innovation-tech.sa',
            phone: '+966501234567'
          },
          services: ['تطوير البرمجيات', 'استشارات تقنية', 'أمن المعلومات'],
          certification: ['ISO 9001', 'ISO 27001'],
          lastActivity: '2024-01-15'
        },
        {
          id: 'COMP-002',
          name: 'مجموعة البناء المتطور',
          industry: 'البناء والتشييد',
          size: 'large',
          location: 'جدة',
          establishedYear: 2010,
          employees: 500,
          revenue: 75000000,
          activeGroups: 15,
          totalSavings: 1200000,
          status: 'active',
          contactPerson: {
            name: 'فاطمة علي أحمد',
            position: 'مدير العمليات',
            email: 'fatima@advanced-construction.sa',
            phone: '+966502345678'
          },
          services: ['مقاولات عامة', 'إدارة مشاريع', 'استشارات هندسية'],
          certification: ['OHSAS 18001', 'ISO 14001'],
          lastActivity: '2024-01-14'
        },
        {
          id: 'COMP-003',
          name: 'شركة الخدمات الطبية المتكاملة',
          industry: 'الرعاية الصحية',
          size: 'medium',
          location: 'الدمام',
          establishedYear: 2018,
          employees: 200,
          revenue: 30000000,
          activeGroups: 6,
          totalSavings: 320000,
          status: 'pending',
          contactPerson: {
            name: 'د. محمد سالم العتيبي',
            position: 'المدير التنفيذي',
            email: 'mohamed@integrated-medical.sa',
            phone: '+966503456789'
          },
          services: ['خدمات طبية', 'معدات طبية', 'استشارات صحية'],
          certification: ['JCI', 'ISO 15189'],
          lastActivity: '2024-01-13'
        }
      ]);
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const updateCompanyStatus = (companyId: string, status: Company['status']) => {
    setCompanies(prev => prev.map(company => 
      company.id === companyId ? { ...company, status } : company
    ));
  };

  const addCompany = (companyData: Partial<Company>) => {
    const newCompany: Company = {
      id: `COMP-${Date.now()}`,
      name: companyData.name || '',
      industry: companyData.industry || '',
      size: companyData.size || 'small',
      location: companyData.location || '',
      establishedYear: companyData.establishedYear || new Date().getFullYear(),
      employees: companyData.employees || 0,
      revenue: companyData.revenue || 0,
      activeGroups: 0,
      totalSavings: 0,
      status: 'pending',
      contactPerson: companyData.contactPerson || {
        name: '',
        position: '',
        email: '',
        phone: ''
      },
      services: companyData.services || [],
      certification: companyData.certification || [],
      lastActivity: new Date().toISOString().split('T')[0]
    };
    setCompanies(prev => [newCompany, ...prev]);
    return newCompany;
  };

  return {
    companies,
    loading,
    updateCompanyStatus,
    addCompany
  };
};
