
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Briefcase, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  User,
  Award,
  Eye,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

interface GroupFreelancerOffersProps {
  groupId: string;
}

const GroupFreelancerOffers: React.FC<GroupFreelancerOffersProps> = ({ groupId }) => {
  // Mock freelancer offers
  const offers = [
    {
      id: '1',
      name: 'أحمد المطور',
      title: 'مطور ويب متخصص في React و Node.js',
      description: 'خبرة 5 سنوات في تطوير تطبيقات الويب والموبايل مع تخصص في تقنيات React وNode.js.',
      hourly_rate: 25,
      currency: 'USD',
      rating: 4.9,
      completed_projects: 150,
      location: 'رام الله، فلسطين',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
      availability: 'متاح فوراً',
      response_time: '2 ساعة',
      languages: ['العربية', 'الإنجليزية'],
      portfolio_projects: 3,
      certifications: ['AWS Certified Developer'],
      proposed_at: '2024-01-20T11:00:00Z'
    },
    {
      id: '2',
      name: 'فاطمة المصممة',
      title: 'مصممة UI/UX متخصصة في تطبيقات الجوال',
      description: 'مصممة واجهات مستخدم مع خبرة في تصميم تطبيقات الجوال والمواقع الإلكترونية.',
      hourly_rate: 20,
      currency: 'USD',
      rating: 4.7,
      completed_projects: 95,
      location: 'نابلس، فلسطين',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'User Research'],
      availability: 'متاح خلال أسبوع',
      response_time: '4 ساعات',
      languages: ['العربية', 'الإنجليزية', 'الفرنسية'],
      portfolio_projects: 8,
      certifications: ['Google UX Design Certificate'],
      proposed_at: '2024-01-19T15:30:00Z'
    }
  ];

  return (
    <Card className="h-[800px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          عروض المستقلين ({offers.length})
        </CardTitle>
        <div className="text-sm text-gray-600">
          عروض مقدمة من مستقلين معتمدين
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="space-y-4 max-h-[700px] overflow-y-auto p-4">
          {offers.map((offer) => (
            <Card key={offer.id} className="border-2 hover:border-blue-300 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-purple-100 text-purple-600 font-bold text-lg">
                      {offer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-xl">{offer.name}</h3>
                        <h4 className="text-lg text-gray-700 mb-2">{offer.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{offer.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{offer.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            <span>{offer.completed_projects} مشروع مكتمل</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          ${offer.hourly_rate}/ساعة
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {offer.availability}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{offer.description}</p>

                    {/* Skills */}
                    <div className="mb-4">
                      <h5 className="font-medium mb-2">المهارات:</h5>
                      <div className="flex flex-wrap gap-2">
                        {offer.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="font-bold text-blue-800">{offer.completed_projects}</div>
                        <div className="text-xs text-blue-600">مشروع</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-green-800">{offer.response_time}</div>
                        <div className="text-xs text-green-600">وقت الرد</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-purple-800">{offer.portfolio_projects}</div>
                        <div className="text-xs text-purple-600">معرض أعمال</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-orange-800">{offer.languages.length}</div>
                        <div className="text-xs text-orange-600">لغة</div>
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="mb-4">
                      <h5 className="font-medium mb-2">اللغات:</h5>
                      <div className="flex gap-2">
                        {offer.languages.map((lang, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    {offer.certifications.length > 0 && (
                      <div className="mb-4">
                        <h5 className="font-medium mb-2">الشهادات:</h5>
                        <div className="flex gap-2">
                          {offer.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Award className="w-3 h-3 ml-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t">
                      <Button className="flex-1">
                        <CheckCircle className="w-4 h-4 ml-2" />
                        توظيف
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <MessageSquare className="w-4 h-4 ml-2" />
                        رسالة
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 ml-2" />
                        معرض الأعمال
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {offers.length === 0 && (
          <div className="p-12 text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عروض مستقلين</h3>
            <p className="text-gray-600">لم يتم استلام أي عروض من المستقلين بعد</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupFreelancerOffers;
