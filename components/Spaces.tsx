
import React from 'react';
import Icon from './Icon';

const Spaces: React.FC = () => {
  return (
    <div className="bg-primary p-4 rounded-xl shadow-sm">
        <h2 className="font-bold text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="SpeakerWave" className="w-5 h-5 text-accent" />
            <span>Live Spaces</span>
        </h2>
        <div className="text-center text-text-secondary py-8">
            <p>No active spaces right now.</p>
        </div>
    </div>
  );
};

export default Spaces;
