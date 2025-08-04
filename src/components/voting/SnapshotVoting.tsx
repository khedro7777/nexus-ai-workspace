
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Vote, 
  Plus, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  BarChart3,
  Eye,
  Lock,
  Unlock,
  Calendar,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';

interface SnapshotVotingProps {
  groupId: string;
}

interface Proposal {
  id: string;
  title: string;
  description: string;
  type: 'single-choice' | 'multi-choice' | 'weighted' | 'ranked';
  status: 'draft' | 'active' | 'closed' | 'executed';
  author_id: string;
  author_name: string;
  created_at: string;
  start_time: string;
  end_time: string;
  options: ProposalOption[];
  total_votes: number;
  total_voting_power: number;
  quorum_threshold: number;
  passing_threshold: number;
  privacy: 'public' | 'private';
  snapshot_block?: number;
  ipfs_hash?: string;
  execution_hash?: string;
}

interface ProposalOption {
  id: string;
  text: string;
  votes: number;
  voting_power: number;
  percentage: number;
}

interface Vote {
  id: string;
  proposal_id: string;
  voter_id: string;
  voter_name: string;
  choices: string[];
  voting_power: number;
  timestamp: string;
  ipfs_hash?: string;
}

const SnapshotVoting: React.FC<SnapshotVotingProps> = ({ groupId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [userVote, setUserVote] = useState<Vote | null>(null);
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    type: 'single-choice' as const,
    options: ['', ''],
    duration: 7,
    quorum_threshold: 50,
    passing_threshold: 50,
    privacy: 'public' as const
  });
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [showNewProposal, setShowNewProposal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProposals();
  }, [groupId]);

  useEffect(() => {
    if (selectedProposal) {
      fetchVotes(selectedProposal.id);
    }
  }, [selectedProposal]);

  const fetchProposals = async () => {
    try {
      // Mock data - replace with actual Supabase query
      const mockProposals: Proposal[] = [
        {
          id: '1',
          title: 'اختيار استراتيجية الاستثمار للربع القادم',
          description: 'نحتاج لتحديد الاستراتيجية الاستثمارية المناسبة للربع القادم بناءً على تحليل السوق الحالي',
          type: 'single-choice',
          status: 'active',
          author_id: user?.id || '',
          author_name: 'أحمد محمد',
          created_at: new Date().toISOString(),
          start_time: new Date().toISOString(),
          end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          options: [
            { id: '1', text: 'استراتيجية محافظة (مخاطر منخفضة)', votes: 45, voting_power: 450, percentage: 60 },
            { id: '2', text: 'استراتيجية متوازنة (مخاطر متوسطة)', votes: 25, voting_power: 250, percentage: 33 },
            { id: '3', text: 'استراتيجية عدوانية (مخاطر عالية)', votes: 5, voting_power: 50, percentage: 7 }
          ],
          total_votes: 75,
          total_voting_power: 750,
          quorum_threshold: 50,
          passing_threshold: 60,
          privacy: 'public',
          snapshot_block: 12345678
        },
        {
          id: '2',
          title: 'موافقة على تعديل لائحة المجموعة',
          description: 'تعديلات مقترحة على لائحة المجموعة الداخلية لتحسين الحوكمة',
          type: 'multi-choice',
          status: 'closed',
          author_id: user?.id || '',
          author_name: 'فاطمة أحمد',
          created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          start_time: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          end_time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          options: [
            { id: '1', text: 'تعديل شروط العضوية', votes: 60, voting_power: 600, percentage: 80 },
            { id: '2', text: 'تعديل آلية التصويت', votes: 40, voting_power: 400, percentage: 53 },
            { id: '3', text: 'تعديل هيكل الإدارة', votes: 30, voting_power: 300, percentage: 40 }
          ],
          total_votes: 75,
          total_voting_power: 750,
          quorum_threshold: 60,
          passing_threshold: 66,
          privacy: 'public'
        }
      ];
      setProposals(mockProposals);
    } catch (error) {
      toast({
        title: "خطأ في تحميل الاقتراحات",
        description: "حدث خطأ أثناء تحميل اقتراحات التصويت",
        variant: "destructive"
      });
    }
  };

  const fetchVotes = async (proposalId: string) => {
    try {
      // Mock votes data
      const mockVotes: Vote[] = [
        {
          id: '1',
          proposal_id: proposalId,
          voter_id: '1',
          voter_name: 'محمد سالم',
          choices: ['1'],
          voting_power: 10,
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          proposal_id: proposalId,
          voter_id: '2',
          voter_name: 'سارة أحمد',
          choices: ['1'],
          voting_power: 15,
          timestamp: new Date().toISOString()
        }
      ];
      setVotes(mockVotes);
      
      // Check if user has already voted
      const userExistingVote = mockVotes.find(v => v.voter_id === user?.id);
      setUserVote(userExistingVote || null);
      if (userExistingVote) {
        setSelectedChoices(userExistingVote.choices);
      }
    } catch (error) {
      console.error('Error fetching votes:', error);
    }
  };

  const createProposal = async () => {
    if (!newProposal.title.trim() || !newProposal.description.trim() || newProposal.options.some(opt => !opt.trim())) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const proposal: Proposal = {
        id: Date.now().toString(),
        title: newProposal.title,
        description: newProposal.description,
        type: newProposal.type,
        status: 'draft',
        author_id: user?.id || '',
        author_name: user?.name || 'مجهول',
        created_at: new Date().toISOString(),
        start_time: new Date().toISOString(),
        end_time: new Date(Date.now() + newProposal.duration * 24 * 60 * 60 * 1000).toISOString(),
        options: newProposal.options.filter(opt => opt.trim()).map((opt, index) => ({
          id: (index + 1).toString(),
          text: opt,
          votes: 0,
          voting_power: 0,
          percentage: 0
        })),
        total_votes: 0,
        total_voting_power: 0,
        quorum_threshold: newProposal.quorum_threshold,
        passing_threshold: newProposal.passing_threshold,
        privacy: newProposal.privacy
      };

      setProposals(prev => [proposal, ...prev]);
      setNewProposal({
        title: '',
        description: '',
        type: 'single-choice',
        options: ['', ''],
        duration: 7,
        quorum_threshold: 50,
        passing_threshold: 50,
        privacy: 'public'
      });
      setShowNewProposal(false);

      toast({
        title: "تم إنشاء الاقتراح",
        description: "تم إنشاء اقتراح التصويت بنجاح"
      });
    } catch (error) {
      toast({
        title: "خطأ في الإنشاء",
        description: "حدث خطأ أثناء إنشاء الاقتراح",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const castVote = async () => {
    if (!selectedProposal || selectedChoices.length === 0) return;

    setLoading(true);
    try {
      const vote: Vote = {
        id: Date.now().toString(),
        proposal_id: selectedProposal.id,
        voter_id: user?.id || '',
        voter_name: user?.name || 'مجهول',
        choices: selectedChoices,
        voting_power: 10, // Mock voting power
        timestamp: new Date().toISOString()
      };

      setVotes(prev => [...prev.filter(v => v.voter_id !== user?.id), vote]);
      setUserVote(vote);

      toast({
        title: "تم التصويت",
        description: "تم تسجيل صوتك بنجاح"
      });
    } catch (error) {
      toast({
        title: "خطأ في التصويت",
        description: "حدث خطأ أثناء تسجيل الصوت",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'executed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Zap className="w-4 h-4" />;
      case 'closed': return <Lock className="w-4 h-4" />;
      case 'draft': return <Eye className="w-4 h-4" />;
      case 'executed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getRemainingTime = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'انتهت';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} يوم متبقي`;
    return `${hours} ساعة متبقية`;
  };

  if (selectedProposal) {
    const hasVoted = !!userVote;
    const isActive = selectedProposal.status === 'active';
    const timeRemaining = getRemainingTime(selectedProposal.end_time);

    return (
      <Card className="h-[800px] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setSelectedProposal(null)}>
              ← العودة للاقتراحات
            </Button>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(selectedProposal.status)}>
                {getStatusIcon(selectedProposal.status)}
                <span className="mr-1">
                  {selectedProposal.status === 'active' ? 'نشط' :
                   selectedProposal.status === 'closed' ? 'مغلق' :
                   selectedProposal.status === 'draft' ? 'مسودة' : 'منفذ'}
                </span>
              </Badge>
              {selectedProposal.privacy === 'private' && (
                <Badge variant="outline">
                  <Shield className="w-3 h-3 mr-1" />
                  خاص
                </Badge>
              )}
            </div>
          </div>
          
          <CardTitle className="text-xl">{selectedProposal.title}</CardTitle>
          <p className="text-gray-600">{selectedProposal.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span>{selectedProposal.total_votes} صوت</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>{selectedProposal.total_voting_power} قوة تصويت</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>{timeRemaining}</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-500" />
              <span>حد النصاب: {selectedProposal.quorum_threshold}%</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Voting Options */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">الخيارات المتاحة</h3>
            {selectedProposal.options.map((option) => (
              <div key={option.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isActive && !hasVoted && (
                      <Checkbox
                        checked={selectedChoices.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (selectedProposal.type === 'single-choice') {
                            setSelectedChoices(checked ? [option.id] : []);
                          } else {
                            setSelectedChoices(prev => 
                              checked 
                                ? [...prev, option.id]
                                : prev.filter(id => id !== option.id)
                            );
                          }
                        }}
                      />
                    )}
                    <span className="font-medium">{option.text}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{option.percentage}%</div>
                    <div className="text-sm text-gray-500">{option.votes} أصوات</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>قوة التصويت: {option.voting_power}</span>
                  </div>
                  <Progress value={option.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>

          {/* Voting Actions */}
          {isActive && !hasVoted && (
            <div className="flex gap-2">
              <Button 
                onClick={castVote} 
                disabled={loading || selectedChoices.length === 0}
                className="flex-1"
              >
                <Vote className="w-4 h-4 ml-2" />
                تأكيد التصويت
              </Button>
            </div>
          )}

          {hasVoted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">تم تسجيل صوتك بنجاح</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                صوتك مسجل في البلوك تشين ولا يمكن تغييره
              </p>
            </div>
          )}

          {/* Voting History */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">سجل التصويت</h3>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {votes.map((vote) => (
                <div key={vote.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{vote.voter_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{vote.voter_name}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(vote.timestamp).toLocaleString('ar')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">قوة التصويت: {vote.voting_power}</div>
                    <div className="text-xs text-gray-500">
                      الخيارات: {vote.choices.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[800px]">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Vote className="w-5 h-5" />
            اقتراحات التصويت
          </CardTitle>
          <Button onClick={() => setShowNewProposal(true)}>
            <Plus className="w-4 h-4 ml-2" />
            اقتراح جديد
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {showNewProposal && (
          <div className="border-b p-4 space-y-4 bg-gray-50">
            <Input
              placeholder="عنوان الاقتراح"
              value={newProposal.title}
              onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              placeholder="وصف تفصيلي للاقتراح"
              value={newProposal.description}
              onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">الخيارات المتاحة:</label>
              {newProposal.options.map((option, index) => (
                <Input
                  key={index}
                  placeholder={`الخيار ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...newProposal.options];
                    newOptions[index] = e.target.value;
                    setNewProposal(prev => ({ ...prev, options: newOptions }));
                  }}
                />
              ))}
              <Button
                variant="outline"
                onClick={() => setNewProposal(prev => ({ ...prev, options: [...prev.options, ''] }))}
              >
                + إضافة خيار
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">نوع التصويت:</label>
                <Select value={newProposal.type} onValueChange={(value) => setNewProposal(prev => ({ ...prev, type: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-choice">خيار واحد</SelectItem>
                    <SelectItem value="multi-choice">خيارات متعددة</SelectItem>
                    <SelectItem value="weighted">تصويت مرجح</SelectItem>
                    <SelectItem value="ranked">تصويت مرتب</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">مدة التصويت (بالأيام):</label>
                <Input
                  type="number"
                  value={newProposal.duration}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, duration: parseInt(e.target.value) || 7 }))}
                  min="1"
                  max="30"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={createProposal} disabled={loading}>
                إنشاء الاقتراح
              </Button>
              <Button variant="outline" onClick={() => setShowNewProposal(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        )}

        <div className="divide-y max-h-[600px] overflow-y-auto">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedProposal(proposal)}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{proposal.title}</h3>
                    <Badge className={getStatusColor(proposal.status)}>
                      {getStatusIcon(proposal.status)}
                      <span className="mr-1">
                        {proposal.status === 'active' ? 'نشط' :
                         proposal.status === 'closed' ? 'مغلق' :
                         proposal.status === 'draft' ? 'مسودة' : 'منفذ'}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{proposal.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{proposal.author_name}</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{proposal.total_votes} صوت</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{getRemainingTime(proposal.end_time)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {proposal.total_voting_power} قوة تصويت
                  </div>
                  <div className="text-xs text-gray-500">
                    النصاب: {proposal.quorum_threshold}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SnapshotVoting;
