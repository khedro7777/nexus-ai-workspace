
import React, { useState } from 'react';
import { Users, FileText, Gavel, Building, MessageSquare, ShoppingCart, TrendingUp, Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MCPPanel from '@/components/layout/MCPPanel';
import ServiceCard from '@/components/cards/ServiceCard';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLanguage();

  const services = [
    {
      title: 'Group Buying',
      description: 'Collaborative purchasing power for better deals and bulk discounts',
      icon: ShoppingCart,
      status: 'active' as const,
      members: 24,
      progress: 75
    },
    {
      title: 'Marketing Hub',
      description: 'Unified marketing campaigns and brand development services',
      icon: TrendingUp,
      status: 'pending' as const,
      members: 18,
      progress: 45
    },
    {
      title: 'Company Formation',
      description: 'Legal entity creation and business structure development',
      icon: Building,
      status: 'new' as const,
      members: 8,
      progress: 20
    },
    {
      title: 'Contract Management',
      description: 'Smart contract templates and negotiation workflows',
      icon: FileText,
      status: 'active' as const,
      members: 15,
      progress: 90
    },
    {
      title: 'Arbitration Services',
      description: 'Dispute resolution and mediation for group conflicts',
      icon: Gavel,
      status: 'completed' as const,
      members: 6,
      progress: 100
    },
    {
      title: 'DAO Governance',
      description: 'Decentralized decision making and voting mechanisms',
      icon: Users,
      status: 'active' as const,
      members: 32,
      progress: 60
    }
  ];

  const recentActivity = [
    { action: 'New group formed', group: 'Tech Startup Collective', time: '2m ago' },
    { action: 'Contract signed', group: 'Marketing Alliance', time: '5m ago' },
    { action: 'Voting completed', group: 'Investment DAO', time: '12m ago' }
  ];

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <main className="flex-1 px-6 py-8 pb-32 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            {t('welcome')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">
              🟢 12 Active Groups
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-500/20">
              📄 8 Contracts
            </Badge>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-700 border-purple-500/20">
              ⚖️ 3 Arbitrations
            </Badge>
          </div>

          <Button className="animate-pulse-glow" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            {t('newGroup')}
          </Button>
        </div>

        {/* Services Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{t('services')}</h2>
            <Badge variant="secondary">6 Available</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="glass p-4 rounded-lg flex items-center justify-between animate-fade-in">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.group}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MCPPanel />
    </div>
  );
};

export default Index;
