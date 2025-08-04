
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Eye, 
  MoreHorizontal,
  Calendar,
  Target,
  AlertCircle
} from 'lucide-react';

interface Investment {
  id: string;
  companyName: string;
  sector: string;
  investedAmount: number;
  currentValue: number;
  shares: number;
  investmentDate: string;
  status: 'active' | 'completed' | 'pending';
  risk: 'low' | 'medium' | 'high';
  expectedReturn: number;
}

const InvestmentPortfolioManager: React.FC = () => {
  const [investments] = useState<Investment[]>([
    {
      id: '1',
      companyName: 'Advanced AI Technologies',
      sector: 'Technology',
      investedAmount: 25000,
      currentValue: 32500,
      shares: 5.2,
      investmentDate: '2024-06-15',
      status: 'active',
      risk: 'medium',
      expectedReturn: 35
    },
    {
      id: '2',
      companyName: 'Sustainable Food Group',
      sector: 'Food & Agriculture',
      investedAmount: 15000,
      currentValue: 17250,
      shares: 3.1,
      investmentDate: '2024-05-20',
      status: 'active',
      risk: 'low',
      expectedReturn: 22
    },
    {
      id: '3',
      companyName: 'Smart E-commerce Platform',
      sector: 'E-commerce',
      investedAmount: 30000,
      currentValue: 42600,
      shares: 7.5,
      investmentDate: '2024-04-10',
      status: 'active',
      risk: 'high',
      expectedReturn: 42
    }
  ];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.investedAmount, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalReturn = totalCurrentValue - totalInvested;
  const returnPercentage = ((totalReturn / totalInvested) * 100);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">${totalInvested.toLocaleString()}</p>
                <p className="text-gray-600 text-sm">Total Invested</p>
                <p className="text-xs text-blue-600 mt-1">{investments.length} active investments</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">${totalCurrentValue.toLocaleString()}</p>
                <p className="text-gray-600 text-sm">Current Value</p>
                <p className="text-xs text-green-600 mt-1">+{returnPercentage.toFixed(1)}% return</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">+${totalReturn.toLocaleString()}</p>
                <p className="text-gray-600 text-sm">Total Profit</p>
                <p className="text-xs text-gray-500 mt-1">Unrealized gains</p>
              </div>
              {totalReturn >= 0 ? (
                <TrendingUp className="w-8 h-8 text-green-500" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {investments.reduce((sum, inv) => sum + inv.shares, 0).toFixed(1)}%
                </p>
                <p className="text-gray-600 text-sm">Total Ownership</p>
                <p className="text-xs text-gray-500 mt-1">Across all companies</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment List */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments.map((investment) => {
              const returnAmount = investment.currentValue - investment.investedAmount;
              const returnPercentage = ((returnAmount / investment.investedAmount) * 100);
              
              return (
                <div key={investment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{investment.companyName}</h3>
                        <Badge className={getStatusColor(investment.status)}>
                          {investment.status}
                        </Badge>
                        <Badge className={getRiskColor(investment.risk)}>
                          {investment.risk} risk
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{investment.sector}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Invested Amount</p>
                      <p className="font-medium">${investment.investedAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Current Value</p>
                      <p className="font-medium">${investment.currentValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ownership</p>
                      <p className="font-medium">{investment.shares}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Return</p>
                      <p className={`font-medium ${returnAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {returnAmount >= 0 ? '+' : ''}${returnAmount.toLocaleString()} ({returnPercentage.toFixed(1)}%)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600">
                          Invested {new Date(investment.investmentDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600">
                          Expected {investment.expectedReturn}% return
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </div>

                  {/* Progress bar showing expected vs actual return */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Return Progress</span>
                      <span>{returnPercentage.toFixed(1)}% of {investment.expectedReturn}% target</span>
                    </div>
                    <Progress 
                      value={(returnPercentage / investment.expectedReturn) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentPortfolioManager;
