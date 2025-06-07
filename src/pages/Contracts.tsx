
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Plus, 
  Edit, 
  Eye, 
  Download,
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useContractsData } from '@/hooks/useContractsData';
import { useToast } from '@/hooks/use-toast';

const Contracts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { contracts, loading, updateContractStatus, updateProgress } = useContractsData();
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مسودة': return 'bg-gray-500';
      case 'قيد المراجعة': return 'bg-yellow-500';
      case 'موقع': return 'bg-green-500';
      case 'منتهي': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'شراء': return 'text-blue-600 bg-blue-100';
      case 'بيع': return 'text-green-600 bg-green-100';
      case 'خدمات': return 'text-purple-600 bg-purple-100';
      case 'شراكة': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStatusUpdate = (contractId: string, newStatus: any) => {
    updateContractStatus(contractId, newStatus);
    toast({
      title: "تم التحديث",
      description: `تم تحديث حالة العقد إلى: ${newStatus}`
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>جاري تحميل العقود...</p>
        </div>
      </div>
    );
  }

  const draftContracts = contracts.filter(c => c.status === 'مسودة').length;
  const activeContracts = contracts.filter(c => c.status === 'موقع').length;
  const totalValue = contracts.reduce((sum, contract) => sum + contract.value, 0);
  const avgProgress = Math.round(contracts.reduce((sum, contract) => sum + contract.progress, 0) / contracts.length);

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
                <FileText className="w-8 h-8" />
                إدارة العقود
              </h1>
              <p className="text-gray-600">
                إدارة شاملة لجميع العقود والاتفاقيات
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">المسودات</p>
                      <p className="text-2xl font-bold text-gray-900">{draftContracts}</p>
                    </div>
                    <Edit className="w-8 h-8 text-gray-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">العقود النشطة</p>
                      <p className="text-2xl font-bold text-gray-900">{activeContracts}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">القيمة الإجمالية</p>
                      <p className="text-2xl font-bold text-gray-900">{totalValue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">ريال سعودي</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">متوسط التقدم</p>
                      <p className="text-2xl font-bold text-gray-900">{avgProgress}%</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">جميع العقود</TabsTrigger>
                <TabsTrigger value="draft">المسودات</TabsTrigger>
                <TabsTrigger value="active">النشطة</TabsTrigger>
                <TabsTrigger value="templates">القوالب</TabsTrigger>
                <TabsTrigger value="reports">التقارير</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">جميع العقود</h2>
                  <Button>
                    <Plus className="w-4 h-4 ml-2" />
                    عقد جديد
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {contracts.map((contract, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">{contract.title}</h3>
                              <Badge className={`text-white ${getStatusColor(contract.status)}`}>
                                {contract.status}
                              </Badge>
                              <Badge className={getTypeColor(contract.type)}>
                                {contract.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">رقم العقد: {contract.id}</p>
                            <div className="space-y-1 text-sm text-gray-600">
                              <p><strong>الأطراف:</strong> {contract.parties.join(' - ')}</p>
                              <p><strong>القيمة:</strong> {contract.value.toLocaleString()} ريال سعودي</p>
                              <p><strong>بداية العقد:</strong> {contract.startDate}</p>
                              <p><strong>نهاية العقد:</strong> {contract.endDate}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 ml-1" />
                              عرض
                            </Button>
                            <Button size="sm">
                              <Edit className="w-4 h-4 ml-1" />
                              تحرير
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 ml-1" />
                              تحميل
                            </Button>
                          </div>
                        </div>
                        
                        {/* شريط التقدم */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>تقدم العقد</span>
                            <span>{contract.progress}%</span>
                          </div>
                          <Progress value={contract.progress} className="h-2" />
                        </div>

                        {/* أزرار الإجراءات */}
                        <div className="flex gap-2 pt-3 border-t">
                          {contract.status === 'مسودة' && (
                            <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(contract.id, 'قيد المراجعة')}>
                              إرسال للمراجعة
                            </Button>
                          )}
                          {contract.status === 'قيد المراجعة' && (
                            <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(contract.id, 'موقع')}>
                              اعتماد العقد
                            </Button>
                          )}
                          {contract.status === 'موقع' && contract.progress < 100 && (
                            <Button size="sm" variant="secondary" onClick={() => updateProgress(contract.id, Math.min(contract.progress + 10, 100))}>
                              تحديث التقدم
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="draft" className="space-y-4">
                <h2 className="text-xl font-semibold">العقود المسودة</h2>
                <div className="grid gap-4">
                  {contracts.filter(c => c.status === 'مسودة').map((contract, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{contract.title}</h3>
                            <p className="text-sm text-gray-600">آخر تحديث: {contract.startDate}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">متابعة التحرير</Button>
                            <Button size="sm">إرسال للمراجعة</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="active" className="space-y-4">
                <h2 className="text-xl font-semibold">العقود النشطة</h2>
                <div className="grid gap-4">
                  {contracts.filter(c => c.status === 'موقع').map((contract, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h3 className="font-semibold">{contract.title}</h3>
                            <p className="text-sm text-gray-600">التقدم: {contract.progress}%</p>
                          </div>
                          <Badge className="bg-green-500 text-white">نشط</Badge>
                        </div>
                        <Progress value={contract.progress} className="mb-3" />
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">عرض التفاصيل</Button>
                          <Button size="sm">تحديث التقدم</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>قوالب العقود</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['عقد خدمات', 'عقد توريد', 'عقد شراكة', 'عقد استشارات'].map((template, index) => (
                        <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="text-center">
                            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <h4 className="font-semibold mb-2">{template}</h4>
                            <Button size="sm" className="w-full">استخدام القالب</Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>تقارير العقود</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">إجمالي العقود</h4>
                        <p className="text-3xl font-bold text-blue-600">{contracts.length}</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">القيمة الإجمالية</h4>
                        <p className="text-3xl font-bold text-green-600">{totalValue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">ريال</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">متوسط المدة</h4>
                        <p className="text-3xl font-bold text-purple-600">8</p>
                        <p className="text-sm text-gray-600">أشهر</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contracts;
