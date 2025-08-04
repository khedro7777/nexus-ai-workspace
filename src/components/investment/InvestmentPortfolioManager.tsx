
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Building2, 
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface Investment {
  id: string;
  name: string;
  type: 'startup' | 'real-estate' | 'group-purchase' | 'company-formation';
  amount: number;
  currentValue: number;
  shares: number;
  totalShares: number;
  status: 'active' | 'pending' | 'completed' | 'failed';
  joinedDate: string;
  expectedReturn: number;
  members?: number;
}

const InvestmentPortfolioManager: React.FC = () => {
  const [investments] = useState<Investment[]>([
    {
      id: '1',
      name: 'Tech Startup Collective',
      type: 'startup',
      amount: 25000,
      currentValue: 28500,
      shares: 250,
      totalShares: 10000,
      status: 'active',
      joinedDate: '2024-01-15',
      expectedReturn: 15,
      members: 45
    },
    {
      id: '2',
      name: 'Downtown Real Estate Group',
      type: 'real-estate',
      amount: 50000,
      currentValue: 52000,
      shares: 100,
      totalShares: 2000,
      status: 'active',
      joinedDate: '2024-02-20',
      expectedReturn: 12,
      members: 20
    },
    {
      id: '3',
      name: 'Manufacturing Equipment Purchase',
      type: 'group-purchase',
      amount: 15000,
      currentValue: 15000,
      shares: 1,
      totalShares: 1,
      status: 'completed',
      joinedDate: '2024-01-10',
      expectedReturn: 0,
      members: 12
    },
    {
      id: '4',
      name: 'Green Energy Company Formation',
      type: 'company-formation',
      amount: 75000,
      currentValue: 73500,
      shares: 1500,
      totalShares: 50000,
      status: 'pending',
      joinedDate: '2024-03-01',
      expectedReturn: 20,
      members: 8
    }
  ]);

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGainLoss = totalCurrentValue - totalInvestment;
  const totalGainLossPercent = (totalGainLoss / totalInvestment) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'startup': return TrendingUp;
      case 'real-estate': return Building2;
      case 'group-purchase': return Users;
      case 'company-formation': return Building2;
      default: return DollarSign;
    }
  };

  const activeInvestments = investments.filter(inv => inv.status === 'active');
  const completedInvestments = investments.filter(inv => inv.status === 'completed');
  const pendingInvestments = investments.filter(inv => inv.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">${totalInvestment.toLocaleString()}</p>
                <p className="text-gray-600 text-sm">Total Investment</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">${totalCurrentValue.toLocaleString()}</p>
                <p className="text-gray-600 text-sm">Current Value</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${totalGainLoss.toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm">Gain/Loss</p>
              </div>
              {totalGainLoss >= 0 ? 
                <TrendingUp className="w-8 h-8 text-green-600" /> : 
                <TrendingDown className="w-8 h-8 text-red-600" />
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-2xl font-bold ${totalGainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalGainLossPercent.toFixed(2)}%
                </p>
                <p className="text-gray-600 text-sm">Return Rate</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="active">Active ({activeInvestments.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingInvestments.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedInvestments.length})</TabsTrigger>
            <TabsTrigger value="all">All ({investments.length})</TabsTrigger>
          </TabsList>
          
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Investment
          </Button>
        </div>

        <TabsContent value="active" className="space-y-4">
          {activeInvestments.map(investment => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingInvestments.map(investment => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedInvestments.map(investment => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {investments.map(investment => (
            <InvestmentCard key={investment.id} investment={investment} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const InvestmentCard: React.FC<{ investment: Investment }> = ({ investment }) => {
  const gainLoss = investment.currentValue - investment.amount;
  const gainLossPercent = (gainLoss / investment.amount) * 100;
  const TypeIcon = getTypeIcon(investment.type);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <TypeIcon className="w-6 h-6 text-blue-600" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{investment.name}</h3>
              <p className="text-gray-600 capitalize">{investment.type.replace('-', ' ')}</p>
              
              <div className="flex items-center gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-500">Investment</p>
                  <p className="font-semibold">${investment.amount.toLocaleString()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Current Value</p>
                  <p className="font-semibold">${investment.currentValue.toLocaleString()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Gain/Loss</p>
                  <p className={`font-semibold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${gainLoss.toLocaleString()} ({gainLossPercent.toFixed(2)}%)
                  </p>
                </div>

                {investment.members && (
                  <div>
                    <p className="text-sm text-gray-500">Members</p>
                    <p className="font-semibold">{investment.members}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Badge className={getStatusColor(investment.status)}>
                  {investment.status}
                </Badge>
                
                {investment.shares && investment.totalShares && (
                  <Badge variant="outline">
                    {investment.shares}/{investment.totalShares} shares ({((investment.shares / investment.totalShares) * 100).toFixed(2)}%)
                  </Badge>
                )}
                
                <Badge variant="outline">
                  Joined: {new Date(investment.joinedDate).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'failed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'startup': return TrendingUp;
    case 'real-estate': return Building2;
    case 'group-purchase': return Users;
    case 'company-formation': return Building2;
    default: return DollarSign;
  }
};

export default InvestmentPortfolioManager;
