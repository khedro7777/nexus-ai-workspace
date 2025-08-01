
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface FilterState {
  groupType: string;
  country: string;
  status: string;
  role: string;
  search: string;
}

interface HomepageFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

const HomepageFilters: React.FC<HomepageFiltersProps> = ({ onFiltersChange }) => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<FilterState>({
    groupType: '',
    country: '',
    status: '',
    role: '',
    search: ''
  });

  const groupTypes = [
    { value: 'purchasing', label: 'Purchasing Group' },
    { value: 'investment', label: 'Investment Group' },
    { value: 'supply', label: 'Supply Chain' },
    { value: 'service', label: 'Service Group' },
    { value: 'discount', label: 'Discount Group' }
  ];

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' },
    { value: 'CN', label: 'China' },
    { value: 'SA', label: 'Saudi Arabia' },
    { value: 'AE', label: 'UAE' }
  ];

  const statuses = [
    { value: 'forming', label: 'Forming' },
    { value: 'active', label: 'Active' },
    { value: 'negotiating', label: 'Negotiating' },
    { value: 'contracting', label: 'Contracting' },
    { value: 'completed', label: 'Completed' }
  ];

  const roles = [
    { value: 'member', label: 'Member' },
    { value: 'supplier', label: 'Supplier' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'manager', label: 'Manager' }
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      groupType: '',
      country: '',
      status: '',
      role: '',
      search: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search groups..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Group Type */}
          <Select value={filters.groupType} onValueChange={(value) => handleFilterChange('groupType', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('groupType')} />
            </SelectTrigger>
            <SelectContent>
              {groupTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Country */}
          <Select value={filters.country} onValueChange={(value) => handleFilterChange('country', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('country')} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('status')} />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Role */}
          <Select value={filters.role} onValueChange={(value) => handleFilterChange('role', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('role')} />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={clearFilters} size="sm">
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomepageFilters;
