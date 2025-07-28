
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Star, Clock } from 'lucide-react';

interface GatewayCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  participants?: number;
  rating?: number;
  status: 'active' | 'coming_soon' | 'maintenance';
  route: string;
  requiresAuth?: boolean;
}

const GatewayCard: React.FC<GatewayCardProps> = ({
  id,
  title,
  description,
  category,
  features,
  participants = 0,
  rating = 0,
  status,
  route,
  requiresAuth = false
}) => {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 text-white">متاح</Badge>;
      case 'coming_soon':
        return <Badge className="bg-blue-500 text-white">قريباً</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-500 text-white">صيانة</Badge>;
      default:
        return null;
    }
  };

  const handleAccess = () => {
    if (status === 'active') {
      navigate(route);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2">{title}</CardTitle>
            <Badge variant="outline" className="mb-2">{category}</Badge>
            {getStatusBadge()}
          </div>
          <div className="text-right">
            {participants > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>{participants}</span>
              </div>
            )}
            {rating > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <Star className="w-4 h-4 fill-current text-yellow-400" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="space-y-2 mb-4">
          <h4 className="font-medium text-sm">المميزات الرئيسية:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleAccess}
            disabled={status !== 'active'}
            className="flex-1 flex items-center gap-2"
          >
            {status === 'active' ? 'دخول البوابة' : 
             status === 'coming_soon' ? 'قريباً' : 'قيد الصيانة'}
            {status === 'active' && <ArrowLeft className="w-4 h-4" />}
          </Button>
          
          {status === 'maintenance' && (
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4" />
            </Button>
          )}
        </div>

        {requiresAuth && status === 'active' && (
          <p className="text-xs text-gray-500 mt-2">
            * يتطلب تسجيل الدخول
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default GatewayCard;
