
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Settings,
  Eye,
  BarChart3
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PlatformFeatureManager from '@/components/admin/PlatformFeatureManager';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock admin dashboard data
  const adminData = {
    totalUsers: 1250,
    activeGroups: 89,
    totalRevenue: 125780.50,
    pendingOffers: 24,
    systemHealth: 95,
    recentUsers: [
      { id: '1', full_name: 'John Smith', created_at: '2024-01-15' },
      { id: '2', full_name: 'Sarah Johnson', created_at: '2024-01-14' },
      { id: '3', full_name: 'Mike Brown', created_at: '2024-01-13' }
    ],
    recentGroups: [
      { id: '1', name: 'Tech Equipment Group', description: 'Latest tech for startups', status: 'active', created_at: '2024-01-15' },
      { id: '2', name: 'Office Supplies Bulk', description: 'Bulk office materials', status: 'active', created_at: '2024-01-14' }
    ]
  };

  const stats = [
    {
      title: 'Total Users',
      value: adminData?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      trend: '+12%'
    },
    {
      title: 'Active Groups',
      value: adminData?.activeGroups || 0,
      icon: Activity,
      color: 'bg-green-100 text-green-600',
      trend: '+8%'
    },
    {
      title: 'Total Revenue',
      value: `$${adminData?.totalRevenue?.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600',
      trend: '+15%',
      currency: 'USD'
    },
    {
      title: 'Pending Offers',
      value: adminData?.pendingOffers || 0,
      icon: AlertTriangle,
      color: 'bg-yellow-100 text-yellow-600',
      trend: '-5%'
    }
  ];

  const systemMetrics = [
    {
      title: 'System Health',
      value: `${adminData?.systemHealth || 0}%`,
      icon: Shield,
      status: 'excellent'
    },
    {
      title: 'Success Rate',
      value: '92%',
      icon: CheckCircle,
      status: 'good'
    },
    {
      title: 'Monthly Growth',
      value: '+18%',
      icon: TrendingUp,
      status: 'excellent'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Platform management and monitoring system</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Feature Management
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                          {stat.currency && <span className="text-sm text-gray-500 ml-1">{stat.currency}</span>}
                        </p>
                        <p className="text-gray-600 text-sm">{stat.title}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {stat.trend}
                        </Badge>
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
              {/* System Metrics */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>System Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {systemMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            metric.status === 'excellent' ? 'bg-green-100 text-green-600' :
                            metric.status === 'good' ? 'bg-blue-100 text-blue-600' :
                            'bg-yellow-100 text-yellow-600'
                          }`}>
                            <metric.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">{metric.title}</span>
                        </div>
                        <span className="font-bold">{metric.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Users */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {adminData?.recentUsers?.map((user: any) => (
                        <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h3 className="font-medium">{user.full_name || 'New User'}</h3>
                            <p className="text-sm text-gray-500">{user.id}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">
                              {new Date(user.created_at).toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Groups */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Groups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {adminData?.recentGroups?.map((group: any) => (
                        <div key={group.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h3 className="font-medium">{group.name}</h3>
                            <p className="text-sm text-gray-500">{group.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                              {group.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(group.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Feature Management Tab */}
          <TabsContent value="features">
            <PlatformFeatureManager />
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">
                  User management features will be available soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-8">
                  Advanced analytics will be available soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
