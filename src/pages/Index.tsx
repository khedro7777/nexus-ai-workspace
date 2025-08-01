
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import UnifiedHeader from "@/components/layout/UnifiedHeader";
import HomepageFilters from "@/components/filters/HomepageFilters";
import FeatureCards from "@/components/cards/FeatureCards";
import Footer from "@/components/layout/Footer";
import { 
  Users, 
  Building2, 
  BarChart3, 
  Zap, 
  Globe, 
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface FilterState {
  groupType: string;
  country: string;
  status: string;
  role: string;
  search: string;
}

const Index = () => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<FilterState>({
    groupType: '',
    country: '',
    status: '',
    role: '',
    search: ''
  });

  const features = [
    {
      icon: Users,
      title: "Group Purchasing Power",
      description: "Unite with others to leverage collective buying power and achieve better deals through strategic group purchasing."
    },
    {
      icon: Building2,
      title: "Smart Business Formation",
      description: "AI-powered tools to help form and manage business partnerships efficiently with legal compliance."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights and analytics to make informed business decisions with real-time market data."
    },
    {
      icon: Zap,
      title: "Process Automation",
      description: "Streamline operations with intelligent workflow automation and MCP assistant integration."
    },
    {
      icon: Globe,
      title: "Global Marketplace",
      description: "Access suppliers and partners from around the world with verified KYCB credentials."
    },
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "Built-in arbitration and governance systems with IPFS vault storage for trust and security."
    }
  ];

  const stats = [
    { number: "15K+", label: "Active Users", icon: Users },
    { number: "2,500+", label: "Successful Groups", icon: Building2 },
    { number: "98%", label: "Success Rate", icon: CheckCircle },
    { number: "$50M+", label: "USD Processed", icon: DollarSign }
  ];

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Here you would typically filter the groups based on the new filters
    console.log('Filters changed:', newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <UnifiedHeader />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to <span className="text-blue-200">GPO NEXUS</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Your AI-powered unified workspace for global business collaboration. 
              Connect, negotiate, and grow with businesses worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create-group">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomepageFilters onFiltersChange={handleFiltersChange} />
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select how you want to participate in our global business ecosystem
            </p>
          </div>
          
          <FeatureCards />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Global Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build, manage, and grow your collaborative business ventures worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Global Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of successful entrepreneurs leveraging collective power in USD-based global marketplace
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Your Journey <Star className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
