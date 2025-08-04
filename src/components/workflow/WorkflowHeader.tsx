
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause,
  RotateCcw,
  X
} from 'lucide-react';
import { WorkflowTemplate } from './WorkflowEngine';

interface WorkflowHeaderProps {
  template: WorkflowTemplate;
  workflowStatus: 'ready' | 'running' | 'paused' | 'completed' | 'cancelled';
  progressPercentage: number;
  completedSteps: number;
  totalSteps: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onCancel: () => void;
}

const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({
  template,
  workflowStatus,
  progressPercentage,
  completedSteps,
  totalSteps,
  onStart,
  onPause,
  onReset,
  onCancel
}) => {
  return (
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
              {template.complexity === 'simple' ? 'Simple' :
               template.complexity === 'medium' ? 'Medium' : 'Complex'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress: {completedSteps} of {totalSteps}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="flex items-center gap-3">
            {workflowStatus === 'ready' && (
              <Button onClick={onStart} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Start Workflow
              </Button>
            )}
            
            {workflowStatus === 'running' && (
              <Button variant="outline" onClick={onPause} className="flex items-center gap-2">
                <Pause className="w-4 h-4" />
                Pause
              </Button>
            )}
            
            {(workflowStatus === 'paused' || workflowStatus === 'completed') && (
              <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            )}
            
            <Button variant="destructive" onClick={onCancel} className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowHeader;
