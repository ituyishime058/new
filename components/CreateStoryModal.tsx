
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
// FIX: Add file extension to import.
import { currentUser } from '../constants.ts';
import Avatar from './Avatar';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handlePostStory = () => {
      if (!selectedFile) return;
      console.log('Posting story:', selectedFile.name);
      onClose();
      // Reset state for next time
      setSelectedFile(null);
      setPreviewUrl(null);
  }

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
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            className="bg-primary rounded-xl w-full max-w-md shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="text-center p-4 border-b border-border-color relative">
                <h2 className="font-bold text-lg text-text-primary">Create Story</h2>
                <button onClick={onClose} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-secondary"><Icon name="XMark" className="w-5 h-5"/></button>
            </header>
            <div className="p-6 flex-1">
                {previewUrl ? (
                    <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-secondary">
                        <img src={previewUrl} alt="Story preview" className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="aspect-[9/16] rounded-lg border-2 border-dashed border-border-color flex flex-col items-center justify-center text-text-secondary">
                        <Icon name="Photo" className="w-12 h-12 mb-2" />
                        <p>Select a photo or video</p>
                        <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                )}
            </div>
             <footer className="p-4 border-t border-border-color flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Avatar src={currentUser.avatarUrl} alt={currentUser.name} size="sm" />
                    <p className="font-semibold">{currentUser.name}</p>
                </div>
                <button onClick={handlePostStory} disabled={!selectedFile} className="bg-accent text-white font-bold px-6 py-2 rounded-full hover:opacity-90 disabled:opacity-50">
                    Share Story
                </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateStoryModal;