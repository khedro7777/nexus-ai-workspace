
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import FeatureToggleCard from './FeatureToggleCard';
import { Save, RefreshCw } from 'lucide-react';

interface PlatformFeature {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  category: string;
}

const PlatformFeatureManager: React.FC = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState<PlatformFeature[]>([
    {
      id: 'group-purchasing',
      title: 'Group Purchasing',
      description: 'Enable users to create and join purchasing groups',
      enabled: true,
      category: 'Core'
    },
    {
      id: 'supplier-offers',
      title: 'Supplier Offers',
      description: 'Allow suppliers to post volume-based discount offers',
      enabled: true,
      category: 'Marketplace'
    },
    {
      id: 'freelancer-services',
      title: 'Freelancer Services',
      description: 'Enable freelancers to offer services to groups',
      enabled: true,
      category: 'Services'
    },
    {
      id: 'c2c-store',
      title: 'C2C Store',
      description: 'Peer-to-peer marketplace for user products',
      enabled: true,
      category: 'Marketplace'
    },
    {
      id: 'company-formation',
      title: 'Company Formation',
      description: 'Collaborative company formation and investment',
      enabled: true,
      category: 'Legal'
    },
    {
      id: 'smart-contracts',
      title: 'Smart Contracts',
      description: 'Automated contract generation and IPFS storage',
      enabled: true,
      category: 'Legal'
    },
    {
      id: 'ai-assistants',
      title: 'AI Assistants',
      description: 'LegalBot, MarketBot, and Translation services',
      enabled: true,
      category: 'AI'
    },
    {
      id: 'voting-system',
      title: 'Voting System',
      description: 'Democratic decision making within groups',
      enabled: true,
      category: 'Governance'
    },
    {
      id: 'arbitration',
      title: 'Arbitration Center',
      description: 'Dispute resolution and mediation services',
      enabled: true,
      category: 'Legal'
    },
    {
      id: 'analytics',
      title: 'Analytics Dashboard',
      description: 'Platform and user analytics insights',
      enabled: true,
      category: 'Insights'
    }
  ]);

  const [loading, setLoading] = useState(false);

  const handleToggleFeature = (featureId: string, enabled: boolean) => {
    setFeatures(prev => 
      prev.map(feature => 
        feature.id === featureId 
          ? { ...feature, enabled }
          : feature
      )
    );
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Settings Saved",
        description: "Platform features have been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save feature settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFeatures(prev => 
      prev.map(feature => ({ ...feature, enabled: true }))
    );
    toast({
      title: "Settings Reset",
      description: "All features have been enabled."
    });
  };

  const categories = [...new Set(features.map(f => f.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Platform Features</h2>
          <p className="text-gray-600">Manage and configure platform capabilities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset All
          </Button>
          <Button onClick={handleSaveChanges} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {categories.map(category => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">{category} Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {features
              .filter(feature => feature.category === category)
              .map(feature => (
                <FeatureToggleCard
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  enabled={feature.enabled}
                  category={feature.category}
                  onToggle={(enabled) => handleToggleFeature(feature.id, enabled)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlatformFeatureManager;
