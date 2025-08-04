
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Megaphone, 
  Building2, 
  TrendingUp, 
  Users,
  ArrowRight,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PortalSlider = () => {
  const navigate = useNavigate();

  const portals = [
    {
      id: 'group-buying',
      title: 'Group Buying',
      description: 'Join purchasing groups for better prices and bulk deals',
      icon: ShoppingCart,
      color: 'bg-green-500',
      activeGroups: 45,
      totalMembers: 1250,
      stats: { deals: 89, savings: '32%' }
    },
    {
      id: 'marketing',
      title: 'Cooperative Marketing',
      description: 'Collaborate on marketing campaigns to reduce costs',
      icon: Megaphone,
      color: 'bg-purple-500',
      activeGroups: 23,
      totalMembers: 680,
      stats: { campaigns: 34, reach: '2.5M' }
    },
    {
      id: 'company-formation',
      title: 'Company Formation',
      description: 'Start your company with partners or individually',
      icon: Building2,
      color: 'bg-blue-500',
      activeGroups: 18,
      totalMembers: 340,
      stats: { formed: 67, success: '94%' }
    },
    {
      id: 'investment',
      title: 'Investment Groups',
      description: 'Invest together in promising projects and startups',
      icon: TrendingUp,
      color: 'bg-yellow-500',
      activeGroups: 31,
      totalMembers: 890,
      stats: { projects: 56, returns: '18%' }
    },
    {
      id: 'freelancer',
      title: 'Freelancer Network',
      description: 'Connect with skilled freelancers and form project teams',
      icon: Users,
      color: 'bg-indigo-500',
      activeGroups: 52,
      totalMembers: 2340,
      stats: { projects: 234, rating: '4.8' }
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Explore Our Portals
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the portal that fits your needs and join active groups or create your own
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {portals.map((portal) => (
          <Card key={portal.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <div className={`w-16 h-16 ${portal.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <portal.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {portal.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {portal.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Active Groups:</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {portal.activeGroups}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Members:</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {portal.totalMembers.toLocaleString()}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  {Object.entries(portal.stats).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold text-gray-900">{value}</div>
                      <div className="text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full group-hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => navigate(`/portal/${portal.id}`)}
                >
                  Explore Portal
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PortalSlider;
