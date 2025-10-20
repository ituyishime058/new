
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Story } from '../types';
import Icon from './Icon';
import Avatar from './Avatar';
import { formatDistanceToNow } from 'date-fns';

interface StoryViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  startIndex?: number;
}

const StoryViewerModal: React.FC<StoryViewerModalProps> = ({ isOpen, onClose, stories, startIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  useEffect(() => {
    if (isOpen) {
      const storyDuration = stories[currentIndex].duration;
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            goToNext();
            return 100;
          }
          return p + (100 / (storyDuration / 100));
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isOpen, stories]);

  if (!isOpen || stories.length === 0) return null;

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentStory = stories[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-sm h-[90vh] bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Story Content */}
            <img src={currentStory.imageUrl} alt="Story" className="w-full h-full object-cover" />

            {/* Overlay and Header */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 p-4">
              <div className="w-full h-1 bg-gray-500/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
              <div className="flex items-center space-x-3 mt-3 text-white">
                <Avatar src={currentStory.user.avatarUrl} alt={currentStory.user.name} size="sm" />
                <span className="font-bold text-sm">{currentStory.user.name}</span>
                <span className="text-xs text-gray-300">{formatDistanceToNow(new Date(currentStory.timestamp), { addSuffix: true })}</span>
                <button onClick={onClose} className="ml-auto">
                  <Icon name="XMark" className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <button onClick={goToPrev} className="absolute left-0 top-0 bottom-0 w-1/3" />
            <button onClick={goToNext} className="absolute right-0 top-0 bottom-0 w-1/3" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoryViewerModal;
