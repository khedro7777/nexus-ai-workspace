
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, Bell, Search, MessageSquare, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import UserDateTime from './UserDateTime';
import Logo from './Logo';

interface HeaderProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Logo />
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="البحث..."
                className="w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-40 lg:w-64"
                dir="rtl"
              />
            </div>
          </div>

          <nav className="flex items-center space-x-2">
            <UserDateTime />
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                3
              </Badge>
            </Button>

            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4" />
            </Button>

            {user ? (
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">
                    {user.user_metadata?.full_name || 'المستخدم'}
                  </span>
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="sm">تسجيل الدخول</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
