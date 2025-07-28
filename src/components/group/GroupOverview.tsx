
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Building2, 
  Target, 
  TrendingUp,
  Clock,
  Shield,
  Award,
  BarChart3
} from 'lucide-react';

interface GroupOverviewProps {
  group: any;
  members: any[];
  groupContext: any;
}

const GroupOverview: React.FC<GroupOverviewProps> = ({ group, members, groupContext }) => {
  const getPhaseProgress = () => {
    const phases = ['initial', 'pending_members', 'active', 'negotiation', 'contracting', 'supervised', 'closed'];
    const currentIndex = phases.indexOf(groupContext?.current_phase || 'initial');
    return ((currentIndex + 1) / phases.length) * 100;
  };

  const getActivityScore = () => {
    // Mock calculation based on members activity, discussions, votes, etc.
    return 85;
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الأعضاء</p>
                <p className="text-2xl font-bold text-blue-600">{members?.length || 0}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مؤشر النشاط</p>
                <p className="text-2xl font-bold text-green-600">{getActivityScore()}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">تقدم المشروع</p>
                <p className="text-2xl font-bold text-purple-600">{Math.round(getPhaseProgress())}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">تقييم الثقة</p>
                <p className="text-2xl font-bold text-orange-600">9.2</p>
              </div>
              <Award className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Group Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              معلومات المجموعة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">نوع المجموعة:</span>
              <Badge variant="outline">{group?.type}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">بوابة الخدمة:</span>
              <Badge variant="secondary">{group?.service_gateway}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">الولاية القضائية:</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {group?.jurisdiction}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">تاريخ الإنشاء:</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(group?.created_at).toLocaleDateString('ar')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">الإطار القانوني:</span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                {group?.legal_framework}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              الأهداف والمعايير
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">الهدف التجاري:</span>
              </div>
              <p className="text-sm bg-blue-50 p-3 rounded-lg">
                {group?.business_objective || 'تحقيق الشراء الجماعي المُوفر للتكاليف مع ضمان الجودة العالية'}
              </p>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">الحد الأدنى للأعضاء:</span>
                <span className="font-medium">{groupContext?.min_members}</span>
              </div>
              <Progress value={(members?.length || 0) / (groupContext?.min_members || 1) * 100} />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">الحد الأقصى للأعضاء:</span>
                <span className="font-medium">{groupContext?.max_members}</span>
              </div>
              <Progress value={(members?.length || 0) / (groupContext?.max_members || 1) * 100} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            مراحل تطور المجموعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">التقدم الإجمالي</span>
              <span className="font-bold">{Math.round(getPhaseProgress())}%</span>
            </div>
            <Progress value={getPhaseProgress()} className="h-3" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[
                { phase: 'initial', name: 'التأسيس', completed: true },
                { phase: 'pending_members', name: 'جمع الأعضاء', completed: groupContext?.current_phase !== 'initial' },
                { phase: 'negotiation', name: 'التفاوض', completed: ['contracting', 'supervised', 'closed'].includes(groupContext?.current_phase) },
                { phase: 'contracting', name: 'التعاقد', completed: ['supervised', 'closed'].includes(groupContext?.current_phase) }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                    item.completed ? 'bg-green-500' : 
                    groupContext?.current_phase === item.phase ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                  <p className="text-xs text-gray-600">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>النشاط الأخير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: 'انضم عضو جديد', user: 'محمد سالم', time: '2 ساعات', type: 'member' },
              { action: 'تم إنشاء اقتراح جديد', user: 'فاطمة أحمد', time: '5 ساعات', type: 'proposal' },
              { action: 'تم التصويت على قرار', user: 'أحمد محمد', time: '1 يوم', type: 'vote' },
              { action: 'تم تحديث معايير المجموعة', user: 'إدارة المجموعة', time: '2 أيام', type: 'update' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'member' ? 'bg-green-500' :
                    activity.type === 'proposal' ? 'bg-blue-500' :
                    activity.type === 'vote' ? 'bg-purple-500' : 'bg-orange-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupOverview;
