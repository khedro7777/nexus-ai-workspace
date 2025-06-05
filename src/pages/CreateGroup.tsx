
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import CreateGroupFormFields from '@/components/create-group/CreateGroupFormFields';
import { useCreateGroupForm } from '@/hooks/useCreateGroupForm';
import { getGroupTypeTitle } from '@/utils/createGroupUtils';

const CreateGroup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { formData, updateFormData } = useCreateGroupForm();

  const groupType = searchParams.get('type') || 'group_buying';

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
                <CardTitle className="text-2xl">{getGroupTypeTitle(groupType)}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <CreateGroupFormFields 
                    formData={formData}
                    updateFormData={updateFormData}
                  />

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
