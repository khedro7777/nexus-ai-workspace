
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, DollarSign, Users, Building2 } from 'lucide-react';

interface InvestmentStatsProps {
  totalInvested: number;
  currentValue: number;
  totalReturn: number;
  returnPercentage: number;
  activeInvestments: number;
  companies: number;
}

const InvestmentStats: React.FC<InvestmentStatsProps> = ({
  totalInvested,
  currentValue,
  totalReturn,
  returnPercentage,
  activeInvestments,
  companies
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">${totalInvested.toLocaleString()}</p>
              <p className="text-gray-600 text-sm">إجمالي الاستثمارات</p>
              <p className="text-xs text-blue-600 mt-1">{activeInvestments} استثمار نشط</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">${currentValue.toLocaleString()}</p>
              <p className="text-gray-600 text-sm">القيمة الحالية</p>
              <p className="text-xs text-green-600 mt-1">+{returnPercentage}% العائد</p>
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
              <p className="text-gray-600 text-sm">إجمالي الأرباح</p>
              <p className="text-xs text-gray-500 mt-1">{companies} شركات</p>
            </div>
            <Building2 className="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentStats;
