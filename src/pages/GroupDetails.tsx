
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import GroupHeader from '@/components/group/GroupHeader';
import GroupInfo from '@/components/group/GroupInfo';
import GroupTabs from '@/components/group/GroupTabs';

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

const GroupDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [group, setGroup] = useState<GroupData | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchGroupDetails();
    fetchGroupMembers();
  }, [id]);

  const fetchGroupDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('groups')
        .select(`
          *,
          profiles:creator_id(full_name)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        setGroup({
          ...data,
          creator_profile: Array.isArray(data.profiles) ? data.profiles[0] : data.profiles
        });
      }
    } catch (error) {
      console.error('Error fetching group:', error);
    }
  };

  const fetchGroupMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('group_members')
        .select(`
          id,
          user_id,
          role,
          joined_at,
          profiles:user_id(full_name)
        `)
        .eq('group_id', id);

      if (error) throw error;
      
      if (data) {
        const formattedMembers = data.map(member => ({
          ...member,
          profile: Array.isArray(member.profiles) ? member.profiles[0] : member.profiles
        }));
        setMembers(formattedMembers);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinGroup = async () => {
    if (!user || !group) return;

    try {
      const { error } = await supabase
        .from('group_members')
        .insert({
          group_id: group.id,
          user_id: user.id,
          role: 'member'
        });

      if (error) throw error;

      // Update current members count
      await supabase
        .from('groups')
        .update({ current_members: group.current_members + 1 })
        .eq('id', group.id);

      fetchGroupDetails();
      fetchGroupMembers();
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex justify-center items-center h-64">
          <div className="text-center">جاري التحميل...</div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex justify-center items-center h-64">
          <div className="text-center text-red-600">لم يتم العثور على المجموعة</div>
        </div>
      </div>
    );
  }

  const isCreator = user?.id === group.creator_id;
  const isMember = members.some(member => member.user_id === user?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="max-w-6xl mx-auto p-6">
        <GroupHeader />
        
        <GroupInfo 
          group={group}
          isCreator={isCreator}
          isMember={isMember}
          onJoinGroup={joinGroup}
        />

        <GroupTabs
          group={group}
          members={members}
          isCreator={isCreator}
          refreshTrigger={refreshTrigger}
          onRefresh={handleRefresh}
        />
      </div>
    </div>
  );
};

export default GroupDetails;
