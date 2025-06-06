
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  MapPin, 
  Users, 
  Award,
  Eye,
  MessageSquare,
  Truck,
  Shield
} from 'lucide-react';

interface SupplierCardProps {
  supplier: {
    id: string;
    name: string;
    description: string;
    logo?: string;
    rating: number;
    reviewCount: number;
    location: string;
    sector: string[];
    verified: boolean;
    responseTime: string;
    completedOrders: number;
    joinedDate: string;
    specialties: string[];
    deliveryRadius: string;
  };
}

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              {supplier.logo || supplier.name.charAt(0)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-xl">{supplier.name}</CardTitle>
                {supplier.verified && (
                  <Badge className="bg-green-100 text-green-800">
                    <Shield className="w-3 h-3 ml-1" />
                    موثق
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{supplier.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {supplier.location}
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  {supplier.deliveryRadius}
                </div>
              </div>
            </div>
          </div>
          
          <Button variant="ghost" size="icon">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Rating and Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(supplier.rating)}
            </div>
            <span className="font-semibold text-gray-900">{supplier.rating}</span>
            <span className="text-gray-500 text-sm">({supplier.reviewCount} تقييم)</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {supplier.completedOrders} طلب
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              {supplier.responseTime}
            </div>
          </div>
        </div>

        {/* Sectors */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">القطاعات:</h4>
          <div className="flex flex-wrap gap-2">
            {supplier.sector.map((sector, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {sector}
              </Badge>
            ))}
          </div>
        </div>

        {/* Specialties */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">التخصصات:</h4>
          <div className="flex flex-wrap gap-2">
            {supplier.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" className="flex-1">
            عرض الملف الشخصي
          </Button>
          <Button className="flex-1">
            طلب عرض سعر
          </Button>
        </div>

        {/* Join Date */}
        <div className="text-xs text-gray-500 text-center pt-2">
          عضو منذ {supplier.joinedDate}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierCard;
