
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  MessageSquare,
  ChevronLeft,
  X
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { t, language } = useLanguage();

  const menuItems = [
    {
      titleKey: "home",
      title: "Home",
      icon: Home,
      href: "/",
      section: "main"
    },
    {
      titleKey: "dashboard",
      title: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
      section: "main"
    },
    {
      titleKey: "myGroups",
      title: "My Groups",
      icon: Users,
      href: "/my-groups",
      section: "business"
    },
    {
      titleKey: "createGroup",
      title: "Create Group",
      icon: Building2,
      href: "/create-group",
      section: "business"
    },
    {
      titleKey: "notifications",
      title: "Notifications",
      icon: Bell,
      href: "/notifications",
      section: "main"
    },
    {
      titleKey: "pointsWallet",
      title: "Points & Wallet",
      icon: Wallet,
      href: "/points",
      section: "main"
    },
    {
      titleKey: "aiAssistant",
      title: "AI Assistant",
      icon: Brain,
      href: "/ai-assistant",
      section: "tools"
    },
    {
      titleKey: "arbitration",
      title: "Arbitration",
      icon: Gavel,
      href: "/arbitration",
      section: "business"
    },
    {
      titleKey: "archive",
      title: "Archive",
      icon: Archive,
      href: "/archive",
      section: "tools"
    },
    {
      titleKey: "marketplace",
      title: "Marketplace",
      icon: Store,
      href: "/marketplace",
      section: "business"
    },
    {
      titleKey: "discountOffers",
      title: "Discount Offers",
      icon: Coins,
      href: "/discount-offers",
      section: "business"
    },
    {
      titleKey: "services",
      title: "Services",
      icon: Briefcase,
      href: "/services",
      section: "business"
    },
    {
      titleKey: "negotiations",
      title: "Negotiations",
      icon: MessageSquare,
      href: "/negotiations",
      section: "business"
    },
    {
      titleKey: "suppliers",
      title: "Suppliers",
      icon: Truck,
      href: "/suppliers",
      section: "business"
    },
    {
      titleKey: "rfq",
      title: "RFQ",
      icon: Package,
      href: "/rfq",
      section: "business"
    },
    {
      titleKey: "contracts",
      title: "Contracts",
      icon: FileText,
      href: "/contracts",
      section: "business"
    },
    {
      titleKey: "voting",
      title: "Voting",
      icon: Vote,
      href: "/voting",
      section: "business"
    },
    {
      titleKey: "governance",
      title: "Governance",
      icon: Shield,
      href: "/governance",
      section: "administration"
    },
    {
      titleKey: "analytics",
      title: "Analytics",
      icon: TrendingUp,
      href: "/analytics",
      section: "tools"
    },
    {
      titleKey: "investment",
      title: "Investment",
      icon: TrendingUp,
      href: "/investment",
      section: "tools"
    },
    {
      titleKey: "companyFormation",
      title: "Company Formation",
      icon: Factory,
      href: "/company-formation",
      section: "tools"
    },
    {
      titleKey: "companyHub",
      title: "Company Hub",
      icon: Building2,
      href: "/company-hub",
      section: "tools"
    },
    {
      titleKey: "automation",
      title: "Automation",
      icon: Zap,
      href: "/automation",
      section: "tools"
    },
    {
      titleKey: "platformManagement",
      title: "Platform Management",
      icon: Crown,
      href: "/platform-management",
      section: "administration"
    },
    {
      titleKey: "adminDashboard",
      title: "Admin Dashboard",
      icon: UserCheck,
      href: "/admin",
      section: "administration"
    },
    {
      titleKey: "supplierDashboard",
      title: "Supplier Dashboard",
      icon: Truck,
      href: "/supplier-dashboard",
      section: "specializedRoles"
    },
    {
      titleKey: "freelancerDashboard",
      title: "Freelancer Dashboard",
      icon: User,
      href: "/freelancer-dashboard",
      section: "specializedRoles"
    },
    {
      titleKey: "profile",
      title: "Profile",
      icon: User,
      href: "/profile",
      section: "account"
    },
    {
      titleKey: "settings",
      title: "Settings",
      icon: Settings,
      href: "/settings",
      section: "account"
    }
  ];

  const sections = {
    main: "Main",
    business: "Business",
    tools: "Tools",
    administration: "Administration",
    specializedRoles: "Specialized Roles",
    account: "Account"
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate('/');
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-xl lg:shadow-none",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">🧠 GPO NEXUS</h2>
                <p className="text-xs text-blue-100">Global Business Platform</p>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goBack}
                  className="text-white hover:bg-blue-800 p-2"
                  title="Go Back"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goHome}
                  className="text-white hover:bg-blue-800 p-2"
                  title="Go Home"
                >
                  <Home className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(false)}
                  className="text-white hover:bg-blue-800 p-2 lg:hidden"
                  title="Close Sidebar"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Menu Content */}
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
                              "w-full justify-start h-10 px-3 transition-all duration-200 rounded-lg",
                              isActive(item.href) 
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:from-blue-700 hover:to-blue-800" 
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                            )}
                          >
                            <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{item.title}</span>
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
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <Button
                variant="outline"
                className="w-full justify-start h-10 px-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-200"
                onClick={handleSignOut}
              >
                <LogOut className="mr-3 h-4 w-4 flex-shrink-0" />
                <span className="truncate">Sign Out</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
