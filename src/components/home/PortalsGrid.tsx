
import React from 'react';
import PortalCard from '../gateways/PortalCard';
import { 
  ShoppingCart, 
  Megaphone, 
  Building2, 
  TrendingUp, 
  Truck, 
  User, 
  Users, 
  Wrench, 
  Package, 
  Gavel, 
  FileText, 
  Handshake 
} from 'lucide-react';

const PortalsGrid = () => {
  const portals = [
    {
      id: 'cooperative-purchasing',
      title: 'الشراء التعاوني',
      description: 'انضم لمجموعات الشراء للحصول على أفضل الأسعار',
      icon: ShoppingCart,
      route: '/create-group',
      kycRequired: true,
      pointsRequired: true,
      activeGroups: [
        {
          id: '1',
          name: 'مجموعة شراء الأجهزة الإلكترونية',
          description: 'نبحث عن موردين للأجهزة الإلكترونية بأسعار الجملة',
          phase: 'التكوين',
          memberCount: 12,
          maxMembers: 50,
          status: 'البحث عن أعضاء',
          rating: 4.5,
          category: 'إلكترونيات'
        },
        {
          id: '2',
          name: 'مجموعة شراء المواد الخام',
          description: 'شراء المواد الخام للصناعات الصغيرة',
          phase: 'نشط',
          memberCount: 25,
          maxMembers: 30,
          status: 'انتظار العرض',
          rating: 4.2,
          category: 'مواد خام'
        }
      ]
    },
    {
      id: 'cooperative-marketing',
      title: 'التسويق التعاوني',
      description: 'تعاون في الحملات التسويقية لتقليل التكاليف',
      icon: Megaphone,
      route: '/marketing',
      kycRequired: true,
      pointsRequired: true,
      activeGroups: [
        {
          id: '3',
          name: 'حملة تسويق للمنتجات المحلية',
          description: 'حملة تسويقية مشتركة للمنتجات المحلية',
          phase: 'التفاوض',
          memberCount: 8,
          status: 'قيد التفاوض',
          rating: 4.7,
          category: 'تسويق'
        }
      ]
    },
    {
      id: 'company-formation',
      title: 'تكوين الشركات',
      description: 'أسس شركتك مع شركاء أو بشكل فردي',
      icon: Building2,
      route: '/company-formation',
      activeGroups: [
        {
          id: '4',
          name: 'تأسيس شركة تكنولوجيا',
          description: 'تأسيس شركة تكنولوجيا مع شركاء',
          phase: 'التكوين',
          memberCount: 3,
          maxMembers: 5,
          status: 'البحث عن أعضاء',
          rating: 4.3,
          category: 'تكنولوجيا'
        }
      ]
    },
    {
      id: 'investment-groups',
      title: 'مجموعات الاستثمار',
      description: 'استثمر مع آخرين في مشاريع واعدة',
      icon: TrendingUp,
      route: '/investment',
      kycRequired: true,
      pointsRequired: true,
      activeGroups: [
        {
          id: '5',
          name: 'استثمار في العقارات',
          description: 'استثمار جماعي في المشاريع العقارية',
          phase: 'نشط',
          memberCount: 15,
          status: 'قيد التفاوض',
          rating: 4.6,
          category: 'عقارات'
        },
        {
          id: '6',
          name: 'استثمار في الذكاء الاصطناعي',
          description: 'استثمار في شركات الذكاء الاصطناعي الناشئة',
          phase: 'التكوين',
          memberCount: 7,
          maxMembers: 20,
          status: 'البحث عن أعضاء',
          rating: 4.8,
          category: 'تكنولوجيا'
        }
      ]
    },
    {
      id: 'suppliers',
      title: 'الموردين',
      description: 'اعثر على موردين معتمدين وموثوقين',
      icon: Truck,
      route: '/suppliers',
      kycRequired: true,
      pointsRequired: true,
      activeGroups: [
        {
          id: '7',
          name: 'موردي المواد الغذائية',
          description: 'شبكة موردين للمواد الغذائية العضوية',
          phase: 'نشط',
          memberCount: 20,
          status: 'نشط',
          rating: 4.4,
          category: 'مواد غذائية'
        }
      ]
    },
    {
      id: 'freelancers',
      title: 'المستقلين',
      description: 'اعثر على أفضل المواهب المستقلة',
      icon: User,
      route: '/freelancer-dashboard',
      mcpExam: true,
      activeGroups: [
        {
          id: '8',
          name: 'مجموعة المطورين',
          description: 'شبكة من المطورين المحترفين',
          phase: 'نشط',
          memberCount: 45,
          status: 'نشط',
          rating: 4.9,
          category: 'تطوير'
        },
        {
          id: '9',
          name: 'مجموعة المصممين',
          description: 'شبكة من المصممين المبدعين',
          phase: 'نشط',
          memberCount: 32,
          status: 'نشط',
          rating: 4.7,
          category: 'تصميم'
        }
      ]
    },
    {
      id: 'freelancer-groups',
      title: 'مجموعات المستقلين',
      description: 'انضم لمجموعات المستقلين لمشاريع أكبر',
      icon: Users,
      route: '/freelancer-groups',
      mcpExam: true,
      activeGroups: [
        {
          id: '10',
          name: 'مجموعة تطوير التطبيقات',
          description: 'فريق لتطوير التطبيقات المتكاملة',
          phase: 'نشط',
          memberCount: 8,
          maxMembers: 10,
          status: 'البحث عن أعضاء',
          rating: 4.8,
          category: 'تطوير'
        }
      ]
    },
    {
      id: 'service-providers',
      title: 'مقدمي الخدمات',
      description: 'اعثر على مقدمي الخدمات المحترفين',
      icon: Wrench,
      route: '/services',
      activeGroups: [
        {
          id: '11',
          name: 'خدمات الاستشارات القانونية',
          description: 'شبكة من المحامين والمستشارين القانونيين',
          phase: 'نشط',
          memberCount: 15,
          status: 'نشط',
          rating: 4.6,
          category: 'قانوني'
        }
      ]
    },
    {
      id: 'product-listings',
      title: 'عرض المنتجات',
      description: 'اعرض منتجاتك للبيع أو الشراء',
      icon: Package,
      route: '/products',
      activeGroups: [
        {
          id: '12',
          name: 'منتجات الحرف اليدوية',
          description: 'منصة لعرض الحرف اليدوية المحلية',
          phase: 'نشط',
          memberCount: 30,
          status: 'نشط',
          rating: 4.5,
          category: 'حرف يدوية'
        }
      ]
    },
    {
      id: 'arbitration-documentation',
      title: 'التحكيم والتوثيق',
      description: 'خدمات التحكيم والتوثيق القانوني',
      icon: Gavel,
      route: '/arbitration',
      activeGroups: [
        {
          id: '13',
          name: 'قضايا التحكيم التجاري',
          description: 'حل النزاعات التجارية بالتحكيم',
          phase: 'نشط',
          memberCount: 5,
          status: 'نشط',
          rating: 4.9,
          category: 'قانوني'
        }
      ]
    },
    {
      id: 'arbitration-requests',
      title: 'طلبات التحكيم',
      description: 'قدم طلب تحكيم لحل النزاعات',
      icon: FileText,
      route: '/arbitration-requests',
      activeGroups: [
        {
          id: '14',
          name: 'طلبات التحكيم العقاري',
          description: 'طلبات تحكيم في النزاعات العقارية',
          phase: 'نشط',
          memberCount: 8,
          status: 'قيد المراجعة',
          rating: 4.4,
          category: 'عقارات'
        }
      ]
    },
    {
      id: 'smart-negotiation',
      title: 'حلول التفاوض الذكي',
      description: 'أدوات التفاوض المدعومة بالذكاء الاصطناعي',
      icon: Handshake,
      route: '/negotiations',
      activeGroups: [
        {
          id: '15',
          name: 'تفاوض العقود التجارية',
          description: 'تفاوض ذكي على العقود التجارية',
          phase: 'التفاوض',
          memberCount: 12,
          status: 'قيد التفاوض',
          rating: 4.7,
          category: 'تجاري'
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          بواباتنا الرئيسية
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          اختر البوابة التي تناسب احتياجاتك وانضم إلى المجموعات النشطة أو أنشئ مجموعتك الخاصة
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {portals.map((portal) => (
          <PortalCard key={portal.id} {...portal} />
        ))}
      </div>
    </div>
  );
};

export default PortalsGrid;
