
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
// FIX: Add file extension to import.
import { User } from '../types.ts';
import Avatar from './Avatar';

interface VideoCallModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ isOpen, user, onClose }) => {
  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-primary/30 rounded-2xl w-full max-w-4xl h-[90vh] shadow-2xl flex flex-col relative overflow-hidden"
          >
            {/* Remote Video (Placeholder) */}
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                 <img src={user.avatarUrl} className="w-full h-full object-cover blur-xl opacity-30" alt=""/>
                <div className="text-center text-gray-400 flex flex-col items-center z-10">
                    <div className="relative">
                        <Avatar src={user.avatarUrl} alt={user.name} size="lg"/>
                        <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping"></div>
                    </div>
                    <p className="mt-4 text-3xl font-bold text-white">{user.name}</p>
                    <p className="text-gray-300 animate-pulse">Connecting...</p>
                </div>
            </div>
            
            {/* Local Video (Placeholder) */}
            <motion.div 
                drag 
                dragMomentum={false}
                className="absolute top-4 right-4 w-48 h-32 bg-gray-900 rounded-lg border-2 border-gray-700 overflow-hidden cursor-grab active:cursor-grabbing z-20"
            >
                <div className="flex items-center justify-center h-full text-xs text-gray-400 bg-black">
                    Your Video
                </div>
            </motion.div>

            {/* Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6 bg-black/30 p-4 rounded-full backdrop-blur-md z-20">
                <button className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                    <Icon name="Microphone" variant="solid" className="w-6 h-6" />
                </button>
                 <button className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                    <Icon name="VideoCamera" variant="solid" className="w-6 h-6" />
                </button>
                 <button onClick={onClose} className="p-4 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors transform hover:scale-110">
                    <Icon name="PhoneXMark" variant="solid" className="w-7 h-7" />
                </button>
                 <button className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                    <Icon name="UserPlus" variant="solid" className="w-6 h-6" />
                </button>
                 <button className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
                    <Icon name="EllipsisVertical" variant="solid" className="w-6 h-6" />
                </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoCallModal;