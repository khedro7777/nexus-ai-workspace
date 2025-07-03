
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3,
  Plus,
  Eye,
  Download,
  Calendar,
  Target
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  name: string;
  type: 'investment' | 'project' | 'contract';
  value: number;
  change: number;
  changePercent: number;
  status: 'active' | 'completed' | 'pending';
  lastUpdated: string;
  description: string;
}

interface PortfolioSummary {
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
  activeInvestments: number;
  completedProjects: number;
  monthlyReturn: number;
}

const PortfolioManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const portfolioSummary: PortfolioSummary = {
    totalValue: 450000,
    totalGain: 67500,
    totalGainPercent: 17.6,
    activeInvestments: 8,
    completedProjects: 12,
    monthlyReturn: 8.2
  };

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'PI-001',
      name: 'مشروع التجارة الإلكترونية',
      type: 'investment',
      value: 125000,
      change: 15000,
      changePercent: 13.6,
      status: 'active',
      lastUpdated: '2024-01-15',
      description: 'استثمار في منصة التجارة الإلكترونية'
    },
    {
      id: 'PI-002',
      name: 'عقد تطوير التطبيق',
      type: 'contract',
      value: 85000,
      change: -5000,
      changePercent: -5.6,
      status: 'active',
      lastUpdated: '2024-01-14',
      description: 'عقد تطوير تطبيق جوال'
    },
    {
      id: 'PI-003',
      name: 'مشروع العقارات',
      type: 'project',
      value: 240000,
      change: 32000,
      changePercent: 15.4,
      status: 'completed',
      lastUpdated: '2024-01-10',
      description: 'مشروع تطوير عقاري مكتمل'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'investment': return <TrendingUp className="w-4 h-4" />;
      case 'contract': return <PieChart className="w-4 h-4" />;
      case 'project': return <BarChart3 className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'investment': return 'استثمار';
      case 'contract': return 'عقد';
      case 'project': return 'مشروع';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* ملخص المحفظة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-900">${portfolioSummary.totalValue.toLocaleString()}</p>
                <p className="text-blue-700 text-sm">إجمالي القيمة</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-900">+${portfolioSummary.totalGain.toLocaleString()}</p>
                <p className="text-green-700 text-sm">إجمالي الأرباح ({portfolioSummary.totalGainPercent}%)</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-900">{portfolioSummary.activeInvestments}</p>
                <p className="text-purple-700 text-sm">استثمارات نشطة</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-900">{portfolioSummary.monthlyReturn}%</p>
                <p className="text-orange-700 text-sm">العائد الشهري</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="investments">الاستثمارات</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزيع المحفظة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>الاستثمارات</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>المشاريع</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>العقود</span>
                      <span>20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الأداء الأخير</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">آخر 30 يوم</span>
                    </div>
                    <span className="text-green-600 font-bold">+8.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">آخر 3 أشهر</span>
                    </div>
                    <span className="text-blue-600 font-bold">+24.7%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium">العام الحالي</span>
                    </div>
                    <span className="text-purple-600 font-bold">+17.6%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>عناصر المحفظة</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 ml-1" />
                  إضافة استثمار
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(item.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {getTypeText(item.type)}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status === 'active' ? 'نشط' :
                           item.status === 'completed' ? 'مكتمل' : 'معلق'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-lg font-bold">${item.value.toLocaleString()}</span>
                        </div>
                        <div className={`flex items-center gap-1 ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span className="font-medium">
                            {item.change >= 0 ? '+' : ''}${item.change.toLocaleString()} ({item.changePercent >= 0 ? '+' : ''}{item.changePercent}%)
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-2">
                      آخر تحديث: {item.lastUpdated}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليل الأداء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">تحليل الأداء المفصل</h3>
                <p className="text-gray-600">ستظهر رسوم بيانية مفصلة للأداء هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>التقارير المالية</CardTitle>
                <Button size="sm">
                  <Download className="w-4 h-4 ml-1" />
                  تصدير تقرير
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="font-medium">تقرير شهري - يناير 2024</h3>
                        <p className="text-sm text-gray-600">ملخص الأداء والاستثمارات</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                      <div>
                        <h3 className="font-medium">تقرير ربعي - Q1 2024</h3>
                        <p className="text-sm text-gray-600">تحليل مفصل للعوائد</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioManagement;
