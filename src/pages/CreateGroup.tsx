
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const CreateGroup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const groupType = searchParams.get('type') || 'group_buying';

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    country: '',
    sector: '',
    contractType: 'group',
    maxMembers: 10,
    negotiationRounds: 1,
    minEntryAmount: 0,
    requiresSuppliers: false
  });

  const countries = [
    { value: 'SA', label: 'السعودية' },
    { value: 'AE', label: 'الإمارات' },
    { value: 'EG', label: 'مصر' },
    { value: 'JO', label: 'الأردن' },
    { value: 'LB', label: 'لبنان' },
    { value: 'KW', label: 'الكويت' },
    { value: 'QA', label: 'قطر' },
    { value: 'BH', label: 'البحرين' },
    { value: 'OM', label: 'عمان' }
  ];

  const sectors = [
    'زراعة وأغذية',
    'تكنولوجيا ومعلومات',
    'خدمات طبية',
    'خدمات لوجستية',
    'تصنيع وإنتاج',
    'خدمات تعليمية',
    'خدمات مالية',
    'عقارات وإنشاءات',
    'أخرى'
  ];

  const getGroupTypeTitle = () => {
    switch (groupType) {
      case 'group_buying': return 'إنشاء مجموعة شراء تعاوني';
      case 'marketing': return 'إنشاء مجموعة تسويق تعاوني';
      case 'freelance_request': return 'طلب خدمة مستقلين';
      case 'supplier_request': return 'طلب عروض موردين';
      default: return 'إنشاء مجموعة جديدة';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "خطأ",
        description: "يجب تسجيل الدخول أولاً",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('groups')
        .insert({
          name: formData.name,
          description: formData.description,
          country: formData.country,
          sector: formData.sector,
          group_type: groupType,
          contract_type: formData.contractType,
          creator_id: user.id,
          max_members: formData.maxMembers,
          negotiation_rounds: formData.negotiationRounds,
          min_entry_amount: formData.minEntryAmount,
          requires_suppliers: formData.requiresSuppliers,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Add creator as first member
      await supabase
        .from('group_members')
        .insert({
          group_id: data.id,
          user_id: user.id,
          role: 'creator',
          status: 'active'
        });

      toast({
        title: "تم الإرسال بنجاح",
        description: "تم إرسال الطلب إلى الإدارة لمراجعته. سيتم الرد عليك خلال 24 ساعة."
      });

      navigate('/my-groups');

    } catch (error: any) {
      console.error('Error creating group:', error);
      toast({
        title: "خطأ في الإرسال",
        description: error.message || "حدث خطأ أثناء إنشاء المجموعة",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{getGroupTypeTitle()}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contract Type Selection */}
                  <div>
                    <Label className="text-base font-medium">نوع العقد</Label>
                    <RadioGroup 
                      value={formData.contractType} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, contractType: value }))}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="group" id="group" />
                        <Label htmlFor="group">عقد جماعي - Group</Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="solo" id="solo" />
                        <Label htmlFor="solo">عقد فردي - Solo</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Group Name */}
                  <div>
                    <Label htmlFor="name">اسم المجموعة *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="text-right"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">وصف تفصيلي للمجموعة *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                      rows={4}
                      className="text-right"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <Label htmlFor="country">الدولة / المدينة *</Label>
                    <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الدولة" />
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
                    <Label htmlFor="sector">الغرض / القطاع *</Label>
                    <Select value={formData.sector} onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر القطاع" />
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

                  {/* Max Members - only for group contract */}
                  {formData.contractType === 'group' && (
                    <div>
                      <Label htmlFor="maxMembers">عدد الأعضاء المستهدف</Label>
                      <Input
                        id="maxMembers"
                        type="number"
                        min="2"
                        max="100"
                        value={formData.maxMembers}
                        onChange={(e) => setFormData(prev => ({ ...prev, maxMembers: parseInt(e.target.value) }))}
                      />
                    </div>
                  )}

                  {/* Negotiation Rounds */}
                  <div>
                    <Label htmlFor="negotiationRounds">عدد الجولات المخططة للتفاوض</Label>
                    <Select value={formData.negotiationRounds.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, negotiationRounds: parseInt(value) }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 جولة</SelectItem>
                        <SelectItem value="2">2 جولات</SelectItem>
                        <SelectItem value="3">3 جولات</SelectItem>
                        <SelectItem value="4">أكثر من 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Min Entry Amount */}
                  <div>
                    <Label htmlFor="minEntryAmount">الحد الأدنى للدخول (بالريال السعودي)</Label>
                    <Input
                      id="minEntryAmount"
                      type="number"
                      min="0"
                      value={formData.minEntryAmount}
                      onChange={(e) => setFormData(prev => ({ ...prev, minEntryAmount: parseFloat(e.target.value) }))}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1" disabled={loading}>
                      {loading ? 'جارٍ الإرسال...' : 'أنشئ مجموعتي الآن'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                      إلغاء
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateGroup;
