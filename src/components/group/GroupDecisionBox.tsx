
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Scale, 
  Plus, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  Target,
  Gavel
} from 'lucide-react';

interface GroupDecisionBoxProps {
  groupId: string;
  userAccess: any;
}

const GroupDecisionBox: React.FC<GroupDecisionBoxProps> = ({ groupId, userAccess }) => {
  const [showCreateDecision, setShowCreateDecision] = useState(false);
  const [newDecision, setNewDecision] = useState({
    title: '',
    description: '',
    options: ['موافق', 'غير موافق'],
    deadline: '',
    quorum: 66
  });

  // Mock decisions data
  const decisions = [
    {
      id: '1',
      title: 'الموافقة على اختيار شركة التقنية المتطورة كمورد رئيسي',
      description: 'بناءً على تقييم العروض المقدمة، نقترح اختيار شركة التقنية المتطورة كمورد رئيسي للمشروع. العرض يتضمن أفضل جودة وسعر مناسب مع ضمان شامل.',
      created_by: 'أحمد محمد',
      created_by_role: 'مؤسس المجموعة',
      created_at: '2024-01-20T09:00:00Z',
      deadline: '2024-01-25T18:00:00Z',
      status: 'active',
      quorum_required: 66,
      total_members: 12,
      votes_cast: 8,
      options: [
        { id: '1', text: 'موافق', votes: 6, percentage: 75 },
        { id: '2', text: 'غير موافق', votes: 2, percentage: 25 }
      ],
      impact: 'high',
      category: 'procurement',
      attachments: ['تقرير_تقييم_الموردين.pdf', 'مقارنة_الأسعار.xlsx'],
      discussion_count: 15
    },
    {
      id: '2',
      title: 'تعديل آلية توزيع الأرباح للربع القادم',
      description: 'اقتراح تعديل آلية توزيع الأرباح لتشمل مكافآت الأداء وحوافز الجودة للأعضاء الأكثر مساهمة في نجاح المجموعة.',
      created_by: 'فاطمة أحمد',
      created_by_role: 'مشرف مالي',
      created_at: '2024-01-18T14:00:00Z',
      deadline: '2024-01-23T18:00:00Z',
      status: 'pending_review',
      quorum_required: 60,
      total_members: 12,
      votes_cast: 5,
      options: [
        { id: '1', text: 'موافق على التعديل', votes: 3, percentage: 60 },
        { id: '2', text: 'غير موافق', votes: 1, percentage: 20 },
        { id: '3', text: 'نحتاج تفاصيل أكثر', votes: 1, percentage: 20 }
      ],
      impact: 'medium',
      category: 'financial',
      attachments: ['نموذج_توزيع_الأرباح_الجديد.pdf'],
      discussion_count: 8
    },
    {
      id: '3',
      title: 'إضافة عضو جديد للمجموعة - محمد علي السالم',
      description: 'طلب انضمام من محمد علي السالم، مدير مبيعات مع خبرة 8 سنوات. تم تقييم مؤهلاته وهي تتماشى مع احتياجات المجموعة.',
      created_by: 'أحمد محمد',
      created_by_role: 'مؤسس المجموعة',
      created_at: '2024-01-17T10:00:00Z',
      deadline: '2024-01-22T18:00:00Z',
      status: 'completed',
      quorum_required: 50,
      total_members: 12,
      votes_cast: 12,
      options: [
        { id: '1', text: 'موافق على الانضمام', votes: 10, percentage: 83 },
        { id: '2', text: 'غير موافق', votes: 2, percentage: 17 }
      ],
      impact: 'low',
      category: 'membership',
      attachments: ['CV_محمد_علي_السالم.pdf'],
      discussion_count: 3,
      result: 'approved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending_review': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'pending_review': return <Eye className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryName = (category: string) => {
    const categories = {
      'procurement': 'شراء وتوريد',
      'financial': 'مالي',
      'membership': 'عضوية',
      'governance': 'حوكمة',
      'operational': 'تشغيلي'
    };
    return categories[category] || category;
  };

  const getRemainingTime = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'انتهت المهلة';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} يوم متبقي`;
    return `${hours} ساعة متبقية`;
  };

  const calculateProgress = (decision: any) => {
    return (decision.votes_cast / decision.total_members) * 100;
  };

  const createDecision = () => {
    if (!newDecision.title.trim() || !newDecision.description.trim()) return;
    
    console.log('Creating decision:', newDecision);
    setNewDecision({
      title: '',
      description: '',
      options: ['موافق', 'غير موافق'],
      deadline: '',
      quorum: 66
    });
    setShowCreateDecision(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              صندوق القرارات
            </CardTitle>
            {userAccess.canManage && (
              <Button onClick={() => setShowCreateDecision(!showCreateDecision)}>
                <Plus className="w-4 h-4 ml-2" />
                قرار جديد
              </Button>
            )}
          </div>
        </CardHeader>

        {showCreateDecision && (
          <CardContent className="border-t bg-gray-50">
            <div className="space-y-4">
              <Input
                placeholder="عنوان القرار"
                value={newDecision.title}
                onChange={(e) => setNewDecision(prev => ({ ...prev, title: e.target.value }))}
              />
              
              <Textarea
                placeholder="وصف تفصيلي للقرار وأسبابه"
                value={newDecision.description}
                onChange={(e) => setNewDecision(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">تاريخ انتهاء التصويت:</label>
                  <Input
                    type="datetime-local"
                    value={newDecision.deadline}
                    onChange={(e) => setNewDecision(prev => ({ ...prev, deadline: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">نسبة النصاب المطلوبة (%):</label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={newDecision.quorum}
                    onChange={(e) => setNewDecision(prev => ({ ...prev, quorum: parseInt(e.target.value) || 66 }))}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={createDecision}>
                  <Gavel className="w-4 h-4 ml-2" />
                  إنشاء القرار
                </Button>
                <Button variant="outline" onClick={() => setShowCreateDecision(false)}>
                  إلغاء
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Decision Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{decisions.filter(d => d.status === 'active').length}</div>
            <div className="text-sm text-gray-600">قرارات نشطة</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{decisions.filter(d => d.status === 'completed').length}</div>
            <div className="text-sm text-gray-600">قرارات مكتملة</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{decisions.filter(d => d.status === 'pending_review').length}</div>
            <div className="text-sm text-gray-600">قيد المراجعة</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">
              {Math.round(decisions.reduce((acc, d) => acc + calculateProgress(d), 0) / decisions.length)}%
            </div>
            <div className="text-sm text-gray-600">متوسط المشاركة</div>
          </CardContent>
        </Card>
      </div>

      {/* Decisions List */}
      <div className="space-y-4">
        {decisions.map((decision) => (
          <Card key={decision.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{decision.title}</h3>
                    <Badge className={getStatusColor(decision.status)}>
                      {getStatusIcon(decision.status)}
                      <span className="mr-1">
                        {decision.status === 'active' ? 'نشط' :
                         decision.status === 'pending_review' ? 'قيد المراجعة' :
                         decision.status === 'completed' ? 'مكتمل' : 'مرفوض'}
                      </span>
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{decision.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback>{decision.created_by.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{decision.created_by}</span>
                      <Badge variant="outline" className="text-xs">{decision.created_by_role}</Badge>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(decision.created_at).toLocaleDateString('ar')}</span>
                    </div>
                    
                    <Badge className={`text-xs ${getImpactColor(decision.impact)}`}>
                      تأثير {decision.impact === 'high' ? 'عالي' : decision.impact === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                    
                    <Badge variant="outline" className="text-xs">
                      {getCategoryName(decision.category)}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {decision.votes_cast}/{decision.total_members} صوت
                  </div>
                  <div className="text-xs text-gray-500">
                    نصاب: {decision.quorum_required}%
                  </div>
                  {decision.status === 'active' && (
                    <div className="text-xs text-orange-600 mt-1">
                      {getRemainingTime(decision.deadline)}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Voting Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>نسبة المشاركة</span>
                  <span>{Math.round(calculateProgress(decision))}%</span>
                </div>
                <Progress value={calculateProgress(decision)} className="h-2 mb-3" />
                
                {/* Voting Options */}
                <div className="space-y-2">
                  {decision.options.map((option) => (
                    <div key={option.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{option.text}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">{option.votes} أصوات</span>
                        <div className="w-20">
                          <Progress value={option.percentage} className="h-1" />
                        </div>
                        <span className="text-sm font-bold w-12 text-right">{option.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision Result */}
              {decision.status === 'completed' && decision.result && (
                <div className={`p-3 rounded-lg mb-4 ${
                  decision.result === 'approved' ? 'bg-green-50 border border-green-200' :
                  'bg-red-50 border border-red-200'
                }`}>
                  <div className={`flex items-center gap-2 ${
                    decision.result === 'approved' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {decision.result === 'approved' ? 
                      <CheckCircle className="w-5 h-5" /> : 
                      <XCircle className="w-5 h-5" />
                    }
                    <span className="font-medium">
                      {decision.result === 'approved' ? 'تم اعتماد القرار' : 'تم رفض القرار'}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {decision.attachments && decision.attachments.length > 0 && (
                    <Button variant="outline" size="sm">
                      المرفقات ({decision.attachments.length})
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 ml-2" />
                    المناقشة ({decision.discussion_count})
                  </Button>
                </div>
                
                {decision.status === 'active' && (
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <ThumbsUp className="w-4 h-4 ml-2" />
                      موافق
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-800">
                      <ThumbsDown className="w-4 h-4 ml-2" />
                      غير موافق
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroupDecisionBox;
