
import React from 'react';
import { users } from '../constants';
import Avatar from './Avatar';
import Icon from './Icon';

const RightSidebar: React.FC = () => {
  const suggestions = users.slice(1, 4);

  return (
    <div className="p-2 space-y-4 sticky top-20">
      <div className="bg-primary p-4 rounded-xl shadow-md">
        <h2 className="font-bold text-lg text-text-primary mb-4">Who to follow</h2>
        <div className="space-y-4">
          {suggestions.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar src={user.avatarUrl} alt={user.name} />
                <div>
                  <p className="font-bold text-sm text-text-primary">{user.name}</p>
                  <p className="text-xs text-text-secondary">@{user.handle}</p>
                </div>
              </div>
              <button className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold hover:opacity-90">
                Follow
              </button>
            </div>
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
