// صفحة غرفة المجموعة - عرض تفاصيل المجموعة مع تبويبات للإدارة
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  FileText, 
  Vote, 
  Building2, 
  UserCheck, 
  Gavel,
  Clock,
  DollarSign,
  MapPin,
  Calendar,
  MessageSquare
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import VotingSystem from '@/components/voting/VotingSystem';
import DiscussionSystem from '@/components/discussions/DiscussionSystem';

const GroupRoom = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();

  // جلب بيانات المجموعة
  const { data: group, isLoading } = useQuery({
    queryKey: ['group', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  // جلب أعضاء المجموعة
  const { data: members } = useQuery({
    queryKey: ['group-members', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          *,
          profiles(full_name, email, user_role)
        `)
        .eq('group_id', id);
      
      if (error) throw error;
      return data;
    }
  });

  // جلب عروض الموردين
  const { data: supplierOffers } = useQuery({
    queryKey: ['supplier-offers', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('supplier_offers')
        .select('*')
        .eq('group_id', id);
      
      if (error) throw error;
      return data;
    }
  });

  // جلب عروض المستقلين
  const { data: freelancerOffers } = useQuery({
    queryKey: ['freelancer-offers', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('freelancer_offers')
        .select('*')
        .eq('group_id', id);
      
      if (error) throw error;
      return data;
    }
  });

  // جلب جلسات التصويت
  const { data: votingSessions } = useQuery({
    queryKey: ['voting-sessions', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('voting_sessions')
        .select('*')
        .eq('group_id', id);
      
      if (error) throw error;
      return data;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* معلومات المجموعة الأساسية */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{group?.name}</CardTitle>
                <p className="text-gray-600 mb-4">{group?.description}</p>
              </div>
              <Badge className={getStatusColor(group?.status || 'pending')}>
                {group?.status === 'active' ? 'نشط' : 'معلق'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{group?.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{group?.current_members}/{group?.max_members} أعضاء</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="text-sm">الحد الأدنى: ${group?.min_entry_amount || 0} USD</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{new Date(group?.created_at).toLocaleDateString('ar')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* التبويبات الرئيسية */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              الأعضاء
            </TabsTrigger>
            <TabsTrigger value="voting" className="flex items-center gap-2">
              <Vote className="w-4 h-4" />
              التصويت المتقدم
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              المناقشات
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              عروض الموردين
            </TabsTrigger>
            <TabsTrigger value="freelancers" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              عروض المستقلين
            </TabsTrigger>
            <TabsTrigger value="arbitration" className="flex items-center gap-2">
              <Gavel className="w-4 h-4" />
              التحكيم
            </TabsTrigger>
          </TabsList>

          {/* تبويب نظرة عامة */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">معلومات المشروع</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">نوع المجموعة:</span>
                    <span className="mr-2">{group?.group_type}</span>
                  </div>
                  <div>
                    <span className="font-medium">القطاع:</span>
                    <span className="mr-2">{group?.sector}</span>
                  </div>
                  <div>
                    <span className="font-medium">نوع العقد:</span>
                    <span className="mr-2">{group?.contract_type}</span>
                  </div>
                  <div>
                    <span className="font-medium">جولات التفاوض:</span>
                    <span className="mr-2">{group?.negotiation_rounds}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">إحصائيات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>عروض الموردين:</span>
                    <Badge variant="outline">{supplierOffers?.length || 0}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>عروض المستقلين:</span>
                    <Badge variant="outline">{freelancerOffers?.length || 0}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>جلسات التصويت:</span>
                    <Badge variant="outline">{votingSessions?.length || 0}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>الأعضاء النشطون:</span>
                    <Badge variant="outline">{members?.filter(m => m.status === 'active').length || 0}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">الإجراءات السريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    إنشاء جلسة تصويت
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    دعوة أعضاء جدد
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    طلب عروض موردين
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    تصدير تقرير
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* تبويب الأعضاء */}
          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>قائمة الأعضاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {members?.map((member: any) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{member.profiles?.full_name || 'مستخدم'}</h4>
                          <p className="text-sm text-gray-500">{member.profiles?.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                          {member.role === 'admin' ? 'مشرف' : 'عضو'}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          انضم: {new Date(member.joined_at).toLocaleDateString('ar')}
                        </p>
                      </div>
                    </div>
                  ))}
                  {(!members || members.length === 0) && (
                    <p className="text-gray-500 text-center py-8">لا يوجد أعضاء في هذه المجموعة</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب التصويت المتقدم */}
          <TabsContent value="voting" className="space-y-6">
            <VotingSystem sessionId={id || 'default'} groupId={id || 'default'} />
          </TabsContent>

          {/* تبويب المناقشات */}
          <TabsContent value="discussions" className="space-y-6">
            <DiscussionSystem groupId={id || 'default'} />
          </TabsContent>

          {/* تبويب عروض الموردين */}
          <TabsContent value="suppliers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>عروض الموردين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supplierOffers?.map((offer: any) => (
                    <div key={offer.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{offer.title || offer.offer_description}</h4>
                        <Badge className={getStatusColor(offer.status)}>
                          {offer.status === 'pending' ? 'معلق' : offer.status === 'accepted' ? 'مقبول' : 'مرفوض'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-medium text-green-600">${offer.price} USD</span>
                        <span className="text-gray-500">مدة التسليم: {offer.delivery_time}</span>
                        <span className="text-gray-500">الشركة: {offer.company_name}</span>
                      </div>
                    </div>
                  ))}
                  {(!supplierOffers || supplierOffers.length === 0) && (
                    <p className="text-gray-500 text-center py-8">لا توجد عروض من الموردين</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب عروض المستقلين */}
          <TabsContent value="freelancers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>عروض المستقلين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {freelancerOffers?.map((offer: any) => (
                    <div key={offer.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{offer.title || offer.offer_description}</h4>
                        <Badge className={getStatusColor(offer.status)}>
                          {offer.status === 'pending' ? 'معلق' : offer.status === 'accepted' ? 'مقبول' : 'مرفوض'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-medium text-green-600">${offer.price} USD</span>
                        <span className="text-gray-500">المدة: {offer.timeline_days} أيام</span>
                        <span className="text-gray-500">التسليم: {offer.delivery_time}</span>
                      </div>
                      {offer.additional_notes && (
                        <p className="text-xs text-gray-500 mt-2">ملاحظات: {offer.additional_notes}</p>
                      )}
                    </div>
                  ))}
                  {(!freelancerOffers || freelancerOffers.length === 0) && (
                    <p className="text-gray-500 text-center py-8">لا توجد عروض من المستقلين</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب التحكيم */}
          <TabsContent value="arbitration" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>طلبات التحكيم</CardTitle>
                  <Button variant="outline">رفع قضية جديدة</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Gavel className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>لا توجد قضايا تحكيم حالياً</p>
                  <p className="text-sm">يمكنك رفع قضية في حالة وجود نزاع</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GroupRoom;