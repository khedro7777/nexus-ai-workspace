
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Users, Briefcase, Building2, Search, Filter, Building, Gavel, Zap, Globe, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/Header";
import Logo from "@/components/layout/Logo";
import { useState } from "react";

const Index = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data for demonstration
  const featuredGroups = [
    {
      id: 1,
      name: "مجموعة استيراد أجهزة طبية",
      type: "شراء تعاوني",
      country: "السعودية",
      members: "8/15",
      status: "مفتوحة للانضمام",
      date: "15 مايو 2025"
    },
    {
      id: 2,
      name: "حملة تسويق للمنتجات العضوية",
      type: "تسويق تعاوني", 
      country: "الإمارات",
      members: "12/20",
      status: "قيد التفاوض",
      date: "20 مايو 2025"
    },
    {
      id: 3,
      name: "طلب مطورين لمشروع تطبيق",
      type: "طلب مستقلين",
      country: "مصر",
      members: "5/8",
      status: "تلقي عروض",
      date: "22 مايو 2025"
    }
  ];

  const services = [
    {
      title: "الشراء التعاوني",
      description: "انضم إلى مجموعة لشراء منتجات أو خدمات بكميات",
      icon: ShoppingCart,
      color: "bg-blue-500",
      link: "/dashboard"
    },
    {
      title: "التسويق التعاوني", 
      description: "تعاون مع آخرين لإنشاء حملات تسويقية ذكية",
      icon: Users,
      color: "bg-green-500",
      link: "/dashboard"
    },
    {
      title: "بوابة المستقلين",
      description: "اعرض مهاراتك أو شارك في مهام تعاونية",
      icon: Briefcase,
      color: "bg-purple-500",
      link: "/freelancer-dashboard"
    },
    {
      title: "بوابة الموردين",
      description: "قدم عروضك للمجموعات الجاهزة للتفاوض",
      icon: Building2,
      color: "bg-orange-500",
      link: "/supplier-dashboard"
    },
    {
      title: "تأسيس الشركات",
      description: "تأسيس الشركات الفردية والجماعية بطريقة ذكية",
      icon: Building,
      color: "bg-indigo-500",
      link: "/company-formation"
    },
    {
      title: "بوابة الاستثمار",
      description: "استثمر في الشركات الناشئة والمشاريع المبتكرة",
      icon: TrendingUp,
      color: "bg-emerald-500",
      link: "/investment-portal"
    },
    {
      title: "بوابة التحكيم",
      description: "منصة تحكيم ذكية لحل النزاعات التجارية",
      icon: Gavel,
      color: "bg-red-500",
      link: "/arbitration-hub"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm mb-6">
            <Zap className="w-4 h-4" />
            مدعوم بالذكاء الاصطناعي المتقدم
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            منصة التعاقد الذكي
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              بين المشترين والموردين والمستقلين
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            منصة متكاملة للشراء التعاوني والتسويق الجماعي وربط الموردين بالعملاء عبر نظام تفاوض ذكي وآمن
          </p>
          
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3">
                  ابدأ الآن مجاناً
                  <Zap className="w-5 h-5 mr-2" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2">
                  تسجيل الدخول
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3">
                انتقل إلى لوحة التحكم
                <Globe className="w-5 h-5 mr-2" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            البوابات الذكية المتكاملة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4">
                    {service.description}
                  </CardDescription>
                  <Link to={user ? service.link : "/auth"}>
                    <Button variant="outline" className="w-full group-hover:bg-blue-50">
                      ابدأ
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Groups Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              العروض والمجموعات المفتوحة
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              تصفح المجموعات النشطة والفرص المتاحة للانضمام والمشاركة
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث في المجموعات..."
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              فلترة
            </Button>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {group.type}
                    </span>
                    <span className="text-sm text-gray-500">{group.date}</span>
                  </div>
                  <CardTitle className="text-lg leading-tight">{group.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">الدولة:</span>
                      <span>{group.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الأعضاء:</span>
                      <span>{group.members}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الحالة:</span>
                      <span className="text-green-600">{group.status}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link to={user ? `/group/${group.id}` : "/auth"}>
                      <Button variant="outline" size="sm" className="w-full">
                        عرض التفاصيل
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button variant="outline" size="lg">
                عرض المزيد من المجموعات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo size="sm" />
              </div>
              <p className="text-gray-400">
                منصة التعاقد الذكي للشراء التعاوني والتسويق الجماعي
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">الشركة</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">من نحن</a></li>
                <li><a href="#" className="hover:text-white">كيف تعمل المنصة</a></li>
                <li><a href="#" className="hover:text-white">الدعم والمساعدة</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">الخدمات</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">الشراء التعاوني</a></li>
                <li><a href="#" className="hover:text-white">التسويق التعاوني</a></li>
                <li><a href="#" className="hover:text-white">بوابة المستقلين</a></li>
                <li><a href="#" className="hover:text-white">بوابة الموردين</a></li>
                <li><a href="#" className="hover:text-white">تأسيس الشركات</a></li>
                <li><a href="#" className="hover:text-white">بوابة الاستثمار</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">قانوني</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-white">شروط الاستخدام</a></li>
                <li><a href="#" className="hover:text-white">خريطة الموقع</a></li>
                <li><a href="#" className="hover:text-white">اتصل بنا</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 GPO SMART المنصة الموحدة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
