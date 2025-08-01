import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

const translations = {
  en: {
    // Navigation & Layout
    welcome: 'Welcome to GPO Nexus',
    subtitle: 'Your AI-powered unified workspace for global business',
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
    discountOffers: 'Discount Offers',
    
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
    joinGroup: 'Join Group',
    submitOffer: 'Submit Offer',
    provideService: 'Provide Service',
    joinDiscountOffer: 'Join Discount Offer',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    completed: 'Completed',
    draft: 'Draft',
    published: 'Published',
    
    // Filters
    groupType: 'Group Type',
    country: 'Country',
    status: 'Status',
    role: 'Role',
    
    // Footer
    about: 'About',
    founders: 'Founders',
    legal: 'Legal',
    contact: 'Contact',
    userGuide: 'User Guide'
  },
  ar: {
    // Keep minimal Arabic translations for UI elements only
    welcome: 'مرحباً بك في جي بي أو نيكسوس',
    subtitle: 'مساحة العمل الموحدة المدعومة بالذكاء الاصطناعي للأعمال العالمية',
    services: 'الخدمات',
    groups: 'المجموعات النشطة',
    newGroup: 'إنشاء مجموعة جديدة',
    dashboard: 'لوحة التحكم',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    signOut: 'تسجيل الخروج',
    signIn: 'تسجيل الدخول',
    createAccount: 'إنشاء حساب',
    
    // Main Menu Items (Arabic UI only)
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
    discountOffers: 'عروض الخصم',
    
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
    joinGroup: 'انضم للمجموعة',
    submitOffer: 'تقديم عرض',
    provideService: 'تقديم خدمة',
    joinDiscountOffer: 'انضم لعرض الخصم',
    
    // Status
    active: 'نشط',
    inactive: 'غير نشط',
    pending: 'في الانتظار',
    completed: 'مكتمل',
    draft: 'مسودة',
    published: 'منشور',
    
    // Filters
    groupType: 'نوع المجموعة',
    country: 'الدولة',
    status: 'الحالة',
    role: 'الدور',
    
    // Footer
    about: 'من نحن',
    founders: 'المؤسسون',
    legal: 'القانونية',
    contact: 'اتصل بنا',
    userGuide: 'دليل المستخدم'
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
