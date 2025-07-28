
import React from 'react';
import { Brain, Zap, Globe } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Innovative Logo Design */}
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        {/* Outer ring with gradient */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 animate-pulse"></div>
        
        {/* Inner circle with glass effect */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20"></div>
        
        {/* Central icon with glow effect */}
        <div className="relative z-10 flex items-center justify-center">
          <Brain className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-8 h-8'} text-white drop-shadow-lg`} />
        </div>
        
        {/* Orbiting elements */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
          <Zap className={`absolute -top-1 left-1/2 transform -translate-x-1/2 ${size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'} text-yellow-400`} />
        </div>
        
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
          <Globe className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 ${size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'} text-green-400`} />
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`font-bold gradient-text ${textSizeClasses[size]} leading-none`}>
            GPO SMART
          </h1>
          {size !== 'sm' && (
            <span className="text-xs text-gray-500 font-medium tracking-wider">
              منصة التعاقد الذكي
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
