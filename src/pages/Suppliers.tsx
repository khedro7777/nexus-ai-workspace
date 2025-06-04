
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, MapPin, Phone, Mail, Building2, Package, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const Suppliers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const suppliers = [
    {
      id: 1,
      name: "شركة الإمداد المتميز",
      category: "إلكترونيات",
      rating: 4.8,
      location: "الرياض، السعودية",
      phone: "+966 11 234 5678",
      email: "info@supply-excellence.com",
      description: "متخصصون في توريد الأجهزة الإلكترونية والتكنولوجيا المتقدمة",
      products: ["هواتف ذكية", "أجهزة لوحية", "أجهزة كمبيوتر"],
      orders: 156,
      verified: true
    },
    {
      id: 2,
      name: "مجموعة التجارة الذكية",
      category: "مواد البناء",
      rating: 4.6,
      location: "جدة، السعودية",
      phone: "+966 12 345 6789",
      email: "contact@smart-trade.com",
      description: "توريد مواد البناء والإنشاءات بأعلى معايير الجودة",
      products: ["أسمنت", "حديد", "مواد عزل"],
      orders: 89,
      verified: true
    },
    {
      id: 3,
      name: "شركة الأغذية الطازجة",
      category: "مواد غذائية",
      rating: 4.9,
      location: "الدمام، السعودية",
      phone: "+966 13 456 7890",
      email: "orders@fresh-foods.com",
      description: "توريد المواد الغذائية الطازجة والمجمدة للمطاعم والفنادق",
      products: ["خضروات", "فواكه", "لحوم"],
      orders: 203,
      verified: true
    }
  ];

  const categories = ["الكل", "إلكترونيات", "مواد البناء", "مواد غذائية", "ملابس", "أثاث"];

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">دليل الموردين</h1>
          <p className="text-gray-600">اكتشف أفضل الموردين المعتمدين لمجموعتك</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="ابحث عن مورد أو فئة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-12"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              تصفية النتائج
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{supplier.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{supplier.category}</Badge>
                        {supplier.verified && (
                          <Badge className="bg-green-100 text-green-800">معتمد</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{supplier.rating}</span>
                  <span className="text-gray-500 text-sm">({supplier.orders} طلب)</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription>{supplier.description}</CardDescription>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {supplier.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    {supplier.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    {supplier.email}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    المنتجات الرئيسية
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {supplier.products.map((product, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">عرض التفاصيل</Button>
                  <Button variant="outline" className="flex-1">طلب عرض سعر</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">150+</div>
              <div className="text-gray-600">مورد معتمد</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600">منتج متاح</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-gray-600">معدل الرضا</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-4">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-gray-600">متوسط التقييم</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
