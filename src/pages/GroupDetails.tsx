
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { 
  Users, 
  Package, 
  DollarSign, 
  MessageCircle,
  UserPlus,
  Briefcase,
  Clock,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const GroupDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch group details
  const { data: group, isLoading } = useQuery({
    queryKey: ['group', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select(`
          *,
          group_members (
            id,
            user_id,
            role,
            status,
            joined_at,
            profiles (full_name, email)
          ),
          supplier_offers (*),
          freelancer_offers (*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  // Form states
  const [freelancerEmail, setFreelancerEmail] = useState('');
  const [supplierOffer, setSupplierOffer] = useState({
    title: '',
    offer_description: '',
    price: '',
    delivery_time: '',
    terms: ''
  });

  // Join group mutation
  const joinGroupMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('group_members')
        .insert({
          group_id: id,
          user_id: user.id,
          role: 'member',
          status: 'active'
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "تم الانضمام بنجاح",
        description: "تم انضمامك للمجموعة بنجاح"
      });
      queryClient.invalidateQueries({ queryKey: ['group', id] });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في الانضمام للمجموعة",
        variant: "destructive"
      });
    }
  });

  // Add freelancer mutation
  const addFreelancerMutation = useMutation({
    mutationFn: async (email: string) => {
      // First find the user by email
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
      
      if (profileError) throw new Error('User not found');
      
      // Add to group as freelancer
      const { error } = await supabase
        .from('group_members')
        .insert({
          group_id: id,
          user_id: profiles.id,
          role: 'freelancer',
          status: 'active'
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "تم إضافة المستقل بنجاح",
        description: "تم إضافة المستقل للمجموعة"
      });
      setFreelancerEmail('');
      queryClient.invalidateQueries({ queryKey: ['group', id] });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في إضافة المستقل",
        variant: "destructive"
      });
    }
  });

  // Submit supplier offer mutation
  const submitSupplierOfferMutation = useMutation({
    mutationFn: async (offerData: any) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('supplier_offers')
        .insert({
          group_id: id,
          supplier_id: user.id,
          title: offerData.title,
          offer_description: offerData.offer_description,
          price: parseFloat(offerData.price),
          delivery_time: offerData.delivery_time,
          terms: offerData.terms,
          status: 'pending'
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "تم تقديم العرض بنجاح",
        description: "تم تقديم عرضك وسيتم مراجعته قريباً"
      });
      setSupplierOffer({
        title: '',
        offer_description: '',
        price: '',
        delivery_time: '',
        terms: ''
      });
      queryClient.invalidateQueries({ queryKey: ['group', id] });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في تقديم العرض",
        variant: "destructive"
      });
    }
  });

  // Start negotiation mutation
  const startNegotiationMutation = useMutation({
    mutationFn: async (offerId: string) => {
      const { error } = await supabase
        .from('supplier_offers')
        .update({ status: 'negotiating' })
        .eq('id', offerId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "تم بدء التفاوض",
        description: "تم بدء التفاوض مع المورد"
      });
      queryClient.invalidateQueries({ queryKey: ['group', id] });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في بدء التفاوض",
        variant: "destructive"
      });
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">المجموعة غير موجودة</h1>
        </div>
      </div>
    );
  }

  const isMember = group.group_members?.some((member: any) => member.user_id === user?.id);
  const isCreator = group.creator_id === user?.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Group Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
            <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
              {group.status === 'active' ? 'نشط' : 'غير نشط'}
            </Badge>
          </div>
          <p className="text-gray-600 text-lg">{group.description}</p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            {!isMember && !isCreator && (
              <Button 
                onClick={() => joinGroupMutation.mutate()}
                disabled={joinGroupMutation.isPending}
                className="flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                انضم للمجموعة
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Group Info & Members */}
          <div className="lg:col-span-2 space-y-6">
            {/* Group Info */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات المجموعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">الأعضاء: {group.current_members}/{group.max_members}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm">الحد الأدنى: ${group.min_entry_amount} USD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">القطاع: {group.sector}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">جولات التفاوض: {group.negotiation_rounds}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Members List */}
            <Card>
              <CardHeader>
                <CardTitle>الأعضاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {group.group_members?.map((member: any) => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{member.profiles?.full_name}</h3>
                        <p className="text-sm text-gray-500">{member.profiles?.email}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{member.role}</Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          انضم في {new Date(member.joined_at).toLocaleDateString('ar')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add Freelancer (Only for creator) */}
            {isCreator && (
              <Card>
                <CardHeader>
                  <CardTitle>إضافة مستقل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Input
                      type="email"
                      placeholder="البريد الإلكتروني للمستقل"
                      value={freelancerEmail}
                      onChange={(e) => setFreelancerEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={() => addFreelancerMutation.mutate(freelancerEmail)}
                      disabled={addFreelancerMutation.isPending || !freelancerEmail}
                    >
                      إضافة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Offers */}
          <div className="space-y-6">
            {/* Supplier Offers */}
            <Card>
              <CardHeader>
                <CardTitle>عروض الموردين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {group.supplier_offers?.map((offer: any) => (
                    <div key={offer.id} className="p-4 border rounded-lg">
                      <h3 className="font-medium">{offer.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{offer.offer_description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-medium">${offer.price} USD</span>
                        </div>
                        <Badge variant={
                          offer.status === 'pending' ? 'outline' :
                          offer.status === 'negotiating' ? 'secondary' :
                          offer.status === 'accepted' ? 'default' : 'destructive'
                        }>
                          {offer.status === 'pending' ? 'قيد الانتظار' :
                           offer.status === 'negotiating' ? 'قيد التفاوض' :
                           offer.status === 'accepted' ? 'مقبول' : 'مرفوض'}
                        </Badge>
                      </div>
                      {isMember && offer.status === 'pending' && (
                        <Button 
                          size="sm" 
                          className="w-full mt-3"
                          onClick={() => startNegotiationMutation.mutate(offer.id)}
                          disabled={startNegotiationMutation.isPending}
                        >
                          بدء التفاوض
                        </Button>
                      )}
                    </div>
                  ))}
                  {(!group.supplier_offers || group.supplier_offers.length === 0) && (
                    <p className="text-gray-500 text-center py-4">لا توجد عروض موردين</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Supplier Offer */}
            {user && (
              <Card>
                <CardHeader>
                  <CardTitle>تقديم عرض مورد</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input
                      placeholder="عنوان العرض"
                      value={supplierOffer.title}
                      onChange={(e) => setSupplierOffer({...supplierOffer, title: e.target.value})}
                    />
                    <Textarea
                      placeholder="وصف العرض"
                      value={supplierOffer.offer_description}
                      onChange={(e) => setSupplierOffer({...supplierOffer, offer_description: e.target.value})}
                      rows={3}
                    />
                    <Input
                      type="number"
                      placeholder="السعر (USD)"
                      value={supplierOffer.price}
                      onChange={(e) => setSupplierOffer({...supplierOffer, price: e.target.value})}
                    />
                    <Input
                      placeholder="مدة التسليم"
                      value={supplierOffer.delivery_time}
                      onChange={(e) => setSupplierOffer({...supplierOffer, delivery_time: e.target.value})}
                    />
                    <Textarea
                      placeholder="الشروط والأحكام"
                      value={supplierOffer.terms}
                      onChange={(e) => setSupplierOffer({...supplierOffer, terms: e.target.value})}
                      rows={2}
                    />
                    <Button 
                      className="w-full"
                      onClick={() => submitSupplierOfferMutation.mutate(supplierOffer)}
                      disabled={submitSupplierOfferMutation.isPending || !supplierOffer.title || !supplierOffer.offer_description}
                    >
                      تقديم العرض
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
