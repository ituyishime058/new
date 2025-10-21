
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Story } from '../types';
import Avatar from './Avatar';
import Icon from './Icon';
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
  const timerRef = useRef<number | null>(null);
  
  const currentStory = stories[currentIndex];

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex, isOpen]);

  useEffect(() => {
    if (isOpen && currentStory) {
      setProgress(0);
      
      const interval = 100; // update progress every 100ms
      const increment = (interval / currentStory.duration) * 100;

      timerRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            goToNext();
            return 100;
          }
          return prev + increment;
        });
      }, interval);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [currentIndex, isOpen, currentStory]);

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
  
  const pauseTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resumeTimer = () => {
    if (isOpen && currentStory) {
       const interval = 100;
       const increment = (interval / currentStory.duration) * 100;
       timerRef.current = window.setInterval(() => {
         setProgress(prev => {
           if (prev >= 100) {
             goToNext();
             return 100;
           }
           return prev + increment;
         });
       }, interval);
    }
  };

  if (!isOpen || !currentStory) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onMouseDown={pauseTimer}
          onMouseUp={resumeTimer}
          onTouchStart={pauseTimer}
          onTouchEnd={resumeTimer}
        >
          <div className="relative w-full max-w-sm h-[95vh] bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            <img src={currentStory.imageUrl} alt={currentStory.user.name} className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            <header className="absolute top-0 left-0 right-0 p-4 z-10">
              <div className="flex items-center space-x-2 w-full mb-2">
                {stories.map((_, index) => (
                  <div key={index} className="flex-1 h-1 bg-white/30 rounded-full">
                    <div 
                      className="h-full bg-white rounded-full"
                      style={{ width: `${index === currentIndex ? progress : (index < currentIndex ? 100 : 0)}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Avatar src={currentStory.user.avatarUrl} alt={currentStory.user.name} size="sm"/>
                    <p className="font-bold text-sm text-white">{currentStory.user.name}</p>
                    <p className="text-xs text-gray-300">{formatDistanceToNow(new Date(currentStory.timestamp), { addSuffix: true })}</p>
                </div>
                <button onClick={onClose} className="text-white p-1 bg-black/30 rounded-full"><Icon name="XMark" className="w-5 h-5"/></button>
              </div>
            </header>

            <button onClick={goToPrev} className="absolute left-2 top-1/2 -translate-y-1/2 h-full w-1/3 z-20" />
            <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 h-full w-1/3 z-20" />

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoryViewerModal;
