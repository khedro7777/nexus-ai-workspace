
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
  Shield
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const ArbitrationHub = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const arbitrationCases = [
    {
      id: 'ARB-001',
      title: 'نزاع حول جودة المنتج',
      parties: ['شركة الأحمد التجارية', 'مؤسسة البناء الحديث'],
      status: 'جاري',
      priority: 'عالي',
      assignedTo: 'المحكم أحمد سالم',
      createdAt: '2024-01-15',
      deadline: '2024-02-15'
    },
    {
      id: 'ARB-002',
      title: 'خلاف في شروط التسليم',
      parties: ['مصنع الكيماويات', 'شركة النقل السريع'],
      status: 'معلق',
      priority: 'متوسط',
      assignedTo: 'المحكمة فاطمة النور',
      createdAt: '2024-01-10',
      deadline: '2024-02-10'
    },
    {
      id: 'ARB-003',
      title: 'نزاع مالي',
      parties: ['البنك التجاري', 'شركة الاستثمار'],
      status: 'مكتمل',
      priority: 'عالي',
      assignedTo: 'المحكم محمد عبدالله',
      createdAt: '2024-01-05',
      deadline: '2024-01-20'
    }
  ];

  const arbitrators = [
    {
      name: 'المحكم أحمد سالم',
      specialty: 'القانون التجاري',
      experience: '15 سنة',
      cases: 45,
      rating: 4.9
    },
    {
      name: 'المحكمة فاطمة النور',
      specialty: 'قانون العقود',
      experience: '12 سنة',
      cases: 38,
      rating: 4.8
    },
    {
      name: 'المحكم محمد عبدالله',
      specialty: 'القانون المصرفي',
      experience: '20 سنة',
      cases: 67,
      rating: 4.9
    }
  ];

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
                      <p className="text-2xl font-bold text-gray-900">12</p>
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
                      <p className="text-2xl font-bold text-gray-900">148</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">المحكمين</p>
                      <p className="text-2xl font-bold text-gray-900">8</p>
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
                      <p className="text-2xl font-bold text-gray-900">94%</p>
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
                <div className="grid gap-4">
                  {arbitrationCases.map((case_item, index) => (
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
                              <p><strong>المحكم:</strong> {case_item.assignedTo}</p>
                              <p><strong>تاريخ الإنشاء:</strong> {case_item.createdAt}</p>
                              <p><strong>الموعد النهائي:</strong> {case_item.deadline}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              عرض التفاصيل
                            </Button>
                            <Button size="sm">
                              إدارة
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="arbitrators" className="space-y-4">
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
                          <div className="space-y-1 text-sm text-gray-600 mb-4">
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
                    <div className="text-center py-8 text-gray-500">
                      ستتوفر نموذج إنشاء القضايا قريباً
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      تقارير التحكيم
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      ستتوفر التقارير المفصلة قريباً
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

export default ArbitrationHub;
