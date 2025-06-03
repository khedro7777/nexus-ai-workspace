
import React from 'react';
import { X, Users, FileText, Gavel, Building, MessageSquare, BarChart3, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: Users, label: 'Active Groups', count: 12, color: 'bg-blue-500' },
    { icon: FileText, label: 'Contracts', count: 8, color: 'bg-green-500' },
    { icon: Gavel, label: 'Arbitration', count: 3, color: 'bg-red-500' },
    { icon: Building, label: 'Companies', count: 5, color: 'bg-purple-500' },
    { icon: MessageSquare, label: 'Negotiations', count: 15, color: 'bg-orange-500' },
    { icon: BarChart3, label: 'Analytics', count: null, color: 'bg-teal-500' },
  ];

  const notifications = [
    { title: 'New group proposal', time: '2m ago', type: 'info' },
    { title: 'Contract signed', time: '5m ago', type: 'success' },
    { title: 'Arbitration request', time: '10m ago', type: 'warning' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`
        fixed right-0 top-0 h-full w-80 glass border-l z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        animate-slide-in-right
      `}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Control Panel</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="p-4 space-y-6">
            {/* Quick Stats */}
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Quick Stats
              </h3>
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.count && (
                      <Badge variant="secondary" className="text-xs">
                        {item.count}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Live Notifications */}
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Live Updates
              </h3>
              <div className="space-y-3">
                {notifications.map((notif, index) => (
                  <div key={index} className="p-3 rounded-lg bg-card border border-border/50 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium">{notif.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        notif.type === 'success' ? 'bg-green-500' :
                        notif.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Settings */}
            <div>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default Sidebar;
