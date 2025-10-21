
import React from 'react';
import { users, currentUser } from '../constants';
import { User } from '../types';
import Avatar from './Avatar';
import Icon from './Icon';
import TrendingTopics from './TrendingTopics';

interface RightSidebarProps {
  onViewProfile: (user: User) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ onViewProfile }) => {
  const onlineFriends = users.filter(u => u.isOnline && u.id !== currentUser.id);

  return (
    <div className="p-2 flex flex-col space-y-6 sticky top-20 h-[calc(100vh-6rem)]">
      <TrendingTopics />
      
      <div className="bg-primary p-4 rounded-xl shadow-sm">
        <h2 className="font-bold text-text-primary mb-4">Contacts</h2>
        <div className="space-y-4">
          {onlineFriends.map(user => (
            <button key={user.id} onClick={() => onViewProfile(user)} className="w-full flex items-center space-x-3 text-left hover:bg-secondary p-2 rounded-lg">
              <Avatar src={user.avatarUrl} alt={user.name} size="md" isOnline />
              <p className="font-semibold text-text-primary">{user.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
