
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { countries, sectors } from '@/constants/createGroupConstants';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Users, Building2, Globe, Info, CheckCircle, AlertCircle, Target, DollarSign } from 'lucide-react';

const CreateGroup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    service_gateway: '',
    business_objective: '',
    legal_framework: '',
    jurisdiction: '',
    country: '',
    sector: '',
    min_members: 5,
    max_members: 20,
    target_amount: 0,
    min_investment: 1000,
    expected_duration: '6-12 months',
    investment_type: 'procurement'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const groupId = Math.random().toString(36).substr(2, 9);

      toast({
        title: "Group Created Successfully!",
        description: "Your new group has been created. You can now invite members to join."
      });

      navigate(`/group/${groupId}`);
    } catch (error: any) {
      console.error('Error creating group:', error);
      toast({
        title: "Group Creation Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = formData.name && formData.type && formData.service_gateway && formData.country && formData.sector;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Group</h1>
            <p className="text-gray-600">Create a collaborative group and leverage collective purchasing power</p>
          </div>

          {/* Alert */}
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Note:</strong> You will be a regular member of the group with full voting rights. Managers can be elected later by group members.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Group Name */}
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">
                      Group Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter a descriptive name for your group"
                      className="mt-1"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Detailed description of group objectives and required products/services"
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium">
                      Country <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sector */}
                  <div>
                    <Label htmlFor="sector" className="text-sm font-medium">
                      Sector <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.sector} onValueChange={(value) => handleInputChange('sector', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Right Column - Group Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Group Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Group Type */}
                  <div>
                    <Label htmlFor="type" className="text-sm font-medium">
                      Group Type <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select group type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="procurement">Procurement</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Service Gateway */}
                  <div>
                    <Label htmlFor="service_gateway" className="text-sm font-medium">
                      Service Gateway <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.service_gateway} onValueChange={(value) => handleInputChange('service_gateway', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select service gateway" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Members Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min_members" className="text-sm font-medium">Minimum Members</Label>
                      <Select 
                        value={formData.min_members.toString()} 
                        onValueChange={(value) => handleInputChange('min_members', parseInt(value))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[3, 5, 7, 10, 15].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num} members</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="max_members" className="text-sm font-medium">Maximum Members</Label>
                      <Select 
                        value={formData.max_members.toString()} 
                        onValueChange={(value) => handleInputChange('max_members', parseInt(value))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[10, 20, 30, 50, 100].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num} members</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Business Objective */}
                  <div>
                    <Label htmlFor="business_objective" className="text-sm font-medium">Business Objective</Label>
                    <Textarea
                      id="business_objective"
                      value={formData.business_objective}
                      onChange={(e) => handleInputChange('business_objective', e.target.value)}
                      placeholder="Main objective for creating this group"
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Settings */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Financial Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="target_amount" className="text-sm font-medium">Target Amount (USD)</Label>
                  <Input
                    id="target_amount"
                    type="number"
                    value={formData.target_amount}
                    onChange={(e) => handleInputChange('target_amount', parseFloat(e.target.value))}
                    placeholder="100000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="min_investment" className="text-sm font-medium">Minimum Investment (USD)</Label>
                  <Input
                    id="min_investment"
                    type="number"
                    value={formData.min_investment}
                    onChange={(e) => handleInputChange('min_investment', parseFloat(e.target.value))}
                    placeholder="1000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="expected_duration" className="text-sm font-medium">Expected Duration</Label>
                  <Select value={formData.expected_duration} onValueChange={(value) => handleInputChange('expected_duration', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3 months">1-3 months</SelectItem>
                      <SelectItem value="3-6 months">3-6 months</SelectItem>
                      <SelectItem value="6-12 months">6-12 months</SelectItem>
                      <SelectItem value="1-2 years">1-2 years</SelectItem>
                      <SelectItem value="2+ years">2+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Legal Framework Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Legal Framework (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="legal_framework" className="text-sm font-medium">Legal Framework</Label>
                  <Input
                    id="legal_framework"
                    value={formData.legal_framework}
                    onChange={(e) => handleInputChange('legal_framework', e.target.value)}
                    placeholder="e.g., Delaware Corporation Law"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="jurisdiction" className="text-sm font-medium">Jurisdiction</Label>
                  <Input
                    id="jurisdiction"
                    value={formData.jurisdiction}
                    onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
                    placeholder="e.g., Delaware Courts"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <Button 
                type="submit" 
                size="lg"
                className="px-12 py-3 text-lg"
                disabled={loading || !isFormValid}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Create Group
                  </>
                )}
              </Button>
            </div>

            {/* Form Status */}
            {!isFormValid && (
              <div className="mt-4 text-center">
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Please complete required fields *
                </Badge>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
