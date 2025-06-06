
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  BarChart3,
  Workflow,
  Bot,
  Timer,
  Repeat,
  Users,
  ShoppingCart,
  MessageSquare,
  FileText,
  Building2
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AutomationWorkflowCard from '@/components/automation/AutomationWorkflowCard';
import CreateAutomationModal from '@/components/automation/CreateAutomationModal';
import AutomationStats from '@/components/automation/AutomationStats';

const Automation = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);

  const automationWorkflows = [
    {
      id: '1',
      name: 'تجميع طلبات الشراء التلقائي',
      description: 'تجميع الطلبات المتشابهة تلقائياً عند وصولها لحد أدنى من المشاركين',
      category: 'group_buying',
      status: 'active' as const,
      trigger: 'عدد المشاركين >= 10',
      action: 'إنشاء مجموعة شراء تلقائياً',
      lastRun: '2024-01-15 14:30',
      successRate: 95,
      executionCount: 45,
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'إشعارات المفاوضات الذكية',
      description: 'إرسال تنبيهات للموردين عند انتهاء مهلة الردود في المفاوضات',
      category: 'negotiations',
      status: 'active' as const,
      trigger: 'انتهاء مهلة الرد - 24 ساعة',
      action: 'إرسال تذكير + تمديد تلقائي',
      lastRun: '2024-01-15 10:15',
      successRate: 88,
      executionCount: 23,
      icon: MessageSquare,
      color: 'bg-green-500'
    },
    {
      id: '3',
      name: 'تقييم الموردين التلقائي',
      description: 'تقييم أداء الموردين بناءً على معايير الجودة والتسليم',
      category: 'suppliers',
      status: 'paused' as const,
      trigger: 'إكمال طلبية + 7 أيام',
      action: 'حساب التقييم + تحديث الملف',
      lastRun: '2024-01-10 16:45',
      successRate: 92,
      executionCount: 67,
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      id: '4',
      name: 'إنشاء التقارير الدورية',
      description: 'توليد تقارير شهرية عن أداء المجموعات والمفاوضات',
      category: 'analytics',
      status: 'active' as const,
      trigger: 'بداية كل شهر',
      action: 'توليد التقرير + إرسال بالبريد',
      lastRun: '2024-01-01 09:00',
      successRate: 100,
      executionCount: 12,
      icon: BarChart3,
      color: 'bg-orange-500'
    },
    {
      id: '5',
      name: 'إدارة العقود الذكية',
      description: 'متابعة تواريخ انتهاء العقود وإرسال تنبيهات التجديد',
      category: 'contracts',
      status: 'active' as const,
      trigger: 'انتهاء العقد - 30 يوم',
      action: 'تنبيه + اقتراح تجديد',
      lastRun: '2024-01-14 08:20',
      successRate: 96,
      executionCount: 34,
      icon: FileText,
      color: 'bg-indigo-500'
    },
    {
      id: '6',
      name: 'تحسين المجموعات',
      description: 'اقتراح دمج المجموعات المتشابهة لتحسين القوة التفاوضية',
      category: 'optimization',
      status: 'testing' as const,
      trigger: 'مجموعات متشابهة >= 3',
      action: 'اقتراح دمج + إشعار المشرفين',
      lastRun: '2024-01-13 12:00',
      successRate: 78,
      executionCount: 8,
      icon: Target,
      color: 'bg-teal-500'
    }
  ];

  const stats = [
    {
      title: 'سير العمل النشط',
      value: '5',
      change: '+2',
      icon: Workflow,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'المهام المنجزة اليوم',
      value: '23',
      change: '+12%',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'الوقت المُوفر (ساعات)',
      value: '156',
      change: '+45%',
      icon: Timer,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'معدل النجاح',
      value: '94%',
      change: '+3%',
      icon: Target,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const workflowTemplates = [
    {
      name: 'أتمتة الشراء الجماعي',
      description: 'تجميع طلبات الشراء المتشابهة تلقائياً',
      category: 'group_buying',
      estimatedSavings: '25%'
    },
    {
      name: 'إدارة المفاوضات الذكية',
      description: 'أتمتة عملية المفاوضات مع الموردين',
      category: 'negotiations',
      estimatedSavings: '40%'
    },
    {
      name: 'مراقبة جودة الموردين',
      description: 'تقييم وتصنيف الموردين تلقائياً',
      category: 'quality',
      estimatedSavings: '30%'
    },
    {
      name: 'التقارير التلقائية',
      description: 'إنشاء التقارير الدورية تلقائياً',
      category: 'reporting',
      estimatedSavings: '60%'
    }
  ];

  const handleToggleWorkflow = (id: string, currentStatus: string) => {
    console.log(`Toggling workflow ${id} from ${currentStatus}`);
    // هنا يتم تنفيذ منطق التشغيل/الإيقاف الفعلي
  };

  const handleEditWorkflow = (id: string) => {
    setSelectedWorkflow(id);
    console.log(`Editing workflow ${id}`);
    // هنا يتم فتح نموذج التحرير
  };

  const handleDeleteWorkflow = (id: string) => {
    console.log(`Deleting workflow ${id}`);
    // هنا يتم تنفيذ منطق الحذف الفعلي
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 p-6 pb-32 overflow-y-auto max-h-screen">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-yellow-500" />
                  الأتمتة الذكية
                </h1>
                <p className="text-gray-600">
                  أتمتة العمليات والمهام المتكررة لتحسين الكفاءة وتوفير الوقت
                </p>
              </div>
              <Button 
                onClick={() => setCreateModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500"
              >
                <Plus className="w-4 h-4" />
                إنشاء أتمتة جديدة
              </Button>
            </div>

            {/* Stats */}
            <AutomationStats stats={stats} />

            <Tabs defaultValue="workflows" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="workflows">سير العمل</TabsTrigger>
                <TabsTrigger value="templates">النماذج</TabsTrigger>
                <TabsTrigger value="logs">السجلات</TabsTrigger>
                <TabsTrigger value="settings">الإعدادات</TabsTrigger>
              </TabsList>

              <TabsContent value="workflows" className="space-y-6">
                <div className="grid gap-6">
                  {automationWorkflows.map((workflow) => (
                    <AutomationWorkflowCard
                      key={workflow.id}
                      workflow={workflow}
                      onToggle={handleToggleWorkflow}
                      onEdit={handleEditWorkflow}
                      onDelete={handleDeleteWorkflow}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {workflowTemplates.map((template, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader className="pb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="secondary">{template.category}</Badge>
                          <span className="text-sm font-medium text-green-600">
                            توفير {template.estimatedSavings}
                          </span>
                        </div>
                        <Button className="w-full" variant="outline">
                          استخدام النموذج
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="logs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      سجل العمليات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          time: '14:30',
                          action: 'تم تجميع 12 طلب شراء في مجموعة جديدة',
                          status: 'success',
                          workflow: 'تجميع طلبات الشراء التلقائي'
                        },
                        {
                          time: '13:15',
                          action: 'إرسال تنبيه للمورد - انتهاء مهلة الرد',
                          status: 'success',
                          workflow: 'إشعارات المفاوضات الذكية'
                        },
                        {
                          time: '12:00',
                          action: 'فشل في إرسال التقرير الشهري',
                          status: 'error',
                          workflow: 'إنشاء التقارير الدورية'
                        },
                        {
                          time: '10:45',
                          action: 'تم تحديث تقييم مورد التقنية المتطورة',
                          status: 'success',
                          workflow: 'تقييم الموردين التلقائي'
                        }
                      ].map((log, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              log.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                            <div>
                              <p className="text-sm font-medium">{log.action}</p>
                              <p className="text-xs text-gray-500">{log.workflow}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{log.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      إعدادات الأتمتة العامة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">إعدادات التشغيل</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>تشغيل الأتمتة التلقائية</span>
                            <Button variant="outline" size="sm">تفعيل</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>الإشعارات الفورية</span>
                            <Button variant="outline" size="sm">تفعيل</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>حفظ السجلات المفصلة</span>
                            <Button variant="outline" size="sm">تفعيل</Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">إعدادات الأمان</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>التحقق قبل الحذف</span>
                            <Button variant="outline" size="sm">تفعيل</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>حد أقصى للعمليات/ساعة</span>
                            <Button variant="outline" size="sm">100</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>نسخ احتياطي تلقائي</span>
                            <Button variant="outline" size="sm">يومي</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Create Automation Modal */}
      <CreateAutomationModal 
        open={createModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
      />
    </div>
  );
};

export default Automation;
