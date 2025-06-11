
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Globe,
  Shield,
  CreditCard,
  Key
} from 'lucide-react';

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    // Account settings
    email: user?.email || '',
    fullName: '',
    phone: '',
    country: 'SA',
    language: 'ar',
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyReports: true,
    
    // Privacy settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    
    // App preferences
    theme: 'light',
    currency: 'USD',
    timezone: 'Asia/Riyadh'
  });

  const handleSave = () => {
    toast({
      title: "تم حفظ الإعدادات",
      description: "تم حفظ إعداداتك بنجاح"
    });
  };

  const settingsSections = [
    {
      title: 'معلومات الحساب',
      icon: User,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">الاسم الكامل</Label>
              <Input
                id="fullName"
                value={settings.fullName}
                onChange={(e) => setSettings({...settings, fullName: e.target.value})}
                placeholder="أدخل اسمك الكامل"
              />
            </div>
            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({...settings, email: e.target.value})}
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            <div>
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
                placeholder="أدخل رقم هاتفك"
              />
            </div>
            <div>
              <Label htmlFor="country">الدولة</Label>
              <Select value={settings.country} onValueChange={(value) => setSettings({...settings, country: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الدولة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SA">السعودية</SelectItem>
                  <SelectItem value="AE">الإمارات</SelectItem>
                  <SelectItem value="EG">مصر</SelectItem>
                  <SelectItem value="US">الولايات المتحدة</SelectItem>
                  <SelectItem value="GB">المملكة المتحدة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'الإشعارات',
      icon: Bell,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>إشعارات البريد الإلكتروني</Label>
              <p className="text-sm text-gray-500">استقبال إشعارات عبر البريد الإلكتروني</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>الإشعارات الفورية</Label>
              <p className="text-sm text-gray-500">إشعارات فورية في المتصفح</p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>رسائل تسويقية</Label>
              <p className="text-sm text-gray-500">استقبال رسائل تسويقية وعروض</p>
            </div>
            <Switch
              checked={settings.marketingEmails}
              onCheckedChange={(checked) => setSettings({...settings, marketingEmails: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>التقارير الأسبوعية</Label>
              <p className="text-sm text-gray-500">تقرير أسبوعي عن نشاطك</p>
            </div>
            <Switch
              checked={settings.weeklyReports}
              onCheckedChange={(checked) => setSettings({...settings, weeklyReports: checked})}
            />
          </div>
        </div>
      )
    },
    {
      title: 'اللغة والمنطقة',
      icon: Globe,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="language">اللغة</Label>
              <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر اللغة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency">العملة</Label>
              <Select value={settings.currency} onValueChange={(value) => setSettings({...settings, currency: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر العملة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - دولار أمريكي</SelectItem>
                  <SelectItem value="USDT">USDT - تيذر</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">المنطقة الزمنية</Label>
              <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنطقة الزمنية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Riyadh">الرياض</SelectItem>
                  <SelectItem value="Asia/Dubai">دبي</SelectItem>
                  <SelectItem value="Africa/Cairo">القاهرة</SelectItem>
                  <SelectItem value="America/New_York">نيويورك</SelectItem>
                  <SelectItem value="Europe/London">لندن</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'الخصوصية والأمان',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="profileVisibility">مستوى ظهور الملف الشخصي</Label>
            <Select value={settings.profileVisibility} onValueChange={(value) => setSettings({...settings, profileVisibility: value})}>
              <SelectTrigger>
                <SelectValue placeholder="اختر مستوى الظهور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">عام</SelectItem>
                <SelectItem value="members">أعضاء المجموعات فقط</SelectItem>
                <SelectItem value="private">خاص</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>إظهار البريد الإلكتروني</Label>
              <p className="text-sm text-gray-500">السماح للآخرين برؤية بريدك الإلكتروني</p>
            </div>
            <Switch
              checked={settings.showEmail}
              onCheckedChange={(checked) => setSettings({...settings, showEmail: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>إظهار رقم الهاتف</Label>
              <p className="text-sm text-gray-500">السماح للآخرين برؤية رقم هاتفك</p>
            </div>
            <Switch
              checked={settings.showPhone}
              onCheckedChange={(checked) => setSettings({...settings, showPhone: checked})}
            />
          </div>
          <div className="pt-4">
            <Button variant="outline" className="w-full">
              <Key className="w-4 h-4 ml-2" />
              تغيير كلمة المرور
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8" />
            الإعدادات
          </h1>
          <p className="text-gray-600">إدارة إعدادات حسابك وتفضيلاتك</p>
        </div>

        <div className="space-y-6">
          {settingsSections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="w-5 h-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {section.content}
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end gap-4">
            <Button variant="outline">إلغاء</Button>
            <Button onClick={handleSave}>حفظ الإعدادات</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
