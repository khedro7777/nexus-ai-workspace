
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  Star,
  CheckCircle,
  BarChart3,
  Handshake,
  Brain,
  Target,
  Menu,
  Search,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Mock search results
    const mockResults = [
      {
        id: '1',
        name: 'مجموعة التقنية الذكية',
        description: 'مجموعة للشركات التقنية الناشئة لتبادل الموارد والتعاون',
        memberCount: 45,
        category: 'تقنية',
        status: 'نشط',
        rating: 4.5
      },
      {
        id: '2',
        name: 'مبادرة الطاقة المتجددة',
        description: 'مجموعة تعاونية تركز على حلول الطاقة المتجددة',
        memberCount: 32,
        category: 'بيئة',
        status: 'نشط',
        rating: 4.2
      }
    ];
    
    setSearchResults(mockResults);
    setShowResults(true);
  };

  const features = [
    {
      icon: Users,
      title: 'قوة الشراء الجماعي',
      description: 'انضم مع الآخرين للحصول على أسعار الجملة وصفقات أفضل',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Building2,
      title: 'تكوين الشركات',
      description: 'إنشاء شركات تعاونية بموارد وخبرات مشتركة',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: TrendingUp,
      title: 'فرص الاستثمار',
      description: 'تجميع الموارد لفرص استثمارية أكبر وعوائد مشتركة',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Shield,
      title: 'العقود الذكية',
      description: 'اتفاقيات آمنة ومؤتمتة بتقنية البلوك تشين',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const stats = [
    { label: 'المجموعات النشطة', value: '2,847', icon: Users },
    { label: 'إجمالي الوفورات', value: '$12.4M', icon: TrendingUp },
    { label: 'الشركات المؤسسة', value: '156', icon: Building2 },
    { label: 'معدل النجاح', value: '94%', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-blue-600">GPO NEXUS</div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                منصة التعاقد الذكي
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate('/auth')}>
                تسجيل الدخول
              </Button>
              <Button onClick={() => navigate('/create-group')}>
                إنشاء مجموعة
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            منصة التعاقد الذكي للشراء الجماعي
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            انضم إلى آلاف المشترين والموردين والمستقلين في منصة متقدمة للتعاون والشراء الجماعي بتقنيات الذكاء الاصطناعي والعقود الذكية
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              ابدأ الآن
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              اكتشف المزيد
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">ابحث عن مجموعتك المثالية</h2>
            <p className="text-xl text-gray-600">ابحث وصنف المجموعات حسب اهتماماتك واحتياجاتك</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="ابحث في المجموعات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 h-12">
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">تقنية</SelectItem>
                  <SelectItem value="healthcare">صحة</SelectItem>
                  <SelectItem value="education">تعليم</SelectItem>
                  <SelectItem value="environment">بيئة</SelectItem>
                  <SelectItem value="finance">مالية</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} size="lg" className="px-8">
                <Search className="ml-2 h-5 w-5" />
                بحث
              </Button>
            </div>
          </div>

          {/* Search Results */}
          {showResults && (
            <div className="max-w-4xl mx-auto mt-8">
              <h3 className="text-xl font-semibold mb-6">نتائج البحث ({searchResults.length})</h3>
              <div className="grid gap-4">
                {searchResults.map((group) => (
                  <Card key={group.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{group.name}</h4>
                          <p className="text-gray-600 mb-3">{group.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {group.memberCount} عضو
                            </span>
                            <Badge variant="secondary">{group.category}</Badge>
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              {group.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            عرض التفاصيل
                          </Button>
                          <Button size="sm">
                            انضم
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">ميزات قوية</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              اكتشف كيف تُحدث منصتنا ثورة في التعاون التجاري والمشتريات
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${feature.color}`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">الوصول السريع</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              className="h-20 text-right justify-start gap-4 p-6"
              onClick={() => navigate('/my-groups')}
            >
              <Users className="w-10 h-10 text-blue-600" />
              <div className="text-right">
                <div className="font-semibold text-lg">مجموعاتي</div>
                <div className="text-sm text-gray-500">إدارة مجموعاتك</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 text-right justify-start gap-4 p-6"
              onClick={() => navigate('/suppliers')}
            >
              <Building2 className="w-10 h-10 text-green-600" />
              <div className="text-right">
                <div className="font-semibold text-lg">الموردون</div>
                <div className="text-sm text-gray-500">العثور على موردين</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 text-right justify-start gap-4 p-6"
              onClick={() => navigate('/negotiations')}
            >
              <Handshake className="w-10 h-10 text-purple-600" />
              <div className="text-right">
                <div className="font-semibold text-lg">المفاوضات</div>
                <div className="text-sm text-gray-500">المفاوضات النشطة</div>
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">GPO NEXUS</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              ثورة في التعاون التجاري من خلال منصة الشراء الجماعي والحلول الذكية المدعومة بالذكاء الاصطناعي
            </p>
            <div className="flex justify-center gap-6 mb-6">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                الشروط والأحكام
              </Button>
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                سياسة الخصوصية
              </Button>
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                تواصل معنا
              </Button>
            </div>
            <div className="text-gray-400">
              <p>&copy; 2025 GPO NEXUS. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
