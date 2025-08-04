
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const popularPages = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "My Groups", path: "/my-groups", icon: Home },
    { name: "Create Group", path: "/create-group", icon: Home },
    { name: "Investment Portal", path: "/investment", icon: Home },
    { name: "C2C Store", path: "/c2c-store", icon: Home },
    { name: "Suppliers", path: "/suppliers", icon: Home }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* 404 Display */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-200 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/">
            <Button className="flex items-center gap-2 px-6 py-3">
              <Home className="w-5 h-5" />
              Go to Homepage
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>

        {/* Popular Pages */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Search className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Popular Pages</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {popularPages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="p-3 text-center rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                >
                  <page.icon className="w-5 h-5 mx-auto mb-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{page.name}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              If you believe this is an error or need assistance, please contact our support team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
              <Button variant="outline" size="sm">
                Report Issue
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Path Info */}
        <div className="mt-6 text-xs text-gray-500">
          Attempted path: <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
