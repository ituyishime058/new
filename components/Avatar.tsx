import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  isOnline?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', isOnline = false }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  const onlineIndicatorClasses = {
      sm: 'w-2.5 h-2.5 border-2',
      md: 'w-3 h-3 border-2',
      lg: 'w-4 h-4 border-2'
  }

  return (
    <div className="relative flex-shrink-0">
        <img
          src={src}
          alt={alt}
          className={`${sizeClasses[size]} rounded-full object-cover ring-1 ring-border-color`}
        />
        {isOnline && (
            <span className={`absolute bottom-0 right-0 block rounded-full bg-green-500 border-primary ${onlineIndicatorClasses[size]}`}></span>
        )}
    </div>
  );
};

export default Avatar;