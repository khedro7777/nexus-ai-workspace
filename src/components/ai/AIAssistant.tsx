import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Languages, 
  Brain, 
  TrendingUp,
  MessageSquare,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { aiAgentsService, AIAgentRequest, AIAgentResponse } from '@/lib/aiAgents';
import { deeplTranslator } from '@/lib/deepl';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  agentType?: string;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
  initialAgentType?: 'general' | 'business' | 'negotiation' | 'analysis' | 'translation';
}

const AIAssistant: React.FC<AIAssistantProps> = ({ 
  isOpen, 
  onClose, 
  context,
  initialAgentType = 'general' 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [agentType, setAgentType] = useState(initialAgentType);
  const [isMinimized, setIsMinimized] = useState(false);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = language === 'ar' ? 'ar-SA' : 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (content: string, sender: 'user' | 'ai', agentType?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      agentType
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage(userMessage, 'user');
    setIsLoading(true);

    try {
      const request: AIAgentRequest = {
        prompt: userMessage,
        context,
        language,
        agentType
      };

      const response: AIAgentResponse = await aiAgentsService.processRequest(request);
      addMessage(response.response, 'ai', response.agentType);
    } catch (error) {
      console.error('AI Assistant error:', error);
      addMessage('عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.', 'ai');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!recognition.current) return;

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const handleTranslate = async (text: string) => {
    try {
      setIsLoading(true);
      const targetLang = language === 'ar' ? 'en' : 'ar';
      const translatedText = await deeplTranslator.translateText({
        text,
        targetLang: targetLang.toUpperCase()
      });
      addMessage(`الترجمة: ${translatedText}`, 'ai', 'translation');
    } catch (error) {
      console.error('Translation error:', error);
      addMessage('عذراً، حدث خطأ في الترجمة.', 'ai');
    } finally {
      setIsLoading(false);
    }
  };

  const agentTypes = [
    { key: 'general', label: 'عام', icon: MessageSquare },
    { key: 'business', label: 'أعمال', icon: TrendingUp },
    { key: 'negotiation', label: 'تفاوض', icon: Brain },
    { key: 'analysis', label: 'تحليل', icon: TrendingUp },
    { key: 'translation', label: 'ترجمة', icon: Languages }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50" dir="rtl">
      <Card className={`w-96 shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'}`}>
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <CardTitle className="text-sm">مساعد الذكاء الاصطناعي</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {agentTypes.find(t => t.key === agentType)?.label}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-700 p-1"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            >
              <Languages className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-700 p-1"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-700 p-1"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Agent Type Selector */}
            <div className="p-2 border-b bg-gray-50">
              <div className="flex gap-1 overflow-x-auto">
                {agentTypes.map((type) => (
                  <Button
                    key={type.key}
                    variant={agentType === type.key ? "default" : "outline"}
                    size="sm"
                    className="text-xs whitespace-nowrap"
                    onClick={() => setAgentType(type.key as any)}
                  >
                    <type.icon className="w-3 h-3 ml-1" />
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm">
                    مرحباً! كيف يمكنني مساعدتك اليوم؟
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div>{message.content}</div>
                      {message.sender === 'ai' && message.agentType !== 'translation' && (
                        <div className="flex gap-1 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => handleTranslate(message.content)}
                          >
                            <Languages className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg text-sm">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                        جاري المعالجة...
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="اكتب رسالتك هنا..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                  className="text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleVoiceInput}
                  disabled={isLoading}
                  className={isListening ? 'bg-red-100 border-red-300' : ''}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default AIAssistant;

