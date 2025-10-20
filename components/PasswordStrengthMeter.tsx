import React from 'react';

interface PasswordStrengthMeterProps {
  password?: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password = '' }) => {
  const getStrength = () => {
    let score = 0;
    if (password.length > 7) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;
    return score;
  };

  const strength = getStrength();
  const colors = ['bg-gray-400', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
  const labels = ['', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-1 flex-1 rounded-full">
            <div className={`h-full rounded-full ${strength > i ? colors[strength] : 'bg-secondary'}`} />
          </div>
        ))}
      </div>
      <p className={`text-xs mt-1 font-semibold ${strength > 0 ? 'text-text-primary' : 'text-text-secondary'}`}>{labels[strength]}</p>
    </div>
  );
};

export default PasswordStrengthMeter;
