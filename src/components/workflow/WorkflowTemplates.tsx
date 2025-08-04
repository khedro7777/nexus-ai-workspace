
import { WorkflowTemplate } from './WorkflowEngine';

export const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 'group-creation',
    name: 'Create Group Buying Organization',
    description: 'Complete workflow for creating and managing a group buying organization',
    category: 'Group Management',
    estimatedTime: 45,
    complexity: 'medium',
    steps: [
      {
        id: 'define-objectives',
        title: 'Define Business Objectives',
        description: 'Define group objectives and required products',
        status: 'pending',
        type: 'manual',
        duration: 10,
        requirements: ['Clear product description', 'Quantity requirements']
      },
      {
        id: 'set-legal-framework',
        title: 'Set Legal Framework',
        description: 'Choose jurisdiction and contract terms',
        status: 'pending',
        type: 'manual',
        duration: 15,
        requirements: ['Jurisdiction selection', 'Contract terms definition']
      },
      {
        id: 'configure-group',
        title: 'Configure Group',
        description: 'Set minimum and maximum members and required points',
        status: 'pending',
        type: 'manual',
        duration: 10,
        requirements: ['Member count limits', 'Point requirements']
      },
      {
        id: 'create-group',
        title: 'Create Group',
        description: 'Create the group in the system',
        status: 'pending',
        type: 'automatic',
        duration: 2,
        outputs: ['Group ID', 'Group URL']
      },
      {
        id: 'invite-members',
        title: 'Invite Members',
        description: 'Send invitations to potential members',
        status: 'pending',
        type: 'manual',
        duration: 8,
        requirements: ['List of potential members'],
        outputs: ['Invitation links', 'Member responses']
      }
    ]
  },
  {
    id: 'supplier-negotiation',
    name: 'Supplier Negotiation Process',
    description: 'Workflow for negotiating with suppliers and getting the best prices',
    category: 'Negotiations',
    estimatedTime: 60,
    complexity: 'complex',
    steps: [
      {
        id: 'identify-suppliers',
        title: 'Identify Suppliers',
        description: 'Research and evaluate qualified suppliers',
        status: 'pending',
        type: 'manual',
        duration: 20,
        requirements: ['Supplier selection criteria', 'List of potential suppliers']
      },
      {
        id: 'send-rfq',
        title: 'Send RFQ',
        description: 'Send detailed request for quotations to suppliers',
        status: 'pending',
        type: 'automatic',
        duration: 5,
        outputs: ['RFQ documents', 'Supplier notifications']
      },
      {
        id: 'evaluate-offers',
        title: 'Evaluate Offers',
        description: 'Review and analyze received offers',
        status: 'pending',
        type: 'manual',
        duration: 15,
        requirements: ['Evaluation criteria'],
        outputs: ['Offer comparison report']
      },
      {
        id: 'negotiate-terms',
        title: 'Negotiate Terms',
        description: 'Negotiate with suppliers on prices and terms',
        status: 'pending',
        type: 'manual',
        duration: 15,
        outputs: ['Negotiation notes', 'Revised offers']
      },
      {
        id: 'finalize-agreement',
        title: 'Finalize Agreement',
        description: 'Finalize the agreement',
        status: 'pending',
        type: 'approval',
        duration: 5,
        requirements: ['Group member approval'],
        outputs: ['Final contract', 'Signed agreement']
      }
    ]
  },
  {
    id: 'contract-execution',
    name: 'Smart Contract Execution',
    description: 'Workflow for executing smart contracts and managing payments',
    category: 'Contracts',
    estimatedTime: 30,
    complexity: 'medium',
    steps: [
      {
        id: 'contract-review',
        title: 'Contract Review',
        description: 'Review contract terms and ensure correctness',
        status: 'pending',
        type: 'manual',
        duration: 10,
        requirements: ['Final contract copy']
      },
      {
        id: 'member-approval',
        title: 'Member Approval',
        description: 'Get approval from all group members',
        status: 'pending',
        type: 'approval',
        duration: 15,
        requirements: ['Member voting'],
        outputs: ['Approval votes', 'Member signatures']
      },
      {
        id: 'deploy-contract',
        title: 'Deploy Smart Contract',
        description: 'Deploy smart contract on blockchain',
        status: 'pending',
        type: 'automatic',
        duration: 3,
        outputs: ['Contract address', 'Transaction hash']
      },
      {
        id: 'execute-payment',
        title: 'Execute Payment',
        description: 'Execute payments according to contract terms',
        status: 'pending',
        type: 'automatic',
        duration: 2,
        outputs: ['Payment transactions', 'Receipt confirmations']
      }
    ]
  },
  {
    id: 'company-formation',
    name: 'Company Formation Process',
    description: 'Complete workflow for collaborative company formation',
    category: 'Investment',
    estimatedTime: 90,
    complexity: 'complex',
    steps: [
      {
        id: 'define-company-structure',
        title: 'Define Company Structure',
        description: 'Define company type, shares, and governance structure',
        status: 'pending',
        type: 'manual',
        duration: 25,
        requirements: ['Business plan', 'Share distribution plan', 'Governance framework']
      },
      {
        id: 'legal-documentation',
        title: 'Prepare Legal Documentation',
        description: 'Prepare articles of association and legal documents',
        status: 'pending',
        type: 'manual',
        duration: 30,
        requirements: ['Legal templates', 'Company details'],
        outputs: ['Articles of Association', 'Shareholder Agreement']
      },
      {
        id: 'member-investment',
        title: 'Member Investment',
        description: 'Collect investment commitments from members',
        status: 'pending',
        type: 'manual',
        duration: 20,
        requirements: ['Investment amounts', 'Payment methods']
      },
      {
        id: 'regulatory-filing',
        title: 'Regulatory Filing',
        description: 'File company registration with authorities',
        status: 'pending',
        type: 'manual',
        duration: 10,
        requirements: ['All legal documents', 'Registration fees']
      },
      {
        id: 'finalize-incorporation',
        title: 'Finalize Incorporation',
        description: 'Complete company incorporation process',
        status: 'pending',
        type: 'approval',
        duration: 5,
        outputs: ['Company certificate', 'Tax ID', 'Bank account details']
      }
    ]
  },
  {
    id: 'investment-round',
    name: 'Investment Round Management',
    description: 'Manage investment rounds and investor relations',
    category: 'Investment',
    estimatedTime: 75,
    complexity: 'complex',
    steps: [
      {
        id: 'prepare-pitch-deck',
        title: 'Prepare Pitch Deck',
        description: 'Create comprehensive investor presentation',
        status: 'pending',
        type: 'manual',
        duration: 20,
        requirements: ['Business model', 'Financial projections', 'Market analysis']
      },
      {
        id: 'investor-outreach',
        title: 'Investor Outreach',
        description: 'Contact and engage potential investors',
        status: 'pending',
        type: 'manual',
        duration: 25,
        requirements: ['Investor database', 'Pitch materials']
      },
      {
        id: 'due-diligence',
        title: 'Due Diligence Process',
        description: 'Manage investor due diligence requests',
        status: 'pending',
        type: 'manual',
        duration: 20,
        requirements: ['Financial records', 'Legal documents', 'Operational data']
      },
      {
        id: 'negotiate-terms',
        title: 'Negotiate Investment Terms',
        description: 'Negotiate valuation and investment terms',
        status: 'pending',
        type: 'manual',
        duration: 8,
        outputs: ['Term sheet', 'Valuation agreement']
      },
      {
        id: 'close-investment',
        title: 'Close Investment Round',
        description: 'Finalize investment and transfer funds',
        status: 'pending',
        type: 'approval',
        duration: 2,
        outputs: ['Investment agreement', 'Fund transfer', 'Share certificates']
      }
    ]
  },
  {
    id: 'freelancer-onboarding',
    name: 'Freelancer Service Setup',
    description: 'Complete onboarding process for freelancer services',
    category: 'Services',
    estimatedTime: 35,
    complexity: 'simple',
    steps: [
      {
        id: 'profile-setup',
        title: 'Setup Professional Profile',
        description: 'Create comprehensive freelancer profile',
        status: 'pending',
        type: 'manual',
        duration: 15,
        requirements: ['Portfolio samples', 'Skill certifications', 'Professional photo']
      },
      {
        id: 'service-definition',
        title: 'Define Services',
        description: 'Define services and pricing structure',
        status: 'pending',
        type: 'manual',
        duration: 10,
        requirements: ['Service descriptions', 'Pricing tiers', 'Delivery timelines']
      },
      {
        id: 'verification-process',
        title: 'Complete Verification',
        description: 'Complete identity and skill verification',
        status: 'pending',
        type: 'approval',
        duration: 8,
        requirements: ['Identity documents', 'Skill assessments']
      },
      {
        id: 'publish-services',
        title: 'Publish Services',
        description: 'Make services available to clients',
        status: 'pending',
        type: 'automatic',
        duration: 2,
        outputs: ['Service listings', 'Public profile']
      }
    ]
  },
  {
    id: 'supplier-offer-creation',
    name: 'Create Supplier Group Offer',
    description: 'Create volume-based group offers for suppliers',
    category: 'Supplier Management',
    estimatedTime: 40,
    complexity: 'medium',
    steps: [
      {
        id: 'product-specification',
        title: 'Define Product Specifications',
        description: 'Detail product specifications and requirements',
        status: 'pending',
        type: 'manual',
        duration: 15,
        requirements: ['Product details', 'Quality specifications', 'Technical requirements']
      },
      {
        id: 'pricing-tiers',
        title: 'Set Volume Pricing Tiers',
        description: 'Define volume-based pricing structure',
        status: 'pending',
        type: 'manual',
        duration: 10,
        requirements: ['Cost analysis', 'Competitive pricing', 'Margin calculations']
      },
      {
        id: 'offer-terms',
        title: 'Define Offer Terms',
        description: 'Set delivery terms and conditions',
        status: 'pending',
        type: 'manual',
        duration: 8,
        requirements: ['Delivery timeline', 'Payment terms', 'Quality guarantees']
      },
      {
        id: 'admin-review',
        title: 'Admin Review',
        description: 'Platform admin reviews the offer',
        status: 'pending',
        type: 'approval',
        duration: 5,
        requirements: ['Compliance check', 'Quality validation']
      },
      {
        id: 'publish-offer',
        title: 'Publish Group Offer',
        description: 'Make offer available to potential buyers',
        status: 'pending',
        type: 'automatic',
        duration: 2,
        outputs: ['Public offer page', 'Promotional materials']
      }
    ]
  },
  {
    id: 'points-withdrawal',
    name: 'Points Withdrawal Process',
    description: 'Workflow for withdrawing points and converting to money',
    category: 'Points',
    estimatedTime: 20,
    complexity: 'simple',
    steps: [
      {
        id: 'calculate-amount',
        title: 'Calculate Amount',
        description: 'Calculate amount due after commission deduction',
        status: 'pending',
        type: 'automatic',
        duration: 2,
        outputs: ['Net amount', 'Commission breakdown']
      },
      {
        id: 'verify-balance',
        title: 'Verify Balance',
        description: 'Verify sufficient points are available',
        status: 'pending',
        type: 'automatic',
        duration: 1,
        outputs: ['Balance confirmation']
      },
      {
        id: 'submit-request',
        title: 'Submit Withdrawal Request',
        description: 'Submit points withdrawal request',
        status: 'pending',
        type: 'manual',
        duration: 5,
        requirements: ['Bank account details', 'Identity verification']
      },
      {
        id: 'admin-approval',
        title: 'Admin Approval',
        description: 'Admin reviews and approves withdrawal request',
        status: 'pending',
        type: 'approval',
        duration: 10,
        requirements: ['Compliance check', 'Fraud verification']
      },
      {
        id: 'process-payment',
        title: 'Process Payment',
        description: 'Transfer amount to bank account',
        status: 'pending',
        type: 'automatic',
        duration: 2,
        outputs: ['Transaction receipt', 'Bank transfer confirmation']
      }
    ]
  }
];

export const getWorkflowTemplate = (id: string): WorkflowTemplate | undefined => {
  return workflowTemplates.find(template => template.id === id);
};

export const getWorkflowsByCategory = (category: string): WorkflowTemplate[] => {
  return workflowTemplates.filter(template => template.category === category);
};

export const getWorkflowsByComplexity = (complexity: string): WorkflowTemplate[] => {
  return workflowTemplates.filter(template => template.complexity === complexity);
};
