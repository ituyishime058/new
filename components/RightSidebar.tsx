import React, { useState } from 'react';
import { users } from '../constants';
// FIX: The 'User' type is exported from `types.ts`, not `constants.ts`.
import type { User } from '../types';
import Avatar from './Avatar';

interface RightSidebarProps {
  onViewProfile: (user: User) => void;
}

const FollowSuggestion: React.FC<{ user: User, onViewProfile: (user: User) => void }> = ({ user, onViewProfile }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    return (
        <div className="flex items-center justify-between">
            <button onClick={() => onViewProfile(user)} className="flex items-center space-x-3 group">
                <Avatar src={user.avatarUrl} alt={user.name} />
                <div>
                    <p className="font-bold text-sm text-text-primary group-hover:underline">{user.name}</p>
                    <p className="text-xs text-text-secondary">@{user.handle}</p>
                </div>
            </button>
            <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                    isFollowing 
                    ? 'bg-secondary text-text-primary border border-border-color' 
                    : 'bg-accent text-white hover:opacity-90'
                }`}
            >
                {isFollowing ? 'Following' : 'Follow'}
            </button>
        </div>
    );
};

const RightSidebar: React.FC<RightSidebarProps> = ({ onViewProfile }) => {
  const suggestions = users.slice(1, 4);

  return (
    <div className="p-2 space-y-4 sticky top-20">
      <div className="bg-primary p-4 rounded-xl shadow-md">
        <h2 className="font-bold text-lg text-text-primary mb-4">Who to follow</h2>
        <div className="space-y-4">
          {suggestions.map(user => (
            <FollowSuggestion key={user.id} user={user} onViewProfile={onViewProfile} />
          ))}
        </div>
      </div>
      <footer className="text-xs text-text-secondary space-x-2">
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>© 2024</span>
      </footer>
    </div>
  );
};

export default RightSidebar;