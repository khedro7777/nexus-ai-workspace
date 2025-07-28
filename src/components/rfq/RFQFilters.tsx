
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

interface RFQFiltersProps {
  onFilterChange: (filters: any) => void;
  activeFilters: any;
}

const RFQFilters: React.FC<RFQFiltersProps> = ({ onFilterChange, activeFilters }) => {
  const categories = [
    'تطوير البرمجيات',
    'التصميم الجرافيكي',
    'التسويق الرقمي',
    'الترجمة',
    'الكتابة والمحتوى',
    'الاستشارات',
    'التطوير المتنقل',
    'أخرى'
  ];

  const budgetRanges = [
    { label: 'أقل من 1000', value: '0-1000' },
    { label: '1000 - 5000', value: '1000-5000' },
    { label: '5000 - 10000', value: '5000-10000' },
    { label: '10000 - 25000', value: '10000-25000' },
    { label: 'أكثر من 25000', value: '25000+' }
  ];

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...activeFilters, search: value });
  };

  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...activeFilters, category: value === 'all' ? '' : value });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ ...activeFilters, status: value === 'all' ? '' : value });
  };

  const handleBudgetChange = (value: string) => {
    onFilterChange({ ...activeFilters, budget: value === 'all' ? '' : value });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(activeFilters).some(key => activeFilters[key]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            تصفية النتائج
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 ml-1" />
              مسح الفلاتر
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* البحث */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في طلبات الخدمة..."
            value={activeFilters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* التصنيف */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">التصنيف</label>
          <Select value={activeFilters.category || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="اختر التصنيف" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع التصنيفات</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* الحالة */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">الحالة</label>
          <Select value={activeFilters.status || 'all'} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="open">مفتوح</SelectItem>
              <SelectItem value="closed">مغلق</SelectItem>
              <SelectItem value="awarded">تم الترسية</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* الميزانية */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">نطاق الميزانية</label>
          <Select value={activeFilters.budget || 'all'} onValueChange={handleBudgetChange}>
            <SelectTrigger>
              <SelectValue placeholder="اختر النطاق" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع النطاقات</SelectItem>
              {budgetRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* الفلاتر النشطة */}
        {hasActiveFilters && (
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">الفلاتر النشطة</label>
            <div className="flex flex-wrap gap-2">
              {activeFilters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {activeFilters.category}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => handleCategoryChange('all')}
                  />
                </Badge>
              )}
              {activeFilters.status && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {activeFilters.status === 'open' ? 'مفتوح' : 
                   activeFilters.status === 'closed' ? 'مغلق' : 'تم الترسية'}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => handleStatusChange('all')}
                  />
                </Badge>
              )}
              {activeFilters.budget && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {budgetRanges.find(r => r.value === activeFilters.budget)?.label}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => handleBudgetChange('all')}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RFQFilters;
