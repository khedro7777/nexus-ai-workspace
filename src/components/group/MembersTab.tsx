
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GroupMember {
  id: string;
  user_id: string;
  role: string;
  joined_at: string;
  profile?: {
    full_name: string;
  };
}

interface MembersTabProps {
  members: GroupMember[];
}

const MembersTab: React.FC<MembersTabProps> = ({ members }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>أعضاء المجموعة ({members.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{member.profile?.full_name || 'عضو'}</div>
                <div className="text-sm text-gray-500">
                  انضم في {new Date(member.joined_at).toLocaleDateString('ar-SA')}
                </div>
              </div>
              <Badge variant={member.role === 'creator' ? 'default' : 'secondary'}>
                {member.role === 'creator' ? 'مؤسس' : 'عضو'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MembersTab;
