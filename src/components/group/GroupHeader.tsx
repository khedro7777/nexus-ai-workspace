
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const GroupHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <Link to="/dashboard">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 ml-2" />
          العودة إلى لوحة التحكم
        </Button>
      </Link>
    </div>
  );
};

export default GroupHeader;
