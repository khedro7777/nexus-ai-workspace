
import React from 'react';
import GatewayCard from './GatewayCard';

const GatewayGrid = () => {
  const gateways = [
    {
      id: 'procurement',
      title: 'بوابة المشتريات الجماعية',
      description: 'انضم إلى مجموعات الشراء للحصول على أفضل الأسعار من الموردين المعتمدين',
      category: 'مشتريات',
      features: [
        'مجموعات شراء ذكية',
        'موردين معتمدين',
        'تفاوض جماعي',
        'ضمان الجودة'
      ],
      participants: 1247,
      rating: 4.8,
      status: 'active' as const,
      route: '/create-group',
      requiresAuth: true
    },
    {
      id: 'freelancer',
      title: 'بوابة المستقلين',
      description: 'اعثر على أفضل المواهب المستقلة أو قدم خدماتك المهنية',
      category: 'خدمات',
      features: [
        'مستقلين معتمدين',
        'مشاريع متنوعة',
        'حماية الدفع',
        'تقييمات شفافة'
      ],
      participants: 892,
      rating: 4.6,
      status: 'active' as const,
      route: '/freelancer-dashboard',
      requiresAuth: true
    },
    {
      id: 'investment',
      title: 'بوابة الاستثمار',
      description: 'استكشف الفرص الاستثمارية وانضم إلى المشاريع الواعدة',
      category: 'استثمار',
      features: [
        'فرص استثمارية متنوعة',
        'تحليلات مالية',
        'استثمار جماعي',
        'إدارة المحافظ'
      ],
      participants: 634,
      rating: 4.7,
      status: 'active' as const,
      route: '/investment-portal',
      requiresAuth: true
    },
    {
      id: 'arbitration',
      title: 'بوابة التحكيم',
      description: 'حل النزاعات التجارية بطريقة عادلة وسريعة',
      category: 'قانونية',
      features: [
        'محكمين معتمدين',
        'إجراءات سريعة',
        'قرارات ملزمة',
        'سرية تامة'
      ],
      participants: 145,
      rating: 4.9,
      status: 'active' as const,
      route: '/arbitration-hub',
      requiresAuth: true
    },
    {
      id: 'company-formation',
      title: 'بوابة تأسيس الشركات',
      description: 'أسس شركتك بخطوات سهلة ومساعدة قانونية متخصصة',
      category: 'قانونية',
      features: [
        'تأسيس سريع',
        'استشارة قانونية',
        'حزم متكاملة',
        'متابعة مستمرة'
      ],
      participants: 423,
      rating: 4.5,
      status: 'active' as const,
      route: '/company-formation',
      requiresAuth: true
    },
    {
      id: 'contracts',
      title: 'بوابة العقود الذكية',
      description: 'إنشاء وإدارة العقود الذكية بطريقة آمنة وشفافة',
      category: 'تقنية',
      features: [
        'عقود ذكية آمنة',
        'تنفيذ تلقائي',
        'شفافية كاملة',
        'توثيق رقمي'
      ],
      participants: 567,
      rating: 4.4,
      status: 'active' as const,
      route: '/contracts',
      requiresAuth: true
    },
    {
      id: 'governance',
      title: 'بوابة الحوكمة',
      description: 'شارك في اتخاذ القرارات وإدارة المجتمع بطريقة ديمقراطية',
      category: 'إدارة',
      features: [
        'تصويت ديمقراطي',
        'اقتراحات المجتمع',
        'شفافية القرارات',
        'مشاركة فعالة'
      ],
      participants: 1156,
      rating: 4.6,
      status: 'active' as const,
      route: '/governance',
      requiresAuth: true
    },
    {
      id: 'analytics',
      title: 'بوابة التحليلات',
      description: 'احصل على رؤى قيمة حول أداء أعمالك ومشاريعك',
      category: 'تحليلات',
      features: [
        'تحليلات متقدمة',
        'تقارير تفاعلية',
        'مؤشرات الأداء',
        'توقعات ذكية'
      ],
      participants: 789,
      rating: 4.3,
      status: 'active' as const,
      route: '/analytics',
      requiresAuth: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {gateways.map((gateway) => (
        <GatewayCard key={gateway.id} {...gateway} />
      ))}
    </div>
  );
};

export default GatewayGrid;
