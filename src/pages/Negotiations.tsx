
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageSquare, Users, Clock, TrendingUp, Vote, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const Negotiations = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const negotiations = [
    {
      id: 1,
      title: "تفاوض أسعار الأجهزة الإلكترونية",
      group: "مجموعة التكنولوجيا",
      supplier: "شركة الإمداد المتميز",
      status: "active",
      round: 2,
      maxRounds: 3,
      participants: 12,
      currentOffer: "145,000",
      targetPrice: "130,000",
      deadline: "2024-01-20",
      progress: 65,
      messages: 24,
      votes: { yes: 8, no: 2, pending: 2 }
    },
    {
      id: 2,
      title: "تفاوض شروط التسليم - مواد البناء",
      group: "مجموعة المقاولين",
      supplier: "مجموعة التجارة الذكية",
      status: "voting",
      round: 1,
      maxRounds: 2,
      participants: 8,
      currentOffer: "490,000",
      targetPrice: "480,000",
      deadline: "2024-01-25",
      progress: 85,
      messages: 18,
      votes: { yes: 5, no: 1, pending: 2 }
    },
    {
      id: 3,
      title: "تفاوض جودة المنتجات الغذائية",
      group: "مجموعة المطاعم",
      supplier: "شركة الأغذية الطازجة",
      status: "completed",
      round: 3,
      maxRounds: 3,
      participants: 15,
      currentOffer: "72,000",
      targetPrice: "70,000",
      deadline: "2024-01-10",
      progress: 100,
      messages: 45,
      votes: { yes: 12, no: 2, pending: 1 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'voting': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'جاري التفاوض';
      case 'voting': return 'جولة تصويت';
      case 'completed': return 'مكتمل';
      case 'expired': return 'منتهي الصلاحية';
      default: return 'غير محدد';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <MessageSquare className="w-4 h-4" />;
      case 'voting': return <Vote className="w-4 h-4" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'expired': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">المفاوضات</h1>
            <p className="text-gray-600">متابعة وإدارة جلسات التفاوض النشطة</p>
          </div>
          <Button className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            بدء تفاوض جديد
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">6</p>
                  <p className="text-gray-600 text-sm">جلسات نشطة</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-gray-600 text-sm">جولات تصويت</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Vote className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                  <p className="text-gray-600 text-sm">مكتملة</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">89%</p>
                  <p className="text-gray-600 text-sm">معدل النجاح</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Negotiations List */}
        <div className="space-y-6">
          {negotiations.map((negotiation) => (
            <Card key={negotiation.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{negotiation.title}</CardTitle>
                      <Badge className={getStatusColor(negotiation.status)}>
                        {getStatusIcon(negotiation.status)}
                        <span className="mr-1">{getStatusText(negotiation.status)}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>المجموعة: {negotiation.group}</span>
                      <span>•</span>
                      <span>المورد: {negotiation.supplier}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">جولة التفاوض</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-blue-600">{negotiation.round}</span>
                      <span className="text-gray-500">من {negotiation.maxRounds}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">العرض الحالي</h4>
                    <div className="text-2xl font-bold text-gray-900">
                      {negotiation.currentOffer} ر.س
                    </div>
                    <div className="text-sm text-gray-600">
                      الهدف: {negotiation.targetPrice} ر.س
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">المشاركون</h4>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">{negotiation.participants} عضو</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {negotiation.messages} رسالة
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">الموعد النهائي</h4>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">{negotiation.deadline}</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">تقدم التفاوض</span>
                    <span className="text-sm text-gray-600">{negotiation.progress}%</span>
                  </div>
                  <Progress value={negotiation.progress} className="h-2" />
                </div>

                {/* Voting Status */}
                {negotiation.status === 'voting' && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-3">حالة التصويت</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{negotiation.votes.yes}</div>
                        <div className="text-sm text-gray-600">موافق</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{negotiation.votes.no}</div>
                        <div className="text-sm text-gray-600">معارض</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-600">{negotiation.votes.pending}</div>
                        <div className="text-sm text-gray-600">لم يصوت</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1">
                    {negotiation.status === 'voting' ? 'عرض التصويت' : 'دخول التفاوض'}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    تفاصيل العرض
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    الرسائل ({negotiation.messages})
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Negotiations;
