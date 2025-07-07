
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Inbox, 
  Mail, 
  MailOpen, 
  Star, 
  Archive, 
  Trash2, 
  Reply, 
  Forward,
  Search,
  Filter,
  Clock,
  Paperclip,
  Flag,
  User
} from 'lucide-react';

interface GroupInboxProps {
  groupId: string;
}

const GroupInbox: React.FC<GroupInboxProps> = ({ groupId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  // Mock inbox messages
  const messages = [
    {
      id: '1',
      from: 'أحمد محمد',
      from_role: 'مؤسس المجموعة',
      subject: 'تحديث مهم حول اختيار المورد',
      preview: 'تم الانتهاء من مراجعة جميع العروض المقدمة ونحتاج لاجتماع عاجل...',
      content: 'السلام عليكم أعضاء المجموعة الكرام،\n\nتم الانتهاء من مراجعة جميع العروض المقدمة من الموردين، ونحتاج لعقد اجتماع عاجل لمناقشة النتائج واتخاذ القرار النهائي. أرجو من جميع الأعضاء الحضور يوم الأحد القادم الساعة 2 ظهراً.\n\nمع التحية',
      timestamp: '2024-01-20T10:30:00Z',
      read: false,
      starred: true,
      priority: 'high',
      type: 'notification',
      attachments: ['تقرير_الموردين.pdf'],
      category: 'group_management'
    },
    {
      id: '2',
      from: 'فاطمة أحمد',
      from_role: 'مشرف مالي',
      subject: 'تقرير الميزانية الشهرية',
      preview: 'إليكم تقرير الميزانية لهذا الشهر مع التحليل المفصل للمصروفات...',
      content: 'أعضاء المجموعة المحترمين،\n\nأقدم لكم تقرير الميزانية الشهرية المفصل:\n\n- إجمالي الإيرادات: 15,000 دولار\n- إجمالي المصروفات: 12,500 دولار\n- الربح الصافي: 2,500 دولار\n\nالتفاصيل كاملة في المرفق.',
      timestamp: '2024-01-19T14:15:00Z',
      read: true,
      starred: false,
      priority: 'medium',
      type: 'report',
      attachments: ['ميزانية_يناير_2024.xlsx'],
      category: 'financial'
    },
    {
      id: '3',
      from: 'محمد سالم',
      from_role: 'عضو',
      subject: 'اقتراح تحسين العملية',
      preview: 'لدي اقتراح لتحسين عملية التواصل مع الموردين من خلال منصة موحدة...',
      content: 'زملائي الأعزاء،\n\nأقترح عليكم تطوير منصة موحدة للتواصل مع الموردين بدلاً من التواصل المباشر. هذا سيوف:\n\n1. تتبع أفضل للمحادثات\n2. شفافية أكبر\n3. توثيق كامل للقرارات\n\nما رأيكم؟',
      timestamp: '2024-01-18T16:45:00Z',
      read: true,
      starred: false,
      priority: 'low',
      type: 'suggestion',
      attachments: [],
      category: 'improvement'
    },
    {
      id: '4',
      from: 'نظام المجموعة',
      from_role: 'تلقائي',
      subject: 'تذكير: موعد التصويت على القرار المالي',
      preview: 'ينتهي موعد التصويت على القرار المالي غداً الساعة 6 مساءً...',
      content: 'تذكير تلقائي:\n\nينتهي موعد التصويت على القرار المالي رقم #2024-001 غداً الساعة 6 مساءً.\n\nعدد الأصوات المسجلة حالياً: 8 من أصل 12\n\nيرجى المشاركة في التصويت لضمان اتخاذ القرار المناسب.',
      timestamp: '2024-01-17T09:00:00Z',
      read: false,
      starred: false,
      priority: 'medium',
      type: 'system',
      attachments: [],
      category: 'voting'
    }
  ];

  const filteredMessages = messages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-500';
      case 'medium': return 'border-l-4 border-yellow-500';
      case 'low': return 'border-l-4 border-green-500';
      default: return 'border-l-4 border-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'notification': return <Flag className="w-4 h-4 text-blue-500" />;
      case 'report': return <Paperclip className="w-4 h-4 text-green-500" />;
      case 'suggestion': return <Star className="w-4 h-4 text-purple-500" />;
      case 'system': return <Clock className="w-4 h-4 text-orange-500" />;
      default: return <Mail className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const categories = {
      'group_management': { name: 'إدارة المجموعة', color: 'bg-blue-100 text-blue-800' },
      'financial': { name: 'مالي', color: 'bg-green-100 text-green-800' },
      'improvement': { name: 'تحسين', color: 'bg-purple-100 text-purple-800' },
      'voting': { name: 'تصويت', color: 'bg-orange-100 text-orange-800' }
    };
    
    const cat = categories[category] || { name: category, color: 'bg-gray-100 text-gray-800' };
    return <Badge className={cat.color}>{cat.name}</Badge>;
  };

  if (selectedMessage) {
    return (
      <Card className="h-[800px] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setSelectedMessage(null)}>
              ← العودة للواردات
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Reply className="w-4 h-4 ml-2" />
                رد
              </Button>
              <Button variant="outline" size="sm">
                <Forward className="w-4 h-4 ml-2" />
                إعادة توجيه
              </Button>
              <Button variant="outline" size="sm">
                <Archive className="w-4 h-4 ml-2" />
                أرشفة
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Message Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{selectedMessage.from.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedMessage.subject}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>من: {selectedMessage.from}</span>
                    <Badge variant="outline">{selectedMessage.from_role}</Badge>
                    <span>•</span>
                    <span>{new Date(selectedMessage.timestamp).toLocaleString('ar')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {getTypeIcon(selectedMessage.type)}
                {getCategoryBadge(selectedMessage.category)}
              </div>
            </div>

            {/* Message Content */}
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">
                {selectedMessage.content}
              </pre>
            </div>

            {/* Attachments */}
            {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  المرفقات ({selectedMessage.attachments.length})
                </h4>
                <div className="space-y-2">
                  {selectedMessage.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-sm">{attachment}</span>
                      <Button variant="outline" size="sm">تحميل</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
            <Inbox className="w-5 h-5" />
            صندوق الواردات
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {filteredMessages.filter(m => !m.read).length} غير مقروءة
            </Badge>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 ml-2" />
              تصفية
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="البحث في الرسائل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y max-h-[650px] overflow-y-auto">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                !message.read ? 'bg-blue-50/50' : ''
              } ${getPriorityColor(message.priority)}`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>
                    {message.from === 'نظام المجموعة' ? 
                      <Clock className="w-5 h-5" /> : 
                      message.from.charAt(0)
                    }
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium text-sm ${!message.read ? 'font-bold' : ''}`}>
                        {message.from}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {message.from_role}
                      </Badge>
                      {message.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getTypeIcon(message.type)}
                      <span className="text-xs text-gray-500">
                        {new Date(message.timestamp).toLocaleDateString('ar')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-sm ${!message.read ? 'font-semibold' : 'font-medium'} truncate`}>
                      {message.subject}
                    </h3>
                    {getCategoryBadge(message.category)}
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {message.preview}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {!message.read && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">جديد</Badge>
                      )}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Paperclip className="w-3 h-3" />
                          <span>{message.attachments.length}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Archive className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <div className="p-12 text-center">
            <Inbox className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد رسائل</h3>
            <p className="text-gray-600">
              {searchTerm ? 'لا توجد رسائل تطابق البحث' : 'صندوق الواردات فارغ'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupInbox;
