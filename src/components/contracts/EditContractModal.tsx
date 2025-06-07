
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';
import { Contract } from '@/hooks/useContractsData';
import { useToast } from '@/hooks/use-toast';

interface EditContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: Contract | null;
  onSave: (contract: Contract) => void;
}

const EditContractModal: React.FC<EditContractModalProps> = ({
  isOpen,
  onClose,
  contract,
  onSave
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Contract>(() => 
    contract || {
      id: '',
      title: '',
      parties: [],
      type: 'خدمات',
      status: 'مسودة',
      value: 0,
      startDate: '',
      endDate: '',
      progress: 0
    }
  );
  const [newParty, setNewParty] = useState('');

  React.useEffect(() => {
    if (contract) {
      setFormData(contract);
    }
  }, [contract]);

  const handleInputChange = (field: keyof Contract, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addParty = () => {
    if (newParty.trim()) {
      setFormData(prev => ({
        ...prev,
        parties: [...prev.parties, newParty.trim()]
      }));
      setNewParty('');
    }
  };

  const removeParty = (index: number) => {
    setFormData(prev => ({
      ...prev,
      parties: prev.parties.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      toast({
        title: "خطأ",
        description: "عنوان العقد مطلوب",
        variant: "destructive"
      });
      return;
    }

    if (formData.parties.length === 0) {
      toast({
        title: "خطأ",
        description: "يجب إضافة طرف واحد على الأقل",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
    toast({
      title: "تم التحديث",
      description: "تم حفظ تعديلات العقد بنجاح"
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {contract ? 'تحرير العقد' : 'عقد جديد'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* معلومات العقد الأساسية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">عنوان العقد *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="أدخل عنوان العقد"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractId">رقم العقد</Label>
              <Input
                id="contractId"
                value={formData.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
                placeholder="CNT-XXX"
              />
            </div>
          </div>

          {/* نوع وحالة العقد */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>نوع العقد</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="شراء">شراء</SelectItem>
                  <SelectItem value="بيع">بيع</SelectItem>
                  <SelectItem value="خدمات">خدمات</SelectItem>
                  <SelectItem value="شراكة">شراكة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>حالة العقد</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="مسودة">مسودة</SelectItem>
                  <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                  <SelectItem value="موقع">موقع</SelectItem>
                  <SelectItem value="منتهي">منتهي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">قيمة العقد (ريال)</Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => handleInputChange('value', Number(e.target.value))}
                placeholder="0"
              />
            </div>
          </div>

          {/* تواريخ العقد */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">تاريخ البداية</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">تاريخ النهاية</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
              />
            </div>
          </div>

          {/* أطراف العقد */}
          <div className="space-y-4">
            <Label>أطراف العقد</Label>
            <div className="flex gap-2">
              <Input
                value={newParty}
                onChange={(e) => setNewParty(e.target.value)}
                placeholder="اسم الطرف"
                onKeyPress={(e) => e.key === 'Enter' && addParty()}
              />
              <Button onClick={addParty} size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.parties.map((party, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {party}
                  <button
                    onClick={() => removeParty(index)}
                    className="mr-2 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* نسبة التقدم */}
          {formData.status === 'موقع' && (
            <div className="space-y-2">
              <Label htmlFor="progress">نسبة التقدم (%)</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => handleInputChange('progress', Number(e.target.value))}
              />
            </div>
          )}
        </div>

        {/* أزرار الحفظ والإلغاء */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>
            حفظ التغييرات
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditContractModal;
