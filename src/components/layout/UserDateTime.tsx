
import React, { useState, useEffect } from 'react';
import { Clock, Calendar, DollarSign } from 'lucide-react';

const UserDateTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col items-center gap-1 text-sm" dir="ltr">
      <div className="flex items-center gap-2 text-blue-600 font-medium">
        <Clock className="w-4 h-4" />
        <span>{formatTime(currentTime)}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600 text-xs">
        <Calendar className="w-3 h-3" />
        <span>{formatDate(currentTime)}</span>
      </div>
      <div className="flex items-center gap-2 text-green-600 text-xs font-medium">
        <DollarSign className="w-3 h-3" />
        <span>USD</span>
      </div>
    </div>
  );
};

export default UserDateTime;
