
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Add file extension to import.
import { comments } from '../constants.ts';
import Icon from './Icon';
import Comment from './Comment';

interface ReelCommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  commentCount: number;
}

const ReelCommentsModal: React.FC<ReelCommentsModalProps> = ({ isOpen, onClose, commentCount }) => {

  // For demo, we'll just use some sample comments
  const reelComments = comments.slice(0, 5);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 z-50 flex items-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full h-[60vh] bg-primary rounded-t-2xl shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="text-center p-4 border-b border-border-color relative">
                <h2 className="font-bold">{commentCount} Comments</h2>
                <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-secondary"><Icon name="XMark" className="w-5 h-5"/></button>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {reelComments.map(comment => <Comment key={comment.id} comment={comment} />)}
            </div>
            <footer className="p-4 border-t border-border-color">
                <input type="text" placeholder="Add a comment..." className="w-full bg-secondary p-2 rounded-full px-4"/>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReelCommentsModal;
