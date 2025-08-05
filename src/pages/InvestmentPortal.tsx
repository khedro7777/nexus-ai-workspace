
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import InvestmentPortfolioManager from '@/components/investment/InvestmentPortfolioManager';
import InvestmentStats from '@/components/investment/InvestmentStats';
import InvestmentOpportunityCard from '@/components/investment/InvestmentOpportunityCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  DollarSign,
  Plus,
  Search,
  Filter,
  Building2,
  Users
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

  // Mock investment stats data
  const investmentStats = {
    totalInvested: 450000,
    currentValue: 587500,
    totalReturn: 137500,
    returnPercentage: 30.6,
    activeInvestments: 8,
    companies: 12
  };

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

  const handleInvest = (id: string) => {
    console.log('Investing in opportunity:', id);
    // Handle investment logic
  };

  const handleViewDetails = (id: string) => {
    console.log('Viewing details for opportunity:', id);
    // Handle view details logic
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
              {opportunities.map(opportunity => (
                <InvestmentOpportunityCard
                  key={opportunity.id}
                  {...opportunity}
                  onInvest={handleInvest}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </TabsContent>

          {/* My Portfolio */}
          <TabsContent value="portfolio">
            <InvestmentPortfolioManager />
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <InvestmentStats
              totalInvested={investmentStats.totalInvested}
              currentValue={investmentStats.currentValue}
              totalReturn={investmentStats.totalReturn}
              returnPercentage={investmentStats.returnPercentage}
              activeInvestments={investmentStats.activeInvestments}
              companies={investmentStats.companies}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestmentPortal;
