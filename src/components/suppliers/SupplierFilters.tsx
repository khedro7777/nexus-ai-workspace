
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Star } from 'lucide-react';

interface SupplierFiltersProps {
  onFilterChange: (filters: any) => void;
  activeFilters: any;
}

const SupplierFilters: React.FC<SupplierFiltersProps> = ({ onFilterChange, activeFilters }) => {
  const sectors = [
    'تكنولوجيا ومعلومات',
    'إنشاءات ومقاولات',
    'أغذية ومشروبات',
    'خدمات طبية',
    'خدمات لوجستية',
    'تصنيع وإنتاج',
    'خدمات تعليمية',
    'خدمات مالية'
  ];

  const locations = [
    'الرياض',
    'جدة',
    'الدمام',
    'مكة',
    'المدينة',
    'الطائف',
    'تبوك',
    'أبها'
  ];

  const clearFilter = (filterKey: string) => {
    onFilterChange({ ...activeFilters, [filterKey]: '' });
  };

  const hasActiveFilters = Object.values(activeFilters).some(value => 
    value && value !== 'all' && (Array.isArray(value) ? value.length > 0 : true)
  );

  const handleSectorToggle = (sector: string) => {
    const currentSectors = activeFilters.sectors || [];
    const newSectors = currentSectors.includes(sector)
      ? currentSectors.filter((s: string) => s !== sector)
      : [...currentSectors, sector];
    onFilterChange({ ...activeFilters, sectors: newSectors });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold">تصفية الموردين</h3>
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

        <div className="space-y-6">
          {/* Search */}
          <div>
            <Label htmlFor="search">البحث</Label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="search"
                placeholder="ابحث عن مورد..."
                value={activeFilters.search || ''}
                onChange={(e) => onFilterChange({ ...activeFilters, search: e.target.value })}
                className="pr-10"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">الموقع</Label>
            <Select value={activeFilters.location || 'all'} onValueChange={(value) => onFilterChange({ ...activeFilters, location: value })}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الموقع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المواقع</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rating */}
          <div>
            <Label htmlFor="rating">التقييم</Label>
            <Select value={activeFilters.rating || 'all'} onValueChange={(value) => onFilterChange({ ...activeFilters, rating: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التقييمات</SelectItem>
                <SelectItem value="5">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>5 نجوم</span>
                  </div>
                </SelectItem>
                <SelectItem value="4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4+ نجوم</span>
                  </div>
                </SelectItem>
                <SelectItem value="3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>3+ نجوم</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Verified Only */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={activeFilters.verified || false}
              onCheckedChange={(checked) => onFilterChange({ ...activeFilters, verified: checked })}
            />
            <Label htmlFor="verified" className="text-sm font-medium">
              موردين موثقين فقط
            </Label>
          </div>

          {/* Sectors */}
          <div>
            <Label className="text-sm font-medium mb-3 block">القطاعات</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {sectors.map((sector) => (
                <div key={sector} className="flex items-center space-x-2">
                  <Checkbox
                    id={sector}
                    checked={activeFilters.sectors?.includes(sector) || false}
                    onCheckedChange={() => handleSectorToggle(sector)}
                  />
                  <Label htmlFor={sector} className="text-sm">
                    {sector}
                  </Label>
                </div>
              ))}
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
              {activeFilters.location && activeFilters.location !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  الموقع: {activeFilters.location}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => clearFilter('location')} />
                </Badge>
              )}
              {activeFilters.sectors?.map((sector: string) => (
                <Badge key={sector} variant="secondary" className="flex items-center gap-1">
                  {sector}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleSectorToggle(sector)} />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupplierFilters;
