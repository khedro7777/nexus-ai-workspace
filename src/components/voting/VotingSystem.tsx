// نظام التصويت المتقدم مع دعم أنواع التصويت المختلفة
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Vote, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Star,
  BarChart3,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface VotingSystemProps {
  sessionId: string;
  groupId: string;
}

const VotingSystem: React.FC<VotingSystemProps> = ({ sessionId, groupId }) => {
  const [votingType, setVotingType] = useState<'simple' | 'weighted' | 'quadratic'>('simple');
  const [selectedOption, setSelectedOption] = useState('');
  const [points, setPoints] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // بيانات التصويت المحاكية
  const votingData = {
    id: sessionId,
    title: 'اختيار مورد الأجهزة الطبية',
    description: 'التصويت على أفضل مورد للأجهزة الطبية بناءً على العروض المقدمة',
    options: [
      { id: '1', text: 'شركة الأجهزة المتقدمة - $145,000', votes: 12, weightedVotes: 2500, points: 180 },
      { id: '2', text: 'مجموعة التقنيات الطبية - $138,000', votes: 8, weightedVotes: 1800, points: 120 },
      { id: '3', text: 'مؤسسة الرعاية الصحية - $152,000', votes: 5, weightedVotes: 1200, points: 75 }
    ],
    totalVotes: 25,
    totalWeight: 5500,
    totalPoints: 375,
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    userCapital: 25000, // رأس مال المستخدم في المجموعة
    userPoints: 10, // النقاط المتاحة للمستخدم
    status: 'active'
  };

  // حساب قوة التصويت بناءً على النوع
  const getVotingPower = () => {
    switch (votingType) {
      case 'simple':
        return 1;
      case 'weighted':
        return votingData.userCapital / 1000; // قوة التصويت بناءً على رأس المال
      case 'quadratic':
        return Math.sqrt(points); // التصويت التربيعي
      default:
        return 1;
    }
  };

  // حساب النتائج بناءً على نوع التصويت
  const getResults = () => {
    return votingData.options.map(option => {
      let totalVotes, userVotes;
      
      switch (votingType) {
        case 'simple':
          totalVotes = votingData.totalVotes;
          userVotes = option.votes;
          break;
        case 'weighted':
          totalVotes = votingData.totalWeight;
          userVotes = option.weightedVotes;
          break;
        case 'quadratic':
          totalVotes = votingData.totalPoints;
          userVotes = option.points;
          break;
        default:
          totalVotes = votingData.totalVotes;
          userVotes = option.votes;
      }
      
      const percentage = totalVotes > 0 ? (userVotes / totalVotes) * 100 : 0;
      
      return {
        ...option,
        percentage,
        displayVotes: userVotes,
        totalVotes
      };
    });
  };

  const results = getResults();
  const votingPower = getVotingPower();

  const handleVote = () => {
    if (!selectedOption) return;
    setShowConfirmation(true);
  };

  const confirmVote = () => {
    // هنا سيتم إرسال التصويت إلى الخادم
    console.log('Voting confirmed:', {
      option: selectedOption,
      type: votingType,
      power: votingPower,
      points: votingType === 'quadratic' ? points : undefined
    });
    setShowConfirmation(false);
    // إعادة تحميل البيانات
  };

  const getVotingTypeIcon = (type: string) => {
    switch (type) {
      case 'simple': return <Vote className="w-4 h-4" />;
      case 'weighted': return <DollarSign className="w-4 h-4" />;
      case 'quadratic': return <Star className="w-4 h-4" />;
      default: return <Vote className="w-4 h-4" />;
    }
  };

  const getVotingTypeColor = (type: string) => {
    switch (type) {
      case 'simple': return 'bg-blue-100 text-blue-800';
      case 'weighted': return 'bg-green-100 text-green-800';
      case 'quadratic': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* رأس نظام التصويت */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl mb-2">{votingData.title}</CardTitle>
              <p className="text-gray-600">{votingData.description}</p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <Clock className="w-3 h-3 mr-1" />
              نشط
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm">المشاركون: {votingData.totalVotes}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm">ينتهي خلال 3 أيام</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span className="text-sm">رأس مالك: ${votingData.userCapital.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-500" />
              <span className="text-sm">نقاطك: {votingData.userPoints}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* منطقة التصويت */}
        <div className="lg:col-span-2 space-y-6">
          {/* اختيار نوع التصويت */}
          <Card>
            <CardHeader>
              <CardTitle>نوع التصويت</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { 
                    id: 'simple', 
                    title: 'تصويت بسيط', 
                    desc: 'صوت واحد لكل عضو',
                    icon: Vote
                  },
                  { 
                    id: 'weighted', 
                    title: 'تصويت مرجح', 
                    desc: 'بناءً على رأس المال',
                    icon: DollarSign
                  },
                  { 
                    id: 'quadratic', 
                    title: 'تصويت تربيعي', 
                    desc: 'استخدام النقاط',
                    icon: Star
                  }
                ].map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      votingType === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setVotingType(type.id as any)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <type.icon className="w-5 h-5 text-blue-600" />
                      <h3 className="font-medium">{type.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{type.desc}</p>
                    <div className="mt-2">
                      <Badge className={getVotingTypeColor(type.id)}>
                        قوة التصويت: {type.id === 'weighted' ? (votingData.userCapital / 1000).toFixed(1) : type.id === 'quadratic' ? Math.sqrt(points).toFixed(1) : '1'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* إعدادات التصويت التربيعي */}
              {votingType === 'quadratic' && (
                <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <Label htmlFor="points" className="text-sm font-medium">
                    عدد النقاط المستخدمة: {points} (قوة التصويت: {Math.sqrt(points).toFixed(1)})
                  </Label>
                  <Input
                    id="points"
                    type="range"
                    min="1"
                    max={votingData.userPoints}
                    value={points}
                    onChange={(e) => setPoints(parseInt(e.target.value))}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>{votingData.userPoints}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* خيارات التصويت */}
          <Card>
            <CardHeader>
              <CardTitle>الخيارات المتاحة</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                <div className="space-y-4">
                  {votingData.options.map((option) => (
                    <div
                      key={option.id}
                      className={`p-4 border rounded-lg transition-all ${
                        selectedOption === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{option.text}</span>
                            <div className="text-sm text-gray-500">
                              {votingType === 'simple' && `${option.votes} أصوات`}
                              {votingType === 'weighted' && `${option.weightedVotes} وزن`}
                              {votingType === 'quadratic' && `${option.points} نقطة`}
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <div className="mt-6 flex gap-4">
                <Button 
                  onClick={handleVote}
                  disabled={!selectedOption}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 ml-2" />
                  تصويت (قوة: {votingPower.toFixed(1)})
                </Button>
                <Button variant="outline">
                  <AlertCircle className="w-4 h-4 ml-2" />
                  امتنع
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* النتائج المباشرة */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                النتائج المباشرة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium line-clamp-1">
                      {result.text.split(' - ')[0]}
                    </span>
                    <span className="text-sm font-bold">{result.percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={result.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{result.displayVotes} من {result.totalVotes}</span>
                    <span>{result.text.split(' - ')[1]}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* معلومات إضافية */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات التصويت</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">نوع التصويت:</span>
                <Badge className={getVotingTypeColor(votingType)}>
                  {getVotingTypeIcon(votingType)}
                  <span className="mr-1">
                    {votingType === 'simple' ? 'بسيط' : 
                     votingType === 'weighted' ? 'مرجح' : 'تربيعي'}
                  </span>
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">قوة تصويتك:</span>
                <span className="font-medium">{votingPower.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">المشاركة:</span>
                <span className="font-medium">{((votingData.totalVotes / 50) * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الوقت المتبقي:</span>
                <span className="font-medium">72 ساعة</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* نافذة تأكيد التصويت */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد التصويت</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium mb-2">ملخص التصويت</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>الخيار المختار:</span>
                  <span className="font-medium">
                    {votingData.options.find(o => o.id === selectedOption)?.text.split(' - ')[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>نوع التصويت:</span>
                  <span className="font-medium">
                    {votingType === 'simple' ? 'بسيط' : 
                     votingType === 'weighted' ? 'مرجح' : 'تربيعي'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>قوة التصويت:</span>
                  <span className="font-medium">{votingPower.toFixed(1)}</span>
                </div>
                {votingType === 'quadratic' && (
                  <div className="flex justify-between">
                    <span>النقاط المستخدمة:</span>
                    <span className="font-medium">{points} من {votingData.userPoints}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button onClick={confirmVote} className="flex-1">
                <CheckCircle className="w-4 h-4 ml-2" />
                تأكيد التصويت
              </Button>
              <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VotingSystem;