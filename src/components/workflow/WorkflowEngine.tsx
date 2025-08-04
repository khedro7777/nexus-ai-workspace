
import React, { useState, useCallback } from 'react';
import { toast } from 'sonner';
import WorkflowHeader from './WorkflowHeader';
import WorkflowSteps from './WorkflowSteps';

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

    const currentStep = steps.find(step => step.id === stepId);
    if (currentStep) {
      toast.success(`Step "${currentStep.title}" completed successfully!`);
    }

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
      toast.success('Workflow completed successfully!');
      onWorkflowComplete?.();
    }

    onStepComplete?.(stepId);
  }, [currentStepIndex, steps.length, onStepComplete, onWorkflowComplete, steps]);

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
      toast.info('Workflow started');
    }
  };

  const pauseWorkflow = () => {
    setWorkflowStatus('paused');
    toast.info('Workflow paused');
  };

  const resetWorkflow = () => {
    setWorkflowStatus('ready');
    setCurrentStepIndex(0);
    setSteps(template.steps.map(step => ({ ...step, status: 'pending' as const })));
    toast.info('Workflow reset');
  };

  const cancelWorkflow = () => {
    setWorkflowStatus('cancelled');
    toast.error('Workflow cancelled');
    onWorkflowCancel?.();
  };

  return (
    <div className="space-y-6">
      <WorkflowHeader
        template={template}
        workflowStatus={workflowStatus}
        progressPercentage={progressPercentage}
        completedSteps={completedSteps}
        totalSteps={steps.length}
        onStart={startWorkflow}
        onPause={pauseWorkflow}
        onReset={resetWorkflow}
        onCancel={cancelWorkflow}
      />

      <WorkflowSteps
        steps={steps}
        currentStepIndex={currentStepIndex}
        workflowStatus={workflowStatus}
        onStepComplete={handleStepComplete}
      />
    </div>
  );
};

export default WorkflowEngine;
