
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
  ChevronRight,
  ChevronDown,
  MessageSquare,
  Target,
  Workflow,
  Brain,
  Users2,
  Building,
  Handshake,
  Calculator,
  Globe,
  Award,
  BookOpen,
  PlusCircle
} from 'lucide-react';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { state } = useSidebar();
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({
    main: true,
    groups: true,
    business: false,
    governance: false,
    tools: false,
    services: false,
    admin: false,
    roles: false
  });

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

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
      title: "استكشاف المجموعات",
      icon: Users2,
      href: "/explore-groups",
      section: "groups"
    },
    {
      title: "الشراء التعاوني",
      icon: ShoppingBag,
      href: "/cooperative-purchasing",
      section: "business",
      subItems: [
        { title: "المجموعات النشطة", href: "/cooperative-purchasing/active", icon: Target },
        { title: "العروض الجديدة", href: "/cooperative-purchasing/offers", icon: Package },
        { title: "طلبات الانضمام", href: "/cooperative-purchasing/requests", icon: PlusCircle }
      ]
    },
    {
      title: "التسويق التعاوني",
      icon: TrendingUp,
      href: "/cooperative-marketing",
      section: "business",
      subItems: [
        { title: "الحملات النشطة", href: "/cooperative-marketing/campaigns", icon: Target },
        { title: "التحليلات", href: "/cooperative-marketing/analytics", icon: BarChart3 },
        { title: "الشراكات", href: "/cooperative-marketing/partnerships", icon: Handshake }
      ]
    },
    {
      title: "المفاوضات",
      icon: Briefcase,
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
      title: "العقود الذكية",
      icon: FileText,
      href: "/smart-contracts",
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
      title: "التحكيم (ORDA)",
      icon: Gavel,
      href: "/arbitration",
      section: "governance"
    },
    {
      title: "إدارة المخاطر",
      icon: Shield,
      href: "/risk-management",
      section: "governance"
    },
    {
      title: "سير العمل",
      icon: Workflow,
      href: "/workflow",
      section: "tools"
    },
    {
      title: "الذكاء الاصطناعي",
      icon: Brain,
      href: "/ai-assistant",
      section: "tools"
    },
    {
      title: "التحليلات المتقدمة",
      icon: TrendingUp,
      href: "/analytics",
      section: "tools"
    },
    {
      title: "الاستثمار",
      icon: Calculator,
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
      icon: Building,
      href: "/company-hub",
      section: "tools"
    },
    {
      title: "الأتمتة الذكية",
      icon: Zap,
      href: "/automation",
      section: "tools"
    },
    {
      title: "البوابات العالمية",
      icon: Globe,
      href: "/global-gateways",
      section: "tools"
    },
    {
      title: "متجر الخدمات",
      icon: Store,
      href: "/services",
      section: "services"
    },
    {
      title: "نظام النقاط",
      icon: Coins,
      href: "/points",
      section: "services"
    },
    {
      title: "المكافآت",
      icon: Award,
      href: "/rewards",
      section: "services"
    },
    {
      title: "التدريب",
      icon: BookOpen,
      href: "/training",
      section: "services"
    },
    {
      title: "إدارة المنصة",
      icon: Crown,
      href: "/platform",
      section: "admin"
    },
    {
      title: "لوحة الإدارة",
      icon: UserCheck,
      href: "/admin",
      section: "admin"
    },
    {
      title: "إدارة المستخدمين",
      icon: Users,
      href: "/user-management",
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
      title: "لوحة الشركات",
      icon: Building2,
      href: "/company-dashboard",
      section: "roles"
    }
  ];

  const sections = {
    main: "الرئيسية",
    groups: "إدارة المجموعات",
    business: "الأعمال والتجارة",
    governance: "الحوكمة والتنظيم",
    tools: "الأدوات المتقدمة",
    services: "الخدمات والمكافآت",
    admin: "إدارة النظام",
    roles: "الأدوار المتخصصة"
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  return (
    <ShadcnSidebar 
      collapsible="icon"
      className="border-l border-gray-200 bg-white"
    >
      <SidebarHeader className="border-b border-gray-200">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">GPO Platform</h2>
              <p className="text-sm text-gray-500">نظام الشراء الجماعي</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          {Object.entries(sections).map(([sectionKey, sectionTitle]) => {
            const sectionItems = menuItems.filter(item => item.section === sectionKey);
            
            if (sectionItems.length === 0) return null;
            
            const isExpanded = expandedGroups[sectionKey];
            
            return (
              <SidebarGroup key={sectionKey}>
                <SidebarGroupLabel 
                  className="cursor-pointer flex items-center justify-between hover:bg-gray-50 px-2 py-1 rounded-md"
                  onClick={() => toggleGroup(sectionKey)}
                >
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {state === "expanded" ? sectionTitle : ""}
                  </span>
                  {state === "expanded" && (
                    isExpanded ? 
                      <ChevronDown className="w-4 h-4 text-gray-400" /> : 
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </SidebarGroupLabel>

                {(isExpanded || state === "collapsed") && (
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {sectionItems.map((item) => {
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        
                        return (
                          <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton 
                              asChild={!hasSubItems}
                              isActive={isActive(item.href)}
                              tooltip={state === "collapsed" ? item.title : undefined}
                              className="transition-all duration-200"
                            >
                              {hasSubItems ? (
                                <div className="w-full">
                                  <div className="flex items-center gap-2 w-full">
                                    <item.icon className="w-4 h-4" />
                                    {state === "expanded" && <span>{item.title}</span>}
                                  </div>
                                </div>
                              ) : (
                                <Link to={item.href}>
                                  <item.icon className="w-4 h-4" />
                                  {state === "expanded" && <span>{item.title}</span>}
                                </Link>
                              )}
                            </SidebarMenuButton>
                            
                            {hasSubItems && state === "expanded" && (
                              <SidebarMenuSub>
                                {item.subItems?.map((subItem) => (
                                  <SidebarMenuSubItem key={subItem.href}>
                                    <SidebarMenuSubButton asChild isActive={isActive(subItem.href)}>
                                      <Link to={subItem.href}>
                                        <subItem.icon className="w-4 h-4" />
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            )}
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                )}
              </SidebarGroup>
            );
          })}
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={state === "collapsed" ? "الملف الشخصي" : undefined}>
              <Link to="/profile">
                <User className="w-4 h-4" />
                {state === "expanded" && <span>الملف الشخصي</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={state === "collapsed" ? "الإعدادات" : undefined}>
              <Link to="/settings">
                <Settings className="w-4 h-4" />
                {state === "expanded" && <span>الإعدادات</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {user && (
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={handleSignOut}
                tooltip={state === "collapsed" ? "تسجيل الخروج" : undefined}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                {state === "expanded" && <span>تسجيل الخروج</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
