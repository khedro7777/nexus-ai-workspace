
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Scale, Eye } from 'lucide-react';

interface GroupIndependentPartiesProps {
  groupId: string;
}

const GroupIndependentParties: React.FC<GroupIndependentPartiesProps> = ({ groupId }) => {
  return (
    <Card className="h-[800px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          الأطراف المستقلة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Scale className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد أطراف مستقلة</h3>
          <p className="text-gray-600">لم يتم تعيين أي أطراف مستقلة بعد</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupIndependentParties;
