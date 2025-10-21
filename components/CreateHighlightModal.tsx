
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import { stories } from '../constants'; // Use existing stories to select from

interface CreateHighlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateHighlightModal: React.FC<CreateHighlightModalProps> = ({ isOpen, onClose }) => {
  const [selectedStoryIds, setSelectedStoryIds] = useState<Set<string>>(new Set());
  const [title, setTitle] = useState('');
  
  const toggleStorySelection = (storyId: string) => {
      const newSet = new Set(selectedStoryIds);
      if (newSet.has(storyId)) {
          newSet.delete(storyId);
      } else {
          newSet.add(storyId);
      }
      setSelectedStoryIds(newSet);
  }
  
  const handleCreate = () => {
    // In a real app, create the highlight
    console.log("Creating highlight:", { title, stories: Array.from(selectedStoryIds) });
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            className="bg-primary rounded-xl w-full max-w-lg h-[80vh] shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-4 border-b border-border-color">
              <h2 className="font-bold text-lg text-text-primary">Create Highlight</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary"><Icon name="XMark" className="w-5 h-5" /></button>
            </header>
            <div className="p-4 flex-1 overflow-y-auto">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Highlight Title" className="w-full bg-secondary p-2 rounded-md mb-4"/>
                <div className="grid grid-cols-3 gap-2">
                    {stories.map(story => (
                        <button key={story.id} onClick={() => toggleStorySelection(story.id)} className="relative aspect-square">
                            <img src={story.imageUrl} alt="story" className="w-full h-full object-cover rounded-md"/>
                            {selectedStoryIds.has(story.id) && (
                                <div className="absolute inset-0 bg-accent/70 flex items-center justify-center">
                                    <Icon name="Check" className="w-8 h-8 text-white"/>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
             <footer className="p-4 border-t border-border-color">
              <button onClick={handleCreate} disabled={!title || selectedStoryIds.size === 0} className="w-full bg-accent text-white font-bold py-2 rounded-lg disabled:opacity-50">
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
