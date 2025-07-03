
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Star, 
  Gift, 
  ShoppingCart, 
  Award, 
  TrendingUp,
  Clock,
  Plus,
  Minus,
  RefreshCw,
  Crown
} from 'lucide-react';

interface PointsTransaction {
  id: string;
  type: 'earned' | 'spent' | 'bonus' | 'penalty';
  amount: number;
  description: string;
  date: string;
  reference?: string;
}

interface PointsReward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: string;
  available: boolean;
  image?: string;
}

interface UserPointsData {
  totalPoints: number;
  availablePoints: number;
  earnedThisMonth: number;
  spentThisMonth: number;
  level: number;
  nextLevelPoints: number;
  transactions: PointsTransaction[];
}

const PointsSystem = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userPoints: UserPointsData = {
    totalPoints: 2850,
    availablePoints: 1200,
    earnedThisMonth: 450,
    spentThisMonth: 200,
    level: 3,
    nextLevelPoints: 3500,
    transactions: [
      {
        id: 'T-001',
        type: 'earned',
        amount: 100,
        description: 'مكافأة إكمال مشروع',
        date: '2024-01-15',
        reference: 'PRJ-001'
      },
      {
        id: 'T-002',
        type: 'spent',
        amount: -50,
        description: 'شراء خدمة استشارية',
        date: '2024-01-14',
        reference: 'SRV-005'
      },
      {
        id: 'T-003',
        type: 'bonus',
        amount: 200,
        description: 'مكافأة العضوية الشهرية',
        date: '2024-01-10',
      },
      {
        id: 'T-004',
        type: 'earned',
        amount: 75,
        description: 'إحالة عضو جديد',
        date: '2024-01-08',
        reference: 'REF-012'
      }
    ]
  };

  const rewards: PointsReward[] = [
    {
      id: 'R-001',
      title: 'استشارة قانونية مجانية',
      description: 'جلسة استشارة قانونية لمدة ساعة مع خبير معتمد',
      pointsCost: 500,
      category: 'خدمات',
      available: true
    },
    {
      id: 'R-002',
      title: 'مراجعة عقد مجانية',
      description: 'مراجعة وتحليل عقد من قبل محامٍ متخصص',
      pointsCost: 300,
      category: 'خدمات',
      available: true
    },
    {
      id: 'R-003',
      title: 'عضوية مميزة لشهر',
      description: 'عضوية مميزة تتضمن ميزات إضافية لمدة شهر',
      pointsCost: 800,
      category: 'عضويات',
      available: true
    },
    {
      id: 'R-004',
      title: 'تقرير تحليل السوق',
      description: 'تقرير مفصل عن تحليل السوق في مجال تخصصك',
      pointsCost: 250,
      category: 'تقارير',
      available: true
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earned': return <Plus className="w-4 h-4 text-green-600" />;
      case 'spent': return <Minus className="w-4 h-4 text-red-600" />;
      case 'bonus': return <Gift className="w-4 h-4 text-purple-600" />;
      case 'penalty': return <Minus className="w-4 h-4 text-orange-600" />;
      default: return <RefreshCw className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earned': return 'text-green-600';
      case 'spent': return 'text-red-600';
      case 'bonus': return 'text-purple-600';
      case 'penalty': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getLevelInfo = (level: number) => {
    const levels = [
      { name: 'البرونزي', color: 'bg-amber-100 text-amber-800', icon: Award },
      { name: 'الفضي', color: 'bg-gray-100 text-gray-800', icon: Star },
      { name: 'الذهبي', color: 'bg-yellow-100 text-yellow-800', icon: Crown },
      { name: 'البلاتيني', color: 'bg-blue-100 text-blue-800', icon: Crown },
      { name: 'الماسي', color: 'bg-purple-100 text-purple-800', icon: Crown }
    ];
    return levels[Math.min(level - 1, levels.length - 1)];
  };

  const levelInfo = getLevelInfo(userPoints.level);
  const progressToNextLevel = ((userPoints.totalPoints % 1000) / 1000) * 100;

  return (
    <div className="space-y-6">
      {/* ملخص النقاط */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-900">{userPoints.totalPoints.toLocaleString()}</p>
                <p className="text-blue-700 text-sm">إجمالي النقاط</p>
              </div>
              <Star className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-900">{userPoints.availablePoints.toLocaleString()}</p>
                <p className="text-green-700 text-sm">النقاط المتاحة</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-900">+{userPoints.earnedThisMonth}</p>
                <p className="text-purple-700 text-sm">مكسب هذا الشهر</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className={levelInfo.color}>
                    <levelInfo.icon className="w-3 h-3 ml-1" />
                    {levelInfo.name}
                  </Badge>
                </div>
                <p className="text-orange-700 text-sm mt-1">المستوى {userPoints.level}</p>
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* شريط التقدم للمستوى التالي */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">التقدم للمستوى التالي</span>
            <span className="text-sm text-gray-500">
              {userPoints.totalPoints} / {userPoints.nextLevelPoints}
            </span>
          </div>
          <Progress value={progressToNextLevel} className="h-3" />
        </CardContent>
      </Card>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="transactions">المعاملات</TabsTrigger>
          <TabsTrigger value="rewards">المكافآت</TabsTrigger>
          <TabsTrigger value="earn">كسب النقاط</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات الشهر الحالي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">النقاط المكتسبة</span>
                  <span className="text-green-600 font-bold">+{userPoints.earnedThisMonth}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium">النقاط المستخدمة</span>
                  <span className="text-red-600 font-bold">-{userPoints.spentThisMonth}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">الصافي</span>
                  <span className="text-blue-600 font-bold">+{userPoints.earnedThisMonth - userPoints.spentThisMonth}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>المعاملات الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userPoints.transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="text-sm font-medium">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <span className={`font-bold ${getTransactionColor(transaction.type)}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل المعاملات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userPoints.transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <h3 className="font-medium">{transaction.description}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{transaction.date}</span>
                          {transaction.reference && (
                            <>
                              <span>•</span>
                              <span>المرجع: {transaction.reference}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>متجر المكافآت</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rewards.map((reward) => (
                  <div key={reward.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">{reward.title}</h3>
                      <Badge variant="outline">{reward.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold">{reward.pointsCost} نقطة</span>
                      </div>
                      <Button 
                        size="sm" 
                        disabled={userPoints.availablePoints < reward.pointsCost || !reward.available}
                      >
                        {userPoints.availablePoints >= reward.pointsCost ? 'استبدال' : 'نقاط غير كافية'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earn" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>طرق كسب النقاط</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">إكمال مشروع</h3>
                    <Badge className="bg-green-100 text-green-800">+100 نقطة</Badge>
                  </div>
                  <p className="text-sm text-gray-600">اكسب 100 نقطة عند إكمال أي مشروع بنجاح</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">إحالة عضو جديد</h3>
                    <Badge className="bg-blue-100 text-blue-800">+75 نقطة</Badge>
                  </div>
                  <p className="text-sm text-gray-600">اكسب 75 نقطة عند إحالة عضو جديد ينضم للمنصة</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">مشاركة في التصويت</h3>
                    <Badge className="bg-purple-100 text-purple-800">+25 نقطة</Badge>
                  </div>
                  <p className="text-sm text-gray-600">اكسب 25 نقطة عند المشاركة في جلسات التصويت</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">تقييم إيجابي</h3>
                    <Badge className="bg-orange-100 text-orange-800">+50 نقطة</Badge>
                  </div>
                  <p className="text-sm text-gray-600">اكسب 50 نقطة عند الحصول على تقييم 5 نجوم</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PointsSystem;
