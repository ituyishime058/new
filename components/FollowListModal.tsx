
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { users } from '../constants';
import Icon from './Icon';
import Avatar from './Avatar';
import { User } from '../types';

interface FollowListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: 'Followers' | 'Following';
  onViewProfile: (user: User) => void;
}

const UserItem: React.FC<{ user: User, onViewProfile: (user: User) => void }> = ({ user, onViewProfile }) => {
    const [isFollowing, setIsFollowing] = useState(Math.random() > 0.5);
    return (
        <div className="flex items-center justify-between p-3">
            <button onClick={() => onViewProfile(user)} className="flex items-center space-x-3 group text-left">
                <Avatar src={user.avatarUrl} alt={user.name} size="md" />
                <div>
                    <p className="font-bold text-sm text-text-primary group-hover:underline">{user.name}</p>
                    <p className="text-xs text-text-secondary">@{user.handle}</p>
                </div>
            </button>
            <button 
                 onClick={() => setIsFollowing(!isFollowing)}
                 className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors w-24 ${
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

const FollowListModal: React.FC<FollowListModalProps> = ({ isOpen, onClose, title, onViewProfile }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-primary rounded-xl w-full max-w-md h-[70vh] shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center p-4 border-b border-border-color">
                <h2 className="font-bold text-lg text-text-primary">{title}</h2>
                <button onClick={onClose} className="ml-auto p-2 rounded-full hover:bg-secondary">
                    <Icon name="XMark" className="w-5 h-5" />
                </button>
            </header>
            <div className="flex-1 overflow-y-auto divide-y divide-border-color">
                {users.slice(1).map(user => <UserItem key={user.id} user={user} onViewProfile={(u) => { onViewProfile(u); onClose(); }} />)}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FollowListModal;
