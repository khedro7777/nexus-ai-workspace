
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import GroupTabs from '@/components/group/GroupTabs';
import {
  Users,
  Plus,
  UserPlus,
  Handshake,
  MessageSquare,
  Vote,
  Eye,
  FileText,
  DollarSign
} from 'lucide-react';

const GroupDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [group, setGroup] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [isCreator, setIsCreator] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Freelancer addition state
  const [addFreelancerOpen, setAddFreelancerOpen] = useState(false);
  const [freelancerEmail, setFreelancerEmail] = useState('');
  const [freelancerRole, setFreelancerRole] = useState('contributor');

  // Supplier offer state
  const [supplierOfferOpen, setSupplierOfferOpen] = useState(false);
  const [supplierOffer, setSupplierOffer] = useState({
    company_name: '',
    description: '',
    price: '',
    delivery_terms: '',
    payment_terms: ''
  });

  // Negotiation state
  const [negotiationOpen, setNegotiationOpen] = useState(false);
  const [negotiationData, setNegotiationData] = useState({
    title: '',
    description: '',
    initial_offer: '',
    target_price: ''
  });

  useEffect(() => {
    if (id) {
      fetchGroupData();
    }
  }, [id, refreshTrigger]);

  const fetchGroupData = async () => {
    try {
      setLoading(true);
      
      // Fetch group data
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .select(`
          *,
          creator_profile:profiles!groups_creator_id_fkey(full_name)
        `)
        .eq('id', id)
        .single();

      if (groupError) throw groupError;

      // Fetch members
      const { data: membersData, error: membersError } = await supabase
        .from('group_members')
        .select(`
          *,
          profile:profiles!group_members_user_id_fkey(full_name)
        `)
        .eq('group_id', id);

      if (membersError) throw membersError;

      setGroup(groupData);
      setMembers(membersData || []);
      setIsCreator(groupData?.creator_id === user?.id);
    } catch (error: any) {
      toast({
        title: "خطأ في تحميل بيانات المجموعة",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addFreelancerToGroup = async () => {
    if (!freelancerEmail.trim()) return;

    try {
      // Find user by email
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', freelancerEmail)
        .single();

      if (userError) {
        toast({
          title: "خطأ",
          description: "لم يتم العثور على مستخدم بهذا البريد الإلكتروني",
          variant: "destructive"
        });
        return;
      }

      // Add as group member
      const { error: memberError } = await supabase
        .from('group_members')
        .insert({
          group_id: id,
          user_id: userData.id,
          role: freelancerRole,
          status: 'active'
        });

      if (memberError) throw memberError;

      // Update group member count
      const { error: updateError } = await supabase
        .from('groups')
        .update({ 
          current_members: (group?.current_members || 0) + 1 
        })
        .eq('id', id);

      if (updateError) throw updateError;

      toast({
        title: "تم إضافة المستقل",
        description: "تم إضافة المستقل إلى المجموعة بنجاح"
      });

      setAddFreelancerOpen(false);
      setFreelancerEmail('');
      setRefreshTrigger(prev => prev + 1);
    } catch (error: any) {
      toast({
        title: "خطأ في إضافة المستقل",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const submitSupplierOffer = async () => {
    if (!supplierOffer.company_name || !supplierOffer.description) return;

    try {
      const { error } = await supabase
        .from('supplier_offers')
        .insert({
          group_id: id,
          supplier_id: user?.id,
          company_name: supplierOffer.company_name,
          offer_description: supplierOffer.description,
          price_details: supplierOffer.price ? { amount: supplierOffer.price } : null,
          delivery_terms: supplierOffer.delivery_terms,
          payment_terms: supplierOffer.payment_terms,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "تم تقديم العرض",
        description: "تم تقديم عرضك بنجاح وسيتم مراجعته"
      });

      setSupplierOfferOpen(false);
      setSupplierOffer({
        company_name: '',
        description: '',
        price: '',
        delivery_terms: '',
        payment_terms: ''
      });
      setRefreshTrigger(prev => prev + 1);
    } catch (error: any) {
      toast({
        title: "خطأ في تقديم العرض",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const startNegotiation = async () => {
    if (!negotiationData.title || !negotiationData.description) return;

    try {
      const { error } = await supabase
        .from('negotiations')
        .insert({
          group_id: id,
          title: negotiationData.title,
          description: negotiationData.description,
          initial_offer: parseFloat(negotiationData.initial_offer) || 0,
          target_price: parseFloat(negotiationData.target_price) || 0,
          status: 'active',
          current_round: 1,
          max_rounds: 10
        });

      if (error) throw error;

      // Update group status to negotiating
      await supabase
        .from('groups')
        .update({ status: 'negotiating' })
        .eq('id', id);

      toast({
        title: "تم بدء التفاوض",
        description: "تم بدء جلسة التفاوض بنجاح"
      });

      setNegotiationOpen(false);
      setNegotiationData({
        title: '',
        description: '',
        initial_offer: '',
        target_price: ''
      });
      setRefreshTrigger(prev => prev + 1);
    } catch (error: any) {
      toast({
        title: "خطأ في بدء التفاوض",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const joinGroup = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('group_members')
        .insert({
          group_id: id,
          user_id: user.id,
          role: 'member',
          status: 'active'
        });

      if (error) throw error;

      // Update group member count
      await supabase
        .from('groups')
        .update({ 
          current_members: (group?.current_members || 0) + 1 
        })
        .eq('id', id);

      toast({
        title: "تم الانضمام",
        description: "تم انضمامك إلى المجموعة بنجاح"
      });

      setRefreshTrigger(prev => prev + 1);
    } catch (error: any) {
      toast({
        title: "خطأ في الانضمام",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">لم يتم العثور على المجموعة</div>
        </div>
      </div>
    );
  }

  const isMember = members.some(member => member.user_id === user?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Group Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{group.name}</CardTitle>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span><Users className="w-4 h-4 inline ml-1" />{group.current_members}/{group.max_members} أعضاء</span>
                  <span>النوع: {group.group_type}</span>
                  <span>الدولة: {group.country}</span>
                  <span>القطاع: {group.sector}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                  {group.status === 'active' ? 'نشطة' : 
                   group.status === 'pending' ? 'قيد الانتظار' :
                   group.status === 'negotiating' ? 'قيد التفاوض' : 'مكتملة'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {!isMember && !isCreator && (
                <Button onClick={joinGroup} className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  انضمام للمجموعة
                </Button>
              )}

              {(isCreator || isMember) && (
                <>
                  <Dialog open={addFreelancerOpen} onOpenChange={setAddFreelancerOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        إضافة مستقل
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>إضافة مستقل إلى المجموعة</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">البريد الإلكتروني للمستقل</label>
                          <Input
                            type="email"
                            value={freelancerEmail}
                            onChange={(e) => setFreelancerEmail(e.target.value)}
                            placeholder="أدخل البريد الإلكتروني"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">الدور</label>
                          <select 
                            value={freelancerRole} 
                            onChange={(e) => setFreelancerRole(e.target.value)}
                            className="w-full p-2 border rounded-md"
                          >
                            <option value="contributor">مساهم (بدون حق تصويت)</option>
                            <option value="advisor">مستشار</option>
                            <option value="specialist">متخصص</option>
                          </select>
                        </div>
                        <Button onClick={addFreelancerToGroup} className="w-full">
                          إضافة المستقل
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={supplierOfferOpen} onOpenChange={setSupplierOfferOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        تقديم عرض مورد
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>تقديم عرض من مورد</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">اسم الشركة</label>
                          <Input
                            value={supplierOffer.company_name}
                            onChange={(e) => setSupplierOffer(prev => ({...prev, company_name: e.target.value}))}
                            placeholder="اسم شركة المورد"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">وصف العرض</label>
                          <Textarea
                            value={supplierOffer.description}
                            onChange={(e) => setSupplierOffer(prev => ({...prev, description: e.target.value}))}
                            placeholder="تفاصيل العرض والخدمات المقدمة"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">السعر (اختياري)</label>
                          <Input
                            type="number"
                            value={supplierOffer.price}
                            onChange={(e) => setSupplierOffer(prev => ({...prev, price: e.target.value}))}
                            placeholder="السعر بالدولار"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">شروط التسليم</label>
                          <Input
                            value={supplierOffer.delivery_terms}
                            onChange={(e) => setSupplierOffer(prev => ({...prev, delivery_terms: e.target.value}))}
                            placeholder="مثال: التسليم خلال 30 يوم"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">شروط الدفع</label>
                          <Input
                            value={supplierOffer.payment_terms}
                            onChange={(e) => setSupplierOffer(prev => ({...prev, payment_terms: e.target.value}))}
                            placeholder="مثال: 50% مقدم و 50% عند التسليم"
                          />
                        </div>
                        <Button onClick={submitSupplierOffer} className="w-full">
                          تقديم العرض
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={negotiationOpen} onOpenChange={setNegotiationOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Handshake className="w-4 h-4" />
                        بدء التفاوض
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>بدء جلسة تفاوض</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">عنوان التفاوض</label>
                          <Input
                            value={negotiationData.title}
                            onChange={(e) => setNegotiationData(prev => ({...prev, title: e.target.value}))}
                            placeholder="عنوان جلسة التفاوض"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">وصف التفاوض</label>
                          <Textarea
                            value={negotiationData.description}
                            onChange={(e) => setNegotiationData(prev => ({...prev, description: e.target.value}))}
                            placeholder="تفاصيل ما سيتم التفاوض عليه"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">العرض الأولي (USD)</label>
                          <Input
                            type="number"
                            value={negotiationData.initial_offer}
                            onChange={(e) => setNegotiationData(prev => ({...prev, initial_offer: e.target.value}))}
                            placeholder="العرض الأولي بالدولار"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">السعر المستهدف (USD)</label>
                          <Input
                            type="number"
                            value={negotiationData.target_price}
                            onChange={(e) => setNegotiationData(prev => ({...prev, target_price: e.target.value}))}
                            placeholder="السعر المستهدف بالدولار"
                          />
                        </div>
                        <Button onClick={startNegotiation} className="w-full">
                          بدء التفاوض
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}

              <Button variant="outline" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                المناقشات
              </Button>

              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                التفاصيل
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Group Tabs */}
        <GroupTabs 
          group={group}
          members={members}
          isCreator={isCreator}
          refreshTrigger={refreshTrigger}
          onRefresh={() => setRefreshTrigger(prev => prev + 1)}
        />
      </div>
    </div>
  );
};

export default GroupDetails;
