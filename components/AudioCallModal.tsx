
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon.tsx';
// FIX: Add file extension to import.
import { User } from '../types.ts';
import Avatar from './Avatar.tsx';

interface AudioCallModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
}

const AudioCallModal: React.FC<AudioCallModalProps> = ({ isOpen, user, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // In a real app, you'd play a ringing sound.
      // const ringtone = new Audio('/path/to/ringtone.mp3');
      // ringtone.loop = true;
      // ringtone.play();
      // return () => ringtone.pause();
    }
  }, [isOpen]);

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-primary/50 rounded-2xl w-full max-w-sm h-auto p-8 shadow-2xl flex flex-col items-center relative overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
                <img src={user.avatarUrl} className="w-full h-full object-cover blur-2xl opacity-30" alt=""/>
            </div>
            <div className="relative z-10 flex flex-col items-center">
                <p className="text-gray-300 mb-4 font-semibold tracking-widest">AUDIO CALL</p>
                <div className="relative">
                    <Avatar src={user.avatarUrl} alt={user.name} size="lg"/>
                    <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping"></div>
                </div>
                <p className="mt-6 text-3xl font-bold text-white">{user.name}</p>
                <p className="text-gray-300 mt-1 animate-pulse">Ringing...</p>
                
                <div className="flex items-center space-x-6 mt-12">
                    <button className="p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                        <Icon name="Microphone" variant="solid" className="w-7 h-7" />
                    </button>
                    <button onClick={onClose} className="p-5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors transform hover:scale-110">
                        <Icon name="PhoneXMark" variant="solid" className="w-8 h-8" />
                    </button>
                    <button className="p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                        <Icon name="SpeakerWave" variant="solid" className="w-7 h-7" />
                    </button>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudioCallModal;