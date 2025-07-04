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
    jurisdiction: '',
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
          status: 'pending_members', // Initial phase
          current_phase: 'initial',
          visibility: 'private', // Private until activated
          min_members: formData.min_members,
          max_members: formData.max_members
        })
        .select()
        .single();

      if (groupError) throw groupError;

      // Add creator as regular member (not admin)
      const { error: memberError } = await supabase
        .from('group_members')
        .insert({
          group_id: groupData.id,
          user_id: user.id,
          role: 'member', // Creator is just a member
          voting_weight: 1.0
        });

      if (memberError) throw memberError;

      toast({
        title: "تم إنشاء المجموعة بنجاح",
        description: "تم إنشاء مجموعتك الجديدة كعضو عادي. ستنتظر المجموعة اكتمال الأعضاء للتفعيل"
      });

      navigate(`/group/${groupData.id}`);
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

  const handleInputChange = (field: string, value: string | number) => {
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
            <p className="text-center text-gray-600">ستكون عضواً عادياً في المجموعة - لا امتيازات إدارية تلقائية</p>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min_members">الحد الأدنى للأعضاء</Label>
                  <Input
                    id="min_members"
                    type="number"
                    min="3"
                    max="50"
                    value={formData.min_members}
                    onChange={(e) => handleInputChange('min_members', parseInt(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="max_members">الحد الأقصى للأعضاء</Label>
                  <Input
                    id="max_members"
                    type="number"
                    min="5"
                    max="100"
                    value={formData.max_members}
                    onChange={(e) => handleInputChange('max_members', parseInt(e.target.value))}
                    required
                  />
                </div>
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
                {loading ? 'جاري الإنشاء...' : 'إنشاء المجموعة (كعضو عادي)'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateGroup;
