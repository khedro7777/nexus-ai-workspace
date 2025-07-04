
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Vote, Users, Crown, CheckCircle } from 'lucide-react';

interface Member {
  id: string;
  user_id: string;
  profiles: {
    full_name: string;
    company_name: string;
  } | null;
}

interface AdminElectionProps {
  groupId: string;
  onElectionComplete: (admins: string[]) => void;
}

const AdminElection: React.FC<AdminElectionProps> = ({ groupId, onElectionComplete }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
    checkIfUserVoted();
  }, [groupId, user?.id]);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          *,
          profiles!inner(full_name, company_name)
        `)
        .eq('group_id', groupId);

      if (error) throw error;
      
      // Handle the data properly with null check
      const membersWithProfiles = (data || []).map(member => ({
        ...member,
        profiles: member.profiles || { full_name: 'مستخدم', company_name: '' }
      }));
      
      setMembers(membersWithProfiles);
    } catch (error) {
      console.error('Error fetching members:', error);
      // Fallback: fetch without profiles
      try {
        const { data } = await supabase
          .from('group_members')
          .select('*')
          .eq('group_id', groupId);
        
        const fallbackMembers = (data || []).map(member => ({
          ...member,
          profiles: { full_name: 'مستخدم', company_name: '' }
        }));
        
        setMembers(fallbackMembers);
      } catch (fallbackError) {
        console.error('Fallback fetch failed:', fallbackError);
      }
    }
  };

  const checkIfUserVoted = async () => {
    try {
      const { data: votingSession } = await supabase
        .from('voting_sessions')
        .select('id')
        .eq('group_id', groupId)
        .eq('title', 'انتخاب مديري المجموعة')
        .eq('status', 'active')
        .single();

      if (votingSession) {
        const { data: vote } = await supabase
          .from('votes')
          .select('id')
          .eq('voting_session_id', votingSession.id)
          .eq('user_id', user?.id)
          .single();

        setHasVoted(!!vote);
      }
    } catch (error) {
      console.error('Error checking vote status:', error);
    }
  };

  const handleAdminSelection = (userId: string, checked: boolean) => {
    if (checked && selectedAdmins.length < 3) {
      setSelectedAdmins([...selectedAdmins, userId]);
    } else if (!checked) {
      setSelectedAdmins(selectedAdmins.filter(id => id !== userId));
    } else {
      toast({
        title: "تنبيه",
        description: "يمكنك اختيار 3 مديرين فقط",
        variant: "destructive"
      });
    }
  };

  const submitVote = async () => {
    if (selectedAdmins.length !== 3) {
      toast({
        title: "خطأ",
        description: "يجب اختيار 3 مديرين بالضبط",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Find the active voting session
      const { data: votingSession } = await supabase
        .from('voting_sessions')
        .select('id')
        .eq('group_id', groupId)
        .eq('title', 'انتخاب مديري المجموعة')
        .eq('status', 'active')
        .single();

      if (!votingSession) throw new Error('No active voting session found');

      // Submit the vote
      const { error } = await supabase
        .from('votes')
        .insert({
          voting_session_id: votingSession.id,
          user_id: user?.id,
          choice: JSON.stringify(selectedAdmins)
        });

      if (error) throw error;

      toast({
        title: "تم التصويت بنجاح",
        description: "تم تسجيل اختيارك للمديرين الثلاثة"
      });

      setHasVoted(true);
      
      // Check if all members have voted to conclude election
      checkElectionStatus();

    } catch (error: any) {
      toast({
        title: "خطأ في التصويت",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const checkElectionStatus = async () => {
    try {
      const { data: votingSession } = await supabase
        .from('voting_sessions')
        .select('id')
        .eq('group_id', groupId)
        .eq('title', 'انتخاب مديري المجموعة')
        .eq('status', 'active')
        .single();

      if (!votingSession) return;

      const { data: votes } = await supabase
        .from('votes')
        .select('choice')
        .eq('voting_session_id', votingSession.id);

      const { data: totalMembers } = await supabase
        .from('group_members')
        .select('id')
        .eq('group_id', groupId);

      // If majority voted, conclude election
      if (votes && totalMembers && votes.length >= Math.ceil(totalMembers.length / 2)) {
        const adminVotes: { [key: string]: number } = {};
        
        votes.forEach(vote => {
          const choices = JSON.parse(vote.choice);
          choices.forEach((adminId: string) => {
            adminVotes[adminId] = (adminVotes[adminId] || 0) + 1;
          });
        });

        // Get top 3 admins
        const sortedAdmins = Object.entries(adminVotes)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([adminId]) => adminId);

        // Update group with new admins
        await supabase
          .from('groups')
          .update({
            current_phase: 'negotiation',
            admins: sortedAdmins
          })
          .eq('id', groupId);

        // Mark voting session as completed
        await supabase
          .from('voting_sessions')
          .update({ status: 'completed' })
          .eq('id', votingSession.id);

        onElectionComplete(sortedAdmins);
      }
    } catch (error) {
      console.error('Error checking election status:', error);
    }
  };

  if (hasVoted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            تم التصويت بنجاح
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            تم تسجيل صوتك لانتخاب مديري المجموعة. ستظهر النتائج عند اكتمال التصويت.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5" />
          انتخاب مديري المجموعة
        </CardTitle>
        <p className="text-sm text-gray-600">
          اختر 3 أعضاء ليكونوا مديري هذه الجولة من التفاوض
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {members.map((member) => (
            <div key={member.id} className="flex items-center space-x-2 space-x-reverse p-3 border rounded-lg">
              <Checkbox
                id={member.user_id}
                checked={selectedAdmins.includes(member.user_id)}
                onCheckedChange={(checked) => 
                  handleAdminSelection(member.user_id, checked as boolean)
                }
                disabled={!selectedAdmins.includes(member.user_id) && selectedAdmins.length >= 3}
              />
              <label htmlFor={member.user_id} className="flex-1 cursor-pointer">
                <div>
                  <p className="font-medium">{member.profiles?.full_name || 'عضو'}</p>
                  {member.profiles?.company_name && (
                    <p className="text-sm text-gray-500">{member.profiles.company_name}</p>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-600">
            تم اختيار {selectedAdmins.length}/3 مديرين
          </div>
          <Button 
            onClick={submitVote}
            disabled={selectedAdmins.length !== 3 || loading}
            className="flex items-center gap-2"
          >
            <Vote className="w-4 h-4" />
            {loading ? 'جاري التصويت...' : 'تأكيد التصويت'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminElection;
