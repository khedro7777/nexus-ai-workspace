
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'fr' | 'es' | 'zh' | 'hi' | 'ko' | 'ja';

const translations = {
  en: {
    welcome: 'Welcome to GPO Nexus',
    subtitle: 'Your AI-powered unified workspace',
    services: 'Services',
    groups: 'Active Groups',
    newGroup: 'Create New Group',
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    suppliers: 'Suppliers',
    contracts: 'Contracts',
    voting: 'Voting',
    governance: 'Governance',
    investment: 'Investment Portal',
    workflows: 'Smart Workflows',
    c2cStore: 'C2C Store'
  },
  ar: {
    welcome: 'مرحباً بك في جي بي أو نيكسوس',
    subtitle: 'مساحة العمل الموحدة المدعومة بالذكاء الاصطناعي',
    services: 'الخدمات',
    groups: 'المجموعات النشطة',
    newGroup: 'إنشاء مجموعة جديدة',
    dashboard: 'لوحة التحكم',
    analytics: 'التحليلات',
    suppliers: 'الموردين',
    contracts: 'العقود',
    voting: 'التصويت',
    governance: 'الحوكمة',
    investment: 'بوابة الاستثمار',
    workflows: 'سير العمل الذكي',
    c2cStore: 'متجر المستهلك للمستهلك'
  },
  fr: {
    welcome: 'Bienvenue à GPO Nexus',
    subtitle: 'Votre espace de travail unifié alimenté par IA',
    services: 'Services',
    groups: 'Groupes Actifs',
    newGroup: 'Créer un Nouveau Groupe',
    dashboard: 'Tableau de bord',
    analytics: 'Analytique',
    suppliers: 'Fournisseurs',
    contracts: 'Contrats',
    voting: 'Vote',
    governance: 'Gouvernance',
    investment: 'Portail d\'investissement',
    workflows: 'Flux de travail intelligents',
    c2cStore: 'Magasin C2C'
  },
  es: {
    welcome: 'Bienvenido a GPO Nexus',
    subtitle: 'Tu espacio de trabajo unificado con IA',
    services: 'Servicios',
    groups: 'Grupos Activos',
    newGroup: 'Crear Nuevo Grupo',
    dashboard: 'Panel de control',
    analytics: 'Analítica',
    suppliers: 'Proveedores',
    contracts: 'Contratos',
    voting: 'Votación',
    governance: 'Gobernanza',
    investment: 'Portal de inversión',
    workflows: 'Flujos de trabajo inteligentes',
    c2cStore: 'Tienda C2C'
  },
  zh: {
    welcome: '欢迎来到GPO Nexus',
    subtitle: '您的AI驱动统一工作空间',
    services: '服务',
    groups: '活跃群组',
    newGroup: '创建新群组',
    dashboard: '仪表板',
    analytics: '分析',
    suppliers: '供应商',
    contracts: '合同',
    voting: '投票',
    governance: '治理',
    investment: '投资门户',
    workflows: '智能工作流程',
    c2cStore: 'C2C商店'
  },
  hi: {
    welcome: 'GPO नेक्सस में आपका स्वागत है',
    subtitle: 'आपका AI-संचालित एकीकृत कार्यक्षेत्र',
    services: 'सेवाएं',
    groups: 'सक्रिय समूह',
    newGroup: 'नया समूह बनाएं',
    dashboard: 'डैशबोर्ड',
    analytics: 'विश्लेषण',
    suppliers: 'आपूर्तिकर्ता',
    contracts: 'अनुबंध',
    voting: 'मतदान',
    governance: 'शासन',
    investment: 'निवेश पोर्टल',
    workflows: 'स्मार्ट वर्कफ़लो',
    c2cStore: 'C2C स्टोर'
  },
  ko: {
    welcome: 'GPO 넥서스에 오신 것을 환영합니다',
    subtitle: 'AI 기반 통합 워크스페이스',
    services: '서비스',
    groups: '활성 그룹',
    newGroup: '새 그룹 생성',
    dashboard: '대시보드',
    analytics: '분석',
    suppliers: '공급업체',
    contracts: '계약',
    voting: '투표',
    governance: '거버넌스',
    investment: '투자 포털',
    workflows: '스마트 워크플로',
    c2cStore: 'C2C 스토어'
  },
  ja: {
    welcome: 'GPO Nexusへようこそ',
    subtitle: 'AI駆動の統合ワークスペース',
    services: 'サービス',
    groups: 'アクティブグループ',
    newGroup: '新しいグループを作成',
    dashboard: 'ダッシュボード',
    analytics: '分析',
    suppliers: 'サプライヤー',
    contracts: '契約',
    voting: '投票',
    governance: 'ガバナンス',
    investment: '投資ポータル',
    workflows: 'スマートワークフロー',
    c2cStore: 'C2Cストア'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language || 'en';
    setLanguage(savedLang);
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
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
