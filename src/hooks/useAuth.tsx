import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  country: string;
  isVerified: boolean;
  ipfsVault?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, name: string, country: string, role: string) => Promise<{ error?: string }>;
  sendOTP: (email: string) => Promise<{ error?: string }>;
  verifyOTP: (email: string, otp: string) => Promise<{ error?: string }>;
  logout: () => void;
  signOut: () => void;
  resendOTP: (email: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data storage (في بيئة الإنتاج سيتم استبدالها بقاعدة بيانات حقيقية)
const STORAGE_KEYS = {
  USERS: 'gpodo_users',
  CURRENT_USER: 'gpodo_current_user',
  OTP_CODES: 'gpodo_otp_codes'
};

// Utility functions
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateIPFSVault = (): string => {
  return `ipfs://Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
};

const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// Storage functions
const getStoredData = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const setStoredData = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Initialize auth state
  useEffect(() => {
    const currentUser = getStoredData(STORAGE_KEYS.CURRENT_USER);
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signUp = async (email: string, name: string, country: string, role: string): Promise<{ error?: string }> => {
    try {
      setLoading(true);

      // Check if user already exists
      const users = getStoredData(STORAGE_KEYS.USERS) || {};
      if (users[email]) {
        toast({
          title: "خطأ في التسجيل",
          description: "هذا البريد الإلكتروني مسجل مسبقاً",
          variant: "destructive"
        });
        return { error: "البريد الإلكتروني مسجل مسبقاً" };
      }

      // Create new user
      const newUser: User = {
        id: generateUserId(),
        email,
        name,
        role,
        country,
        isVerified: false,
        ipfsVault: generateIPFSVault(),
        createdAt: new Date().toISOString()
      };

      // Store user
      users[email] = newUser;
      setStoredData(STORAGE_KEYS.USERS, users);

      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "سيتم إرسال رمز التحقق إلى بريدك الإلكتروني",
      });

      return {};
    } catch (error) {
      const errorMessage = "حدث خطأ أثناء إنشاء الحساب";
      toast({
        title: "خطأ",
        description: errorMessage,
        variant: "destructive"
      });
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Send OTP function
  const sendOTP = async (email: string): Promise<{ error?: string }> => {
    try {
      setLoading(true);

      // Check if user exists
      const users = getStoredData(STORAGE_KEYS.USERS) || {};
      if (!users[email]) {
        toast({
          title: "خطأ",
          description: "البريد الإلكتروني غير مسجل",
          variant: "destructive"
        });
        return { error: "البريد الإلكتروني غير مسجل" };
      }

      // Generate and store OTP
      const otp = generateOTP();
      const otpCodes = getStoredData(STORAGE_KEYS.OTP_CODES) || {};
      otpCodes[email] = {
        code: otp,
        expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
        attempts: 0
      };
      setStoredData(STORAGE_KEYS.OTP_CODES, otpCodes);

      // Simulate sending email (في بيئة الإنتاج سيتم إرسال إيميل حقيقي)
      console.log(`OTP for ${email}: ${otp}`);
      
      toast({
        title: "تم إرسال رمز التحقق",
        description: `تم إرسال رمز التحقق إلى ${email}. الرمز: ${otp}`,
      });

      return {};
    } catch (error) {
      const errorMessage = "حدث خطأ أثناء إرسال رمز التحقق";
      toast({
        title: "خطأ",
        description: errorMessage,
        variant: "destructive"
      });
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP function
  const verifyOTP = async (email: string, otp: string): Promise<{ error?: string }> => {
    try {
      setLoading(true);

      const otpCodes = getStoredData(STORAGE_KEYS.OTP_CODES) || {};
      const storedOTP = otpCodes[email];

      if (!storedOTP) {
        toast({
          title: "خطأ",
          description: "لم يتم العثور على رمز التحقق. يرجى طلب رمز جديد",
          variant: "destructive"
        });
        return { error: "رمز التحقق غير موجود" };
      }

      // Check if OTP expired
      if (Date.now() > storedOTP.expiresAt) {
        delete otpCodes[email];
        setStoredData(STORAGE_KEYS.OTP_CODES, otpCodes);
        toast({
          title: "انتهت صلاحية الرمز",
          description: "انتهت صلاحية رمز التحقق. يرجى طلب رمز جديد",
          variant: "destructive"
        });
        return { error: "انتهت صلاحية رمز التحقق" };
      }

      // Check attempts
      if (storedOTP.attempts >= 3) {
        delete otpCodes[email];
        setStoredData(STORAGE_KEYS.OTP_CODES, otpCodes);
        toast({
          title: "تم تجاوز عدد المحاولات",
          description: "تم تجاوز عدد المحاولات المسموحة. يرجى طلب رمز جديد",
          variant: "destructive"
        });
        return { error: "تم تجاوز عدد المحاولات" };
      }

      // Verify OTP
      if (storedOTP.code !== otp) {
        storedOTP.attempts += 1;
        setStoredData(STORAGE_KEYS.OTP_CODES, otpCodes);
        toast({
          title: "رمز التحقق خاطئ",
          description: `رمز التحقق خاطئ. المحاولات المتبقية: ${3 - storedOTP.attempts}`,
          variant: "destructive"
        });
        return { error: "رمز التحقق خاطئ" };
      }

      // OTP verified successfully
      delete otpCodes[email];
      setStoredData(STORAGE_KEYS.OTP_CODES, otpCodes);

      // Get user and mark as verified
      const users = getStoredData(STORAGE_KEYS.USERS) || {};
      const userData = users[email];
      userData.isVerified = true;
      users[email] = userData;
      setStoredData(STORAGE_KEYS.USERS, users);

      // Set current user
      setStoredData(STORAGE_KEYS.CURRENT_USER, userData);
      setUser(userData);

      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً ${userData.name}`,
      });

      return {};
    } catch (error) {
      const errorMessage = "حدث خطأ أثناء التحقق من الرمز";
      toast({
        title: "خطأ",
        description: errorMessage,
        variant: "destructive"
      });
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP function
  const resendOTP = async (email: string): Promise<{ error?: string }> => {
    return await sendOTP(email);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح",
    });
  };

  // Alias for signOut
  const signOut = logout;

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    sendOTP,
    verifyOTP,
    logout,
    signOut,
    resendOTP
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
