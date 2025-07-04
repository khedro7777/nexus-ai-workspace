
// صفحة غرفة المجموعة - عرض تفاصيل المجموعة مع تبويبات للإدارة
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  MessageSquare,
  Plus,
  UserPlus,
  Send
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import VotingSystem from '@/components/voting/VotingSystem';
import DiscussionSystem from '@/components/discussions/DiscussionSystem';
import RFQCard from '@/components/rfq/RFQCard';
import RFQFilters from '@/components/rfq/RFQFilters';
import CreateSupplierOffer from '@/components/offers/CreateSupplierOffer';
import SupplierOffers from '@/components/offers/SupplierOffers';

const GroupRoom = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [showRFQSection, setShowRFQSection] = useState(false);
  const [showInviteSection, setShowInviteSection] = useState(false);
  const [showCreateOffer, setShowCreateOffer] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const { id } = useParams();

  // Mock RFQ data for demonstration
  const mockRFQs = [
    {
      id: '1',
      title: 'تطوير تطبيق جوال للتجارة الإلكترونية',
      description: 'نحتاج إلى تطوير تطبيق جوال شامل للتجارة الإلكترونية يدعم النظامين iOS و Android',
      category: 'تطوير البرمجيات',
      budget: {
        min: 50000,
        max: 100000,
        currency: 'ريال'
      },
      deadline: '2025-08-15',
      location: 'الرياض، السعودية',
      requirements: ['Flutter', 'Firebase', 'دفع إلكتروني', 'تصميم UI/UX'],
      status: 'open' as const,
      submissionsCount: 12,
      createdAt: '2025-07-01',
      clientName: 'شركة التقنية المتقدمة'
    },
    {
      id: '2',
      title: 'حملة تسويق رقمي لمنتج جديد',
      description: 'تصميم وتنفيذ حملة تسويق رقمي شاملة لإطلاق منتج تقني جديد في السوق',
      category: 'التسويق الرقمي',
      budget: {
        min: 25000,
        max: 50000,
        currency: 'ريال'
      },
      deadline: '2025-07-30',
      location: 'دبي، الإمارات',
      requirements: ['إدارة وسائل التواصل', 'إعلانات جوجل', 'تسويق بالمحتوى', 'تحليل البيانات'],
      status: 'open' as const,
      submissionsCount: 8,
      createdAt: '2025-06-25',
      clientName: 'مؤسسة الابتكار التقني'
    }
  ];

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
          profiles(full_name, role, company_name)
        `)
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

  const handleViewDetails = (rfqId: string) => {
    console.log('Viewing details for RFQ:', rfqId);
  };

  const handleSubmitProposal = (rfqId: string) => {
    console.log('Submitting proposal for RFQ:', rfqId);
  };

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters(newFilters);
  };

  const handleInviteMember = () => {
    if (inviteEmail) {
      console.log('دعوة عضو:', { email: inviteEmail, role: inviteRole, groupId: id });
      setInviteEmail('');
      setInviteRole('member');
    }
  };

  const handleOfferCreated = () => {
    setShowCreateOffer(false);
    // Refresh offers data if needed
  };

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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{group?.jurisdiction}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{members?.length || 0} أعضاء</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{group?.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{new Date(group?.created_at).toLocaleDateString('ar')}</span>
              </div>
            </div>

            {/* أزرار الإجراءات السريعة */}
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => setShowRFQSection(!showRFQSection)}
                className="flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                طلب عروض الموردين
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowInviteSection(!showInviteSection)}
                className="flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                دعوة أعضاء
              </Button>
              <Button 
                onClick={() => setShowCreateOffer(!showCreateOffer)}
                className="flex items-center gap-2"
                variant="outline"
              >
                <Plus className="w-4 h-4" />
                إنشاء عرض مورد
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* قسم إنشاء عرض مورد */}
        {showCreateOffer && (
          <div className="mb-8">
            <CreateSupplierOffer 
              groupId={id || ''} 
              onOfferCreated={handleOfferCreated}
            />
          </div>
        )}

        {/* قسم طلب عروض الموردين */}
        {showRFQSection && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                طلب عروض الموردين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* الفلاتر */}
                <div className="lg:w-80">
                  <RFQFilters 
                    onFilterChange={handleFilterChange}
                    activeFilters={activeFilters}
                  />
                </div>

                {/* قائمة العروض */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockRFQs.map((rfq) => (
                      <RFQCard
                        key={rfq.id}
                        rfq={rfq}
                        onViewDetails={handleViewDetails}
                        onSubmitProposal={handleSubmitProposal}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* قسم دعوة الأعضاء */}
        {showInviteSection && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                دعوة أعضاء جدد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="البريد الإلكتروني"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">عضو</SelectItem>
                    <SelectItem value="admin">مشرف</SelectItem>
                    <SelectItem value="observer">مراقب</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleInviteMember} className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  إرسال الدعوة
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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
                    <span className="mr-2">{group?.type}</span>
                  </div>
                  <div>
                    <span className="font-medium">بوابة الخدمة:</span>
                    <span className="mr-2">{group?.service_gateway}</span>
                  </div>
                  <div>
                    <span className="font-medium">الإطار القانوني:</span>
                    <span className="mr-2">{group?.legal_framework}</span>
                  </div>
                  <div>
                    <span className="font-medium">الولاية القضائية:</span>
                    <span className="mr-2">{group?.jurisdiction}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">إحصائيات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>الأعضاء:</span>
                    <Badge variant="outline">{members?.length || 0}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>جلسات التصويت:</span>
                    <Badge variant="outline">{votingSessions?.length || 0}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>الأعضاء النشطون:</span>
                    <Badge variant="outline">{members?.filter(m => m.role === 'admin' || m.role === 'member').length || 0}</Badge>
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
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowInviteSection(true)}
                  >
                    دعوة أعضاء جدد
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowRFQSection(true)}
                  >
                    طلب عروض موردين
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    تصدير تقرير
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* باقي التبويبات */}
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
                          <p className="text-sm text-gray-500">{member.profiles?.company_name || 'لا يوجد اسم شركة'}</p>
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

          <TabsContent value="voting" className="space-y-6">
            <VotingSystem sessionId={id || 'default'} groupId={id || 'default'} />
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <DiscussionSystem groupId={id || 'default'} />
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <SupplierOffers groupId={id || 'default'} />
          </TabsContent>

          <TabsContent value="freelancers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>عروض المستقلين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <UserCheck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>لا توجد عروض من المستقلين حالياً</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
