
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Vote, Clock, Users, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import type { Json } from '@/integrations/supabase/types';

interface VotingSessionProps {
  groupId: string;
}

interface VotingSession {
  id: string;
  title: string;
  description: string;
  options: Json;
  deadline: string;
  status: string;
  created_at: string;
  votes: VoteData[];
}

interface VoteData {
  id: string;
  option_selected: string;
  user_id: string;
}

const VotingSession: React.FC<VotingSessionProps> = ({ groupId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<VotingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVotingSessions();
  }, [groupId]);

  const fetchVotingSessions = async () => {
    try {
      const { data: sessionsData, error } = await supabase
        .from('voting_sessions')
        .select(`
          *,
          votes(*)
        `)
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions(sessionsData || []);
    } catch (error) {
      console.error('Error fetching voting sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitVote = async (sessionId: string, option: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('votes')
        .insert({
          voting_session_id: sessionId,
          user_id: user.id,
          option_selected: option
        });

      if (error) throw error;

      toast({
        title: "تم التصويت بنجاح",
        description: "تم تسجيل صوتك بنجاح"
      });

      fetchVotingSessions();
    } catch (error: any) {
      toast({
        title: "خطأ في التصويت",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getOptionsArray = (options: Json): string[] => {
    if (Array.isArray(options)) {
      return options as string[];
    }
    return [];
  };

  const calculateVotePercentage = (session: VotingSession, option: string) => {
    const totalVotes = session.votes.length;
    const optionVotes = session.votes.filter(vote => vote.option_selected === option).length;
    return totalVotes > 0 ? (optionVotes / totalVotes) * 100 : 0;
  };

  const hasUserVoted = (session: VotingSession) => {
    return session.votes.some(vote => vote.user_id === user?.id);
  };

  if (loading) {
    return <div className="text-center py-4">جاري تحميل جلسات التصويت...</div>;
  }

  return (
    <div className="space-y-4">
      {sessions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Vote className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">لا توجد جلسات تصويت نشطة حالياً</p>
          </CardContent>
        </Card>
      ) : (
        sessions.map((session) => {
          const optionsArray = getOptionsArray(session.options);
          
          return (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Vote className="w-5 h-5" />
                      {session.title}
                    </CardTitle>
                    <CardDescription>{session.description}</CardDescription>
                  </div>
                  <Badge variant={session.status === 'active' ? 'default' : 'secondary'}>
                    {session.status === 'active' ? 'نشطة' : 'مغلقة'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {session.deadline && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>ينتهي في: {new Date(session.deadline).toLocaleDateString('ar-SA')}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>إجمالي الأصوات: {session.votes.length}</span>
                  </div>

                  <div className="space-y-3">
                    {optionsArray.map((option, index) => {
                      const percentage = calculateVotePercentage(session, option);
                      const userVoted = hasUserVoted(session);
                      const userVotedThis = session.votes.some(
                        vote => vote.user_id === user?.id && vote.option_selected === option
                      );

                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="flex items-center gap-2">
                              {option}
                              {userVotedThis && <CheckCircle className="w-4 h-4 text-green-500" />}
                            </span>
                            <span className="text-sm text-gray-500">{percentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                          {!userVoted && session.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => submitVote(session.id, option)}
                              className="w-full"
                            >
                              اختر هذا الخيار
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {hasUserVoted(session) && (
                    <div className="text-center text-green-600 text-sm">
                      ✓ تم تسجيل صوتك في هذه الجلسة
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default VotingSession;
