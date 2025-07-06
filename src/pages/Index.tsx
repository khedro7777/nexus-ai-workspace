
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Shield,
  ArrowLeft,
  Star,
  ChevronRight,
  Zap,
  Target,
  Award,
  Home,
  ArrowRight,
  Settings,
  User,
  ShoppingBag,
  Coins,
  Store,
  Truck,
  Factory,
  Briefcase,
  Globe,
  Package,
  Gavel,
  Calculator,
  Ship,
  Plane,
  CreditCard,
  Laptop,
  Wrench,
  MessageSquare,
  Mail,
  UserPlus
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'المجموعات النشطة',
      value: '1,247',
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'الشركات المشاركة',
      value: '589',
      icon: Building2,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'حجم التوفير',
      value: '₪2.4M',
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+23%'
    },
    {
      title: 'المعاملات الآمنة',
      value: '99.9%',
      icon: Shield,
      color: 'bg-orange-500',
      change: '+0.1%'
    }
  ];

  const gateways = [
    {
      id: 'purchasing',
      title: 'مجموعات الشراء التعاوني',
      description: 'انضم لمجموعات الشراء الجماعي واحصل على أفضل الأسعار',
      icon: ShoppingBag,
      color: 'bg-blue-500',
      activeGroups: 156,
      status: 'تطلب أعضاء',
      route: '/cooperative-purchasing',
      features: ['أسعار أفضل', 'كميات أكبر', 'ضمان الجودة']
    },
    {
      id: 'marketing',
      title: 'مجموعات التسويق التعاوني',
      description: 'شارك في حملات تسويقية مشتركة لزيادة الوصول',
      icon: TrendingUp,
      color: 'bg-green-500',
      activeGroups: 89,
      status: 'تطلب مستقلين',
      route: '/cooperative-marketing',
      features: ['تكلفة أقل', 'وصول أوسع', 'نتائج أفضل']
    },
    {
      id: 'freelancers-individual',
      title: 'مجموعات المستقلين (فردي)',
      description: 'اعثر على مستقلين متخصصين لمشاريعك الفردية',
      icon: User,
      color: 'bg-purple-500',
      activeGroups: 234,
      status: 'تطلب موردين',
      route: '/freelancers-individual',
      features: ['خبرة متخصصة', 'مرونة عالية', 'أسعار تنافسية']
    },
    {
      id: 'freelancers-group',
      title: 'مجموعات المستقلين (جماعي)',
      description: 'فرق من المستقلين لمشاريع كبيرة ومعقدة',
      icon: Users,
      color: 'bg-indigo-500',
      activeGroups: 67,
      status: 'تطلب أعضاء',
      route: '/freelancers-group',
      features: ['فرق متكاملة', 'إدارة مشاريع', 'ضمان التسليم']
    },
    {
      id: 'suppliers-individual',
      title: 'مجموعات الموردين (فردي)',
      description: 'تواصل مباشر مع موردين معتمدين',
      icon: Truck,
      color: 'bg-orange-500',
      activeGroups: 123,
      status: 'تطلب أعضاء',
      route: '/suppliers-individual',
      features: ['موردين معتمدين', 'أسعار مباشرة', 'شروط مرنة']
    },
    {
      id: 'suppliers-group',
      title: 'مجموعات الموردين (جماعي)',
      description: 'تحالفات موردين لمشاريع ضخمة',
      icon: Factory,
      color: 'bg-red-500',
      activeGroups: 45,
      status: 'تطلب موردين',
      route: '/suppliers-group',
      features: ['كميات ضخمة', 'تنوع المنتجات', 'ضمان التوريد']
    },
    {
      id: 'company-formation-individual',
      title: 'تأسيس الشركات (فردي)',
      description: 'خدمات تأسيس الشركات والإجراءات القانونية',
      icon: Building2,
      color: 'bg-teal-500',
      activeGroups: 78,
      status: 'تطلب مستقلين',
      route: '/company-formation-individual',
      features: ['إجراءات سريعة', 'استشارة قانونية', 'متابعة كاملة']
    },
    {
      id: 'company-formation-group',
      title: 'تأسيس الشركات (جماعي)',
      description: 'تأسيس شركات مشتركة وشراكات استراتيجية',
      icon: Briefcase,
      color: 'bg-cyan-500',
      activeGroups: 23,
      status: 'تطلب أعضاء',
      route: '/company-formation-group',
      features: ['شراكات استراتيجية', 'رأس مال مشترك', 'إدارة مهنية']
    },
    {
      id: 'arbitration',
      title: 'التحكيم والفصل في النزاعات',
      description: 'حل النزاعات التجارية عبر نظام ORDA',
      icon: Gavel,
      color: 'bg-amber-500',
      activeGroups: 34,
      status: 'متاح الآن',
      route: '/arbitration',
      features: ['محكمين معتمدين', 'أحكام ملزمة', 'سرية تامة']
    },
    {
      id: 'investment',
      title: 'الاستثمار للشركات',
      description: 'فرص استثمارية وتمويل للمشاريع الناشئة',
      icon: Calculator,
      color: 'bg-emerald-500',
      activeGroups: 56,
      status: 'تطلب مستثمرين',
      route: '/investment',
      features: ['فرص مربحة', 'دراسات جدوى', 'مخاطر محسوبة']
    },
    {
      id: 'service-providers',
      title: 'بوابة مقدمي الخدمات',
      description: 'خدمات الشحن والتخليص والخدمات المصرفية',
      icon: Globe,
      color: 'bg-violet-500',
      activeGroups: 145,
      status: 'متاح الآن',
      route: '/service-providers',
      features: ['DHL', 'شحن بحري', 'تخليص جمركي']
    },
    {
      id: 'marketplace',
      title: 'بوابة السلع والمنتجات',
      description: 'عرض وشراء السلع المتنوعة من الأعضاء',
      icon: Package,
      color: 'bg-rose-500',
      activeGroups: 289,
      status: 'تطلب بائعين',
      route: '/marketplace',
      features: ['منتجات متنوعة', 'أسعار تنافسية', 'ضمان الجودة']
    }
  ];

  const handleJoinGroup = (gatewayId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/gateway/${gatewayId}`);
  };

  const handleContactGroup = (gatewayId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    // إرسال رسالة لصندوق الوارد في غرفة المجموعة
    navigate(`/gateway/${gatewayId}/contact`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GPO Platform</h1>
                <p className="text-xs text-gray-500">منصة التفاوض التعاوني الذكية</p>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              من نحن
            </Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              كيف نعمل
            </Link>
            <Link to="/support" className="text-gray-600 hover:text-gray-900 transition-colors">
              الدعم
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <select className="px-3 py-1 border rounded-md text-sm">
              <option value="sa">🇸🇦 السعودية</option>
              <option value="ae">🇦🇪 الإمارات</option>
              <option value="eg">🇪🇬 مصر</option>
            </select>
            <select className="px-3 py-1 border rounded-md text-sm">
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
            {user ? (
              <Button onClick={() => navigate('/dashboard')}>
                لوحة التحكم
              </Button>
            ) : (
              <Button onClick={() => navigate('/auth')}>
                تسجيل الدخول
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            منصة التفاوض التعاوني
            <span className="block text-blue-600">الذكية Web2.5</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            انضم إلى ثورة التجارة التعاونية الذكية - فرق، تفاوض، واحصل على أفضل النتائج
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <>
                <Button size="lg" className="px-8 py-3" onClick={() => navigate('/dashboard')}>
                  <span>لوحة التحكم</span>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-3" onClick={() => navigate('/my-groups')}>
                  مجموعاتي
                </Button>
              </>
            ) : (
              <Button size="lg" className="px-8 py-3 animate-pulse-glow" onClick={() => navigate('/auth')}>
                <span>ابدأ الآن</span>
                <Zap className="w-5 h-5 mr-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="pt-6">
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                <Badge variant="outline" className="text-green-600">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Gateways Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              اكتشف بواباتنا المتخصصة
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اختر البوابة التي تناسب احتياجاتك واستفد من قوة التفاوض الجماعي
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gateways.map((gateway) => (
              <Card key={gateway.id} className="hover:shadow-xl transition-all duration-300 hover:scale-102 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${gateway.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <gateway.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <Badge 
                        variant={gateway.status === 'متاح الآن' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {gateway.status}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">
                        {gateway.activeGroups} مجموعة نشطة
                      </p>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{gateway.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {gateway.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {gateway.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleJoinGroup(gateway.id)}
                    >
                      <UserPlus className="w-4 h-4 ml-1" />
                      انضم للمجموعة
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleContactGroup(gateway.id)}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            لماذا تختار منصتنا؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'قوة التفاوض الجماعي',
                description: 'احصل على أسعار أفضل من خلال التفاوض مع آخرين'
              },
              {
                icon: Target,
                title: 'استهداف دقيق',
                description: 'ابحث عن المجموعات التي تناسب احتياجاتك بالضبط'
              },
              {
                icon: Award,
                title: 'شركاء موثوقون',
                description: 'تعامل مع موردين ومستقلين معتمدين فقط'
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              هل أنت مستعد للانضمام؟
            </h2>
            <p className="text-xl mb-8 opacity-90">
              ابدأ رحلتك في التفاوض التعاوني الذكي اليوم
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-3" onClick={() => navigate('/auth')}>
                إنشاء حساب مجاني
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600" onClick={() => navigate('/auth')}>
                تسجيل الدخول
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
