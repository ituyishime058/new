
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Add file extension to import.
import { Post as PostType, User } from '../types.ts';
import Post from './Post';
import Icon from './Icon';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostType | null;
  onViewProfile: (user: User) => void;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, post, onViewProfile }) => {
  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Post post={post} onViewProfile={onViewProfile} />
          </motion.div>
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
            <Icon name="XMark" className="w-8 h-8" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostModal;
