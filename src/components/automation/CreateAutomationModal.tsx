
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  MessageSquare, 
  Users, 
  BarChart3, 
  FileText, 
  Target,
  Plus,
  X
} from 'lucide-react';

interface CreateAutomationModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateAutomationModal: React.FC<CreateAutomationModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    trigger: '',
    action: '',
    conditions: ['']
  });

  const categories = [
    { value: 'group_buying', label: 'الشراء الجماعي', icon: ShoppingCart },
    { value: 'negotiations', label: 'المفاوضات', icon: MessageSquare },
    { value: 'suppliers', label: 'الموردين', icon: Users },
    { value: 'analytics', label: 'التحليلات', icon: BarChart3 },
    { value: 'contracts', label: 'العقود', icon: FileText },
    { value: 'optimization', label: 'التحسين', icon: Target }
  ];

  const triggers = [
    'وصول عدد المشاركين إلى حد معين',
    'انتهاء مهلة زمنية محددة',
    'تحديث في قاعدة البيانات',
    'إكمال عملية معينة',
    'تاريخ/وقت محدد',
    'تغيير في حالة العنصر'
  ];

  const actions = [
    'إرسال إشعار بريد إلكتروني',
    'إنشاء مجموعة جديدة',
    'تحديث حالة العنصر',
    'إنشاء تقرير',
    'إرسال رسالة نصية',
    'تشغيل وظيفة مخصصة'
  ];

  const handleAddCondition = () => {
    setFormData(prev => ({
      ...prev,
      conditions: [...prev.conditions, '']
    }));
  };

  const handleRemoveCondition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  const handleConditionChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.map((cond, i) => i === index ? value : cond)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating automation workflow:', formData);
    // هنا يتم إرسال البيانات إلى الخادم
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">إنشاء أتمتة جديدة</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم سير العمل</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="مثال: تجميع طلبات الشراء التلقائي"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="وصف مختصر لما يفعله سير العمل هذا..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">الفئة</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر فئة سير العمل" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <category.icon className="w-4 h-4" />
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Trigger Configuration */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold">إعداد المشغل</h3>
            <div className="space-y-2">
              <Label htmlFor="trigger">نوع المشغل</Label>
              <Select value={formData.trigger} onValueChange={(value) => setFormData(prev => ({ ...prev, trigger: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر متى يتم تشغيل سير العمل" />
                </SelectTrigger>
                <SelectContent>
                  {triggers.map((trigger, index) => (
                    <SelectItem key={index} value={trigger}>
                      {trigger}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Conditions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>الشروط الإضافية</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddCondition}
                  className="flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  إضافة شرط
                </Button>
              </div>
              {formData.conditions.map((condition, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={condition}
                    onChange={(e) => handleConditionChange(index, e.target.value)}
                    placeholder="مثال: عدد المشاركين > 10"
                    className="flex-1"
                  />
                  {formData.conditions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveCondition(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Configuration */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold">إعداد الإجراء</h3>
            <div className="space-y-2">
              <Label htmlFor="action">نوع الإجراء</Label>
              <Select value={formData.action} onValueChange={(value) => setFormData(prev => ({ ...prev, action: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر ما يحدث عند تشغيل سير العمل" />
                </SelectTrigger>
                <SelectContent>
                  {actions.map((action, index) => (
                    <SelectItem key={index} value={action}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-yellow-500 to-orange-500">
              إنشاء سير العمل
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAutomationModal;
