
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  Star,
  CheckCircle,
  BarChart3,
  Handshake,
  Brain,
  Target,
  Menu
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import HeroBanner from '@/components/home/HeroBanner';
import HomepageFilters from '@/components/filters/HomepageFilters';
import FilteredGroupsResults from '@/components/home/FilteredGroupsResults';
import GroupProfileModal from '@/components/home/GroupProfileModal';

const Index = () => {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [filterResults, setFilterResults] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupProfile, setShowGroupProfile] = useState(false);

  const features = [
    {
      icon: Users,
      title: 'Group Purchasing Power',
      description: 'Join forces with others to unlock bulk pricing and better deals',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Building2,
      title: 'Company Formation',
      description: 'Collaborative company creation with shared resources and expertise',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Investment Opportunities',
      description: 'Pool resources for bigger investment opportunities and shared returns',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Shield,
      title: 'Smart Contracts',
      description: 'Automated, secure agreements with blockchain technology',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const stats = [
    { label: 'Active Groups', value: '2,847', icon: Users },
    { label: 'Total Savings', value: '$12.4M', icon: TrendingUp },
    { label: 'Companies Formed', value: '156', icon: Building2 },
    { label: 'Success Rate', value: '94%', icon: Target }
  ];

  const handleFilterSubmit = (filters) => {
    // Mock filtered results - في التطبيق الحقيقي ستأتي من API
    const mockResults = [
      {
        id: '1',
        name: 'Tech Startups Group',
        description: 'Group for technology startups to share resources and collaborate',
        memberCount: 45,
        category: 'Technology',
        status: 'Active',
        phase: 'Active',
        rating: 4.5,
        maxMembers: 50
      },
      {
        id: '2',
        name: 'Green Energy Initiative',
        description: 'Collaborative group focusing on renewable energy solutions',
        memberCount: 32,
        category: 'Environment',
        status: 'Active',
        phase: 'Forming',
        rating: 4.2,
        maxMembers: 40
      }
    ];
    
    setFilterResults(mockResults);
    setShowResults(true);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setShowGroupProfile(true);
  };

  const handleJoinGroup = (group) => {
    console.log('Joining group:', group);
    // Handle group joining logic here
    setShowGroupProfile(false);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Hero Banner */}
        <HeroBanner />

        <div className="container mx-auto px-4 py-8">
          {/* Filters Section */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Group</h2>
              <p className="text-xl text-gray-600">Search and filter groups based on your interests and needs</p>
            </div>
            <HomepageFilters onFiltersSubmit={handleFilterSubmit} />
          </section>

          {/* Search Results */}
          {showResults && (
            <section className="mb-16">
              <FilteredGroupsResults 
                groups={filterResults} 
                onGroupClick={handleGroupClick}
              />
            </section>
          )}

          {/* Stats Section */}
          <section className="bg-white py-16 mb-16 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover how our platform revolutionizes business collaboration and procurement
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.color} mb-4`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Navigation */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-16 text-left justify-start gap-4"
                onClick={() => navigate('/my-groups')}
              >
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="font-semibold">My Groups</div>
                  <div className="text-sm text-gray-500">Manage your groups</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 text-left justify-start gap-4"
                onClick={() => navigate('/suppliers')}
              >
                <Building2 className="w-8 h-8 text-green-600" />
                <div>
                  <div className="font-semibold">Suppliers</div>
                  <div className="text-sm text-gray-500">Find suppliers</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 text-left justify-start gap-4"
                onClick={() => navigate('/negotiations')}
              >
                <Handshake className="w-8 h-8 text-purple-600" />
                <div>
                  <div className="font-semibold">Negotiations</div>
                  <div className="text-sm text-gray-500">Active negotiations</div>
                </div>
              </Button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">GPO Nexus</h3>
              <p className="text-gray-400 mb-4">
                Revolutionizing business collaboration through AI-powered group purchasing and smart solutions.
              </p>
              <div className="text-gray-400">
                <p>&copy; 2025 GPO Nexus. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>

        {/* Group Profile Modal */}
        {showGroupProfile && selectedGroup && (
          <GroupProfileModal
            group={selectedGroup}
            isOpen={showGroupProfile}
            onClose={() => setShowGroupProfile(false)}
            onJoinGroup={handleJoinGroup}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
