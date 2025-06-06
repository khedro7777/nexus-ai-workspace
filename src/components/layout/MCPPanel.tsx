
import React, { useState } from 'react';
import { Play, Pause, MessageCircle, Settings, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MCPPanel: React.FC = () => {
  const [mode, setMode] = useState<'manual' | 'auto' | 'ask'>('manual');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setMessage('');
    }, 2000);
  };

  const getModeConfig = (currentMode: string) => {
    switch (currentMode) {
      case 'auto':
        return { color: 'bg-green-500', label: 'Auto Mode', icon: Play };
      case 'ask':
        return { color: 'bg-blue-500', label: 'Ask Mode', icon: MessageCircle };
      default:
        return { color: 'bg-orange-500', label: 'Manual Mode', icon: Pause };
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 glass border-t z-40 transition-all duration-300 ${
      isCollapsed ? 'h-16' : 'h-auto'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Collapse/Expand Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`${getModeConfig(mode).color} text-white border-none`}>
              {getModeConfig(mode).label}
            </Badge>
            <span className="text-sm text-muted-foreground">MCP Control Panel</span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        {/* Main Content - Hidden when collapsed */}
        {!isCollapsed && (
          <div className="p-4">
            <Tabs value={mode} onValueChange={(value) => setMode(value as any)} className="w-full">
              <div className="flex items-center justify-between mb-3">
                <TabsList className="grid w-fit grid-cols-3">
                  <TabsTrigger value="manual" className="flex items-center gap-2">
                    <Pause className="w-4 h-4" />
                    Manual
                  </TabsTrigger>
                  <TabsTrigger value="auto" className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Auto
                  </TabsTrigger>
                  <TabsTrigger value="ask" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Ask
                  </TabsTrigger>
                </TabsList>
                
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              <TabsContent value="manual" className="mt-0">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter manual command..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isProcessing}
                  />
                  <Button onClick={handleSendMessage} disabled={isProcessing || !message.trim()}>
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="auto" className="mt-0">
                <div className="text-center py-2">
                  <p className="text-sm text-muted-foreground">Auto mode enabled - AI is managing tasks automatically</p>
                  <div className="flex justify-center mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ask" className="mt-0">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask AI assistant anything..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isProcessing}
                  />
                  <Button onClick={handleSendMessage} disabled={isProcessing || !message.trim()}>
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default MCPPanel;
