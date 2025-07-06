import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Play, 
  Pause,
  RotateCcw
} from 'lucide-react';

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  type: 'automatic' | 'manual' | 'approval';
  duration?: number;
  requirements?: string[];
  outputs?: string[];
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: WorkflowStep[];
  estimatedTime: number;
  complexity: 'simple' | 'medium' | 'complex';
}

interface WorkflowEngineProps {
  template: WorkflowTemplate;
  onStepComplete?: (stepId: string) => void;
  onWorkflowComplete?: () => void;
  onWorkflowCancel?: () => void;
}

const WorkflowEngine: React.FC<WorkflowEngineProps> = ({
  template,
  onStepComplete,
  onWorkflowComplete,
  onWorkflowCancel
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [workflowStatus, setWorkflowStatus] = useState<'ready' | 'running' | 'paused' | 'completed' | 'cancelled'>('ready');
  const [steps, setSteps] = useState<WorkflowStep[]>(template.steps);

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

  const getStatusColor = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'active':
        return 'bg-blue-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const handleStepComplete = useCallback((stepId: string) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId 
          ? { ...step, status: 'completed' as const }
          : step
      )
    );

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setSteps(prevSteps => 
        prevSteps.map((step, index) => 
          index === currentStepIndex + 1
            ? { ...step, status: 'active' as const }
            : step
        )
      );
    } else {
      setWorkflowStatus('completed');
      onWorkflowComplete?.();
    }

    onStepComplete?.(stepId);
  }, [currentStepIndex, steps.length, onStepComplete, onWorkflowComplete]);

  const startWorkflow = () => {
    setWorkflowStatus('running');
    if (steps.length > 0) {
      setSteps(prevSteps => 
        prevSteps.map((step, index) => 
          index === 0 
            ? { ...step, status: 'active' as const }
            : step
        )
      );
    }
  };

  const pauseWorkflow = () => {
    setWorkflowStatus('paused');
  };

  const resetWorkflow = () => {
    setWorkflowStatus('ready');
    setCurrentStepIndex(0);
    setSteps(template.steps.map(step => ({ ...step, status: 'pending' as const })));
  };

  return (
    <div className="space-y-6">
      {/* Workflow Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{template.name}</CardTitle>
              <CardDescription className="mt-2">{template.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {template.category}
              </Badge>
              <Badge 
                variant={template.complexity === 'simple' ? 'default' : 
                        template.complexity === 'medium' ? 'secondary' : 'destructive'}
              >
                {template.complexity === 'simple' ? 'بسيط' :
                 template.complexity === 'medium' ? 'متوسط' : 'معقد'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>التقدم: {completedSteps} من {steps.length}</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="flex items-center gap-3">
              {workflowStatus === 'ready' && (
                <Button onClick={startWorkflow} className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  بدء سير العمل
                </Button>
              )}
              
              {workflowStatus === 'running' && (
                <Button variant="outline" onClick={pauseWorkflow} className="flex items-center gap-2">
                  <Pause className="w-4 h-4" />
                  إيقاف مؤقت
                </Button>
              )}
              
              {(workflowStatus === 'paused' || workflowStatus === 'completed') && (
                <Button variant="outline" onClick={resetWorkflow} className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  إعادة تشغيل
                </Button>
              )}
              
              <Button variant="destructive" onClick={onWorkflowCancel}>
                إلغاء
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Steps */}
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
                      <Badge variant="outline" className="text-xs">
                        {step.type === 'automatic' ? 'تلقائي' : 
                         step.type === 'manual' ? 'يدوي' : 'موافقة'}
                      </Badge>
                      {step.duration && (
                        <span className="text-xs text-gray-500">
                          {step.duration} دقيقة
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                  
                  {step.requirements && step.requirements.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs font-medium text-gray-700">المتطلبات:</span>
                      <ul className="text-xs text-gray-600 mt-1 list-disc list-inside">
                        {step.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {step.status === 'active' && step.type === 'manual' && (
                    <div className="mt-3">
                      <Button 
                        size="sm"
                        onClick={() => handleStepComplete(step.id)}
                        className="flex items-center gap-2"
                      >
                        إكمال الخطوة
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
    </div>
  );
};

export default WorkflowEngine;
