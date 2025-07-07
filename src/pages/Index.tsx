
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import EnhancedHeader from '@/components/layout/EnhancedHeader';
import Sidebar from '@/components/layout/Sidebar';
import PortalsGrid from '@/components/home/PortalsGrid';
import Footer from '@/components/home/Footer';
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
  Globe,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const features = [
    {
      icon: Zap,
      title: 'قوة الشراء الجماعي',
      description: 'احصل على أسعار أفضل من خلال الشراء مع آخرين',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Target,
      title: 'استهداف دقيق',
      description: 'ابحث عن المجموعات التي تناسب احتياجاتك بالضبط',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Award,
      title: 'موردين معتمدين',
      description: 'تعامل مع موردين موثوقين ومعتمدين فقط',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Globe,
      title: 'شبكة عالمية',
      description: 'اتصل مع شركاء من جميع أنحاء العالم',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: CheckCircle,
      title: 'أمان مضمون',
      description: 'معاملات آمنة مع ضمان حماية الأموال',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Users,
      title: 'مجتمع نشط',
      description: 'انضم لمجتمع من رجال الأعمال والمستثمرين',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <EnhancedHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {user && <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />}
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <Badge className="mb-4 bg-blue-600 text-white px-4 py-2">
              مرحباً بك في GPO WORLD
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              منصة التجارة الجماعية
              <span className="block text-blue-600">والشراء الذكي</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              انضم إلى آلاف الشركات والأفراد في الحصول على أفضل الأسعار من خلال القوة الشرائية الجماعية. 
              منصة متكاملة للتجارة والاستثمار والتعاون التجاري مع حلول ذكية مدعومة بالذكاء الاصطناعي.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {user ? (
              <>
                <Button size="lg" className="px-8 py-4 text-lg" onClick={() => navigate('/dashboard')}>
                  <span>لوحة التحكم</span>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg" onClick={() => navigate('/create-group')}>
                  إنشاء مجموعة جديدة
                </Button>
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg" onClick={() => navigate('/my-groups')}>
                  مجموعاتي
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/auth')}>
                  <span>ابدأ الآن</span>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg" onClick={() => navigate('/auth')}>
                  تسجيل الدخول
                </Button>
              </>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>معاملات آمنة ومضمونة</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>تقييم 4.9/5 من المستخدمين</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span>أكثر من 10,000 مستخدم نشط</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
              <CardContent className="pt-6">
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              لماذا تختار GPO WORLD؟
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نوفر لك أدوات ومميزات متقدمة تساعدك على تحقيق أهدافك التجارية بكفاءة عالية
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8" />
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

        {/* Main Portals Section */}
        <div className="mb-16">
          <PortalsGrid />
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold mb-4">
              هل أنت مستعد للانضمام لمجتمعنا؟
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              انضم إلى آلاف المستخدمين واحصل على أفضل الأسعار والفرص التجارية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg" onClick={() => navigate('/auth')}>
                إنشاء حساب مجاني
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-blue-600" onClick={() => navigate('/auth')}>
                تسجيل الدخول
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Index;
