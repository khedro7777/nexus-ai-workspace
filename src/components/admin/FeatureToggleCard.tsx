
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  EyeOff, 
  Users, 
  Vote, 
  Bot, 
  FileText, 
  Shield,
  Calendar,
  Settings
} from 'lucide-react';

interface FeatureConfig {
  id: string;
  name: string;
  description: string;
  visible: boolean;
  features: {
    [key: string]: boolean;
  };
}

interface FeatureToggleCardProps {
  config: FeatureConfig;
  onToggleVisibility: (id: string, visible: boolean) => void;
  onToggleFeature: (id: string, feature: string, enabled: boolean) => void;
}

const FeatureToggleCard: React.FC<FeatureToggleCardProps> = ({
  config,
  onToggleVisibility,
  onToggleFeature
}) => {
  const getFeatureIcon = (featureKey: string) => {
    const iconMap: { [key: string]: React.ElementType } = {
      create_group: Users,
      voting: Vote,
      mcp_assistant: Bot,
      offer_submission: FileText,
      ipfs_files: FileText,
      arbitration: Shield,
      company_builder: Settings,
      advisor_election: Calendar
    };
    
    const IconComponent = iconMap[featureKey] || Settings;
    return <IconComponent className="w-4 h-4" />;
  };

  const getFeatureName = (featureKey: string) => {
    const nameMap: { [key: string]: string } = {
      create_group: 'Create Group',
      voting: 'Voting System',
      mcp_assistant: 'MCP Assistant',
      offer_submission: 'Offer Submission',
      ipfs_files: 'IPFS Files',
      arbitration: 'Arbitration System',
      company_builder: 'Company Builder',
      advisor_election: 'Advisor Election'
    };
    
    return nameMap[featureKey] || featureKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {config.visible ? (
              <Eye className="w-5 h-5 text-green-600" />
            ) : (
              <EyeOff className="w-5 h-5 text-red-600" />
            )}
            <CardTitle className="text-lg">{config.name}</CardTitle>
          </div>
          <Switch
            checked={config.visible}
            onCheckedChange={(checked) => onToggleVisibility(config.id, checked)}
          />
        </div>
        <p className="text-sm text-gray-600">{config.description}</p>
        <Badge variant={config.visible ? 'default' : 'secondary'}>
          {config.visible ? 'Visible' : 'Hidden'}
        </Badge>
      </CardHeader>
      
      {config.visible && (
        <CardContent>
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Portal Features</h4>
            {Object.entries(config.features).map(([featureKey, enabled]) => (
              <div key={featureKey} className="flex items-center justify-between p-2 border rounded-lg">
                <div className="flex items-center gap-2">
                  {getFeatureIcon(featureKey)}
                  <span className="text-sm">{getFeatureName(featureKey)}</span>
                </div>
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) => onToggleFeature(config.id, featureKey, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default FeatureToggleCard;
