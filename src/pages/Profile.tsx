
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  Edit,
  Camera,
  Shield,
  Bell,
  Key,
  CreditCard,
  Award,
  Star,
  Activity
} from 'lucide-react';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'أحمد',
    lastName: 'محمد',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    location: 'الرياض، المملكة العربية السعودية',
    company: 'شركة التقنية المتقدمة',
    bio: 'خبير في مجال التقنية والأعمال، متخصص في إدارة المشاريع والتطوير',
    joinDate: '2023-01-15'
  });

  const achievements = [
    { title: 'عضو ذهبي', description: 'حقق أكثر من 50 صفقة ناجحة', icon: Award, color: 'text-yellow-600' },
    { title: 'موثق', description: 'تم التحقق من الهوية والبيانات', icon: Shield, color: 'text-green-600' },
    { title: 'نجم المجموعات', description: 'قائد أكثر من 20 مجموعة', icon: Star, color: 'text-blue-600' },
    { title: 'مفاوض محترف', description: 'خبرة 5+ سنوات في التفاوض', icon: Activity, color: 'text-purple-600' }
  ];

  const stats = [
    { label: 'إجمالي المجموعات', value: '45', description: 'مجموعة نشطة ومكتملة' },
    { label: 'التوفير المحقق', value: '2.5M ر.س', description: 'إجمالي التوفير' },
    { label: 'التقييم', value: '4.9/5', description: 'متوسط تقييم الأعضاء' },
    { label: 'معدل النجاح', value: '94%', description: 'نسبة المجموعات الناجحة' }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Logic to save profile data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {profileData.firstName.charAt(0)}
                  </div>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {profileData.firstName} {profileData.lastName}
                      </h1>
                      <p className="text-gray-600 mt-1">{profileData.company}</p>
                    </div>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      {isEditing ? 'إلغاء' : 'تعديل الملف الشخصي'}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                        <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                        <div className="text-xs text-gray-500">{stat.description}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {achievements.map((achievement, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <achievement.icon className={`w-4 h-4 ${achievement.color}`} />
                        {achievement.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">المعلومات الشخصية</TabsTrigger>
              <TabsTrigger value="security">الأمان</TabsTrigger>
              <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
              <TabsTrigger value="payment">الدفع</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="info" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>المعلومات الأساسية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">الاسم الأول</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">اسم العائلة</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
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
                      <div className="md:col-span-2">
                        <Label htmlFor="company">الشركة</Label>
                        <Input
                          id="company"
                          value={profileData.company}
                          onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="bio">نبذة شخصية</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-2 flex gap-4">
                        <Button onClick={handleSaveProfile}>حفظ التغييرات</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>إلغاء</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <User className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium">{profileData.firstName} {profileData.lastName}</div>
                          <div className="text-sm text-gray-500">الاسم الكامل</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium">{profileData.email}</div>
                          <div className="text-sm text-gray-500">البريد الإلكتروني</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium">{profileData.phone}</div>
                          <div className="text-sm text-gray-500">رقم الهاتف</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Building className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium">{profileData.company}</div>
                          <div className="text-sm text-gray-500">الشركة</div>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium mb-2">نبذة شخصية</div>
                        <div className="text-gray-700">{profileData.bio}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    إعدادات الأمان
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">تغيير كلمة المرور</h3>
                        <p className="text-sm text-gray-500">آخر تغيير منذ 3 أشهر</p>
                      </div>
                      <Button variant="outline">
                        <Key className="w-4 h-4 mr-2" />
                        تغيير
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">المصادقة الثنائية</h3>
                        <p className="text-sm text-gray-500">حماية إضافية لحسابك</p>
                      </div>
                      <Badge variant="outline" className="text-green-600">مفعل</Badge>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">جلسات نشطة</h3>
                        <p className="text-sm text-gray-500">إدارة الأجهزة المتصلة</p>
                      </div>
                      <Button variant="outline">عرض الجلسات</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    إعدادات الإشعارات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      { title: 'إشعارات المجموعات الجديدة', description: 'عند إنشاء مجموعات في مجالك' },
                      { title: 'إشعارات العروض', description: 'عند وصول عروض جديدة' },
                      { title: 'إشعارات المفاوضات', description: 'تحديثات حالة المفاوضات' },
                      { title: 'إشعارات النظام', description: 'تحديثات المنصة والصيانة' },
                      { title: 'النشرة الإخبارية', description: 'أخبار وتحديثات شهرية' }
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{setting.title}</div>
                          <div className="text-sm text-gray-500">{setting.description}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    طرق الدفع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">بطاقات الدفع المحفوظة</h3>
                      <Button>إضافة بطاقة جديدة</Button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5" />
                          <div>
                            <div className="font-medium">•••• •••• •••• 4567</div>
                            <div className="text-sm text-gray-500">فيزا - ينتهي في 12/25</div>
                          </div>
                        </div>
                        <Badge>أساسي</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-4">سجل المعاملات</h3>
                    <div className="space-y-3">
                      {[
                        { date: '2024-01-20', description: 'رسوم عضوية شهرية', amount: '99 ر.س' },
                        { date: '2024-01-15', description: 'رسوم مجموعة الإلكترونيات', amount: '25 ر.س' },
                        { date: '2024-01-10', description: 'رسوم خدمة التفاوض', amount: '15 ر.س' }
                      ].map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-gray-500">{transaction.date}</div>
                          </div>
                          <div className="font-medium">{transaction.amount}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
