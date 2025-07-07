
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { countries, sectors } from '@/constants/createGroupConstants';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Users, Building2, Globe, Info, CheckCircle, AlertCircle } from 'lucide-react';

const CreateGroup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    service_gateway: '',
    business_objective: '',
    legal_framework: '',
    jurisdiction: '',
    country: '',
    sector: '',
    min_members: 5,
    max_members: 20
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
      // Create the group with initial phase
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .insert({
          name: formData.name,
          description: formData.description,
          type: formData.type,
          service_gateway: formData.service_gateway,
          business_objective: formData.business_objective,
          legal_framework: formData.legal_framework,
          jurisdiction: formData.jurisdiction,
          creator_id: user.id,
          status: 'pending_members',
          current_phase: 'initial',
          visibility: 'private',
          min_members: formData.min_members,
          max_members: formData.max_members
        })
        .select()
        .single();

      if (groupError) throw groupError;

      // Add creator as member
      const { error: memberError } = await supabase
        .from('group_members')
        .insert({
          group_id: groupData.id,
          user_id: user.id,
          role: 'member',
          voting_weight: 1.0
        });

      if (memberError) throw memberError;

      toast({
        title: "تم إنشاء المجموعة بنجاح!",
        description: "تم إنشاء مجموعتك الجديدة بنجاح. يمكنك الآن دعوة الأعضاء للانضمام."
      });

      navigate(`/group/${groupData.id}`);
    } catch (error: any) {
      console.error('Error creating group:', error);
      toast({
        title: "خطأ في إنشاء المجموعة",
        description: error.message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = formData.name && formData.type && formData.service_gateway && formData.country && formData.sector;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إنشاء مجموعة جديدة</h1>
            <p className="text-gray-600">أنشئ مجموعة تجارية جديدة واستفد من القوة الشرائية الجماعية</p>
          </div>

          {/* Alert */}
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>ملاحظة:</strong> ستكون عضواً عادياً في المجموعة مع حقوق التصويت الكاملة. يمكن انتخاب المدراء لاحقاً من قبل أعضاء المجموعة.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    المعلومات الأساسية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Group Name */}
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">
                      اسم المجموعة <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="أدخل اسماً وصفياً للمجموعة"
                      className="mt-1"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description" className="text-sm font-medium">الوصف</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="وصف مفصل لأهداف المجموعة والمنتجات/الخدمات المطلوبة"
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium">
                      الدولة <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className="mt-1">
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
                    <Label htmlFor="sector" className="text-sm font-medium">
                      القطاع <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.sector} onValueChange={(value) => handleInputChange('sector', value)}>
                      <SelectTrigger className="mt-1">
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
                </CardContent>
              </Card>

              {/* Right Column */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    إعدادات المجموعة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Group Type */}
                  <div>
                    <Label htmlFor="type" className="text-sm font-medium">
                      نوع المجموعة <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="اختر نوع المجموعة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="procurement">مشتريات</SelectItem>
                        <SelectItem value="services">خدمات</SelectItem>
                        <SelectItem value="investment">استثمار</SelectItem>
                        <SelectItem value="partnership">شراكة</SelectItem>
                        <SelectItem value="manufacturing">تصنيع</SelectItem>
                        <SelectItem value="logistics">لوجستيات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Service Gateway */}
                  <div>
                    <Label htmlFor="service_gateway" className="text-sm font-medium">
                      بوابة الخدمة <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.service_gateway} onValueChange={(value) => handleInputChange('service_gateway', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="اختر بوابة الخدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">عبر الإنترنت</SelectItem>
                        <SelectItem value="hybrid">مختلط</SelectItem>
                        <SelectItem value="offline">خارج الإنترنت</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Members Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min_members" className="text-sm font-medium">الحد الأدنى للأعضاء</Label>
                      <Select 
                        value={formData.min_members.toString()} 
                        onValueChange={(value) => handleInputChange('min_members', parseInt(value))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[3, 5, 7, 10, 15].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num} أعضاء</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="max_members" className="text-sm font-medium">الحد الأقصى للأعضاء</Label>
                      <Select 
                        value={formData.max_members.toString()} 
                        onValueChange={(value) => handleInputChange('max_members', parseInt(value))}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[10, 20, 30, 50, 100].map(num => (
                            <SelectItem key={num} value={num.toString()}>{num} عضو</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Business Objective */}
                  <div>
                    <Label htmlFor="business_objective" className="text-sm font-medium">الهدف التجاري</Label>
                    <Textarea
                      id="business_objective"
                      value={formData.business_objective}
                      onChange={(e) => handleInputChange('business_objective', e.target.value)}
                      placeholder="الهدف الرئيسي من إنشاء هذه المجموعة"
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Legal Framework Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  الإطار القانوني (اختياري)
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="legal_framework" className="text-sm font-medium">الإطار القانوني</Label>
                  <Input
                    id="legal_framework"
                    value={formData.legal_framework}
                    onChange={(e) => handleInputChange('legal_framework', e.target.value)}
                    placeholder="مثال: قانون الشركات المصري"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="jurisdiction" className="text-sm font-medium">الاختصاص القضائي</Label>
                  <Input
                    id="jurisdiction"
                    value={formData.jurisdiction}
                    onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
                    placeholder="مثال: محاكم القاهرة"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <Button 
                type="submit" 
                size="lg"
                className="px-12 py-3 text-lg"
                disabled={loading || !isFormValid}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    جاري الإنشاء...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    إنشاء المجموعة
                  </>
                )}
              </Button>
            </div>

            {/* Form Status */}
            {!isFormValid && (
              <div className="mt-4 text-center">
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  يرجى إكمال الحقول المطلوبة *
                </Badge>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
