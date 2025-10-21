
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Corrected import path for types
import { Post } from '../types';
import Icon from './Icon';
// FIX: Corrected import path for constants
import { users } from '../constants';
import Avatar from './Avatar';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, post }) => {
  const [copied, setCopied] = React.useState(false);
  const friends = users.slice(1, 5);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://nexus-app.dev/post/${post.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-primary rounded-xl w-full max-w-md shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center p-4 border-b border-border-color">
              <h2 className="font-bold text-lg text-text-primary">Share Post</h2>
              <button onClick={onClose} className="ml-auto p-2 rounded-full hover:bg-secondary">
                <Icon name="XMark" className="w-5 h-5" />
              </button>
            </header>
            <div className="p-4">
              <div className="relative mb-4">
                <input 
                  type="text" 
                  readOnly 
                  value={`https://nexus-app.dev/post/${post.id}`}
                  className="w-full bg-secondary border border-border-color rounded-lg py-2 pl-3 pr-24"
                />
                <button onClick={handleCopy} className="absolute right-1 top-1 bottom-1 px-4 text-sm font-semibold bg-accent text-white rounded-md">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <h3 className="font-semibold text-text-secondary text-sm mb-2">Share with friends</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {friends.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary">
                    <div className="flex items-center space-x-3">
                      <Avatar src={user.avatarUrl} alt={user.name} />
                      <p className="font-bold text-sm">{user.name}</p>
                    </div>
                    <button className="px-4 py-1.5 text-sm font-semibold border border-border-color rounded-full hover:bg-accent hover:text-white hover:border-accent">
                      Send
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
