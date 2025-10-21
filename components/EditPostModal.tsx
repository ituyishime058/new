import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Post as PostType } from '../types.ts';
import { currentUser } from '../constants.ts';
import Avatar from './Avatar.tsx';
import Icon from './Icon.tsx';

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostType;
  onSave: (updatedPost: PostType) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, onClose, post, onSave }) => {
  const [content, setContent] = useState(post.content);

  const handleSave = () => {
    onSave({ ...post, content });
    onClose();
  };

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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-primary rounded-xl w-full max-w-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="p-4 border-b border-border-color flex items-center">
                <h2 className="text-lg font-bold">Edit Post</h2>
                <button onClick={onClose} className="ml-auto p-2 rounded-full hover:bg-secondary"><Icon name="XMark" className="w-6 h-6" /></button>
            </header>
            <div className="p-4">
                <div className="flex space-x-4">
                    <Avatar src={currentUser.avatarUrl} alt={currentUser.name} />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full bg-transparent text-lg placeholder-text-secondary focus:outline-none resize-none"
                        rows={5}
                        autoFocus
                    />
                </div>
            </div>
            <footer className="p-4 border-t border-border-color flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={!content.trim() || content === post.content}
                    className="px-6 py-2 bg-accent text-white font-bold rounded-full disabled:opacity-50 hover:opacity-90 transition-opacity"
                    >
                    Save
                </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditPostModal;
