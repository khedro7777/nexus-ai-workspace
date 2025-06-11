
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Camera, 
  Shield, 
  Bell,
  CreditCard,
  Award,
  Settings,
  Save
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    fullName: 'أحمد محمد العلي',
    email: 'ahmed.ali@example.com',
    phone: '+966501234567',
    country: 'السعودية',
    city: 'الرياض',
    company: 'شركة التطوير التقني',
    bio: 'مطور برمجيات متخصص في تطوير التطبيقات والمواقع الإلكترونية مع خبرة 5 سنوات في هذا المجال.',
    skills: ['تطوير الويب', 'React', 'Node.js', 'Python'],
    languages: ['العربية', 'الإنجليزية']
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false
  });

  const userStats = {
    totalProjects: 23,
    completedProjects: 21,
    rating: 4.8,
    memberSince: 'يناير 2023',
    verificationLevel: 'معتمد'
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ تغييرات الملف الشخصي"
      });
    } catch (error) {
      toast({
        title: "خطأ في الحفظ",
        description: "حدث خطأ أثناء حفظ التغييرات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSecuritySave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "تم تحديث الإعدادات",
        description: "تم حفظ إعدادات الأمان والخصوصية"
      });
    } catch (error) {
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء تحديث الإعدادات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">الملف الشخصي</h1>
                <p className="text-gray-600 mt-2">إدارة معلوماتك الشخصية وإعداداتك</p>
              </div>
            </div>

            {/* Profile Overview Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-6 space-x-reverse">
                  <div className="relative">
                    <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      أ م
                    </div>
                    <Button 
                      size="sm" 
                      className="absolute bottom-0 right-0 rounded-full p-2"
                      variant="outline"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{profileData.fullName}</h2>
                    <p className="text-gray-600">{profileData.company}</p>
                    <div className="flex items-center space-x-4 space-x-reverse mt-2">
                      <Badge variant="outline" className="text-green-600">
                        <Shield className="w-3 h-3 ml-1" />
                        {userStats.verificationLevel}
                      </Badge>
                      <span className="text-sm text-gray-500">عضو منذ {userStats.memberSince}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{userStats.rating}</div>
                    <div className="text-sm text-gray-500">التقييم</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{userStats.completedProjects}</div>
                    <div className="text-sm text-gray-500">مشروع مكتمل</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Tabs */}
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">المعلومات الشخصية</TabsTrigger>
                <TabsTrigger value="security">الأمان والخصوصية</TabsTrigger>
                <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
                <TabsTrigger value="billing">الفواتير والدفع</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>المعلومات الأساسية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">الاسم الكامل</Label>
                        <Input
                          id="fullName"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">الشركة</Label>
                        <Input
                          id="company"
                          value={profileData.company}
                          onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">الدولة</Label>
                        <Input
                          id="country"
                          value={profileData.country}
                          onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">المدينة</Label>
                        <Input
                          id="city"
                          value={profileData.city}
                          onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">نبذة شخصية</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        placeholder="اكتب نبذة عن نفسك وخبراتك..."
                      />
                    </div>

                    <div>
                      <Label>المهارات</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                        <Button variant="outline" size="sm">
                          + إضافة مهارة
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveProfile} disabled={loading}>
                        <Save className="w-4 h-4 ml-1" />
                        {loading ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات الأمان</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">المصادقة الثنائية</h3>
                        <p className="text-sm text-gray-500">حماية إضافية لحسابك</p>
                      </div>
                      <Button variant={securitySettings.twoFactorAuth ? "default" : "outline"}>
                        {securitySettings.twoFactorAuth ? 'مفعل' : 'غير مفعل'}
                      </Button>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">تغيير كلمة المرور</h3>
                      <div className="space-y-3">
                        <Input type="password" placeholder="كلمة المرور الحالية" />
                        <Input type="password" placeholder="كلمة المرور الجديدة" />
                        <Input type="password" placeholder="تأكيد كلمة المرور الجديدة" />
                        <Button>تحديث كلمة المرور</Button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSecuritySave} disabled={loading}>
                        <Save className="w-4 h-4 ml-1" />
                        حفظ الإعدادات
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات الإشعارات</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">إشعارات البريد الإلكتروني</h3>
                          <p className="text-sm text-gray-500">تلقي الإشعارات المهمة عبر البريد</p>
                        </div>
                        <Button 
                          variant={securitySettings.emailNotifications ? "default" : "outline"}
                          onClick={() => setSecuritySettings({
                            ...securitySettings, 
                            emailNotifications: !securitySettings.emailNotifications
                          })}
                        >
                          {securitySettings.emailNotifications ? 'مفعل' : 'غير مفعل'}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">إشعارات الرسائل النصية</h3>
                          <p className="text-sm text-gray-500">تلقي الإشعارات العاجلة عبر SMS</p>
                        </div>
                        <Button 
                          variant={securitySettings.smsNotifications ? "default" : "outline"}
                          onClick={() => setSecuritySettings({
                            ...securitySettings, 
                            smsNotifications: !securitySettings.smsNotifications
                          })}
                        >
                          {securitySettings.smsNotifications ? 'مفعل' : 'غير مفعل'}
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSecuritySave} disabled={loading}>
                        <Save className="w-4 h-4 ml-1" />
                        حفظ الإعدادات
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات الدفع</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طرق دفع مضافة</h3>
                      <p className="text-gray-600 mb-4">أضف طريقة دفع لتسهيل عمليات الشراء</p>
                      <Button>
                        <CreditCard className="w-4 h-4 ml-1" />
                        إضافة طريقة دفع
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
