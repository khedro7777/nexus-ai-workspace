
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Auth = () => {
  const { signUp, sendOTP, verifyOTP, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState('');
  
  // Sign up form
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    country: '',
    userRole: 'client'
  });

  // OTP form
  const [otpData, setOtpData] = useState({
    email: '',
    otp: ''
  });

  useEffect(() => {
    if (user) {
      // التوجه حسب نوع المستخدم
      const userRole = user.user_metadata?.user_role || 'client';
      switch (userRole) {
        case 'supplier':
          navigate('/supplier-dashboard');
          break;
        case 'freelancer':
          navigate('/freelancer-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // إنشاء كلمة مرور عشوائية لأن Supabase يتطلب كلمة مرور
    const randomPassword = Math.random().toString(36).slice(-8);
    
    const { error } = await signUp(
      signUpData.email,
      randomPassword,
      signUpData.fullName,
      signUpData.country,
      signUpData.userRole
    );
    
    if (!error) {
      // إرسال OTP بعد التسجيل مباشرة
      await sendOTP(signUpData.email);
      setEmail(signUpData.email);
      setShowOTP(true);
    }
    
    setLoading(false);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await sendOTP(otpData.email);
    
    if (!error) {
      setShowOTP(true);
      setEmail(otpData.email);
    }
    
    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await verifyOTP(email, otpData.otp);
    
    if (!error) {
      // سيتم التوجه تلقائياً عبر useEffect أعلاه
    }
    
    setLoading(false);
  };

  const countries = [
    { value: 'SA', label: 'السعودية' },
    { value: 'AE', label: 'الإمارات' },
    { value: 'EG', label: 'مصر' },
    { value: 'JO', label: 'الأردن' },
    { value: 'LB', label: 'لبنان' },
    { value: 'KW', label: 'الكويت' },
    { value: 'QA', label: 'قطر' },
    { value: 'BH', label: 'البحرين' },
    { value: 'OM', label: 'عمان' },
    { value: 'IQ', label: 'العراق' },
    { value: 'SY', label: 'سوريا' },
    { value: 'YE', label: 'اليمن' },
    { value: 'MA', label: 'المغرب' },
    { value: 'TN', label: 'تونس' },
    { value: 'DZ', label: 'الجزائر' },
    { value: 'LY', label: 'ليبيا' },
    { value: 'SD', label: 'السودان' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            منصة GPO الموحدة
          </CardTitle>
          <CardDescription>
            منصة التعاقد الذكي بين المشترين والموردين والمستقلين
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="signup">إنشاء حساب</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-4">
              {!showOTP ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div>
                    <Label htmlFor="otp-email">البريد الإلكتروني</Label>
                    <Input
                      id="otp-email"
                      type="email"
                      value={otpData.email}
                      onChange={(e) => setOtpData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="text-right"
                      dir="ltr"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'جارٍ الإرسال...' : 'إرسال رمز التحقق'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="text-center text-sm text-gray-600 mb-4">
                    تم إرسال رمز التحقق إلى: {email}
                  </div>
                  <div className="flex flex-col items-center space-y-4">
                    <Label htmlFor="otp">رمز التحقق (6 أرقام)</Label>
                    <InputOTP
                      maxLength={6}
                      value={otpData.otp}
                      onChange={(value) => setOtpData(prev => ({ ...prev, otp: value }))}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading || otpData.otp.length !== 6}>
                    {loading ? 'جارٍ التحقق...' : 'تأكيد الدخول'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setShowOTP(false);
                      setOtpData(prev => ({ ...prev, otp: '' }));
                    }}
                  >
                    إعادة إرسال الرمز
                  </Button>
                </form>
              )}
            </TabsContent>

            <TabsContent value="signup" className="mt-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input
                    id="fullName"
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                    className="text-right"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <Label htmlFor="signup-email">البريد الإلكتروني</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="text-right"
                    dir="ltr"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
                <div>
                  <Label htmlFor="country">الدولة</Label>
                  <Select value={signUpData.country} onValueChange={(value) => setSignUpData(prev => ({ ...prev, country: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدولة" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="userRole">نوع الحساب</Label>
                  <Select value={signUpData.userRole} onValueChange={(value) => setSignUpData(prev => ({ ...prev, userRole: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">عميل - مشتري</SelectItem>
                      <SelectItem value="supplier">مورد - بائع</SelectItem>
                      <SelectItem value="freelancer">مستقل - خدمات</SelectItem>
                      <SelectItem value="investor">مستثمر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'جارٍ إنشاء الحساب...' : 'أنشئ حسابي الآن'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
