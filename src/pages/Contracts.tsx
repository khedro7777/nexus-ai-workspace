
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Calendar, Users, DollarSign, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const Contracts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const contracts = [
    {
      id: 1,
      title: "عقد شراء أجهزة كمبيوتر",
      group: "مجموعة التكنولوجيا",
      supplier: "شركة الإمداد المتميز",
      value: "150,000",
      currency: "ر.س",
      status: "active",
      progress: 75,
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      participants: 12,
      description: "عقد لشراء 50 جهاز كمبيوتر مكتبي لأعضاء المجموعة"
    },
    {
      id: 2,
      title: "عقد توريد مواد البناء",
      group: "مجموعة المقاولين",
      supplier: "مجموعة التجارة الذكية",
      value: "500,000",
      currency: "ر.س",
      status: "pending",
      progress: 25,
      startDate: "2024-02-01",
      endDate: "2024-05-01",
      participants: 8,
      description: "عقد لتوريد مواد البناء الأساسية لمشاريع الأعضاء"
    },
    {
      id: 3,
      title: "عقد توريد مواد غذائية",
      group: "مجموعة المطاعم",
      supplier: "شركة الأغذية الطازجة",
      value: "75,000",
      currency: "ر.س",
      status: "completed",
      progress: 100,
      startDate: "2023-12-01",
      endDate: "2024-01-31",
      participants: 15,
      description: "عقد توريد شهري للمواد الغذائية الطازجة"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'pending': return 'قيد المراجعة';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return 'غير محدد';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">العقود</h1>
            <p className="text-gray-600">إدارة ومتابعة جميع العقود النشطة والمكتملة</p>
          </div>
          <Button className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            إنشاء عقد جديد
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-gray-600 text-sm">العقود النشطة</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-gray-600 text-sm">قيد المراجعة</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">25</p>
                  <p className="text-gray-600 text-sm">مكتملة</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">2.1M</p>
                  <p className="text-gray-600 text-sm">إجمالي القيمة (ر.س)</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contracts List */}
        <div className="space-y-6">
          {contracts.map((contract) => (
            <Card key={contract.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{contract.title}</CardTitle>
                      <Badge className={getStatusColor(contract.status)}>
                        {getStatusIcon(contract.status)}
                        <span className="mr-1">{getStatusText(contract.status)}</span>
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{contract.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">المجموعة:</span>
                      <span className="font-medium text-gray-900">{contract.group}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">المورد:</span>
                      <span className="font-medium text-gray-900">{contract.supplier}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">القيمة:</span>
                      <span className="font-bold text-lg text-gray-900">
                        {contract.value} {contract.currency}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">المشاركون:</span>
                      <span className="font-medium text-gray-900">{contract.participants} عضو</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">تاريخ البداية:</span>
                      <span className="font-medium text-gray-900">{contract.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">تاريخ الانتهاء:</span>
                      <span className="font-medium text-gray-900">{contract.endDate}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">تقدم التنفيذ</span>
                    <span className="text-sm text-gray-600">{contract.progress}%</span>
                  </div>
                  <Progress value={contract.progress} className="h-2" />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button variant="outline" className="flex-1">
                    عرض التفاصيل
                  </Button>
                  <Button variant="outline" className="flex-1">
                    تحميل العقد
                  </Button>
                  {contract.status === 'active' && (
                    <Button className="flex-1">
                      تحديث التقدم
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contracts;
