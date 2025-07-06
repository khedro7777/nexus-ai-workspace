
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import GatewayGrid from '@/components/gateways/GatewayGrid';
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
  Store
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
      description: 'احصل على أسعار أفضل من خلال الشراء مع آخرين'
    },
    {
      icon: Target,
      title: 'استهداف دقيق',
      description: 'ابحث عن المجموعات التي تناسب احتياجاتك بالضبط'
    },
    {
      icon: Award,
      title: 'موردين معتمدين',
      description: 'تعامل مع موردين موثوقين ومعتمدين فقط'
    }
  ];

  // Navigation function for back/forward
  const handleNavigation = (direction: 'back' | 'forward') => {
    if (direction === 'back') {
      window.history.back();
    } else {
      window.history.forward();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Breadcrumb - Only show if user is logged in */}
        {user && (
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => handleNavigation('back')}
                className="flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                السابق
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleNavigation('forward')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                التالي
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                الرئيسية
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/points')}
                className="flex items-center gap-2"
              >
                <Coins className="w-4 h-4" />
                النقاط
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                الملف الشخصي
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/settings')}
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                الإعدادات
              </Button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            منصة التجارة الجماعية
            <span className="block text-blue-600">والشراء الذكي</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            انضم إلى آلاف الشركات والأفراد في الحصول على أفضل الأسعار من خلال القوة الشرائية الجماعية
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <>
                <Button size="lg" className="px-8 py-3" onClick={() => navigate('/dashboard')}>
                  <span>لوحة التحكم</span>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-3" onClick={() => navigate('/create-group')}>
                  إنشاء مجموعة جديدة
                </Button>
                <Button size="lg" variant="secondary" className="px-8 py-3" onClick={() => navigate('/my-groups')}>
                  مجموعاتي
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" className="px-8 py-3" onClick={() => navigate('/auth')}>
                  <span>ابدأ الآن</span>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-3" onClick={() => navigate('/auth')}>
                  تسجيل الدخول
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
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

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            لماذا تختار منصتنا؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
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

        {/* Gateway Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">استكشف بواباتنا</h2>
              <p className="text-gray-600 mt-2">اختر البوابة التي تناسب احتياجاتك أو اشتر خدمات من المستخدمين الآخرين</p>
            </div>
            {user && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate('/services')}>
                  <Store className="w-4 h-4 mr-2" />
                  متجر الخدمات
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  عرض الكل
                  <ChevronRight className="w-4 h-4 mr-2" />
                </Button>
              </div>
            )}
          </div>
          
          <GatewayGrid />
        </div>

        {/* Quick Actions for Logged Users */}
        {user && (
          <div className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle>الإجراءات السريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center gap-2"
                    onClick={() => navigate('/create-group')}
                  >
                    <Users className="w-6 h-6" />
                    إنشاء مجموعة جديدة
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center gap-2"
                    onClick={() => navigate('/my-groups')}
                  >
                    <Building2 className="w-6 h-6" />
                    إدارة مجموعاتي
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center gap-2"
                    onClick={() => navigate('/services')}
                  >
                    <ShoppingBag className="w-6 h-6" />
                    متجر الخدمات
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center gap-2"
                    onClick={() => navigate('/points')}
                  >
                    <Coins className="w-6 h-6" />
                    إدارة النقاط
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CTA Section */}
        {!user && (
          <div className="text-center bg-blue-600 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              هل أنت مستعد للبدء؟
            </h2>
            <p className="text-xl mb-8 opacity-90">
              انضم إلى آلاف المستخدمين واحصل على أفضل الأسعار
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
