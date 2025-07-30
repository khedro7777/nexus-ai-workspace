import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { 
  Home, 
  Users, 
  Building2, 
  BarChart3, 
  Settings, 
  User, 
  Vote,
  FileText,
  Gavel,
  Shield,
  TrendingUp,
  Factory,
  Briefcase,
  Zap,
  Crown,
  UserCheck,
  Truck,
  Store,
  Coins,
  ShoppingBag,
  Package,
  LogOut,
  Brain,
  Archive,
  Bell,
  Wallet,
  MessageSquare
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const menuItems = [
    {
      title: "الرئيسية",
      icon: Home,
      href: "/",
      section: "main"
    },
    {
      title: "لوحة التحكم",
      icon: BarChart3,
      href: "/dashboard",
      section: "main"
    },
    {
      title: "مجموعاتي",
      icon: Users,
      href: "/my-groups",
      section: "groups"
    },
    {
      title: "إنشاء مجموعة",
      icon: Building2,
      href: "/create-group",
      section: "groups"
    },
    {
      title: "الإشعارات",
      icon: Bell,
      href: "/notifications",
      section: "dashboard"
    },
    {
      title: "محفظة النقاط",
      icon: Wallet,
      href: "/points",
      section: "dashboard"
    },
    {
      title: "المساعد الذكي",
      icon: Brain,
      href: "/ai-assistant",
      section: "dashboard"
    },
    {
      title: "التحكيم",
      icon: Gavel,
      href: "/arbitration",
      section: "dashboard"
    },
    {
      title: "الأرشيف",
      icon: Archive,
      href: "/archive",
      section: "dashboard"
    },
    {
      title: "المتجر",
      icon: Store,
      href: "/marketplace",
      section: "dashboard"
    },
    {
      title: "الخدمات",
      icon: Briefcase,
      href: "/services",
      section: "dashboard"
    },
    {
      title: "المفاوضات",
      icon: MessageSquare,
      href: "/negotiations",
      section: "business"
    },
    {
      title: "الموردين",
      icon: Truck,
      href: "/suppliers",
      section: "business"
    },
    {
      title: "طلبات العروض",
      icon: Package,
      href: "/rfq",
      section: "business"
    },
    {
      title: "العقود",
      icon: FileText,
      href: "/contracts",
      section: "business"
    },
    {
      title: "التصويت",
      icon: Vote,
      href: "/voting",
      section: "governance"
    },
    {
      title: "الحوكمة",
      icon: Shield,
      href: "/governance",
      section: "governance"
    },
    {
      title: "التحليلات",
      icon: TrendingUp,
      href: "/analytics",
      section: "tools"
    },
    {
      title: "الاستثمار",
      icon: TrendingUp,
      href: "/investment",
      section: "tools"
    },
    {
      title: "تكوين الشركات",
      icon: Factory,
      href: "/company-formation",
      section: "tools"
    },
    {
      title: "مركز الشركات",
      icon: Building2,
      href: "/company-hub",
      section: "tools"
    },
    {
      title: "الأتمتة",
      icon: Zap,
      href: "/automation",
      section: "tools"
    },
    {
      title: "إدارة المنصة",
      icon: Crown,
      href: "/platform-management",
      section: "admin"
    },
    {
      title: "لوحة الإدارة",
      icon: UserCheck,
      href: "/admin",
      section: "admin"
    },
    {
      title: "لوحة المورد",
      icon: Truck,
      href: "/supplier-dashboard",
      section: "roles"
    },
    {
      title: "لوحة المستقل",
      icon: User,
      href: "/freelancer-dashboard",
      section: "roles"
    },
    {
      title: "الملف الشخصي",
      icon: User,
      href: "/profile",
      section: "account"
    },
    {
      title: "الإعدادات",
      icon: Settings,
      href: "/settings",
      section: "account"
    }
  ];

  const sections = {
    main: "الرئيسية",
    groups: "المجموعات",
    dashboard: "لوحة التحكم",
    business: "الأعمال",
    governance: "الحوكمة",
    tools: "الأدوات",
    admin: "الإدارة",
    roles: "الأدوار المتخصصة",
    account: "الحساب"
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 right-0 z-50 h-full w-64 bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
            <h2 className="text-lg font-semibold text-white">🧠 GPODO</h2>
            <p className="text-sm text-blue-100 mt-1">Smart Collaborative Platform</p>
          </div>
          
          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-6">
              {Object.entries(sections).map(([sectionKey, sectionTitle]) => {
                const sectionItems = menuItems.filter(item => item.section === sectionKey);
                
                if (sectionItems.length === 0) return null;
                
                return (
                  <div key={sectionKey}>
                    <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {sectionTitle}
                    </h3>
                    <div className="space-y-1">
                      {sectionItems.map((item) => (
                        <Link key={item.href} to={item.href} onClick={() => setOpen(false)}>
                          <Button
                            variant={isActive(item.href) ? "default" : "ghost"}
                            className={cn(
                              "w-full justify-start h-10 px-3 transition-all duration-200",
                              isActive(item.href) 
                                ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            )}
                          >
                            <item.icon className="ml-2 h-4 w-4" />
                            {item.title}
                          </Button>
                        </Link>
                      ))}
                    </div>
                    {sectionKey !== 'account' && <Separator className="my-4" />}
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Sign Out Button */}
          {user && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <Button
                variant="outline"
                className="w-full justify-start h-10 px-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                onClick={handleSignOut}
              >
                <LogOut className="ml-2 h-4 w-4" />
                تسجيل الخروج
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

