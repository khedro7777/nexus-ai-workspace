
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  MapPin, 
  Building, 
  Star, 
  Calendar, 
  User,
  Target,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface Group {
  id: string;
  name: string;
  description: string;
  phase: string;
  memberCount: number;
  maxMembers?: number;
  status: string;
  rating: number;
  category: string;
  country?: string;
  portalType?: string;
}

interface GroupProfileModalProps {
  group: Group | null;
  isOpen: boolean;
  onClose: () => void;
  onJoinGroup: (group: Group) => void;
}

const GroupProfileModal: React.FC<GroupProfileModalProps> = ({ 
  group, 
  isOpen, 
  onClose, 
  onJoinGroup 
}) => {
  if (!group) return null;

  const getPhaseColor = (phase: string) => {
    switch (phase.toLowerCase()) {
      case 'active':
      case 'نشط':
        return 'bg-green-500';
      case 'forming':
      case 'التكوين':
        return 'bg-blue-500';
      case 'negotiating':
      case 'التفاوض':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const mockGroupDetails = {
    createdAt: '2024-01-15',
    objectives: [
      'Achieve 30-50% cost reduction through bulk purchasing',
      'Establish long-term supplier relationships',
      'Maintain high quality standards',
      'Create sustainable procurement network'
    ],
    requirements: [
      'Minimum order commitment of $10,000',
      'Valid business registration',
      'Credit verification',
      'Agreement to group terms'
    ],
    timeline: [
      { phase: 'Formation', status: 'completed', date: '2024-01-15' },
      { phase: 'Member Recruitment', status: 'current', date: '2024-01-20' },
      { phase: 'Supplier Evaluation', status: 'upcoming', date: '2024-02-01' },
      { phase: 'Contract Negotiation', status: 'upcoming', date: '2024-02-15' }
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl mb-2">{group.name}</DialogTitle>
              <DialogDescription className="text-lg">
                {group.description}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-current text-yellow-400" />
              <span className="font-semibold">{group.rating.toFixed(1)}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Group Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    {group.memberCount} of {group.maxMembers || 50} members
                  </span>
                </div>
                {group.country && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{group.country}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{group.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Created: {mockGroupDetails.createdAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <Badge className={getPhaseColor(group.phase)}>
                    {group.phase}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-500" />
                  <Badge variant={group.status === 'Active' ? 'default' : 'secondary'}>
                    {group.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Objectives */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Group Objectives</h3>
              <ul className="space-y-2">
                {mockGroupDetails.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Membership Requirements</h3>
              <ul className="space-y-2">
                {mockGroupDetails.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Project Timeline</h3>
              <div className="space-y-4">
                {mockGroupDetails.timeline.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.phase}</span>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                      <Badge 
                        variant={item.status === 'completed' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={() => onJoinGroup(group)} 
              className="flex-1"
              disabled={group.status !== 'Active'}
            >
              Join This Group
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupProfileModal;
