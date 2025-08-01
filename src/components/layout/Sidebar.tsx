
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
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
  const { t } = useLanguage();

  const menuItems = [
    {
      titleKey: "home",
      icon: Home,
      href: "/",
      section: "main"
    },
    {
      titleKey: "dashboard",
      icon: BarChart3,
      href: "/dashboard",
      section: "main"
    },
    {
      titleKey: "myGroups",
      icon: Users,
      href: "/my-groups",
      section: "business"
    },
    {
      titleKey: "createGroup",
      icon: Building2,
      href: "/create-group",
      section: "business"
    },
    {
      titleKey: "notifications",
      icon: Bell,
      href: "/notifications",
      section: "main"
    },
    {
      titleKey: "pointsWallet",
      icon: Wallet,
      href: "/points",
      section: "main"
    },
    {
      titleKey: "aiAssistant",
      icon: Brain,
      href: "/ai-assistant",
      section: "tools"
    },
    {
      titleKey: "arbitration",
      icon: Gavel,
      href: "/arbitration",
      section: "business"
    },
    {
      titleKey: "archive",
      icon: Archive,
      href: "/archive",
      section: "tools"
    },
    {
      titleKey: "marketplace",
      icon: Store,
      href: "/marketplace",
      section: "business"
    },
    {
      titleKey: "services",
      icon: Briefcase,
      href: "/services",
      section: "business"
    },
    {
      titleKey: "negotiations",
      icon: MessageSquare,
      href: "/negotiations",
      section: "business"
    },
    {
      titleKey: "suppliers",
      icon: Truck,
      href: "/suppliers",
      section: "business"
    },
    {
      titleKey: "rfq",
      icon: Package,
      href: "/rfq",
      section: "business"
    },
    {
      titleKey: "contracts",
      icon: FileText,
      href: "/contracts",
      section: "business"
    },
    {
      titleKey: "voting",
      icon: Vote,
      href: "/voting",
      section: "business"
    },
    {
      titleKey: "governance",
      icon: Shield,
      href: "/governance",
      section: "administration"
    },
    {
      titleKey: "analytics",
      icon: TrendingUp,
      href: "/analytics",
      section: "tools"
    },
    {
      titleKey: "investment",
      icon: TrendingUp,
      href: "/investment",
      section: "tools"
    },
    {
      titleKey: "companyFormation",
      icon: Factory,
      href: "/company-formation",
      section: "tools"
    },
    {
      titleKey: "companyHub",
      icon: Building2,
      href: "/company-hub",
      section: "tools"
    },
    {
      titleKey: "automation",
      icon: Zap,
      href: "/automation",
      section: "tools"
    },
    {
      titleKey: "platformManagement",
      icon: Crown,
      href: "/platform-management",
      section: "administration"
    },
    {
      titleKey: "adminDashboard",
      icon: UserCheck,
      href: "/admin",
      section: "administration"
    },
    {
      titleKey: "supplierDashboard",
      icon: Truck,
      href: "/supplier-dashboard",
      section: "specializedRoles"
    },
    {
      titleKey: "freelancerDashboard",
      icon: User,
      href: "/freelancer-dashboard",
      section: "specializedRoles"
    },
    {
      titleKey: "profile",
      icon: User,
      href: "/profile",
      section: "account"
    },
    {
      titleKey: "settings",
      icon: Settings,
      href: "/settings",
      section: "account"
    }
  ];

  const sections = {
    main: t("main"),
    business: t("business"),
    tools: t("tools"),
    administration: t("administration"),
    specializedRoles: t("specializedRoles"),
    account: t("account")
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
        "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-xl",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600">
            <h2 className="text-xl font-bold text-white">🧠 GPO NEXUS</h2>
            <p className="text-sm text-blue-100 mt-1">Smart Collaborative Platform</p>
          </div>
          
          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-6">
              {Object.entries(sections).map(([sectionKey, sectionTitle]) => {
                const sectionItems = menuItems.filter(item => item.section === sectionKey);
                
                if (sectionItems.length === 0) return null;
                
                return (
                  <div key={sectionKey}>
                    <h3 className="px-3 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {sectionTitle}
                    </h3>
                    <div className="space-y-1">
                      {sectionItems.map((item) => (
                        <Link key={item.href} to={item.href} onClick={() => setOpen(false)}>
                          <Button
                            variant={isActive(item.href) ? "default" : "ghost"}
                            className={cn(
                              "w-full justify-start h-11 px-3 transition-all duration-200 rounded-lg",
                              isActive(item.href) 
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800 transform scale-105" 
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:scale-105"
                            )}
                          >
                            <item.icon className="mr-3 h-4 w-4" />
                            {t(item.titleKey as any)}
                          </Button>
                        </Link>
                      ))}
                    </div>
                    {sectionKey !== 'account' && <Separator className="my-4 opacity-30" />}
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Sign Out Button */}
          {user && (
            <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <Button
                variant="outline"
                className="w-full justify-start h-11 px-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-200 hover:scale-105"
                onClick={handleSignOut}
              >
                <LogOut className="mr-3 h-4 w-4" />
                {t("signOut")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
