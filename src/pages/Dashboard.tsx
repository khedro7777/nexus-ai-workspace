
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Users, 
  ShoppingCart, 
  Briefcase, 
  Building2,
  FileText,
  Gavel,
  MessageSquare,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Coins,
  TrendingUp,
  Clock,
  Target,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MCPPanel from '@/components/layout/MCPPanel';
import { useState } from 'react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Core Services from SnapDAO
  const serviceCards = [
    {
      title: 'الشراء التعاوني',
      description: 'انضم إلى مجموعة لشراء منتجات أو خدمات بكميات',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      link: '/create-group?type=group_buying',
      category: 'core'
    },
    {
      title: 'التسويق التعاوني',
      description: 'تعاون مع آخرين لإنشاء حملات تسويقية ذكية',
      icon: Users,
      color: 'bg-green-500',
      link: '/create-group?type=marketing',
      category: 'core'
    },
    {
      title: 'بوابة المستقلين',
      description: 'اعرض مهاراتك أو شارك في مهام تعاونية',
      icon: Briefcase,
      color: 'bg-purple-500',
      link: '/create-group?type=freelance_request',
      category: 'gateway'
    },
    {
      title: 'بوابة الموردين',
      description: 'قدم عروضك للمجموعات الجاهزة للتفاوض',
      icon: Building2,
      color: 'bg-orange-500',
      link: '/create-group?type=supplier_request',
      category: 'gateway'
    }
  ];

  // Additional Gateways and Services
  const additionalServices = [
    {
      title: 'بوابة الشركات',
      description: 'خدمات متخصصة للشركات والمؤسسات',
      icon: Building2,
      color: 'bg-indigo-500',
      link: '/company-hub',
      category: 'gateway'
    },
    {
      title: 'بوابة التحكيم',
      description: 'حل النزاعات والوساطة المهنية',
      icon: Gavel,
      color: 'bg-red-500',
      link: '/arbitration-hub',
      category: 'gateway'
    },
    {
      title: 'بوابة المفاوضات',
      description: 'إدارة المفاوضات والعقود الذكية',
      icon: MessageSquare,
      color: 'bg-teal-500',
      link: '/negotiations',
      category: 'workflow'
    },
    {
      title: 'بوابة التحليلات',
      description: 'تحليلات متقدمة وإحصائيات شاملة',
      icon: BarChart3,
      color: 'bg-cyan-500',
      link: '/analytics',
      category: 'workflow'
    }
  ];

  // Workflow and Advanced Features
  const workflowFeatures = [
    {
      title: 'العقود الذكية',
      description: 'إنشاء وإدارة العقود الرقمية',
      icon: FileText,
      color: 'bg-violet-500',
      link: '/contracts',
      badge: 'جديد'
    },
    {
      title: 'إدارة الجودة',
      description: 'ضمان الجودة ومراقبة الأداء',
      icon: Shield,
      color: 'bg-emerald-500',
      link: '/quality-management',
      badge: 'قريباً'
    },
    {
      title: 'التمويل التعاوني',
      description: 'حلول تمويل جماعية ومشتركة',
      icon: Coins,
      color: 'bg-amber-500',
      link: '/crowdfunding',
      badge: 'قريباً'
    },
    {
      title: 'الأتمتة الذكية',
      description: 'أتمتة العمليات والمهام المتكررة',
      icon: Zap,
      color: 'bg-pink-500',
      link: '/automation',
      badge: 'متقدم'
    }
  ];

  // Performance Stats
  const performanceStats = [
    { label: 'المجموعات النشطة', value: '234', change: '+12%', icon: Users },
    { label: 'العقود المنجزة', value: '1,847', change: '+8%', icon: FileText },
    { label: 'المفاوضات الجارية', value: '56', change: '+23%', icon: MessageSquare },
    { label: 'معدل النجاح', value: '94%', change: '+3%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 p-6 pb-32 overflow-y-auto max-h-screen">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                مرحباً، {user?.user_metadata?.full_name || 'مستخدم'}
              </h1>
              <p className="text-gray-600">
                اختر الخدمة التي تريد البدء بها من البوابات أدناه
              </p>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {performanceStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change}</p>
                      </div>
                      <stat.icon className="w-8 h-8 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Core Services */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6" />
                الخدمات الأساسية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {serviceCards.map((service, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-4">
                      <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      <Link to={service.link}>
                        <Button className="w-full" variant="outline">
                          ابدأ الآن
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Additional Services */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6" />
                البوابات المتخصصة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {additionalServices.map((service, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-4">
                      <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      <Link to={service.link}>
                        <Button className="w-full" variant="outline">
                          الدخول للبوابة
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Workflow Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                الميزات المتقدمة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {workflowFeatures.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group relative">
                    {feature.badge && (
                      <Badge className="absolute top-2 left-2 z-10 text-xs">
                        {feature.badge}
                      </Badge>
                    )}
                    <CardHeader className="pb-4">
                      <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                      <Link to={feature.link}>
                        <Button 
                          className="w-full" 
                          variant={feature.badge === 'قريباً' ? 'secondary' : 'outline'}
                          disabled={feature.badge === 'قريباً'}
                        >
                          {feature.badge === 'قريباً' ? 'قريباً' : 'استكشف'}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                إجراءات سريعة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      مجموعاتي
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      تابع المجموعات التي أنشأتها أو انضممت إليها
                    </p>
                    <Link to="/my-groups">
                      <Button variant="outline" className="w-full">
                        عرض المجموعات
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      إنشاء مجموعة جديدة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      ابدأ مجموعة جديدة للشراء أو التسويق التعاوني
                    </p>
                    <Link to="/create-group">
                      <Button className="w-full">
                        إنشاء مجموعة
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      الإنجازات والمكافآت
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      تصفح إنجازاتك واستلم المكافآت المستحقة
                    </p>
                    <Button variant="outline" className="w-full">
                      عرض الإنجازات
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MCP Panel - Now with collapse functionality */}
      <MCPPanel />
    </div>
  );
};

export default Dashboard;
