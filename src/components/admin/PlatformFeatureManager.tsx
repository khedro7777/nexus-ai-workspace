
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Settings, Save, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import FeatureToggleCard from './FeatureToggleCard';

interface FeatureConfig {
  id: string;
  name: string;
  description: string;
  visible: boolean;
  features: {
    [key: string]: boolean;
  };
}

const PlatformFeatureManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [hasChanges, setHasChanges] = useState(false);

  // Default feature configurations
  const defaultConfigs: FeatureConfig[] = [
    {
      id: 'group_buying',
      name: 'Group Buying Portal',
      description: 'Collective purchasing and group formation',
      visible: true,
      features: {
        create_group: true,
        voting: true,
        mcp_assistant: true,
        offer_submission: true,
        arbitration: true
      }
    },
    {
      id: 'suppliers',
      name: 'Suppliers Portal',
      description: 'Supplier management and offer system',
      visible: true,
      features: {
        dynamic_discounts: true,
        bulk_orders: true,
        supplier_verification: true,
        ipfs_files: true
      }
    },
    {
      id: 'freelancers',
      name: 'Freelancers Portal',
      description: 'Freelance services and project management',
      visible: true,
      features: {
        project_bidding: true,
        skill_verification: true,
        portfolio_showcase: true,
        arbitration: true
      }
    },
    {
      id: 'investment',
      name: 'Investment Portal',
      description: 'Company formation and investment opportunities',
      visible: true,
      features: {
        company_builder: true,
        advisor_election: true,
        investment_tracking: true,
        legal_framework: true
      }
    }
  ];

  // Fetch feature configurations
  const { data: configs, isLoading } = useQuery({
    queryKey: ['platform-features'],
    queryFn: async () => {
      // For now, we'll use localStorage to simulate database storage
      const saved = localStorage.getItem('platform-features');
      if (saved) {
        return JSON.parse(saved) as FeatureConfig[];
      }
      return defaultConfigs;
    }
  });

  // Save feature configurations
  const saveConfigsMutation = useMutation({
    mutationFn: async (newConfigs: FeatureConfig[]) => {
      // Simulate API call - in real implementation, this would save to database
      localStorage.setItem('platform-features', JSON.stringify(newConfigs));
      return newConfigs;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['platform-features'] });
      setHasChanges(false);
      toast.success('Platform features updated successfully');
    },
    onError: () => {
      toast.error('Failed to update platform features');
    }
  });

  const handleToggleVisibility = (id: string, visible: boolean) => {
    if (!configs) return;
    
    const newConfigs = configs.map(config => 
      config.id === id ? { ...config, visible } : config
    );
    
    saveConfigsMutation.mutate(newConfigs);
    setHasChanges(true);
  };

  const handleToggleFeature = (id: string, feature: string, enabled: boolean) => {
    if (!configs) return;
    
    const newConfigs = configs.map(config => 
      config.id === id 
        ? { 
            ...config, 
            features: { ...config.features, [feature]: enabled } 
          }
        : config
    );
    
    saveConfigsMutation.mutate(newConfigs);
    setHasChanges(true);
  };

  const handleResetToDefaults = () => {
    saveConfigsMutation.mutate(defaultConfigs);
    setHasChanges(false);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6" />
              <CardTitle>Platform Feature Manager</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {hasChanges && (
                <Badge variant="outline" className="text-orange-600">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Unsaved Changes
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetToDefaults}
                disabled={saveConfigsMutation.isPending}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Manage portal visibility and feature availability across the platform. 
            Changes are applied immediately and affect all users.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {configs?.map((config) => (
              <FeatureToggleCard
                key={config.id}
                config={config}
                onToggleVisibility={handleToggleVisibility}
                onToggleFeature={handleToggleFeature}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformFeatureManager;
