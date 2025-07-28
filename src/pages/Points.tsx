
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PointsSystem from '@/components/points/PointsSystem';

const Points = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">نظام النقاط</h1>
          <p className="text-gray-600">اكسب النقاط واستبدلها بخدمات ومكافآت قيمة</p>
        </div>
        
        <PointsSystem />
      </div>
    </div>
  );
};

export default Points;
