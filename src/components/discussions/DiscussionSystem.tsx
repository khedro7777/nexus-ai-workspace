// نظام المناقشات المتقدم مع فئات وتفاعل
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  MessageSquare, 
  Plus, 
  ThumbsUp, 
  Reply, 
  Share, 
  Filter,
  Search,
  Clock,
  User,
  Flag,
  Pin,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface DiscussionSystemProps {
  groupId: string;
}

const DiscussionSystem: React.FC<DiscussionSystemProps> = ({ groupId }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    category: '',
    priority: 'متوسط'
  });

  // فئات المناقشات
  const categories = [
    { id: 'general', name: 'عام', color: 'bg-blue-100 text-blue-800', icon: '💬' },
    { id: 'technical', name: 'تقني', color: 'bg-purple-100 text-purple-800', icon: '🔧' },
    { id: 'financial', name: 'مالي', color: 'bg-green-100 text-green-800', icon: '💰' },
    { id: 'legal', name: 'قانوني', color: 'bg-red-100 text-red-800', icon: '⚖️' },
    { id: 'marketing', name: 'تسويق', color: 'bg-orange-100 text-orange-800', icon: '📢' },
    { id: 'operations', name: 'عمليات', color: 'bg-yellow-100 text-yellow-800', icon: '⚙️' },
    { id: 'strategy', name: 'استراتيجي', color: 'bg-indigo-100 text-indigo-800', icon: '🎯' }
  ];

  // بيانات المناقشات المحاكية
  const discussions = [
    {
      id: '1',
      title: 'مناقشة استراتيجية الشراء للربع القادم',
      content: 'نحتاج لمناقشة خطة الشراء للربع القادم وتحديد الأولويات والموردين المفضلين...',
      author: 'أحمد محمد',
      category: 'strategy',
      priority: 'عالي',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      replies: 8,
      likes: 12,
      isPinned: true,
      lastActivity: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '2',
      title: 'تحديثات تقنية للمنصة',
      content: 'بعض التحديثات التقنية المطلوبة للمنصة لتحسين الأداء والأمان...',
      author: 'فاطمة أحمد',
      category: 'technical',
      priority: 'متوسط',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      replies: 5,
      likes: 7,
      isPinned: false,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'مراجعة البنود المالية للعقد',
      content: 'نحتاج لمراجعة البنود المالية في العقد المقترح من المورد الجديد...',
      author: 'محمد علي',
      category: 'financial',
      priority: 'عالي',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      replies: 12,
      likes: 18,
      isPinned: false,
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: '4',
      title: 'حملة تسويقية للمنتج الجديد',
      content: 'اقتراحات للحملة التسويقية للمنتج الجديد والقنوات المفضلة للوصول للعملاء...',
      author: 'نور حسن',
      category: 'marketing',
      priority: 'منخفض',
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      replies: 3,
      likes: 9,
      isPinned: false,
      lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ];

  // فلترة المناقشات
  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = !selectedCategory || discussion.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // إحصائيات المناقشات
  const stats = {
    total: discussions.length,
    active: discussions.filter(d => 
      new Date().getTime() - d.lastActivity.getTime() < 24 * 60 * 60 * 1000
    ).length,
    highPriority: discussions.filter(d => d.priority === 'عالي').length,
    totalReplies: discussions.reduce((sum, d) => sum + d.replies, 0)
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالي': return 'bg-red-100 text-red-800';
      case 'متوسط': return 'bg-yellow-100 text-yellow-800';
      case 'منخفض': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeAgo = (date: Date) => {
    const diff = new Date().getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `منذ ${days} يوم`;
    if (hours > 0) return `منذ ${hours} ساعة`;
    return 'منذ قليل';
  };

  const handleCreateDiscussion = () => {
    if (!newDiscussion.title || !newDiscussion.content || !newDiscussion.category) {
      return;
    }
    
    // هنا سيتم إرسال المناقشة إلى الخادم
    console.log('Creating discussion:', newDiscussion);
    
    // إعادة تعيين النموذج
    setNewDiscussion({
      title: '',
      content: '',
      category: '',
      priority: 'متوسط'
    });
    setShowNewDiscussion(false);
  };

  return (
    <div className="space-y-6">
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-gray-600 text-sm">إجمالي المناقشات</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                <p className="text-gray-600 text-sm">نشطة اليوم</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
                <p className="text-gray-600 text-sm">أولوية عالية</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.totalReplies}</p>
                <p className="text-gray-600 text-sm">إجمالي الردود</p>
              </div>
              <Reply className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* أدوات التحكم */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* البحث */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="ابحث في المناقشات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            {/* فلتر الفئة */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="جميع الفئات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع الفئات</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* زر إنشاء مناقشة جديدة */}
            <Dialog open={showNewDiscussion} onOpenChange={setShowNewDiscussion}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  مناقشة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إنشاء مناقشة جديدة</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">عنوان المناقشة</Label>
                    <Input
                      id="title"
                      value={newDiscussion.title}
                      onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                      placeholder="اكتب عنوان المناقشة..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">الفئة</Label>
                      <Select value={newDiscussion.category} onValueChange={(value) => setNewDiscussion({...newDiscussion, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.icon} {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="priority">الأولوية</Label>
                      <Select value={newDiscussion.priority} onValueChange={(value) => setNewDiscussion({...newDiscussion, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="عالي">عالي</SelectItem>
                          <SelectItem value="متوسط">متوسط</SelectItem>
                          <SelectItem value="منخفض">منخفض</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">المحتوى</Label>
                    <Textarea
                      id="content"
                      value={newDiscussion.content}
                      onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                      placeholder="اكتب محتوى المناقشة..."
                      rows={6}
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button onClick={handleCreateDiscussion} className="flex-1">
                      <CheckCircle className="w-4 h-4 ml-2" />
                      إنشاء المناقشة
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewDiscussion(false)}>
                      إلغاء
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* قائمة المناقشات */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion) => {
          const categoryInfo = getCategoryInfo(discussion.category);
          
          return (
            <Card key={discussion.id} className="hover:shadow-md transition-all duration-200">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* رأس المناقشة */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {discussion.isPinned && (
                          <Pin className="w-4 h-4 text-blue-500" />
                        )}
                        <h3 className="text-lg font-semibold line-clamp-1">
                          {discussion.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={categoryInfo.color}>
                          {categoryInfo.icon} {categoryInfo.name}
                        </Badge>
                        <Badge className={getPriorityColor(discussion.priority)}>
                          {discussion.priority}
                        </Badge>
                        {discussion.isPinned && (
                          <Badge variant="outline">
                            <Pin className="w-3 h-3 ml-1" />
                            مثبت
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 line-clamp-2 mb-3">
                        {discussion.content}
                      </p>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* معلومات المناقشة */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{discussion.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{getTimeAgo(discussion.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{discussion.replies} رد</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{discussion.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Reply className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* آخر نشاط */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 border-t pt-3">
                    <Clock className="w-3 h-3" />
                    <span>آخر نشاط: {getTimeAgo(discussion.lastActivity)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {filteredDiscussions.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مناقشات</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || selectedCategory ? 'لا توجد نتائج تطابق البحث' : 'ابدأ مناقشة جديدة لتبادل الأفكار مع الأعضاء'}
                </p>
                <Button onClick={() => setShowNewDiscussion(true)} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  إنشاء مناقشة جديدة
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DiscussionSystem;