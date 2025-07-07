
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Eye, MessageCircle, Star } from 'lucide-react';

interface GroupCardProps {
  id: string;
  name: string;
  description: string;
  phase: string;
  memberCount: number;
  status: string;
  maxMembers?: number;
  rating?: number;
  category: string;
}

interface PortalCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  activeGroups: GroupCardProps[];
  route: string;
  kycRequired?: boolean;
  pointsRequired?: boolean;
  mcpExam?: boolean;
}

const PortalCard: React.FC<PortalCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  activeGroups,
  route,
  kycRequired = false,
  pointsRequired = false,
  mcpExam = false
}) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'seeking members':
      case 'البحث عن أعضاء':
        return 'bg-green-500';
      case 'awaiting supply':
      case 'انتظار العرض':
        return 'bg-yellow-500';
      case 'in negotiation':
      case 'قيد التفاوض':
        return 'bg-blue-500';
      case 'completed':
      case 'مكتمل':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase.toLowerCase()) {
      case 'formation':
      case 'التكوين':
        return 'text-blue-600';
      case 'active':
      case 'نشط':
        return 'text-green-600';
      case 'negotiation':
      case 'التفاوض':
        return 'text-orange-600';
      case 'completion':
      case 'الإنجاز':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {kycRequired && (
              <Badge variant="outline" className="text-xs">
                KYC مطلوب
              </Badge>
            )}
            {pointsRequired && (
              <Badge variant="outline" className="text-xs">
                نقاط مطلوبة
              </Badge>
            )}
            {mcpExam && (
              <Badge variant="outline" className="text-xs">
                اختبار MCP
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">المجموعات النشطة:</span>
            <Badge variant="secondary">{activeGroups.length}</Badge>
          </div>
          
          {activeGroups.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {activeGroups.slice(0, 3).map((group) => (
                <div key={group.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{group.name}</h4>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {group.description}
                      </p>
                    </div>
                    {group.rating && (
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{group.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className={`font-medium ${getPhaseColor(group.phase)}`}>
                        {group.phase}
                      </span>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{group.memberCount}{group.maxMembers ? `/${group.maxMembers}` : ''}</span>
                      </div>
                    </div>
                    <Badge 
                      className={`text-xs text-white ${getStatusColor(group.status)}`}
                    >
                      {group.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      انضمام
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      تقديم عرض
                    </Button>
                    <Button size="sm" variant="ghost" className="px-2">
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="px-2">
                      <Eye className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {activeGroups.length > 3 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate(route)}
                >
                  عرض جميع المجموعات ({activeGroups.length})
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">لا توجد مجموعات نشطة حالياً</p>
            </div>
          )}
          
          <div className="flex gap-2 pt-2 border-t">
            <Button 
              onClick={() => navigate(route)}
              className="flex-1 flex items-center gap-2"
            >
              دخول البوابة
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/create-group')}
              className="flex-1"
            >
              إنشاء مجموعة
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortalCard;
