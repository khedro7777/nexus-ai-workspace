
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gavel } from 'lucide-react';
import VotingSession from '@/components/voting/VotingSession';
import CreateVotingSession from '@/components/voting/CreateVotingSession';
import SupplierOffers from '@/components/offers/SupplierOffers';
import CreateSupplierOffer from '@/components/offers/CreateSupplierOffer';
import MembersTab from './MembersTab';
import OverviewTab from './OverviewTab';

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

interface GroupMember {
  id: string;
  user_id: string;
  role: string;
  joined_at: string;
  profile?: {
    full_name: string;
  };
}

interface GroupTabsProps {
  group: GroupData;
  members: GroupMember[];
  isCreator: boolean;
  refreshTrigger: number;
  onRefresh: () => void;
}

const GroupTabs: React.FC<GroupTabsProps> = ({ 
  group, 
  members, 
  isCreator, 
  refreshTrigger, 
  onRefresh 
}) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
        <TabsTrigger value="members">الأعضاء</TabsTrigger>
        <TabsTrigger value="voting">التصويت</TabsTrigger>
        <TabsTrigger value="offers">العروض</TabsTrigger>
        <TabsTrigger value="negotiations">المفاوضات</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <OverviewTab group={group} />
      </TabsContent>

      <TabsContent value="members" className="space-y-4">
        <MembersTab members={members} />
      </TabsContent>

      <TabsContent value="voting" className="space-y-4">
        {isCreator && (
          <CreateVotingSession 
            groupId={group.id} 
            onSessionCreated={onRefresh}
          />
        )}
        <VotingSession groupId={group.id} key={refreshTrigger} />
      </TabsContent>

      <TabsContent value="offers" className="space-y-4">
        <CreateSupplierOffer 
          groupId={group.id} 
          onOfferCreated={onRefresh}
        />
        <SupplierOffers groupId={group.id} key={refreshTrigger} />
      </TabsContent>

      <TabsContent value="negotiations" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="w-5 h-5" />
              جلسات المفاوضات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              ستتوفر جلسات المفاوضات قريباً
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default GroupTabs;
