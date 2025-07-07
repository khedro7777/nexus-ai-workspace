
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  Lightbulb, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  Target,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'group' | 'supplier' | 'product' | 'timing' | 'strategy';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  potentialSavings?: number;
  actionRequired: string;
  deadline?: string;
}

interface MarketInsight {
  category: string;
  trend: 'up' | 'down' | 'stable';
  priceChange: number;
  recommendation: string;
  confidence: number;
}

const SmartRecommendations: React.FC = () => {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل التوصيات الذكية
    const loadRecommendations = async () => {
      setLoading(true);
      
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockRecommendations: Recommendation[] = [
        {
          id: '1',
          type: 'group',
          title: 'إنشاء مجموعة للمعدات الإلكترونية',
          description: 'بناءً على تحليل البيانات، هناك طلب كبير على المعدات الإلكترونية. إنشاء مجموعة الآن يمكن أن يحقق توفيراً كبيراً.',
          impact: 'high',
          confidence: 92,
          potentialSavings: 35000,
          actionRequired: 'إنشاء مجموعة جديدة',
          deadline: '2024-01-20'
        },
        {
          id: '2',
          type: 'supplier',
          title: 'تغيير مورد المواد الغذائية',
          description: 'تم اكتشاف مورد جديد يقدم نفس الجودة بأسعار أقل بنسبة 15%',
          impact: 'medium',
          confidence: 78,
          potentialSavings: 12000,
          actionRequired: 'تقييم المورد الجديد'
        },
        {
          id: '3',
          type: 'timing',
          title: 'أفضل وقت للشراء - الأسبوع القادم',
          description: 'تشير التوقعات إلى انخفاض أسعار المعدات الطبية بنسبة 8% الأسبوع القادم',
          impact: 'high',
          confidence: 85,
          potentialSavings: 18000,
          actionRequired: 'تأجيل المفاوضات',
          deadline: '2024-01-15'
        },
        {
          id: '4',
          type: 'strategy',
          title: 'دمج مجموعتين لقوة شرائية أكبر',
          description: 'دمج مجموعة معدات المكاتب ومجموعة الأثاث يمكن أن يزيد القوة الشرائية',
          impact: 'medium',
          confidence: 71,
          potentialSavings: 8500,
          actionRequired: 'مناقشة مع قادة المجموعات'
        }
      ];

      const mockInsights: MarketInsight[] = [
        {
          category: 'المعدات الطبية',
          trend: 'down',
          priceChange: -12,
          recommendation: 'وقت ممتاز للشراء',
          confidence: 89
        },
        {
          category: 'المواد الغذائية',
          trend: 'up',
          priceChange: 8,
          recommendation: 'تأجيل الشراء إن أمكن',
          confidence: 76
        },
        {
          category: 'معدات المكاتب',
          trend: 'stable',
          priceChange: 2,
          recommendation: 'أسعار مستقرة - يمكن الشراء',
          confidence: 82
        }
      ];

      setRecommendations(mockRecommendations);
      setMarketInsights(mockInsights);
      setLoading(false);
    };

    loadRecommendations();
  }, []);

  const getImpactColor = (impact: Recommendation['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      default:
        return 'bg-green-500';
    }
  };

  const getImpactText = (impact: Recommendation['impact']) => {
    switch (impact) {
      case 'high':
        return 'تأثير عالي';
      case 'medium':
        return 'تأثير متوسط';
      default:
        return 'تأثير منخفض';
    }
  };

  const getTrendIcon = (trend: MarketInsight['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-green-500 transform rotate-180" />;
      default:
        return <Target className="w-4 h-4 text-blue-500" />;
    }
  };

  const implementRecommendation = (recommendation: Recommendation) => {
    toast({
      title: "تنفيذ التوصية",
      description: `جاري تنفيذ التوصية: ${recommendation.title}`,
    });

    // منطق تنفيذ التوصية
    setTimeout(() => {
      toast({
        title: "تم تنفيذ التوصية",
        description: "تم تنفيذ التوصية بنجاح وسيتم متابعة النتائج",
      });
    }, 2000);
  };

  const dismissRecommendation = (id: string) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
    toast({
      title: "تم إزالة التوصية",
      description: "تم إزالة التوصية من القائمة",
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            التوصيات الذكية
          </h2>
          <p className="text-gray-600 mt-1">توصيات مدعومة بالذكاء الاصطناعي لتحسين أدائك</p>
        </div>
        <Button variant="outline">
          تحديث التوصيات
        </Button>
      </div>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            رؤى السوق
          </CardTitle>
          <CardDescription>
            تحليل اتجاهات السوق والأسعار في الوقت الفعلي
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketInsights.map((insight, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{insight.category}</h3>
                  {getTrendIcon(insight.trend)}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">تغيير السعر:</span>
                    <span className={`font-semibold ${insight.priceChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {insight.priceChange > 0 ? '+' : ''}{insight.priceChange}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{insight.recommendation}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500">الثقة:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{insight.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          التوصيات الشخصية
        </h3>
        
        {recommendations.map((rec) => (
          <Alert key={rec.id} className="border-l-4 border-l-blue-500">
            <div className="flex items-start justify-between w-full">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold">{rec.title}</h4>
                  <Badge className={`${getImpactColor(rec.impact)} text-white text-xs`}>
                    {getImpactText(rec.impact)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-gray-600">{rec.confidence}%</span>
                  </div>
                </div>
                
                <AlertDescription className="mb-3">
                  {rec.description}
                </AlertDescription>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <ShoppingCart className="w-4 h-4" />
                    <span>الإجراء: {rec.actionRequired}</span>
                  </div>
                  {rec.potentialSavings && (
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 font-semibold">
                        توفير محتمل: ₪{rec.potentialSavings.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {rec.deadline && (
                    <div className="text-orange-600">
                      الموعد النهائي: {rec.deadline}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => implementRecommendation(rec)}
                    className="flex items-center gap-1"
                  >
                    تنفيذ
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => dismissRecommendation(rec.id)}
                  >
                    تجاهل
                  </Button>
                </div>
              </div>
            </div>
          </Alert>
        ))}
      </div>

      {recommendations.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد توصيات جديدة</h3>
            <p className="text-gray-500">سنقوم بإعلامك عند توفر توصيات جديدة</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartRecommendations;
