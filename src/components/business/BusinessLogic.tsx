
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';

interface BusinessMetrics {
  totalGroups: number;
  activeNegotiations: number;
  completedDeals: number;
  totalSavings: number;
  averageDiscount: number;
  memberSatisfaction: number;
}

interface GroupPerformance {
  id: string;
  name: string;
  members: number;
  status: 'forming' | 'negotiating' | 'contracting' | 'completed';
  progress: number;
  expectedSavings: number;
  actualSavings?: number;
}

const BusinessLogic: React.FC = () => {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<BusinessMetrics>({
    totalGroups: 24,
    activeNegotiations: 8,
    completedDeals: 16,
    totalSavings: 125000,
    averageDiscount: 18.5,
    memberSatisfaction: 94.2
  });

  const [groupPerformances, setGroupPerformances] = useState<GroupPerformance[]>([
    {
      id: '1',
      name: 'مجموعة المعدات الطبية',
      members: 15,
      status: 'completed',
      progress: 100,
      expectedSavings: 25000,
      actualSavings: 28500
    },
    {
      id: '2',
      name: 'مجموعة المواد الغذائية',
      members: 32,
      status: 'negotiating',
      progress: 65,
      expectedSavings: 18000
    },
    {
      id: '3',
      name: 'مجموعة معدات المكاتب',
      members: 8,
      status: 'forming',
      progress: 30,
      expectedSavings: 12000
    }
  ]);

  const getStatusColor = (status: GroupPerformance['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'negotiating':
        return 'bg-blue-500';
      case 'contracting':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: GroupPerformance['status']) => {
    switch (status) {
      case 'completed':
        return 'مكتملة';
      case 'negotiating':
        return 'قيد التفاوض';
      case 'contracting':
        return 'قيد التعاقد';
      default:
        return 'قيد التكوين';
    }
  };

  const calculateROI = useCallback((expected: number, actual?: number) => {
    if (actual) {
      return ((actual - expected) / expected * 100).toFixed(1);
    }
    return null;
  }, []);

  const optimizeGroupStrategy = useCallback((groupId: string) => {
    toast({
      title: "تحسين استراتيجية المجموعة",
      description: "جاري تحليل البيانات وتحسين استراتيجية المجموعة...",
    });

    // منطق تحسين المجموعة
    setTimeout(() => {
      toast({
        title: "تم تحسين الاستراتيجية",
        description: "تم تحديث استراتيجية المجموعة بناءً على التحليل",
      });
    }, 2000);
  }, [toast]);

  const predictMarketTrends = useCallback(() => {
    toast({
      title: "تحليل اتجاهات السوق",
      description: "جاري تحليل اتجاهات السوق والتنبؤ بالفرص...",
    });

    // منطق التنبؤ بالسوق
    setTimeout(() => {
      toast({
        title: "تحليل السوق مكتمل",
        description: "تم تحديد 3 فرص جديدة للشراء الجماعي",
      });
    }, 3000);
  }, [toast]);

  return (
    <div className="space-y-6">
      {/* Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المجموعات</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.totalGroups}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مفاوضات نشطة</p>
                <p className="text-2xl font-bold text-orange-600">{metrics.activeNegotiations}</p>
              </div>
              <Activity className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">صفقات مكتملة</p>
                <p className="text-2xl font-bold text-green-600">{metrics.completedDeals}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي التوفير</p>
                <p className="text-2xl font-bold text-purple-600">₪{metrics.totalSavings.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">متوسط الخصم</p>
                <p className="text-2xl font-bold text-indigo-600">{metrics.averageDiscount}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">رضا الأعضاء</p>
                <p className="text-2xl font-bold text-pink-600">{metrics.memberSatisfaction}%</p>
              </div>
              <Target className="w-8 h-8 text-pink-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            رؤى ذكية مدعومة بالذكاء الاصطناعي
          </CardTitle>
          <CardDescription>
            تحليلات وتوصيات لتحسين أداء مجموعاتك
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              مجموعة المواد الغذائية تحتاج إلى 5 أعضاء إضافيين للوصول للحد الأدنى المطلوب للتفاوض الفعال
            </AlertDescription>
          </Alert>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              فرصة ممتازة: أسعار المعدات الطبية انخفضت بنسبة 12% هذا الشهر - الوقت مناسب لبدء مجموعة جديدة
            </AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <Button onClick={predictMarketTrends} className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              تحليل اتجاهات السوق
            </Button>
            <Button variant="outline">
              إنشاء تقرير تفصيلي
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Group Performance */}
      <Card>
        <CardHeader>
          <CardTitle>أداء المجموعات</CardTitle>
          <CardDescription>
            متابعة أداء المجموعات والتوفير المحقق
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {groupPerformances.map((group) => (
              <div key={group.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{group.name}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600">{group.members} عضو</span>
                      <Badge className={`${getStatusColor(group.status)} text-white text-xs`}>
                        {getStatusText(group.status)}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => optimizeGroupStrategy(group.id)}
                  >
                    تحسين الاستراتيجية
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>التقدم</span>
                    <span>{group.progress}%</span>
                  </div>
                  <Progress value={group.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <span className="text-gray-600">التوفير المتوقع:</span>
                    <span className="font-semibold mr-2">₪{group.expectedSavings.toLocaleString()}</span>
                  </div>
                  {group.actualSavings && (
                    <div>
                      <span className="text-gray-600">التوفير الفعلي:</span>
                      <span className="font-semibold mr-2 text-green-600">
                        ₪{group.actualSavings.toLocaleString()}
                      </span>
                      {calculateROI(group.expectedSavings, group.actualSavings) && (
                        <Badge variant="outline" className="mr-2 text-green-600">
                          +{calculateROI(group.expectedSavings, group.actualSavings)}%
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessLogic;
