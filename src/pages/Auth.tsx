
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Auth = () => {
  const { signIn, signUp, sendOTP, verifyOTP, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState('');
  
  // Sign in form
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Sign up form
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
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
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(signInData.email, signInData.password);
    
    if (!error) {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(
      signUpData.email,
      signUpData.password,
      signUpData.fullName,
      signUpData.country,
      signUpData.userRole
    );
    
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
      navigate('/dashboard');
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
    { value: 'OM', label: 'عمان' }
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="signin">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="signup">إنشاء حساب</TabsTrigger>
              <TabsTrigger value="otp">رمز التحقق</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="signin-email">البريد الإلكتروني</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={signInData.email}
                    onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="text-right"
                    dir="ltr"
                  />
                </div>
                <div>
                  <Label htmlFor="signin-password">كلمة المرور</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={signInData.password}
                    onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
                </Button>
              </form>
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
                  />
                </div>
                <div>
                  <Label htmlFor="signup-password">كلمة المرور</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                    required
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
                      <SelectItem value="client">عميل</SelectItem>
                      <SelectItem value="supplier">مورد</SelectItem>
                      <SelectItem value="freelancer">مستقل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'جارٍ إنشاء الحساب...' : 'أنشئ حسابي الآن'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="otp" className="mt-4">
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
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'جارٍ الإرسال...' : 'أرسل رمز التحقق'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="text-center text-sm text-gray-600 mb-4">
                    تم إرسال رمز التحقق إلى: {email}
                  </div>
                  <div>
                    <Label htmlFor="otp">رمز التحقق (6 أرقام)</Label>
                    <Input
                      id="otp"
                      value={otpData.otp}
                      onChange={(e) => setOtpData(prev => ({ ...prev, otp: e.target.value }))}
                      required
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                      dir="ltr"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'جارٍ التحقق...' : 'تأكيد الدخول'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowOTP(false)}
                  >
                    إعادة إرسال الرمز
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
