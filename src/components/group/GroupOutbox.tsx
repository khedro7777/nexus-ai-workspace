
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Send, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Users,
  Mail,
  MessageSquare,
  Bell,
  FileText,
  Zap
} from 'lucide-react';

interface GroupOutboxProps {
  groupId: string;
}

const GroupOutbox: React.FC<GroupOutboxProps> = ({ groupId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [newMessage, setNewMessage] = useState({
    type: 'notification',
    subject: '',
    content: '',
    recipients: 'all',
    priority: 'medium',
    schedule: 'now'
  });

  // Mock sent messages
  const sentMessages = [
    {
      id: '1',
      type: 'notification',
      subject: 'إعلان عن اجتماع المجموعة القادم',
      content: 'يسرنا دعوتكم لحضور اجتماع المجموعة القادم يوم الأحد...',
      recipients: ['جميع الأعضاء'],
      recipients_count: 12,
      sent_at: '2024-01-20T09:00:00Z',
      status: 'delivered',
      read_count: 8,
      priority: 'high',
      category: 'meeting'
    },
    {
      id: '2',
      type: 'update',
      subject: 'تحديث حالة طلب التوريد',
      content: 'تم استلام عروض جديدة من الموردين وسيتم مراجعتها...',
      recipients: ['المشرفين', 'أحمد محمد', 'فاطمة أحمد'],
      recipients_count: 5,
      sent_at: '2024-01-19T15:30:00Z',
      status: 'delivered',
      read_count: 4,
      priority: 'medium',
      category: 'procurement'
    },
    {
      id: '3',
      type: 'reminder',
      subject: 'تذكير: موعد انتهاء التصويت',
      content: 'نذكركم بأن موعد انتهاء التصويت على اقتراح الميزانية...',
      recipients: ['جميع الأعضاء'],
      recipients_count: 12,
      sent_at: '2024-01-18T12:00:00Z',
      status: 'delivered',
      read_count: 10,
      priority: 'medium',
      category: 'voting'
    },
    {
      id: '4',
      type: 'announcement',
      subject: 'الإعلان عن قرار المجموعة بشأن المورد المختار',
      content: 'بناءً على نتائج التصويت، تم اختيار شركة التقنية المتطورة...',
      recipients: ['جميع الأعضاء', 'الموردين المشاركين'],
      recipients_count: 18,
      sent_at: '2024-01-17T10:15:00Z',
      status: 'delivered',
      read_count: 16,
      priority: 'high',
      category: 'decision'
    }
  ];

  const filteredMessages = sentMessages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'notification': return <Bell className="w-4 h-4 text-blue-500" />;
      case 'update': return <FileText className="w-4 h-4 text-green-500" />;
      case 'reminder': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'announcement': return <Zap className="w-4 h-4 text-purple-500" />;
      default: return <Mail className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.subject.trim() || !newMessage.content.trim()) return;

    // Mock sending logic
    console.log('Sending message:', newMessage);
    
    setNewMessage({
      type: 'notification',
      subject: '',
      content: '',
      recipients: 'all',
      priority: 'medium',
      schedule: 'now'
    });
    setShowCompose(false);
  };

  return (
    <Card className="h-[800px]">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            صندوق الصادرات
          </CardTitle>
          <Button onClick={() => setShowCompose(!showCompose)}>
            <Plus className="w-4 h-4 ml-2" />
            رسالة جديدة
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="البحث في الرسائل المرسلة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {showCompose && (
          <div className="border-b p-4 space-y-4 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <Select value={newMessage.type} onValueChange={(value) => setNewMessage(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="نوع الرسالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notification">إشعار</SelectItem>
                  <SelectItem value="update">تحديث</SelectItem>
                  <SelectItem value="reminder">تذكير</SelectItem>
                  <SelectItem value="announcement">إعلان</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={newMessage.recipients} onValueChange={(value) => setNewMessage(prev => ({ ...prev, recipients: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="المستقبلون" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأعضاء</SelectItem>
                  <SelectItem value="admins">المشرفين فقط</SelectItem>
                  <SelectItem value="members">الأعضاء فقط</SelectItem>
                  <SelectItem value="custom">تحديد يدوي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input
              placeholder="موضوع الرسالة"
              value={newMessage.subject}
              onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
            />

            <Textarea
              placeholder="محتوى الرسالة"
              value={newMessage.content}
              onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
            />

            <div className="grid grid-cols-2 gap-4">
              <Select value={newMessage.priority} onValueChange={(value) => setNewMessage(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">عالية</SelectItem>
                  <SelectItem value="medium">متوسطة</SelectItem>
                  <SelectItem value="low">منخفضة</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={newMessage.schedule} onValueChange={(value) => setNewMessage(prev => ({ ...prev, schedule: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="وقت الإرسال" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">إرسال فوري</SelectItem>
                  <SelectItem value="scheduled">جدولة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4 ml-2" />
                إرسال
              </Button>
              <Button variant="outline" onClick={() => setShowCompose(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        )}

        <div className="divide-y max-h-[600px] overflow-y-auto">
          {filteredMessages.map((message) => (
            <div key={message.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getTypeIcon(message.type)}
                  <div>
                    <h3 className="font-medium text-sm">{message.subject}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>إلى: {message.recipients.join(', ')}</span>
                      <span>•</span>
                      <span>{message.recipients_count} مستقبل</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(message.priority)}>
                    {message.priority === 'high' ? 'عالية' :
                     message.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                  </Badge>
                  {getStatusIcon(message.status)}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {message.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>أرسل في: {new Date(message.sent_at).toLocaleString('ar')}</span>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>قرأه {message.read_count} من {message.recipients_count}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    تفاصيل
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <div className="p-12 text-center">
            <Send className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد رسائل مرسلة</h3>
            <p className="text-gray-600">
              {searchTerm ? 'لا توجد رسائل تطابق البحث' : 'لم ترسل أي رسائل بعد'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupOutbox;
