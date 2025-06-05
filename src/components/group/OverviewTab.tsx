
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface OverviewTabProps {
  group: GroupData;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ group }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تفاصيل المجموعة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <strong>النوع:</strong> {group.group_type}
          </div>
          <div>
            <strong>نوع العقد:</strong> {group.contract_type}
          </div>
          <div>
            <strong>المؤسس:</strong> {group.creator_profile?.full_name || 'غير معروف'}
          </div>
          <div>
            <strong>تاريخ الإنشاء:</strong> {new Date(group.created_at).toLocaleDateString('ar-SA')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
