
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Users, FileText, Gavel, Building, MessageSquare, BarChart3, Settings, Cog } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileMenu = () => {
  const menuItems = [
    { icon: Users, label: 'لوحة التحكم', link: '/dashboard' },
    { icon: Users, label: 'مجموعاتي', link: '/my-groups' },
    { icon: FileText, label: 'العقود', link: '/contracts' },
    { icon: Gavel, label: 'التحكيم', link: '/arbitration-hub' },
    { icon: Building, label: 'الموردين', link: '/suppliers' },
    { icon: MessageSquare, label: 'المفاوضات', link: '/negotiations' },
    { icon: BarChart3, label: 'التحليلات', link: '/analytics' },
    { icon: Building, label: 'بوابة الشركات', link: '/company-hub' },
    { icon: Cog, label: 'الأتمتة', link: '/automation' },
  ];

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Menu className="w-6 h-6" />
            <span className="sr-only">فتح القائمة</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80" dir="rtl">
          <div className="py-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold">GPO Nexus</h2>
              <p className="text-sm text-muted-foreground">منصة المشتريات الجماعية</p>
            </div>
            
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <Link key={index} to={item.link}>
                  <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-right">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Settings className="w-5 h-5" />
                <span>الإعدادات</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
