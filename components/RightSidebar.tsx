import React from 'react';
import { User } from '../types';
import Avatar from './Avatar';
import TrendingTopics from './TrendingTopics';

interface RightSidebarProps {
  users: User[];
  onFollowToggle: (userId: string) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ users, onFollowToggle }) => {
  const suggestions = users.filter(u => u.id !== 'nexus-ai' && !u.isFollowing).slice(0, 4);

  const FollowButton: React.FC<{ user: User }> = ({ user }) => (
    <button 
      onClick={() => onFollowToggle(user.id)}
      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors w-28 ${
        user.isFollowing 
        ? 'bg-secondary text-text-primary border border-border-color' 
        : 'bg-accent text-white hover:opacity-90'
      }`}
    >
      {user.isFollowing ? 'Following' : 'Follow'}
    </button>
  );

  return (
    <div className="p-4 space-y-8 sticky top-20">
      <TrendingTopics />

      {/* Friend Suggestions */}
      <div className="bg-primary p-4 rounded-xl shadow-sm">
        <h2 className="font-bold text-text-primary mb-4">Suggestions for you</h2>
        <div className="space-y-4">
          {suggestions.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar src={user.avatarUrl} alt={user.name} size="md" isOnline={user.isOnline} />
                <div>
                  <p className="font-bold text-sm text-text-primary">{user.name}</p>
                  <p className="text-xs text-text-secondary">Suggested for you</p>
                </div>
              </div>
              <FollowButton user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;