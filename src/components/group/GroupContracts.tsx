
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileContract, Download, Eye, Edit, Calendar, User, Shield } from 'lucide-react';

interface GroupContractsProps {
  groupId: string;
  userAccess: any;
}

const GroupContracts: React.FC<GroupContractsProps> = ({ groupId, userAccess }) => {
  const contracts = [
    {
      id: '1',
      title: 'عقد التوريد الرئيسي - شركة التقنية المتطورة',
      type: 'supply_contract',
      status: 'signed',
      created_date: '2024-01-20',
      parties: ['المجموعة', 'شركة التقنية المتطورة'],
      value: 25000,
      currency: 'USD',
      duration: '12 شهر',
      signed_by: 8,
      total_signers: 10
    }
  ];

  return (
    <Card className="h-[800px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileContract className="w-5 h-5" />
          العقود والاتفاقيات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contracts.map((contract) => (
            <Card key={contract.id} className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{contract.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{contract.created_date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{contract.signed_by}/{contract.total_signers} وقع</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">موقع</Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 ml-2" />
                      عرض
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {contracts.length === 0 && (
            <div className="text-center py-12">
              <FileContract className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عقود</h3>
              <p className="text-gray-600">لم يتم إنشاء أي عقود بعد</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupContracts;
