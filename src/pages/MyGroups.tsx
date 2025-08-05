
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Settings,
  BarChart3,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  MessageSquare,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyGroups = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const myGroups = [
    {
      id: 1,
      name: 'Tech Startup Equipment Collective',
      description: 'Group purchasing for office equipment and technology needs',
      members: 45,
      maxMembers: 50,
      progress: 85,
      savings: 12400,
      status: 'active',
      role: 'admin',
      created: '2024-01-15',
      category: 'Technology',
      nextMeeting: '2024-01-25',
      activeNegotiations: 3,
      completedDeals: 8
    },
    {
      id: 2,
      name: 'Manufacturing Equipment Buyers',
      description: 'Industrial machinery and manufacturing equipment procurement',
      members: 23,
      maxMembers: 30,
      progress: 60,
      savings: 8200,
      status: 'negotiating',
      role: 'member',
      created: '2024-01-10',
      category: 'Manufacturing',
      nextMeeting: '2024-01-22',
      activeNegotiations: 2,
      completedDeals: 5
    },
    {
      id: 3,
      name: 'Office Supplies Alliance',
      description: 'Bulk purchasing for office supplies and stationary',
      members: 78,
      maxMembers: 100,
      progress: 95,
      savings: 3980,
      status: 'completing',
      role: 'member',
      created: '2024-01-05',
      category: 'Office Supplies',
      nextMeeting: '2024-01-20',
      activeNegotiations: 1,
      completedDeals: 12
    },
    {
      id: 4,
      name: 'Green Energy Solutions',
      description: 'Renewable energy equipment and solutions group',
      members: 34,
      maxMembers: 40,
      progress: 40,
      savings: 15600,
      status: 'forming',
      role: 'admin',
      created: '2024-01-12',
      category: 'Energy',
      nextMeeting: '2024-01-28',
      activeNegotiations: 0,
      completedDeals: 2
    },
    {
      id: 5,
      name: 'Software Licensing Consortium',
      description: 'Enterprise software licensing at scale',
      members: 67,
      maxMembers: 75,
      progress: 78,
      savings: 22100,
      status: 'active',
      role: 'member',
      created: '2024-01-08',
      category: 'Software',
      nextMeeting: '2024-01-24',
      activeNegotiations: 4,
      completedDeals: 15
    },
    {
      id: 6,
      name: 'Healthcare Equipment Pool',
      description: 'Medical equipment procurement for small clinics',
      members: 29,
      maxMembers: 35,
      progress: 55,
      savings: 9800,
      status: 'paused',
      role: 'member',
      created: '2024-01-03',
      category: 'Healthcare',
      nextMeeting: '2024-01-30',
      activeNegotiations: 1,
      completedDeals: 6
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'negotiating': return 'bg-blue-100 text-blue-800';
      case 'completing': return 'bg-purple-100 text-purple-800';
      case 'forming': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800';
  };

  const filteredGroups = myGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeGroups = filteredGroups.filter(g => g.status === 'active');
  const negotiatingGroups = filteredGroups.filter(g => g.status === 'negotiating');
  const formingGroups = filteredGroups.filter(g => g.status === 'forming');
  const completedGroups = filteredGroups.filter(g => g.status === 'completing');

  const totalSavings = myGroups.reduce((sum, group) => sum + group.savings, 0);
  const totalMembers = myGroups.reduce((sum, group) => sum + group.members, 0);
  const totalNegotiations = myGroups.reduce((sum, group) => sum + group.activeNegotiations, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Groups</h1>
            <p className="text-gray-600">Manage and monitor your group purchasing activities</p>
          </div>
          <Button 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/create-group')}
          >
            <Plus className="w-4 h-4" />
            Create New Group
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{myGroups.length}</p>
                  <p className="text-gray-600 text-sm">Total Groups</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">${totalSavings.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm">Total Savings</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">{totalMembers}</p>
                  <p className="text-gray-600 text-sm">Network Size</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-600">{totalNegotiations}</p>
                  <p className="text-gray-600 text-sm">Active Negotiations</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search groups by name, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Groups Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({filteredGroups.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeGroups.length})</TabsTrigger>
            <TabsTrigger value="negotiating">Negotiating ({negotiatingGroups.length})</TabsTrigger>
            <TabsTrigger value="forming">Forming ({formingGroups.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedGroups.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <GroupGrid groups={filteredGroups} />
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <GroupGrid groups={activeGroups} />
          </TabsContent>

          <TabsContent value="negotiating" className="space-y-4">
            <GroupGrid groups={negotiatingGroups} />
          </TabsContent>

          <TabsContent value="forming" className="space-y-4">
            <GroupGrid groups={formingGroups} />
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <GroupGrid groups={completedGroups} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  function GroupGrid({ groups }: { groups: typeof myGroups }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{group.name}</CardTitle>
                  <p className="text-sm text-gray-600">{group.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusColor(group.status)}>
                    {group.status}
                  </Badge>
                  <Badge className={getRoleColor(group.role)}>
                    {group.role}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{group.progress}%</span>
                  </div>
                  <Progress value={group.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{group.members}/{group.maxMembers}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span>${group.savings.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>{group.nextMeeting}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-purple-500" />
                    <span>{group.activeNegotiations} active</span>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <Badge variant="outline">{group.category}</Badge>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/group/${group.id}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
};

export default MyGroups;
