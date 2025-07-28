
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Settings, Users, BarChart3, FileText } from 'lucide-react';

interface GroupManagerSectionProps {
  groupId: string;
  userAccess: any;
}

const GroupManagerSection: React.FC<GroupManagerSectionProps> = ({ groupId, userAccess }) => {
  if (!userAccess.canManage) {
    return (
      <Card className="h-[800px]">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">صفحة مقيدة</h3>
            <p className="text-gray-600">هذا القسم متاح للمشرفين فقط</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[800px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          قسم الإدارة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-20 flex-col">
            <Settings className="w-8 h-8 mb-2" />
            إعدادات المجموعة
          </Button>
          <Button variant="outline" className="h-20 flex-col">
            <Users className="w-8 h-8 mb-2" />
            إدارة الأعضاء
          </Button>
          <Button variant="outline" className="h-20 flex-col">
            <BarChart3 className="w-8 h-8 mb-2" />
            التقارير والإحصائيات
          </Button>
          <Button variant="outline" className="h-20 flex-col">
            <FileText className="w-8 h-8 mb-2" />
            إدارة المحتوى
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupManagerSection;
