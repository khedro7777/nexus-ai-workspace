// صفحة التصويت - إدارة وعرض جلسات التصويت الجماعي للمجموعات
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  Vote, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BarChart3,
  MessageSquare,
  Calendar
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useToast } from '@/hooks/use-toast';

const VotingPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // جلب بيانات جلسة التصويت
  const { data: votingSession, isLoading } = useQuery({
    queryKey: ['voting-session', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('voting_sessions')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  // جلب الأصوات
  const { data: votes } = useQuery({
    queryKey: ['votes', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('votes')
        .select('*')
        .eq('voting_session_id', id);
      
      if (error) throw error;
      return data;
    }
  });

  // جلب صوت المستخدم الحالي
  const { data: userVote } = useQuery({
    queryKey: ['user-vote', id, user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('votes')
        .select('*')
        .eq('voting_session_id', id)
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user?.id
  });

  // طفرة للتصويت
  const voteMutation = useMutation({
    mutationFn: async (option: string) => {
      if (!user?.id) throw new Error('يجب تسجيل الدخول للتصويت');
      
      const { data, error } = await supabase
        .from('votes')
        .insert({
          voting_session_id: id,
          user_id: user.id,
          option_selected: option
        });
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "تم التصويت بنجاح",
        description: "تم تسجيل صوتك وإشعار باقي الأعضاء",
      });
      queryClient.invalidateQueries({ queryKey: ['votes', id] });
      queryClient.invalidateQueries({ queryKey: ['user-vote', id, user?.id] });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ في التصويت",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleVote = () => {
    if (!selectedOption) {
      toast({
        title: "يرجى اختيار خيار",
        description: "اختر أحد الخيارات المتاحة قبل التصويت",
        variant: "destructive"
      });
      return;
    }
    
    voteMutation.mutate(selectedOption);
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

  if (!votingSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">جلسة التصويت غير موجودة</p>
        </div>
      </div>
    );
  }

  // حساب النتائج
  const options = votingSession.options as string[];
  const totalVotes = votes?.length || 0;
  const voteResults = options.map(option => {
    const count = votes?.filter(vote => vote.option_selected === option).length || 0;
    const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
    return { option, count, percentage };
  });

  // التحقق من انتهاء فترة التصويت
  const isExpired = new Date() > new Date(votingSession.deadline);
  const canVote = !userVote && !isExpired && votingSession.status === 'active';
  const timeLeft = new Date(votingSession.deadline).getTime() - new Date().getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    if (isExpired) return 'منتهية';
    switch (status) {
      case 'active': return 'نشطة';
      case 'completed': return 'مكتملة';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* رأس جلسة التصويت */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{votingSession.title}</CardTitle>
                <p className="text-gray-600 mb-4">{votingSession.description}</p>
              </div>
              <Badge className={getStatusColor(votingSession.status)}>
                {getStatusText(votingSession.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm">إجمالي الأصوات: {totalVotes}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  {isExpired ? 'انتهت' : `${daysLeft} أيام متبقية`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">ينتهي: {new Date(votingSession.deadline).toLocaleDateString('ar')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Vote className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  {userVote ? 'صوتت بالفعل' : canVote ? 'يمكنك التصويت' : 'لا يمكن التصويت'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* منطقة التصويت */}
          <div className="lg:col-span-2">
            {canVote ? (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Vote className="w-5 h-5" />
                    اختر خيارك
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                    {options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  <div className="flex gap-4">
                    <Button 
                      onClick={handleVote} 
                      disabled={!selectedOption || voteMutation.isPending}
                      className="flex-1"
                    >
                      {voteMutation.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          جاري التصويت...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 ml-2" />
                          تأكيد التصويت
                        </>
                      )}
                    </Button>
                    <Button variant="outline" disabled>
                      <XCircle className="w-4 h-4 ml-2" />
                      امتنع عن التصويت
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : userVote ? (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    تم التصويت
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800">
                      لقد صوتت بـ: <strong>{userVote.option_selected}</strong>
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      تاريخ التصويت: {new Date(userVote.voted_at).toLocaleString('ar')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-600">
                    <AlertCircle className="w-5 h-5" />
                    {isExpired ? 'انتهت فترة التصويت' : 'لا يمكن التصويت'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-800">
                      {isExpired 
                        ? 'انتهت فترة التصويت في هذه الجلسة'
                        : 'جلسة التصويت غير نشطة حالياً'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* النتائج */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  النتائج الحالية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {voteResults.map((result, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{result.option}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{result.count} صوت</span>
                        <span className="font-medium">{result.percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                    <Progress value={result.percentage} className="h-2" />
                  </div>
                ))}
                
                {totalVotes === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Vote className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>لم يتم تسجيل أي أصوات بعد</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* الشريط الجانبي */}
          <div className="space-y-6">
            {/* معلومات الجلسة */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات الجلسة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">تاريخ البداية:</span>
                  <span>{new Date(votingSession.created_at).toLocaleDateString('ar')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تاريخ النهاية:</span>
                  <span>{new Date(votingSession.deadline).toLocaleDateString('ar')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">إجمالي الأصوات:</span>
                  <span>{totalVotes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">نسبة المشاركة:</span>
                  <span>--%</span>
                </div>
              </CardContent>
            </Card>

            {/* خيارات الإشعارات */}
            <Card>
              <CardHeader>
                <CardTitle>الإشعارات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 ml-2" />
                  إشعار بالنتائج
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 ml-2" />
                  تذكير يومي
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 ml-2" />
                  دعوة أعضاء
                </Button>
              </CardContent>
            </Card>

            {/* قواعد التصويت */}
            <Card>
              <CardHeader>
                <CardTitle>قواعد التصويت</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>• كل عضو له صوت واحد فقط</p>
                <p>• لا يمكن تغيير الصوت بعد التسجيل</p>
                <p>• النتائج مرئية للجميع فوراً</p>
                <p>• الأغلبية البسيطة تحدد النتيجة</p>
                <p>• إشعارات يومية للمصوتين غير النشطين</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingPage;