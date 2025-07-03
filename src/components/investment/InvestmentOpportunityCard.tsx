
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, Shield, Users } from 'lucide-react';

interface InvestmentOpportunity {
  id: number;
  name: string;
  sector: string;
  fundingGoal: number;
  raisedAmount: number;
  investors: number;
  roi: number;
  risk: string;
  status: string;
  deadline: string;
  description: string;
  minInvestment: number;
  shares: number;
  country: string;
}

interface InvestmentOpportunityCardProps {
  opportunity: InvestmentOpportunity;
  onInvest: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const InvestmentOpportunityCard: React.FC<InvestmentOpportunityCardProps> = ({
  opportunity,
  onInvest,
  onViewDetails
}) => {
  const progressPercentage = (opportunity.raisedAmount / opportunity.fundingGoal) * 100;
  const daysLeft = Math.ceil((new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'منخفض': return 'bg-green-100 text-green-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'عالي': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-blue-100 text-blue-800';
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'منتهي': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg leading-tight">{opportunity.name}</CardTitle>
          <div className="flex flex-col gap-1">
            <Badge className={getStatusColor(opportunity.status)}>
              {opportunity.status}
            </Badge>
            <Badge className={getRiskColor(opportunity.risk)}>
              {opportunity.risk}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-gray-600">{opportunity.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* شريط التقدم */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>التمويل المحقق</span>
            <span>{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>${opportunity.raisedAmount.toLocaleString()}</span>
            <span>${opportunity.fundingGoal.toLocaleString()}</span>
          </div>
        </div>

        {/* المعلومات الأساسية */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">القطاع:</span>
            <p className="font-medium">{opportunity.sector}</p>
          </div>
          <div>
            <span className="text-gray-600">الدولة:</span>
            <p className="font-medium">{opportunity.country}</p>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-gray-500" />
            <span className="text-gray-600">المستثمرون:</span>
            <p className="font-medium">{opportunity.investors}</p>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <span className="text-gray-600">العائد المتوقع:</span>
            <p className="font-medium text-green-600">{opportunity.roi}%</p>
          </div>
        </div>

        {/* معلومات الاستثمار */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">الحد الأدنى:</span>
            <span className="font-medium">${opportunity.minInvestment.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">الأسهم المتاحة:</span>
            <span className="font-medium">{opportunity.shares}%</span>
          </div>
          {daysLeft > 0 && (
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-gray-600">المدة المتبقية:</span>
              </div>
              <span className="font-medium">{daysLeft} يوم</span>
            </div>
          )}
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1" 
            disabled={opportunity.status === 'مكتمل'}
            onClick={() => onInvest(opportunity.id)}
          >
            استثمر الآن
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(opportunity.id)}
          >
            التفاصيل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentOpportunityCard;
