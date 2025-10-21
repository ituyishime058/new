import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import { stories } from '../constants'; // Use existing stories to select from

interface CreateHighlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  // In a real app, this would take a function to create the highlight:
  // onCreate: (title: string, storyIds: string[]) => void;
}

const CreateHighlightModal: React.FC<CreateHighlightModalProps> = ({ isOpen, onClose }) => {
  const [selectedStoryIds, setSelectedStoryIds] = useState<string[]>([]);
  const [title, setTitle] = useState('');

  const toggleStorySelection = (storyId: string) => {
    setSelectedStoryIds(prev =>
      prev.includes(storyId)
        ? prev.filter(id => id !== storyId)
        : [...prev, storyId]
    );
  };

  const handleCreate = () => {
    if (title.trim() && selectedStoryIds.length > 0) {
      console.log(`Creating highlight "${title}" with stories:`, selectedStoryIds);
      handleClose();
    }
  };

  const handleClose = () => {
      onClose();
      // Delay reset to allow for exit animation
      setTimeout(() => {
          setTitle('');
          setSelectedStoryIds([]);
      }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-primary rounded-xl w-full max-w-lg shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center p-4 border-b border-border-color">
              <h2 className="font-bold text-lg text-text-primary">Create Highlight</h2>
              <button onClick={handleClose} className="ml-auto p-2 rounded-full hover:bg-secondary">
                <Icon name="XMark" className="w-5 h-5" />
              </button>
            </header>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., 'Travel 2024'"
                  className="w-full bg-secondary rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Select Stories</label>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-60 overflow-y-auto pr-2">
                  {stories.map(story => {
                    const isSelected = selectedStoryIds.includes(story.id);
                    return (
                      <button key={story.id} onClick={() => toggleStorySelection(story.id)} className="relative aspect-square rounded-md overflow-hidden group">
                        <img src={story.imageUrl} alt="Story" className="w-full h-full object-cover" />
                        <div className={`absolute inset-0 transition-all ${isSelected ? 'bg-black/50' : 'bg-black/20 group-hover:bg-black/40'}`}></div>
                        <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 transition-all ${isSelected ? 'bg-accent border-accent' : 'bg-white/50 border-white'}`}>
                          {isSelected && <Icon name="Check" className="w-4 h-4 p-0.5 text-white" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
            <footer className="p-4 bg-secondary/50 border-t border-border-color text-right">
              <button 
                onClick={handleCreate} 
                disabled={!title.trim() || selectedStoryIds.length === 0}
                className="bg-accent text-white font-bold px-6 py-2 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
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
