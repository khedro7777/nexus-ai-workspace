
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';

interface GroupComplaintsProps {
  groupId: string;
}

const GroupComplaints: React.FC<GroupComplaintsProps> = ({ groupId }) => {
  return (
    <Card className="h-[800px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            صندوق الشكاوى
          </CardTitle>
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            شكوى جديدة
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد شكاوى</h3>
          <p className="text-gray-600">لم يتم تقديم أي شكاوى بعد</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupComplaints;
