
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  Users, 
  DollarSign, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  Globe,
  BarChart3,
  Zap
} from 'lucide-react';

interface BusinessMetrics {
  totalValue: number;
  growthRate: number;
  memberEfficiency: number;
  marketImpact: number;
  roi: number;
  riskScore: number;
}

interface GroupBusinessLogicProps {
  groupId: string;
  metrics: BusinessMetrics;
  phase: string;
}

const GroupBusinessLogic: React.FC<GroupBusinessLogicProps> = ({ 
  groupId, 
  metrics, 
  phase 
}) => {
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'negotiation': return 'text-blue-600 bg-blue-50';
      case 'active': return 'text-green-600 bg-green-50';
      case 'contracting': return 'text-purple-600 bg-purple-50';
      case 'scaling': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const businessInsights = [
    {
      title: 'Market Penetration',
      value: '24%',
      trend: '+12%',
      icon: Globe,
      color: 'text-blue-600'
    },
    {
      title: 'Operational Efficiency',
      value: '87%',
      trend: '+8%',
      icon: Zap,
      color: 'text-green-600'
    },
    {
      title: 'Revenue Growth',
      value: '$2.4M',
      trend: '+34%',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Cost Optimization',
      value: '31%',
      trend: '+15%',
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Business Impact Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Global Business Impact Analytics
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getPhaseColor(phase)}>
              Current Phase: {phase.charAt(0).toUpperCase() + phase.slice(1)}
            </Badge>
            <Badge variant="outline">
              Group ID: {groupId.slice(0, 8)}...
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {businessInsights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <insight.icon className={`w-5 h-5 ${insight.color}`} />
                  <span className="text-sm text-green-600 font-medium">{insight.trend}</span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{insight.title}</h3>
                <p className="text-2xl font-bold">{insight.value}</p>
              </div>
            ))}
          </div>

          {/* Key Performance Indicators */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Total Business Value</span>
                <span className="text-lg font-bold text-green-600">${metrics.totalValue.toLocaleString()}</span>
              </div>
              <Progress value={(metrics.totalValue / 10000000) * 100} className="h-3" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Member Efficiency Score</span>
                <span className="text-lg font-bold text-blue-600">{metrics.memberEfficiency}%</span>
              </div>
              <Progress value={metrics.memberEfficiency} className="h-3" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Market Impact Level</span>
                <span className="text-lg font-bold text-purple-600">{metrics.marketImpact}%</span>
              </div>
              <Progress value={metrics.marketImpact} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Business Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Scale Operations</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Target className="w-6 h-6" />
              <span className="text-sm">Optimize Processes</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Globe className="w-6 h-6" />
              <span className="text-sm">Expand Market</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            Risk Assessment & Mitigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">Financial Risk</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Low (2%)</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="font-medium">Operational Risk</span>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Medium (15%)</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="font-medium">Market Risk</span>
              </div>
              <Badge className="bg-red-100 text-red-800">High (28%)</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupBusinessLogic;
