
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Building2, 
  Users, 
  DollarSign,
  Clock,
  Target,
  AlertTriangle
} from 'lucide-react';

interface InvestmentOpportunityCardProps {
  id: string;
  title: string;
  description: string;
  type: 'startup' | 'real-estate' | 'company-formation' | 'group-venture';
  targetAmount: number;
  raisedAmount: number;
  minInvestment: number;
  expectedReturn: number;
  duration: string;
  riskLevel: 'low' | 'medium' | 'high';
  membersJoined: number;
  maxMembers: number;
  deadline: string;
  status: 'open' | 'funding' | 'closed';
  onInvest: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const InvestmentOpportunityCard: React.FC<InvestmentOpportunityCardProps> = ({
  id,
  title,
  description,
  type,
  targetAmount,
  raisedAmount,
  minInvestment,
  expectedReturn,
  duration,
  riskLevel,
  membersJoined,
  maxMembers,
  deadline,
  status,
  onInvest,
  onViewDetails
}) => {
  const progressPercent = (raisedAmount / targetAmount) * 100;
  
  const getTypeIcon = () => {
    switch (type) {
      case 'startup': return TrendingUp;
      case 'real-estate': return Building2;
      case 'company-formation': return Building2;
      case 'group-venture': return Users;
      default: return DollarSign;
    }
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'funding': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TypeIcon = getTypeIcon();
  const daysLeft = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <TypeIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <p className="text-sm text-gray-600 capitalize">{type.replace('-', ' ')}</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Badge className={getStatusColor()}>
              {status}
            </Badge>
            <Badge className={getRiskColor()}>
              <AlertTriangle className="w-3 h-3 mr-1" />
              {riskLevel} risk
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-700 text-sm">{description}</p>
        
        {/* Funding Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Funding Progress</span>
            <span className="text-sm font-medium">{progressPercent.toFixed(1)}%</span>
          </div>
          <Progress value={Math.min(progressPercent, 100)} className="h-3" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>${raisedAmount.toLocaleString()} raised</span>
            <span>${targetAmount.toLocaleString()} target</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Min Investment</p>
              <p className="font-semibold text-sm">${minInvestment.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Expected Return</p>
              <p className="font-semibold text-sm text-green-600">{expectedReturn}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" />
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-semibold text-sm">{duration}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-orange-600" />
            <div>
              <p className="text-xs text-gray-500">Members</p>
              <p className="font-semibold text-sm">{membersJoined}/{maxMembers}</p>
            </div>
          </div>
        </div>

        {/* Deadline Warning */}
        {daysLeft <= 7 && daysLeft > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                <strong>{daysLeft} days</strong> remaining to join this investment
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(id)}
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            disabled={status === 'closed' || daysLeft <= 0}
            onClick={() => onInvest(id)}
          >
            {status === 'closed' ? 'Closed' : daysLeft <= 0 ? 'Expired' : 'Invest Now'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentOpportunityCard;
