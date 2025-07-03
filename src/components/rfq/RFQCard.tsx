
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, DollarSign, Users, FileText, Clock } from 'lucide-react';

interface RFQ {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  deadline: string;
  location: string;
  requirements: string[];
  status: 'open' | 'closed' | 'awarded';
  submissionsCount: number;
  createdAt: string;
  clientName: string;
}

interface RFQCardProps {
  rfq: RFQ;
  onViewDetails: (id: string) => void;
  onSubmitProposal: (id: string) => void;
}

const RFQCard: React.FC<RFQCardProps> = ({ rfq, onViewDetails, onSubmitProposal }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'awarded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'مفتوح';
      case 'closed': return 'مغلق';
      case 'awarded': return 'تم الترسية';
      default: return status;
    }
  };

  const daysLeft = Math.ceil((new Date(rfq.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg leading-tight">{rfq.title}</CardTitle>
          <Badge className={getStatusColor(rfq.status)}>
            {getStatusText(rfq.status)}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{rfq.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* معلومات الميزانية والموقع */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-500" />
            <div>
              <span className="text-gray-600">الميزانية:</span>
              <p className="font-medium">
                {rfq.budget.min.toLocaleString()} - {rfq.budget.max.toLocaleString()} {rfq.budget.currency}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-500" />
            <div>
              <span className="text-gray-600">الموقع:</span>
              <p className="font-medium">{rfq.location}</p>
            </div>
          </div>
        </div>

        {/* المواصفات */}
        <div>
          <span className="text-sm font-medium text-gray-600">المتطلبات الرئيسية:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {rfq.requirements.slice(0, 3).map((req, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {req}
              </Badge>
            ))}
            {rfq.requirements.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{rfq.requirements.length - 3} أخرى
              </Badge>
            )}
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{rfq.submissionsCount} عرض</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span>{rfq.category}</span>
            </div>
          </div>
          {daysLeft > 0 && rfq.status === 'open' && (
            <div className="flex items-center gap-1 text-orange-600">
              <Clock className="w-3 h-3" />
              <span>{daysLeft} يوم متبقي</span>
            </div>
          )}
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(rfq.id)}
          >
            عرض التفاصيل
          </Button>
          {rfq.status === 'open' && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onSubmitProposal(rfq.id)}
            >
              تقديم عرض
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RFQCard;
