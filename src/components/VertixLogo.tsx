import React from 'react';
import { motion } from 'framer-motion';

interface VertixLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export default function VertixLogo({ size = 'md', animated = false, className = '' }: VertixLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const LogoComponent = animated ? motion.div : 'div';
  const animationProps = animated ? {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {};

  return (
    <LogoComponent 
      className={`${sizeClasses[size]} ${className} relative`}
      {...animationProps}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="vertixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
        
        {/* V Shape */}
        <path
          d="M15 20 L35 75 L50 45 L65 75 L85 20 L70 20 L55 55 L50 45 L45 55 L30 20 Z"
          fill="url(#vertixGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Accent dot */}
        <circle
          cx="75"
          cy="25"
          r="4"
          fill="#00D4FF"
          className="opacity-80"
        />
      </svg>
    </LogoComponent>
  );
}