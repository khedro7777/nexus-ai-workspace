
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  User,
  Bot,
  UserCheck
} from 'lucide-react';
import { WorkflowStep } from './WorkflowEngine';

interface WorkflowStepsProps {
  steps: WorkflowStep[];
  currentStepIndex: number;
  workflowStatus: 'ready' | 'running' | 'paused' | 'completed' | 'cancelled';
  onStepComplete: (stepId: string) => void;
}

const WorkflowSteps: React.FC<WorkflowStepsProps> = ({
  steps,
  currentStepIndex,
  workflowStatus,
  onStepComplete
}) => {
  const getStatusIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'active':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getTypeIcon = (type: WorkflowStep['type']) => {
    switch (type) {
      case 'automatic':
        return <Bot className="w-4 h-4 text-purple-500" />;
      case 'manual':
        return <User className="w-4 h-4 text-blue-500" />;
      case 'approval':
        return <UserCheck className="w-4 h-4 text-green-500" />;
      default:
        return <User className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <Card key={step.id} className={cn(
          "transition-all duration-200",
          step.status === 'active' && "ring-2 ring-blue-500 ring-opacity-50",
          step.status === 'completed' && "bg-green-50 border-green-200"
        )}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                {getStatusIcon(step.status)}
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-px h-8 mt-2",
                    step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                  )} />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(step.type)}
                    <Badge variant="outline" className="text-xs">
                      {step.type === 'automatic' ? 'Automatic' : 
                       step.type === 'manual' ? 'Manual' : 'Approval'}
                    </Badge>
                    {step.duration && (
                      <span className="text-xs text-gray-500">
                        {step.duration} min
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                
                {step.requirements && step.requirements.length > 0 && (
                  <div className="mt-2">
                    <span className="text-xs font-medium text-gray-700">Requirements:</span>
                    <ul className="text-xs text-gray-600 mt-1 list-disc list-inside">
                      {step.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {step.outputs && step.outputs.length > 0 && (
                  <div className="mt-2">
                    <span className="text-xs font-medium text-gray-700">Outputs:</span>
                    <ul className="text-xs text-gray-600 mt-1 list-disc list-inside">
                      {step.outputs.map((output, idx) => (
                        <li key={idx}>{output}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {step.status === 'active' && step.type === 'manual' && workflowStatus === 'running' && (
                  <div className="mt-3">
                    <Button 
                      size="sm"
                      onClick={() => onStepComplete(step.id)}
                      className="flex items-center gap-2"
                    >
                      Complete Step
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WorkflowSteps;
