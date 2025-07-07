
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, User, Settings, Gavel } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import UserDateTime from './UserDateTime';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Right side - Logo and Menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <Logo size="sm" showText={true} />
        </div>

        {/* Center - Date and Time */}
        <div className="hidden md:flex">
          <UserDateTime />
        </div>

        {/* Left side - User actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/arbitration-hub')}
            title="إدارة التحكيم"
          >
            <Gavel className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/profile')}
            title="الصفحة الشخصية"
          >
            <User className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/settings')}
            title="الإعدادات"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile date/time */}
      <div className="md:hidden mt-2 flex justify-center">
        <UserDateTime />
      </div>
    </header>
  );
};

export default Header;
