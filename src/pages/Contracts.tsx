
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  User,
  Building,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Edit,
  Eye
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const Contracts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const contracts = [
    {
      id: 'CNT-001',
      title: 'عقد توريد مواد البناء',
      parties: ['شركة البناء المتطور', 'مؤسسة التوريد الشامل'],
      type: 'توريد',
      status: 'نشط',
      value: '500,000 ريال',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      progress: 75
    },
    {
      id: 'CNT-002',
      title: 'اتفاقية خدمات تسويقية',
      parties: ['شركة التقنية الذكية', 'وكالة الإبداع للتسويق'],
      type: 'خدمات',
      status: 'مسودة',
      value: '200,000 ريال',
      startDate: '2024-02-01',
      endDate: '2024-08-01',
      progress: 0
    },
    {
      id: 'CNT-003',
      title: 'عقد شراكة استراتيجية',
      parties: ['مجموعة الاستثمار', 'شركة التطوير العقاري'],
      type: 'شراكة',
      status: 'منتهي',
      value: '1,000,000 ريال',
      startDate: '2023-06-01',
      endDate: '2024-01-01',
      progress: 100
    }
  ];

  const contractTemplates = [
    {
      name: 'عقد توريد عام',
      description: 'نموذج عقد توريد قياسي للمواد والمنتجات',
      category: 'توريد',
      downloads: 156
    },
    {
      name: 'اتفاقية خدمات',
      description: 'نموذج اتفاقية تقديم الخدمات المختلفة',
      category: 'خدمات',
      downloads: 89
    },
    {
      name: 'عقد شراكة',
      description: 'نموذج عقد شراكة تجارية واستراتيجية',
      category: 'شراكة',
      downloads: 67
    },
    {
      name: 'اتفاقية سرية',
      description: 'اتفاقية عدم إفشاء المعلومات السرية',
      category: 'قانوني',
      downloads: 234
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-500';
      case 'مسودة': return 'bg-yellow-500';
      case 'منتهي': return 'bg-gray-500';
      case 'معلق': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'نشط': return <CheckCircle className="w-4 h-4" />;
      case 'مسودة': return <Edit className="w-4 h-4" />;
      case 'منتهي': return <Clock className="w-4 h-4" />;
      case 'معلق': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <FileText className="w-8 h-8" />
                    إدارة العقود
                  </h1>
                  <p className="text-gray-600">
                    إدارة وتتبع العقود والاتفاقيات التجارية
                  </p>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  عقد جديد
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">العقود النشطة</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">المسودات</p>
                      <p className="text-2xl font-bold text-gray-900">5</p>
                    </div>
                    <Edit className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">القيمة الإجمالية</p>
                      <p className="text-2xl font-bold text-gray-900">2.4م</p>
                    </div>
                    <Building className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">التجديدات المطلوبة</p>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="contracts" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="contracts">العقود</TabsTrigger>
                <TabsTrigger value="templates">النماذج</TabsTrigger>
                <TabsTrigger value="analytics">التحليلات</TabsTrigger>
              </TabsList>

              <TabsContent value="contracts" className="space-y-4">
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث في العقود..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 ml-2" />
                    تصفية
                  </Button>
                </div>

                {/* Contracts List */}
                <div className="space-y-4">
                  {contracts.map((contract, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-semibold">{contract.title}</h3>
                              <Badge className={`text-white ${getStatusColor(contract.status)} flex items-center gap-1`}>
                                {getStatusIcon(contract.status)}
                                {contract.status}
                              </Badge>
                              <Badge variant="outline">{contract.type}</Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                              <div>
                                <p><strong>رقم العقد:</strong> {contract.id}</p>
                                <p><strong>القيمة:</strong> {contract.value}</p>
                              </div>
                              <div>
                                <p><strong>تاريخ البداية:</strong> {contract.startDate}</p>
                                <p><strong>تاريخ الانتهاء:</strong> {contract.endDate}</p>
                              </div>
                              <div>
                                <p><strong>الأطراف:</strong></p>
                                <ul className="text-xs mt-1">
                                  {contract.parties.map((party, idx) => (
                                    <li key={idx}>• {party}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>تقدم العقد</span>
                                <span>{contract.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${contract.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 ml-1" />
                              عرض
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 ml-1" />
                              تحميل
                            </Button>
                            <Button size="sm">
                              <Edit className="w-4 h-4 ml-1" />
                              تحرير
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contractTemplates.map((template, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-6 h-6 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                            <Badge variant="secondary">{template.category}</Badge>
                            <span>•</span>
                            <span>{template.downloads} تحميل</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              معاينة
                            </Button>
                            <Button size="sm" className="flex-1">
                              استخدام
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>تحليلات العقود</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      ستتوفر تحليلات العقود المفصلة قريباً
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
