import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { users as initialUsers } from '../constants.ts';
import Icon from './Icon.tsx';
import Avatar from './Avatar.tsx';
import { User } from '../types.ts';

interface LikesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewProfile: (user: User) => void;
}

const LikesModal: React.FC<LikesModalProps> = ({ isOpen, onClose, onViewProfile }) => {
    // Mock data for who liked the post
    const likers = initialUsers.slice(1, 4);

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
                            <h2 className="font-bold text-lg text-text-primary">Liked by</h2>
                            <button onClick={onClose} className="ml-auto p-2 rounded-full hover:bg-secondary">
                                <Icon name="XMark" className="w-5 h-5" />
                            </button>
                        </header>
                        <div className="flex-1 overflow-y-auto">
                            {likers.map(user => (
                               <div key={user.id} className="flex items-center justify-between p-3 hover:bg-secondary">
                                    <button onClick={() => { onViewProfile(user); onClose(); }} className="flex items-center space-x-3 group text-left">
                                        <Avatar src={user.avatarUrl} alt={user.name} size="md" isOnline={user.isOnline} />
                                        <div>
                                            <p className="font-bold text-sm text-text-primary group-hover:underline">{user.name}</p>
                                            <p className="text-xs text-text-secondary">@{user.handle}</p>
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LikesModal;
