
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Brain, 
  Users, 
  Building2, 
  TrendingUp, 
  Shield, 
  Zap,
  Globe,
  Search,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Award,
  Target,
  Rocket
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
import Footer from '@/components/home/Footer';

const Index = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const features = [
    {
      icon: Brain,
      titleKey: 'aiAssistant',
      description: language === 'ar' 
        ? 'مساعد ذكي متطور لتحسين عمليات الأعمال وإدارة المشاريع بكفاءة عالية'
        : 'Advanced AI assistant to optimize business operations and project management',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      titleKey: 'groups',
      description: language === 'ar'
        ? 'إنشاء وإدارة فرق العمل التعاونية مع أدوات متطورة للتواصل والإنتاجية'
        : 'Create and manage collaborative teams with advanced communication tools',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Building2,
      titleKey: 'companyFormation',
      description: language === 'ar'
        ? 'خدمات تأسيس الشركات مع الامتثال القانوني والإجراءات المبسطة'
        : 'Company formation services with legal compliance and streamlined processes',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      titleKey: 'analytics',
      description: language === 'ar'
        ? 'تحليلات متقدمة ورؤى ذكية لاتخاذ قرارات أعمال مدروسة'
        : 'Advanced analytics and smart insights for informed business decisions',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      titleKey: 'governance',
      description: language === 'ar'
        ? 'حوكمة متطورة وإدارة المخاطر مع أنظمة الأمان المتقدمة'
        : 'Advanced governance and risk management with cutting-edge security',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Zap,
      titleKey: 'automation',
      description: language === 'ar'
        ? 'أتمتة العمليات التجارية لزيادة الكفاءة وتقليل الأخطاء'
        : 'Business process automation to increase efficiency and reduce errors',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  const stats = [
    { number: '10K+', label: language === 'ar' ? 'مستخدم نشط' : 'Active Users' },
    { number: '500+', label: language === 'ar' ? 'شركة' : 'Companies' },
    { number: '50+', label: language === 'ar' ? 'دولة' : 'Countries' },
    { number: '99.9%', label: language === 'ar' ? 'وقت التشغيل' : 'Uptime' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechCorp',
      content: 'GPO Nexus transformed our business operations completely. The AI assistant is incredible!',
      rating: 5
    },
    {
      name: 'Ahmed Al-Rashid',
      role: 'Founder, Digital Solutions',
      content: 'منصة رائعة ساعدتنا في تنظيم عملياتنا وزيادة الإنتاجية بشكل ملحوظ',
      rating: 5
    },
    {
      name: 'Maria Garcia',
      role: 'Project Manager',
      content: 'The collaboration tools are top-notch. Our team productivity increased by 300%!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <EnhancedHeader />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2 text-sm font-medium">
              {language === 'ar' ? '🚀 الجيل الجديد من منصات الأعمال' : '🚀 Next-Gen Business Platform'}
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              {t('welcome')}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder={language === 'ar' ? 'ابحث عن الخدمات والحلول...' : 'Search for services and solutions...'}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              {!user ? (
                <>
                  <Button 
                    size="lg"
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    {t('createAccount')} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={() => navigate('/auth')}
                    className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg font-semibold rounded-2xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
                  >
                    <Play className="mr-2 w-5 h-5" />
                    {language === 'ar' ? 'مشاهدة العرض التوضيحي' : 'Watch Demo'}
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    size="lg"
                    onClick={() => navigate('/dashboard')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    {t('dashboard')} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={() => navigate('/create-group')}
                    className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg font-semibold rounded-2xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
                  >
                    <Users className="mr-2 w-5 h-5" />
                    {t('createGroup')}
                  </Button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">
              {language === 'ar' ? '✨ الميزات الرئيسية' : '✨ Key Features'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {language === 'ar' ? 'حلول متطورة لأعمالك' : 'Advanced Solutions for Your Business'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'اكتشف مجموعة شاملة من الأدوات والخدمات المصممة لتسريع نمو أعمالك'
                : 'Discover a comprehensive suite of tools and services designed to accelerate your business growth'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {t(feature.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 border-0">
              {language === 'ar' ? '💬 آراء العملاء' : '💬 Customer Reviews'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {language === 'ar' ? 'ما يقوله عملاؤنا' : 'What Our Clients Say'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'ar' ? 'ابدأ رحلتك اليوم' : 'Start Your Journey Today'}
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'انضم إلى آلاف الشركات التي تثق بنا لتطوير أعمالها'
              : 'Join thousands of companies that trust us to grow their business'
            }
          </p>
          <Button 
            size="lg"
            variant="secondary"
            onClick={() => navigate(user ? '/dashboard' : '/auth')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Rocket className="mr-2 w-5 h-5" />
            {user ? t('dashboard') : t('createAccount')}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
