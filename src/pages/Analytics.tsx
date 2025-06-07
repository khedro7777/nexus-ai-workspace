
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
import { useAnalyticsData } from '@/hooks/useAnalyticsData';
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
  const { data, loading, timeRange, updateTimeRange, exportData } = useAnalyticsData();

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  const kpiData = [
    {
      title: 'إجمالي المجموعات',
      value: data.overview.totalGroups.toString(),
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      description: 'مجموعات نشطة ومكتملة'
    },
    {
      title: 'قيمة التوفير',
      value: `${(data.overview.totalSavings / 1000000).toFixed(1)}M ر.س`,
      change: '+24%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'إجمالي التوفير المحقق'
    },
    {
      title: 'المفاوضات النشطة',
      value: data.overview.activeNegotiations.toString(),
      change: '+8%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'مفاوضات قيد التنفيذ'
    },
    {
      title: 'معدل النجاح',
      value: `${data.performanceMetrics.successRate}%`,
      change: '+3%',
      changeType: 'positive' as const,
      icon: Target,
      description: 'نسبة المجموعات المكتملة بنجاح'
    }
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
            <Select value={timeRange} onValueChange={updateTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">أسبوع واحد</SelectItem>
                <SelectItem value="month">شهر واحد</SelectItem>
                <SelectItem value="quarter">3 أشهر</SelectItem>
                <SelectItem value="year">سنة واحدة</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              className="flex items-center gap-2"
              onClick={() => exportData('pdf')}
            >
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
              <AreaChart data={data.chartData}>
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
                  data={data.categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
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
              <LineChart data={data.chartData}>
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
              <BarChart data={[
                { metric: 'سرعة التفاوض', current: data.performanceMetrics.avgNegotiationTime, target: 15 },
                { metric: 'معدل النجاح', current: data.performanceMetrics.successRate, target: 90 },
                { metric: 'رضا المستخدمين', current: data.performanceMetrics.userSatisfaction * 20, target: 100 },
                { metric: 'تقليل التكلفة', current: data.performanceMetrics.costReduction, target: 30 }
              ]} layout="horizontal">
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
          <div className="space-y-4">
            {data.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'deal_completed' ? 'bg-green-500' :
                    activity.type === 'group_created' ? 'bg-blue-500' : 'bg-purple-500'
                  }`} />
                  <span className="text-sm font-medium">{activity.description}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>
    </div>
  );
};

export default Analytics;
