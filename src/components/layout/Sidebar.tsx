import React from 'react';
import { X, Users, FileText, Gavel, Building, MessageSquare, BarChart3, Settings, Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const { user, signOut } = useAuth();

  const menuItems = [
    { icon: Users, label: 'مجموعاتي', count: 0, color: 'bg-blue-500', link: '/my-groups' },
    { icon: FileText, label: 'العقود', count: 0, color: 'bg-green-500', link: '/contracts' },
    { icon: Gavel, label: 'التحكيم', count: 0, color: 'bg-red-500', link: '/arbitration-hub' },
    { icon: Building, label: 'الموردين', count: 0, color: 'bg-purple-500', link: '/suppliers' },
    { icon: MessageSquare, label: 'المفاوضات', count: 0, color: 'bg-orange-500', link: '/negotiations' },
    { icon: BarChart3, label: 'التحليلات', count: null, color: 'bg-teal-500', link: '/analytics' },
  ];

  const notifications = [
    { title: 'اقتراح مجموعة جديدة', time: 'منذ دقيقتين', type: 'info' },
    { title: 'تم توقيع عقد', time: 'منذ 5 دقائق', type: 'success' },
    { title: 'طلب تحكيم', time: 'منذ 10 دقائق', type: 'warning' },
  ];

  return (
    <>
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      <div className={`
        fixed right-0 top-0 h-full w-80 glass border-l z-50 transform transition-transform duration-300
        ${open ? 'translate-x-0' : 'translate-x-full'}
        animate-slide-in-right
      `} dir="rtl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">لوحة التحكم</h2>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-140px)]">
          <div className="p-4 space-y-6">
            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{user?.user_metadata?.full_name || 'مستخدم'}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                إحصائيات سريعة
              </h3>
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <Link key={index} to={item.link}>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      {item.count !== null && (
                        <Badge variant="secondary" className="text-xs">
                          {item.count}
                        </Badge>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Separator />

            {/* Live Notifications */}
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4" />
                التحديثات المباشرة
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

            {/* Settings and Logout */}
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Settings className="w-4 h-4 ml-2" />
                الإعدادات
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
                size="sm"
                onClick={signOut}
              >
                <LogOut className="w-4 h-4 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default Sidebar;
