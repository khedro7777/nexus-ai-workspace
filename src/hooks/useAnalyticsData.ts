
import { useState, useEffect } from 'react';

export interface AnalyticsData {
  overview: {
    totalGroups: number;
    totalSavings: number;
    activeNegotiations: number;
    completedDeals: number;
  };
  chartData: Array<{
    month: string;
    savings: number;
    groups: number;
    deals: number;
  }>;
  categoryData: Array<{
    category: string;
    value: number;
    percentage: number;
  }>;
  performanceMetrics: {
    avgNegotiationTime: number;
    successRate: number;
    userSatisfaction: number;
    costReduction: number;
  };
  recentActivity: Array<{
    id: string;
    type: 'group_created' | 'deal_completed' | 'negotiation_started';
    description: string;
    timestamp: string;
    value?: number;
  }>;
}

export const useAnalyticsData = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setData({
        overview: {
          totalGroups: 124,
          totalSavings: 2850000,
          activeNegotiations: 18,
          completedDeals: 89
        },
        chartData: [
          { month: 'يناير', savings: 450000, groups: 15, deals: 12 },
          { month: 'فبراير', savings: 520000, groups: 18, deals: 15 },
          { month: 'مارس', savings: 380000, groups: 12, deals: 10 },
          { month: 'أبريل', savings: 670000, groups: 22, deals: 18 },
          { month: 'مايو', savings: 590000, groups: 20, deals: 16 },
          { month: 'يونيو', savings: 740000, groups: 25, deals: 21 }
        ],
        categoryData: [
          { category: 'تقنية المعلومات', value: 1200000, percentage: 42 },
          { category: 'الخدمات', value: 680000, percentage: 24 },
          { category: 'التصنيع', value: 520000, percentage: 18 },
          { category: 'النقل', value: 280000, percentage: 10 },
          { category: 'أخرى', value: 170000, percentage: 6 }
        ],
        performanceMetrics: {
          avgNegotiationTime: 12,
          successRate: 87,
          userSatisfaction: 4.6,
          costReduction: 23
        },
        recentActivity: [
          {
            id: 'ACT-001',
            type: 'deal_completed',
            description: 'تم إكمال صفقة تطوير النظام بقيمة 45,000 ريال',
            timestamp: '2024-01-15 14:30',
            value: 45000
          },
          {
            id: 'ACT-002',
            type: 'group_created',
            description: 'تم إنشاء مجموعة جديدة لشراء معدات المكاتب',
            timestamp: '2024-01-15 12:15'
          },
          {
            id: 'ACT-003',
            type: 'negotiation_started',
            description: 'بدأت مفاوضات جديدة مع مورد الخدمات اللوجستية',
            timestamp: '2024-01-15 10:45'
          }
        ]
      });
      
      setLoading(false);
    };

    fetchData();
  }, [timeRange]);

  const updateTimeRange = (range: typeof timeRange) => {
    setTimeRange(range);
  };

  const exportData = (format: 'pdf' | 'excel') => {
    console.log(`Exporting data as ${format}`);
    // هنا يتم تنفيذ منطق التصدير الفعلي
  };

  return {
    data,
    loading,
    timeRange,
    updateTimeRange,
    exportData
  };
};
