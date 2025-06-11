
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  Settings, 
  Lightbulb,
  FileText,
  TrendingUp,
  Users,
  MessageSquare
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'mcp';
  timestamp: Date;
  type: 'text' | 'suggestion' | 'action';
}

const MCPChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'مرحباً! أنا مساعدك الذكي MCP. كيف يمكنني مساعدتك اليوم؟',
      sender: 'mcp',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<'auto' | 'manual' | 'ask'>('auto');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickSuggestions = [
    { icon: TrendingUp, text: 'تحليل السوق', action: 'market_analysis' },
    { icon: Users, text: 'إدارة المجموعات', action: 'group_management' },
    { icon: FileText, text: 'مراجعة العقود', action: 'contract_review' },
    { icon: Lightbulb, text: 'اقتراحات ذكية', action: 'smart_suggestions' }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate MCP response
    setTimeout(() => {
      const mcpResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateMCPResponse(inputMessage),
        sender: 'mcp',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, mcpResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMCPResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('مجموعة') || message.includes('group')) {
      return 'يمكنني مساعدتك في إدارة مجموعتك. هل تريد إنشاء مجموعة جديدة، أم تحتاج لمراجعة المجموعات الحالية؟';
    }
    
    if (message.includes('عقد') || message.includes('contract')) {
      return 'بالنسبة للعقود، يمكنني مساعدتك في صياغة العقود، مراجعة الشروط، أو تتبع حالة العقود الحالية. ما الذي تحتاجه تحديداً؟';
    }
    
    if (message.includes('مورد') || message.includes('supplier')) {
      return 'يمكنني مساعدتك في العثور على الموردين المناسبين، تقييم العروض، أو إدارة العلاقات مع الموردين الحاليين.';
    }
    
    return 'شكراً لك! أحاول فهم طلبك بشكل أفضل. هل يمكنك توضيح ما تحتاجه بتفصيل أكثر؟';
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: { [key: string]: string } = {
      market_analysis: 'أريد تحليل السوق الحالي لمنتجاتي',
      group_management: 'كيف يمكنني إدارة مجموعتي بشكل أفضل؟',
      contract_review: 'أحتاج مراجعة العقود الحالية',
      smart_suggestions: 'أعطني اقتراحات لتحسين أدائي'
    };

    if (actionMessages[action]) {
      setInputMessage(actionMessages[action]);
    }
  };

  const getModeColor = (currentMode: string) => {
    switch (currentMode) {
      case 'auto': return 'bg-green-500';
      case 'manual': return 'bg-blue-500';
      case 'ask': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getModeText = (currentMode: string) => {
    switch (currentMode) {
      case 'auto': return 'تلقائي';
      case 'manual': return 'يدوي';
      case 'ask': return 'استفسار';
      default: return currentMode;
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center space-x-2 space-x-reverse">
          <Bot className="w-6 h-6 text-blue-500" />
          <span>MCP - المساعد الذكي</span>
        </CardTitle>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Badge className={`text-white ${getModeColor(mode)}`}>
            {getModeText(mode)}
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Mode Selection */}
        <div className="flex space-x-2 space-x-reverse">
          {(['auto', 'manual', 'ask'] as const).map((modeOption) => (
            <Button
              key={modeOption}
              variant={mode === modeOption ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode(modeOption)}
            >
              {getModeText(modeOption)}
            </Button>
          ))}
        </div>

        {/* Quick Suggestions */}
        <div className="grid grid-cols-2 gap-2">
          {quickSuggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 space-x-reverse text-xs"
              onClick={() => handleQuickAction(suggestion.action)}
            >
              <suggestion.icon className="w-3 h-3" />
              <span>{suggestion.text}</span>
            </Button>
          ))}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-3 p-2 border rounded-lg bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border'
                }`}
              >
                <div className="flex items-start space-x-2 space-x-reverse">
                  {message.sender === 'mcp' && (
                    <Bot className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  )}
                  {message.sender === 'user' && (
                    <User className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('ar-SA', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border p-3 rounded-lg">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Bot className="w-4 h-4 text-blue-500" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="flex space-x-2 space-x-reverse">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button variant="outline" size="icon">
            <Mic className="w-4 h-4" />
          </Button>
          <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MCPChat;
