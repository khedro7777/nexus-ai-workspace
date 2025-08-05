
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'react-router-dom';
import { useGroupPhase } from '@/hooks/useGroupPhase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import GroupBusinessLogic from './GroupBusinessLogic';
import GroupPhaseManager from './GroupPhaseManager';
import GroupVotingBox from './GroupVotingBox';
import { 
  Building2, 
  Users, 
  BarChart3, 
  Globe, 
  Settings,
  MessageSquare,
  FileText,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';

const AdvancedGroupRoom: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const { groupContext, loading, canShowComponent, getPhaseDisplayName } = useGroupPhase(id || '');
  
  const [activeTab, setActiveTab] = useState('overview');
  const [businessMetrics] = useState({
    totalValue: 2400000,
    growthRate: 34,
    memberEfficiency: 87,
    marketImpact: 24,
    roi: 142,
    riskScore: 15
  });

  const handlePhaseTransition = async (newPhase: string) => {
    toast({
      title: "Phase Transition",
      description: `Successfully transitioned to ${newPhase} phase`
    });
  };

  if (loading || !groupContext) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const tabItems = [
    {
      id: 'overview',
      label: 'Business Overview',
      icon: Building2,
      description: 'Comprehensive business analytics and impact metrics'
    },
    {
      id: 'phases',
      label: 'Phase Management', 
      icon: TrendingUp,
      description: 'Strategic process pipeline and phase transitions'
    },
    {
      id: 'voting',
      label: 'Governance Hub',
      icon: Shield,
      description: 'Democratic decision-making and voting systems'
    },
    {
      id: 'analytics',
      label: 'Advanced Analytics',
      icon: BarChart3,
      description: 'Deep insights and performance analysis'
    },
    {
      id: 'global',
      label: 'Global Impact',
      icon: Globe,
      description: 'International reach and market penetration'
    },
    {
      id: 'operations',
      label: 'Operations Center',
      icon: Zap,
      description: 'Operational excellence and efficiency metrics'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Advanced Group Command Center
              </h1>
              <p className="text-gray-600">
                Global business impact through intelligent collaboration
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                {getPhaseDisplayName(groupContext.current_phase)}
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                {groupContext.member_count} Members
              </Badge>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Business Value</p>
                    <p className="text-2xl font-bold text-blue-900">${businessMetrics.totalValue.toLocaleString()}</p>
                  </div>
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-green-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Growth Rate</p>
                    <p className="text-2xl font-bold text-green-900">+{businessMetrics.growthRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-purple-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Efficiency</p>
                    <p className="text-2xl font-bold text-purple-900">{businessMetrics.memberEfficiency}%</p>
                  </div>
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-r from-orange-50 to-orange-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-600 font-medium">Market Impact</p>
                    <p className="text-2xl font-bold text-orange-900">{businessMetrics.marketImpact}%</p>
                  </div>
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advanced Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="border-b bg-white rounded-lg p-2 shadow-sm">
            <TabsList className="grid grid-cols-6 gap-2 bg-transparent h-auto p-0">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 hover:bg-gray-50 transition-all"
                >
                  <tab.icon className="w-5 h-5" />
                  <div className="text-center">
                    <div className="font-medium text-sm">{tab.label}</div>
                    <div className="text-xs text-gray-500 hidden lg:block">
                      {tab.description}
                    </div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <GroupBusinessLogic 
              groupId={id || ''} 
              metrics={businessMetrics}
              phase={groupContext.current_phase}
            />
          </TabsContent>

          <TabsContent value="phases" className="space-y-6">
            <GroupPhaseManager
              currentPhase={groupContext.current_phase}
              groupId={id || ''}
              memberCount={groupContext.member_count}
              minMembers={groupContext.min_members}
              onPhaseTransition={handlePhaseTransition}
            />
          </TabsContent>

          <TabsContent value="voting" className="space-y-6">
            <GroupVotingBox groupId={id || ''} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Advanced Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Advanced Analytics Coming Soon</h3>
                  <p className="text-sm">Comprehensive business intelligence and predictive analytics</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="global" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Global Market Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Global Impact Metrics</h3>
                  <p className="text-sm">International market penetration and global business influence</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Operations Excellence Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Operations Center</h3>
                  <p className="text-sm">Real-time operational monitoring and efficiency optimization</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedGroupRoom;
