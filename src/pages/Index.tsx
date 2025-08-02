import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Users, 
  TrendingUp, 
  Shield, 
  Globe, 
  Zap, 
  Brain, 
  Building2, 
  ShoppingCart, 
  Briefcase, 
  UserCheck, 
  Star,
  Menu,
  X,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = (action: string) => {
    if (!user) {
      navigate('/auth');
    } else {
      if (action === 'dashboard') {
        navigate('/dashboard');
      }
    }
  };

  const groupTypes = [
    {
      id: 'buying',
      title: 'الشراء التعاوني',
      description: 'انضم لمجموعات الشراء للحصول على أفضل الأسعار',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      activeGroups: 12,
      requirements: ['KYC مطلوب', 'نقاط مطلوبة']
    },
    {
      id: 'marketing',
      title: 'التسويق التعاوني',
      description: 'تعاون في الحملات التسويقية لتقليل التكاليف',
      icon: TrendingUp,
      color: 'bg-green-500',
      activeGroups: 8,
      requirements: ['KYC مطلوب', 'نقاط مطلوبة']
    },
    {
      id: 'investment',
      title: 'مجموعات الاستثمار',
      description: 'استثمر مع آخرين في مشاريع واعدة',
      icon: TrendingUp,
      color: 'bg-purple-500',
      activeGroups: 15,
      requirements: ['KYC مطلوب', 'نقاط مطلوبة']
    },
    {
      id: 'freelance',
      title: 'المستقلين',
      description: 'اعثر على أفضل المواهب المستقلة',
      icon: UserCheck,
      color: 'bg-orange-500',
      activeGroups: 25,
      requirements: ['اختبار MCP']
    },
    {
      id: 'suppliers',
      title: 'الموردين',
      description: 'اعثر على موردين معتمدين وموثوقين',
      icon: Building2,
      color: 'bg-indigo-500',
      activeGroups: 18,
      requirements: ['KYC مطلوب', 'نقاط مطلوبة']
    },
    {
      id: 'services',
      title: 'مقدمي الخدمات',
      description: 'اعثر على مقدمي الخدمات المحترفين',
      icon: Briefcase,
      color: 'bg-teal-500',
      activeGroups: 22,
      requirements: ['شهادات مطلوبة']
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'مساعد AI ذكي',
      description: 'مساعدون ذكيون للترجمة والتحليل والتحكيم'
    },
    {
      icon: Shield,
      title: 'أمان مضمون',
      description: 'معاملات آمنة مع ضمان حماية الأموال'
    },
    {
      icon: Globe,
      title: 'شبكة عالمية',
      description: 'اتصل مع شركاء من جميع أنحاء العالم'
    },
    {
      icon: Zap,
      title: 'أتمتة العمليات',
      description: 'أتمتة المهام والعمليات التجارية'
    }
  ];

  const stats = [
    { label: 'المجموعات النشطة', value: '1,247', change: '+12%' },
    { label: 'الشركات المشاركة', value: '589', change: '+8%' },
    { label: 'حجم التوفير', value: '₪2.4M', change: '+23%' },
    { label: 'المعاملات الآمنة', value: '99.9%', change: '+0.1%' }
  ];

  const activeGroups = [
    {
      id: 1,
      name: 'مجموعة شراء الأجهزة الإلكترونية',
      type: 'شراء تعاوني',
      members: 45,
      maxMembers: 50,
      progress: 90,
      image: '/placeholder.svg',
      description: 'شراء جماعي للأجهزة الإلكترونية بأسعار مخفضة'
    },
    {
      id: 2,
      name: 'استثمار في العقارات التجارية',
      type: 'استثمار',
      members: 28,
      maxMembers: 30,
      progress: 93,
      image: '/placeholder.svg',
      description: 'استثمار جماعي في العقارات التجارية المربحة'
    },
    {
      id: 3,
      name: 'مجموعة تطوير التطبيقات',
      type: 'مستقلين',
      members: 15,
      maxMembers: 20,
      progress: 75,
      image: '/placeholder.svg',
      description: 'فريق من المطورين المستقلين لتطوير التطبيقات'
    },
    {
      id: 4,
      name: 'شراء المواد الخام للصناعة',
      type: 'شراء تعاوني',
      members: 35,
      maxMembers: 40,
      progress: 87,
      image: '/placeholder.svg',
      description: 'شراء جماعي للمواد الخام الصناعية'
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🧠</span>
                </div>
                <div className="mr-3">
                  <h1 className="text-xl font-bold text-gray-900">GPODO</h1>
                  <p className="text-xs text-gray-500">Smart Collaborative Platform</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">الرئيسية</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">حول المنصة</Link>
              <Link to="/user-guide" className="text-gray-700 hover:text-blue-600 font-medium">دليل المستخدم</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">اتصل بنا</Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              {user ? (
                <div className="flex items-center space-x-4 space-x-reverse">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/dashboard')}
                  >
                    <User className="h-4 w-4 ml-2" />
                    لوحة التحكم
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 ml-2" />
                    تسجيل الخروج
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/auth')}
                  >
                    تسجيل الدخول
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/auth')}
                  >
                    إنشاء حساب
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">الرئيسية</Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">حول المنصة</Link>
                <Link to="/user-guide" className="text-gray-700 hover:text-blue-600 font-medium">دليل المستخدم</Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">اتصل بنا</Link>
                {user ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/dashboard')}
                      className="w-full"
                    >
                      لوحة التحكم
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={logout}
                      className="w-full"
                    >
                      تسجيل الخروج
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/auth')}
                      className="w-full"
                    >
                      تسجيل الدخول
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => navigate('/auth')}
                      className="w-full"
                    >
                      إنشاء حساب
                    </Button>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <Badge className="bg-blue-500 text-white px-4 py-2 text-sm font-medium">
                🧠 GPODO – Smart Collaborative Platform
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              منصة التعاون الذكي
              <br />
              <span className="text-blue-200">والشراء الجماعي</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              انضم إلى آلاف الشركات والأفراد في الحصول على أفضل الأسعار من خلال القوة الشرائية الجماعية. 
              منصة متكاملة للتجارة والاستثمار والتعاون التجاري مع حلول ذكية مدعومة بالذكاء الاصطناعي.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
                onClick={() => handleAuthAction('start')}
              >
                ابدأ الآن
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold"
                onClick={() => handleAuthAction('login')}
              >
                {user ? 'لوحة التحكم' : 'تسجيل الدخول'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">ابحث عن المجموعة المناسبة لك</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="ابحث عن مجموعة..." className="pr-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="نوع المجموعة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buying">الشراء التعاوني</SelectItem>
                  <SelectItem value="marketing">التسويق التعاوني</SelectItem>
                  <SelectItem value="investment">الاستثمار</SelectItem>
                  <SelectItem value="freelance">المستقلين</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="المنطقة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">عالمي</SelectItem>
                  <SelectItem value="mena">الشرق الأوسط</SelectItem>
                  <SelectItem value="gcc">دول الخليج</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="ml-2 h-4 w-4" />
                بحث
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 mb-1">{stat.label}</div>
                  <div className="text-green-500 text-sm font-medium">{stat.change}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Groups Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">المجموعات النشطة</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              اكتشف المجموعات النشطة وانضم إليها للاستفادة من العروض والفرص المتاحة
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{group.type}</Badge>
                      <span className="text-sm text-gray-500">{group.members}/{group.maxMembers} عضو</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${group.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        size="sm"
                        onClick={() => handleAuthAction('join')}
                      >
                        {user ? 'عرض المجموعة' : 'انضم الآن'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">لماذا تختار GPODO؟</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نوفر لك أدوات ومميزات متقدمة تساعدك على تحقيق أهدافك التجارية بكفاءة عالية
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Group Types Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">بواباتنا الرئيسية</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              اختر البوابة التي تناسب احتياجاتك وانضم إلى المجموعات النشطة أو أنشئ مجموعتك الخاصة
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center`}>
                      <type.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary">{type.activeGroups} مجموعة نشطة</Badge>
                  </div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {type.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        size="sm"
                        onClick={() => handleAuthAction('portal')}
                      >
                        {user ? 'دخول البوابة' : 'تسجيل للدخول'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAuthAction('create')}
                      >
                        {user ? 'إنشاء مجموعة' : 'تسجيل للإنشاء'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">هل أنت مستعد للانضمام لمجتمعنا؟</h2>
          <p className="text-xl mb-8 text-blue-100">
            انضم إلى آلاف المستخدمين واحصل على أفضل الأسعار والفرص التجارية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3"
              onClick={() => handleAuthAction('register')}
            >
              إنشاء حساب مجاني
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              onClick={() => handleAuthAction('login')}
            >
              {user ? 'لوحة التحكم' : 'تسجيل الدخول'}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🧠</span>
                </div>
                <div className="mr-3">
                  <h3 className="text-xl font-bold">GPODO</h3>
                  <p className="text-sm text-gray-400">Smart Collaborative Platform</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                منصة التعاون الذكي والشراء الجماعي التي تربط الشركات والأفراد للحصول على أفضل الأسعار والفرص التجارية.
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">حول المنصة</Link></li>
                <li><Link to="/user-guide" className="text-gray-400 hover:text-white">دليل المستخدم</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">سياسة الخصوصية</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">شروط الاستخدام</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">خدماتنا</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400">الشراء التعاوني</span></li>
                <li><span className="text-gray-400">التسويق التعاوني</span></li>
                <li><span className="text-gray-400">مجموعات الاستثمار</span></li>
                <li><span className="text-gray-400">خدمات المستقلين</span></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 ml-3" />
                  <span className="text-gray-400">info@gpodo.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 ml-3" />
                  <span className="text-gray-400">+966 50 123 4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 ml-3" />
                  <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
                </div>
              </div>
            </div>
          </div>

          {/* Founder Message */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3">رسالة المؤسس</h4>
              <p className="text-gray-300 leading-relaxed">
                "نؤمن في GPODO بقوة التعاون والشراكة في تحقيق النجاح. منصتنا تهدف إلى ربط الشركات والأفراد 
                لتحقيق أهدافهم المشتركة من خلال القوة الشرائية الجماعية والتعاون الذكي. نحن ملتزمون بتوفير 
                أفضل الحلول التقنية والخدمات المبتكرة لمجتمعنا."
              </p>
              <p className="text-blue-400 mt-3 font-medium">- فريق GPODO</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 GPODO. جميع الحقوق محفوظة. | مدعوم بتقنية IPFS للتوثيق الآمن
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

