
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  MessageSquare, 
  Plus, 
  Reply, 
  Heart, 
  Flag, 
  MoreHorizontal,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircleQuestion,
  Lightbulb,
  AlertTriangle,
  Info
} from 'lucide-react';

interface LoomioDiscussionsProps {
  groupId: string;
}

interface Discussion {
  id: string;
  title: string;
  description: string;
  type: 'general' | 'proposal' | 'announcement' | 'question';
  status: 'open' | 'closed' | 'decided';
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  replies_count: number;
  participants_count: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
  deadline?: string;
  decision?: string;
  attachments?: string[];
}

interface Reply {
  id: string;
  discussion_id: string;
  content: string;
  author_id: string;
  author_name: string;
  created_at: string;
  parent_id?: string;
  position: 'agree' | 'disagree' | 'abstain' | 'block' | 'neutral';
  likes: number;
  replies: Reply[];
}

const LoomioDiscussions: React.FC<LoomioDiscussionsProps> = ({ groupId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    description: '',
    type: 'general' as const,
    priority: 'medium' as const,
    tags: [] as string[],
    deadline: ''
  });
  const [newReply, setNewReply] = useState({
    content: '',
    position: 'neutral' as const
  });
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDiscussions();
  }, [groupId]);

  const fetchDiscussions = async () => {
    try {
      // Mock data - replace with actual Supabase query
      const mockDiscussions: Discussion[] = [
        {
          id: '1',
          title: 'اختيار مورد النظام الجديد',
          description: 'نحتاج لمناقشة العروض المقدمة واتخاذ قرار نهائي',
          type: 'proposal',
          status: 'open',
          author_id: user?.id || '',
          author_name: 'أحمد محمد',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          replies_count: 12,
          participants_count: 8,
          priority: 'high',
          tags: ['توريد', 'نظام', 'قرار'],
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          title: 'تحديث لائحة المجموعة',
          description: 'إعلان عن التحديثات الجديدة في لائحة المجموعة',
          type: 'announcement',
          status: 'open',
          author_id: user?.id || '',
          author_name: 'فاطمة أحمد',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          replies_count: 5,
          participants_count: 15,
          priority: 'medium',
          tags: ['لائحة', 'تحديث']
        }
      ];
      setDiscussions(mockDiscussions);
    } catch (error) {
      toast({
        title: "خطأ في تحميل المناقشات",
        description: "حدث خطأ أثناء تحميل المناقشات",
        variant: "destructive"
      });
    }
  };

  const createDiscussion = async () => {
    if (!newDiscussion.title.trim() || !newDiscussion.description.trim()) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Mock creation - replace with actual Supabase insert
      const discussion: Discussion = {
        id: Date.now().toString(),
        ...newDiscussion,
        author_id: user?.id || '',
        author_name: user?.name || 'مجهول', // Use name instead of user_metadata.full_name
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        replies_count: 0,
        participants_count: 1,
        status: 'open'
      };

      setDiscussions(prev => [discussion, ...prev]);
      setNewDiscussion({
        title: '',
        description: '',
        type: 'general',
        priority: 'medium',
        tags: [],
        deadline: ''
      });
      setShowNewDiscussion(false);

      toast({
        title: "تم إنشاء المناقشة",
        description: "تم إنشاء المناقشة بنجاح"
      });
    } catch (error) {
      toast({
        title: "خطأ في الإنشاء",
        description: "حدث خطأ أثناء إنشاء المناقشة",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addReply = async () => {
    if (!newReply.content.trim() || !selectedDiscussion) return;

    setLoading(true);
    try {
      // Mock reply creation
      const reply: Reply = {
        id: Date.now().toString(),
        discussion_id: selectedDiscussion.id,
        content: newReply.content,
        author_id: user?.id || '',
        author_name: user?.name || 'مجهول', // Use name instead of user_metadata.full_name
        created_at: new Date().toISOString(),
        position: newReply.position,
        likes: 0,
        replies: []
      };

      setReplies(prev => [...prev, reply]);
      setNewReply({ content: '', position: 'neutral' });

      toast({
        title: "تم إضافة الرد",
        description: "تم إضافة ردك بنجاح"
      });
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "حدث خطأ أثناء إرسال الرد",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getDiscussionIcon = (type: string) => {
    switch (type) {
      case 'proposal': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'announcement': return <Info className="w-4 h-4 text-blue-500" />;
      case 'question': return <MessageCircleQuestion className="w-4 h-4 text-green-500" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'agree': return 'text-green-600';
      case 'disagree': return 'text-red-600';
      case 'block': return 'text-red-800';
      case 'abstain': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  if (selectedDiscussion) {
    return (
      <Card className="h-[800px] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setSelectedDiscussion(null)}>
              ← العودة للمناقشات
            </Button>
            <div className="flex items-center gap-2">
              {getDiscussionIcon(selectedDiscussion.type)}
              <Badge className={getPriorityColor(selectedDiscussion.priority)}>
                {selectedDiscussion.priority === 'urgent' ? 'عاجل' : 
                 selectedDiscussion.priority === 'high' ? 'مرتفع' :
                 selectedDiscussion.priority === 'medium' ? 'متوسط' : 'منخفض'}
              </Badge>
            </div>
          </div>
          <CardTitle className="text-xl">{selectedDiscussion.title}</CardTitle>
          <p className="text-gray-600">{selectedDiscussion.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{selectedDiscussion.participants_count} مشارك</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{selectedDiscussion.replies_count} رد</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{new Date(selectedDiscussion.created_at).toLocaleDateString('ar')}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-full">
          {/* Replies Section */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {replies.map((reply) => (
              <div key={reply.id} className="border-l-4 border-blue-200 pl-4 py-2">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{reply.author_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{reply.author_name}</span>
                      <Badge variant="outline" className={`text-xs ${getPositionColor(reply.position)}`}>
                        {reply.position === 'agree' ? 'موافق' :
                         reply.position === 'disagree' ? 'معارض' :
                         reply.position === 'block' ? 'اعتراض' :
                         reply.position === 'abstain' ? 'امتناع' : 'محايد'}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(reply.created_at).toLocaleString('ar')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{reply.content}</p>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Heart className="w-3 h-3 ml-1" />
                        {reply.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Reply className="w-3 h-3 ml-1" />
                        رد
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Input */}
          <div className="border-t p-4 space-y-4">
            <div className="flex gap-2">
              <Select value={newReply.position} onValueChange={(value) => setNewReply(prev => ({ ...prev, position: value as any }))}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agree">موافق</SelectItem>
                  <SelectItem value="disagree">معارض</SelectItem>
                  <SelectItem value="abstain">امتناع</SelectItem>
                  <SelectItem value="block">اعتراض</SelectItem>
                  <SelectItem value="neutral">محايد</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Textarea
                placeholder="اكتب ردك هنا..."
                value={newReply.content}
                onChange={(e) => setNewReply(prev => ({ ...prev, content: e.target.value }))}
                className="flex-1"
                rows={3}
              />
              <Button onClick={addReply} disabled={loading || !newReply.content.trim()}>
                <Reply className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[800px]">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            المناقشات الجماعية
          </CardTitle>
          <Button onClick={() => setShowNewDiscussion(true)}>
            <Plus className="w-4 h-4 ml-2" />
            مناقشة جديدة
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {showNewDiscussion && (
          <div className="border-b p-4 space-y-4 bg-gray-50">
            <Input
              placeholder="عنوان المناقشة"
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              placeholder="وصف المناقشة أو السؤال"
              value={newDiscussion.description}
              onChange={(e) => setNewDiscussion(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
            <div className="flex gap-2">
              <Select value={newDiscussion.type} onValueChange={(value) => setNewDiscussion(prev => ({ ...prev, type: value as any }))}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">عام</SelectItem>
                  <SelectItem value="proposal">اقتراح</SelectItem>
                  <SelectItem value="announcement">إعلان</SelectItem>
                  <SelectItem value="question">سؤال</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={newDiscussion.priority} onValueChange={(value) => setNewDiscussion(prev => ({ ...prev, priority: value as any }))}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">عاجل</SelectItem>
                  <SelectItem value="high">مرتفع</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="low">منخفض</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={createDiscussion} disabled={loading}>
                إنشاء المناقشة
              </Button>
              <Button variant="outline" onClick={() => setShowNewDiscussion(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        )}

        <div className="divide-y max-h-[600px] overflow-y-auto">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedDiscussion(discussion)}>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getDiscussionIcon(discussion.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm">{discussion.title}</h3>
                    <Badge className={getPriorityColor(discussion.priority)} variant="outline">
                      {discussion.priority === 'urgent' ? 'عاجل' : 
                       discussion.priority === 'high' ? 'مرتفع' :
                       discussion.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                    {discussion.status === 'open' && (
                      <Badge variant="outline" className="text-green-600">مفتوح</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{discussion.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{discussion.author_name}</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{discussion.participants_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{discussion.replies_count}</span>
                    </div>
                    <span>{new Date(discussion.created_at).toLocaleDateString('ar')}</span>
                  </div>
                  {discussion.tags.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {discussion.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoomioDiscussions;
