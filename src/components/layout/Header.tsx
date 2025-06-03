
import React, { useState } from 'react';
import { Menu, Sun, Moon, Globe, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

  return (
    <header className="glass border-b sticky top-0 z-50 w-full h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold gradient-text">GPO Nexus</h1>
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{currentTime.toLocaleTimeString()}</span>
          <span className="mx-2">•</span>
          <span>{currentTime.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-32">
            <Globe className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map(lang => (
              <SelectItem key={lang.code} value={lang.code}>
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="USD">
          <SelectTrigger className="w-24">
            <DollarSign className="w-4 h-4 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {currencies.map(curr => (
              <SelectItem key={curr} value={curr}>{curr}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="relative animate-pulse-glow"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          className="relative"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
