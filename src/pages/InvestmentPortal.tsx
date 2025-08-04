
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import InvestmentPortfolioManager from '@/components/investment/InvestmentPortfolioManager';
import InvestmentStats from '@/components/investment/InvestmentStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Building2, 
  Users, 
  DollarSign,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface InvestmentOpportunity {
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
}

const InvestmentPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [opportunities] = useState<InvestmentOpportunity[]>([
    {
      id: '1',
      title: 'AI Technology Startup Investment',
      description: 'Investment in a promising AI startup focused on business automation solutions.',
      type: 'startup',
      targetAmount: 500000,
      raisedAmount: 325000,
      minInvestment: 5000,
      expectedReturn: 25,
      duration: '3-5 years',
      riskLevel: 'high',
      membersJoined: 42,
      maxMembers: 100,
      deadline: '2024-03-15',
      status: 'open'
    },
    {
      id: '2',
      title: 'Commercial Real Estate Development',
      description: 'Joint investment in a commercial real estate project in downtown business district.',
      type: 'real-estate',
      targetAmount: 2000000,
      raisedAmount: 1200000,
      minInvestment: 25000,
      expectedReturn: 12,
      duration: '2-3 years',
      riskLevel: 'medium',
      membersJoined: 24,
      maxMembers: 50,
      deadline: '2024-02-28',
      status: 'funding'
    },
    {
      id: '3',
      title: 'Green Energy Company Formation',
      description: 'Collaborative formation of a renewable energy company with shared ownership.',
      type: 'company-formation',
      targetAmount: 1000000,
      raisedAmount: 750000,
      minInvestment: 10000,
      expectedReturn: 18,
      duration: '5+ years',
      riskLevel: 'medium',
      membersJoined: 15,
      maxMembers: 20,
      deadline: '2024-04-01',
      status: 'open'
    },
    {
      id: '4',
      title: 'Manufacturing Equipment Joint Purchase',
      description: 'Group investment in high-end manufacturing equipment for shared use.',
      type: 'group-venture',
      targetAmount: 800000,
      raisedAmount: 680000,
      minInvestment: 15000,
      expectedReturn: 8,
      duration: '1-2 years',
      riskLevel: 'low',
      membersJoined: 28,
      maxMembers: 35,
      deadline: '2024-02-15',
      status: 'funding'
    }
  ]);

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
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'funding': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'startup': return TrendingUp;
      case 'real-estate': return Building2;
      case 'company-formation': return Building2;
      case 'group-venture': return Users;
      default: return DollarSign;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <TrendingUp className="w-8 h-8" />
            Investment Portal
          </h1>
          <p className="text-gray-600">Discover and manage collaborative investment opportunities</p>
        </div>
        
        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="opportunities" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Investment Opportunities
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              My Portfolio
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Investment Opportunities */}
          <TabsContent value="opportunities" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Available Opportunities</h2>
                <p className="text-gray-600">Explore collaborative investment projects</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Investment
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {opportunities.map(opportunity => {
                const TypeIcon = getTypeIcon(opportunity.type);
                const progressPercent = (opportunity.raisedAmount / opportunity.targetAmount) * 100;
                
                return (
                  <Card key={opportunity.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                            <TypeIcon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                            <p className="text-sm text-gray-600 capitalize">{opportunity.type.replace('-', ' ')}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(opportunity.status)}>
                            {opportunity.status}
                          </Badge>
                          <Badge className={getRiskColor(opportunity.riskLevel)}>
                            {opportunity.riskLevel} risk
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{opportunity.description}</p>
                      
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Funding Progress</span>
                          <span className="text-sm font-medium">{progressPercent.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(progressPercent, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>${opportunity.raisedAmount.toLocaleString()} raised</span>
                          <span>${opportunity.targetAmount.toLocaleString()} target</span>
                        </div>
                      </div>

                      {/* Investment Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Min Investment</p>
                          <p className="font-semibold">${opportunity.minInvestment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Expected Return</p>
                          <p className="font-semibold text-green-600">{opportunity.expectedReturn}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="font-semibold">{opportunity.duration}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Members</p>
                          <p className="font-semibold">{opportunity.membersJoined}/{opportunity.maxMembers}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div>
                          <p className="text-xs text-gray-500">Deadline</p>
                          <p className="text-sm font-medium">{new Date(opportunity.deadline).toLocaleDateString()}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm" disabled={opportunity.status === 'closed'}>
                            {opportunity.status === 'closed' ? 'Closed' : 'Invest Now'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* My Portfolio */}
          <TabsContent value="portfolio">
            <InvestmentPortfolioManager />
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <InvestmentStats />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestmentPortal;
