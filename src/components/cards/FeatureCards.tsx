
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building2, 
  Briefcase, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      icon: Users,
      title: "Smart Group Formation",
      description: "Create and join intelligent business groups with automated governance and decision-making processes.",
      color: "bg-blue-500",
      benefits: ["Automated Voting", "Role Management", "Consensus Building"]
    },
    {
      icon: Building2,
      title: "Procurement Management",
      description: "Streamline procurement processes with collective bargaining power and transparent supplier negotiations.",
      color: "bg-green-500",
      benefits: ["Bulk Discounts", "Verified Suppliers", "Contract Management"]
    },
    {
      icon: Briefcase,
      title: "Freelancer Marketplace",
      description: "Connect with verified freelancers and manage projects with integrated payment and dispute resolution.",
      color: "bg-purple-500",
      benefits: ["Skill Verification", "Secure Payments", "Quality Assurance"]
    },
    {
      icon: TrendingUp,
      title: "Investment Opportunities",
      description: "Discover and participate in collective investment opportunities with transparent risk assessment.",
      color: "bg-orange-500",
      benefits: ["Due Diligence", "Risk Analysis", "Portfolio Tracking"]
    },
    {
      icon: Shield,
      title: "Legal Compliance",
      description: "Ensure all activities comply with international commercial law and local regulations.",
      color: "bg-red-500",
      benefits: ["UNCITRAL Compliance", "Smart Contracts", "Dispute Resolution"]
    },
    {
      icon: Zap,
      title: "AI-Powered Automation",
      description: "Leverage artificial intelligence to optimize processes and provide smart recommendations.",
      color: "bg-yellow-500",
      benefits: ["Smart Analytics", "Process Optimization", "Predictive Insights"]
    }
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Platform Features
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the powerful tools and capabilities that make GPO DO the premier platform for collaborative business
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.color} text-white mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant="outline" 
                className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
