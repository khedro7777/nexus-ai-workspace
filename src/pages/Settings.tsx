
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Palette, 
  Shield, 
  Bell, 
  Users,
  CreditCard,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('ar');
  const [theme, setTheme] = useState('system');
  const [currency, setCurrency] = useState('SAR');
  const [timezone, setTimezone] = useState('Asia/Riyadh');

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true,
    updates: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    activityStatus: true,
    dataSharing: false,
    analytics: true
  });

  const handleSaveSettings = () => {
    // Logic to save settings
    console.log('Settings saved');
  };

  const handleExportData = () => {
    // Logic to export user data
    console.log('Exporting data');
  };

  const handleDeleteAccount = () => {
    // Logic to delete account
    console.log('Delete account requested');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <SettingsIcon className="w-8 h-8" />
              الإعدادات
            </h1>
            <p className="text-gray-600">إدارة تفضيلات حسابك والنظام</p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">عام</TabsTrigger>
              <TabsTrigger value="appearance">المظهر</TabsTrigger>
              <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
              <TabsTrigger value="privacy">الخصوصية</TabsTrigger>
              <TabsTrigger value="account">الحساب</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    الإعدادات العامة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">اللغة</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ar">العربية</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">العملة</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                          <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                          <SelectItem value="EUR">يورو (EUR)</SelectItem>
                          <SelectItem value="GBP">جنيه إسترليني (GBP)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">المنطقة الزمنية</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Riyadh">الرياض (GMT+3)</SelectItem>
                          <SelectItem value="Asia/Dubai">دبي (GMT+4)</SelectItem>
                          <SelectItem value="Europe/London">لندن (GMT)</SelectItem>
                          <SelectItem value="America/New_York">نيويورك (GMT-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">تنسيق التاريخ</Label>
                      <Select defaultValue="dd/mm/yyyy">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd/mm/yyyy">يوم/شهر/سنة</SelectItem>
                          <SelectItem value="mm/dd/yyyy">شهر/يوم/سنة</SelectItem>
                          <SelectItem value="yyyy-mm-dd">سنة-شهر-يوم</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">التحديثات التلقائية</h3>
                      <p className="text-sm text-gray-500">تحديث الإعدادات تلقائياً</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">إرسال البيانات التحليلية</h3>
                      <p className="text-sm text-gray-500">مساعدة في تحسين الخدمة</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    إعدادات المظهر
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">المظهر</Label>
                      <p className="text-sm text-gray-500 mb-4">اختر مظهر المنصة</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div 
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                          onClick={() => setTheme('light')}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Sun className="w-5 h-5" />
                            <span className="font-medium">مضيء</span>
                          </div>
                          <div className="w-full h-8 bg-white border rounded flex items-center px-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <div className="w-16 h-1 bg-gray-300 rounded"></div>
                          </div>
                        </div>

                        <div 
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                          onClick={() => setTheme('dark')}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Moon className="w-5 h-5" />
                            <span className="font-medium">مظلم</span>
                          </div>
                          <div className="w-full h-8 bg-gray-800 border rounded flex items-center px-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                            <div className="w-16 h-1 bg-gray-600 rounded"></div>
                          </div>
                        </div>

                        <div 
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            theme === 'system' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                          onClick={() => setTheme('system')}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Monitor className="w-5 h-5" />
                            <span className="font-medium">النظام</span>
                          </div>
                          <div className="w-full h-8 border rounded flex">
                            <div className="w-1/2 bg-white border-l flex items-center px-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mr-1"></div>
                            </div>
                            <div className="w-1/2 bg-gray-800 flex items-center px-2">
                              <div className="w-1 h-1 bg-blue-400 rounded-full mr-1"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>حجم الخط</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">صغير</SelectItem>
                            <SelectItem value="medium">متوسط</SelectItem>
                            <SelectItem value="large">كبير</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>كثافة المحتوى</Label>
                        <Select defaultValue="comfortable">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compact">مضغوط</SelectItem>
                            <SelectItem value="comfortable">مريح</SelectItem>
                            <SelectItem value="spacious">واسع</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">الشريط الجانبي المصغر</h3>
                        <p className="text-sm text-gray-500">إظهار الشريط الجانبي مصغراً بشكل افتراضي</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">الرسوم المتحركة</h3>
                        <p className="text-sm text-gray-500">تفعيل الرسوم المتحركة في الواجهة</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    إعدادات الإشعارات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">طرق الإشعار</h3>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">إشعارات البريد الإلكتروني</h4>
                        <p className="text-sm text-gray-500">استقبال الإشعارات عبر البريد الإلكتروني</p>
                      </div>
                      <Switch 
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">الإشعارات الفورية</h4>
                        <p className="text-sm text-gray-500">إشعارات فورية في المتصفح</p>
                      </div>
                      <Switch 
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">الرسائل النصية</h4>
                        <p className="text-sm text-gray-500">إشعارات عبر SMS للأحداث المهمة</p>
                      </div>
                      <Switch 
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">أنواع الإشعارات</h3>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">إشعارات التسويق</h4>
                        <p className="text-sm text-gray-500">عروض خاصة ونصائح</p>
                      </div>
                      <Switch 
                        checked={notifications.marketing}
                        onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">تحديثات المنتج</h4>
                        <p className="text-sm text-gray-500">ميزات جديدة وتحسينات</p>
                      </div>
                      <Switch 
                        checked={notifications.updates}
                        onCheckedChange={(checked) => setNotifications({...notifications, updates: checked})}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">إعدادات متقدمة</h4>
                    <div className="space-y-2">
                      <Label>وقت عدم الإزعاج</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs">من</Label>
                          <Input type="time" defaultValue="22:00" />
                        </div>
                        <div>
                          <Label className="text-xs">إلى</Label>
                          <Input type="time" defaultValue="07:00" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    إعدادات الخصوصية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>مستوى ظهور الملف الشخصي</Label>
                      <Select 
                        value={privacy.profileVisibility} 
                        onValueChange={(value) => setPrivacy({...privacy, profileVisibility: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">عام - مرئي للجميع</SelectItem>
                          <SelectItem value="members">الأعضاء فقط</SelectItem>
                          <SelectItem value="private">خاص - مخفي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">إظهار حالة النشاط</h4>
                        <p className="text-sm text-gray-500">السماح للآخرين برؤية آخر وقت كنت نشطاً</p>
                      </div>
                      <Switch 
                        checked={privacy.activityStatus}
                        onCheckedChange={(checked) => setPrivacy({...privacy, activityStatus: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">مشاركة البيانات مع الشركاء</h4>
                        <p className="text-sm text-gray-500">السماح بمشاركة البيانات المجهولة</p>
                      </div>
                      <Switch 
                        checked={privacy.dataSharing}
                        onCheckedChange={(checked) => setPrivacy({...privacy, dataSharing: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">البيانات التحليلية</h4>
                        <p className="text-sm text-gray-500">استخدام البيانات لتحسين الخدمة</p>
                      </div>
                      <Switch 
                        checked={privacy.analytics}
                        onCheckedChange={(checked) => setPrivacy({...privacy, analytics: checked})}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">إدارة البيانات</h4>
                    <p className="text-sm text-yellow-700 mb-4">
                      يمكنك طلب نسخة من بياناتك أو حذف حسابك نهائياً
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" onClick={handleExportData}>
                        <Download className="w-4 h-4 mr-2" />
                        تصدير البيانات
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        إدارة الموافقات
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Settings */}
            <TabsContent value="account">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      إدارة الحساب
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="font-medium text-green-800 mb-2">خطة العضوية</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <Badge className="bg-green-100 text-green-800">Premium</Badge>
                            <p className="text-sm text-green-600 mt-1">صالحة حتى 15/12/2024</p>
                          </div>
                          <Button size="sm">ترقية الخطة</Button>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-medium text-blue-800 mb-2">الاستخدام الشهري</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>المجموعات</span>
                            <span>8/20</span>
                          </div>
                          <div className="w-full bg-blue-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '40%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">إدارة البيانات</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          تصدير البيانات
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          استيراد البيانات
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4" />
                          مزامنة البيانات
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-4">إحصائيات الحساب</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">45</div>
                          <div className="text-sm text-gray-600">مجموعة</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">2.5M</div>
                          <div className="text-sm text-gray-600">توفير (ر.س)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">156</div>
                          <div className="text-sm text-gray-600">صفقة</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">4.9</div>
                          <div className="text-sm text-gray-600">التقييم</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center gap-2">
                      <Trash2 className="w-5 h-5" />
                      المنطقة الخطرة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">حذف الحساب</h4>
                      <p className="text-sm text-red-600 mb-4">
                        عملية حذف الحساب نهائية ولا يمكن التراجع عنها. ستفقد جميع بياناتك ومجموعاتك.
                      </p>
                      <Button variant="destructive" onClick={handleDeleteAccount}>
                        حذف الحساب نهائياً
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="mt-8 flex items-center justify-end gap-4">
            <Button variant="outline">إلغاء</Button>
            <Button onClick={handleSaveSettings} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              حفظ جميع الإعدادات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
