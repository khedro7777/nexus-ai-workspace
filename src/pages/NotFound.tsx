
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowRight } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center" dir="rtl">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-3xl font-bold text-gray-800">الصفحة غير موجودة</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link to="/">
            <Button className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              العودة للرئيسية
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
