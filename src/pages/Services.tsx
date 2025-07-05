
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Search,
  Filter,
  Star,
  ShoppingCart,
  Plus,
  ArrowRight,
  ArrowLeft,
  Home,
  Coins,
  Store,
  User,
  Package
} from 'lucide-react';

interface UserService {
  id: string;
  title: string;
  description: string;
  category: string;
  price_points: number;
  features: string[];
  total_sales: number;
  user_id: string;
  created_at: string;
}

const Services = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [services, setServices] = useState<UserService[]>([]);
  const [filteredServices, setFilteredServices] = useState<UserService[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'جميع الفئات' },
    { value: 'procurement', label: 'المشتريات الجماعية' },
    { value: 'legal', label: 'الخدمات القانونية' },
    { value: 'consulting', label: 'الاستشارات' },
    { value: 'technology', label: 'التكنولوجيا' },
    { value: 'marketing', label: 'التسويق' },
    { value: 'finance', label: 'المالية' }
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchTerm, selectedCategory]);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('user_services')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      console.error('Error fetching services:', error);
      toast({
        title: "خطأ في جلب الخدمات",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = services;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    setFilteredServices(filtered);
  };

  const handlePurchase = async (service: UserService) => {
    if (!user) {
      toast({
        title: "يجب تسجيل الدخول",
        description: "يرجى تسجيل الدخول لشراء الخدمة",
        variant: "destructive"
      });
      return;
    }

    if (service.user_id === user.id) {
      toast({
        title: "لا يمكن شراء خدمتك الخاصة",
        description: "لا يمكنك شراء الخدمات التي تقدمها",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase.rpc('purchase_service', {
        p_service_id: service.id,
        p_buyer_id: user.id
      });

      if (error) throw error;

      if (data) {
        toast({
          title: "تم شراء الخدمة بنجاح",
          description: `تم خصم ${service.price_points} نقطة من رصيدك`
        });
        fetchServices();
      } else {
        toast({
          title: "فشل في شراء الخدمة",
          description: "قد تكون نقاطك غير كافية أو الخدمة غير متاحة",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "خطأ في شراء الخدمة",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleNavigation = (direction: 'back' | 'forward' | 'home') => {
    if (direction === 'back') {
      window.history.back();
    } else if (direction === 'forward') {
      window.history.forward();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
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
              onClick={() => handleNavigation('home')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              الرئيسية
            </Button>
          </div>
          {user && (
            <Button onClick={() => window.location.href = '/create-service'} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إضافة خدمة جديدة
            </Button>
          )}
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">متجر الخدمات</h1>
          <p className="text-gray-600">اشتر واستخدم الخدمات المتخصصة من المستخدمين الآخرين</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في الخدمات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-md">
            <Filter className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-600">
              {filteredServices.length} خدمة متاحة
            </span>
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">جاري التحميل...</div>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد خدمات متاحة</h3>
            <p className="text-gray-600">جرب تغيير معايير البحث أو أضف خدمة جديدة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                      <Badge variant="outline" className="mb-2">
                        {categories.find(c => c.value === service.category)?.label || service.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-lg">{service.price_points}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Star className="w-3 h-3" />
                        <span>{service.total_sales} مبيعة</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                  
                  {service.features && service.features.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">المميزات:</h4>
                      <ul className="space-y-1">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => handlePurchase(service)}
                    className="w-full"
                    disabled={!user || service.user_id === user?.id}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {!user ? 'سجل الدخول للشراء' : 
                     service.user_id === user?.id ? 'خدمتك الخاصة' : 'شراء الخدمة'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
