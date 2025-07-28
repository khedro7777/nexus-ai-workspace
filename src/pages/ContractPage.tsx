// صفحة العقد - عرض وإدارة العقود التعاونية مع إمكانية التوقيع والتوثيق
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  Download, 
  Edit, 
  Check, 
  X, 
  Clock, 
  Shield,
  Users,
  DollarSign,
  Calendar,
  AlertTriangle,
  MessageSquare,
  Share
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const ContractPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [proposedChanges, setProposedChanges] = useState('');
  const { id } = useParams();

  // بيانات العقد الوهمية - يجب استبدالها ببيانات حقيقية من قاعدة البيانات
  const contractData = {
    id: id,
    title: 'عقد شراء تعاوني لأجهزة طبية',
    status: 'draft', // draft, under_review, ready_to_sign, signed, executed
    groupName: 'مجموعة استيراد أجهزة طبية',
    totalValue: 150000,
    currency: 'USD',
    createdAt: new Date(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    clauses: [
      {
        id: 1,
        title: 'بنود المنتج والخدمة',
        content: 'يتضمن هذا العقد شراء أجهزة طبية متطورة وفقاً للمواصفات المحددة في المرفقات.',
        status: 'approved'
      },
      {
        id: 2,
        title: 'الشروط المالية',
        content: 'إجمالي قيمة العقد 150,000 دولار أمريكي، يتم الدفع على ثلاث دفعات.',
        status: 'under_review'
      },
      {
        id: 3,
        title: 'مواعيد التسليم',
        content: 'يتم التسليم خلال 60 يوم عمل من تاريخ توقيع العقد.',
        status: 'approved'
      },
      {
        id: 4,
        title: 'الضمانات والصيانة',
        content: 'ضمان لمدة سنتين مع خدمة صيانة مجانية للسنة الأولى.',
        status: 'pending'
      }
    ],
    signatures: [
      { name: 'أحمد محمد', role: 'ممثل المجموعة', signed: true, date: new Date() },
      { name: 'شركة الأجهزة الطبية', role: 'المورد', signed: false, date: null },
      { name: 'المحامي المستقل', role: 'مستشار قانوني', signed: false, date: null }
    ],
    documents: [
      { name: 'المواصفات التقنية', type: 'PDF', size: '2.5 MB' },
      { name: 'شهادات الجودة', type: 'PDF', size: '1.8 MB' },
      { name: 'نموذج الضمان', type: 'DOC', size: '0.5 MB' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContractStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'bg-green-100 text-green-800';
      case 'ready_to_sign': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'مسودة';
      case 'under_review': return 'قيد المراجعة';
      case 'ready_to_sign': return 'جاهز للتوقيع';
      case 'signed': return 'موقع';
      case 'executed': return 'منفذ';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* رأس العقد */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{contractData.title}</CardTitle>
                <p className="text-gray-600">المجموعة: {contractData.groupName}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={getContractStatusColor(contractData.status)}>
                  {getStatusText(contractData.status)}
                </Badge>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 ml-2" />
                    تحميل PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 ml-2" />
                    اقتراح تعديل
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="text-sm">القيمة: ${contractData.totalValue.toLocaleString()} {contractData.currency}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">الموعد النهائي: {contractData.deadline.toLocaleDateString('ar')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm">الأطراف: {contractData.signatures.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-500" />
                <span className="text-sm">محمي بـ IPFS</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="clauses" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="clauses">بنود العقد</TabsTrigger>
                <TabsTrigger value="history">تاريخ التعديلات</TabsTrigger>
                <TabsTrigger value="documents">المرفقات</TabsTrigger>
              </TabsList>

              {/* تبويب بنود العقد */}
              <TabsContent value="clauses" className="space-y-6">
                <div className="space-y-4">
                  {contractData.clauses.map((clause) => (
                    <Card key={clause.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{clause.title}</CardTitle>
                          <Badge className={getStatusColor(clause.status)}>
                            {clause.status === 'approved' ? 'معتمد' : 
                             clause.status === 'under_review' ? 'قيد المراجعة' : 'معلق'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{clause.content}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3 ml-1" />
                            تعديل
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-3 h-3 ml-1" />
                            تعليق
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* اقتراح تعديلات */}
                {editMode && (
                  <Card>
                    <CardHeader>
                      <CardTitle>اقتراح تعديل</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        placeholder="اكتب اقتراحك للتعديل..."
                        value={proposedChanges}
                        onChange={(e) => setProposedChanges(e.target.value)}
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <Button onClick={() => setEditMode(false)}>
                          <Check className="w-4 h-4 ml-2" />
                          إرسال الاقتراح
                        </Button>
                        <Button variant="outline" onClick={() => setEditMode(false)}>
                          <X className="w-4 h-4 ml-2" />
                          إلغاء
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* تبويب تاريخ التعديلات */}
              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>سجل التغييرات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 border-r-2 border-blue-200">
                        <Clock className="w-4 h-4 text-blue-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium">تم إنشاء العقد</p>
                          <p className="text-xs text-gray-500">بواسطة أحمد محمد - منذ 3 أيام</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 border-r-2 border-yellow-200">
                        <Edit className="w-4 h-4 text-yellow-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium">تعديل في البنود المالية</p>
                          <p className="text-xs text-gray-500">بواسطة المحامي المستقل - منذ يومين</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 border-r-2 border-green-200">
                        <Check className="w-4 h-4 text-green-500 mt-1" />
                        <div>
                          <p className="text-sm font-medium">موافقة على بنود المنتج</p>
                          <p className="text-xs text-gray-500">بواسطة ممثل المجموعة - منذ يوم</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* تبويب المرفقات */}
              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>الوثائق المرفقة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {contractData.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-gray-500">{doc.type} - {doc.size}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* الشريط الجانبي */}
          <div className="space-y-6">
            {/* حالة التوقيعات */}
            <Card>
              <CardHeader>
                <CardTitle>حالة التوقيعات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contractData.signatures.map((signature, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{signature.name}</p>
                      <p className="text-sm text-gray-500">{signature.role}</p>
                    </div>
                    <div className="text-right">
                      {signature.signed ? (
                        <div>
                          <Badge className="bg-green-100 text-green-800">موقع</Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {signature.date?.toLocaleDateString('ar')}
                          </p>
                        </div>
                      ) : (
                        <Badge variant="outline">في الانتظار</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* إجراءات سريعة */}
            <Card>
              <CardHeader>
                <CardTitle>الإجراءات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" disabled={contractData.status !== 'ready_to_sign'}>
                  <Check className="w-4 h-4 ml-2" />
                  توقيع العقد
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setEditMode(true)}>
                  <Edit className="w-4 h-4 ml-2" />
                  اقتراح تعديل
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير PDF
                </Button>
                <Button variant="outline" className="w-full">
                  <Share className="w-4 h-4 ml-2" />
                  مشاركة العقد
                </Button>
              </CardContent>
            </Card>

            {/* تنبيهات */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  تنبيهات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-2 bg-amber-50 border border-amber-200 rounded text-sm">
                    <p className="text-amber-800">بانتظار توقيع المورد على البنود المالية</p>
                  </div>
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                    <p className="text-blue-800">يُنصح بمراجعة الاستشاري القانوني قبل التوقيع النهائي</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractPage;