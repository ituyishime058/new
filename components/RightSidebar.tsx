
import React from 'react';
// FIX: Add file extension to imports.
import { users } from '../constants.ts';
import { User } from '../types.ts';
import Avatar from './Avatar';
import TrendingTopics from './TrendingTopics';

interface RightSidebarProps {
  onViewProfile: (user: User) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ onViewProfile }) => {
    const suggestedUsers = users.slice(2, 6);

    return (
        <div className="p-2 space-y-6 sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
            <TrendingTopics />
            <div className="bg-primary p-4 rounded-xl shadow-sm">
                <h2 className="font-bold text-text-primary mb-4">Who to follow</h2>
                <div className="space-y-4">
                    {suggestedUsers.map(user => (
                        <div key={user.id} className="flex items-center justify-between">
                            <button onClick={() => onViewProfile(user)} className="flex items-center space-x-3 group">
                                <Avatar src={user.avatarUrl} alt={user.name} size="md" isOnline={user.isOnline} />
                                <div>
                                    <p className="font-bold text-sm text-text-primary group-hover:underline">{user.name}</p>
                                    <p className="text-xs text-text-secondary">@{user.handle}</p>
                                </div>
                            </button>
                            <button className="px-3 py-1 rounded-full text-sm font-semibold transition-colors bg-secondary text-text-primary hover:bg-border-color">
                                Follow
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="text-xs text-text-secondary">
                © {new Date().getFullYear()} Nexus Corporation. All rights reserved.
            </footer>
        </div>
    );
};

export default RightSidebar;
