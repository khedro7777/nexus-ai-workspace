
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe,
  ArrowLeft,
  Plus,
  Filter,
  Star,
  MapPin,
  Calendar
} from 'lucide-react';

// Mock data for groups
const mockGroups = [
  {
    id: '1',
    name: 'مجموعة المعدات التقنية',
    description: 'شراء معدات تقنية بكميات كبيرة للشركات الناشئة',
    memberCount: 15,
    maxMembers: 25,
    status: 'نشط',
    phase: 'التفاوض',
    category: 'تقنية',
    rating: 4.8,
    country: 'السعودية'
  },
  {
    id: '2',
    name: 'مجموعة اللوازم المكتبية',
    description: 'شراء جماعي للوازم المكتبية والقرطاسية',
    memberCount: 8,
    maxMembers: 20,
    status: 'نشط',
    phase: 'التكوين',
    category: 'مكتبية',
    rating: 4.5,
    country: 'الإمارات'
  },
  {
    id: '3',
    name: 'مجموعة المواد الغذائية',
    description: 'شراء المواد الغذائية بالجملة للمطاعم',
    memberCount: 22,
    maxMembers: 30,
    status: 'مكتمل',
    phase: 'منتهي',
    category: 'غذائية',
    rating: 4.9,
    country: 'قطر'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState(mockGroups);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockGroups.filter(group => 
      group.name.toLowerCase().includes(query.toLowerCase()) ||
      group.description.toLowerCase().includes(query.toLowerCase()) ||
      group.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGroups(filtered);
  };

  const stats = [
    { title: 'المجموعات النشطة', value: '150+', icon: Users },
    { title: 'إجمالي التوفير', value: '2.5M ر.س', icon: TrendingUp },
    { title: 'المعاملات الآمنة', value: '99.9%', icon: Shield },
    { title: 'سرعة التنفيذ', value: '48 ساعة', icon: Zap }
  ];

  const features = [
    {
      title: 'الشراء الجماعي الذكي',
      description: 'اجمع مع آخرين لتحصل على أفضل الأسعار والعروض الحصرية',
      icon: Users
    },
    {
      title: 'التفاوض الآلي',
      description: 'نظام ذكي للتفاوض مع الموردين وضمان أفضل الشروط',
      icon: Zap
    },
    {
      title: 'الأمان والثقة',
      description: 'نظام أمان متقدم وضمانات شاملة لجميع المعاملات',
      icon: Shield
    },
    {
      title: 'تغطية عالمية',
      description: 'شبكة موردين وشركاء معتمدين في جميع أنحاء المنطقة',
      icon: Globe
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-2xl font-bold text-blue-600">منصة الشراء الجماعي</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                لوحة التحكم
              </Link>
              <Link to="/my-groups" className="text-gray-600 hover:text-blue-600 transition-colors">
                مجموعاتي
              </Link>
              <Link to="/suppliers" className="text-gray-600 hover:text-blue-600 transition-colors">
                الموردين
              </Link>
              <Link to="/auth">
                <Button variant="outline" className="ml-4">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link to="/create-group">
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  إنشاء مجموعة
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            وفر أكثر مع 
            <span className="text-blue-600"> الشراء الجماعي الذكي</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            انضم لآلاف المشترين واحصل على أفضل الأسعار من خلال القوة الشرائية الجماعية
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="ابحث عن المجموعات أو المنتجات..."
                className="w-full pl-4 pr-12 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Button className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full">
                بحث
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Groups */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">المجموعات المميزة</h2>
            <Link to="/my-groups">
              <Button variant="outline" className="flex items-center gap-2">
                عرض الكل
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-2">{group.name}</CardTitle>
                      <p className="text-sm text-gray-600 line-clamp-2">{group.description}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="text-sm font-medium">{group.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{group.memberCount} من {group.maxMembers} عضو</span>
                      </div>
                      <Badge variant={group.status === 'نشط' ? 'default' : 'secondary'}>
                        {group.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{group.country}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{group.phase}</span>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <Link to={`/group/${group.id}`}>
                        <Button className="w-full" size="sm">
                          عرض التفاصيل
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">لماذا تختار منصتنا؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نوفر لك كل ما تحتاجه لتجربة شراء جماعي ناجحة وآمنة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">ابدأ رحلتك اليوم</h2>
          <p className="text-xl mb-8 opacity-90">
            انضم لآلاف المستخدمين واستفد من القوة الشرائية الجماعية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create-group">
              <Button size="lg" variant="secondary" className="text-blue-600">
                إنشاء مجموعة جديدة
              </Button>
            </Link>
            <Link to="/my-groups">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                تصفح المجموعات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">منصة الشراء الجماعي</h3>
              <p className="text-gray-400">
                منصة رائدة في الشراء الجماعي والتفاوض الذكي
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">روابط مهمة</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">عن المنصة</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">كيف تعمل</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">الأسعار</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">المساعدة</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">اتصل بنا</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">الأسئلة الشائعة</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">تابعنا</h4>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">تويتر</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">لينكدإن</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">فيسبوك</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 منصة الشراء الجماعي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
