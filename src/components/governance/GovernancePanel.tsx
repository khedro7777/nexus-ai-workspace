
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Users, 
  FileText, 
  Vote, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Eye,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

interface GovernanceRule {
  id: string;
  title: string;
  description: string;
  type: 'voting' | 'approval' | 'automatic';
  status: 'active' | 'inactive' | 'pending';
  threshold: number;
  createdAt: string;
  lastUpdated: string;
}

interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  status: 'pending' | 'voting' | 'approved' | 'rejected';
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  deadline: string;
  category: string;
}

const GovernancePanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const governanceRules: GovernanceRule[] = [
    {
      id: 'GR-001',
      title: 'موافقة الأعضاء على القرارات المالية',
      description: 'يتطلب موافقة 75% من الأعضاء على أي قرار مالي يتجاوز 10,000 ريال',
      type: 'voting',
      status: 'active',
      threshold: 75,
      createdAt: '2024-01-10',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'GR-002',
      title: 'إضافة أعضاء جدد',
      description: 'يتطلب موافقة مؤسس المجموعة لإضافة عضو جديد',
      type: 'approval',
      status: 'active',
      threshold: 100,
      createdAt: '2024-01-08',
      lastUpdated: '2024-01-12'
    },
    {
      id: 'GR-003',
      title: 'توزيع الأرباح التلقائي',
      description: 'توزيع الأرباح تلقائياً حسب نسبة المساهمة عند اكتمال المشروع',
      type: 'automatic',
      status: 'active',
      threshold: 0,
      createdAt: '2024-01-05',
      lastUpdated: '2024-01-10'
    }
  ];

  const proposals: GovernanceProposal[] = [
    {
      id: 'GP-001',
      title: 'تعديل آلية توزيع الأرباح',
      description: 'اقتراح لتعديل نسب توزيع الأرباح لتشمل مكافآت أداء إضافية',
      proposer: 'أحمد محمد',
      status: 'voting',
      votesFor: 8,
      votesAgainst: 2,
      totalVotes: 15,
      deadline: '2024-01-25',
      category: 'مالي'
    },
    {
      id: 'GP-002',
      title: 'إضافة مورد جديد للقائمة المعتمدة',
      description: 'اقتراح لإضافة شركة التقنية المتطورة للموردين المعتمدين',
      proposer: 'فاطمة علي',
      status: 'pending',
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 15,
      deadline: '2024-01-30',
      category: 'عمليات'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'voting': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'voting': return <Vote className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* نظرة عامة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{governanceRules.filter(r => r.status === 'active').length}</p>
                <p className="text-gray-600 text-sm">قواعد نشطة</p>
              </div>
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{proposals.filter(p => p.status === 'approved').length}</p>
                <p className="text-gray-600 text-sm">مقترحات موافق عليها</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-600">{proposals.filter(p => p.status === 'voting').length}</p>
                <p className="text-gray-600 text-sm">قيد التصويت</p>
              </div>
              <Vote className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">85%</p>
                <p className="text-gray-600 text-sm">معدل المشاركة</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="rules">القواعد</TabsTrigger>
          <TabsTrigger value="proposals">المقترحات</TabsTrigger>
          <TabsTrigger value="voting">التصويت</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>حالة الحوكمة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>مستوى الامتثال</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>مشاركة الأعضاء</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>الشفافية</span>
                    <span>98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>قواعد الحوكمة</CardTitle>
                <Button size="sm">إضافة قاعدة جديدة</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {governanceRules.map((rule) => (
                  <div key={rule.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">{rule.title}</h3>
                      <Badge className={getStatusColor(rule.status)}>
                        {getStatusIcon(rule.status)}
                        <span className="mr-1">
                          {rule.status === 'active' ? 'نشط' : 
                           rule.status === 'inactive' ? 'غير نشط' : 'معلق'}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>النوع: {rule.type === 'voting' ? 'تصويت' : rule.type === 'approval' ? 'موافقة' : 'تلقائي'}</span>
                      {rule.threshold > 0 && <span>العتبة: {rule.threshold}%</span>}
                      <span>آخر تحديث: {rule.lastUpdated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposals" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>المقترحات</CardTitle>
                <Button size="sm">اقتراح جديد</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{proposal.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{proposal.description}</p>
                      </div>
                      <Badge className={getStatusColor(proposal.status)}>
                        {proposal.status === 'pending' ? 'معلق' :
                         proposal.status === 'voting' ? 'قيد التصويت' :
                         proposal.status === 'approved' ? 'موافق عليه' : 'مرفوض'}
                      </Badge>
                    </div>
                    
                    {proposal.status === 'voting' && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-2">
                          <span>التصويت: {proposal.votesFor + proposal.votesAgainst}/{proposal.totalVotes}</span>
                          <span>الموعد النهائي: {proposal.deadline}</span>
                        </div>
                        <div className="flex gap-2 mb-2">
                          <div className="flex-1">
                            <div className="text-xs text-green-600 mb-1">موافق ({proposal.votesFor})</div>
                            <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-2" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-red-600 mb-1">معارض ({proposal.votesAgainst})</div>
                            <Progress value={(proposal.votesAgainst / proposal.totalVotes) * 100} className="h-2" />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>المقترح: {proposal.proposer}</span>
                      <span>التصنيف: {proposal.category}</span>
                      {proposal.status === 'voting' && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="h-6 text-xs">
                            عرض التفاصيل
                          </Button>
                          <Button size="sm" className="h-6 text-xs">
                            صوت
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>جلسات التصويت النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Vote className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد جلسات تصويت نشطة</h3>
                <p className="text-gray-600">ستظهر جلسات التصويت الجديدة هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GovernancePanel;
