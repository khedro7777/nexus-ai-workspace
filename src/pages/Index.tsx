
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
  Zap,
  Target,
  Award,
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
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('SA');
  const [selectedLanguage, setSelectedLanguage] = useState('ar');

  const stats = [
    {
      title: 'المجموعات النشطة',
      value: '2,847',
      icon: Users,
      color: 'bg-blue-500',
      change: '+18%'
    },
    {
      title: 'الشركات المشاركة',
      value: '1,589',
      icon: Building2,
      color: 'bg-green-500',
      change: '+12%'
    },
    {
      title: 'حجم التوفير',
      value: '₪8.4M',
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+35%'
    },
    {
      title: 'المعاملات الآمنة',
      value: '99.8%',
      icon: Shield,
      color: 'bg-orange-500',
      change: '+0.3%'
    }
  ];

  const gateways = [
    {
      id: 'cooperative-purchasing',
      title: 'مجموعات الشراء التعاوني',
      description: 'انضم لمجموعات الشراء الجماعي واحصل على أفضل الأسعار والشروط من خلال قوة التفاوض الجماعي',
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
      activeGroups: 387,
      status: 'تطلب أعضاء',
      route: '/cooperative-purchasing',
      features: ['توفير 25-40%', 'ضمان الجودة', 'شروط دفع مرنة', 'دعم فني متكامل'],
      requirements: 'شركات مسجلة',
      estimatedMembers: '15-50 عضو',
      averagePhase: 'مرحلة التفاوض'
    },
    {
      id: 'cooperative-marketing',
      title: 'مجموعات التسويق التعاوني',
      description: 'شارك في حملات تسويقية مشتركة لزيادة الوصول وتقليل التكاليف مع ضمان أفضل النتائج',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      activeGroups: 156,
      status: 'تطلب مستقلين',
      route: '/cooperative-marketing',
      features: ['تكلفة أقل 60%', 'وصول أوسع', 'نتائج مقيسة', 'حملات احترافية'],
      requirements: 'ميزانية تسويق 10K+',
      estimatedMembers: '8-25 عضو',
      averagePhase: 'مرحلة التخطيط'
    },
    {
      id: 'freelancers-individual',
      title: 'مجموعات المستقلين (فردي)',
      description: 'اعثر على مستقلين متخصصين لمشاريعك الفردية مع ضمان الجودة والالتزام بالمواعيد',
      icon: Laptop,
      color: 'from-purple-500 to-purple-600',
      activeGroups: 534,
      status: 'تطلب موردين',
      route: '/freelancers-individual',
      features: ['خبرة متخصصة', 'مرونة عالية', 'أسعار تنافسية', 'ضمان التسليم'],
      requirements: 'مشاريع فردية',
      estimatedMembers: '1-5 أعضاء',
      averagePhase: 'مرحلة التنفيذ'
    },
    {
      id: 'freelancers-group',
      title: 'مجموعات المستقلين (جماعي)',
      description: 'فرق متكاملة من المستقلين لمشاريع كبيرة ومعقدة مع إدارة مشاريع احترافية',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      activeGroups: 189,
      status: 'تطلب أعضاء',
      route: '/freelancers-group',
      features: ['فرق متكاملة', 'إدارة مشاريع', 'ضمان التسليم', 'دعم مستمر'],
      requirements: 'مشاريع متوسطة-كبيرة',
      estimatedMembers: '5-20 عضو',
      averagePhase: 'مرحلة التكوين'
    },
    {
      id: 'suppliers-individual',
      title: 'مجموعات الموردين (فردي)',
      description: 'تواصل مباشر مع موردين معتمدين للحصول على أفضل الأسعار والشروط',
      icon: Truck,
      color: 'from-orange-500 to-orange-600',
      activeGroups: 298,
      status: 'تطلب أعضاء',
      route: '/suppliers-individual',
      features: ['موردين معتمدين', 'أسعار مباشرة', 'شروط مرنة', 'ضمان الجودة'],
      requirements: 'طلبات فردية',
      estimatedMembers: '1-10 أعضاء',
      averagePhase: 'مرحلة التفاوض'
    },
    {
      id: 'suppliers-group',
      title: 'مجموعات الموردين (جماعي)',
      description: 'تحالفات موردين لمشاريع ضخمة مع ضمان التوريد المستمر والجودة العالية',
      icon: Factory,
      color: 'from-red-500 to-red-600',
      activeGroups: 87,
      status: 'تطلب موردين',
      route: '/suppliers-group',
      features: ['كميات ضخمة', 'تنوع المنتجات', 'ضمان التوريد', 'أسعار تفضيلية'],
      requirements: 'مشاريع ضخمة',
      estimatedMembers: '10-50 عضو',
      averagePhase: 'مرحلة التأهيل'
    },
    {
      id: 'company-formation-individual',
      title: 'تأسيس الشركات (فردي)',
      description: 'خدمات تأسيس الشركات والإجراءات القانونية مع استشارة قانونية شاملة',
      icon: Building2,
      color: 'from-teal-500 to-teal-600',
      activeGroups: 145,
      status: 'تطلب مستقلين',
      route: '/company-formation-individual',
      features: ['إجراءات سريعة', 'استشارة قانونية', 'متابعة كاملة', 'ضمان التأسيس'],
      requirements: 'أفراد ورجال أعمال',
      estimatedMembers: '1-5 أعضاء',
      averagePhase: 'مرحلة التأسيس'
    },
    {
      id: 'company-formation-group',
      title: 'تأسيس الشركات (جماعي)',
      description: 'تأسيس شركات مشتركة وشراكات استراتيجية مع إدارة مهنية متخصصة',
      icon: Briefcase,
      color: 'from-cyan-500 to-cyan-600',
      activeGroups: 63,
      status: 'تطلب أعضاء',
      route: '/company-formation-group',
      features: ['شراكات استراتيجية', 'رأس مال مشترك', 'إدارة مهنية', 'توزيع الأرباح'],
      requirements: 'شركاء متعددين',
      estimatedMembers: '2-10 شركاء',
      averagePhase: 'مرحلة التخطيط'
    },
    {
      id: 'arbitration',
      title: 'التحكيم والفصل في النزاعات (ORDA)',
      description: 'حل النزاعات التجارية عبر نظام ORDA مع محكمين معتمدين وأحكام ملزمة',
      icon: Gavel,
      color: 'from-amber-500 to-amber-600',
      activeGroups: 78,
      status: 'متاح الآن',
      route: '/arbitration',
      features: ['محكمين معتمدين', 'أحكام ملزمة', 'سرية تامة', 'تنفيذ سريع'],
      requirements: 'نزاعات تجارية',
      estimatedMembers: 'حسب القضية',
      averagePhase: 'مرحلة النظر'
    },
    {
      id: 'investment',
      title: 'الاستثمار للشركات',
      description: 'فرص استثمارية وتمويل للمشاريع الناشئة مع دراسات جدوى متكاملة',
      icon: Calculator,
      color: 'from-emerald-500 to-emerald-600',
      activeGroups: 124,
      status: 'تطلب مستثمرين',
      route: '/investment',
      features: ['فرص مربحة', 'دراسات جدوى', 'مخاطر محسوبة', 'عوائد مضمونة'],
      requirements: 'رأس مال استثماري',
      estimatedMembers: '3-15 مستثمر',
      averagePhase: 'مرحلة التقييم'
    },
    {
      id: 'service-providers',
      title: 'بوابة مقدمي الخدمات',
      description: 'خدمات الشحن والتخليص والخدمات المصرفية والخدمات اللوجستية المتكاملة',
      icon: Globe,
      color: 'from-violet-500 to-violet-600',
      activeGroups: 267,
      status: 'متاح الآن',
      route: '/service-providers',
      features: ['DHL Express', 'شحن بحري APL', 'تخليص جمركي', 'خدمات مصرفية'],
      requirements: 'احتياج خدمات',
      estimatedMembers: 'مفتوح للجميع',
      averagePhase: 'خدمات فورية'
    },
    {
      id: 'marketplace',
      title: 'بوابة السلع والمنتجات',
      description: 'عرض وشراء السلع المتنوعة من الأعضاء - ماكينات، أدوات، سلع رقمية وأكثر',
      icon: Package,
      color: 'from-rose-500 to-rose-600',
      activeGroups: 456,
      status: 'تطلب بائعين',
      route: '/marketplace',
      features: ['منتجات متنوعة', 'أسعار تنافسية', 'ضمان الجودة', 'توصيل سريع'],
      requirements: 'بائعين ومشترين',
      estimatedMembers: 'مفتوح للجميع',
      averagePhase: 'عروض نشطة'
    }
  ];

  const countries = [
    { code: 'SA', name: 'السعودية', flag: '🇸🇦' },
    { code: 'AE', name: 'الإمارات', flag: '🇦🇪' },
    { code: 'EG', name: 'مصر', flag: '🇪🇬' },
    { code: 'JO', name: 'الأردن', flag: '🇯🇴' },
    { code: 'KW', name: 'الكويت', flag: '🇰🇼' },
    { code: 'QA', name: 'قطر', flag: '🇶🇦' }
  ];

  const handleJoinGroup = (gatewayId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/${gatewayId}`);
  };

  const handleContactGroup = (gatewayId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/${gatewayId}/contact`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GPO Platform</h1>
                <p className="text-xs text-gray-500">منصة التفاوض التعاوني الذكية Web2.5</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              من نحن
            </Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              كيف نعمل
            </Link>
            <Link to="/support" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              الدعم
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              اتصل بنا
            </Link>
          </nav>

          {/* Controls Section */}
          <div className="flex items-center gap-4">
            {/* Country Selector */}
            <select 
              value={selectedCountry} 
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 transition-colors"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>

            {/* Language Selector */}
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 transition-colors"
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>

            {/* Auth Buttons */}
            {user ? (
              <Button onClick={() => navigate('/dashboard')} className="bg-blue-600 hover:bg-blue-700">
                لوحة التحكم
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigate('/auth')}>
                  تسجيل الدخول
                </Button>
                <Button onClick={() => navigate('/auth')} className="bg-blue-600 hover:bg-blue-700">
                  إنشاء حساب
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-20 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            منصة التفاوض التعاوني الذكية
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Web2.5 GPO Platform
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            انضم إلى ثورة التجارة التعاونية الذكية - كوّن فرق، تفاوض بذكاء، واحصل على أفضل النتائج
            من خلال قوة الذكاء الاصطناعي والتفاوض الجماعي
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {user ? (
              <>
                <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => navigate('/dashboard')}>
                  <span>لوحة التحكم</span>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 hover:bg-gray-50" onClick={() => navigate('/my-groups')}>
                  مجموعاتي
                </Button>
              </>
            ) : (
              <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 animate-pulse-glow" onClick={() => navigate('/auth')}>
                <span>ابدأ الآن مجاناً</span>
                <Zap className="w-5 h-5 mr-2" />
              </Button>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>أمان مضمون 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>لا رسوم خفية</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>دعم 24/7</span>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="pt-6">
                <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm mb-3">{stat.title}</p>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Gateways Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              اكتشف بواباتنا المتخصصة
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              اختر البوابة التي تناسب احتياجاتك واستفد من قوة التفاوض الجماعي والذكاء الاصطناعي
              لتحقيق أفضل النتائج والوفورات
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gateways.map((gateway) => (
              <Card key={gateway.id} className="hover:shadow-2xl transition-all duration-500 hover:scale-105 group border-0 shadow-lg overflow-hidden bg-white">
                <div className={`h-2 bg-gradient-to-r ${gateway.color}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${gateway.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <gateway.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-left">
                      <Badge 
                        variant={gateway.status === 'متاح الآن' ? 'default' : gateway.status === 'تطلب أعضاء' ? 'secondary' : 'outline'}
                        className="text-xs mb-2"
                      >
                        {gateway.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{gateway.activeGroups} مجموعة</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight mb-2">{gateway.title}</CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {gateway.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Key Features */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm text-gray-800">المزايا الرئيسية:</h4>
                    <div className="flex flex-wrap gap-1">
                      {gateway.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span>المتطلبات:</span>
                      <span className="font-medium">{gateway.requirements}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>حجم المجموعة:</span>
                      <span className="font-medium">{gateway.estimatedMembers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>المرحلة الشائعة:</span>
                      <span className="font-medium">{gateway.averagePhase}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      onClick={() => handleJoinGroup(gateway.id)}
                    >
                      <UserPlus className="w-4 h-4 ml-1" />
                      استكشف المجموعات
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleContactGroup(gateway.id)}
                      className="hover:bg-gray-50"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            لماذا تختار منصة GPO؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'قوة التفاوض الجماعي',
                description: 'احصل على أسعار أفضل بنسبة تصل إلى 40% من خلال التفاوض مع آخرين',
                color: 'from-yellow-400 to-orange-500'
              },
              {
                icon: Target,
                title: 'استهداف دقيق بالذكاء الاصطناعي',
                description: 'نظام MCP يحلل احتياجاتك ويجد المجموعات الأنسب لك تلقائياً',
                color: 'from-green-400 to-blue-500'
              },
              {
                icon: Award,
                title: 'شركاء موثوقون ومعتمدون',
                description: 'تعامل مع موردين ومستقلين معتمدين مع ضمان الجودة والالتزام',
                color: 'from-purple-400 to-pink-500'
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 shadow-lg">
                <CardHeader>
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        {!user && (
          <div className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                هل أنت مستعد للانضمام؟
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                ابدأ رحلتك في التفاوض التعاوني الذكي اليوم واستفد من قوة المجتمع والذكاء الاصطناعي
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100" onClick={() => navigate('/auth')}>
                  إنشاء حساب مجاني
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-600" onClick={() => navigate('/auth')}>
                  تسجيل الدخول
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">GPO Platform</h3>
                  <p className="text-sm text-gray-400">Web2.5 Smart Platform</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                منصة التفاوض التعاوني الذكية الرائدة في الشرق الأوسط
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">من نحن</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">كيف نعمل</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">الأسعار</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">الأسئلة الشائعة</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">البوابات</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/cooperative-purchasing" className="hover:text-white transition-colors">الشراء التعاوني</Link></li>
                <li><Link to="/cooperative-marketing" className="hover:text-white transition-colors">التسويق التعاوني</Link></li>
                <li><Link to="/freelancers-individual" className="hover:text-white transition-colors">المستقلين</Link></li>
                <li><Link to="/arbitration" className="hover:text-white transition-colors">التحكيم ORDA</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">تواصل معنا</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@gpo-platform.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+966 50 123 4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>الرياض، السعودية</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 GPO Platform. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
