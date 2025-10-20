
import React from 'react';
import * as HIconsOutline from '@heroicons/react/24/outline';
import * as HIconsSolid from '@heroicons/react/24/solid';

interface IconProps {
  name: string;
  className?: string;
  variant?: 'outline' | 'solid';
}

const Icon: React.FC<IconProps> = ({ name, className, variant = 'outline' }) => {
  if (name === 'logo') {
    return (
      <svg viewBox="0 0 180 40" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-start)" />
            <stop offset="100%" stopColor="var(--accent-end)" />
          </linearGradient>
        </defs>
        <text
          fontFamily="'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif"
          fontSize="32"
          fontWeight="bold"
          fill="url(#logoGradient)"
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          Nexus
        </text>
      </svg>
    );
  }

  const Icons = variant === 'solid' ? HIconsSolid : HIconsOutline;
  // @ts-ignore
  const IconComponent = Icons[name + 'Icon'];

  if (!IconComponent) {
    // Return a default icon or null if the icon name is invalid
    return HIconsOutline.QuestionMarkCircleIcon;
  }

  return <IconComponent className={className || 'w-6 h-6'} />;
};

export default Icon;
