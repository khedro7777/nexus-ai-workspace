
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import { 
  Users, 
  Search, 
  Filter,
  MessageSquare,
  UserPlus,
  Calendar,
  MapPin,
  Star,
  ChevronRight,
  Home,
  ArrowRight,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Mail,
  Send,
  Eye,
  Briefcase,
  Award,
  Globe
} from 'lucide-react';

const GatewayPage = () => {
  const { gatewayId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPhase, setFilterPhase] = useState('all');

  // Mock data for groups - enhanced with all required fields
  const mockGroups = [
    {
      id: 'group-1',
      name: 'مجموعة شراء معدات المكاتب الذكية',
      description: 'نسعى لشراء معدات مكتبية حديثة وذكية بجودة عالية وأسعار تنافسية للشركات الناشئة والمتوسطة في منطقة الخليج',
      phase: 'مرحلة التفاوض',
      members: 23,
      maxMembers: 50,
      location: 'الرياض، السعودية',
      requirements: 'شركات مسجلة مع رأس مال 100K+',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      status: 'recruiting',
      category: 'معدات مكتبية',
      estimatedSavings: '25-35%',
      groupType: 'شراء تعاوني',
      targetBudget: '₪500K - ₪1M',
      deadline: '2024-02-15',
      priority: 'عالية',
      progress: 65,
      isUrgent: true,
      contactsReceived: 12,
      proposalsReceived: 8,
      activeNegotiations: 3
    },
    {
      id: 'group-2', 
      name: 'مجموعة تطوير تطبيقات الجوال المتقدمة',
      description: 'فريق من المطورين المحترفين المتخصصين في تطوير تطبيقات الجوال متعددة المنصات للشركات والمؤسسات',
      phase: 'مرحلة التكوين',
      members: 15,
      maxMembers: 30,
      location: 'دبي، الإمارات',
      requirements: 'مطورين خبرة 3+ سنوات في Flutter/React Native',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-22',
      status: 'seeking_freelancers',
      category: 'تطوير تطبيقات',
      estimatedSavings: '40-50%',
      groupType: 'خدمات المستقلين',
      targetBudget: '₪200K - ₪500K',
      deadline: '2024-03-01',
      priority: 'متوسطة',
      progress: 30,
      isUrgent: false,
      contactsReceived: 28,
      proposalsReceived: 15,
      activeNegotiations: 5
    },
    {
      id: 'group-3',
      name: 'شبكة موردي المواد الغذائية العضوية',
      description: 'شبكة موردين متخصصة في المواد الغذائية العضوية والطازجة عالية الجودة للمطاعم والفنادق والمقاهي',
      phase: 'مرحلة التأهيل',
      members: 18,
      maxMembers: 25,
      location: 'القاهرة، مصر',
      requirements: 'موردين معتمدين مع شهادات جودة',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-23',
      status: 'seeking_suppliers',
      category: 'مواد غذائية',
      estimatedSavings: '20-30%',
      groupType: 'توريد جماعي',
      targetBudget: '₪1M - ₪2M',
      deadline: '2024-02-28',
      priority: 'عالية',
      progress: 45,
      isUrgent: true,
      contactsReceived: 35,
      proposalsReceived: 22,
      activeNegotiations: 8
    },
    {
      id: 'group-4',
      name: 'مجموعة التسويق الرقمي للشركات الناشئة',
      description: 'حملة تسويقية متكاملة تشمل وسائل التواصل الاجتماعي والإعلانات المدفوعة لزيادة الوعي بالعلامة التجارية',
      phase: 'مرحلة التخطيط',
      members: 12,
      maxMembers: 20,
      location: 'الكويت، الكويت',
      requirements: 'شركات ناشئة مع ميزانية تسويق 50K+',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-24',
      status: 'planning',
      category: 'تسويق رقمي',
      estimatedSavings: '35-45%',
      groupType: 'تسويق تعاوني',
      targetBudget: '₪300K - ₪800K',
      deadline: '2024-03-15',
      priority: 'متوسطة',
      progress: 20,
      isUrgent: false,
      contactsReceived: 19,
      proposalsReceived: 11,
      activeNegotiations: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recruiting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'seeking_freelancers': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'seeking_suppliers': return 'bg-green-100 text-green-800 border-green-200';
      case 'planning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPhaseDisplayName = (phase: string) => {
    const phaseMap: { [key: string]: string } = {
      'مرحلة التكوين': 'تكوين المجموعة',
      'مرحلة التأهيل': 'تأهيل الأعضاء', 
      'مرحلة التفاوض': 'جاري التفاوض',
      'مرحلة التخطيط': 'تخطيط المشروع',
      'مرحلة التنفيذ': 'قيد التنفيذ',
      'مرحلة الإنجاز': 'مكتملة'
    };
    return phaseMap[phase] || phase;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالية': return 'text-red-600 bg-red-50';
      case 'متوسطة': return 'text-yellow-600 bg-yellow-50';
      case 'منخفضة': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleJoinGroup = (groupId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/group/${groupId}`);
  };

  const handleContactGroup = (groupId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    // Navigate to group contact/inbox
    navigate(`/group/${groupId}/contact`);
  };

  const handleViewDetails = (groupId: string) => {
    navigate(`/group/${groupId}/details`);
  };

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || group.status === filterStatus;
    const matchesPhase = filterPhase === 'all' || group.phase === filterPhase;
    return matchesSearch && matchesStatus && matchesPhase;
  });

  const getGatewayTitle = (id: string) => {
    const titles: { [key: string]: string } = {
      'cooperative-purchasing': 'مجموعات الشراء التعاوني',
      'cooperative-marketing': 'مجموعات التسويق التعاوني',
      'freelancers-individual': 'مجموعات المستقلين (فردي)',
      'freelancers-group': 'مجموعات المستقلين (جماعي)',
      'suppliers-individual': 'مجموعات الموردين (فردي)',
      'suppliers-group': 'مجموعات الموردين (جماعي)',
      'company-formation-individual': 'تأسيس الشركات (فردي)',
      'company-formation-group': 'تأسيس الشركات (جماعي)',
      'arbitration': 'التحكيم والفصل في النزاعات',
      'investment': 'الاستثمار للشركات',
      'service-providers': 'بوابة مقدمي الخدمات',
      'marketplace': 'بوابة السلع والمنتجات'
    };
    return titles[id || ''] || `بوابة ${id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Navigation Breadcrumb */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm border">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:bg-blue-50"
          >
            <Home className="w-4 h-4" />
            الرئيسية
          </Button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-700 font-medium">{getGatewayTitle(gatewayId)}</span>
        </div>

        {/* Enhanced Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getGatewayTitle(gatewayId)}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            اكتشف المجموعات النشطة وانضم إلى التي تناسب احتياجاتك. استفد من قوة التفاوض الجماعي 
            واحصل على أفضل العروض والشروط
          </p>
          
          {/* Quick Stats */}
          <div className="flex justify-center items-center gap-8 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span>{filteredGroups.length} مجموعة نشطة</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>توفير يصل إلى 50%</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-500" />
              <span>شركاء معتمدون</span>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter Section */}
        <Card className="mb-8 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث في المجموعات، الفئات، أو الوصف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 bg-gray-50 border-gray-200"
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {/* Status Filter */}
                <div className="flex gap-1">
                  <Button
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('all')}
                    size="sm"
                    className="text-sm"
                  >
                    الكل
                  </Button>
                  <Button
                    variant={filterStatus === 'recruiting' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('recruiting')}
                    size="sm"
                    className="text-sm"
                  >
                    تطلب أعضاء
                  </Button>
                  <Button
                    variant={filterStatus === 'seeking_freelancers' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('seeking_freelancers')}
                    size="sm"
                    className="text-sm"
                  >
                    تطلب مستقلين
                  </Button>
                  <Button
                    variant={filterStatus === 'seeking_suppliers' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('seeking_suppliers')}
                    size="sm"
                    className="text-sm"
                  >
                    تطلب موردين
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Groups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-xl transition-all duration-300 hover:scale-102 border-0 shadow-lg bg-white overflow-hidden">
              {/* Card Header with Status Bar */}
              <div className={`h-1 ${getStatusColor(group.status).includes('blue') ? 'bg-blue-500' : 
                                     getStatusColor(group.status).includes('purple') ? 'bg-purple-500' :
                                     getStatusColor(group.status).includes('green') ? 'bg-green-500' : 'bg-gray-500'}`}></div>
              
              <CardHeader className="pb-4">
                {/* Top Section */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex flex-col gap-2">
                    <Badge className={getStatusColor(group.status)} variant="outline">
                      {getPhaseDisplayName(group.phase)}
                    </Badge>
                    {group.isUrgent && (
                      <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                        عاجل
                      </Badge>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <Users className="w-4 h-4" />
                      <span>{group.members}/{group.maxMembers}</span>
                    </div>
                    <Badge className={`text-xs ${getPriorityColor(group.priority)}`}>
                      أولوية {group.priority}
                    </Badge>
                  </div>
                </div>

                {/* Title */}
                <CardTitle className="text-lg leading-tight line-clamp-2 mb-2">
                  {group.name}
                </CardTitle>

                {/* Category and Type */}
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {group.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {group.groupType}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {group.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>تقدم المجموعة</span>
                    <span>{group.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${group.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Key Information */}
                <div className="space-y-2 text-sm bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{group.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span>{group.targetBudget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>الموعد النهائي: {new Date(group.deadline).toLocaleDateString('ar')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Star className="w-4 h-4" />
                    <span>توفير متوقع: {group.estimatedSavings}</span>
                  </div>
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 bg-blue-50 p-2 rounded">
                  <div className="text-center">
                    <div className="font-medium text-blue-600">{group.contactsReceived}</div>
                    <div>استفسار</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-600">{group.proposalsReceived}</div>
                    <div>عرض</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-600">{group.activeNegotiations}</div>
                    <div>تفاوض</div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500 mb-3">
                    <span className="font-medium">المتطلبات:</span> {group.requirements}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-xs"
                      onClick={() => handleJoinGroup(group.id)}
                    >
                      <UserPlus className="w-3 h-3 ml-1" />
                      انضم
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs"
                      onClick={() => handleContactGroup(group.id)}
                    >
                      <MessageSquare className="w-3 h-3 ml-1" />
                      راسل
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs"
                      onClick={() => handleViewDetails(group.id)}
                    >
                      <Eye className="w-3 h-3 ml-1" />
                      تفاصيل
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <Card className="text-center py-16 shadow-lg">
            <CardContent>
              <div className="max-w-md mx-auto">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  لا توجد مجموعات مطابقة
                </h3>
                <p className="text-gray-600 mb-6">
                  جرب تغيير المرشحات أو مصطلحات البحث، أو قم بإنشاء مجموعة جديدة
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => navigate('/create-group')} className="bg-blue-600 hover:bg-blue-700">
                    إنشاء مجموعة جديدة
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                    setFilterPhase('all');
                  }}>
                    مسح المرشحات
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Group CTA */}
        {filteredGroups.length > 0 && (
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
              <CardContent className="py-8">
                <h3 className="text-xl font-bold mb-2">لم تجد ما تبحث عنه؟</h3>
                <p className="mb-4 opacity-90">أنشئ مجموعتك الخاصة واجذب الأعضاء المناسبين</p>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('/create-group')}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <UserPlus className="w-4 h-4 ml-2" />
                  إنشاء مجموعة جديدة
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GatewayPage;
