
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Eye, EyeOff } from 'lucide-react';

interface FeatureToggleCardProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  category?: string;
}

const FeatureToggleCard: React.FC<FeatureToggleCardProps> = ({
  title,
  description,
  enabled,
  onToggle,
  category = 'General'
}) => {
  return (
    <Card className={`transition-all duration-200 ${enabled ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={enabled ? 'default' : 'secondary'}>
              {category}
            </Badge>
            <Switch
              checked={enabled}
              onCheckedChange={onToggle}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex items-center gap-2 text-xs">
          {enabled ? (
            <>
              <Eye className="w-3 h-3 text-green-600" />
              <span className="text-green-600 font-medium">Active</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3 text-gray-500" />
              <span className="text-gray-500">Disabled</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureToggleCard;
