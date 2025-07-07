
import { WorkflowTemplate } from './WorkflowEngine';

export const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 'group-creation',
    name: 'إنشاء مجموعة شراء جماعي',
    description: 'سير عمل شامل لإنشاء وإدارة مجموعة شراء جماعي',
    category: 'إدارة المجموعات',
    estimatedTime: 45,
    complexity: 'medium',
    steps: [
      {
        id: 'define-objectives',
        title: 'تحديد الأهداف التجارية',
        description: 'تحديد أهداف المجموعة والمنتجات المطلوبة',
        status: 'pending',
        type: 'manual',
        duration: 10,
        requirements: ['وصف واضح للمنتج', 'تحديد الكمية المطلوبة']
      },
      {
        id: 'set-legal-framework',
        title: 'وضع الإطار القانوني',
        description: 'اختيار الاختصاص القضائي وشروط العقد',
        status: 'pending',
        type: 'manual',
        duration: 15,
        requirements: ['اختيار الولاية القضائية', 'تحديد شروط العقد']
      },
      {
        id: 'configure-group',
        title: 'تكوين المجموعة',
        description: 'تحديد الحد الأدنى والأقصى للأعضاء والنقاط المطلوبة',
        status: 'pending',
        type: 'manual',
        duration: 10,
        requirements: ['تحديد عدد الأعضاء', 'تحديد النقاط المطلوبة']
      },
      {
        id: 'create-group',
        title: 'إنشاء المجموعة',
        description: 'إنشاء المجموعة في النظام',
        status: 'pending',
        type: 'automatic',
        duration: 2
      },
      {
        id: 'invite-members',
        title: 'دعوة الأعضاء',
        description: 'إرسال دعوات للأعضاء المحتملين',
        status: 'pending',
        type: 'manual',
        duration: 8,
        requirements: ['قائمة بالأعضاء المحتملين']
      }
    ]
  },
  {
    id: 'supplier-negotiation',
    name: 'مفاوضة الموردين',
    description: 'سير عمل للمفاوضة مع الموردين والحصول على أفضل الأسعار',
    category: 'المفاوضات',
    estimatedTime: 60,
    complexity: 'complex',
    steps: [
      {
        id: 'identify-suppliers',
        title: 'تحديد الموردين',
        description: 'البحث عن الموردين المؤهلين وتقييمهم',
        status: 'pending',
        type: 'manual',
        duration: 20,
        requirements: ['معايير اختيار الموردين', 'قائمة الموردين المحتملين']
      },
      {
        id: 'send-rfq',
        title: 'إرسال طلبات العروض',
        description: 'إرسال طلبات عروض مفصلة للموردين',
        status: 'pending',
        type: 'automatic',
        duration: 5
      },
      {
        id: 'evaluate-offers',
        title: 'تقييم العروض',
        description: 'مراجعة وتحليل العروض المستلمة',
        status: 'pending',
        type: 'manual',
        duration: 15,
        requirements: ['معايير التقييم']
      },
      {
        id: 'negotiate-terms',
        title: 'التفاوض على الشروط',
        description: 'التفاوض مع الموردين على الأسعار والشروط',
        status: 'pending',
        type: 'manual',
        duration: 15
      },
      {
        id: 'finalize-agreement',
        title: 'إنهاء الاتفاقية',
        description: 'وضع اللمسات الأخيرة على الاتفاقية',
        status: 'pending',
        type: 'approval',
        duration: 5,
        requirements: ['موافقة أعضاء المجموعة']
      }
    ]
  },
  {
    id: 'contract-execution',
    name: 'تنفيذ العقد',
    description: 'سير عمل لتنفيذ العقود الذكية وإدارة المدفوعات',
    category: 'العقود',
    estimatedTime: 30,
    complexity: 'medium',
    steps: [
      {
        id: 'contract-review',
        title: 'مراجعة العقد',
        description: 'مراجعة شروط العقد والتأكد من صحتها',
        status: 'pending',
        type: 'manual',
        duration: 10,
        requirements: ['نسخة العقد النهائية']
      },
      {
        id: 'member-approval',
        title: 'موافقة الأعضاء',
        description: 'الحصول على موافقة جميع أعضاء المجموعة',
        status: 'pending',
        type: 'approval',
        duration: 15,
        requirements: ['تصويت الأعضاء']
      },
      {
        id: 'deploy-contract',
        title: 'نشر العقد الذكي',
        description: 'نشر العقد الذكي على البلوك تشين',
        status: 'pending',
        type: 'automatic',
        duration: 3
      },
      {
        id: 'execute-payment',
        title: 'تنفيذ الدفع',
        description: 'تنفيذ المدفوعات وفقاً لشروط العقد',
        status: 'pending',
        type: 'automatic',
        duration: 2
      }
    ]
  },
  {
    id: 'service-creation',
    name: 'إنشاء خدمة للبيع',
    description: 'سير عمل لإنشاء وعرض خدمة في متجر الخدمات',
    category: 'الخدمات',
    estimatedTime: 25,
    complexity: 'simple',
    steps: [
      {
        id: 'define-service',
        title: 'تعريف الخدمة',
        description: 'تحديد نوع الخدمة والوصف التفصيلي',
        status: 'pending',
        type: 'manual',
        duration: 10,
        requirements: ['عنوان الخدمة', 'وصف مفصل', 'فئة الخدمة']
      },
      {
        id: 'set-pricing',
        title: 'تحديد السعر',
        description: 'تحديد سعر الخدمة بالنقاط',
        status: 'pending',
        type: 'manual',
        duration: 5,
        requirements: ['سعر تنافسي', 'مقارنة بالخدمات المشابهة']
      },
      {
        id: 'add-features',
        title: 'إضافة المميزات',
        description: 'تحديد مميزات وخصائص الخدمة',
        status: 'pending',
        type: 'manual',
        duration: 8,
        requirements: ['قائمة المميزات']
      },
      {
        id: 'publish-service',
        title: 'نشر الخدمة',
        description: 'نشر الخدمة في متجر الخدمات',
        status: 'pending',
        type: 'automatic',
        duration: 2
      }
    ]
  },
  {
    id: 'points-withdrawal',
    name: 'سحب النقاط',
    description: 'سير عمل لسحب النقاط وتحويلها إلى أموال',
    category: 'النقاط',
    estimatedTime: 20,
    complexity: 'simple',
    steps: [
      {
        id: 'calculate-amount',
        title: 'حساب المبلغ',
        description: 'حساب المبلغ المستحق بعد خصم العمولات',
        status: 'pending',
        type: 'automatic',
        duration: 2
      },
      {
        id: 'verify-balance',
        title: 'التحقق من الرصيد',
        description: 'التأكد من توفر النقاط الكافية',
        status: 'pending',
        type: 'automatic',
        duration: 1
      },
      {
        id: 'submit-request',
        title: 'تقديم طلب السحب',
        description: 'تقديم طلب سحب النقاط',
        status: 'pending',
        type: 'manual',
        duration: 5,
        requirements: ['بيانات الحساب البنكي']
      },
      {
        id: 'admin-approval',
        title: 'موافقة الإدارة',
        description: 'مراجعة وموافقة الإدارة على طلب السحب',
        status: 'pending',
        type: 'approval',
        duration: 10
      },
      {
        id: 'process-payment',
        title: 'معالجة الدفع',
        description: 'تحويل المبلغ إلى الحساب البنكي',
        status: 'pending',
        type: 'automatic',
        duration: 2
      }
    ]
  }
];

export const getWorkflowTemplate = (id: string): WorkflowTemplate | undefined => {
  return workflowTemplates.find(template => template.id === id);
};

export const getWorkflowsByCategory = (category: string): WorkflowTemplate[] => {
  return workflowTemplates.filter(template => template.category === category);
};
