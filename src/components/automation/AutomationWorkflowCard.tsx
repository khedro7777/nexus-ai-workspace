
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Clock, 
  Target,
  TrendingUp,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'paused' | 'testing';
  trigger: string;
  action: string;
  lastRun: string;
  successRate: number;
  executionCount: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface AutomationWorkflowCardProps {
  workflow: AutomationWorkflow;
  onToggle: (id: string, currentStatus: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const AutomationWorkflowCard: React.FC<AutomationWorkflowCardProps> = ({
  workflow,
  onToggle,
  onEdit,
  onDelete
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'bg-green-500', label: 'نشط', textColor: 'text-green-600' };
      case 'paused':
        return { color: 'bg-yellow-500', label: 'متوقف', textColor: 'text-yellow-600' };
      case 'testing':
        return { color: 'bg-blue-500', label: 'اختبار', textColor: 'text-blue-600' };
      default:
        return { color: 'bg-gray-500', label: 'غير محدد', textColor: 'text-gray-600' };
    }
  };

  const statusConfig = getStatusConfig(workflow.status);
  const IconComponent = workflow.icon;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-r-4" 
          style={{ borderRightColor: statusConfig.color.replace('bg-', '#') }}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg ${workflow.color} flex items-center justify-center`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg mb-1">{workflow.name}</CardTitle>
              <p className="text-gray-600 text-sm">{workflow.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${statusConfig.color} text-white border-none`}>
              {statusConfig.label}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(workflow.id)}>
                  <Edit className="w-4 h-4 mr-2" />
                  تحرير
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onToggle(workflow.id, workflow.status)}
                  className={statusConfig.textColor}
                >
                  {workflow.status === 'active' ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      إيقاف
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      تشغيل
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(workflow.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  حذف
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Trigger and Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Target className="w-4 h-4" />
              المشغل
            </div>
            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
              {workflow.trigger}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Play className="w-4 h-4" />
              الإجراء
            </div>
            <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
              {workflow.action}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
              <Clock className="w-4 h-4" />
              آخر تشغيل
            </div>
            <p className="text-sm font-medium">{workflow.lastRun}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
              <TrendingUp className="w-4 h-4" />
              معدل النجاح
            </div>
            <p className="text-sm font-medium text-green-600">{workflow.successRate}%</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
              <Target className="w-4 h-4" />
              مرات التنفيذ
            </div>
            <p className="text-sm font-medium">{workflow.executionCount}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>الأداء العام</span>
            <span>{workflow.successRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${workflow.successRate}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationWorkflowCard;
