
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
// FIX: Add file extension to import.
import { highlights } from '../constants.ts';

interface AddToHighlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyId: string; // The story to add
}

const AddToHighlightModal: React.FC<AddToHighlightModalProps> = ({ isOpen, onClose, storyId }) => {
  
  const handleAddToHighlight = (highlightId: string) => {
    // In a real app, you would make an API call to add the story to the highlight
    console.log(`Adding story ${storyId} to highlight ${highlightId}`);
    onClose();
  }
  
  const handleCreateNew = () => {
    // In a real app, this would open another modal or navigate to a new page
    const newTitle = prompt("Enter title for new highlight:");
    if (newTitle) {
        console.log(`Creating new highlight "${newTitle}" with story ${storyId}`);
        onClose();
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="bg-primary rounded-t-2xl w-full max-w-md shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="text-center p-4 border-b border-border-color relative">
                <h2 className="font-bold text-text-primary">Add to Highlight</h2>
                <button onClick={onClose} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-secondary"><Icon name="XMark" className="w-5 h-5"/></button>
            </header>
            <div className="p-6 overflow-y-auto max-h-60">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <button onClick={handleCreateNew} className="space-y-2 group">
                        <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center ring-2 ring-border-color group-hover:ring-accent transition-all">
                            <Icon name="Plus" className="w-8 h-8 text-text-secondary"/>
                        </div>
                        <p className="text-sm font-semibold text-text-primary">New</p>
                    </button>
                    {highlights.map(highlight => (
                        <button key={highlight.id} onClick={() => handleAddToHighlight(highlight.id)} className="space-y-2 group">
                             <div className="w-16 h-16 mx-auto rounded-full bg-secondary p-1 ring-2 ring-border-color group-hover:ring-accent transition-all">
                                <img src={highlight.coverImageUrl} alt={highlight.title} className="w-full h-full object-cover rounded-full" />
                            </div>
                            <p className="text-sm font-semibold truncate text-text-primary">{highlight.title}</p>
                        </button>
                    ))}
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToHighlightModal;
