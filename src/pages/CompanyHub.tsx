
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, FileText, TrendingUp, Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Link } from 'react-router-dom';

const CompanyHub = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const services = [
    {
      title: "تأسيس الشركات",
      description: "خدمات تأسيس شركات محدودة المسؤولية وشركات مساهمة",
      icon: Building2,
      color: "bg-blue-500",
      features: ["تسجيل تجاري", "ترخيص الأنشطة", "فتح حسابات بنكية"]
    },
    {
      title: "إدارة الموارد البشرية",
      description: "نظام متكامل لإدارة الموظفين والرواتب والحضور",
      icon: Users,
      color: "bg-green-500",
      features: ["كشوف الرواتب", "إدارة الإجازات", "تقييم الأداء"]
    },
    {
      title: "الامتثال القانوني",
      description: "ضمان الامتثال للقوانين واللوائح المحلية والدولية",
      icon: Shield,
      color: "bg-red-500",
      features: ["مراجعة قانونية", "تحديث اللوائح", "إدارة المخاطر"]
    },
    {
      title: "التقارير المالية",
      description: "إعداد القوائم المالية والتقارير الضريبية",
      icon: TrendingUp,
      color: "bg-purple-500",
      features: ["قوائم مالية", "إقرارات ضريبية", "تحليل مالي"]
    }
  ];

  const packages = [
    {
      name: "باقة البداية",
      price: "299",
      period: "شهرياً",
      features: [
        "تأسيس شركة واحدة",
        "دعم قانوني أساسي",
        "تقارير شهرية",
        "دعم عبر البريد الإلكتروني"
      ],
      popular: false
    },
    {
      name: "باقة الأعمال",
      price: "599",
      period: "شهرياً",
      features: [
        "تأسيس 3 شركات",
        "إدارة الموارد البشرية",
        "تقارير أسبوعية",
        "دعم هاتفي 24/7",
        "استشارات قانونية"
      ],
      popular: true
    },
    {
      name: "باقة المؤسسات",
      price: "1299",
      period: "شهرياً",
      features: [
        "شركات غير محدودة",
        "جميع الخدمات",
        "تقارير يومية",
        "مدير حساب مخصص",
        "تدريب مجاني"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm mb-6">
            <Zap className="w-4 h-4" />
            منصة تأسيس وإدارة الشركات الذكية
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            بوابة
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> الشركات </span>
            الذكية
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            منصة متكاملة لتأسيس وإدارة الشركات بذكاء اصطناعي متقدم، من التسجيل التجاري حتى إدارة العمليات اليومية
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3">
              ابدأ رحلتك الآن
              <ArrowRight className="w-5 h-5 mr-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2">
              استكشف الخدمات
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              خدمات شاملة لنجاح شركتك
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نوفر لك كل ما تحتاجه لتأسيس وإدارة شركتك بكفاءة عالية وامتثال كامل
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="w-full mt-4 group-hover:bg-blue-50">
                    تعرف على المزيد
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              باقات تناسب جميع احتياجاتك
            </h2>
            <p className="text-gray-600">
              اختر الباقة المناسبة لحجم أعمالك واحتياجاتك
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''} bg-white`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm">
                      الأكثر شعبية
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                    <span className="text-gray-500 mr-2">ر.س {pkg.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${pkg.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}`}
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    ابدأ الآن
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Globe className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            جاهز لتأسيس شركتك؟
          </h2>
          <p className="text-xl mb-8 opacity-90">
            انضم إلى آلاف الشركات التي تثق في منصتنا لإدارة أعمالها
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              بدء تجربة مجانية
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              تحدث مع خبير
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyHub;
