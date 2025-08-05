
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search,
  Filter,
  Star,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Code,
  PenTool,
  Camera,
  Megaphone,
  TrendingUp,
  Shield,
  Award,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Heart,
  MessageSquare
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  provider: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    verified: boolean;
  };
  category: string;
  price: {
    starting: number;
    currency: string;
    unit: string;
  };
  deliveryTime: string;
  tags: string[];
  featured: boolean;
  thumbnail: string;
}

const Services = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const services: Service[] = [
    {
      id: '1',
      title: 'تطوير تطبيقات الجوال الاحترافية',
      description: 'تطوير تطبيقات iOS و Android بأحدث التقنيات مع تصميم عصري وأداء متميز',
      provider: {
        name: 'محمد أحمد',
        avatar: 'MA',
        rating: 4.9,
        reviews: 127,
        verified: true
      },
      category: 'تطوير',
      price: {
        starting: 5000,
        currency: 'SAR',
        unit: 'مشروع'
      },
      deliveryTime: '2-4 أسابيع',
      tags: ['React Native', 'Flutter', 'iOS', 'Android'],
      featured: true,
      thumbnail: 'app-dev'
    },
    {
      id: '2',
      title: 'تصميم هوية بصرية متكاملة',
      description: 'تصميم شعار وهوية بصرية متكاملة للشركات والمؤسسات مع دليل استخدام شامل',
      provider: {
        name: 'سارة الخليل',
        avatar: 'SK',
        rating: 4.8,
        reviews: 89,
        verified: true
      },
      category: 'تصميم',
      price: {
        starting: 1500,
        currency: 'SAR',
        unit: 'حزمة'
      },
      deliveryTime: '5-7 أيام',
      tags: ['شعار', 'هوية بصرية', 'تصميم جرافيك'],
      featured: false,
      thumbnail: 'brand-design'
    },
    {
      id: '3',
      title: 'إدارة حسابات وسائل التواصل الاجتماعي',
      description: 'إدارة شاملة لحسابات الشركات على منصات التواصل مع إنشاء محتوى جذاب',
      provider: {
        name: 'أحمد العمري',
        avatar: 'AA',
        rating: 4.7,
        reviews: 156,
        verified: true
      },
      category: 'تسويق',
      price: {
        starting: 2500,
        currency: 'SAR',
        unit: 'شهر'
      },
      deliveryTime: 'خدمة شهرية',
      tags: ['سوشيال ميديا', 'محتوى', 'تسويق رقمي'],
      featured: true,
      thumbnail: 'social-media'
    },
    {
      id: '4',
      title: 'كتابة المحتوى التسويقي الإبداعي',
      description: 'كتابة محتوى تسويقي احترافي للمواقع والمدونات ووسائل التواصل الاجتماعي',
      provider: {
        name: 'فاطمة النور',
        avatar: 'FN',
        rating: 4.9,
        reviews: 203,
        verified: true
      },
      category: 'كتابة',
      price: {
        starting: 500,
        currency: 'SAR',
        unit: 'مقال'
      },
      deliveryTime: '1-3 أيام',
      tags: ['كتابة', 'محتوى تسويقي', 'SEO'],
      featured: false,
      thumbnail: 'content-writing'
    },
    {
      id: '5',
      title: 'تصوير فوتوغرافي احترافي للمنتجات',
      description: 'تصوير احترافي للمنتجات والخدمات بجودة عالية مناسبة للتجارة الإلكترونية',
      provider: {
        name: 'عبدالله المالكي',
        avatar: 'AM',
        rating: 4.8,
        reviews: 94,
        verified: true
      },
      category: 'تصوير',
      price: {
        starting: 800,
        currency: 'SAR',
        unit: 'جلسة'
      },
      deliveryTime: '2-5 أيام',
      tags: ['تصوير منتجات', 'فوتوغرافيا', 'تصوير تجاري'],
      featured: false,
      thumbnail: 'product-photography'
    },
    {
      id: '6',
      title: 'استشارات الأعمال والتطوير الإستراتيجي',
      description: 'استشارات متخصصة في تطوير الأعمال والتخطيط الإستراتيجي لنمو الشركات',
      provider: {
        name: 'د. خالد الشمري',
        avatar: 'KS',
        rating: 5.0,
        reviews: 67,
        verified: true
      },
      category: 'استشارات',
      price: {
        starting: 1200,
        currency: 'SAR',
        unit: 'ساعة'
      },
      deliveryTime: 'حسب الاتفاق',
      tags: ['استشارات', 'تطوير أعمال', 'استراتيجية'],
      featured: true,
      thumbnail: 'business-consulting'
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الخدمات', icon: Briefcase },
    { id: 'development', name: 'تطوير', icon: Code },
    { id: 'design', name: 'تصميم', icon: PenTool },
    { id: 'photography', name: 'تصوير', icon: Camera },
    { id: 'marketing', name: 'تسويق', icon: Megaphone },
    { id: 'writing', name: 'كتابة', icon: PenTool },
    { id: 'consulting', name: 'استشارات', icon: TrendingUp }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredServices = services.filter(service => service.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">سوق الخدمات</h1>
          <p className="text-gray-600">اكتشف وتعامل مع أفضل مقدمي الخدمات المحترفين</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="ابحث عن الخدمات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  فلترة
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">جميع الخدمات</TabsTrigger>
            <TabsTrigger value="featured">الخدمات المميزة</TabsTrigger>
            <TabsTrigger value="providers">مقدمو الخدمات</TabsTrigger>
          </TabsList>

          {/* All Services */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <Card key={service.id} className="hover:shadow-lg transition-all duration-300 group">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                      <div className="text-6xl text-blue-500 opacity-20">
                        {service.category === 'تطوير' && <Code />}
                        {service.category === 'تصميم' && <PenTool />}
                        {service.category === 'تصوير' && <Camera />}
                        {service.category === 'تسويق' && <Megaphone />}
                        {service.category === 'كتابة' && <PenTool />}
                        {service.category === 'استشارات' && <TrendingUp />}
                      </div>
                    </div>
                    {service.featured && (
                      <Badge className="absolute top-3 right-3 bg-yellow-500">
                        <Star className="w-3 h-3 mr-1" />
                        مميز
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {service.provider.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{service.provider.name}</span>
                          {service.provider.verified && (
                            <Shield className="w-3 h-3 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">
                            {service.provider.rating} ({service.provider.reviews})
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {service.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {service.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {service.deliveryTime}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">يبدأ من</div>
                        <div className="font-bold text-green-600">
                          {service.price.starting.toLocaleString()} {service.price.currency}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        اطلب الخدمة
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Featured Services */}
          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredServices.map(service => (
                <Card key={service.id} className="hover:shadow-xl transition-all duration-300">
                  <div className="flex">
                    <div className="w-1/3 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                      <Award className="w-12 h-12 text-yellow-500" />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-yellow-500">
                          <Star className="w-3 h-3 mr-1" />
                          مميز
                        </Badge>
                        <Badge variant="outline">{service.category}</Badge>
                      </div>
                      
                      <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {service.provider.avatar}
                          </div>
                          <span className="text-sm font-medium">{service.provider.name}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{service.provider.rating}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">
                            {service.price.starting.toLocaleString()} {service.price.currency}
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full" size="sm">
                        اطلب الآن
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Service Providers */}
          <TabsContent value="providers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from(new Set(services.map(s => s.provider.name))).map((providerName, index) => {
                const provider = services.find(s => s.provider.name === providerName)?.provider;
                const providerServices = services.filter(s => s.provider.name === providerName);
                
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                        {provider?.avatar}
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{provider?.name}</h3>
                        {provider?.verified && (
                          <Shield className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{provider?.rating}</span>
                        </div>
                        <span className="text-gray-500">({provider?.reviews} تقييم)</span>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-4">
                        {providerServices.length} خدمة متاحة
                      </div>
                      
                      <div className="flex flex-wrap gap-1 justify-center mb-4">
                        {Array.from(new Set(providerServices.map(s => s.category))).map(category => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1" size="sm">
                          عرض الخدمات
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Categories Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">تصفح حسب التصنيف</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.slice(1).map(category => (
              <Card key={category.id} className="hover:shadow-md transition-all duration-300 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <category.icon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-medium text-sm">{category.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {services.filter(s => s.category.toLowerCase().includes(category.id)).length} خدمة
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
