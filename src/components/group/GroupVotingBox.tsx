
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Vote, 
  Clock, 
  Users, 
  CheckCircle,
  TrendingUp,
  BarChart3,
  Zap,
  Calendar,
  Target,
  Shield
} from 'lucide-react';

interface GroupVotingBoxProps {
  groupId: string;
}

const GroupVotingBox: React.FC<GroupVotingBoxProps> = ({ groupId }) => {
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  // Mock voting sessions
  const votingSessions = [
    {
      id: '1',
      title: 'التصويت على ميزانية Q1 2024',
      description: 'تحديد ميزانية الربع الأول للعام 2024',
      type: 'budget',
      status: 'active',
      created_by: 'فاطمة أحمد',
      created_at: '2024-01-20T10:00:00Z',
      end_time: '2024-01-25T18:00:00Z',
      total_voters: 12,
      votes_cast: 9,
      quorum: 75,
      voting_power_used: 850,
      total_voting_power: 1000,
      options: [
        { id: '1', text: 'الموافقة على الميزانية كما هي', votes: 6, power: 520 },
        { id: '2', text: 'تعديل بنود الميزانية', votes: 2, power: 180 },
        { id: '3', text: 'رفض الميزانية', votes: 1, power: 150 }
      ],
      participation_rate: 75,
      security_level: 'high'
    },
    {
      id: '2',
      title: 'اختيار استراتيجية التسويق الجديدة',
      description: 'تحديد الاستراتيجية التسويقية المناسبة للمرحلة القادمة',
      type: 'strategy',
      status: 'completed',
      created_by: 'أحمد محمد',
      created_at: '2024-01-15T09:00:00Z',
      end_time: '2024-01-20T18:00:00Z',
      total_voters: 12,
      votes_cast: 11,
      quorum: 75,
      voting_power_used: 950,
      total_voting_power: 1000,
      options: [
        { id: '1', text: 'التسويق الرقمي المكثف', votes: 7, power: 650 },
        { id: '2', text: 'التسويق التقليدي', votes: 2, power: 150 },
        { id: '3', text: 'مزيج من الاستراتيجيتين', votes: 2, power: 150 }
      ],
      participation_rate: 92,
      security_level: 'high',
      result: 'approved',
      winner_option: '1'
    }
  ];

  const getRemainingTime = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'انتهت';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} يوم`;
    return `${hours} ساعة`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'budget': return <BarChart3 className="w-4 h-4 text-green-500" />;
      case 'strategy': return <Target className="w-4 h-4 text-blue-500" />;
      case 'governance': return <Shield className="w-4 h-4 text-purple-500" />;
      default: return <Vote className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Card className="h-[800px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Vote className="w-5 h-5" />
          صندوق التصويت المتقدم
        </CardTitle>
        <div className="text-sm text-gray-600">
          نظام تصويت مؤمن بتقنية البلوك تشين لضمان الشفافية والعدالة
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Voting Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Zap className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-blue-600">
              {votingSessions.filter(v => v.status === 'active').length}
            </div>
            <div className="text-xs text-blue-600">جلسات نشطة</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-green-600">
              {Math.round(votingSessions.reduce((acc, v) => acc + v.participation_rate, 0) / votingSessions.length)}%
            </div>
            <div className="text-xs text-green-600">متوسط المشاركة</div>
          </div>
          
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Shield className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-xs text-purple-600">مستوى الأمان</div>
          </div>
        </div>

        {/* Voting Sessions */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {votingSessions.map((session) => (
            <Card key={session.id} className="border-2 hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(session.type)}
                      <h3 className="font-semibold">{session.title}</h3>
                      <Badge className={getStatusColor(session.status)}>
                        {session.status === 'active' ? 'نشط' : 
                         session.status === 'completed' ? 'مكتمل' : 'قيد الانتظار'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-xs">{session.created_by.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{session.created_by}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(session.created_at).toLocaleDateString('ar')}</span>
                      </div>
                      
                      {session.status === 'active' && (
                        <div className="flex items-center gap-1 text-orange-600">
                          <Clock className="w-3 h-3" />
                          <span>ينتهي خلال {getRemainingTime(session.end_time)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600">
                      {session.votes_cast}/{session.total_voters}
                    </div>
                    <div className="text-xs text-gray-500">مشارك</div>
                    
                    <div className="text-sm font-bold text-green-600 mt-1">
                      {session.voting_power_used}/{session.total_voting_power}
                    </div>
                    <div className="text-xs text-gray-500">قوة تصويت</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Participation Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>نسبة المشاركة</span>
                    <span>{session.participation_rate}%</span>
                  </div>
                  <Progress value={session.participation_rate} className="h-2" />
                </div>

                {/* Voting Options */}
                <div className="space-y-2 mb-4">
                  {session.options.map((option, index) => {
                    const percentage = Math.round((option.power / session.voting_power_used) * 100);
                    const isWinner = session.winner_option === option.id;
                    
                    return (
                      <div key={option.id} className={`p-3 rounded-lg border-2 transition-colors ${
                        isWinner ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-medium ${isWinner ? 'text-green-800' : 'text-gray-800'}`}>
                            {option.text}
                            {isWinner && <CheckCircle className="inline w-4 h-4 ml-2 text-green-600" />}
                          </span>
                          <div className="text-right">
                            <div className="text-sm font-bold">{percentage}%</div>
                            <div className="text-xs text-gray-500">{option.votes} أصوات</div>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>

                {/* Security & Blockchain Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-blue-800 text-sm">
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">مؤمن بالبلوك تشين</span>
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    جميع الأصوات مسجلة ومشفرة • لا يمكن التلاعب • شفافية كاملة
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {session.status === 'active' ? (
                    <>
                      <Button className="flex-1" size="sm">
                        <Vote className="w-4 h-4 ml-2" />
                        صوت الآن
                      </Button>
                      <Button variant="outline" size="sm">
                        تفاصيل
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="flex-1" size="sm">
                        عرض النتائج
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 ml-2" />
                        تحليل
                      </Button>
                    </>
                  )}
                </div>

                {/* Result Banner */}
                {session.status === 'completed' && session.result && (
                  <div className="mt-3 p-2 bg-green-100 border border-green-300 rounded text-center">
                    <span className="text-green-800 font-medium text-sm">
                      ✅ تم اعتماد القرار بأغلبية {session.options.find(o => o.id === session.winner_option)?.votes} أصوات
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupVotingBox;
