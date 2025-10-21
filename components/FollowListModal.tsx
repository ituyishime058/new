
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Add file extension to imports.
import { users as initialUsers, currentUser } from '../constants.ts';
import Icon from './Icon.tsx';
import Avatar from './Avatar.tsx';
// FIX: Add file extension to imports.
import { User } from '../types.ts';

interface FollowListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: 'Followers' | 'Following';
  onViewProfile: (user: User) => void;
  onFollowToggle?: (userId: string) => void;
  onRemoveFollower?: (userId: string) => void;
}

const UserItem: React.FC<{ 
    user: User, 
    type: 'Followers' | 'Following',
    onViewProfile: (user: User) => void,
    onFollowToggle: (userId: string) => void
    onRemoveFollower: (userId: string) => void
}> = ({ user, type, onViewProfile, onFollowToggle, onRemoveFollower }) => {
    
    if (user.id === currentUser.id) return null;

    const [isFollowing, setIsFollowing] = useState(user.isFollowing);

    const handleFollowClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFollowing(!isFollowing);
        onFollowToggle(user.id);
    }
    
    return (
        <div className="flex items-center justify-between p-3 hover:bg-secondary transition-colors">
            <button onClick={() => onViewProfile(user)} className="flex items-center space-x-3 group text-left">
                <Avatar src={user.avatarUrl} alt={user.name} size="md" isOnline={user.isOnline} />
                <div>
                    <p className="font-bold text-sm text-text-primary group-hover:underline">{user.name}</p>
                    <p className="text-xs text-text-secondary">@{user.handle}</p>
                </div>
            </button>

            {type === 'Following' && (
                <button 
                    onClick={handleFollowClick}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors w-24 ${
                        isFollowing 
                        ? 'bg-secondary text-text-primary border border-border-color hover:border-red-500 hover:text-red-500' 
                        : 'bg-accent text-white hover:opacity-90'
                    }`}
                >
                    {isFollowing ? 'Following' : 'Follow'}
                </button>
            )}

            {type === 'Followers' && (
                 <button 
                 onClick={() => onRemoveFollower(user.id)}
                 className="px-3 py-1 rounded-full text-sm font-semibold transition-colors w-24 bg-secondary text-text-primary border border-border-color hover:border-red-500 hover:text-red-500"
                >
                    Remove
                </button>
            )}
        </div>
    );
};

const FollowListModal: React.FC<FollowListModalProps> = ({ isOpen, onClose, title, onViewProfile, onFollowToggle = () => {}, onRemoveFollower = () => {} }) => {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
      if(isOpen) {
          // In a real app, you'd fetch this data. Here we filter the mock data.
          if (title === 'Following') {
              setUserList(initialUsers.filter(u => u.isFollowing));
          } else {
              setUserList(initialUsers.slice(2, 6)); // Mock followers
          }
      }
  }, [isOpen, title])

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
            <div className="flex-1 overflow-y-auto">
                {userList.map(user => (
                  <UserItem 
                    key={user.id} 
                    user={user} 
                    type={title} 
                    onViewProfile={(u) => { onViewProfile(u); onClose(); }} 
                    onFollowToggle={onFollowToggle}
                    onRemoveFollower={onRemoveFollower}
                  />)
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FollowListModal;