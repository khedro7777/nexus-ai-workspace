
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users, 
  FileText,
  Handshake,
  TrendingUp,
  Shield,
  AlertCircle
} from 'lucide-react';

interface PhaseStep {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'active' | 'pending' | 'locked';
  requirements: string[];
  estimatedDuration: string;
  progress: number;
}

interface GroupPhaseManagerProps {
  currentPhase: string;
  groupId: string;
  memberCount: number;
  minMembers: number;
  onPhaseTransition: (newPhase: string) => void;
}

const GroupPhaseManager: React.FC<GroupPhaseManagerProps> = ({
  currentPhase,
  groupId,
  memberCount,
  minMembers,
  onPhaseTransition
}) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const phases: PhaseStep[] = [
    {
      id: 'initial',
      name: 'Foundation Setup',
      description: 'Establish group structure and initial framework',
      status: currentPhase === 'initial' ? 'active' : 'completed',
      requirements: ['Group creation', 'Initial configuration', 'Basic setup'],
      estimatedDuration: '1-2 days',
      progress: currentPhase === 'initial' ? 75 : 100
    },
    {
      id: 'pending_members',
      name: 'Member Recruitment',
      description: 'Recruit and onboard required members',
      status: currentPhase === 'pending_members' ? 'active' : 
              currentPhase === 'initial' ? 'pending' : 'completed',
      requirements: [`Minimum ${minMembers} members`, 'Member verification', 'Role assignment'],
      estimatedDuration: '3-7 days',
      progress: currentPhase === 'pending_members' ? (memberCount / minMembers) * 100 : 
               currentPhase === 'initial' ? 0 : 100
    },
    {
      id: 'vote_admins',
      name: 'Leadership Election',
      description: 'Democratic election of group administrators',
      status: currentPhase === 'vote_admins' ? 'active' : 
              ['initial', 'pending_members'].includes(currentPhase) ? 'pending' : 'completed',
      requirements: ['Candidate nominations', 'Voting process', 'Admin selection'],
      estimatedDuration: '2-3 days',
      progress: currentPhase === 'vote_admins' ? 60 : 0
    },
    {
      id: 'negotiation',
      name: 'Active Negotiation',
      description: 'Core business negotiations and deal-making',
      status: currentPhase === 'negotiation' ? 'active' : 
              ['initial', 'pending_members', 'vote_admins'].includes(currentPhase) ? 'pending' : 'completed',
      requirements: ['Supplier engagement', 'Proposal evaluation', 'Terms negotiation'],
      estimatedDuration: '1-4 weeks',
      progress: currentPhase === 'negotiation' ? 45 : 0
    },
    {
      id: 'contracting',
      name: 'Contract Formation',
      description: 'Formalize agreements and legal documentation',
      status: currentPhase === 'contracting' ? 'active' : 
              ['negotiation'].includes(currentPhase) ? 'pending' : 
              ['supervised', 'closed'].includes(currentPhase) ? 'completed' : 'locked',
      requirements: ['Contract drafting', 'Legal review', 'Member approval', 'Signature collection'],
      estimatedDuration: '1-2 weeks',
      progress: currentPhase === 'contracting' ? 30 : 0
    },
    {
      id: 'supervised',
      name: 'Execution & Monitoring',
      description: 'Supervised execution of contracted agreements',
      status: currentPhase === 'supervised' ? 'active' : 
              currentPhase === 'closed' ? 'completed' : 'locked',
      requirements: ['Performance monitoring', 'Quality assurance', 'Progress tracking'],
      estimatedDuration: 'Ongoing',
      progress: currentPhase === 'supervised' ? 80 : 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'active': return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'locked': return <Shield className="w-5 h-5 text-gray-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'locked': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const canTransitionTo = (phaseId: string) => {
    const phase = phases.find(p => p.id === phaseId);
    return phase && ['pending', 'active'].includes(phase.status);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Business Process Pipeline
          </CardTitle>
          <p className="text-sm text-gray-600">
            Comprehensive phase management for global business impact
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {phases.map((phase, index) => (
              <div key={phase.id} className="relative">
                <div 
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    getStatusColor(phase.status)
                  } ${selectedPhase === phase.id ? 'ring-2 ring-blue-300' : ''}`}
                  onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(phase.status)}
                      <div>
                        <h3 className="font-semibold text-lg">{phase.name}</h3>
                        <p className="text-sm opacity-90">{phase.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {phase.estimatedDuration}
                          </Badge>
                          <span className="text-xs opacity-75">
                            Step {index + 1} of {phases.length}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {Math.round(phase.progress)}%
                      </div>
                      <div className="w-20">
                        <Progress value={phase.progress} className="h-2" />
                      </div>
                    </div>
                  </div>

                  {selectedPhase === phase.id && (
                    <div className="mt-4 pt-4 border-t border-current opacity-30">
                      <h4 className="font-medium mb-2">Requirements:</h4>
                      <ul className="space-y-1 text-sm">
                        {phase.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" />
                            {req}
                          </li>
                        ))}
                      </ul>
                      
                      {canTransitionTo(phase.id) && phase.status === 'pending' && (
                        <Button 
                          className="mt-3"
                          onClick={() => onPhaseTransition(phase.id)}
                          size="sm"
                        >
                          Activate Phase
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {index < phases.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Phase Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {phases.filter(p => p.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-600">Completed Phases</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {phases.filter(p => p.status === 'active').length}
                </p>
                <p className="text-sm text-gray-600">Active Phase</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(phases.reduce((acc, p) => acc + p.progress, 0) / phases.length)}%
                </p>
                <p className="text-sm text-gray-600">Overall Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GroupPhaseManager;
