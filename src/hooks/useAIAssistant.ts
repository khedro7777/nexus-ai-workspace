import { useState, useCallback } from 'react';

export const useAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<string>('');
  const [agentType, setAgentType] = useState<'general' | 'business' | 'negotiation' | 'analysis' | 'translation'>('general');

  const openAssistant = useCallback((
    newContext?: string, 
    newAgentType?: 'general' | 'business' | 'negotiation' | 'analysis' | 'translation'
  ) => {
    if (newContext) setContext(newContext);
    if (newAgentType) setAgentType(newAgentType);
    setIsOpen(true);
  }, []);

  const closeAssistant = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleAssistant = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    context,
    agentType,
    openAssistant,
    closeAssistant,
    toggleAssistant,
    setContext,
    setAgentType
  };
};

