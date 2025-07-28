
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import GovernancePanel from '@/components/governance/GovernancePanel';

const Governance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">نظام الحوكمة</h1>
          <p className="text-gray-600">إدارة قواعد الحوكمة والمقترحات والتصويت</p>
        </div>
        
        <GovernancePanel />
      </div>
    </div>
  );
};

export default Governance;
