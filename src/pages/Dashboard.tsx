
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import BusinessLogic from '@/components/business/BusinessLogic';
import SmartRecommendations from '@/components/smart/SmartRecommendations';
import WorkflowEngine from '@/components/workflow/WorkflowEngine';
import { workflowTemplates } from '@/components/workflow/WorkflowTemplates';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity,
  Lightbulb,
  Workflow,
  Play
} from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);

  const startWorkflow = (templateId: string) => {
    setActiveWorkflow(templateId);
  };

  const closeWorkflow = () => {
    setActiveWorkflow(null);
  };

  if (activeWorkflow) {
    const template = workflowTemplates.find(t => t.id === activeWorkflow);
    if (template) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <Button variant="outline" onClick={closeWorkflow}>
                ← العودة للوحة التحكم
              </Button>
            </div>
            
            <WorkflowEngine 
              template={template}
              onWorkflowComplete={closeWorkflow}
              onWorkflowCancel={closeWorkflow}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم الذكية</h1>
          <p className="text-gray-600">نظرة شاملة على أداء مجموعاتك ومشاريعك</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              منطق الأعمال
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              التوصيات الذكية
            </TabsTrigger>
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              سير العمل
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">المجموعات النشطة</p>
                      <p className="text-3xl font-bold text-blue-600">12</p>
                      <p className="text-xs text-green-600 mt-1">+3 هذا الشهر</p>
                    </div>
                    <Users className="w-12 h-12 text-blue-500 opacity-20" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">إجمالي التوفير</p>
                      <p className="text-3xl font-bold text-green-600">₪84,250</p>
                      <p className="text-xs text-green-600 mt-1">+15% من الشهر الماضي</p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">المفاوضات الجارية</p>
                      <p className="text-3xl font-bold text-orange-600">8</p>
                      <p className="text-xs text-orange-600 mt-1">5 تحتاج متابعة</p>
                    </div>
                    <Activity className="w-12 h-12 text-orange-500 opacity-20" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">معدل النجاح</p>
                      <p className="text-3xl font-bold text-purple-600">92%</p>
                      <p className="text-xs text-green-600 mt-1">+2% تحسن</p>
                    </div>
                    <BarChart3 className="w-12 h-12 text-purple-500 opacity-20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>الإجراءات السريعة</CardTitle>
                <CardDescription>ابدأ المهام الشائعة بسرعة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="h-20 flex flex-col items-center justify-center gap-2"
                    onClick={() => startWorkflow('group-creation')}
                  >
                    <Users className="w-6 h-6" />
                    إنشاء مجموعة جديدة
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center gap-2"
                    onClick={() => startWorkflow('supplier-negotiation')}
                  >
                    <Activity className="w-6 h-6" />
                    بدء مفاوضة
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center gap-2"
                    onClick={() => startWorkflow('contract-execution')}
                  >
                    <BarChart3 className="w-6 h-6" />
                    تنفيذ عقد
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business">
            <BusinessLogic />
          </TabsContent>

          <TabsContent value="recommendations">
            <SmartRecommendations />
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflowTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">الوقت المقدر:</span>
                        <span className="font-semibold">{template.estimatedTime} دقيقة</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">عدد الخطوات:</span>
                        <span className="font-semibold">{template.steps.length} خطوة</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">التعقيد:</span>
                        <Badge 
                          variant={template.complexity === 'simple' ? 'default' : 
                                  template.complexity === 'medium' ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {template.complexity === 'simple' ? 'بسيط' :
                           template.complexity === 'medium' ? 'متوسط' : 'معقد'}
                        </Badge>
                      </div>
                      <Button 
                        className="w-full mt-4 flex items-center gap-2"
                        onClick={() => startWorkflow(template.id)}
                      >
                        <Play className="w-4 h-4" />
                        بدء سير العمل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
