
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'fr' | 'es' | 'zh' | 'hi' | 'ko' | 'ja';

const translations = {
  en: {
    // Navigation & Layout
    welcome: 'Welcome to GPO Nexus',
    subtitle: 'Your AI-powered unified workspace',
    services: 'Services',
    groups: 'Active Groups',
    newGroup: 'Create New Group',
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Settings',
    signOut: 'Sign Out',
    signIn: 'Sign In',
    createAccount: 'Create Account',
    
    // Main Menu Items
    home: 'Home',
    myGroups: 'My Groups',
    createGroup: 'Create Group',
    notifications: 'Notifications',
    pointsWallet: 'Points Wallet',
    aiAssistant: 'AI Assistant',
    arbitration: 'Arbitration',
    archive: 'Archive',
    marketplace: 'Marketplace',
    negotiations: 'Negotiations',
    suppliers: 'Suppliers',
    rfq: 'RFQ',
    contracts: 'Contracts',
    voting: 'Voting',
    governance: 'Governance',
    analytics: 'Analytics',
    investment: 'Investment',
    companyFormation: 'Company Formation',
    companyHub: 'Company Hub',
    automation: 'Automation',
    platformManagement: 'Platform Management',
    adminDashboard: 'Admin Dashboard',
    supplierDashboard: 'Supplier Dashboard',
    freelancerDashboard: 'Freelancer Dashboard',
    
    // Sections
    main: 'Main',
    business: 'Business',
    tools: 'Tools',
    administration: 'Administration',
    specializedRoles: 'Specialized Roles',
    account: 'Account',
    
    // Common Actions
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    download: 'Download',
    upload: 'Upload',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    completed: 'Completed',
    draft: 'Draft',
    published: 'Published'
  },
  ar: {
    // Navigation & Layout
    welcome: 'مرحباً بك في جي بي أو نيكسوس',
    subtitle: 'مساحة العمل الموحدة المدعومة بالذكاء الاصطناعي',
    services: 'الخدمات',
    groups: 'المجموعات النشطة',
    newGroup: 'إنشاء مجموعة جديدة',
    dashboard: 'لوحة التحكم',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    signOut: 'تسجيل الخروج',
    signIn: 'تسجيل الدخول',
    createAccount: 'إنشاء حساب',
    
    // Main Menu Items
    home: 'الرئيسية',
    myGroups: 'مجموعاتي',
    createGroup: 'إنشاء مجموعة',
    notifications: 'الإشعارات',
    pointsWallet: 'محفظة النقاط',
    aiAssistant: 'المساعد الذكي',
    arbitration: 'التحكيم',
    archive: 'الأرشيف',
    marketplace: 'السوق',
    negotiations: 'المفاوضات',
    suppliers: 'الموردين',
    rfq: 'طلبات التسعير',
    contracts: 'العقود',
    voting: 'التصويت',
    governance: 'الحوكمة',
    analytics: 'التحليلات',
    investment: 'الاستثمار',
    companyFormation: 'تأسيس شركة',
    companyHub: 'مركز الشركة',
    automation: 'الأتمتة',
    platformManagement: 'إدارة المنصة',
    adminDashboard: 'لوحة المدير',
    supplierDashboard: 'لوحة المورد',
    freelancerDashboard: 'لوحة المستقل',
    
    // Sections
    main: 'الرئيسية',
    business: 'الأعمال',
    tools: 'الأدوات',
    administration: 'الإدارة',
    specializedRoles: 'الأدوار المتخصصة',
    account: 'الحساب',
    
    // Common Actions
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    view: 'عرض',
    download: 'تحميل',
    upload: 'رفع',
    search: 'بحث',
    filter: 'تصفية',
    sort: 'ترتيب',
    
    // Status
    active: 'نشط',
    inactive: 'غير نشط',
    pending: 'في الانتظار',
    completed: 'مكتمل',
    draft: 'مسودة',
    published: 'منشور'
  },
  fr: {
    welcome: 'Bienvenue à GPO Nexus',
    subtitle: 'Votre espace de travail unifié alimenté par IA',
    services: 'Services',
    groups: 'Groupes Actifs',
    newGroup: 'Créer un Nouveau Groupe',
    dashboard: 'Tableau de Bord',
    profile: 'Profil',
    settings: 'Paramètres',
    signOut: 'Déconnexion',
    signIn: 'Connexion',
    createAccount: 'Créer un Compte'
  },
  es: {
    welcome: 'Bienvenido a GPO Nexus',
    subtitle: 'Tu espacio de trabajo unificado con IA',
    services: 'Servicios',
    groups: 'Grupos Activos',
    newGroup: 'Crear Nuevo Grupo',
    dashboard: 'Panel de Control',
    profile: 'Perfil',
    settings: 'Configuración',
    signOut: 'Cerrar Sesión',
    signIn: 'Iniciar Sesión',
    createAccount: 'Crear Cuenta'
  },
  zh: {
    welcome: '欢迎来到GPO Nexus',
    subtitle: '您的AI驱动统一工作空间',
    services: '服务',
    groups: '活跃群组',
    newGroup: '创建新群组',
    dashboard: '仪表板',
    profile: '个人资料',
    settings: '设置',
    signOut: '登出',
    signIn: '登录',
    createAccount: '创建账户'
  },
  hi: {
    welcome: 'GPO नेक्सस में आपका स्वागत है',
    subtitle: 'आपका AI-संचालित एकीकृत कार्यक्षेत्र',
    services: 'सेवाएं',
    groups: 'सक्रिय समूह',
    newGroup: 'नया समूह बनाएं',
    dashboard: 'डैशबोर्ड',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    signOut: 'साइन आउट',
    signIn: 'साइन इन',
    createAccount: 'खाता बनाएं'
  },
  ko: {
    welcome: 'GPO 넥서스에 오신 것을 환영합니다',
    subtitle: 'AI 기반 통합 워크스페이스',
    services: '서비스',
    groups: '활성 그룹',
    newGroup: '새 그룹 생성',
    dashboard: '대시보드',
    profile: '프로필',
    settings: '설정',
    signOut: '로그아웃',
    signIn: '로그인',
    createAccount: '계정 생성'
  },
  ja: {
    welcome: 'GPO Nexusへようこそ',
    subtitle: 'AI駆動の統合ワークスペース',
    services: 'サービス',
    groups: 'アクティブグループ',
    newGroup: '新しいグループを作成',
    dashboard: 'ダッシュボード',
    profile: 'プロフィール',
    settings: '設定',
    signOut: 'サインアウト',
    signIn: 'サインイン',
    createAccount: 'アカウント作成'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language || 'en';
    setLanguage(savedLang);
    
    // Update document direction and lang
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLang;
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key];
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
