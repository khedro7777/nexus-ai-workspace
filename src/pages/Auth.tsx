
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/components/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, User, Globe, Shield, ArrowRight } from 'lucide-react';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    role: '' as 'client' | 'supplier' | 'freelancer' | 'browse'
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(loginData.email, loginData.password);
      if (success) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في منصة GPO",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "يرجى التحقق من البيانات المدخلة",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await register({ ...registerData, password: registerData.password });
      if (success) {
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "مرحباً بك في منصة GPO",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "خطأ في إنشاء الحساب",
          description: "يرجى المحاولة مرة أخرى",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async () => {
    setIsLoading(true);
    // محاكاة إرسال OTP
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast({
        title: "تم إرسال رمز التحقق",
        description: "يرجى التحقق من بريدك الإلكتروني",
      });
    }, 1000);
  };

  const verifyOTP = async () => {
    if (otp.length === 6) {
      setIsLoading(true);
      // محاكاة التحقق من OTP
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "تم التحقق بنجاح",
          description: "مرحباً بك في منصة GPO",
        });
        navigate('/dashboard');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GPO Platform</h1>
          <p className="text-gray-600">منصة التفاوض التعاوني الذكية</p>
        </div>

        {!otpSent ? (
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">الدخول إلى المنصة</CardTitle>
              <CardDescription>اختر طريقة الدخول المناسبة لك</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
                  <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="pr-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">كلمة المرور</Label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="pr-10"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "جاري تسجيل الدخول..." : "دخول"}
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </Button>
                  </form>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">أو</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={sendOTP}
                    disabled={isLoading}
                  >
                    تسجيل الدخول عبر OTP
                    <Mail className="w-4 h-4 mr-2" />
                  </Button>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          placeholder="أدخل اسمك الكامل"
                          value={registerData.name}
                          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                          className="pr-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">البريد الإلكتروني</Label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="your@email.com"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          className="pr-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">الدولة</Label>
                      <div className="relative">
                        <Globe className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        <Select
                          value={registerData.country}
                          onValueChange={(value) => setRegisterData({ ...registerData, country: value })}
                        >
                          <SelectTrigger className="pr-10">
                            <SelectValue placeholder="اختر دولتك" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="saudi">السعودية</SelectItem>
                            <SelectItem value="uae">الإمارات</SelectItem>
                            <SelectItem value="egypt">مصر</SelectItem>
                            <SelectItem value="jordan">الأردن</SelectItem>
                            <SelectItem value="kuwait">الكويت</SelectItem>
                            <SelectItem value="qatar">قطر</SelectItem>
                            <SelectItem value="bahrain">البحرين</SelectItem>
                            <SelectItem value="oman">عمان</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">دورك في المنصة</Label>
                      <Select
                        value={registerData.role}
                        onValueChange={(value: 'client' | 'supplier' | 'freelancer' | 'browse') => setRegisterData({ ...registerData, role: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر دورك" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="client">عميل</SelectItem>
                          <SelectItem value="supplier">مورد</SelectItem>
                          <SelectItem value="freelancer">مستقل</SelectItem>
                          <SelectItem value="browse">متصفح فقط</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">كلمة المرور</Label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="••••••••"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          className="pr-10"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">تحقق من هويتك</CardTitle>
              <CardDescription>
                أدخل رمز التحقق المرسل إلى بريدك الإلكتروني
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">رمز التحقق</Label>
                <Input
                  id="otp"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>

              <Button 
                onClick={verifyOTP} 
                className="w-full" 
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? "جاري التحقق..." : "تحقق"}
              </Button>

              <Button 
                variant="outline" 
                onClick={() => setOtpSent(false)} 
                className="w-full"
              >
                العودة للخلف
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
