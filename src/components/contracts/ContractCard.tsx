
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, DollarSign, Users, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface Contract {
  id: string;
  title: string;
  parties: string[];
  type: 'شراء' | 'بيع' | 'خدمات' | 'شراكة';
  status: 'مسودة' | 'قيد المراجعة' | 'موقع' | 'منتهي';
  value: number;
  startDate: string;
  endDate: string;
  progress: number;
}

interface ContractCardProps {
  contract: Contract;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

const ContractCard: React.FC<ContractCardProps> = ({ contract, onView, onEdit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'موقع': return 'bg-green-100 text-green-800';
      case 'قيد المراجعة': return 'bg-yellow-100 text-yellow-800';
      case 'مسودة': return 'bg-gray-100 text-gray-800';
      case 'منتهي': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'موقع': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'قيد المراجعة': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'منتهي': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'شراء': return 'bg-blue-100 text-blue-800';
      case 'بيع': return 'bg-green-100 text-green-800';
      case 'خدمات': return 'bg-purple-100 text-purple-800';
      case 'شراكة': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg leading-tight">{contract.title}</CardTitle>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              {getStatusIcon(contract.status)}
              <Badge className={getStatusColor(contract.status)}>
                {contract.status}
              </Badge>
            </div>
            <Badge className={getTypeColor(contract.type)}>
              {contract.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* معلومات الأطراف */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">الأطراف:</span>
          </div>
          <div className="space-y-1">
            {contract.parties.map((party, index) => (
              <p key={index} className="text-sm text-gray-700 mr-6">{party}</p>
            ))}
          </div>
        </div>

        {/* شريط التقدم */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">التقدم</span>
            <span className="font-medium">{contract.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${contract.progress}%` }}
            ></div>
          </div>
        </div>

        {/* المعلومات المالية والزمنية */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <div>
              <span className="text-gray-600">القيمة:</span>
              <p className="font-medium">${contract.value.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <span className="text-gray-600">الانتهاء:</span>
              <p className="font-medium">{new Date(contract.endDate).toLocaleDateString('ar')}</p>
            </div>
          </div>
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView(contract.id)}
          >
            عرض التفاصيل
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(contract.id)}
            disabled={contract.status === 'منتهي'}
          >
            تعديل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractCard;
