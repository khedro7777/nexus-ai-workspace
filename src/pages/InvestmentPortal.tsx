
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  TrendingUp, 
  Building2, 
  DollarSign, 
  Users, 
  PieChart, 
  BarChart3,
  Plus,
  Search,
  Filter,
  Star,
  Clock,
  Target,
  Shield,
  Briefcase
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import InvestmentStats from '@/components/investment/InvestmentStats';
import InvestmentOpportunityCard from '@/components/investment/InvestmentOpportunityCard';
import InvestmentPortfolioManager from '@/components/investment/InvestmentPortfolioManager';

const InvestmentPortal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');

  // Enhanced investment data
  const investmentOpportunities = [
    {
      id: 1,
      name: 'Advanced AI Technologies Corp',
      sector: 'Technology',
      fundingGoal: 750000,
      raisedAmount: 450000,
      investors: 67,
      roi: 35,
      risk: 'Medium',
      status: 'Active',
      deadline: '2025-09-15',
      description: 'Leading company in developing AI solutions for startups and large enterprises with special focus on intelligent automation',
      minInvestment: 7500,
      shares: 25,
      country: 'UAE'
    },
    {
      id: 2,
      name: 'Sustainable Organic Food Group',
      sector: 'Food & Agriculture',
      fundingGoal: 500000,
      raisedAmount: 320000,
      investors: 45,
      roi: 22,
      risk: 'Low',
      status: 'Active',
      deadline: '2025-08-20',
      description: 'Specialized in producing and distributing sustainable organic foods with wide distribution network in Gulf region',
      minInvestment: 5000,
      shares: 18,
      country: 'Saudi Arabia'
    },
    {
      id: 3,
      name: 'Smart E-commerce Platform',
      sector: 'E-commerce',
      fundingGoal: 1000000,
      raisedAmount: 1000000,
      investors: 85,
      roi: 42,
      risk: 'High',
      status: 'Completed',
      deadline: '2025-06-01',
      description: 'Advanced e-commerce platform using AI to enhance user experience and sales',
      minInvestment: 10000,
      shares: 30,
      country: 'Egypt'
    },
    {
      id: 4,
      name: 'Green Renewable Energy Ltd',
      sector: 'Energy',
      fundingGoal: 2000000,
      raisedAmount: 800000,
      investors: 120,
      roi: 28,
      risk: 'Medium',
      status: 'Active',
      deadline: '2025-12-31',
      description: 'Leading in solar and wind energy with major projects in the Arab region',
      minInvestment: 15000,
      shares: 35,
      country: 'Jordan'
    }
  ];

  // Enhanced portfolio stats
  const portfolioStats = {
    totalInvested: 125000,
    currentValue: 156000,
    totalReturn: 31000,
    returnPercentage: 24.8,
    activeInvestments: 8,
    companies: 5
  };

  const sectors = [
    'Technology', 
    'Food & Agriculture', 
    'Real Estate', 
    'Healthcare', 
    'E-commerce', 
    'Energy',
    'Education',
    'Transportation',
    'Financial Services'
  ];

  const filteredOpportunities = investmentOpportunities.filter(opp => {
    const matchesSearch = opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = !selectedSector || opp.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const handleInvest = (id: number) => {
    console.log('Investing in opportunity:', id);
    // Implement investment logic
  };

  const handleViewDetails = (id: number) => {
    console.log('Viewing details for opportunity:', id);
    // Implement details view logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced portal header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
            <TrendingUp className="w-10 h-10 text-blue-600" />
            Smart Investment Portal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Invest in the best startups and innovative projects with advanced analysis tools and professional portfolio management
          </p>
        </div>

        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="opportunities" className="text-lg py-3">Investment Opportunities</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-lg py-3">My Portfolio</TabsTrigger>
            <TabsTrigger value="create" className="text-lg py-3">Create Company</TabsTrigger>
            <TabsTrigger value="analytics" className="text-lg py-3">Analytics</TabsTrigger>
          </TabsList>

          {/* Enhanced investment opportunities tab */}
          <TabsContent value="opportunities" className="space-y-8">
            {/* Enhanced search filters */}
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search investment opportunities by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 py-3 text-lg"
                    />
                  </div>
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger className="w-full md:w-56 py-3">
                      <SelectValue placeholder="All Sectors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Sectors</SelectItem>
                      {sectors.map(sector => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2 py-3 px-6">
                    <Filter className="w-4 h-4" />
                    Advanced Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">{filteredOpportunities.length}</p>
                      <p className="text-blue-100 text-sm">Available Opportunities</p>
                    </div>
                    <Building2 className="w-10 h-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">$4.2M</p>
                      <p className="text-green-100 text-sm">Total Investments</p>
                    </div>
                    <DollarSign className="w-10 h-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">317</p>
                      <p className="text-purple-100 text-sm">Active Investors</p>
                    </div>
                    <Users className="w-10 h-10 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">32%</p>
                      <p className="text-orange-100 text-sm">Average Return</p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced opportunities list */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
              {filteredOpportunities.map((opportunity) => (
                <InvestmentOpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onInvest={handleInvest}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </TabsContent>

          {/* Enhanced portfolio tab */}
          <TabsContent value="portfolio" className="space-y-8">
            <InvestmentStats {...portfolioStats} />
            <InvestmentPortfolioManager />
          </TabsContent>

          {/* Company creation tab */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Investment Company</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold mb-2">Launch Your Investment Company</h3>
                  <p className="text-gray-600 mb-6">
                    Create a new company and raise funding from investors
                  </p>
                  <Button size="lg" className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create New Company
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Creation steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Setup Business Plan</h3>
                  <p className="text-sm text-gray-600">Write a comprehensive and convincing business plan for investors</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Set Funding Goals</h3>
                  <p className="text-sm text-gray-600">Define required funding amount and offered share percentage</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Attract Investors</h3>
                  <p className="text-sm text-gray-600">Publish your project and attract interested investors</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sector Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sectors.slice(0, 5).map((sector, index) => {
                      const performance = [25, 18, 22, 15, 30][index];
                      return (
                        <div key={sector} className="flex items-center justify-between">
                          <span className="text-sm">{sector}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${performance * 2}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{performance}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Most Active Investors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Ahmed Mohamed', investments: 8, amount: 125000 },
                      { name: 'Fatima Ahmed', investments: 6, amount: 98000 },
                      { name: 'Mohamed Ali', investments: 5, amount: 85000 },
                      { name: 'Nour Hassan', investments: 4, amount: 72000 }
                    ].map((investor, index) => (
                      <div key={investor.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{investor.name}</p>
                            <p className="text-sm text-gray-500">{investor.investments} investments</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${investor.amount.toLocaleString()}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-gray-500">Featured Investor</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestmentPortal;
