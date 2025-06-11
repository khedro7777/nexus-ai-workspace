
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Users, 
  FileText, 
  Vote, 
  Handshake, 
  Plus,
  MessageSquare,
  DollarSign,
  Clock,
  Calendar
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const GroupDetails = () => {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // States for modals
  const [addFreelancerOpen, setAddFreelancerOpen] = useState(false);
  const [supplierOfferOpen, setSupplierOfferOpen] = useState(false);
  const [joinGroupOpen, setJoinGroupOpen] = useState(false);
  const [negotiationOpen, setNegotiationOpen] = useState(false);

  // Form states
  const [freelancerEmail, setFreelancerEmail] = useState('');
  const [supplierOffer, setSupplierOffer] = useState({
    title: '',
    description: '',
    price: '',
    delivery_time: '',
    terms: ''
  });
  const [negotiationMessage, setNegotiationMessage] = useState('');

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
            can_vote,
            profiles (
              full_name,
              email
            )
          ),
          supplier_offers (
            id,
            title,
            description,
            price,
            delivery_time,
            status,
            profiles (
              full_name,
              email
            )
          ),
          freelancer_offers (
            id,
            title,
            description,
            price,
            delivery_time,
            status,
            profiles (
              full_name,
              email
            )
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  // Add freelancer mutation
  const addFreelancerMutation = useMutation({
    mutationFn: async (email: string) => {
      // Find user by email
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
      
      if (userError) throw new Error('المستخدم غير موجود');

      // Add to group members
      const { data, error } = await supabase
        .from('group_members')
        .insert({
          group_id: id,
          user_id: userData.id,
          role: 'freelancer',
          can_vote: false
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "تم بنجاح",
        description: "تم إضافة المستقل للمجموعة"
      });
      setAddFreelancerOpen(false);
      setFreelancerEmail('');
      queryClient.invalidateQueries({ queryKey: ['group', id] });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Submit supplier offer mutation
  const submitSupplierOfferMutation = useMutation({
    mutationFn: async (offerData: any) => {
      const { data, error } = await supabase
        .from('supplier_offers')
        .insert({
          group_id: id,
          supplier_id: (await supabase.auth.getUser()).data.user?.id,
          title: offerData.title,
          description: offerData.description,
          price: parseFloat(offerData.price),
          delivery_time: offerData.delivery_time,
          terms: offerData.terms,
          status: 'pending'
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "تم بنجاح",
        description: "تم تقديم العرض بنجاح"
      });
      setSupplierOfferOpen(false);
      setSupplierOffer({ title: '', description: '', price: '', delivery_time: '', terms: '' });
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

  // Join group mutation
  const joinGroupMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('group_members')
        .insert({
          group_id: id,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          role: 'member',
          can_vote: true
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "تم بنجاح",
        description: "تم الانضمام للمجموعة بنجاح"
      });
      setJoinGroupOpen(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Group Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{group?.name}</CardTitle>
                <p className="text-gray-600 mb-4">{group?.description}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {group?.group_members?.length} عضو
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(group?.created_at).toLocaleDateString('ar')}
                  </span>
                  <Badge variant={group?.status === 'active' ? 'default' : 'secondary'}>
                    {group?.status === 'active' ? 'نشط' : 'غير نشط'}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog open={addFreelancerOpen} onOpenChange={setAddFreelancerOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة مستقل
                    </Button>
                  </DialogTrigger>
                  <DialogContent dir="rtl">
                    <DialogHeader>
                      <DialogTitle>إضافة مستقل للمجموعة</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="freelancer-email">البريد الإلكتروني للمستقل</Label>
                        <Input
                          id="freelancer-email"
                          value={freelancerEmail}
                          onChange={(e) => setFreelancerEmail(e.target.value)}
                          placeholder="أدخل البريد الإلكتروني"
                        />
                      </div>
                      <Button 
                        onClick={() => addFreelancerMutation.mutate(freelancerEmail)}
                        disabled={addFreelancerMutation.isPending}
                        className="w-full"
                      >
                        إضافة
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={supplierOfferOpen} onOpenChange={setSupplierOfferOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Handshake className="w-4 h-4 ml-2" />
                      تقديم عرض
                    </Button>
                  </DialogTrigger>
                  <DialogContent dir="rtl" className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>تقديم عرض للمجموعة</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="offer-title">عنوان العرض</Label>
                        <Input
                          id="offer-title"
                          value={supplierOffer.title}
                          onChange={(e) => setSupplierOffer({...supplierOffer, title: e.target.value})}
                          placeholder="أدخل عنوان العرض"
                        />
                      </div>
                      <div>
                        <Label htmlFor="offer-description">وصف العرض</Label>
                        <Textarea
                          id="offer-description"
                          value={supplierOffer.description}
                          onChange={(e) => setSupplierOffer({...supplierOffer, description: e.target.value})}
                          placeholder="أدخل وصف مفصل للعرض"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="offer-price">السعر (USD)</Label>
                          <Input
                            id="offer-price"
                            type="number"
                            value={supplierOffer.price}
                            onChange={(e) => setSupplierOffer({...supplierOffer, price: e.target.value})}
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <Label htmlFor="offer-delivery">مدة التسليم</Label>
                          <Input
                            id="offer-delivery"
                            value={supplierOffer.delivery_time}
                            onChange={(e) => setSupplierOffer({...supplierOffer, delivery_time: e.target.value})}
                            placeholder="7 أيام"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="offer-terms">الشروط والأحكام</Label>
                        <Textarea
                          id="offer-terms"
                          value={supplierOffer.terms}
                          onChange={(e) => setSupplierOffer({...supplierOffer, terms: e.target.value})}
                          placeholder="أدخل الشروط والأحكام"
                        />
                      </div>
                      <Button 
                        onClick={() => submitSupplierOfferMutation.mutate(supplierOffer)}
                        disabled={submitSupplierOfferMutation.isPending}
                        className="w-full"
                      >
                        تقديم العرض
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={joinGroupOpen} onOpenChange={setJoinGroupOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Users className="w-4 h-4 ml-2" />
                      انضمام
                    </Button>
                  </DialogTrigger>
                  <DialogContent dir="rtl">
                    <DialogHeader>
                      <DialogTitle>انضمام للمجموعة</DialogTitle>
                    </DialogHeader>
                    <p className="text-gray-600 mb-4">
                      هل تريد الانضمام لهذه المجموعة؟ ستحصل على حق التصويت في القرارات.
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => joinGroupMutation.mutate()}
                        disabled={joinGroupMutation.isPending}
                        className="flex-1"
                      >
                        انضمام
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setJoinGroupOpen(false)}
                        className="flex-1"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Group Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="members">الأعضاء</TabsTrigger>
            <TabsTrigger value="offers">العروض</TabsTrigger>
            <TabsTrigger value="voting">التصويت</TabsTrigger>
            <TabsTrigger value="discussions">المناقشات</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    الأعضاء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{group?.group_members?.length}</div>
                  <p className="text-sm text-gray-500">عضو نشط</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    العروض
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(group?.supplier_offers?.length || 0) + (group?.freelancer_offers?.length || 0)}
                  </div>
                  <p className="text-sm text-gray-500">عرض مقدم</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    القيمة الإجمالية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$0.00</div>
                  <p className="text-sm text-gray-500">USD</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>أعضاء المجموعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {group?.group_members?.map((member: any) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{member.profiles?.full_name}</h3>
                        <p className="text-sm text-gray-500">{member.profiles?.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                          {member.role === 'admin' ? 'مدير' : member.role === 'freelancer' ? 'مستقل' : 'عضو'}
                        </Badge>
                        {member.can_vote && (
                          <Badge variant="outline">حق التصويت</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers">
            <div className="space-y-6">
              {/* Supplier Offers */}
              <Card>
                <CardHeader>
                  <CardTitle>عروض الموردين</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {group?.supplier_offers?.map((offer: any) => (
                      <div key={offer.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{offer.title}</h3>
                          <div className="flex gap-2">
                            <Badge variant="outline">${offer.price} USD</Badge>
                            <Badge variant={offer.status === 'accepted' ? 'default' : 'secondary'}>
                              {offer.status === 'pending' ? 'قيد الانتظار' : offer.status === 'accepted' ? 'مقبول' : 'مرفوض'}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{offer.description}</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {offer.delivery_time}
                          </span>
                          <span>بواسطة: {offer.profiles?.full_name}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Dialog open={negotiationOpen} onOpenChange={setNegotiationOpen}>
                            <DialogTrigger asChild>
                              <Button size="sm">
                                <MessageSquare className="w-4 h-4 ml-2" />
                                بدء التفاوض
                              </Button>
                            </DialogTrigger>
                            <DialogContent dir="rtl">
                              <DialogHeader>
                                <DialogTitle>بدء التفاوض</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="negotiation-message">رسالة التفاوض</Label>
                                  <Textarea
                                    id="negotiation-message"
                                    value={negotiationMessage}
                                    onChange={(e) => setNegotiationMessage(e.target.value)}
                                    placeholder="أدخل رسالة التفاوض"
                                  />
                                </div>
                                <Button className="w-full">
                                  إرسال
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="outline">
                            قبول العرض
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Freelancer Offers */}
              <Card>
                <CardHeader>
                  <CardTitle>عروض المستقلين</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {group?.freelancer_offers?.map((offer: any) => (
                      <div key={offer.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{offer.title}</h3>
                          <div className="flex gap-2">
                            <Badge variant="outline">${offer.price} USD</Badge>
                            <Badge variant={offer.status === 'accepted' ? 'default' : 'secondary'}>
                              {offer.status === 'pending' ? 'قيد الانتظار' : offer.status === 'accepted' ? 'مقبول' : 'مرفوض'}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{offer.description}</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {offer.delivery_time}
                          </span>
                          <span>بواسطة: {offer.profiles?.full_name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="voting">
            <Card>
              <CardHeader>
                <CardTitle>جلسات التصويت</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">لا توجد جلسات تصويت حالياً</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussions">
            <Card>
              <CardHeader>
                <CardTitle>المناقشات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">لا توجد مناقشات حالياً</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GroupDetails;
