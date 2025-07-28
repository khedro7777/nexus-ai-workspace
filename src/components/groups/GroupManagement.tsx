
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Vote, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Settings,
  Eye,
  MessageSquare
} from 'lucide-react';

interface GroupManagementProps {
  groupId: string;
  userRole: 'creator' | 'member' | 'viewer';
}

const GroupManagement = ({ groupId, userRole }: GroupManagementProps) => {
  const [loading, setLoading] = useState(false);

  const groupData = {
    id: groupId,
    name: 'مجموعة تطوير الأنظمة',
    description: 'مجموعة متخصصة في تطوير أنظمة إدارة المخزون',
    status: 'active',
    memberCount: 8,
    maxMembers: 15,
    progress: 65
  };

  const members = [
    {
      id: 'MEM-001',
      name: 'أحمد محمد',
      role: 'creator',
      joinDate: '2024-01-10',
      status: 'active',
      contribution: 85
    },
    {
      id: 'MEM-002',
      name: 'فاطمة علي',
      role: 'member',
      joinDate: '2024-01-12',
      status: 'active',
      contribution: 92
    },
    {
      id: 'MEM-003',
      name: 'محمد سالم',
      role: 'member',
      joinDate: '2024-01-15',
      status: 'active',
      contribution: 78
    }
  ];

  const votingSessions = [
    {
      id: 'VOTE-001',
      title: 'اختيار المورد النهائي',
      description: 'التصويت على أفضل عرض من الموردين المتقدمين',
      status: 'active',
      deadline: '2024-01-25',
      totalVotes: 6,
      requiredVotes: 8,
      options: [
        { id: 'OPT-001', name: 'شركة التقنية المتطورة', votes: 4 },
        { id: 'OPT-002', name: 'مؤسسة الحلول الذكية', votes: 2 }
      ]
    },
    {
      id: 'VOTE-002',
      title: 'موافقة على شروط العقد',
      description: 'الموافقة على الشروط والأحكام النهائية للعقد',
      status: 'completed',
      deadline: '2024-01-20',
      totalVotes: 8,
      requiredVotes: 8,
      result: 'approved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'creator': return 'مؤسس';
      case 'member': return 'عضو';
      case 'viewer': return 'مشاهد';
      default: return role;
    }
  };

  return (
    <div className="space-y-6">
      {/* Group Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>نظرة عامة على المجموعة</CardTitle>
            {userRole === 'creator' && (
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 ml-1" />
                إدارة المجموعة
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{groupData.memberCount}/{groupData.maxMembers}</div>
              <div className="text-sm text-gray-500">الأعضاء</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{groupData.progress}%</div>
              <div className="text-sm text-gray-500">التقدم</div>
            </div>
            <div className="text-center">
              <Badge className={`text-white ${getStatusColor(groupData.status)}`}>
                {groupData.status === 'active' ? 'نشطة' : 'غير نشطة'}
              </Badge>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={groupData.progress} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="members">الأعضاء</TabsTrigger>
          <TabsTrigger value="voting">التصويت</TabsTrigger>
          <TabsTrigger value="contracts">العقود</TabsTrigger>
          <TabsTrigger value="discussions">المناقشات</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>أعضاء المجموعة</CardTitle>
                {userRole === 'creator' && (
                  <Button size="sm">
                    <Plus className="w-4 h-4 ml-1" />
                    دعوة أعضاء
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-500">انضم في {member.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Badge variant="outline">
                        {getRoleText(member.role)}
                      </Badge>
                      <div className="text-center">
                        <div className="text-sm font-medium">{member.contribution}%</div>
                        <div className="text-xs text-gray-500">المساهمة</div>
                      </div>
                      {userRole === 'creator' && member.role !== 'creator' && (
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voting" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>جلسات التصويت</CardTitle>
                {userRole === 'creator' && (
                  <Button size="sm">
                    <Plus className="w-4 h-4 ml-1" />
                    إنشاء تصويت
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {votingSessions.map((session) => (
                  <div key={session.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{session.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{session.description}</p>
                      </div>
                      <Badge className={`text-white ${getStatusColor(session.status)}`}>
                        {session.status === 'active' ? 'نشط' : 'مكتمل'}
                      </Badge>
                    </div>
                    
                    {session.status === 'active' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>التصويت: {session.totalVotes}/{session.requiredVotes}</span>
                          <span>الموعد النهائي: {session.deadline}</span>
                        </div>
                        <Progress value={(session.totalVotes / session.requiredVotes) * 100} />
                        
                        <div className="space-y-2">
                          {session.options.map((option) => (
                            <div key={option.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span>{option.name}</span>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <span className="text-sm">{option.votes} أصوات</span>
                                <Button size="sm" variant="outline">
                                  صوت
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {session.status === 'completed' && (
                      <div className="flex items-center space-x-2 space-x-reverse text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>النتيجة: {session.result === 'approved' ? 'موافق عليه' : 'مرفوض'}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>العقود الجماعية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عقود بعد</h3>
                <p className="text-gray-600 mb-4">ستظهر العقود هنا بعد إتمام التفاوض والتصويت</p>
                {userRole === 'creator' && (
                  <Button>
                    <Plus className="w-4 h-4 ml-1" />
                    إنشاء عقد جديد
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>المناقشات والرسائل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">ابدأ المناقشة</h3>
                <p className="text-gray-600 mb-4">شارك أفكارك وناقش القرارات مع أعضاء المجموعة</p>
                <Button>
                  <MessageSquare className="w-4 h-4 ml-1" />
                  إرسال رسالة
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupManagement;
