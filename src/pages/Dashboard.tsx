
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Building2,
  Plus,
  ArrowRight,
  Bell,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Target,
  Briefcase,
  Handshake
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const dashboardStats = [
    {
      title: 'Active Groups',
      value: '12',
      change: '+3 this month',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      trend: 'up'
    },
    {
      title: 'Total Savings',
      value: '$24,580',
      change: '+$4,200 this month',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
      trend: 'up'
    },
    {
      title: 'Active Negotiations',
      value: '8',
      change: '2 pending approval',
      icon: Handshake,
      color: 'bg-orange-100 text-orange-600',
      trend: 'neutral'
    },
    {
      title: 'Investment Value',
      value: '$156,400',
      change: '+12.5% ROI',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600',
      trend: 'up'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'group_joined',
      title: 'Joined "Office Equipment Buyers"',
      description: 'You joined a new purchasing group for office supplies',
      time: '2 hours ago',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      type: 'negotiation_completed',
      title: 'Negotiation Successful',
      description: 'Secured 15% discount on software licenses',
      time: '4 hours ago',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      type: 'investment_return',
      title: 'Investment Dividend Received',
      description: 'Received $2,400 from TechStart Collective',
      time: '1 day ago',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 4,
      type: 'contract_signed',
      title: 'Smart Contract Executed',
      description: 'Manufacturing equipment purchase contract completed',
      time: '2 days ago',
      icon: Building2,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const activeGroups = [
    {
      id: 1,
      name: 'Tech Startup Collective',
      members: 45,
      progress: 85,
      savings: '$12,400',
      status: 'active',
      nextAction: 'Review supplier proposals'
    },
    {
      id: 2,
      name: 'Manufacturing Equipment Buyers',
      members: 23,
      progress: 60,
      savings: '$8,200',
      status: 'negotiating',
      nextAction: 'Vote on final terms'
    },
    {
      id: 3,
      name: 'Office Supplies Alliance',
      members: 78,
      progress: 95,
      savings: '$3,980',
      status: 'completing',
      nextAction: 'Sign contracts'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Review Investment Proposal',
      description: 'Green Energy Company Formation',
      deadline: '2024-01-20',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Supplier Negotiation',
      description: 'Final round for software licensing',
      deadline: '2024-01-22',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Group Meeting',
      description: 'Monthly review - Office Supplies Alliance',
      deadline: '2024-01-25',
      priority: 'low'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Here's what's happening with your groups and investments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                    <p className={`text-xs mt-1 ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Groups */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Active Groups
                  </CardTitle>
                  <Button onClick={() => navigate('/my-groups')}>
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeGroups.map((group) => (
                    <div key={group.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{group.name}</h3>
                        <Badge variant={
                          group.status === 'active' ? 'default' : 
                          group.status === 'negotiating' ? 'secondary' : 'outline'
                        }>
                          {group.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div>{group.members} members</div>
                        <div>{group.savings} saved</div>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{group.progress}%</span>
                        </div>
                        <Progress value={group.progress} className="h-2" />
                      </div>
                      <p className="text-sm text-blue-600 font-medium">{group.nextAction}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Tasks */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/create-group')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Group
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/negotiations')}
                >
                  <Handshake className="w-4 h-4 mr-2" />
                  Start Negotiation
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/investment')}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Browse Investments
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/suppliers')}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Find Suppliers
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="border-l-4 border-blue-500 pl-3 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <Badge variant={
                          task.priority === 'high' ? 'destructive' :
                          task.priority === 'medium' ? 'secondary' : 'outline'
                        } className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{task.description}</p>
                      <p className="text-xs text-gray-500">{task.deadline}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
