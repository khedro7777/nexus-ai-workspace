
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gavel, Shield, FileText, Clock, Users, Award, ChevronRight, Scale } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const ArbitrationHub = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const arbitrationTypes = [
    {
      title: "نزاعات تجارية",
      description: "حل النزاعات بين الشركات والعملاء",
      icon: FileText,
      color: "bg-blue-500",
      cases: 1247
    },
    {
      title: "عقود العمل",
      description: "تحكيم في منازعات العمل والتوظيف",
      icon: Users,
      color: "bg-green-500",
      cases: 892
    },
    {
      title: "الملكية الفكرية",
      description: "حماية حقوق الملكية الفكرية والعلامات التجارية",
      icon: Shield,
      color: "bg-purple-500",
      cases: 654
    },
    {
      title: "عقود الاستثمار",
      description: "تسوية منازعات الاستثمار والشراكات",
      icon: Award,
      color: "bg-orange-500",
      cases: 432
    }
  ];

  const recentCases = [
    {
      id: "ORDA-2024-001",
      title: "نزاع تجاري - عقد توريد",
      parties: "شركة التقنية المتقدمة ضد موردون الخليج",
      status: "قيد المراجعة",
      date: "2024-01-15",
      arbitrator: "د. أحمد العتيبي"
    },
    {
      id: "ORDA-2024-002", 
      title: "منازعة عمالية - فصل تعسفي",
      parties: "محمد الأحمد ضد شركة الإنشاءات الحديثة",
      status: "تم الحكم",
      date: "2024-01-10",
      arbitrator: "أ. فاطمة النجار"
    },
    {
      id: "ORDA-2024-003",
      title: "نزاع ملكية فكرية - براءة اختراع",
      parties: "مؤسسة الابتكار ضد تقنيات المستقبل",
      status: "جلسة استماع",
      date: "2024-01-08",
      arbitrator: "د. عبدالله المطيري"
    }
  ];

  const arbitrators = [
    {
      name: "د. أحمد العتيبي",
      specialization: "القانون التجاري",
      experience: "15 سنة",
      cases: 234,
      rating: 4.9
    },
    {
      name: "أ. فاطمة النجار",
      specialization: "قانون العمل",
      experience: "12 سنة", 
      cases: 187,
      rating: 4.8
    },
    {
      name: "د. عبدالله المطيري",
      specialization: "الملكية الفكرية",
      experience: "18 سنة",
      cases: 156,
      rating: 4.9
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm mb-6">
            <Scale className="w-4 h-4" />
            منصة التحكيم والتوثيق ORDA
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            العدالة
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"> الرقمية </span>
            المتقدمة
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            منصة تحكيم متطورة تعتمد على الذكاء الاصطناعي لضمان العدالة والشفافية في حل النزاعات التجارية والقانونية
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-lg px-8 py-3">
              تقديم طلب تحكيم
              <Gavel className="w-5 h-5 mr-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2">
              استشارة قانونية
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">3,225</div>
              <div className="text-gray-600">قضية محلولة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">48</div>
              <div className="text-gray-600">محكم معتمد</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">96%</div>
              <div className="text-gray-600">معدل الرضا</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">14</div>
              <div className="text-gray-600">يوم متوسط الحل</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              أنواع التحكيم المتاحة
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نغطي جميع أنواع النزاعات بخبرة قانونية متخصصة ونظام تحكيم عادل
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {arbitrationTypes.map((type, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full ${type.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-2">{type.cases}</div>
                  <div className="text-sm text-gray-500 mb-4">قضية محلولة</div>
                  <Button variant="ghost" className="w-full group-hover:bg-red-50">
                    ابدأ التحكيم
                    <ChevronRight className="w-4 h-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Tabs defaultValue="cases" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cases">القضايا الحديثة</TabsTrigger>
              <TabsTrigger value="arbitrators">المحكمون</TabsTrigger>
              <TabsTrigger value="process">عملية التحكيم</TabsTrigger>
            </TabsList>

            <TabsContent value="cases" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">القضايا الحديثة</h3>
                <Button variant="outline">عرض الكل</Button>
              </div>
              
              <div className="space-y-4">
                {recentCases.map((case_item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{case_item.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {case_item.parties}
                          </CardDescription>
                        </div>
                        <Badge variant={
                          case_item.status === 'تم الحكم' ? 'default' : 
                          case_item.status === 'قيد المراجعة' ? 'secondary' : 'outline'
                        }>
                          {case_item.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span>رقم القضية: {case_item.id}</span>
                          <span>المحكم: {case_item.arbitrator}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {case_item.date}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="arbitrators" className="space-y-6">
              <h3 className="text-2xl font-bold">المحكمون المعتمدون</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {arbitrators.map((arbitrator, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle>{arbitrator.name}</CardTitle>
                      <CardDescription>{arbitrator.specialization}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div>الخبرة: {arbitrator.experience}</div>
                        <div>القضايا المحلولة: {arbitrator.cases}</div>
                        <div className="flex items-center justify-center gap-1">
                          <span>التقييم: {arbitrator.rating}</span>
                          <div className="flex text-yellow-400">★★★★★</div>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        عرض الملف الشخصي
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="process" className="space-y-6">
              <h3 className="text-2xl font-bold">مراحل عملية التحكيم</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: 1, title: "تقديم الطلب", desc: "تقديم طلب التحكيم مع الوثائق" },
                  { step: 2, title: "اختيار المحكم", desc: "تعيين محكم مؤهل للقضية" },
                  { step: 3, title: "جلسات الاستماع", desc: "عقد جلسات لسماع الأطراف" },
                  { step: 4, title: "إصدار الحكم", desc: "إصدار قرار التحكيم النهائي" }
                ].map((phase, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        {phase.step}
                      </div>
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                      <CardDescription>{phase.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default ArbitrationHub;
