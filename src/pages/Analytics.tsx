
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, FileText, Target, Calendar, Download } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const Analytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const monthlyData = [
    { month: 'يناير', groups: 12, contracts: 8, savings: 45000 },
    { month: 'فبراير', groups: 18, contracts: 12, savings: 67000 },
    { month: 'مارس', groups: 15, contracts: 10, savings: 52000 },
    { month: 'أبريل', groups: 22, contracts: 16, savings: 78000 },
    { month: 'مايو', groups: 28, contracts: 20, savings: 89000 },
    { month: 'يونيو', groups: 25, contracts: 18, savings: 82000 }
  ];

  const categoryData = [
    { name: 'إلكترونيات', value: 35, color: '#3B82F6' },
    { name: 'مواد البناء', value: 25, color: '#10B981' },
    { name: 'مواد غذائية', value: 20, color: '#F59E0B' },
    { name: 'ملابس', value: 12, color: '#EF4444' },
    { name: 'أثاث', value: 8, color: '#8B5CF6' }
  ];

  const performanceData = [
    { metric: 'معدل نجاح التفاوض', value: 89, target: 85, trend: 'up' },
    { metric: 'متوسط التوفير', value: 23, target: 20, trend: 'up' },
    { metric: 'رضا الأعضاء', value: 94, target: 90, trend: 'up' },
    { metric: 'زمن إتمام العقود', value: 18, target: 21, trend: 'down' }
  ];

  const topSuppliers = [
    { name: 'شركة الإمداد المتميز', orders: 45, rating: 4.8, savings: '12%' },
    { name: 'مجموعة التجارة الذكية', orders: 38, rating: 4.6, savings: '15%' },
    { name: 'شركة الأغذية الطازجة', orders: 32, rating: 4.9, savings: '18%' },
    { name: 'التوريد الذكي المحدودة', orders: 28, rating: 4.5, savings: '10%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">التحليلات</h1>
            <p className="text-gray-600">تحليل شامل لأداء المنصة والمجموعات</p>
          </div>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            تصدير التقرير
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                  <p className="text-gray-600 text-sm">إجمالي المجموعات</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm">+12%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">89</p>
                  <p className="text-gray-600 text-sm">العقود المكتملة</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm">+8%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">2.4M</p>
                  <p className="text-gray-600 text-sm">إجمالي التوفير (ر.س)</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm">+25%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">23%</p>
                  <p className="text-gray-600 text-sm">متوسط التوفير</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm">+3%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>الاتجاهات الشهرية</CardTitle>
              <CardDescription>تطور المجموعات والعقود والتوفير</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="groups" stroke="#3B82F6" name="المجموعات" />
                  <Line type="monotone" dataKey="contracts" stroke="#10B981" name="العقود" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>توزيع الفئات</CardTitle>
              <CardDescription>توزيع المجموعات حسب الفئة</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Performance Indicators */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
            <CardDescription>متابعة الأهداف والمؤشرات المهمة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceData.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{item.metric}</h4>
                    {item.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">{item.value}%</span>
                      <span className="text-sm text-gray-500">هدف: {item.target}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.value >= item.target ? 'bg-green-500' : 'bg-yellow-500'}`}
                        style={{ width: `${Math.min(item.value, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Suppliers */}
        <Card>
          <CardHeader>
            <CardTitle>أفضل الموردين</CardTitle>
            <CardDescription>الموردين الأكثر تعاملاً ونجاحاً</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSuppliers.map((supplier, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{supplier.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{supplier.orders} طلب</span>
                        <span>تقييم: {supplier.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    توفير {supplier.savings}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
