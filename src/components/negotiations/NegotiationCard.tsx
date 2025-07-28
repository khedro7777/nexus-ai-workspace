
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Users, 
  DollarSign, 
  MessageSquare, 
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Eye,
  Pause
} from 'lucide-react';

interface NegotiationCardProps {
  negotiation: {
    id: string;
    title: string;
    description: string;
    group: string;
    supplier: string;
    currentOffer: string;
    targetPrice: string;
    progress: number;
    status: 'active' | 'completed' | 'paused' | 'cancelled' | 'pending';
    participants: number;
    rounds: number;
    currentRound: number;
    deadline: string;
    lastActivity: string;
  };
}

const NegotiationCard: React.FC<NegotiationCardProps> = ({ negotiation }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشطة';
      case 'completed': return 'مكتملة';
      case 'paused': return 'متوقفة';
      case 'pending': return 'معلقة';
      case 'cancelled': return 'ملغية';
      default: return 'غير محدد';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-xl">{negotiation.title}</CardTitle>
              <Badge className={getStatusColor(negotiation.status)}>
                {getStatusIcon(negotiation.status)}
                <span className="mr-1">{getStatusText(negotiation.status)}</span>
              </Badge>
            </div>
            <p className="text-gray-600 text-sm">{negotiation.description}</p>
          </div>
          <Button variant="ghost" size="icon">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">المجموعة:</span>
              <span className="font-medium text-gray-900">{negotiation.group}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">المورد:</span>
              <span className="font-medium text-gray-900">{negotiation.supplier}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">المشاركون:</span>
              <span className="font-medium text-gray-900">{negotiation.participants} عضو</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">العرض الحالي:</span>
              <span className="font-bold text-lg text-blue-600">{negotiation.currentOffer}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">السعر المستهدف:</span>
              <span className="font-bold text-lg text-green-600">{negotiation.targetPrice}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">الجولة:</span>
              <span className="font-medium text-gray-900">{negotiation.currentRound}/{negotiation.rounds}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">تقدم المفاوضة</span>
            <span className="text-sm text-gray-600">{negotiation.progress}%</span>
          </div>
          <Progress value={negotiation.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
          <span>آخر نشاط: {negotiation.lastActivity}</span>
          <span>الموعد النهائي: {negotiation.deadline}</span>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1">
            عرض التفاصيل
          </Button>
          {negotiation.status === 'active' && (
            <Button className="flex-1">
              انضم للمفاوضة
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NegotiationCard;
