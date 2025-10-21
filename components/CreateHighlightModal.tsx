
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon.tsx';
// FIX: Add file extension to import.
import { stories } from '../constants.ts'; // Mock data for story selection
import { Story } from '../types.ts';

interface CreateHighlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateHighlightModal: React.FC<CreateHighlightModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [selectedStories, setSelectedStories] = useState<string[]>([]);

  const toggleStorySelection = (storyId: string) => {
    setSelectedStories(prev => 
      prev.includes(storyId) ? prev.filter(id => id !== storyId) : [...prev, storyId]
    );
  };
  
  const handleCreate = () => {
      if (!title.trim() || selectedStories.length === 0) return;
      console.log(`Creating highlight "${title}" with stories:`, selectedStories);
      onClose();
      setTitle('');
      setSelectedStories([]);
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
            className="bg-primary rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="text-center p-4 border-b border-border-color relative">
                <h2 className="font-bold text-lg text-text-primary">New Highlight</h2>
                <button onClick={onClose} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-secondary"><Icon name="XMark" className="w-5 h-5"/></button>
            </header>
            <div className="p-6 flex-1 overflow-y-auto">
                <input 
                    type="text" 
                    placeholder="Highlight title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-secondary p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <h3 className="font-semibold text-text-secondary text-sm mb-2">Select Stories</h3>
                <div className="grid grid-cols-3 gap-2">
                    {stories.map((story: Story) => (
                        <button key={story.id} onClick={() => toggleStorySelection(story.id)} className="relative aspect-square rounded-md overflow-hidden">
                            <img src={story.imageUrl} alt="story" className="w-full h-full object-cover"/>
                            {selectedStories.includes(story.id) && (
                                <div className="absolute inset-0 bg-accent/70 flex items-center justify-center">
                                    <Icon name="Check" className="w-8 h-8 text-white" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
            <footer className="p-4 border-t border-border-color text-right">
                <button onClick={handleCreate} disabled={!title.trim() || selectedStories.length === 0} className="bg-accent text-white font-bold px-6 py-2 rounded-full hover:opacity-90 disabled:opacity-50">
                    Create
                </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateHighlightModal;