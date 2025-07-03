
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Calendar, DollarSign, Users, CheckCircle, AlertTriangle, Clock, Download } from 'lucide-react';

interface SmartContract {
  id: string;
  title: string;
  description: string;
  type: 'purchase' | 'service' | 'partnership' | 'employment' | 'licensing';
  status: 'draft' | 'pending_approval' | 'active' | 'completed' | 'terminated' | 'disputed';
  parties: ContractParty[];
  terms: ContractTerm[];
  milestones: Milestone[];
  value: number;
  currency: string;
  startDate: string;
  endDate: string;
  autoRenewal: boolean;
  escalationClauses: EscalationClause[];
  complianceRequirements: string[];
  createdAt: string;
  lastModified: string;
  signatures: Signature[];
  documents: Document[];
}

interface ContractParty {
  id: string;
  name: string;
  role: 'client' | 'supplier' | 'partner' | 'contractor';
  email: string;
  organization: string;
  signatureRequired: boolean;
  signedAt?: string;
}

interface ContractTerm {
  id: string;
  category: 'payment' | 'delivery' | 'quality' | 'liability' | 'confidentiality' | 'termination';
  title: string;
  description: string;
  conditions: string[];
  penalties: string[];
  isNegotiable: boolean;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  value: number;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  deliverables: string[];
  approvedBy?: string;
  completedAt?: string;
}

interface EscalationClause {
  id: string;
  trigger: string;
  action: string;
  timeline: string;
  responsible: string;
}

interface Signature {
  id: string;
  partyId: string;
  signedAt: string;
  ipAddress: string;
  digitalSignature: string;
  verified: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  version: string;
}

const SmartContractManagement = () => {
  const [contracts, setContracts] = useState<SmartContract[]>([
    {
      id: '1',
      title: 'عقد تطوير تطبيق محمول',
      description: 'عقد تطوير تطبيق محمول للتجارة الإلكترونية مع فريق التطوير',
      type: 'service',
      status: 'active',
      parties: [
        {
          id: '1',
          name: 'شركة التقنية المتقدمة',
          role: 'client',
          email: 'info@advtech.com',
          organization: 'شركة التقنية المتقدمة',
          signatureRequired: true,
          signedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          name: 'فريق التطوير الذكي',
          role: 'contractor',
          email: 'team@smartdev.com',
          organization: 'فريق التطوير الذكي',
          signatureRequired: true,
          signedAt: '2024-01-15T14:30:00Z'
        }
      ],
      terms: [
        {
          id: '1',
          category: 'payment',
          title: 'شروط الدفع',
          description: 'دفع المبلغ على 4 دفعات متساوية',
          conditions: ['دفع 25% عند بداية المشروع', 'دفع 25% عند إنجاز 50% من العمل'],
          penalties: ['تأخير 1% يومياً في حالة التأخير في الدفع'],
          isNegotiable: false
        },
        {
          id: '2',
          category: 'delivery',
          title: 'شروط التسليم',
          description: 'تسليم المشروع في الموعد المحدد مع ضمان الجودة',
          conditions: ['تسليم المشروع خلال 4 أشهر', 'اختبار شامل قبل التسليم'],
          penalties: ['خصم 2% من القيمة الإجمالية عن كل أسبوع تأخير'],
          isNegotiable: true
        }
      ],
      milestones: [
        {
          id: '1',
          title: 'تصميم واجهة المستخدم',
          description: 'إنجاز تصميم جميع واجهات التطبيق',
          dueDate: '2024-02-15',
          value: 7500,
          status: 'completed',
          deliverables: ['ملفات التصميم', 'دليل الاستخدام'],
          approvedBy: 'شركة التقنية المتقدمة',
          completedAt: '2024-02-10T16:00:00Z'
        },
        {
          id: '2',
          title: 'تطوير الواجهة الأمامية',
          description: 'تطوير وتنفيذ الواجهة الأمامية للتطبيق',
          dueDate: '2024-03-15',
          value: 10000,
          status: 'in_progress',
          deliverables: ['كود الواجهة الأمامية', 'اختبارات الوحدة']
        }
      ],
      value: 30000,
      currency: 'USD',
      startDate: '2024-01-15',
      endDate: '2024-05-15',
      autoRenewal: false,
      escalationClauses: [
        {
          id: '1',
          trigger: 'تأخير في التسليم أكثر من أسبوع',
          action: 'اجتماع طارئ لمراجعة الوضع',
          timeline: '48 ساعة',
          responsible: 'مدير المشروع'
        }
      ],
      complianceRequirements: ['معايير الأمان', 'حماية البيانات', 'جودة الكود'],
      createdAt: '2024-01-10T09:00:00Z',
      lastModified: '2024-02-10T16:00:00Z',
      signatures: [
        {
          id: '1',
          partyId: '1',
          signedAt: '2024-01-15T10:00:00Z',
          ipAddress: '192.168.1.100',
          digitalSignature: 'signature_hash_1',
          verified: true
        },
        {
          id: '2',
          partyId: '2',
          signedAt: '2024-01-15T14:30:00Z',
          ipAddress: '192.168.1.101',
          digitalSignature: 'signature_hash_2',
          verified: true
        }
      ],
      documents: [
        {
          id: '1',
          name: 'العقد الأساسي',
          type: 'PDF',
          url: '/documents/contract_1.pdf',
          uploadedAt: '2024-01-15T10:00:00Z',
          version: '1.0'
        }
      ]
    }
  ]);

  const [selectedContract, setSelectedContract] = useState<SmartContract | null>(contracts[0]);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    dueDate: '',
    value: 0,
    deliverables: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'terminated': return 'bg-red-100 text-red-800';
      case 'disputed': return 'bg-orange-100 text-orange-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'active': case 'in_progress': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'overdue': case 'disputed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleAddMilestone = () => {
    if (!selectedContract || !newMilestone.title) return;

    const milestone: Milestone = {
      id: Date.now().toString(),
      ...newMilestone,
      deliverables: newMilestone.deliverables.split(',').map(d => d.trim()),
      status: 'pending'
    };

    const updatedContract = {
      ...selectedContract,
      milestones: [...selectedContract.milestones, milestone]
    };

    setContracts(prev => prev.map(c => c.id === selectedContract.id ? updatedContract : c));
    setSelectedContract(updatedContract);
    setNewMilestone({
      title: '',
      description: '',
      dueDate: '',
      value: 0,
      deliverables: ''
    });
  };

  const updateMilestoneStatus = (milestoneId: string, newStatus: Milestone['status']) => {
    if (!selectedContract) return;

    const updatedContract = {
      ...selectedContract,
      milestones: selectedContract.milestones.map(milestone =>
        milestone.id === milestoneId 
          ? { 
              ...milestone, 
              status: newStatus,
              completedAt: newStatus === 'completed' ? new Date().toISOString() : milestone.completedAt
            } 
          : milestone
      )
    };

    setContracts(prev => prev.map(c => c.id === selectedContract.id ? updatedContract : c));
    setSelectedContract(updatedContract);
  };

  const calculateProgress = (contract: SmartContract) => {
    if (contract.milestones.length === 0) return 0;
    const completed = contract.milestones.filter(m => m.status === 'completed').length;
    return Math.round((completed / contract.milestones.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* إحصائيات العقود */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي العقود</p>
                <p className="text-2xl font-bold">{contracts.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">العقود النشطة</p>
                <p className="text-2xl font-bold text-green-600">
                  {contracts.filter(c => c.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">القيمة الإجمالية</p>
                <p className="text-2xl font-bold">
                  ${contracts.reduce((sum, c) => sum + c.value, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الأطراف المشاركة</p>
                <p className="text-2xl font-bold">
                  {contracts.reduce((sum, c) => sum + c.parties.length, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* قائمة العقود */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>العقود الذكية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedContract?.id === contract.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedContract(contract)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm">{contract.title}</h3>
                  <Badge className={getStatusColor(contract.status)}>
                    {contract.status === 'active' ? 'نشط' :
                     contract.status === 'completed' ? 'مكتمل' :
                     contract.status === 'draft' ? 'مسودة' :
                     contract.status === 'pending_approval' ? 'في انتظار الموافقة' :
                     contract.status === 'terminated' ? 'منتهي' : 'متنازع عليه'}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{contract.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>التقدم</span>
                    <span>{calculateProgress(contract)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${calculateProgress(contract)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      ${contract.value.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(contract.endDate).toLocaleDateString('ar')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* تفاصيل العقد */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedContract ? selectedContract.title : 'اختر عقداً'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContract ? (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="terms">البنود</TabsTrigger>
                  <TabsTrigger value="milestones">المراحل</TabsTrigger>
                  <TabsTrigger value="parties">الأطراف</TabsTrigger>
                  <TabsTrigger value="documents">المستندات</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>نوع العقد</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedContract.type === 'service' ? 'خدمات' :
                         selectedContract.type === 'purchase' ? 'شراء' :
                         selectedContract.type === 'partnership' ? 'شراكة' :
                         selectedContract.type === 'employment' ? 'توظيف' : 'ترخيص'}
                      </p>
                    </div>
                    <div>
                      <Label>الحالة</Label>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(selectedContract.status)}
                        <Badge className={getStatusColor(selectedContract.status)}>
                          {selectedContract.status === 'active' ? 'نشط' :
                           selectedContract.status === 'completed' ? 'مكتمل' :
                           selectedContract.status === 'draft' ? 'مسودة' :
                           selectedContract.status === 'pending_approval' ? 'في انتظار الموافقة' :
                           selectedContract.status === 'terminated' ? 'منتهي' : 'متنازع عليه'}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label>تاريخ البداية</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(selectedContract.startDate).toLocaleDateString('ar')}
                      </p>
                    </div>
                    <div>
                      <Label>تاريخ الانتهاء</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(selectedContract.endDate).toLocaleDateString('ar')}
                      </p>
                    </div>
                    <div>
                      <Label>القيمة</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        ${selectedContract.value.toLocaleString()} {selectedContract.currency}
                      </p>
                    </div>
                    <div>
                      <Label>التجديد التلقائي</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedContract.autoRenewal ? 'نعم' : 'لا'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <Label>الوصف</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedContract.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>التقدم العام</Label>
                      <span className="text-sm font-medium">{calculateProgress(selectedContract)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${calculateProgress(selectedContract)}%` }}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="terms" className="space-y-4">
                  {selectedContract.terms.map((term) => (
                    <Card key={term.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{term.title}</h4>
                            <p className="text-sm text-gray-600">{term.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={term.isNegotiable ? "default" : "secondary"}>
                              {term.isNegotiable ? 'قابل للتفاوض' : 'غير قابل للتفاوض'}
                            </Badge>
                            <Badge variant="outline">
                              {term.category === 'payment' ? 'دفع' :
                               term.category === 'delivery' ? 'تسليم' :
                               term.category === 'quality' ? 'جودة' :
                               term.category === 'liability' ? 'مسؤولية' :
                               term.category === 'confidentiality' ? 'سرية' : 'إنهاء'}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <Label className="text-xs">الشروط:</Label>
                            <ul className="text-xs text-gray-600 list-disc list-inside">
                              {term.conditions.map((condition, index) => (
                                <li key={index}>{condition}</li>
                              ))}
                            </ul>
                          </div>
                          {term.penalties.length > 0 && (
                            <div>
                              <Label className="text-xs">الغرامات:</Label>
                              <ul className="text-xs text-red-600 list-disc list-inside">
                                {term.penalties.map((penalty, index) => (
                                  <li key={index}>{penalty}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="milestones" className="space-y-4">
                  {/* إضافة مرحلة جديدة */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">إضافة مرحلة جديدة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="milestone-title">عنوان المرحلة</Label>
                          <Input
                            id="milestone-title"
                            value={newMilestone.title}
                            onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="أدخل عنوان المرحلة"
                          />
                        </div>
                        <div>
                          <Label htmlFor="milestone-value">القيمة</Label>
                          <Input
                            id="milestone-value"
                            type="number"
                            value={newMilestone.value}
                            onChange={(e) => setNewMilestone(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="milestone-description">الوصف</Label>
                        <Textarea
                          id="milestone-description"
                          value={newMilestone.description}
                          onChange={(e) => setNewMilestone(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="وصف المرحلة"
                        />
                      </div>
                      <div>
                        <Label htmlFor="milestone-due">تاريخ الاستحقاق</Label>
                        <Input
                          id="milestone-due"
                          type="date"
                          value={newMilestone.dueDate}
                          onChange={(e) => setNewMilestone(prev => ({ ...prev, dueDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="milestone-deliverables">المخرجات (مفصولة بفاصلة)</Label>
                        <Input
                          id="milestone-deliverables"
                          value={newMilestone.deliverables}
                          onChange={(e) => setNewMilestone(prev => ({ ...prev, deliverables: e.target.value }))}
                          placeholder="مثال: تقرير المرحلة, ملفات التصميم"
                        />
                      </div>
                      <Button onClick={handleAddMilestone} className="w-full">
                        إضافة المرحلة
                      </Button>
                    </CardContent>
                  </Card>

                  {/* قائمة المراحل */}
                  <div className="space-y-3">
                    {selectedContract.milestones.map((milestone) => (
                      <Card key={milestone.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              {getStatusIcon(milestone.status)}
                              <div>
                                <h4 className="font-medium">{milestone.title}</h4>
                                <p className="text-sm text-gray-600">{milestone.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(milestone.status)}>
                                {milestone.status === 'pending' ? 'في الانتظار' :
                                 milestone.status === 'in_progress' ? 'قيد التنفيذ' :
                                 milestone.status === 'completed' ? 'مكتمل' : 'متأخر'}
                              </Badge>
                              <Select
                                value={milestone.status}
                                onValueChange={(value: any) => updateMilestoneStatus(milestone.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">في الانتظار</SelectItem>
                                  <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                                  <SelectItem value="completed">مكتمل</SelectItem>
                                  <SelectItem value="overdue">متأخر</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                            <div>
                              <Label className="text-xs">تاريخ الاستحقاق:</Label>
                              <p>{new Date(milestone.dueDate).toLocaleDateString('ar')}</p>
                            </div>
                            <div>
                              <Label className="text-xs">القيمة:</Label>
                              <p>${milestone.value.toLocaleString()}</p>
                            </div>
                          </div>
                          {milestone.deliverables.length > 0 && (
                            <div className="mt-2">
                              <Label className="text-xs">المخرجات:</Label>
                              <ul className="text-xs text-gray-600 list-disc list-inside">
                                {milestone.deliverables.map((deliverable, index) => (
                                  <li key={index}>{deliverable}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {milestone.completedAt && (
                            <div className="mt-2 text-xs text-green-600">
                              تم الإنجاز في: {new Date(milestone.completedAt).toLocaleDateString('ar')}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="parties" className="space-y-4">
                  {selectedContract.parties.map((party) => (
                    <Card key={party.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{party.name}</h4>
                            <p className="text-sm text-gray-600">{party.organization}</p>
                            <p className="text-sm text-gray-500">{party.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {party.role === 'client' ? 'عميل' :
                               party.role === 'supplier' ? 'مورد' :
                               party.role === 'partner' ? 'شريك' : 'مقاول'}
                            </Badge>
                            {party.signedAt ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                موقع
                              </Badge>
                            ) : (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                <Clock className="w-3 h-3 mr-1" />
                                في انتظار التوقيع
                              </Badge>
                            )}
                          </div>
                        </div>
                        {party.signedAt && (
                          <div className="mt-2 text-xs text-gray-500">
                            تاريخ التوقيع: {new Date(party.signedAt).toLocaleDateString('ar')}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  {selectedContract.documents.map((document) => (
                    <Card key={document.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-blue-600" />
                            <div>
                              <h4 className="font-medium">{document.name}</h4>
                              <p className="text-sm text-gray-600">
                                {document.type} - الإصدار {document.version}
                              </p>
                              <p className="text-xs text-gray-500">
                                تم الرفع في: {new Date(document.uploadedAt).toLocaleDateString('ar')}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            تحميل
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-8 text-gray-500">
                اختر عقداً من القائمة الجانبية لعرض التفاصيل
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartContractManagement;
