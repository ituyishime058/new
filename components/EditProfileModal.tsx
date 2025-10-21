
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types';
import Icon from './Icon';
import Avatar from './Avatar';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (updatedUser: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [handle, setHandle] = useState(user.handle);
  const [bio, setBio] = useState(user.bio || '');

  const handleSave = () => {
    onSave({ ...user, name, handle, bio });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-primary rounded-xl w-full max-w-lg shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-4 border-b border-border-color">
              <h2 className="font-bold text-lg text-text-primary">Edit Profile</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary">
                <Icon name="XMark" className="w-5 h-5" />
              </button>
            </header>
            <div className="p-6 space-y-4">
                <div className="flex justify-center">
                    <div className="relative">
                        <Avatar src={user.avatarUrl} alt={user.name} size="lg" />
                        <button className="absolute bottom-0 right-0 p-2 bg-secondary rounded-full border-2 border-primary hover:bg-border-color">
                            <Icon name="Pencil" className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Handle</label>
                    <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} className="w-full bg-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Bio</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full bg-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent resize-none" />
                </div>
            </div>
            <footer className="p-4 bg-secondary/50 border-t border-border-color text-right">
                <button onClick={handleSave} className="bg-accent text-white font-bold px-6 py-2 rounded-full hover:opacity-90">
                    Save
                </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
