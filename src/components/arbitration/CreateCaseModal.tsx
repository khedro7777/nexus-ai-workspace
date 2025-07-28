
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArbitrationCase } from '@/hooks/useArbitrationData';

interface CreateCaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateCase: (caseData: Partial<ArbitrationCase>) => void;
}

const CreateCaseModal: React.FC<CreateCaseModalProps> = ({ open, onOpenChange, onCreateCase }) => {
  const [formData, setFormData] = useState({
    title: '',
    party1: '',
    party2: '',
    priority: 'متوسط' as const,
    deadline: '',
    amount: '',
    description: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.party1 || !formData.party2) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    onCreateCase({
      title: formData.title,
      parties: [formData.party1, formData.party2],
      priority: formData.priority,
      deadline: formData.deadline,
      amount: formData.amount ? parseFloat(formData.amount) : undefined
    });

    toast({
      title: "تم الإنشاء بنجاح",
      description: "تم إنشاء القضية وسيتم مراجعتها قريباً"
    });

    setFormData({
      title: '',
      party1: '',
      party2: '',
      priority: 'متوسط',
      deadline: '',
      amount: '',
      description: ''
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>إنشاء قضية تحكيم جديدة</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">عنوان القضية *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="أدخل عنوان القضية"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="party1">الطرف الأول *</Label>
              <Input
                id="party1"
                value={formData.party1}
                onChange={(e) => setFormData(prev => ({ ...prev, party1: e.target.value }))}
                placeholder="اسم الطرف الأول"
                required
              />
            </div>
            <div>
              <Label htmlFor="party2">الطرف الثاني *</Label>
              <Input
                id="party2"
                value={formData.party2}
                onChange={(e) => setFormData(prev => ({ ...prev, party2: e.target.value }))}
                placeholder="اسم الطرف الثاني"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">الأولوية</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as any }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="عالي">عالي</SelectItem>
                  <SelectItem value="متوسط">متوسط</SelectItem>
                  <SelectItem value="منخفض">منخفض</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deadline">الموعد النهائي</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="amount">قيمة النزاع (ريال سعودي)</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="أدخل قيمة النزاع"
            />
          </div>

          <div>
            <Label htmlFor="description">وصف القضية</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="أدخل تفاصيل القضية..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              إنشاء القضية
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCaseModal;
