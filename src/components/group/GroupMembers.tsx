
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Star,
  Shield,
  Crown,
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  MessageSquare
} from 'lucide-react';

interface GroupMembersProps {
  members: any[];
  groupId: string;
  userAccess: any;
}

const GroupMembers: React.FC<GroupMembersProps> = ({ members, groupId, userAccess }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock enhanced member data
  const enhancedMembers = [
    {
      id: '1',
      name: 'أحمد محمد السالم',
      role: 'creator',
      status: 'active',
      email: 'ahmed@example.com',
      phone: '+970-2-1234567',
      location: 'رام الله، فلسطين',
      joined_date: '2024-01-15',
      contribution_score: 95,
      votes_cast: 12,
      proposals_created: 3,
      discussions_participated: 8,
      trust_rating: 4.8,
      verification_status: 'verified',
      last_activity: '2024-01-20T10:30:00Z',
      expertise: ['إدارة المشاريع', 'التفاوض', 'القيادة'],
      company: 'شركة التطوير المتقدم'
    },
    {
      id: '2',
      name: 'فاطمة أحمد علي',
      role: 'admin',
      status: 'active',
      email: 'fatima@example.com',
      phone: '+970-2-2345678',
      location: 'نابلس، فلسطين',
      joined_date: '2024-01-18',
      contribution_score: 88,
      votes_cast: 10,
      proposals_created: 2,
      discussions_participated: 15,
      trust_rating: 4.6,
      verification_status: 'verified',
      last_activity: '2024-01-20T14:15:00Z',
      expertise: ['المالية', 'المحاسبة', 'التحليل'],
      company: 'مكتب الاستشارات المالية'
    },
    {
      id: '3',
      name: 'محمد سالم يوسف',
      role: 'member',
      status: 'active',
      email: 'mohammed@example.com',
      phone: '+970-2-3456789',
      location: 'الخليل، فلسطين',
      joined_date: '2024-01-20',
      contribution_score: 72,
      votes_cast: 8,
      proposals_created: 1,
      discussions_participated: 5,
      trust_rating: 4.2,
      verification_status: 'pending',
      last_activity: '2024-01-20T16:45:00Z',
      expertise: ['التسويق', 'المبيعات'],
      company: 'مؤسسة التجارة الحديثة'
    }
  ];

  const filteredMembers = enhancedMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'creator': return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'admin': return <Shield className="w-4 h-4 text-blue-500" />;
      default: return <Users className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'creator': return 'مؤسس';
      case 'admin': return 'مشرف';
      case 'member': return 'عضو';
      default: return role;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified': return <Badge className="bg-green-100 text-green-800">موثق</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800">قيد التوثيق</Badge>;
      case 'rejected': return <Badge className="bg-red-100 text-red-800">مرفوض</Badge>;
      default: return <Badge variant="outline">غير موثق</Badge>;
    }
  };

  const getContributionLevel = (score: number) => {
    if (score >= 90) return { level: 'ممتاز', color: 'text-green-600' };
    if (score >= 80) return { level: 'جيد جداً', color: 'text-blue-600' };
    if (score >= 70) return { level: 'جيد', color: 'text-yellow-600' };
    return { level: 'مقبول', color: 'text-gray-600' };
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{enhancedMembers.length}</div>
            <div className="text-sm text-gray-600">إجمالي الأعضاء</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <UserCheck className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{enhancedMembers.filter(m => m.status === 'active').length}</div>
            <div className="text-sm text-gray-600">الأعضاء النشطون</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{enhancedMembers.filter(m => m.verification_status === 'verified').length}</div>
            <div className="text-sm text-gray-600">موثقون</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">4.5</div>
            <div className="text-sm text-gray-600">متوسط التقييم</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              قائمة الأعضاء
            </CardTitle>
            
            {userAccess.canInvite && (
              <Button>
                <UserPlus className="w-4 h-4 ml-2" />
                دعوة أعضاء جدد
              </Button>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="البحث بالاسم أو البريد الإلكتروني..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الدور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأدوار</SelectItem>
                <SelectItem value="creator">مؤسس</SelectItem>
                <SelectItem value="admin">مشرف</SelectItem>
                <SelectItem value="member">عضو</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="suspended">معلق</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Members List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMembers.map((member) => {
          const contribution = getContributionLevel(member.contribution_score);
          
          return (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                        {member.name.split(' ')[0].charAt(0)}{member.name.split(' ')[1]?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(member.role)}
                        <span className="text-sm text-gray-600">{getRoleName(member.role)}</span>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status === 'active' ? 'نشط' : 
                           member.status === 'inactive' ? 'غير نشط' :
                           member.status === 'pending' ? 'قيد الانتظار' : 'معلق'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getVerificationBadge(member.verification_status)}
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>انضم في {new Date(member.joined_date).toLocaleDateString('ar')}</span>
                  </div>
                </div>

                {/* Company & Expertise */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">الشركة:</div>
                  <div className="font-medium text-sm">{member.company}</div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">مجالات الخبرة:</div>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${contribution.color}`}>
                      {member.contribution_score}%
                    </div>
                    <div className="text-xs text-gray-500">درجة المساهمة</div>
                    <div className={`text-xs ${contribution.color}`}>{contribution.level}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600 flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      {member.trust_rating}
                    </div>
                    <div className="text-xs text-gray-500">تقييم الثقة</div>
                  </div>
                </div>

                {/* Activity Summary */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="text-sm font-bold text-blue-600">{member.votes_cast}</div>
                    <div className="text-xs text-blue-500">تصويت</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <div className="text-sm font-bold text-green-600">{member.proposals_created}</div>
                    <div className="text-xs text-green-500">اقتراح</div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <div className="text-sm font-bold text-purple-600">{member.discussions_participated}</div>
                    <div className="text-xs text-purple-500">مناقشة</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="w-4 h-4 ml-2" />
                    رسالة
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Star className="w-4 h-4 ml-2" />
                    تقييم
                  </Button>
                </div>

                {/* Last Activity */}
                <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                  آخر نشاط: {new Date(member.last_activity).toLocaleString('ar')}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-600">لا توجد أعضاء تطابق معايير البحث المحددة</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GroupMembers;
