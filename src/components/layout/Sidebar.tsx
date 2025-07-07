
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  Home, 
  Users, 
  Building2, 
  BarChart3, 
  Settings, 
  User, 
  LogOut,
  MessageSquare,
  Wallet,
  Shield,
  Bell,
  Award,
  Target,
  Zap,
  Crown,
  UserCheck,
  Briefcase,
  TrendingUp,
  Calculator,
  Globe,
  Store,
  Package,
  Gavel,
  Activity
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

  const mainMenuItems = [
    { title: "الرئيسية", icon: Home, href: "/" },
    { title: "لوحة التحكم", icon: BarChart3, href: "/dashboard" }
  ];

  const accountMenuItems = [
    { title: "حسابي", icon: User, href: "/profile" },
    { title: "محفظتي", icon: Wallet, href: "/wallet" },
    { title: "الإشعارات", icon: Bell, href: "/notifications" }
  ];

  const groupsMenuItems = [
    { title: "مجموعاتي", icon: Users, href: "/my-groups" },
    { title: "إنشاء مجموعة", icon: Building2, href: "/create-group" },
    { title: "استكشاف المجموعات", icon: Target, href: "/explore-groups" }
  ];

  const roleMenuItems = [
    { title: "كمورد", icon: Store, href: "/supplier-dashboard" },
    { title: "كمستقل", icon: UserCheck, href: "/freelancer-dashboard" },
    { title: "كمؤسس شركة", icon: Briefcase, href: "/company-dashboard" }
  ];

  const systemMenuItems = [
    { title: "التحكيم", icon: Gavel, href: "/arbitration" },
    { title: "الإعدادات", icon: Settings, href: "/settings" }
  ];

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
              <h2 className="text-lg font-semibold text-gray-900">GPO WORLD</h2>
              <p className="text-sm text-gray-500">منصة التفاوض التعاوني</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>الرئيسية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={state === "collapsed" ? item.title : undefined}
                  >
                    <Link to={item.href}>
                      <item.icon className="w-4 h-4" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>حسابي</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={state === "collapsed" ? item.title : undefined}
                  >
                    <Link to={item.href}>
                      <item.icon className="w-4 h-4" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Groups Menu - قلب المشروع */}
        <SidebarGroup>
          <SidebarGroupLabel>مجموعاتي</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupsMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={state === "collapsed" ? item.title : undefined}
                  >
                    <Link to={item.href}>
                      <item.icon className="w-4 h-4" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Group Rooms - المجموعات النشطة */}
              {user && state === "expanded" && (
                <>
                  <SidebarMenuItem>
                    <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase">
                      غرف المجموعات
                    </div>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild
                      isActive={isActive('/group/1')}
                    >
                      <Link to="/group/1">
                        <MessageSquare className="w-4 h-4" />
                        <span>مجموعة الشراء التعاوني</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild
                      isActive={isActive('/group/2')}
                    >
                      <Link to="/group/2">
                        <MessageSquare className="w-4 h-4" />
                        <span>مجموعة التسويق الرقمي</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Role-based Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>الأدوار</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {roleMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={state === "collapsed" ? item.title : undefined}
                  >
                    <Link to={item.href}>
                      <item.icon className="w-4 h-4" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>النظام</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={state === "collapsed" ? item.title : undefined}
                  >
                    <Link to={item.href}>
                      <item.icon className="w-4 h-4" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200">
        <SidebarMenu>
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
