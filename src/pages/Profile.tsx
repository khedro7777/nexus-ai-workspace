
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Star,
  Award,
  Calendar
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [profileData, setProfileData] = useState({
    full_name: '',
    phone: '',
    address: '',
    company: '',
    bio: '',
    skills: '',
    experience_years: 0
  });

  // Fetch profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      // Update form data
      setProfileData({
        full_name: data.full_name || '',
        phone: data.phone || '',
        address: data.address || '',
        company: data.company || '',
        bio: data.bio || '',
        skills: data.skills || '',
        experience_years: data.experience_years || 0
      });
      
      return data;
    },
    enabled: !!user?.id
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updatedData)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث ملفك الشخصي بنجاح"
      });
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "فشل في تحديث الملف الشخصي",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(profileData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <User className="w-8 h-8" />
            الملف الشخصي
          </h1>
          <p className="text-gray-600">إدارة معلوماتك الشخصية والمهنية</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الملف الشخصي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">{profile?.full_name || 'اسم المستخدم'}</h3>
                  <p className="text-gray-500">{user?.email}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                  {profile?.phone && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                  {profile?.address && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.address}</span>
                    </div>
                  )}
                  {profile?.company && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Building className="w-4 h-4" />
                      <span>{profile.company}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>انضم في {new Date(profile?.created_at).toLocaleDateString('ar')}</span>
                  </div>
                </div>

                {profile?.experience_years && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium">سنوات الخبرة</span>
                    </div>
                    <Badge variant="outline">{profile.experience_years} سنة</Badge>
                  </div>
                )}

                {profile?.skills && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">المهارات</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.split(',').map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>تحديث المعلومات</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="full_name">الاسم الكامل</Label>
                      <Input
                        id="full_name"
                        value={profileData.full_name}
                        onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        placeholder="أدخل رقم هاتفك"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">الشركة</Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                        placeholder="أدخل اسم شركتك"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience_years">سنوات الخبرة</Label>
                      <Input
                        id="experience_years"
                        type="number"
                        value={profileData.experience_years}
                        onChange={(e) => setProfileData({...profileData, experience_years: parseInt(e.target.value) || 0})}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">العنوان</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      placeholder="أدخل عنوانك"
                    />
                  </div>

                  <div>
                    <Label htmlFor="skills">المهارات</Label>
                    <Input
                      id="skills"
                      value={profileData.skills}
                      onChange={(e) => setProfileData({...profileData, skills: e.target.value})}
                      placeholder="مثال: تطوير الويب، تصميم، ترجمة (مفصولة بفواصل)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">نبذة شخصية</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      placeholder="اكتب نبذة قصيرة عن نفسك وخبراتك"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      disabled={updateProfileMutation.isPending}
                      className="flex-1"
                    >
                      {updateProfileMutation.isPending ? 'جاري التحديث...' : 'حفظ التغييرات'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setProfileData({
                        full_name: profile?.full_name || '',
                        phone: profile?.phone || '',
                        address: profile?.address || '',
                        company: profile?.company || '',
                        bio: profile?.bio || '',
                        skills: profile?.skills || '',
                        experience_years: profile?.experience_years || 0
                      })}
                      className="flex-1"
                    >
                      إلغاء التغييرات
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
