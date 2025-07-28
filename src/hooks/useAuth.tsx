import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, fullName: string, country: string, userRole: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  sendOTP: (email: string) => Promise<{ error: any }>;
  verifyOTP: (email: string, token: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // إعداد مستمع تغيير حالة المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // فحص الجلسة الحالية
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, fullName: string, country: string, userRole: string) => {
    try {
      // إنشاء كلمة مرور عشوائية (مطلوبة من Supabase لكن لن تُستخدم)
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password: randomPassword,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            country,
            user_role: userRole
          }
        }
      });

      if (error) {
        toast({
          title: "خطأ في التسجيل",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "تم التسجيل بنجاح",
          description: "تم إرسال رابط التأكيد إلى بريدك الإلكتروني"
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "خطأ في التسجيل",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const sendOTP = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          shouldCreateUser: false // لا ننشئ مستخدم جديد هنا
        }
      });

      if (error) {
        // إذا لم يكن المستخدم موجوداً، نحاول إنشاؤه
        if (error.message.includes('User not found')) {
          toast({
            title: "المستخدم غير موجود",
            description: "يرجى إنشاء حساب جديد أولاً",
            variant: "destructive"
          });
        } else {
          toast({
            title: "خطأ في إرسال الرمز",
            description: error.message,
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "تم الإرسال",
          description: "تم إرسال رمز التحقق إلى بريدك الإلكتروني"
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "خطأ في إرسال الرمز",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const verifyOTP = async (email: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email'
      });

      if (error) {
        toast({
          title: "رمز غير صحيح",
          description: "يرجى التحقق من الرمز والمحاولة مرة أخرى",
          variant: "destructive"
        });
      } else {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في منصة GPO"
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "خطأ في التحقق",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح"
      });
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الخروج",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signOut,
      sendOTP,
      verifyOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
