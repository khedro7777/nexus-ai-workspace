
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Plus, FileText } from 'lucide-react';

interface GroupRequestFormsProps {
  groupId: string;
  userAccess: any;
}

const GroupRequestForms: React.FC<GroupRequestFormsProps> = ({ groupId, userAccess }) => {
  return (
    <Card className="h-[800px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            طلبات التوريد والخدمات
          </CardTitle>
          {userAccess.canManage && (
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              طلب جديد
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
          <p className="text-gray-600">لم يتم إنشاء أي طلبات توريد بعد</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupRequestForms;
