
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Star, 
  MapPin, 
  Award, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

interface EnhancedSupplier {
  id: string;
  name: string;
  description: string;
  logo?: string;
  rating: number;
  reviewCount: number;
  location: string;
  sectors: string[];
  verified: boolean;
  responseTime: string;
  completedOrders: number;
  joinedDate: string;
  specialties: string[];
  deliveryRadius: string;
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  portfolioItems: number;
  certifications: string[];
  workingHours: string;
  languages: string[];
}

interface EnhancedSupplierCardProps {
  supplier: EnhancedSupplier;
  onContact?: (id: string) => void;
  onViewProfile?: (id: string) => void;
  onRequestQuote?: (id: string) => void;
}

const EnhancedSupplierCard: React.FC<EnhancedSupplierCardProps> = ({
  supplier,
  onContact,
  onViewProfile,
  onRequestQuote
}) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
              {supplier.logo || supplier.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-xl">{supplier.name}</CardTitle>
              {supplier.verified && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
            
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{supplier.description}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{supplier.rating}</span>
                <span className="text-gray-500">({supplier.reviewCount} تقييم)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>{supplier.location}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* التخصصات */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">التخصصات</h4>
          <div className="flex flex-wrap gap-1">
            {supplier.sectors.slice(0, 3).map((sector, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {sector}
              </Badge>
            ))}
            {supplier.sectors.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{supplier.sectors.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-600">
              <Users className="w-4 h-4" />
              <span className="font-bold">{supplier.completedOrders}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">مشروع مكتمل</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600">
              <Clock className="w-4 h-4" />
              <span className="font-bold">{supplier.responseTime}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">وقت الرد</p>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center justify-between">
            <span>نطاق التوصيل:</span>
            <span className="font-medium">{supplier.deliveryRadius}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>ساعات العمل:</span>
            <span className="font-medium">{supplier.workingHours}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>اللغات:</span>
            <span className="font-medium">{supplier.languages.join(', ')}</span>
          </div>
        </div>

        {/* الشهادات */}
        {supplier.certifications.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">الشهادات</h4>
            <div className="flex flex-wrap gap-1">
              {supplier.certifications.slice(0, 2).map((cert, index) => (
                <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* معلومات الاتصال */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {supplier.contactInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>هاتف</span>
            </div>
          )}
          {supplier.contactInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span>بريد</span>
            </div>
          )}
          {supplier.contactInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>موقع</span>
            </div>
          )}
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewProfile?.(supplier.id)}
          >
            عرض الملف
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onRequestQuote?.(supplier.id)}
          >
            طلب عرض سعر
          </Button>
        </div>

        {/* زر الاتصال السريع */}
        {onContact && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-blue-600 hover:text-blue-700"
            onClick={() => onContact(supplier.id)}
          >
            <Phone className="w-4 h-4 ml-1" />
            اتصال مباشر
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedSupplierCard;
