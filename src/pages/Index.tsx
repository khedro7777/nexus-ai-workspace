
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  User,
  MessageSquare,
  UserPlus,
  Clock,
  CheckCircle,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('SA');
  const [selectedLanguage, setSelectedLanguage] = useState('ar');
  const [selectedCurrency, setSelectedCurrency] = useState('SAR');

  const stats = [
    { title: 'المجموعات النشطة', value: '2,847', icon: Users, color: 'bg-blue-500', change: '+18%' },
    { title: 'الشركات المشاركة', value: '1,589', icon: Building2, color: 'bg-green-500', change: '+12%' },
    { title: 'حجم التوفير', value: '8.4M', icon: TrendingUp, color: 'bg-purple-500', change: '+35%' },
    { title: 'المعاملات الآمنة', value: '99.8%', icon: Shield, color: 'bg-orange-500', change: '+0.3%' }
  ];

  const portals = [
    {
      id: 'cooperative-purchasing',
      title: 'الشراء التعاوني',
      description: 'انضم لمجموعات الشراء الجماعي للحصول على أفضل الأسعار',
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
      activeGroups: 387,
      status: 'تطلب أعضاء',
      requiresKYC: true,
      requiresPoints: true,
      requiresMCP: false
    },
    {
      id: 'cooperative-marketing',
      title: 'التسويق التعاوني',
      description: 'شارك في حملات تسويقية مشتركة لزيادة الوصول',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      activeGroups: 156,
      status: 'نشط',
      requiresKYC: true,
      requiresPoints: true,
      requiresMCP: false
    },
    {
      id: 'company-formation',
      title: 'تأسيس الشركات',
      description: 'خدمات تأسيس الشركات والإجراءات القانونية',
      icon: Building2,
      color: 'from-teal-500 to-teal-600',
      activeGroups: 145,
      status: 'متاح',
      requiresKYC: false,
      requiresPoints: false,
      requiresMCP: false
    },
    {
      id: 'investment-groups',
      title: 'مجموعات الاستثمار',
      description: 'فرص استثمارية وتمويل للمشاريع الناشئة',
      icon: Calculator,
      color: 'from-emerald-500 to-emerald-600',
      activeGroups: 124,
      status: 'تطلب مستثمرين',
      requiresKYC: true,
      requiresPoints: true,
      requiresMCP: false
    },
    {
      id: 'suppliers',
      title: 'الموردين',
      description: 'تواصل مع موردين معتمدين للحصول على أفضل الأسعار',
      icon: Truck,
      color: 'from-orange-500 to-orange-600',
      activeGroups: 298,
      status: 'تطلب موردين',
      requiresKYC: true,
      requiresPoints: true,
      requiresMCP: false
    },
    {
      id: 'freelancers',
      title: 'المستقلين',
      description: 'اعثر على مستقلين متخصصين لمشاريعك',
      icon: User,
      color: 'from-purple-500 to-purple-600',
      activeGroups: 534,
      status: 'نشط',
      requiresKYC: false,
      requiresPoints: false,
      requiresMCP: true
    },
    {
      id: 'freelancer-groups',
      title: 'مجموعات المستقلين',
      description: 'فرق متكاملة من المستقلين لمشاريع كبيرة',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      activeGroups: 189,
      status: 'تطلب فرق',
      requiresKYC: false,
      requiresPoints: false,
      requiresMCP: true
    },
    {
      id: 'service-providers',
      title: 'مقدمو الخدمات',
      description: 'خدمات متنوعة من شحن وتخليص وخدمات مصرفية',
      icon: Globe,
      color: 'from-cyan-500 to-cyan-600',
      activeGroups: 267,
      status: 'متاح',
      requiresKYC: false,
      requiresPoints: false,
      requiresMCP: false
    },
    {
      id: 'product-listings',
      title: 'عرض المنتجات',
      description: 'عرض وشراء السلع المتنوعة من الأعضاء',
      icon: Package,
      color: 'from-rose-500 to-rose-600',
      activeGroups: 456,
      status: 'تطلب بائعين',
      requiresKYC: false,
      requiresPoints: false,
      requiresMCP: false
    },
    {
      id: 'arbitration-documentation',
      title: 'التحكيم والتوثيق',
      description: 'حل النزاعات التجارية عبر نظام ORDA',
      icon: Gavel,
      color: 'from-amber-500 to-amber-600',
      activeGroups: 78,
      status: 'متاح',
      requiresKYC: false,
      requiresPoints: false,
      requiresMCP: false
    },
    {
      id: 'arbitration-requests',
      title: 'طلبات التحكيم',
      description: 'تقديم طلبات التحكيم والمتابعة',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      activeGroups: 45,
      status: 'متاح',
      requiresKYC: false,
      requiresPoints: false,
      requiresMCP: false
    },
    {
      id: 'smart-negotiation',
      title: 'حلول التفاوض الذكية',
      description: 'أدوات تفاوض ذكية بالذكاء الاصطناعي',
      icon: Zap,
      color: 'from-violet-500 to-violet-600',
      activeGroups: 89,
      status: 'جديد',
      requiresKYC: false,
      requiresPoints: false,
      requiresMCP: false
    }
  ];

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'cn', name: '中文', flag: '🇨🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'jp', name: '日本語', flag: '🇯🇵' },
    { code: 'kr', name: '한국어', flag: '🇰🇷' }
  ];

  const countries = [
    { code: 'SA', name: 'السعودية', flag: '🇸🇦' },
    { code: 'AE', name: 'الإمارات', flag: '🇦🇪' },
    { code: 'EG', name: 'مصر', flag: '🇪🇬' },
    { code: 'JO', name: 'الأردن', flag: '🇯🇴' },
    { code: 'KW', name: 'الكويت', flag: '🇰🇼' },
    { code: 'QA', name: 'قطر', flag: '🇶🇦' }
  ];

  const currencies = [
    { code: 'SAR', name: 'ريال سعودي', symbol: '﷼' },
    { code: 'AED', name: 'درهم إماراتي', symbol: 'د.إ' },
    { code: 'EGP', name: 'جنيه مصري', symbol: 'ج.م' },
    { code: 'USD', name: 'دولار أمريكي', symbol: '$' }
  ];

  const handlePortalClick = (portalId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/gateway/${portalId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GPO WORLD</h1>
              <p className="text-xs text-gray-500">منصة التفاوض التعاوني الذكية</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">من نحن</Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">كيف نعمل</Link>
            <Link to="/support" className="text-gray-600 hover:text-blue-600 transition-colors">الدعم</Link>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-2 py-1 border border-gray-200 rounded text-sm bg-white"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>

            {/* Country Selector */}
            <select 
              value={selectedCountry} 
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-2 py-1 border border-gray-200 rounded text-sm bg-white"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>

            {/* Currency Selector */}
            <select 
              value={selectedCurrency} 
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="px-2 py-1 border border-gray-200 rounded text-sm bg-white"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.name}
                </option>
              ))}
            </select>

            {/* Local Time */}
            <div className="text-sm text-gray-600 hidden lg:block">
              <Clock className="w-4 h-4 inline ml-1" />
              {new Date().toLocaleTimeString('ar-SA')}
            </div>

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
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            منصة التفاوض التعاوني الذكية
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              GPO WORLD Platform
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            كوّن مجموعات، تفاوض بذكاء، واحصل على أفضل النتائج من خلال قوة الذكاء الاصطناعي والتفاوض الجماعي
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {user ? (
              <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => navigate('/dashboard')}>
                <span>لوحة التحكم</span>
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            ) : (
              <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => navigate('/auth')}>
                <span>ابدأ الآن</span>
                <Zap className="w-5 h-5 mr-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-500 hover:scale-105">
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

        {/* Main Portals Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">البوابات الرئيسية</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              اختر البوابة التي تناسب احتياجاتك واستفد من قوة التفاوض الجماعي
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portals.map((portal) => (
              <Card key={portal.id} className="hover:shadow-2xl transition-all duration-500 hover:scale-105 group cursor-pointer" onClick={() => handlePortalClick(portal.id)}>
                <div className={`h-2 bg-gradient-to-r ${portal.color}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${portal.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <portal.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-left">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {portal.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{portal.activeGroups}</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight mb-2">{portal.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {portal.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Requirements */}
                  <div className="flex flex-wrap gap-1">
                    {portal.requiresKYC && (
                      <Badge variant="outline" className="text-xs">
                        <Shield className="w-3 h-3 ml-1" />
                        KYC مطلوب
                      </Badge>
                    )}
                    {portal.requiresPoints && (
                      <Badge variant="outline" className="text-xs">
                        <Coins className="w-3 h-3 ml-1" />
                        نقاط مطلوبة
                      </Badge>
                    )}
                    {portal.requiresMCP && (
                      <Badge variant="outline" className="text-xs">
                        <Target className="w-3 h-3 ml-1" />
                        اختبار MCP
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1" onClick={(e) => { e.stopPropagation(); handlePortalClick(portal.id); }}>
                      <UserPlus className="w-4 h-4 ml-1" />
                      انضم
                    </Button>
                    <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); }}>
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg">GPO WORLD</h3>
              </div>
              <p className="text-gray-400 text-sm">
                منصة التفاوض التعاوني الذكية الرائدة عالمياً
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">من نحن</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">كيف نعمل</Link></li>
                <li><Link to="/support" className="hover:text-white transition-colors">الدعم</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">السياسات</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">شروط الاستخدام</Link></li>
                <li><Link to="/sitemap" className="hover:text-white transition-colors">خريطة الموقع</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">تواصل معنا</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@gpo-world.com</span>
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
            <p>&copy; 2024 GPO WORLD. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
