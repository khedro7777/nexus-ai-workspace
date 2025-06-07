
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

interface NegotiationFiltersProps {
  onFilterChange: (filters: any) => void;
  activeFilters: any;
}

const NegotiationFilters: React.FC<NegotiationFiltersProps> = ({ onFilterChange, activeFilters }) => {
  const statusOptions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'active', label: 'نشطة' },
    { value: 'completed', label: 'مكتملة' },
    { value: 'paused', label: 'متوقفة' },
    { value: 'pending', label: 'معلقة' },
    { value: 'cancelled', label: 'ملغية' }
  ];

  const sectorOptions = [
    { value: 'all', label: 'جميع القطاعات' },
    { value: 'tech', label: 'تكنولوجيا' },
    { value: 'construction', label: 'إنشاءات' },
    { value: 'food', label: 'أغذية' },
    { value: 'healthcare', label: 'صحة' }
  ];

  const clearFilter = (filterKey: string) => {
    onFilterChange({ ...activeFilters, [filterKey]: '' });
  };

  const hasActiveFilters = Object.values(activeFilters).some(value => value && value !== 'all');

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold">تصفية المفاوضات</h3>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onFilterChange({})}
              className="mr-auto"
            >
              <X className="w-4 h-4 ml-1" />
              إزالة التصفية
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="search">البحث</Label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="search"
                placeholder="ابحث عن مفاوضة..."
                value={activeFilters.search || ''}
                onChange={(e) => onFilterChange({ ...activeFilters, search: e.target.value })}
                className="pr-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">الحالة</Label>
            <Select value={activeFilters.status || 'all'} onValueChange={(value) => onFilterChange({ ...activeFilters, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="sector">القطاع</Label>
            <Select value={activeFilters.sector || 'all'} onValueChange={(value) => onFilterChange({ ...activeFilters, sector: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sectorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="priceRange">نطاق السعر</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="من"
                value={activeFilters.minPrice || ''}
                onChange={(e) => onFilterChange({ ...activeFilters, minPrice: e.target.value })}
              />
              <Input
                placeholder="إلى"
                value={activeFilters.maxPrice || ''}
                onChange={(e) => onFilterChange({ ...activeFilters, maxPrice: e.target.value })}
              />
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-6 pt-4 border-t">
            <Label className="text-sm font-medium mb-2 block">المرشحات النشطة:</Label>
            <div className="flex flex-wrap gap-2">
              {activeFilters.search && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  بحث: {activeFilters.search}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('search')} />
                </Badge>
              )}
              {activeFilters.status && activeFilters.status !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  الحالة: {statusOptions.find(s => s.value === activeFilters.status)?.label}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('status')} />
                </Badge>
              )}
              {activeFilters.sector && activeFilters.sector !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  القطاع: {sectorOptions.find(s => s.value === activeFilters.sector)?.label}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('sector')} />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NegotiationFilters;
