import React, { useState, useEffect, useRef } from 'react';
// FIX: Corrected import path for types
import { Story } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import Avatar from './Avatar';
import { formatDistanceToNow } from 'date-fns';

interface StoryViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  startIndex: number;
}

const StoryViewerModal: React.FC<StoryViewerModalProps> = ({ isOpen, onClose, stories, startIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(startIndex);
        }
    }, [startIndex, isOpen]);

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
    
    useEffect(() => {
        if (isOpen && !isPaused) {
            setProgress(0);
            if (timerRef.current) clearInterval(timerRef.current);
            // Update progress every 50ms for smooth animation
            const interval = 50;
            const steps = stories[currentIndex].duration / interval;
            const increment = 100 / steps;

            timerRef.current = window.setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        goToNext();
                        return 100;
                    }
                    return p + increment;
                });
            }, interval);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [currentIndex, isOpen, stories, isPaused]);

    useEffect(() => {
        setProgress(0); // Reset progress when story changes
    }, [currentIndex])


    if (!isOpen || !stories || stories.length === 0) return null;

    const currentStory = stories[currentIndex];

    return (
        <AnimatePresence>
            {isOpen && (
                 <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
                 >
                     <div className="absolute top-4 left-4 right-4 flex space-x-1 z-20">
                         {stories.map((_, index) => (
                             <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                                <div className="h-full bg-white transition-all duration-50 ease-linear" style={{ width: `${index < currentIndex ? 100 : (index === currentIndex ? progress : 0)}%` }}></div>
                             </div>
                         ))}
                     </div>

                    <header className="absolute top-8 left-4 right-4 flex items-center justify-between z-20">
                         <div className="flex items-center space-x-2">
                             <Avatar src={currentStory.user.avatarUrl} alt={currentStory.user.name} size="sm" />
                             <p className="font-bold text-white text-sm">{currentStory.user.name}</p>
                             <p className="text-xs text-gray-300">{formatDistanceToNow(new Date(currentStory.timestamp), { addSuffix: true })}</p>
                         </div>
                         <button onClick={onClose} className="text-white p-2"><Icon name="XMark" className="w-6 h-6" /></button>
                     </header>
                    
                    <div 
                        className="relative w-full max-w-sm h-[85vh] flex items-center justify-center"
                        onMouseDown={() => setIsPaused(true)}
                        onMouseUp={() => setIsPaused(false)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    >
                        <img src={currentStory.imageUrl} alt="Story" className="max-h-full max-w-full object-contain rounded-lg" />
                        <button onClick={goToPrev} className="absolute left-0 top-0 bottom-0 w-1/3 z-10"></button>
                        <button onClick={goToNext} className="absolute right-0 top-0 bottom-0 w-1/3 z-10"></button>
                    </div>

                 </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StoryViewerModal;
