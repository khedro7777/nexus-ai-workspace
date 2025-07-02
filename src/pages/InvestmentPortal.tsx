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

const InvestmentPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');

  // بيانات الاستثمارات الوهمية - سيتم استبدالها ببيانات حقيقية
  const investmentOpportunities = [
    {
      id: 1,
      name: 'شركة التقنيات المتقدمة',
      sector: 'التكنولوجيا',
      fundingGoal: 500000,
      raisedAmount: 320000,
      investors: 45,
      roi: 25,
      risk: 'متوسط',
      status: 'نشط',
      deadline: '2025-08-15',
      description: 'شركة متخصصة في تطوير حلول الذكاء الاصطناعي للشركات',
      minInvestment: 5000,
      shares: 20,
      country: 'الإمارات'
    },
    {
      id: 2,
      name: 'مجموعة الأغذية العضوية',
      sector: 'الأغذية',
      fundingGoal: 300000,
      raisedAmount: 180000,
      investors: 28,
      roi: 18,
      risk: 'منخفض',
      status: 'نشط',
      deadline: '2025-07-30',
      description: 'إنتاج وتوزيع الأغذية العضوية عالية الجودة',
      minInvestment: 3000,
      shares: 15,
      country: 'السعودية'
    },
    {
      id: 3,
      name: 'منصة التجارة الإلكترونية',
      sector: 'التجارة الإلكترونية',
      fundingGoal: 750000,
      raisedAmount: 750000,
      investors: 62,
      roi: 30,
      risk: 'عالي',
      status: 'مكتمل',
      deadline: '2025-06-01',
      description: 'منصة تجارة إلكترونية متخصصة في الأسواق الناشئة',
      minInvestment: 8000,
      shares: 25,
      country: 'مصر'
    }
  ];

  // إحصائيات المحفظة الشخصية
  const portfolioStats = {
    totalInvested: 45000,
    currentValue: 52000,
    totalReturn: 7000,
    returnPercentage: 15.6,
    activeInvestments: 5,
    companies: 3
  };

  const sectors = ['التكنولوجيا', 'الأغذية', 'العقارات', 'الصحة', 'التجارة الإلكترونية', 'الطاقة'];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'منخفض': return 'bg-green-100 text-green-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'عالي': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-blue-100 text-blue-800';
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'منتهي': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOpportunities = investmentOpportunities.filter(opp => {
    const matchesSearch = opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = !selectedSector || opp.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* رأس البوابة */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <TrendingUp className="w-8 h-8" />
            بوابة الاستثمار
          </h1>
          <p className="text-gray-600">استثمر في الشركات الناشئة والمشاريع المبتكرة</p>
        </div>

        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="opportunities">الفرص الاستثمارية</TabsTrigger>
            <TabsTrigger value="portfolio">محفظتي</TabsTrigger>
            <TabsTrigger value="create">إنشاء شركة</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          </TabsList>

          {/* تبويب الفرص الاستثمارية */}
          <TabsContent value="opportunities" className="space-y-6">
            {/* فلاتر البحث */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="ابحث في الفرص الاستثمارية..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="جميع القطاعات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">جميع القطاعات</SelectItem>
                      {sectors.map(sector => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    فلترة متقدمة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                      <p className="text-gray-600 text-sm">فرص نشطة</p>
                    </div>
                    <Building2 className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">$2.1M</p>
                      <p className="text-gray-600 text-sm">إجمالي الاستثمارات</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">156</p>
                      <p className="text-gray-600 text-sm">مستثمرون نشطون</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">23%</p>
                      <p className="text-gray-600 text-sm">متوسط العائد</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* قائمة الفرص الاستثمارية */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => {
                const progressPercentage = (opportunity.raisedAmount / opportunity.fundingGoal) * 100;
                const daysLeft = Math.ceil((new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <Card key={opportunity.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg leading-tight">{opportunity.name}</CardTitle>
                        <div className="flex flex-col gap-1">
                          <Badge className={getStatusColor(opportunity.status)}>
                            {opportunity.status}
                          </Badge>
                          <Badge className={getRiskColor(opportunity.risk)}>
                            {opportunity.risk}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{opportunity.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* شريط التقدم */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>التمويل المحقق</span>
                          <span>{progressPercentage.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>${opportunity.raisedAmount.toLocaleString()}</span>
                          <span>${opportunity.fundingGoal.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* المعلومات الأساسية */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">القطاع:</span>
                          <p className="font-medium">{opportunity.sector}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">الدولة:</span>
                          <p className="font-medium">{opportunity.country}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">المستثمرون:</span>
                          <p className="font-medium">{opportunity.investors}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">العائد المتوقع:</span>
                          <p className="font-medium text-green-600">{opportunity.roi}%</p>
                        </div>
                      </div>

                      {/* معلومات الاستثمار */}
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">الحد الأدنى:</span>
                          <span className="font-medium">${opportunity.minInvestment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">الأسهم المتاحة:</span>
                          <span className="font-medium">{opportunity.shares}%</span>
                        </div>
                        {daysLeft > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">المدة المتبقية:</span>
                            <span className="font-medium">{daysLeft} يوم</span>
                          </div>
                        )}
                      </div>

                      {/* أزرار الإجراءات */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          className="flex-1" 
                          disabled={opportunity.status === 'مكتمل'}
                        >
                          استثمر الآن
                        </Button>
                        <Button variant="outline" size="sm">
                          التفاصيل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* تبويب المحفظة */}
          <TabsContent value="portfolio" className="space-y-6">
            {/* نظرة عامة على المحفظة */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">${portfolioStats.totalInvested.toLocaleString()}</p>
                      <p className="text-gray-600 text-sm">إجمالي الاستثمارات</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">${portfolioStats.currentValue.toLocaleString()}</p>
                      <p className="text-gray-600 text-sm">القيمة الحالية</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-600">+${portfolioStats.totalReturn.toLocaleString()}</p>
                      <p className="text-gray-600 text-sm">إجمالي الأرباح</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-600">+{portfolioStats.returnPercentage}%</p>
                      <p className="text-gray-600 text-sm">العائد الإجمالي</p>
                    </div>
                    <Target className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* الاستثمارات النشطة */}
            <Card>
              <CardHeader>
                <CardTitle>الاستثمارات النشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investmentOpportunities.slice(0, 3).map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{investment.name}</h4>
                          <p className="text-sm text-gray-500">{investment.sector}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(investment.minInvestment * 2).toLocaleString()}</p>
                        <p className="text-sm text-green-600">+12.5%</p>
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