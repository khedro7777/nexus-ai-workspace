
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
    <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Left side - Menu and Logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <Logo size="sm" showText={true} />
        </div>

        {/* Center - Date and Time */}
        <div className="hidden md:flex">
          <UserDateTime />
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-gray-100"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/arbitration')}
            title="Arbitration Hub"
            className="hover:bg-gray-100"
          >
            <Gavel className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/profile')}
            title="Profile"
            className="hover:bg-gray-100"
          >
            <User className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/settings')}
            title="Settings"
            className="hover:bg-gray-100"
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
