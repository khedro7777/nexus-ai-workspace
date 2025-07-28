
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  ShoppingCart, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Package,
  Truck,
  Shield,
  Award,
  Eye,
  MessageSquare,
  CheckCircle,
  Calendar
} from 'lucide-react';

interface GroupSupplierOffersProps {
  groupId: string;
}

const GroupSupplierOffers: React.FC<GroupSupplierOffersProps> = ({ groupId }) => {
  // Mock supplier offers data
  const offers = [
    {
      id: '1',
      supplier_name: 'شركة التقنية المتطورة',
      supplier_logo: null,
      supplier_rating: 4.8,
      supplier_location: 'رام الله، فلسطين',
      offer_title: 'حل متكامل لأنظمة إدارة المخزون',
      description: 'نقدم حلاً متكاملاً لأنظمة إدارة المخزون يشمل البرمجيات والأجهزة مع التدريب والدعم الفني لمدة سنة كاملة.',
      price: 25000,
      currency: 'USD',
      original_price: 30000,
      discount_percentage: 17,
      delivery_time: '45 يوم عمل',
      warranty: '2 سنة',
      support_period: '1 سنة',
      features: [
        'نظام إدارة مخزون متقدم',
        'تقارير تحليلية مفصلة',
        'تكامل مع أنظمة المحاسبة',
        'تطبيق موبايل',
        'دعم فني 24/7',
        'تدريب شامل للموظفين'
      ],
      certifications: ['ISO 9001', 'ISO 27001'],
      previous_clients: 150,
      experience_years: 8,
      proposal_date: '2024-01-20T10:00:00Z',
      valid_until: '2024-02-20T23:59:59Z',
      status: 'active',
      votes: 8,
      comments: 12,
      viewed_by: 15,
      attachments: ['عرض_فني_مفصل.pdf', 'نماذج_التطبيق.zip', 'شهادات_الجودة.pdf']
    },
    {
      id: '2',
      supplier_name: 'مؤسسة الحلول الذكية',
      supplier_logo: null,
      supplier_rating: 4.5,
      supplier_location: 'نابلس، فلسطين',
      offer_title: 'نظام إدارة المخزون السحابي',
      description: 'نظام إدارة مخزون سحابي متطور مع إمكانيات ذكية للتنبؤ بالطلب وإدارة المخزون تلقائياً.',
      price: 18000,
      currency: 'USD',
      original_price: 22000,
      discount_percentage: 18,
      delivery_time: '30 يوم عمل',
      warranty: '1 سنة',
      support_period: '6 أشهر',
      features: [
        'نظام سحابي آمن',
        'ذكاء اصطناعي للتنبؤ',
        'واجهة سهلة الاستخدام',
        'تقارير مباشرة',
        'دعم متعدد اللغات',
        'تكامل مع المتاجر الإلكترونية'
      ],
      certifications: ['ISO 9001'],
      previous_clients: 85,
      experience_years: 5,
      proposal_date: '2024-01-19T14:30:00Z',
      valid_until: '2024-02-18T23:59:59Z',
      status: 'active',
      votes: 5,
      comments: 8,
      viewed_by: 12,
      attachments: ['العرض_التقني.pdf', 'عينة_النظام.mp4']
    },
    {
      id: '3',
      supplier_name: 'شركة الأنظمة المحترفة',
      supplier_logo: null,
      supplier_rating: 4.2,
      supplier_location: 'الخليل، فلسطين',
      offer_title: 'حل مخصص لإدارة المخزون والمبيعات',
      description: 'حل مخصص مطور خصيصاً لاحتياجاتكم مع إمكانيات متقدمة لإدارة المخزون والمبيعات والتقارير.',
      price: 32000,
      currency: 'USD',
      original_price: 35000,
      discount_percentage: 9,
      delivery_time: '60 يوم عمل',
      warranty: '3 سنوات',
      support_period: '2 سنة',
      features: [
        'تطوير مخصص',
        'نظام متكامل للمبيعات',
        'إدارة العملاء CRM',
        'تحليلات متقدمة',
        'نسخ احتياطية آمنة',
        'تدريب متخصص'
      ],
      certifications: ['ISO 9001', 'Microsoft Partner'],
      previous_clients: 200,
      experience_years: 12,
      proposal_date: '2024-01-18T09:15:00Z',
      valid_until: '2024-02-15T23:59:59Z',
      status: 'under_review',
      votes: 3,
      comments: 6,
      viewed_by: 10,
      attachments: ['المواصفات_التقنية.pdf', 'نماذج_المشاريع.pdf', 'خطة_التنفيذ.xlsx']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRemainingDays = (validUntil: string) => {
    const now = new Date();
    const end = new Date(validUntil);
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return 'انتهت صلاحية العرض';
    if (days === 1) return 'ينتهي اليوم';
    return `${days} أيام متبقية`;
  };

  const calculateSavings = (original: number, current: number) => {
    return original - current;
  };

  return (
    <Card className="h-[800px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          عروض الموردين ({offers.length})
        </CardTitle>
        <div className="text-sm text-gray-600">
          عروض مقدمة من موردين معتمدين لاحتياجات المجموعة
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="space-y-4 max-h-[700px] overflow-y-auto p-4">
          {offers.map((offer) => (
            <Card key={offer.id} className="border-2 hover:border-blue-300 transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                        {offer.supplier_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{offer.supplier_name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{offer.supplier_rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{offer.supplier_location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>{offer.experience_years} سنوات خبرة</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge className={getStatusColor(offer.status)}>
                      {offer.status === 'active' ? 'عرض نشط' :
                       offer.status === 'under_review' ? 'قيد المراجعة' :
                       offer.status === 'accepted' ? 'مقبول' : 'مرفوض'}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">
                      {getRemainingDays(offer.valid_until)}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Offer Title & Description */}
                <div>
                  <h4 className="font-semibold text-xl mb-2">{offer.offer_title}</h4>
                  <p className="text-gray-700 leading-relaxed">{offer.description}</p>
                </div>

                {/* Pricing */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-green-600">
                          ${offer.price.toLocaleString()}
                        </span>
                        {offer.original_price > offer.price && (
                          <span className="text-lg line-through text-gray-500">
                            ${offer.original_price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {offer.discount_percentage > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-red-100 text-red-800">
                            خصم {offer.discount_percentage}%
                          </Badge>
                          <span className="text-sm text-green-600 font-medium">
                            توفير ${calculateSavings(offer.original_price, offer.price).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center gap-1 mb-1">
                        <Truck className="w-4 h-4" />
                        <span>التسليم: {offer.delivery_time}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <Shield className="w-4 h-4" />
                        <span>الضمان: {offer.warranty}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>الدعم: {offer.support_period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h5 className="font-medium mb-2">المواصفات والمميزات:</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {offer.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications & Experience */}
                <div className="grid grid-cols-3 gap-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-center">
                    <div className="font-bold text-blue-800">{offer.previous_clients}</div>
                    <div className="text-xs text-blue-600">عميل سابق</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-800">{offer.certifications.length}</div>
                    <div className="text-xs text-purple-600">شهادة جودة</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-800">{offer.experience_years}</div>
                    <div className="text-xs text-green-600">سنة خبرة</div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2">
                  {offer.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Award className="w-3 h-3 ml-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{offer.viewed_by} مشاهدة</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{offer.votes} تقييم</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{offer.comments} تعليق</span>
                    </div>
                  </div>
                  
                  <div className="text-xs">
                    <Calendar className="w-3 h-3 inline ml-1" />
                    قُدم في {new Date(offer.proposal_date).toLocaleDateString('ar')}
                  </div>
                </div>

                {/* Attachments */}
                {offer.attachments.length > 0 && (
                  <div>
                    <h6 className="font-medium text-sm mb-2">المرفقات:</h6>
                    <div className="flex flex-wrap gap-2">
                      {offer.attachments.map((attachment, index) => (
                        <Button key={index} variant="outline" size="sm" className="text-xs">
                          <Package className="w-3 h-3 ml-1" />
                          {attachment}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1">
                    <CheckCircle className="w-4 h-4 ml-2" />
                    قبول العرض
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="w-4 h-4 ml-2" />
                    مناقشة
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 ml-2" />
                    تفاصيل أكثر
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {offers.length === 0 && (
          <div className="p-12 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عروض موردين</h3>
            <p className="text-gray-600">لم يتم استلام أي عروض من الموردين بعد</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupSupplierOffers;
