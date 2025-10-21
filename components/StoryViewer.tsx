
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Story } from '../types.ts';
import Icon from './Icon.tsx';
import Avatar from './Avatar.tsx';
import { formatDistanceToNow } from 'date-fns';

interface StoryViewerProps {
  stories: Story[];
  startIndex: number;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);

  const activeStory = stories[currentIndex];

  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(i => i + 1);
          } else {
            onClose();
          }
          return 0;
        }
        return prev + 100 / activeStory.duration;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, stories, activeStory, onClose]);

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          key={activeStory.id}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-sm h-[90vh] bg-secondary rounded-lg overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Story Image */}
          <img src={activeStory.imageUrl} alt={`Story by ${activeStory.user.name}`} className="w-full h-full object-cover" />

          {/* Gradient & Header */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
            {/* Progress Bars */}
            <div className="flex space-x-1 mb-2">
              {stories.map((_, index) => (
                <div key={index} className="flex-1 h-1 bg-white/30 rounded-full">
                  <div 
                    className="h-full bg-white rounded-full" 
                    style={{ width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%' }}
                  />
                </div>
              ))}
            </div>
            {/* User Info */}
            <div className="flex items-center space-x-3 text-white">
              <Avatar src={activeStory.user.avatarUrl} alt={activeStory.user.name} size="sm" />
              <div>
                <p className="font-bold text-sm">{activeStory.user.name}</p>
                <p className="text-xs text-gray-300">{formatDistanceToNow(new Date(activeStory.timestamp), { addSuffix: true })}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <button onClick={goToPrev} className="absolute left-0 top-0 bottom-0 w-1/3" />
          <button onClick={goToNext} className="absolute right-0 top-0 bottom-0 w-2/3" />
          
           {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/30">
            <Icon name="XMark" className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StoryViewer;
