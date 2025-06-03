
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'active' | 'pending' | 'completed' | 'new';
  members?: number;
  progress?: number;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  status,
  members,
  progress,
  onClick
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'bg-green-500', text: 'Active', textColor: 'text-green-700' };
      case 'pending':
        return { color: 'bg-orange-500', text: 'Pending', textColor: 'text-orange-700' };
      case 'completed':
        return { color: 'bg-blue-500', text: 'Completed', textColor: 'text-blue-700' };
      default:
        return { color: 'bg-purple-500', text: 'New', textColor: 'text-purple-700' };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <Card className="card-hover cursor-pointer group relative overflow-hidden" onClick={onClick}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={`${statusConfig.color} text-white border-none text-xs`}>
                  {statusConfig.text}
                </Badge>
                {members && (
                  <span className="text-xs text-muted-foreground">
                    {members} members
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative">
        <CardDescription className="mb-4">
          {description}
        </CardDescription>

        {progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          Open Assistant
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
