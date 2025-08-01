
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Menu, Bell, User, Settings, Gavel, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import Logo from './Logo';
import UserDateTime from './UserDateTime';

interface UnifiedHeaderProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState('US');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'AE', name: 'UAE', flag: '🇦🇪' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <button onClick={() => navigate('/about')} className="hover:text-blue-200 transition-colors">
                About
              </button>
              <button onClick={() => navigate('/founders')} className="hover:text-blue-200 transition-colors">
                Founders
              </button>
              <button onClick={() => navigate('/legal')} className="hover:text-blue-200 transition-colors">
                Legal
              </button>
              <button onClick={() => navigate('/contact')} className="hover:text-blue-200 transition-colors">
                Contact
              </button>
              <button onClick={() => navigate('/user-guide')} className="hover:text-blue-200 transition-colors">
                User Guide
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <Select value={language} onValueChange={(value: 'en' | 'ar') => setLanguage(value)}>
                <SelectTrigger className="w-24 h-8 bg-transparent border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Country Selector */}
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-32 h-8 bg-transparent border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <span className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Currency Display */}
              <div className="flex items-center gap-1 text-white/90">
                <span>💰</span>
                <span>USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Menu */}
          <div className="flex items-center gap-4">
            {setSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
            
            <Logo size="md" showText={true} />
          </div>

          {/* Center - Date and Time */}
          <div className="hidden md:flex">
            <UserDateTime />
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
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
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                  className="hidden sm:flex"
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/auth')}
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Create Account
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile date/time */}
      <div className="md:hidden pb-2 flex justify-center">
        <UserDateTime />
      </div>
    </header>
  );
};

export default UnifiedHeader;
