
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, ShoppingCart, Briefcase, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MCPPanel from '@/components/layout/MCPPanel';
import { useState } from 'react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const serviceCards = [
    {
      title: 'الشراء التعاوني',
      description: 'انضم إلى مجموعة لشراء منتجات أو خدمات بكميات',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      link: '/create-group?type=group_buying'
    },
    {
      title: 'التسويق التعاوني',
      description: 'تعاون مع آخرين لإنشاء حملات تسويقية ذكية',
      icon: Users,
      color: 'bg-green-500',
      link: '/create-group?type=marketing'
    },
    {
      title: 'بوابة المستقلين',
      description: 'اعرض مهاراتك أو شارك في مهام تعاونية',
      icon: Briefcase,
      color: 'bg-purple-500',
      link: '/create-group?type=freelance_request'
    },
    {
      title: 'بوابة الموردين',
      description: 'قدم عروضك للمجموعات الجاهزة للتفاوض',
      icon: Building2,
      color: 'bg-orange-500',
      link: '/create-group?type=supplier_request'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                مرحباً، {user?.user_metadata?.full_name || 'مستخدم'}
              </h1>
              <p className="text-gray-600">
                اختر الخدمة التي تريد البدء بها من البوابات أدناه
              </p>
            </div>

            {/* MCP Box - Central Command */}
            <div className="mb-8">
              <MCPPanel />
            </div>

            {/* Service Cards */}
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

            {/* Quick Actions */}
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
                    <Briefcase className="w-5 h-5" />
                    العروض والفرص
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    تصفح العروض المتاحة والفرص الجديدة
                  </p>
                  <Link to="/opportunities">
                    <Button variant="outline" className="w-full">
                      تصفح الفرص
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
