
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useNavigate } from 'react-router-dom';

const CompanyFormation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    country: 'السعودية',
    sector: 'تقنية',
    group_type: 'company_formation',
    contract_type: 'llc',
    max_members: 10,
    min_entry_amount: 10000,
    requires_suppliers: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "خطأ في المصادقة",
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
          type: formData.group_type,
          service_gateway: 'company_formation',
          business_objective: `تأسيس شركة في قطاع ${formData.sector}`,
          legal_framework: formData.contract_type,
          jurisdiction: formData.country,
          creator_id: user.id,
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "تم إنشاء مجموعة تأسيس الشركة بنجاح",
        description: "تم إنشاء مجموعتك لتأسيس الشركة"
      });

      navigate(`/group/${data.id}`);
    } catch (error: any) {
      toast({
        title: "خطأ في إنشاء المجموعة",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">تأسيس الشركات</h1>
            <p className="text-gray-600">ابدأ رحلة تأسيس شركتك مع شركاء موثوقين</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>معلومات الشركة المراد تأسيسها</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">اسم الشركة المقترح</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="أدخل اسم الشركة"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="sector">قطاع النشاط</Label>
                    <Select value={formData.sector} onValueChange={(value) => handleInputChange('sector', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="تقنية">تقنية المعلومات</SelectItem>
                        <SelectItem value="تجارة">التجارة والتوزيع</SelectItem>
                        <SelectItem value="خدمات">الخدمات المهنية</SelectItem>
                        <SelectItem value="صناعة">الصناعة والتصنيع</SelectItem>
                        <SelectItem value="عقارات">العقارات والإنشاءات</SelectItem>
                        <SelectItem value="صحة">الصحة والرعاية الطبية</SelectItem>
                        <SelectItem value="تعليم">التعليم والتدريب</SelectItem>
                        <SelectItem value="سياحة">السياحة والضيافة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">وصف نشاط الشركة</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="صف نشاط الشركة وأهدافها"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="country">الدولة</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="السعودية">المملكة العربية السعودية</SelectItem>
                        <SelectItem value="الإمارات">دولة الإمارات العربية المتحدة</SelectItem>
                        <SelectItem value="قطر">دولة قطر</SelectItem>
                        <SelectItem value="الكويت">دولة الكويت</SelectItem>
                        <SelectItem value="البحرين">مملكة البحرين</SelectItem>
                        <SelectItem value="عمان">سلطنة عمان</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="contract_type">نوع الشركة</Label>
                    <Select value={formData.contract_type} onValueChange={(value) => handleInputChange('contract_type', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="llc">شركة ذات مسؤولية محدودة</SelectItem>
                        <SelectItem value="joint_stock">شركة مساهمة</SelectItem>
                        <SelectItem value="partnership">شركة تضامن</SelectItem>
                        <SelectItem value="limited_partnership">شركة توصية</SelectItem>
                        <SelectItem value="sole_proprietorship">مؤسسة فردية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="max_members">عدد الشركاء المطلوب</Label>
                    <Select value={formData.max_members.toString()} onValueChange={(value) => handleInputChange('max_members', parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 شركاء</SelectItem>
                        <SelectItem value="3">3 شركاء</SelectItem>
                        <SelectItem value="5">5 شركاء</SelectItem>
                        <SelectItem value="10">10 شركاء</SelectItem>
                        <SelectItem value="20">20 شريك</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="min_entry_amount">الحد الأدنى للمساهمة (ريال سعودي)</Label>
                    <Select value={formData.min_entry_amount.toString()} onValueChange={(value) => handleInputChange('min_entry_amount', parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10000">10,000 ريال</SelectItem>
                        <SelectItem value="25000">25,000 ريال</SelectItem>
                        <SelectItem value="50000">50,000 ريال</SelectItem>
                        <SelectItem value="100000">100,000 ريال</SelectItem>
                        <SelectItem value="250000">250,000 ريال</SelectItem>
                        <SelectItem value="500000">500,000 ريال</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">الخدمات المتاحة:</h3>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• تجهيز العقود والوثائق القانونية</li>
                    <li>• إجراءات التسجيل والترخيص</li>
                    <li>• فتح الحسابات البنكية</li>
                    <li>• الاستشارات القانونية والمالية</li>
                    <li>• خدمات المحاسبة والضرائب</li>
                  </ul>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading || !formData.name || !formData.description}
                >
                  {loading ? 'جاري الإنشاء...' : 'إنشاء مجموعة تأسيس الشركة'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyFormation;
