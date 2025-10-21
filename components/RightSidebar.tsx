
import React from 'react';
import { users } from '../constants.ts';
import { User } from '../types.ts';
import Avatar from './Avatar.tsx';
import Icon from './Icon.tsx';
import TrendingTopics from './TrendingTopics.tsx';
import Spaces from './Spaces.tsx';

interface RightSidebarProps {
  onViewProfile: (user: User) => void;
}

const WhoToFollow: React.FC<RightSidebarProps> = ({ onViewProfile }) => {
    // Exclude current user and suggest some other users
    const suggestions = users.filter(u => u.id !== 'user-1').slice(0, 3);

    return (
        <div className="bg-primary p-4 rounded-xl shadow-sm">
            <h2 className="font-bold text-text-primary mb-4">Who to Follow</h2>
            <div className="space-y-4">
                {suggestions.map(user => (
                    <div key={user.id} className="flex items-center justify-between">
                        <button onClick={() => onViewProfile(user)} className="flex items-center space-x-3 group">
                            <Avatar src={user.avatarUrl} alt={user.name} size="md" />
                            <div>
                                <p className="font-bold text-sm text-text-primary group-hover:underline">{user.name}</p>
                                <p className="text-xs text-text-secondary">@{user.handle}</p>
                            </div>
                        </button>
                        <button className="px-3 py-1 bg-accent text-white rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
                            Follow
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RightSidebar: React.FC<RightSidebarProps> = ({ onViewProfile }) => {
  return (
    <div className="space-y-4 sticky top-20">
      <WhoToFollow onViewProfile={onViewProfile} />
      <TrendingTopics />
      <Spaces />
    </div>
  );
};

export default RightSidebar;
