
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gavel, 
  Scale, 
  FileText, 
  MessageSquare, 
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Calendar,
  Shield,
  Plus,
  Eye,
  Edit
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useArbitrationData } from '@/hooks/useArbitrationData';
import CreateCaseModal from '@/components/arbitration/CreateCaseModal';
import { useToast } from '@/hooks/use-toast';

const ArbitrationHub = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { cases, arbitrators, loading, createNewCase, updateCaseStatus, assignArbitrator } = useArbitrationData();
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جاري': return 'bg-blue-500';
      case 'معلق': return 'bg-yellow-500';
      case 'مكتمل': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالي': return 'text-red-600 bg-red-100';
      case 'متوسط': return 'text-yellow-600 bg-yellow-100';
      case 'منخفض': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStatusChange = (caseId: string, newStatus: any) => {
    updateCaseStatus(caseId, newStatus);
    toast({
      title: "تم التحديث",
      description: `تم تحديث حالة القضية إلى: ${newStatus}`
    });
  };

  const handleAssignArbitrator = (caseId: string, arbitratorName: string) => {
    assignArbitrator(caseId, arbitratorName);
    toast({
      title: "تم التعيين",
      description: `تم تعيين المحكم: ${arbitratorName}`
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  const activeCases = cases.filter(c => c.status === 'جاري').length;
  const completedCases = cases.filter(c => c.status === 'مكتمل').length;
  const availableArbitrators = arbitrators.filter(a => a.status === 'متاح').length;
  const successRate = completedCases > 0 ? Math.round((completedCases / cases.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Gavel className="w-8 h-8" />
                بوابة التحكيم والوساطة
              </h1>
              <p className="text-gray-600">
                حل النزاعات التجارية والوساطة المهنية
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">القضايا النشطة</p>
                      <p className="text-2xl font-bold text-gray-900">{activeCases}</p>
                    </div>
                    <Scale className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">القضايا المكتملة</p>
                      <p className="text-2xl font-bold text-gray-900">{completedCases}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">المحكمين المتاحين</p>
                      <p className="text-2xl font-bold text-gray-900">{availableArbitrators}</p>
                    </div>
                    <User className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">معدل النجاح</p>
                      <p className="text-2xl font-bold text-gray-900">{successRate}%</p>
                    </div>
                    <Shield className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="cases" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="cases">القضايا</TabsTrigger>
                <TabsTrigger value="arbitrators">المحكمين</TabsTrigger>
                <TabsTrigger value="new-case">قضية جديدة</TabsTrigger>
                <TabsTrigger value="reports">التقارير</TabsTrigger>
              </TabsList>

              <TabsContent value="cases" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">جميع القضايا</h2>
                  <Button onClick={() => setCreateModalOpen(true)}>
                    <Plus className="w-4 h-4 ml-2" />
                    قضية جديدة
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {cases.map((case_item, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">{case_item.title}</h3>
                              <Badge className={`text-white ${getStatusColor(case_item.status)}`}>
                                {case_item.status}
                              </Badge>
                              <Badge className={getPriorityColor(case_item.priority)}>
                                {case_item.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">رقم القضية: {case_item.id}</p>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p><strong>الأطراف:</strong> {case_item.parties.join(' ضد ')}</p>
                              <p><strong>المحكم:</strong> {case_item.assignedTo || 'لم يتم التعيين'}</p>
                              <p><strong>تاريخ الإنشاء:</strong> {case_item.createdAt}</p>
                              <p><strong>الموعد النهائي:</strong> {case_item.deadline}</p>
                              {case_item.amount && <p><strong>قيمة النزاع:</strong> {case_item.amount.toLocaleString()} ريال</p>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 ml-1" />
                              عرض
                            </Button>
                            <Button size="sm">
                              <Edit className="w-4 h-4 ml-1" />
                              إدارة
                            </Button>
                          </div>
                        </div>
                        
                        {/* أزرار الإجراءات */}
                        <div className="flex gap-2 pt-3 border-t">
                          {case_item.status === 'معلق' && (
                            <Button size="sm" variant="outline" onClick={() => handleStatusChange(case_item.id, 'جاري')}>
                              بدء المراجعة
                            </Button>
                          )}
                          {case_item.status === 'جاري' && (
                            <Button size="sm" variant="outline" onClick={() => handleStatusChange(case_item.id, 'مكتمل')}>
                              إكمال القضية
                            </Button>
                          )}
                          {!case_item.assignedTo && (
                            <Button size="sm" variant="secondary" onClick={() => handleAssignArbitrator(case_item.id, arbitrators[0]?.name || '')}>
                              تعيين محكم
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="arbitrators" className="space-y-4">
                <h2 className="text-xl font-semibold">المحكمين المعتمدين</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {arbitrators.map((arbitrator, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                            {arbitrator.name.split(' ')[1]?.charAt(0) || 'M'}
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{arbitrator.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{arbitrator.specialty}</p>
                          <Badge className={arbitrator.status === 'متاح' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                            {arbitrator.status}
                          </Badge>
                          <div className="space-y-1 text-sm text-gray-600 mb-4 mt-3">
                            <p>الخبرة: {arbitrator.experience}</p>
                            <p>القضايا: {arbitrator.cases}</p>
                            <p>التقييم: {arbitrator.rating}/5</p>
                          </div>
                          <Button className="w-full" variant="outline">
                            عرض الملف الشخصي
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="new-case" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      إنشاء قضية تحكيم جديدة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Gavel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">ابدأ قضية تحكيم جديدة</h3>
                      <p className="text-gray-600 mb-6">املأ النموذج لإنشاء قضية تحكيم جديدة</p>
                      <Button onClick={() => setCreateModalOpen(true)} size="lg">
                        <Plus className="w-5 h-5 ml-2" />
                        إنشاء قضية جديدة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      تقارير التحكيم
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">معدل الحل</h4>
                        <p className="text-3xl font-bold text-green-600">{successRate}%</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">متوسط الوقت</h4>
                        <p className="text-3xl font-bold text-blue-600">15</p>
                        <p className="text-sm text-gray-600">يوم</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">رضا العملاء</h4>
                        <p className="text-3xl font-bold text-purple-600">4.8</p>
                        <p className="text-sm text-gray-600">من 5</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <CreateCaseModal 
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onCreateCase={createNewCase}
      />
    </div>
  );
};

export default ArbitrationHub;
