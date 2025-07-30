import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, TrendingUp, Shield, Globe, Zap, Brain, Building2, ShoppingCart, Briefcase, UserCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center">
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
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              انضم إلى آلاف الشركات والأفراد في الحصول على أفضل الأسعار من خلال القوة الشرائية الجماعية. 
              منصة متكاملة للتجارة والاستثمار والتعاون التجاري مع حلول ذكية مدعومة بالذكاء الاصطناعي.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold">
                  ابدأ الآن
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold">
                  تسجيل الدخول
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 -mt-8 relative z-10">
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

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-12">
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

      {/* Features Section */}
      <div className="container mx-auto px-6 py-12">
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

      {/* Group Types Section */}
      <div className="container mx-auto px-6 py-12">
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
                    <Button className="flex-1" size="sm">
                      دخول البوابة
                    </Button>
                    <Button variant="outline" size="sm">
                      إنشاء مجموعة
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">هل أنت مستعد للانضمام لمجتمعنا؟</h2>
          <p className="text-xl mb-8 text-blue-100">
            انضم إلى آلاف المستخدمين واحصل على أفضل الأسعار والفرص التجارية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
                إنشاء حساب مجاني
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

