
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  Users, 
  FileText, 
  Clock, 
  TrendingUp,
  Plus,
  MessageSquare,
  Gavel,
  HandHeart
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MCPChat from '@/components/mcp/MCPChat';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const stats = [
    {
      title: 'المجموعات النشطة',
      value: '5',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'العقود الجارية',
      value: '3',
      icon: FileText,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'المهام المعلقة',
      value: '8',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'معدل النجاح',
      value: '92%',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const quickActions = [
    {
      title: 'إنشاء مجموعة جديدة',
      description: 'ابدأ مشروع تعاوني جديد',
      icon: Plus,
      color: 'bg-blue-500',
      href: '/create-group'
    },
    {
      title: 'إدارة التحكيم',
      description: 'عرض وإدارة قضايا التحكيم',
      icon: Gavel,
      color: 'bg-red-500',
      href: '/arbitration-hub'
    },
    {
      title: 'المناقشات',
      description: 'تواصل مع أعضاء المجموعات',
      icon: MessageSquare,
      color: 'bg-green-500',
      href: '/discussions'
    },
    {
      title: 'التطوع',
      description: 'انضم كمتطوع في المشاريع',
      icon: HandHeart,
      color: 'bg-purple-500',
      href: '/volunteer'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مرحباً، {user?.email || 'المستخدم'}
          </h1>
          <p className="text-gray-600">إدارة مشاريعك التعاونية بكفاءة</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>الإجراءات السريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4"
                    onClick={() => window.location.href = action.href}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color} text-white ml-4`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* MCP Chat */}
          <div className="lg:col-span-2">
            <MCPChat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
