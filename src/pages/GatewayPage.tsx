
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
  ArrowRight
} from 'lucide-react';

const GatewayPage = () => {
  const { gatewayId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // بيانات وهمية للمجموعات
  const mockGroups = [
    {
      id: 'group-1',
      name: 'مجموعة شراء معدات المكاتب',
      description: 'نسعى لشراء معدات مكتبية بجودة عالية وأسعار منافسة للشركات الناشئة',
      phase: 'تطلب أعضاء',
      members: 12,
      maxMembers: 25,
      location: 'الرياض، السعودية',
      requirements: 'شركات ناشئة',
      createdAt: '2024-01-15',
      status: 'recruiting',
      category: 'معدات مكتبية',
      estimatedSavings: '25-30%'
    },
    {
      id: 'group-2', 
      name: 'مجموعة تطوير تطبيقات الهاتف',
      description: 'فريق من المطورين المحترفين لتطوير تطبيقات الجوال للشركات الصغيرة',
      phase: 'تطلب مستقلين',
      members: 8,
      maxMembers: 15,
      location: 'دبي، الإمارات',
      requirements: 'مطورين Flutter/React Native',
      createdAt: '2024-01-20',
      status: 'seeking_freelancers',
      category: 'تطوير تطبيقات',
      estimatedSavings: '40-50%'
    },
    {
      id: 'group-3',
      name: 'مجموعة موردي المواد الغذائية',
      description: 'شبكة موردين للمواد الغذائية الطازجة والمعلبة للمطاعم والفنادق',
      phase: 'تطلب موردين',
      members: 15,
      maxMembers: 30,
      location: 'القاهرة، مصر',
      requirements: 'موردين معتمدين',
      createdAt: '2024-01-10',
      status: 'seeking_suppliers',
      category: 'مواد غذائية',
      estimatedSavings: '20-35%'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recruiting': return 'bg-blue-100 text-blue-800';
      case 'seeking_freelancers': return 'bg-purple-100 text-purple-800';
      case 'seeking_suppliers': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseDisplayName = (phase: string) => {
    switch (phase) {
      case 'تطلب أعضاء': return 'تطلب أعضاء';
      case 'تطلب مستقلين': return 'تطلب مستقلين';
      case 'تطلب موردين': return 'تطلب موردين';
      case 'نشطة': return 'نشطة';
      default: return phase;
    }
  };

  const handleJoinGroup = (groupId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/group/${groupId}/join`);
  };

  const handleContactGroup = (groupId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/group/${groupId}/contact`);
  };

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || group.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            الرئيسية
          </Button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">بوابة {gatewayId}</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            المجموعات النشطة في البوابة
          </h1>
          <p className="text-gray-600">
            اكتشف المجموعات المتاحة وانضم إلى التي تناسب احتياجاتك
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في المجموعات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              size="sm"
            >
              الكل
            </Button>
            <Button
              variant={filterStatus === 'recruiting' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('recruiting')}
              size="sm"
            >
              تطلب أعضاء
            </Button>
            <Button
              variant={filterStatus === 'seeking_freelancers' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('seeking_freelancers')}
              size="sm"
            >
              تطلب مستقلين
            </Button>
            <Button
              variant={filterStatus === 'seeking_suppliers' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('seeking_suppliers')}
              size="sm"
            >
              تطلب موردين
            </Button>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-xl transition-all duration-300 hover:scale-102">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge className={getStatusColor(group.status)}>
                    {getPhaseDisplayName(group.phase)}
                  </Badge>
                  <div className="text-left">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      {group.members}/{group.maxMembers}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight line-clamp-2">
                  {group.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {group.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {group.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(group.createdAt).toLocaleDateString('ar')}
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Star className="w-4 h-4" />
                    توفير متوقع: {group.estimatedSavings}
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500 mb-3">
                    المتطلبات: {group.requirements}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleJoinGroup(group.id)}
                    >
                      <UserPlus className="w-4 h-4 ml-1" />
                      انضم
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleContactGroup(group.id)}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                لا توجد مجموعات مطابقة
              </h3>
              <p className="text-gray-600 mb-4">
                جرب تغيير المرشحات أو مصطلحات البحث
              </p>
              <Button onClick={() => navigate('/create-group')}>
                إنشاء مجموعة جديدة
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GatewayPage;
