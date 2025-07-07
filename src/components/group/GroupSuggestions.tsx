
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Lightbulb, 
  Plus, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Star,
  TrendingUp,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Filter
} from 'lucide-react';

interface GroupSuggestionsProps {
  groupId: string;
}

const GroupSuggestions: React.FC<GroupSuggestionsProps> = ({ groupId }) => {
  const [showAddSuggestion, setShowAddSuggestion] = useState(false);
  const [newSuggestion, setNewSuggestion] = useState({
    title: '',
    description: '',
    category: 'improvement',
    priority: 'medium'
  });
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock suggestions data
  const suggestions = [
    {
      id: '1',
      title: 'تطوير تطبيق موبايل للمجموعة',
      description: 'اقترح تطوير تطبيق جوال لتسهيل التواصل والتصويت والمتابعة بشكل أكثر سهولة للأعضاء، مع إشعارات فورية للأحداث المهمة.',
      author: 'محمد سالم',
      author_role: 'عضو',
      created_at: '2024-01-20T14:30:00Z',
      category: 'technology',
      priority: 'high',
      status: 'under_review',
      likes: 8,
      dislikes: 1,
      comments: 5,
      implementation_cost: 'متوسط',
      expected_impact: 'عالي',
      feasibility: 'ممكن',
      tags: ['تطبيق', 'موبايل', 'تطوير', 'تحسين'],
      votes_for: 8,
      votes_against: 1,
      estimated_time: '3-4 أشهر'
    },
    {
      id: '2',
      title: 'إنشاء صندوق طوارئ للمجموعة',
      description: 'اقتراح إنشاء صندوق طوارئ بنسبة 5% من الأرباح الشهرية لمواجهة أي ظروف طارئة أو فرص استثمارية مفاجئة.',
      author: 'فاطمة أحمد',
      author_role: 'مشرف مالي',
      created_at: '2024-01-19T11:15:00Z',
      category: 'financial',
      priority: 'medium',
      status: 'approved',
      likes: 12,
      dislikes: 0,
      comments: 8,
      implementation_cost: 'منخفض',
      expected_impact: 'متوسط',
      feasibility: 'سهل',
      tags: ['مالية', 'صندوق', 'طوارئ', 'أرباح'],
      votes_for: 11,
      votes_against: 1,
      estimated_time: '1 شهر'
    },
    {
      id: '3',
      title: 'برنامج تدريبي للأعضاء الجدد',
      description: 'تطوير برنامج تدريبي شامل للأعضاء الجدد يشمل آلية عمل المجموعة، التصويت، المسؤوليات، والحقوق.',
      author: 'أحمد محمد',
      author_role: 'مؤسس المجموعة',
      created_at: '2024-01-18T09:45:00Z',
      category: 'education',
      priority: 'medium',
      status: 'in_progress',
      likes: 6,
      dislikes: 0,
      comments: 3,
      implementation_cost: 'منخفض',
      expected_impact: 'عالي',
      feasibility: 'سهل',
      tags: ['تدريب', 'تعليم', 'أعضاء جدد'],
      votes_for: 10,
      votes_against: 0,
      estimated_time: '2 أسابيع'
    },
    {
      id: '4',
      title: 'نظام تقييم الأداء الشهري',
      description: 'إنشاء نظام لتقييم أداء الأعضاء بناءً على المشاركة في التصويت، المناقشات، والمساهمات البناءة.',
      author: 'سارة يوسف',
      author_role: 'عضو',
      created_at: '2024-01-17T16:20:00Z',
      category: 'governance',
      priority: 'low',
      status: 'rejected',
      likes: 3,
      dislikes: 7,
      comments: 12,
      implementation_cost: 'عالي',
      expected_impact: 'متوسط',
      feasibility: 'صعب',
      tags: ['تقييم', 'أداء', 'حوكمة'],
      votes_for: 3,
      votes_against: 8,
      estimated_time: '6 أشهر',
      rejection_reason: 'قد يؤثر سلباً على روح الفريق والتعاون'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'under_review': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <TrendingUp className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryName = (category: string) => {
    const categories = {
      'technology': 'تقنية',
      'financial': 'مالي',
      'education': 'تعليمي',
      'governance': 'حوكمة',
      'improvement': 'تحسين',
      'process': 'عمليات'
    };
    return categories[category] || category;
  };

  const filteredSuggestions = suggestions.filter(suggestion => {
    if (filterCategory === 'all') return true;
    return suggestion.category === filterCategory;
  });

  const sortedSuggestions = [...filteredSuggestions].sort((a, b) => {
    switch (sortBy) {
      case 'likes':
        return b.likes - a.likes;
      case 'priority':
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'recent':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const handleAddSuggestion = () => {
    if (!newSuggestion.title.trim() || !newSuggestion.description.trim()) return;
    
    console.log('Adding suggestion:', newSuggestion);
    setNewSuggestion({
      title: '',
      description: '',
      category: 'improvement',
      priority: 'medium'
    });
    setShowAddSuggestion(false);
  };

  return (
    <Card className="h-[800px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            صندوق الاقتراحات والأفكار
          </CardTitle>
          <Button onClick={() => setShowAddSuggestion(!showAddSuggestion)}>
            <Plus className="w-4 h-4 ml-2" />
            اقتراح جديد
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفئات</SelectItem>
              <SelectItem value="technology">تقنية</SelectItem>
              <SelectItem value="financial">مالي</SelectItem>
              <SelectItem value="education">تعليمي</SelectItem>
              <SelectItem value="governance">حوكمة</SelectItem>
              <SelectItem value="improvement">تحسين</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="ترتيب حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">الأحدث</SelectItem>
              <SelectItem value="likes">الأكثر إعجاباً</SelectItem>
              <SelectItem value="priority">الأولوية</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {showAddSuggestion && (
          <div className="border-b p-4 space-y-4 bg-gray-50">
            <Input
              placeholder="عنوان الاقتراح"
              value={newSuggestion.title}
              onChange={(e) => setNewSuggestion(prev => ({ ...prev, title: e.target.value }))}
            />
            
            <Textarea
              placeholder="وصف تفصيلي للاقتراح وفوائده المتوقعة"
              value={newSuggestion.description}
              onChange={(e) => setNewSuggestion(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />

            <div className="grid grid-cols-2 gap-4">
              <Select value={newSuggestion.category} onValueChange={(value) => setNewSuggestion(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">تقنية</SelectItem>
                  <SelectItem value="financial">مالي</SelectItem>
                  <SelectItem value="education">تعليمي</SelectItem>
                  <SelectItem value="governance">حوكمة</SelectItem>
                  <SelectItem value="improvement">تحسين</SelectItem>
                </SelectContent>
              </Select>

              <Select value={newSuggestion.priority} onValueChange={(value) => setNewSuggestion(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">عالية</SelectItem>
                  <SelectItem value="medium">متوسطة</SelectItem>
                  <SelectItem value="low">منخفضة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddSuggestion}>
                <Lightbulb className="w-4 h-4 ml-2" />
                إضافة الاقتراح
              </Button>
              <Button variant="outline" onClick={() => setShowAddSuggestion(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        )}

        {/* Suggestions List */}
        <div className="divide-y max-h-[650px] overflow-y-auto">
          {sortedSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{suggestion.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{suggestion.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{suggestion.author}</span>
                      <Badge variant="outline">{suggestion.author_role}</Badge>
                      <span>•</span>
                      <span>{new Date(suggestion.created_at).toLocaleDateString('ar')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={`${getPriorityColor(suggestion.priority)} bg-transparent border`}>
                    {suggestion.priority === 'high' ? 'عالية' :
                     suggestion.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                  </Badge>
                  <Badge className={getStatusColor(suggestion.status)}>
                    {getStatusIcon(suggestion.status)}
                    <span className="mr-1">
                      {suggestion.status === 'approved' ? 'معتمد' :
                       suggestion.status === 'under_review' ? 'قيد المراجعة' :
                       suggestion.status === 'in_progress' ? 'قيد التنفيذ' : 'مرفوض'}
                    </span>
                  </Badge>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{suggestion.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {suggestion.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Implementation Details */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-bold text-blue-800">{suggestion.implementation_cost}</div>
                  <div className="text-xs text-blue-600">التكلفة</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-green-800">{suggestion.expected_impact}</div>
                  <div className="text-xs text-green-600">التأثير المتوقع</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-purple-800">{suggestion.estimated_time}</div>
                  <div className="text-xs text-purple-600">الوقت المقدر</div>
                </div>
              </div>

              {/* Rejection Reason */}
              {suggestion.status === 'rejected' && suggestion.rejection_reason && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <div className="text-sm text-red-800">
                    <strong>سبب الرفض:</strong> {suggestion.rejection_reason}
                  </div>
                </div>
              )}

              {/* Actions and Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-green-600">
                      <ThumbsUp className="w-4 h-4 ml-1" />
                      {suggestion.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <ThumbsDown className="w-4 h-4 ml-1" />
                      {suggestion.dislikes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <MessageSquare className="w-4 h-4 ml-1" />
                      {suggestion.comments}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {getCategoryName(suggestion.category)}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {suggestion.votes_for} مؤيد • {suggestion.votes_against} معارض
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedSuggestions.length === 0 && (
          <div className="p-12 text-center">
            <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد اقتراحات</h3>
            <p className="text-gray-600">كن أول من يضيف اقتراحاً لتحسين المجموعة</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupSuggestions;
