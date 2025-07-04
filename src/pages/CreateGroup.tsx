
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    jurisdiction: ''
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
          type: formData.type,
          service_gateway: formData.service_gateway,
          business_objective: formData.business_objective,
          legal_framework: formData.legal_framework,
          jurisdiction: formData.jurisdiction,
          creator_id: user.id,
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "تم إنشاء المجموعة بنجاح",
        description: "تم إنشاء مجموعتك الجديدة"
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

  const handleInputChange = (field: string, value: string) => {
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">إنشاء مجموعة جديدة</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">اسم المجموعة</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="type">نوع المجموعة</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المجموعة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="procurement">مشتريات</SelectItem>
                    <SelectItem value="services">خدمات</SelectItem>
                    <SelectItem value="investment">استثمار</SelectItem>
                    <SelectItem value="partnership">شراكة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="service_gateway">بوابة الخدمة</Label>
                <Select value={formData.service_gateway} onValueChange={(value) => handleInputChange('service_gateway', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر بوابة الخدمة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">عبر الإنترنت</SelectItem>
                    <SelectItem value="hybrid">مختلط</SelectItem>
                    <SelectItem value="offline">خارج الإنترنت</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="business_objective">الهدف التجاري</Label>
                <Textarea
                  id="business_objective"
                  value={formData.business_objective}
                  onChange={(e) => handleInputChange('business_objective', e.target.value)}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="legal_framework">الإطار القانوني</Label>
                <Input
                  id="legal_framework"
                  value={formData.legal_framework}
                  onChange={(e) => handleInputChange('legal_framework', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="jurisdiction">الاختصاص القضائي</Label>
                <Input
                  id="jurisdiction"
                  value={formData.jurisdiction}
                  onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={loading || !formData.name || !formData.type || !formData.service_gateway}
              >
                {loading ? 'جاري الإنشاء...' : 'إنشاء المجموعة'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateGroup;
