
import { useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'fr' | 'es' | 'zh' | 'hi' | 'ko' | 'ja';

const translations = {
  en: {
    welcome: 'Welcome to GPO Nexus',
    subtitle: 'Your AI-powered unified workspace',
    services: 'Services',
    groups: 'Active Groups',
    newGroup: 'Create New Group'
  },
  ar: {
    welcome: 'مرحباً بك في جي بي أو نيكسوس',
    subtitle: 'مساحة العمل الموحدة المدعومة بالذكاء الاصطناعي',
    services: 'الخدمات',
    groups: 'المجموعات النشطة',
    newGroup: 'إنشاء مجموعة جديدة'
  },
  fr: {
    welcome: 'Bienvenue à GPO Nexus',
    subtitle: 'Votre espace de travail unifié alimenté par IA',
    services: 'Services',
    groups: 'Groupes Actifs',
    newGroup: 'Créer un Nouveau Groupe'
  },
  es: {
    welcome: 'Bienvenido a GPO Nexus',
    subtitle: 'Tu espacio de trabajo unificado con IA',
    services: 'Servicios',
    groups: 'Grupos Activos',
    newGroup: 'Crear Nuevo Grupo'
  },
  zh: {
    welcome: '欢迎来到GPO Nexus',
    subtitle: '您的AI驱动统一工作空间',
    services: '服务',
    groups: '活跃群组',
    newGroup: '创建新群组'
  },
  hi: {
    welcome: 'GPO नेक्सस में आपका स्वागत है',
    subtitle: 'आपका AI-संचालित एकीकृत कार्यक्षेत्र',
    services: 'सेवाएं',
    groups: 'सक्रिय समूह',
    newGroup: 'नया समूह बनाएं'
  },
  ko: {
    welcome: 'GPO 넥서스에 오신 것을 환영합니다',
    subtitle: 'AI 기반 통합 워크스페이스',
    services: '서비스',
    groups: '활성 그룹',
    newGroup: '새 그룹 생성'
  },
  ja: {
    welcome: 'GPO Nexusへようこそ',
    subtitle: 'AI駆動の統合ワークスペース',
    services: 'サービス',
    groups: 'アクティブグループ',
    newGroup: '新しいグループを作成'
  }
};

export function useLanguage() {
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

  return { language, setLanguage: changeLanguage, t };
}
