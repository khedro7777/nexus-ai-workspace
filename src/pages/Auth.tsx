import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mail, 
  Shield, 
  User, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

const Auth = () => {
  const { user, signUp, sendOTP, verifyOTP, resendOTP, loading } = useAuth();
  const navigate = useNavigate();
  
  // States
  const [activeTab, setActiveTab] = useState('signin');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [currentEmail, setCurrentEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Sign up form
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    country: '',
    role: 'member'
  });

  // Sign in form
  const [signInData, setSignInData] = useState({
    email: ''
  });

  // OTP form
  const [otpCode, setOtpCode] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      switch (user.role) {
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

  // OTP Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Handle Sign Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await signUp(
      signUpData.email,
      signUpData.name,
      signUpData.country,
      signUpData.role
    );
    
    if (!error) {
      // Auto send OTP after successful signup
      await sendOTP(signUpData.email);
      setCurrentEmail(signUpData.email);
      setStep('otp');
      setOtpTimer(600); // 10 minutes
    }
  };

  // Handle Sign In (Send OTP)
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await sendOTP(signInData.email);
    
    if (!error) {
      setCurrentEmail(signInData.email);
      setStep('otp');
      setOtpTimer(600); // 10 minutes
    }
  };

  // Handle OTP Verification
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await verifyOTP(currentEmail, otpCode);
    
    if (!error) {
      // User will be redirected via useEffect
    }
  };

  // Handle Resend OTP
  const handleResendOTP = async () => {
    const { error } = await resendOTP(currentEmail);
    
    if (!error) {
      setOtpCode('');
      setOtpTimer(600); // 10 minutes
    }
  };

  // Reset to email step
  const resetToEmailStep = () => {
    setStep('email');
    setOtpCode('');
    setCurrentEmail('');
    setOtpTimer(0);
  };

  // Format timer
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

  const userRoles = [
    { value: 'member', label: 'عضو - مشتري', description: 'للانضمام للمجموعات والشراء الجماعي' },
    { value: 'supplier', label: 'مورد - بائع', description: 'لتقديم المنتجات والخدمات' },
    { value: 'freelancer', label: 'مستقل - خدمات', description: 'لتقديم الخدمات المستقلة' },
    { value: 'investor', label: 'مستثمر', description: 'للاستثمار في المشاريع والمجموعات' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🧠</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GPODO</h1>
                <p className="text-xs text-gray-500">Smart Collaborative Platform</p>
              </div>
            </Link>
            <Link to="/" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-md">
          {step === 'email' ? (
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  مرحباً بك في GPODO
                </CardTitle>
                <CardDescription className="text-gray-600">
                  منصة التعاون الذكي والشراء الجماعي
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="signin" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      تسجيل الدخول
                    </TabsTrigger>
                    <TabsTrigger value="signup" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      إنشاء حساب
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="signin" className="space-y-4">
                    <Alert>
                      <Mail className="h-4 w-4" />
                      <AlertDescription>
                        أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق
                      </AlertDescription>
                    </Alert>
                    
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          البريد الإلكتروني
                        </Label>
                        <Input
                          id="signin-email"
                          type="email"
                          value={signInData.email}
                          onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="text-right"
                          dir="ltr"
                          placeholder="example@domain.com"
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            جارٍ الإرسال...
                          </div>
                        ) : (
                          'إرسال رمز التحقق'
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        أنشئ حسابك الجديد وانضم لمجتمع GPODO
                      </AlertDescription>
                    </Alert>
                    
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          الاسم الكامل
                        </Label>
                        <Input
                          id="name"
                          value={signUpData.name}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, name: e.target.value }))}
                          required
                          className="text-right"
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          البريد الإلكتروني
                        </Label>
                        <Input
                          id="signup-email"
                          type="email"
                          value={signUpData.email}
                          onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          className="text-right"
                          dir="ltr"
                          placeholder="example@domain.com"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country" className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          الدولة
                        </Label>
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
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">نوع الحساب</Label>
                        <Select value={signUpData.role} onValueChange={(value) => setSignUpData(prev => ({ ...prev, role: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {userRoles.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                <div className="flex flex-col items-start">
                                  <span className="font-medium">{role.label}</span>
                                  <span className="text-xs text-gray-500">{role.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            جارٍ إنشاء الحساب...
                          </div>
                        ) : (
                          'إنشاء حساب جديد'
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  تحقق من بريدك الإلكتروني
                </CardTitle>
                <CardDescription className="text-gray-600">
                  تم إرسال رمز التحقق إلى
                  <br />
                  <Badge variant="secondary" className="mt-2">{currentEmail}</Badge>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    أدخل رمز التحقق المكون من 6 أرقام الذي تم إرساله إلى بريدك الإلكتروني
                  </AlertDescription>
                </Alert>
                
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Label htmlFor="otp" className="text-center">رمز التحقق</Label>
                    <InputOTP
                      maxLength={6}
                      value={otpCode}
                      onChange={setOtpCode}
                      className="justify-center"
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
                    
                    {otpTimer > 0 && (
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        انتهاء الصلاحية خلال: {formatTimer(otpTimer)}
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading || otpCode.length !== 6}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        جارٍ التحقق...
                      </div>
                    ) : (
                      'تأكيد الدخول'
                    )}
                  </Button>
                </form>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={handleResendOTP}
                    disabled={loading || otpTimer > 540} // Allow resend after 1 minute
                  >
                    <RefreshCw className="h-4 w-4 ml-2" />
                    إعادة إرسال الرمز
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="w-full"
                    onClick={resetToEmailStep}
                  >
                    تغيير البريد الإلكتروني
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Footer */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <p>
              بالمتابعة، أنت توافق على{' '}
              <Link to="/terms" className="text-blue-600 hover:underline">
                شروط الاستخدام
              </Link>
              {' '}و{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                سياسة الخصوصية
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

