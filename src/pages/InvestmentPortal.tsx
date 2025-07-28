// بوابة الاستثمار - إنشاء والاستثمار في الشركات وإدارتها بين المساهمين
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  TrendingUp, 
  Building2, 
  DollarSign, 
  Users, 
  PieChart, 
  BarChart3,
  Plus,
  Search,
  Filter,
  Star,
  Clock,
  Target,
  Shield,
  Briefcase
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import InvestmentStats from '@/components/investment/InvestmentStats';
import InvestmentOpportunityCard from '@/components/investment/InvestmentOpportunityCard';

const InvestmentPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');

  // بيانات الاستثمارات المحسنة
  const investmentOpportunities = [
    {
      id: 1,
      name: 'شركة التقنيات المتقدمة للذكاء الاصطناعي',
      sector: 'التكنولوجيا',
      fundingGoal: 750000,
      raisedAmount: 450000,
      investors: 67,
      roi: 35,
      risk: 'متوسط',
      status: 'نشط',
      deadline: '2025-09-15',
      description: 'شركة رائدة في تطوير حلول الذكاء الاصطناعي للشركات الناشئة والمؤسسات الكبيرة مع تركيز خاص على الأتمتة الذكية',
      minInvestment: 7500,
      shares: 25,
      country: 'الإمارات'
    },
    {
      id: 2,
      name: 'مجموعة الأغذية العضوية المستدامة',
      sector: 'الأغذية',
      fundingGoal: 500000,
      raisedAmount: 320000,
      investors: 45,
      roi: 22,
      risk: 'منخفض',
      status: 'نشط',
      deadline: '2025-08-20',
      description: 'متخصصة في إنتاج وتوزيع الأغذية العضوية المستدامة مع شبكة توزيع واسعة في منطقة الخليج',
      minInvestment: 5000,
      shares: 18,
      country: 'السعودية'
    },
    {
      id: 3,
      name: 'منصة التجارة الإلكترونية الذكية',
      sector: 'التجارة الإلكترونية',
      fundingGoal: 1000000,
      raisedAmount: 1000000,
      investors: 85,
      roi: 42,
      risk: 'عالي',
      status: 'مكتمل',
      deadline: '2025-06-01',
      description: 'منصة تجارة إلكترونية متطورة تستخدم الذكاء الاصطناعي لتحسين تجربة المستخدم والمبيعات',
      minInvestment: 10000,
      shares: 30,
      country: 'مصر'
    },
    {
      id: 4,
      name: 'شركة الطاقة المتجددة الخضراء',
      sector: 'الطاقة',
      fundingGoal: 2000000,
      raisedAmount: 800000,
      investors: 120,
      roi: 28,
      risk: 'متوسط',
      status: 'نشط',
      deadline: '2025-12-31',
      description: 'رائدة في مجال الطاقة الشمسية وطاقة الرياح مع مشاريع كبيرة في المنطقة العربية',
      minInvestment: 15000,
      shares: 35,
      country: 'الأردن'
    }
  ];

  // إحصائيات المحفظة المحسنة
  const portfolioStats = {
    totalInvested: 125000,
    currentValue: 156000,
    totalReturn: 31000,
    returnPercentage: 24.8,
    activeInvestments: 8,
    companies: 5
  };

  const sectors = [
    'التكنولوجيا', 
    'الأغذية', 
    'العقارات', 
    'الصحة', 
    'التجارة الإلكترونية', 
    'الطاقة',
    'التعليم',
    'النقل',
    'الخدمات المالية'
  ];

  const filteredOpportunities = investmentOpportunities.filter(opp => {
    const matchesSearch = opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = !selectedSector || opp.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const handleInvest = (id: number) => {
    console.log('Investing in opportunity:', id);
    // تنفيذ منطق الاستثمار
  };

  const handleViewDetails = (id: number) => {
    console.log('Viewing details for opportunity:', id);
    // تنفيذ منطق عرض التفاصيل
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* رأس البوابة المحسن */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
            <TrendingUp className="w-10 h-10 text-blue-600" />
            بوابة الاستثمار الذكية
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            استثمر في أفضل الشركات الناشئة والمشاريع المبتكرة مع أدوات تحليل متقدمة وإدارة محفظة احترافية
          </p>
        </div>

        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="opportunities" className="text-lg py-3">الفرص الاستثمارية</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-lg py-3">محفظتي</TabsTrigger>
            <TabsTrigger value="create" className="text-lg py-3">إنشاء شركة</TabsTrigger>
            <TabsTrigger value="analytics" className="text-lg py-3">التحليلات</TabsTrigger>
          </TabsList>

          {/* تبويب الفرص الاستثمارية المحسن */}
          <TabsContent value="opportunities" className="space-y-8">
            {/* فلاتر البحث المحسنة */}
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="ابحث في الفرص الاستثمارية بالاسم أو الوصف..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 py-3 text-lg"
                    />
                  </div>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger className="w-full md:w-56 py-3">
                      <SelectValue placeholder="جميع القطاعات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">جميع القطاعات</SelectItem>
                      {sectors.map(sector => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2 py-3 px-6">
                    <Filter className="w-4 h-4" />
                    فلترة متقدمة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* إحصائيات سريعة محسنة */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">{filteredOpportunities.length}</p>
                      <p className="text-blue-100 text-sm">فرص متاحة</p>
                    </div>
                    <Building2 className="w-10 h-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">$4.2M</p>
                      <p className="text-green-100 text-sm">إجمالي الاستثمارات</p>
                    </div>
                    <DollarSign className="w-10 h-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">317</p>
                      <p className="text-purple-100 text-sm">مستثمرون نشطون</p>
                    </div>
                    <Users className="w-10 h-10 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">32%</p>
                      <p className="text-orange-100 text-sm">متوسط العائد</p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* قائمة الفرص الاستثمارية المحسنة */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
              {filteredOpportunities.map((opportunity) => (
                <InvestmentOpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onInvest={handleInvest}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </TabsContent>

          {/* تبويب المحفظة المحسن */}
          <TabsContent value="portfolio" className="space-y-8">
            <InvestmentStats {...portfolioStats} />

            {/* الاستثمارات النشطة */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">الاستثمارات النشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {investmentOpportunities.slice(0, 3).map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between p-6 border rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{investment.name}</h4>
                          <p className="text-gray-500">{investment.sector}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600">عائد {investment.roi}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-xl">${(investment.minInvestment * 2).toLocaleString()}</p>
                        <p className="text-lg text-green-600 font-medium">+15.8%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب إنشاء شركة */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إنشاء شركة جديدة للاستثمار</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">إطلاق شركتك الاستثمارية</h3>
                  <p className="text-gray-600 mb-6">
                    أنشئ شركة جديدة واجمع التمويل من المستثمرين
                  </p>
                  <Button size="lg" className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    إنشاء شركة جديدة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* خطوات الإنشاء */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">1. إعداد خطة العمل</h3>
                  <p className="text-sm text-gray-600">قم بكتابة خطة عمل شاملة ومقنعة للمستثمرين</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">2. تحديد التمويل</h3>
                  <p className="text-sm text-gray-600">حدد مبلغ التمويل المطلوب ونسبة الأسهم المعروضة</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">3. جذب المستثمرين</h3>
                  <p className="text-sm text-gray-600">انشر مشروعك واجذب المستثمرين المهتمين</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* تبويب التحليلات */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>أداء القطاعات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sectors.slice(0, 5).map((sector, index) => {
                      const performance = [25, 18, 22, 15, 30][index];
                      return (
                        <div key={sector} className="flex items-center justify-between">
                          <span className="text-sm">{sector}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${performance * 2}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{performance}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>المستثمرون الأكثر نشاطاً</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'أحمد محمد', investments: 8, amount: 125000 },
                      { name: 'فاطمة أحمد', investments: 6, amount: 98000 },
                      { name: 'محمد علي', investments: 5, amount: 85000 },
                      { name: 'نور حسن', investments: 4, amount: 72000 }
                    ].map((investor, index) => (
                      <div key={investor.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{investor.name}</p>
                            <p className="text-sm text-gray-500">{investor.investments} استثمارات</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${investor.amount.toLocaleString()}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-gray-500">مستثمر مميز</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestmentPortal;
