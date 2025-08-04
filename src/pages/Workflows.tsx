
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  Play,
  Clock,
  Settings,
  Users,
  FileText,
  Building2,
  Coins,
  Workflow
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import WorkflowEngine from '@/components/workflow/WorkflowEngine';

// Mock workflow templates with English content
const workflowTemplates = [
  {
    id: '1',
    name: 'Group Formation Workflow',
    description: 'Complete process for creating and setting up a new purchasing group',
    category: 'Group Management',
    estimatedTime: 30,
    complexity: 'medium' as const,
    steps: [
      {
        id: 'step-1',
        title: 'Define Group Purpose',
        description: 'Clearly outline the group\'s purchasing objectives and target products',
        status: 'pending' as const,
        type: 'manual' as const,
        duration: 10,
        requirements: ['Business plan outline', 'Target product list'],
        outputs: ['Group charter document']
      },
      {
        id: 'step-2',
        title: 'Set Governance Rules',
        description: 'Establish voting mechanisms and decision-making processes',
        status: 'pending' as const,
        type: 'manual' as const,
        duration: 15,
        requirements: ['Group charter', 'Governance template'],
        outputs: ['Governance document', 'Voting rules']
      },
      {
        id: 'step-3',
        title: 'Generate Legal Documents',
        description: 'Automatically create necessary legal agreements',
        status: 'pending' as const,
        type: 'automatic' as const,
        duration: 5,
        requirements: ['Group details', 'Governance rules'],
        outputs: ['Legal agreements', 'Terms of service']
      }
    ]
  },
  {
    id: '2',
    name: 'Supplier Negotiation Process',
    description: 'Structured approach to negotiate with suppliers for better terms',
    category: 'Negotiations',
    estimatedTime: 45,
    complexity: 'complex' as const,
    steps: [
      {
        id: 'step-1',
        title: 'Prepare Negotiation Strategy',
        description: 'Analyze requirements and prepare negotiation points',
        status: 'pending' as const,
        type: 'manual' as const,
        duration: 20,
        requirements: ['RFQ details', 'Market analysis'],
        outputs: ['Negotiation strategy', 'Key talking points']
      },
      {
        id: 'step-2',
        title: 'Conduct Negotiations',
        description: 'Execute negotiation sessions with suppliers',
        status: 'pending' as const,
        type: 'manual' as const,
        duration: 20,
        requirements: ['Strategy document', 'Supplier contacts'],
        outputs: ['Negotiation notes', 'Revised offers']
      },
      {
        id: 'step-3',
        title: 'Finalize Agreement',
        description: 'Complete final agreement and documentation',
        status: 'pending' as const,
        type: 'approval' as const,
        duration: 5,
        requirements: ['Final terms', 'Legal review'],
        outputs: ['Signed contract', 'Payment schedule']
      }
    ]
  },
  {
    id: '3',
    name: 'Contract Management Workflow',
    description: 'End-to-end contract lifecycle management process',
    category: 'Contracts',
    estimatedTime: 25,
    complexity: 'simple' as const,
    steps: [
      {
        id: 'step-1',
        title: 'Draft Contract',
        description: 'Create initial contract based on negotiated terms',
        status: 'pending' as const,
        type: 'automatic' as const,
        duration: 10,
        requirements: ['Negotiation results', 'Contract template'],
        outputs: ['Draft contract']
      },
      {
        id: 'step-2',
        title: 'Review and Approve',
        description: 'Legal and business review of contract terms',
        status: 'pending' as const,
        type: 'approval' as const,
        duration: 10,
        requirements: ['Draft contract', 'Stakeholder list'],
        outputs: ['Approved contract', 'Review comments']
      },
      {
        id: 'step-3',
        title: 'Execute Contract',
        description: 'Finalize signatures and activate contract',
        status: 'pending' as const,
        type: 'manual' as const,
        duration: 5,
        requirements: ['Approved contract', 'Signatory access'],
        outputs: ['Executed contract', 'Activation notice']
      }
    ]
  },
  {
    id: '4',
    name: 'Service Provider Onboarding',
    description: 'Complete onboarding process for new service providers',
    category: 'Services',
    estimatedTime: 35,
    complexity: 'medium' as const,
    steps: [
      {
        id: 'step-1',
        title: 'Verify Credentials',
        description: 'Check and validate service provider credentials',
        status: 'pending' as const,
        type: 'manual' as const,
        duration: 15,
        requirements: ['Application form', 'Verification documents'],
        outputs: ['Credential report', 'Verification status']
      },
      {
        id: 'step-2',
        title: 'Setup Profile',
        description: 'Create comprehensive service provider profile',
        status: 'pending' as const,
        type: 'manual' as const,
        duration: 15,
        requirements: ['Verified credentials', 'Profile template'],
        outputs: ['Complete profile', 'Service catalog']
      },
      {
        id: 'step-3',
        title: 'Activate Account',
        description: 'Finalize account setup and grant platform access',
        status: 'pending' as const,
        type: 'automatic' as const,
        duration: 5,
        requirements: ['Complete profile', 'System access'],
        outputs: ['Active account', 'Welcome package']
      }
    ]
  }
];

const Workflows = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isWorkflowDialogOpen, setIsWorkflowDialogOpen] = useState(false);

  const categories = [...new Set(workflowTemplates.map(template => template.category))];

  const filteredWorkflows = workflowTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    const matchesComplexity = !selectedComplexity || template.complexity === selectedComplexity;
    
    return matchesSearch && matchesCategory && matchesComplexity;
  });

  const getWorkflowIcon = (category: string) => {
    switch (category) {
      case 'Group Management':
        return Users;
      case 'Negotiations':
        return FileText;
      case 'Contracts':
        return Building2;
      case 'Services':
        return Settings;
      case 'Points':
        return Coins;
      default:
        return Settings;
    }
  };

  const handleStartWorkflow = (template) => {
    setSelectedWorkflow(template);
    setIsWorkflowDialogOpen(true);
  };

  const handleWorkflowComplete = () => {
    setIsWorkflowDialogOpen(false);
    setSelectedWorkflow(null);
  };

  const handleWorkflowCancel = () => {
    setIsWorkflowDialogOpen(false);
    setSelectedWorkflow(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Workflow className="w-8 h-8 text-blue-600" />
            Smart Workflows
          </h1>
          <p className="text-gray-600">
            Automate your business processes with intelligent workflow templates
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search workflows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Complexity</SelectItem>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="complex">Complex</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Advanced
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredWorkflows.map((template) => {
            const IconComponent = getWorkflowIcon(template.category);
            
            return (
              <Card key={template.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge 
                      variant={template.complexity === 'simple' ? 'default' : 
                              template.complexity === 'medium' ? 'secondary' : 'destructive'}
                    >
                      {template.complexity}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{template.estimatedTime} min</span>
                    </div>
                    <span>{template.steps.length} steps</span>
                  </div>

                  <Button 
                    onClick={() => handleStartWorkflow(template)}
                    className="w-full flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Start Workflow
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredWorkflows.length === 0 && (
          <div className="text-center py-12">
            <Workflow className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold mb-2">No workflows found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Workflow Execution Dialog */}
      <Dialog open={isWorkflowDialogOpen} onOpenChange={setIsWorkflowDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Execute Workflow</DialogTitle>
            <DialogDescription>
              Follow the steps to complete your workflow process
            </DialogDescription>
          </DialogHeader>
          
          {selectedWorkflow && (
            <WorkflowEngine
              template={selectedWorkflow}
              onWorkflowComplete={handleWorkflowComplete}
              onWorkflowCancel={handleWorkflowCancel}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Workflows;
