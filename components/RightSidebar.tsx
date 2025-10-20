import React from 'react';
import { users } from '../constants';
import Avatar from './Avatar';
import Icon from './Icon';

const RightSidebar: React.FC = () => {
  const suggestions = users.filter(u => u.id !== 'user-1' && u.id !== 'nexus-ai').slice(0, 4);

  return (
    <div className="p-4 space-y-8 sticky top-20">
      {/* Friend Suggestions */}
      <div className="bg-primary p-4 rounded-xl shadow-sm">
        <h2 className="font-bold text-text-primary mb-4">Suggestions for you</h2>
        <div className="space-y-4">
          {suggestions.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar src={user.avatarUrl} alt={user.name} size="md" />
                <div>
                  <p className="font-bold text-sm text-text-primary">{user.name}</p>
                  <p className="text-xs text-text-secondary">Suggested for you</p>
                </div>
              </div>
              <button className="text-accent text-sm font-semibold">Follow</button>
            </div>
          ))}
        </div>
      </div>

      {/* Active Friends */}
      <div className="bg-primary p-4 rounded-xl shadow-sm">
        <h2 className="font-bold text-text-primary mb-4">Active Now</h2>
        <div className="space-y-4">
          {users.slice(1, 4).map(user => (
            <div key={user.id} className="flex items-center space-x-3">
              <div className="relative">
                <Avatar src={user.avatarUrl} alt={user.name} size="md" />
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-primary"></span>
              </div>
              <div>
                <p className="font-bold text-sm text-text-primary">{user.name}</p>
              </div>
              <button className="ml-auto p-1 rounded-full hover:bg-secondary">
                <Icon name="ChatBubbleOvalLeftEllipsis" className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
