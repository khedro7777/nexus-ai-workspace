
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Building } from 'lucide-react';

interface GroupData {
  id: string;
  name: string;
  description: string;
  country: string;
  sector: string;
  group_type: string;
  contract_type: string;
  creator_id: string;
  max_members: number;
  current_members: number;
  status: string;
  created_at: string;
  creator_profile?: {
    full_name: string;
  };
}

interface GroupInfoProps {
  group: GroupData;
  isCreator: boolean;
  isMember: boolean;
  onJoinGroup: () => void;
}

const GroupInfo: React.FC<GroupInfoProps> = ({ group, isCreator, isMember, onJoinGroup }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl mb-2">{group.name}</CardTitle>
            <CardDescription className="text-lg">
              {group.description}
            </CardDescription>
          </div>
          <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
            {group.status === 'active' ? 'نشطة' : 'قيد المراجعة'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{group.country}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-gray-500" />
            <span>{group.sector}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span>{group.current_members} من أصل {group.max_members} عضو</span>
          </div>
        </div>

        {!isMember && !isCreator && group.status === 'active' && (
          <Button onClick={onJoinGroup} className="w-full md:w-auto">
            انضم إلى المجموعة
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupInfo;
