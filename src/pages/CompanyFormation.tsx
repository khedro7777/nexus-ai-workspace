// صفحة تأسيس الشركات - إنشاء وإدارة عمليات تأسيس الشركات الفردية والجماعية
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  Building, 
  Users, 
  User, 
  FileText, 
  DollarSign, 
  MapPin, 
  Calendar,
  Briefcase,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useToast } from '@/hooks/use-toast';

const CompanyFormation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formationType, setFormationType] = useState<'individual' | 'group'>('individual');
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // بيانات النموذج
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    sector: '',
    companyType: '',
    description: '',
    capital: '',
    shares: '',
    directors: '',
    legalConsultant: false,
    accountant: false,
    registrationService: false,
    additionalServices: '',
    maxMembers: 5,
    minInvestment: ''
  });

  // قائمة الدول المتاحة للتأسيس
  const countries = [
    'الإمارات العربية المتحدة',
    'السعودية',
    'قطر',
    'البحرين',
    'الكويت',
    'مصر',
    'الأردن',
    'لبنان',
    'المغرب',
    'تونس'
  ];

  // أنواع الشركات
  const companyTypes = [
    'شركة ذات مسؤولية محدودة',
    'شركة مساهمة عامة',
    'شركة مساهمة خاصة',
    'شركة تضامن',
    'شركة توصية بسيطة',
    'مؤسسة فردية',
    'شركة منطقة حرة'
  ];

  // القطاعات
  const sectors = [
    'التجارة العامة',
    'التكنولوجيا والبرمجيات',
    'الخدمات المالية',
    'العقارات والإنشاءات',
    'الصحة والطب',
    'التعليم والتدريب',
    'السياحة والضيافة',
    'الزراعة والأغذية',
    'الطاقة والمرافق',
    'الاستيراد والتصدير'
  ];

  // طفرة إنشاء المجموعة/الطلب
  const createFormationMutation = useMutation({
    mutationFn: async (data: any) => {
      // إنشاء مجموعة تأسيس شركة
      const groupData = {
        name: `تأسيس شركة: ${data.companyName}`,
        description: data.description,
        country: data.country,
        sector: data.sector,
        group_type: 'تأسيس شركة',
        contract_type: data.companyType,
        max_members: formationType === 'group' ? data.maxMembers : 1,
        min_entry_amount: data.minInvestment ? parseFloat(data.minInvestment) : 0,
        requires_suppliers: data.legalConsultant || data.accountant || data.registrationService,
        creator_id: user?.id,
        status: 'pending'
      };

      const { data: group, error } = await supabase
        .from('groups')
        .insert(groupData)
        .select()
        .single();

      if (error) throw error;

      // إضافة المؤسس كعضو
      const { error: memberError } = await supabase
        .from('group_members')
        .insert({
          group_id: group.id,
          user_id: user?.id,
          role: 'admin',
          status: 'active'
        });

      if (memberError) throw memberError;

      return group;
    },
    onSuccess: (group) => {
      toast({
        title: "تم إنشاء طلب تأسيس الشركة",
        description: `تم إنشاء المجموعة بنجاح، رقم المجموعة: ${group.id.slice(0, 8)}`,
      });
      navigate(`/group/${group.id}`);
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في إنشاء الطلب",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleSubmit = () => {
    if (!formData.companyName || !formData.country || !formData.companyType) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    createFormationMutation.mutate(formData);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* رأس الصفحة */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Building className="w-8 h-8" />
            تأسيس الشركات
          </h1>
          <p className="text-gray-600">إنشاء وتأسيس الشركات بطريقة ذكية ومتعاونة</p>
        </div>

        {/* شريط التقدم */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="text-sm font-medium">النوع والأساسيات</span>
              </div>
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="text-sm font-medium">تفاصيل الشركة</span>
              </div>
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="text-sm font-medium">الخدمات والمراجعة</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* الخطوة الأولى: نوع التأسيس */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>اختيار نوع التأسيس</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={formationType} onValueChange={(value: 'individual' | 'group') => setFormationType(value)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* التأسيس الفردي */}
                  <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${formationType === 'individual' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <RadioGroupItem value="individual" id="individual" className="mb-4" />
                    <Label htmlFor="individual" className="cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <User className="w-6 h-6 text-blue-600" />
                        <h3 className="text-lg font-semibold">تأسيس فردي</h3>
                      </div>
                      <p className="text-gray-600 mb-4">قم بتأسيس شركتك بمفردك مع الاستعانة بخدمات مهنية</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <p>• سرعة في الإجراءات</p>
                        <p>• تحكم كامل في القرارات</p>
                        <p>• خدمات مهنية متخصصة</p>
                        <p>• تكلفة أقل</p>
                      </div>
                    </Label>
                  </div>

                  {/* التأسيس الجماعي */}
                  <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${formationType === 'group' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <RadioGroupItem value="group" id="group" className="mb-4" />
                    <Label htmlFor="group" className="cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="w-6 h-6 text-green-600" />
                        <h3 className="text-lg font-semibold">تأسيس جماعي</h3>
                      </div>
                      <p className="text-gray-600 mb-4">تعاون مع شركاء لتأسيس شركة مشتركة</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <p>• توزيع المخاطر والتكاليف</p>
                        <p>• تنوع في الخبرات والمهارات</p>
                        <p>• رؤوس أموال أكبر</p>
                        <p>• تصويت على القرارات المهمة</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {/* معلومات أساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">اسم الشركة المقترح *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder="مثال: شركة التقنيات المتقدمة"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">الدولة *</Label>
                  <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدولة" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={nextStep} disabled={!formData.companyName || !formData.country}>
                  التالي
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* الخطوة الثانية: تفاصيل الشركة */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل الشركة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sector">القطاع *</Label>
                  <Select value={formData.sector} onValueChange={(value) => setFormData({...formData, sector: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القطاع" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyType">نوع الشركة *</Label>
                  <Select value={formData.companyType} onValueChange={(value) => setFormData({...formData, companyType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الشركة" />
                    </SelectTrigger>
                    <SelectContent>
                      {companyTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف نشاط الشركة</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="اكتب وصفاً مختصراً لنشاط الشركة المقترحة..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capital">رأس المال المقترح (USD)</Label>
                  <Input
                    id="capital"
                    type="number"
                    value={formData.capital}
                    onChange={(e) => setFormData({...formData, capital: e.target.value})}
                    placeholder="100000"
                  />
                </div>

                {formationType === 'group' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="maxMembers">الحد الأقصى للشركاء</Label>
                      <Input
                        id="maxMembers"
                        type="number"
                        value={formData.maxMembers}
                        onChange={(e) => setFormData({...formData, maxMembers: parseInt(e.target.value)})}
                        placeholder="5"
                        min="2"
                        max="20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minInvestment">الحد الأدنى للاستثمار (USD)</Label>
                      <Input
                        id="minInvestment"
                        type="number"
                        value={formData.minInvestment}
                        onChange={(e) => setFormData({...formData, minInvestment: e.target.value})}
                        placeholder="10000"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  السابق
                </Button>
                <Button onClick={nextStep} disabled={!formData.sector || !formData.companyType}>
                  التالي
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* الخطوة الثالثة: الخدمات والمراجعة */}
        {step === 3 && (
          <div className="space-y-6">
            {/* الخدمات المطلوبة */}
            <Card>
              <CardHeader>
                <CardTitle>الخدمات المهنية المطلوبة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.legalConsultant}
                      onChange={(e) => setFormData({...formData, legalConsultant: e.target.checked})}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">استشارة قانونية</p>
                      <p className="text-sm text-gray-500">محامي متخصص في تأسيس الشركات</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.accountant}
                      onChange={(e) => setFormData({...formData, accountant: e.target.checked})}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">خدمات محاسبية</p>
                      <p className="text-sm text-gray-500">محاسب لإعداد النظام المالي</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.registrationService}
                      onChange={(e) => setFormData({...formData, registrationService: e.target.checked})}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">خدمة التسجيل</p>
                      <p className="text-sm text-gray-500">تسجيل رسمي في الدوائر الحكومية</p>
                    </div>
                  </label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalServices">خدمات إضافية</Label>
                  <Textarea
                    id="additionalServices"
                    value={formData.additionalServices}
                    onChange={(e) => setFormData({...formData, additionalServices: e.target.value})}
                    placeholder="اذكر أي خدمات إضافية تحتاجها..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* مراجعة المعلومات */}
            <Card>
              <CardHeader>
                <CardTitle>مراجعة المعلومات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">معلومات أساسية</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">نوع التأسيس:</span>
                        <span>{formationType === 'individual' ? 'فردي' : 'جماعي'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">اسم الشركة:</span>
                        <span>{formData.companyName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">الدولة:</span>
                        <span>{formData.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">القطاع:</span>
                        <span>{formData.sector}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">نوع الشركة:</span>
                        <span>{formData.companyType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">التفاصيل المالية</h4>
                    <div className="space-y-2 text-sm">
                      {formData.capital && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">رأس المال:</span>
                          <span>${parseInt(formData.capital).toLocaleString()} USD</span>
                        </div>
                      )}
                      {formationType === 'group' && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">عدد الشركاء:</span>
                            <span>حتى {formData.maxMembers}</span>
                          </div>
                          {formData.minInvestment && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">الحد الأدنى للاستثمار:</span>
                              <span>${parseInt(formData.minInvestment).toLocaleString()} USD</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <h4 className="font-semibold text-gray-900 mt-4">الخدمات المطلوبة</h4>
                    <div className="space-y-1 text-sm">
                      {formData.legalConsultant && <p>• استشارة قانونية</p>}
                      {formData.accountant && <p>• خدمات محاسبية</p>}
                      {formData.registrationService && <p>• خدمة التسجيل</p>}
                      {!formData.legalConsultant && !formData.accountant && !formData.registrationService && (
                        <p className="text-gray-500">لا توجد خدمات إضافية</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                السابق
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={createFormationMutation.isPending}
                className="flex items-center gap-2"
              >
                {createFormationMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    جاري الإنشاء...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    إنشاء طلب التأسيس
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyFormation;