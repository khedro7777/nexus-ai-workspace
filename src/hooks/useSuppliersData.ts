
import { useState, useEffect } from 'react';

export interface Supplier {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  experience: string;
  completedProjects: number;
  specialties: string[];
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
  verification: 'verified' | 'pending' | 'unverified';
  responseTime: string;
  priceRange: string;
  availability: 'available' | 'busy' | 'unavailable';
  lastActive: string;
}

export const useSuppliersData = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuppliers([
        {
          id: 'SUP-001',
          name: 'شركة التقنية المتطورة',
          category: 'تطوير البرمجيات',
          rating: 4.8,
          location: 'الرياض، السعودية',
          experience: '8 سنوات',
          completedProjects: 156,
          specialties: ['تطوير الويب', 'تطبيقات الهاتف', 'الذكاء الاصطناعي'],
          contactInfo: {
            email: 'info@techadvanced.sa',
            phone: '+966501234567',
            website: 'www.techadvanced.sa'
          },
          verification: 'verified',
          responseTime: '2 ساعة',
          priceRange: '5000 - 50000 ريال',
          availability: 'available',
          lastActive: '2024-01-15'
        },
        {
          id: 'SUP-002',
          name: 'مصنع الأثاث الحديث',
          category: 'تصنيع وأثاث',
          rating: 4.6,
          location: 'جدة، السعودية',
          experience: '12 سنة',
          completedProjects: 89,
          specialties: ['أثاث مكتبي', 'تصميم داخلي', 'أثاث منزلي'],
          contactInfo: {
            email: 'sales@modernfurniture.sa',
            phone: '+966502345678'
          },
          verification: 'verified',
          responseTime: '4 ساعات',
          priceRange: '1000 - 20000 ريال',
          availability: 'busy',
          lastActive: '2024-01-14'
        },
        {
          id: 'SUP-003',
          name: 'مؤسسة الخدمات اللوجستية',
          category: 'نقل وشحن',
          rating: 4.3,
          location: 'الدمام، السعودية',
          experience: '15 سنة',
          completedProjects: 234,
          specialties: ['نقل بري', 'شحن دولي', 'تخزين'],
          contactInfo: {
            email: 'logistics@shipping.sa',
            phone: '+966503456789'
          },
          verification: 'pending',
          responseTime: '1 يوم',
          priceRange: '500 - 15000 ريال',
          availability: 'available',
          lastActive: '2024-01-13'
        },
        {
          id: 'SUP-004',
          name: 'شركة الاستشارات الإدارية',
          category: 'استشارات',
          rating: 4.9,
          location: 'الرياض، السعودية',
          experience: '20 سنة',
          completedProjects: 312,
          specialties: ['استشارات إدارية', 'تطوير الأعمال', 'التدريب'],
          contactInfo: {
            email: 'consulting@business.sa',
            phone: '+966504567890',
            website: 'www.businessconsulting.sa'
          },
          verification: 'verified',
          responseTime: '30 دقيقة',
          priceRange: '2000 - 30000 ريال',
          availability: 'available',
          lastActive: '2024-01-15'
        }
      ]);
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const updateSupplierStatus = (supplierId: string, status: Supplier['availability']) => {
    setSuppliers(prev => prev.map(supplier => 
      supplier.id === supplierId ? { ...supplier, availability: status } : supplier
    ));
  };

  const updateVerification = (supplierId: string, verification: Supplier['verification']) => {
    setSuppliers(prev => prev.map(supplier => 
      supplier.id === supplierId ? { ...supplier, verification } : supplier
    ));
  };

  const addSupplier = (supplierData: Partial<Supplier>) => {
    const newSupplier: Supplier = {
      id: `SUP-${Date.now()}`,
      name: supplierData.name || '',
      category: supplierData.category || '',
      rating: 0,
      location: supplierData.location || '',
      experience: '0 سنة',
      completedProjects: 0,
      specialties: supplierData.specialties || [],
      contactInfo: supplierData.contactInfo || { email: '', phone: '' },
      verification: 'pending',
      responseTime: 'غير محدد',
      priceRange: 'غير محدد',
      availability: 'available',
      lastActive: new Date().toISOString().split('T')[0]
    };
    setSuppliers(prev => [newSupplier, ...prev]);
    return newSupplier;
  };

  return {
    suppliers,
    loading,
    updateSupplierStatus,
    updateVerification,
    addSupplier
  };
};
