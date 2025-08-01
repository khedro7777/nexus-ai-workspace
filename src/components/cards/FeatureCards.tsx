
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, Package, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  badge?: string;
  action: string;
  route: string;
}

const FeatureCards: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features: FeatureCard[] = [
    {
      id: 'join-group',
      title: 'Join Group',
      description: 'Connect with others to leverage collective buying power and achieve better deals through group purchasing.',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      action: t('joinGroup'),
      route: '/groups'
    },
    {
      id: 'submit-offer',
      title: 'Submit Offer',
      description: 'Submit your business offers to groups and expand your market reach through our global platform.',
      icon: Package,
      color: 'from-green-500 to-green-600',
      action: t('submitOffer'),
      route: '/suppliers'
    },
    {
      id: 'provide-service',
      title: 'Provide Service',
      description: 'Offer your professional services to groups and freelance opportunities worldwide.',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      action: t('provideService'),
      route: '/freelancer-dashboard'
    },
    {
      id: 'discount-offer',
      title: 'Join Discount Offer',
      description: 'Participate in exclusive group-buy discount programs with tiered pricing benefits.',
      icon: Percent,
      color: 'from-orange-500 to-orange-600',
      badge: 'NEW',
      action: t('joinDiscountOffer'),
      route: '/discount-offers'
    }
  ];

  const handleCardAction = (route: string) => {
    navigate(route);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {features.map((feature) => (
        <Card key={feature.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg relative overflow-hidden">
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color}`} />
          
          {feature.badge && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-red-500 text-white text-xs font-bold">
                {feature.badge}
              </Badge>
            </div>
          )}

          <CardHeader>
            <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4`}>
              <feature.icon className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              {feature.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <CardDescription className="text-gray-600 leading-relaxed mb-6">
              {feature.description}
            </CardDescription>
            
            <Button 
              className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-90 text-white font-semibold`}
              onClick={() => handleCardAction(feature.route)}
            >
              {feature.action}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;
