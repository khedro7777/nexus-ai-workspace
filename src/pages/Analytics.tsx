
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart,
  FileText,
  Clock,
  Target,
  Download
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AnalyticsCard from '@/components/analytics/AnalyticsCard';
import ChartContainer from '@/components/analytics/ChartContainer';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const Analytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('6months');

  const kpiData = [
    {
      title: 'إجمالي المجموعات',
      value: '124',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      description: 'مجموعات نشطة ومكتملة'
    },
    {
      title: 'قيمة التوفير',
      value: '2.8M ر.س',
      change: '+24%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'إجمالي التوفير المحقق'
    },
    {
      title: 'المفاوضات النشطة',
      value: '18',
      change: '+8%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'مفاوضات قيد التنفيذ'
    },
    {
      title: 'معدل النجاح',
      value: '87%',
      change: '+3%',
      changeType: 'positive' as const,
      icon: Target,
      description: 'نسبة المجموعات المكتملة بنجاح'
    }
  ];

  const monthlyData = [
    { month: 'يناير', groups: 8, savings: 450000, negotiations: 12 },
    { month: 'فبراير', groups: 12, savings: 620000, negotiations: 15 },
    { month: 'مارس', groups: 15, savings: 780000, negotiations: 18 },
    { month: 'أبريل', groups: 18, savings: 890000, negotiations: 22 },
    { month: 'مايو', groups: 22, savings: 1100000, negotiations: 25 },
    { month: 'يونيو', groups: 25, savings: 1250000, negotiations: 28 }
  ];

  const sectorData = [
    { name: 'تكنولوجيا', value: 35, color: '#3B82F6' },
    { name: 'إنشاءات', value: 25, color: '#10B981' },
    { name: 'أغذية', value: 20, color: '#F59E0B' },
    { name: 'صحة', value: 15, color: '#EF4444' },
    { name: 'أخرى', value: 5, color: '#8B5CF6' }
  ];

  const performanceData = [
    { metric: 'سرعة التكوين', current: 85, target: 90 },
    { metric: 'رضا المستخدمين', current: 92, target: 95 },
    { metric: 'معدل الإتمام', current: 87, target: 90 },
    { metric: 'جودة المفاوضات', current: 91, target: 95 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">التحليلات والتقارير</h1>
            <p className="text-gray-600">رؤى شاملة حول أداء المنصة والمجموعات</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">شهر واحد</SelectItem>
                <SelectItem value="3months">3 أشهر</SelectItem>
                <SelectItem value="6months">6 أشهر</SelectItem>
                <SelectItem value="1year">سنة واحدة</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              تصدير التقرير
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <AnalyticsCard key={index} {...kpi} />
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trends */}
          <ChartContainer 
            title="اتجاهات النمو الشهرية"
            description="تطور المجموعات والتوفير عبر الأشهر"
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="groups" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.6}
                  name="المجموعات"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Sector Distribution */}
          <ChartContainer 
            title="توزيع القطاعات"
            description="نسبة المجموعات حسب القطاع"
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Savings Over Time */}
          <ChartContainer 
            title="التوفير المتراكم"
            description="إجمالي التوفير المحقق عبر الوقت"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${Number(value).toLocaleString()} ر.س`, 'التوفير']}
                />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Performance Metrics */}
          <ChartContainer 
            title="مؤشرات الأداء"
            description="الأداء الحالي مقابل الأهداف المحددة"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="metric" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="current" fill="#3B82F6" name="الحالي" />
                <Bar dataKey="target" fill="#E5E7EB" name="الهدف" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Recent Activity Summary */}
        <ChartContainer 
          title="ملخص النشاط الأخير"
          description="آخر الأحداث والإنجازات في المنصة"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <ShoppingCart className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">مجموعات جديدة</h3>
              <p className="text-3xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-600">في آخر 30 يوماً</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">عقود مكتملة</h3>
              <p className="text-3xl font-bold text-green-600">8</p>
              <p className="text-sm text-gray-600">في آخر 30 يوماً</p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">متوسط وقت التنفيذ</h3>
              <p className="text-3xl font-bold text-purple-600">18</p>
              <p className="text-sm text-gray-600">يوماً</p>
            </div>
          </div>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Analytics;
