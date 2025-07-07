
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Filter, 
  Clock, 
  MapPin, 
  Star,
  MessageSquare,
  UserPlus,
  Eye,
  TrendingUp,
  Shield,
  Award,
  Target
} from 'lucide-react';

const GatewayPage = () => {
  const { gatewayId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [phaseFilter, setPhaseFilter] = useState('all');

  // Mock data for groups
  const mockGroups = [
    {
      id: '1',
      name: 'مجموعة شراء الحاسوب المكتبي',
      description: 'شراء جماعي لأجهزة الحاسوب المكتبية للشركات الصغيرة والمتوسطة',
      phase: 'جمع الأعضاء',
      status: 'تطلب أعضاء',
      memberCount: 12,
      targetMembers: 25,
      location: 'الرياض، السعودية',
      estimatedSavings: '25%',
      rating: 4.8,
      createdAt: '2024-01-15',
      requirements: ['KYC مطلوب', 'نقاط مطلوبة'],
      tags: ['تقنية', 'مكاتب', 'أجهزة']
    },
    {
      id: '2',
      name: 'مجموعة تسويق المطاعم',
      description: 'حملة تسويقية مشتركة لأصحاب المطاعم في المنطقة الشرقية',
      phase: 'مرحلة التخطيط',
      status: 'نشط',
      memberCount: 8,
      targetMembers: 15,
      location: 'الدمام، السعودية',
      estimatedSavings: '40%',
      rating: 4.5,
      createdAt: '2024-01-20',
      requirements: ['KYC مطلوب'],
      tags: ['تسويق', 'مطاعم', 'غذاء']
    },
    {
      id: '3',
      name: 'مجموعة استيراد المواد الخام',
      description: 'استيراد جماعي للمواد الخام الصناعية من الصين',
      phase: 'مرحلة التفاوض',
      status: 'تطلب موردين',
      memberCount: 20,
      targetMembers: 30,
      location: 'جدة، السعودية',
      estimatedSavings: '35%',
      rating: 4.9,
      createdAt: '2024-01-10',
      requirements: ['KYC مطلوب', 'نقاط مطلوبة'],
      tags: ['استيراد', 'صناعة', 'مواد خام']
    }
  ];

  const gatewayTitles = {
    'cooperative-purchasing': 'الشراء التعاوني',
    'cooperative-marketing': 'التسويق التعاوني',
    'company-formation': 'تأسيس الشركات',
    'investment-groups': 'مجموعات الاستثمار',
    'suppliers': 'الموردين',
    'freelancers': 'المستقلين',
    'freelancer-groups': 'مجموعات المستقلين',
    'service-providers': 'مقدمو الخدمات',
    'product-listings': 'عرض المنتجات',
    'arbitration-documentation': 'التحكيم والتوثيق',
    'arbitration-requests': 'طلبات التحكيم',
    'smart-negotiation': 'حلول التفاوض الذكية'
  };

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || group.status === statusFilter;
    const matchesPhase = phaseFilter === 'all' || group.phase === phaseFilter;
    
    return matchesSearch && matchesStatus && matchesPhase;
  });

  const handleJoinGroup = (groupId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/my-groups/${groupId}`);
  };

  const handleViewGroup = (groupId: string) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {gatewayTitles[gatewayId as keyof typeof gatewayTitles] || 'البوابة'}
          </h1>
          <p className="text-gray-600 text-lg">
            استكشف المجموعات النشطة وانضم إلى التي تناسب احتياجاتك
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              البحث والتصفية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في المجموعات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="تطلب أعضاء">تطلب أعضاء</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="تطلب موردين">تطلب موردين</SelectItem>
                </SelectContent>
              </Select>

              <Select value={phaseFilter} onValueChange={setPhaseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="المرحلة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المراحل</SelectItem>
                  <SelectItem value="جمع الأعضاء">جمع الأعضاء</SelectItem>
                  <SelectItem value="مرحلة التخطيط">مرحلة التخطيط</SelectItem>
                  <SelectItem value="مرحلة التفاوض">مرحلة التفاوض</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full">
                <Target className="w-4 h-4 ml-2" />
                مزيد من الفلاتر
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {group.status}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{group.rating}</span>
                  </div>
                </div>
                
                <CardTitle className="text-lg leading-tight mb-2">
                  {group.name}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed line-clamp-2">
                  {group.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Group Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>{group.memberCount}/{group.targetMembers}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span>توفير {group.estimatedSavings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-xs">{group.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-xs">{group.phase}</span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="flex flex-wrap gap-1">
                  {group.requirements.map((req, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {group.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
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
                    onClick={() => handleViewGroup(group.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مجموعات</h3>
            <p className="text-gray-600 mb-4">لم يتم العثور على مجموعات تطابق معايير البحث</p>
            <Button onClick={() => navigate('/create-group')}>
              إنشاء مجموعة جديدة
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GatewayPage;
