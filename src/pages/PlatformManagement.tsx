
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PlatformLogicManager from '@/components/platform/PlatformLogicManager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Users, 
  FileText, 
  Vote, 
  Building2, 
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

const PlatformManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const systemStatus = {
    groups: { total: 47, active: 23, pending: 15, issues: 9 },
    users: { total: 156, active: 134, verified: 89, pending: 22 },
    workflows: { total: 12, working: 8, broken: 4, optimized: 6 },
    buttons: { total: 234, linked: 198, unlinked: 36, inactive: 12 }
  };

  const StatusCard = ({ 
    title, 
    icon: Icon, 
    stats, 
    color = 'blue' 
  }: { 
    title: string; 
    icon: any; 
    stats: any; 
    color?: string;
  }) => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className={`w-5 h-5 text-${color}-600`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600 capitalize">
                {key === 'total' ? 'الإجمالي' : 
                 key === 'active' ? 'نشط' :
                 key === 'pending' ? 'معلق' :
                 key === 'issues' ? 'مشاكل' :
                 key === 'verified' ? 'موثق' :
                 key === 'working' ? 'يعمل' :
                 key === 'broken' ? 'معطل' :
                 key === 'optimized' ? 'محسن' :
                 key === 'linked' ? 'مربوط' :
                 key === 'unlinked' ? 'غير مربوط' :
                 key === 'inactive' ? 'غير نشط' : key}:
              </span>
              <Badge 
                variant={
                  key === 'issues' || key === 'broken' || key === 'unlinked' || key === 'inactive' ? 'destructive' :
                  key === 'pending' ? 'secondary' : 'default'
                }
              >
                {value}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة منطق المنصة</h1>
          <p className="text-gray-600">
            مراجعة وضبط منطق التشغيل وسير العمل في جميع أنحاء المنصة
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="logic">منطق التشغيل</TabsTrigger>
            <TabsTrigger value="workflows">سير العمل</TabsTrigger>
            <TabsTrigger value="maintenance">الصيانة</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatusCard
                title="المجموعات"
                icon={Users}
                stats={systemStatus.groups}
                color="blue"
              />
              <StatusCard
                title="المستخدمون"
                icon={Building2}
                stats={systemStatus.users}
                color="green"
              />
              <StatusCard
                title="سير العمل"
                icon={Activity}
                stats={systemStatus.workflows}
                color="purple"
              />
              <StatusCard
                title="عناصر الواجهة"
                icon={Settings}
                stats={systemStatus.buttons}
                color="orange"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>حالة النظام العامة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium">الخدمات الأساسية</span>
                    </div>
                    <Badge className="bg-green-500 text-white">تعمل بشكل طبيعي</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium">منطق المجموعات</span>
                    </div>
                    <Badge className="bg-yellow-500 text-white">يحتاج مراجعة</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">التحديثات المعلقة</span>
                    </div>
                    <Badge className="bg-blue-500 text-white">15 عنصر</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logic" className="space-y-6">
            <PlatformLogicManager />
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة سير العمل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">مسارات العمل النشطة</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>إنشاء المجموعات</span>
                        <Badge className="bg-green-500 text-white">يعمل</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>انتخاب المديرين</span>
                        <Badge className="bg-green-500 text-white">يعمل</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>مرحلة التفاوض</span>
                        <Badge className="bg-yellow-500 text-white">جزئي</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded">
                        <span>التوقيع على العقود</span>
                        <Badge className="bg-red-500 text-white">معطل</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">إجراءات سريعة</h3>
                    <div className="space-y-2">
                      <Button className="w-full justify-start">
                        إعادة تفعيل مسار التعاقد
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        تحديث منطق الانتخابات
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        إصلاح مسار التحكيم
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        تحسين سير العمل العام
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>صيانة النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">أدوات التنظيف</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start">
                        تنظيف البيانات المعلقة
                      </Button>
                      <Button variant="outline" className="justify-start">
                        إزالة الجلسات المنتهية
                      </Button>
                      <Button variant="outline" className="justify-start">
                        تحديث فهارس البحث
                      </Button>
                      <Button variant="outline" className="justify-start">
                        إعادة تعيين الإحصائيات
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">إجراءات الطوارئ</h3>
                    <div className="space-y-2">
                      <Button variant="destructive" className="w-full justify-start">
                        إيقاف جميع العمليات النشطة
                      </Button>
                      <Button variant="destructive" className="w-full justify-start">
                        إعادة تشغيل منطق المجموعات
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlatformManagement;
