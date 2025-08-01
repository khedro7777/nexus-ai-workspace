
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import HomepageFilters from '@/components/filters/HomepageFilters';
import FeatureCards from '@/components/cards/FeatureCards';
import Footer from '@/components/layout/Footer';
import { 
  Users, 
  Globe, 
  Shield, 
  Zap, 
  TrendingUp,
  Building2,
  Handshake,
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    { label: 'Active Groups', value: '2,500+', icon: Users },
    { label: 'Global Members', value: '50K+', icon: Globe },
    { label: 'Contracts Managed', value: '10K+', icon: Shield },
    { label: 'Success Rate', value: '98%', icon: TrendingUp }
  ];

  const features = [
    {
      icon: Users,
      title: 'Smart Group Formation',
      description: 'Create or join collaborative groups with AI-powered matching and role-based access control.'
    },
    {
      icon: Handshake,
      title: 'Contract Management',
      description: 'Automated contract generation, voting systems, and blockchain-secured documentation.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Automation',
      description: 'Intelligent workflows, market insights, and automated compliance monitoring.'
    },
    {
      icon: Shield,
      title: 'Built-in Arbitration',
      description: 'Professional dispute resolution with international standards and transparent processes.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Supply Chain Manager',
      company: 'Global Trade Corp',
      content: 'GPO NEXUS transformed our procurement process. We reduced costs by 30% and improved supplier relationships significantly.'
    },
    {
      name: 'Ahmed Al-Rashid',
      role: 'Startup Founder',
      company: 'TechVenture ME',
      content: 'The platform enabled us to form strategic partnerships we never could have accessed before. Game-changing!'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Freelance Consultant',
      company: 'Independent Professional',
      content: 'Finding quality group projects and managing contracts has never been easier. Highly recommended!'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              🚀 Now Live: Group Discount Offers
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              The Future of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {' '}Collaborative Business
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals, suppliers, and businesses forming smart groups, 
              negotiating better deals, and building the future of global commerce together.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/dashboard')}
                  className="text-lg px-8 py-3"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/my-groups')}
                  className="text-lg px-8 py-3"
                >
                  View My Groups
                </Button>
              </>
            ) : (
              <>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/auth')}
                  className="text-lg px-8 py-3"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/about')}
                  className="text-lg px-8 py-3"
                >
                  Learn More
                </Button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Match</h2>
            <p className="text-lg text-gray-600">
              Use our advanced filters to discover groups, opportunities, and partners that align with your goals.
            </p>
          </div>
          <HomepageFilters />
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Take Action Today</h2>
            <p className="text-lg text-gray-600">
              Choose how you want to participate in the global collaborative economy.
            </p>
          </div>
          <FeatureCards />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose GPO NEXUS?</h2>
            <p className="text-lg text-gray-600">
              Built for professionals who demand excellence, transparency, and results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600">
              See how professionals worldwide are achieving more through collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-xs text-gray-500">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the global community of professionals who are building the future of collaborative business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-3"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => navigate('/user-guide')}
            >
              View User Guide
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-75">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Global support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
