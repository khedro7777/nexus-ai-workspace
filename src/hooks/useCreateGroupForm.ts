
import { useState } from 'react';

export interface CreateGroupFormData {
  name: string;
  description: string;
  country: string;
  sector: string;
  contractType: string;
  maxMembers: number;
  negotiationRounds: number;
  minEntryAmount: number;
  requiresSuppliers: boolean;
}

export const useCreateGroupForm = () => {
  const [formData, setFormData] = useState<CreateGroupFormData>({
    name: '',
    description: '',
    country: '',
    sector: '',
    contractType: 'group',
    maxMembers: 10,
    negotiationRounds: 1,
    minEntryAmount: 0,
    requiresSuppliers: false
  });

  const updateFormData = (updates: Partial<CreateGroupFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return {
    formData,
    setFormData,
    updateFormData
  };
};
