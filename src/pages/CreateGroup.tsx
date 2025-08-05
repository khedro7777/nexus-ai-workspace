
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Building2, 
  Target,
  Calendar,
  DollarSign,
  Globe,
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Info,
  Lightbulb
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  // Basic Information
  groupName: string;
  description: string;
  category: string;
  contractType: 'group' | 'individual';
  
  // Group Settings
  maxMembers: number;
  minMembers: number;
  joiningFee: number;
  
  // Location & Scope
  country: string;
  region: string;
  globalAccess: boolean;
  
  // Business Details
  businessObjective: string;
  targetBudget: number;
  negotiationRounds: number;
  
  // Legal & Compliance
  legalFramework: string;
  jurisdiction: string;
  complianceRequirements: string[];
  
  // Timeline
  formationDeadline: string;
  firstNegotiationDate: string;
  
  // Privacy & Access
  visibility: 'public' | 'private' | 'invitation-only';
  requireApproval: boolean;
  
  // Additional Features
  features: string[];
}

const CreateGroup = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const [formData, setFormData] = useState<FormData>({
    groupName: '',
    description: '',
    category: '',
    contractType: 'group',
    maxMembers: 50,
    minMembers: 5,
    joiningFee: 0,
    country: '',
    region: '',
    globalAccess: false,
    businessObjective: '',
    targetBudget: 0,
    negotiationRounds: 3,
    legalFramework: '',
    jurisdiction: '',
    complianceRequirements: [],
    formationDeadline: '',
    firstNegotiationDate: '',
    visibility: 'public',
    requireApproval: false,
    features: []
  });

  const categories = [
    'Technology & Software',
    'Manufacturing & Equipment',
    'Office Supplies',
    'Healthcare & Medical',
    'Energy & Utilities',
    'Construction & Materials',
    'Professional Services',
    'Transportation & Logistics',
    'Food & Beverage',
    'Marketing & Advertising'
  ];

  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Germany',
    'France',
    'Australia',
    'Japan',
    'Singapore',
    'UAE',
    'Saudi Arabia'
  ];

  const legalFrameworks = [
    'Common Law',
    'Civil Law',
    'Sharia Law',
    'Hybrid System',
    'Custom Agreement'
  ];

  const availableFeatures = [
    { id: 'smart-contracts', name: 'Smart Contracts', description: 'Automated contract execution' },
    { id: 'ai-assistant', name: 'AI Assistant', description: 'Intelligent recommendations' },
    { id: 'voting-system', name: 'Voting System', description: 'Democratic decision making' },
    { id: 'arbitration', name: 'Arbitration Support', description: 'Dispute resolution' },
    { id: 'analytics', name: 'Advanced Analytics', description: 'Performance insights' },
    { id: 'multi-currency', name: 'Multi-Currency', description: 'International payments' }
  ];

  const complianceOptions = [
    'GDPR Compliance',
    'CCPA Compliance',
    'SOX Compliance',
    'ISO 27001',
    'PCI DSS',
    'HIPAA',
    'Custom Requirements'
  ];

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Group Created Successfully!",
        description: `"${formData.groupName}" has been created and is now accepting members.`
      });
      
      navigate('/my-groups');
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "There was an error creating your group. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="groupName">Group Name *</Label>
                  <Input
                    id="groupName"
                    value={formData.groupName}
                    onChange={(e) => updateFormData({ groupName: e.target.value })}
                    placeholder="Enter a descriptive name for your group"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData({ description: e.target.value })}
                    placeholder="Describe the purpose and goals of your group"
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Contract Type</Label>
                  <RadioGroup 
                    value={formData.contractType} 
                    onValueChange={(value: 'group' | 'individual') => updateFormData({ contractType: value })}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="group" id="group" />
                      <Label htmlFor="group">Group Contract - Collective purchasing with shared terms</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual">Individual Contracts - Separate agreements for each member</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Group Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minMembers">Minimum Members</Label>
                  <Input
                    id="minMembers"
                    type="number"
                    min="2"
                    max="100"
                    value={formData.minMembers}
                    onChange={(e) => updateFormData({ minMembers: parseInt(e.target.value) })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="maxMembers">Maximum Members</Label>
                  <Input
                    id="maxMembers"
                    type="number"
                    min="5"
                    max="1000"
                    value={formData.maxMembers}
                    onChange={(e) => updateFormData({ maxMembers: parseInt(e.target.value) })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="joiningFee">Joining Fee (USD)</Label>
                  <Input
                    id="joiningFee"
                    type="number"
                    min="0"
                    value={formData.joiningFee}
                    onChange={(e) => updateFormData({ joiningFee: parseInt(e.target.value) })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="targetBudget">Target Budget (USD)</Label>
                  <Input
                    id="targetBudget"
                    type="number"
                    min="0"
                    value={formData.targetBudget}
                    onChange={(e) => updateFormData({ targetBudget: parseInt(e.target.value) })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="mt-6">
                <Label>Privacy Settings</Label>
                <RadioGroup 
                  value={formData.visibility} 
                  onValueChange={(value: 'public' | 'private' | 'invitation-only') => updateFormData({ visibility: value })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">Public - Anyone can find and join</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">Private - Requires approval to join</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="invitation-only" id="invitation" />
                    <Label htmlFor="invitation">Invitation Only - Members can only be invited</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Location & Business Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Primary Country</Label>
                  <Select value={formData.country} onValueChange={(value) => updateFormData({ country: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="region">Region/State</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => updateFormData({ region: e.target.value })}
                    placeholder="Enter region or state"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox 
                  id="globalAccess" 
                  checked={formData.globalAccess}
                  onCheckedChange={(checked) => updateFormData({ globalAccess: checked as boolean })}
                />
                <Label htmlFor="globalAccess">Allow global membership</Label>
              </div>

              <div className="mt-6">
                <Label htmlFor="businessObjective">Business Objective</Label>
                <Textarea
                  id="businessObjective"
                  value={formData.businessObjective}
                  onChange={(e) => updateFormData({ businessObjective: e.target.value })}
                  placeholder="Describe what your group aims to achieve"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="negotiationRounds">Planned Negotiation Rounds</Label>
                <Select 
                  value={formData.negotiationRounds.toString()} 
                  onValueChange={(value) => updateFormData({ negotiationRounds: parseInt(value) })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Round</SelectItem>
                    <SelectItem value="2">2 Rounds</SelectItem>
                    <SelectItem value="3">3 Rounds</SelectItem>
                    <SelectItem value="4">4 Rounds</SelectItem>
                    <SelectItem value="5">5+ Rounds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal Framework & Timeline</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="legalFramework">Legal Framework</Label>
                  <Select value={formData.legalFramework} onValueChange={(value) => updateFormData({ legalFramework: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      {legalFrameworks.map((framework) => (
                        <SelectItem key={framework} value={framework}>
                          {framework}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="jurisdiction">Jurisdiction</Label>
                  <Input
                    id="jurisdiction"
                    value={formData.jurisdiction}
                    onChange={(e) => updateFormData({ jurisdiction: e.target.value })}
                    placeholder="e.g., Delaware, UK, Singapore"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="formationDeadline">Formation Deadline</Label>
                  <Input
                    id="formationDeadline"
                    type="date"
                    value={formData.formationDeadline}
                    onChange={(e) => updateFormData({ formationDeadline: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="firstNegotiation">First Negotiation Date</Label>
                  <Input
                    id="firstNegotiation"
                    type="date"
                    value={formData.firstNegotiationDate}
                    onChange={(e) => updateFormData({ firstNegotiationDate: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="mt-6">
                <Label className="text-base font-medium mb-3 block">Compliance Requirements</Label>
                <div className="grid grid-cols-2 gap-2">
                  {complianceOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox 
                        id={option}
                        checked={formData.complianceRequirements.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData({ 
                              complianceRequirements: [...formData.complianceRequirements, option]
                            });
                          } else {
                            updateFormData({ 
                              complianceRequirements: formData.complianceRequirements.filter(req => req !== option)
                            });
                          }
                        }}
                      />
                      <Label htmlFor={option} className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Features & Review</h3>
              
              <div className="mb-6">
                <Label className="text-base font-medium mb-3 block">Select Additional Features</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableFeatures.map((feature) => (
                    <div key={feature.id} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox 
                          id={feature.id}
                          checked={formData.features.includes(feature.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData({ 
                                features: [...formData.features, feature.id]
                              });
                            } else {
                              updateFormData({ 
                                features: formData.features.filter(f => f !== feature.id)
                              });
                            }
                          }}
                        />
                        <Label htmlFor={feature.id} className="font-medium">{feature.name}</Label>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold mb-4">Review Your Group</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Group Name:</strong> {formData.groupName}
                  </div>
                  <div>
                    <strong>Category:</strong> {formData.category}
                  </div>
                  <div>
                    <strong>Members:</strong> {formData.minMembers}-{formData.maxMembers}
                  </div>
                  <div>
                    <strong>Visibility:</strong> {formData.visibility}
                  </div>
                  <div>
                    <strong>Country:</strong> {formData.country}
                  </div>
                  <div>
                    <strong>Budget:</strong> ${formData.targetBudget.toLocaleString()}
                  </div>
                </div>
                
                {formData.features.length > 0 && (
                  <div className="mt-4">
                    <strong>Features:</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.features.map((featureId) => {
                        const feature = availableFeatures.find(f => f.id === featureId);
                        return feature ? (
                          <Badge key={featureId} variant="outline">
                            {feature.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Group</h1>
          <p className="text-gray-600">Set up your collaborative purchasing group</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Content */}
        <Card>
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep === totalSteps ? (
            <Button 
              onClick={handleSubmit}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Create Group
                </>
              )}
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
