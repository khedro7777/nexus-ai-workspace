
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  Settings, 
  Shield, 
  Award,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building
} from 'lucide-react';

interface Party {
  id: string;
  name: string;
  type: 'individual' | 'company' | 'organization';
  role: 'member' | 'admin' | 'observer' | 'supplier' | 'client';
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  joinedDate: string;
  lastActive: string;
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
  };
  permissions: string[];
  contribution: number;
  projects: number;
}

interface Invitation {
  id: string;
  email: string;
  role: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
}

const PartiesManagement = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const parties: Party[] = [
    {
      id: 'P-001',
      name: 'أحمد محمد السالم',
      type: 'individual',
      role: 'admin',
      status: 'active',
      joinedDate: '2024-01-10',
      lastActive: '2024-01-15',
      contactInfo: {
        email: 'ahmed@example.com',
        phone: '+966501234567',
        address: 'الرياض، السعودية'
      },
      permissions: ['manage_members', 'create_votes', 'approve_contracts'],
      contribution: 95,
      projects: 8
    },
    {
      id: 'P-002',
      name: 'شركة التقنية المتطورة',
      type: 'company',
      role: 'supplier',
      status: 'active',
      joinedDate: '2024-01-12',
      lastActive: '2024-01-14',
      contactInfo: {
        email: 'info@techadvanced.sa',
        phone: '+966502345678',
        address: 'جدة، السعودية'
      },
      permissions: ['submit_offers', 'view_projects'],
      contribution: 87,
      projects: 5
    },
    {
      id: 'P-003',
      name: 'فاطمة علي الأحمد',
      type: 'individual',
      role: 'member',
      status: 'active',
      joinedDate: '2024-01-08',
      lastActive: '2024-01-15',
      contactInfo: {
        email: 'fatima@example.com',
        phone: '+966503456789'
      },
      permissions: ['participate_votes', 'view_projects'],
      contribution: 78,
      projects: 3
    },
    {
      id: 'P-004',
      name: 'محمد سالم القحطاني',
      type: 'individual',
      role: 'observer',
      status: 'pending',
      joinedDate: '2024-01-14',
      lastActive: '2024-01-14',
      contactInfo: {
        email: 'mohammed@example.com'
      },
      permissions: ['view_projects'],
      contribution: 0,
      projects: 0
    }
  ];

  const invitations: Invitation[] = [
    {
      id: 'I-001',
      email: 'new.member@example.com',
      role: 'member',
      status: 'pending',
      invitedBy: 'أحمد محمد السالم',
      invitedAt: '2024-01-14',
      expiresAt: '2024-01-21'
    },
    {
      id: 'I-002',
      email: 'supplier@company.com',
      role: 'supplier',
      status: 'accepted',
      invitedBy: 'أحمد محمد السالم',
      invitedAt: '2024-01-10',
      expiresAt: '2024-01-17'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'member': return 'bg-blue-100 text-blue-800';
      case 'supplier': return 'bg-orange-100 text-orange-800';
      case 'client': return 'bg-green-100 text-green-800';
      case 'observer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'company': return <Building className="w-4 h-4" />;
      case 'organization': return <Users className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'مشرف';
      case 'member': return 'عضو';
      case 'supplier': return 'مورد';
      case 'client': return 'عميل';
      case 'observer': return 'مراقب';
      default: return role;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'inactive': return 'غير نشط';
      case 'pending': return 'معلق';
      case 'suspended': return 'معلق';
      case 'accepted': return 'مقبول';
      case 'declined': return 'مرفوض';
      case 'expired': return 'منتهي';
      default: return status;
    }
  };

  const handleInvite = () => {
    if (inviteEmail) {
      console.log('دعوة:', { email: inviteEmail, role: inviteRole });
      setInviteEmail('');
    }
  };

  return (
    <div className="space-y-6">
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{parties.length}</p>
                <p className="text-gray-600 text-sm">إجمالي الأطراف</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{parties.filter(p => p.status === 'active').length}</p>
                <p className="text-gray-600 text-sm">الأطراف النشطة</p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-600">{invitations.filter(i => i.status === 'pending').length}</p>
                <p className="text-gray-600 text-sm">دعوات معلقة</p>
              </div>
              <UserPlus className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">{parties.filter(p => p.role === 'admin').length}</p>
                <p className="text-gray-600 text-sm">المشرفون</p>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">الأعضاء</TabsTrigger>
          <TabsTrigger value="invitations">الدعوات</TabsTrigger>
          <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>إدارة الأطراف</CardTitle>
                <div className="flex gap-2">
                  <Input
                    placeholder="البريد الإلكتروني"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-48"
                  />
                  <Button onClick={handleInvite}>
                    <UserPlus className="w-4 h-4 ml-1" />
                    دعوة
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {parties.map((party) => (
                  <div key={party.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(party.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{party.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getRoleColor(party.role)}>
                              {getRoleText(party.role)}
                            </Badge>
                            <Badge className={getStatusColor(party.status)}>
                              {getStatusText(party.status)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      {party.contactInfo.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          <span>{party.contactInfo.email}</span>
                        </div>
                      )}
                      {party.contactInfo.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          <span>{party.contactInfo.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>انضم في {party.joinedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        <span>{party.projects} مشاريع</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-xs text-gray-500">المساهمة</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-blue-500 rounded-full" 
                                style={{ width: `${party.contribution}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{party.contribution}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          تعديل الدور
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <UserMinus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الدعوات المرسلة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invitations.map((invitation) => (
                  <div key={invitation.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{invitation.email}</h3>
                        <p className="text-sm text-gray-600">دور: {getRoleText(invitation.role)}</p>
                      </div>
                      <Badge className={getStatusColor(invitation.status)}>
                        {getStatusText(invitation.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div>
                        <span>مرسل من: {invitation.invitedBy}</span>
                        <span className="mx-2">•</span>
                        <span>تاريخ الإرسال: {invitation.invitedAt}</span>
                      </div>
                      <div className="flex gap-2">
                        {invitation.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm">
                              إعادة إرسال
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              إلغاء
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إدارة الصلاحيات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Shield className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">إدارة الصلاحيات</h3>
                <p className="text-gray-600">ستظهر إعدادات الصلاحيات التفصيلية هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PartiesManagement;
