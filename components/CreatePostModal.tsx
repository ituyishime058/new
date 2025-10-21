
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Add file extension to import.
import { currentUser } from '../constants.ts';
import { Post } from '../types.ts';
import Avatar from './Avatar.tsx';
import Icon from './Icon.tsx';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewPost: (post: Post) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onNewPost }) => {
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    if (!postContent.trim()) return;
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: currentUser,
      content: postContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    onNewPost(newPost);
    setPostContent('');
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
                <h2 className="text-lg font-bold">Create Post</h2>
                <button onClick={onClose} className="ml-auto p-2 rounded-full hover:bg-secondary"><Icon name="XMark" className="w-6 h-6" /></button>
            </header>
            <div className="p-4">
                <div className="flex space-x-4">
                    <Avatar src={currentUser.avatarUrl} alt={currentUser.name} />
                    <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className="w-full bg-transparent text-lg placeholder-text-secondary focus:outline-none resize-none"
                        placeholder="What's on your mind?"
                        rows={5}
                        autoFocus
                    />
                </div>
            </div>
            <footer className="p-4 border-t border-border-color flex justify-between items-center">
                 <div className="flex space-x-2 text-accent">
                    <button className="p-2 rounded-full hover:bg-accent/10"><Icon name="Photo" className="w-6 h-6" /></button>
                    <button className="p-2 rounded-full hover:bg-accent/10"><Icon name="ChartBar" className="w-6 h-6" /></button>
                    <button className="p-2 rounded-full hover:bg-accent/10"><Icon name="FaceSmile" className="w-6 h-6" /></button>
                </div>
                <button
                    onClick={handlePost}
                    disabled={!postContent.trim()}
                    className="px-6 py-2 bg-accent text-white font-bold rounded-full disabled:opacity-50 hover:opacity-90 transition-opacity"
                    >
                    Post
                </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreatePostModal;