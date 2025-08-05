import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, Globe, Users, UserCheck, Search } from 'lucide-react';

export interface HomepageFiltersProps {
  onFiltersChange?: (filters: FilterState) => void;
  onFiltersSubmit?: (filters: FilterState) => void;
}

export interface FilterState {
  portalType: string;
  country: string;
  status: string;
  role: string;
}

const HomepageFilters: React.FC<HomepageFiltersProps> = ({ onFiltersChange, onFiltersSubmit }) => {
  const [filters, setFilters] = useState<FilterState>({
    portalType: '',
    country: '',
    status: '',
    role: ''
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { portalType: '', country: '', status: '', role: '' };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const handleSubmit = () => {
    onFiltersSubmit?.(filters);
  };

  const hasFilters = Object.values(filters).some(value => value !== '');

  return (
    <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Smart Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Portal Type</label>
            <Select value={filters.portalType} onValueChange={(value) => handleFilterChange('portalType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Portal Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="group-buying">Group Buying</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="company-formation">Company Formation</SelectItem>
                <SelectItem value="freelancer">Freelancer</SelectItem>
                <SelectItem value="supplier">Supplier</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <Select value={filters.country} onValueChange={(value) => handleFilterChange('country', value)}>
              <SelectTrigger>
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="ae">UAE</SelectItem>
                <SelectItem value="sa">Saudi Arabia</SelectItem>
                <SelectItem value="eg">Egypt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger>
                <Users className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="forming">Forming</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="negotiating">Negotiating</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <Select value={filters.role} onValueChange={(value) => handleFilterChange('role', value)}>
              <SelectTrigger>
                <UserCheck className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="supplier">Supplier</SelectItem>
                <SelectItem value="freelancer">Freelancer</SelectItem>
                <SelectItem value="manager">Group Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {Object.entries(filters).map(([key, value]) => 
              value && (
                <Badge key={key} variant="secondary" className="bg-blue-100 text-blue-800">
                  {key}: {value}
                </Badge>
              )
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleSubmit}
              disabled={!hasFilters}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Groups
            </Button>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomepageFilters;
