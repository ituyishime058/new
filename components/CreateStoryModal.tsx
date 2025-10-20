
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ isOpen, onClose }) => {
    const [image, setImage] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const discardStory = () => {
        setImage(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={discardStory}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-sm h-[90vh] bg-gray-900 rounded-xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-4 z-10">
                <button onClick={discardStory} className="p-2 bg-black/50 rounded-full text-white">
                    <Icon name="XMark" className="w-6 h-6" />
                </button>
                <button onClick={discardStory} className="px-4 py-2 bg-accent rounded-full text-white font-bold">
                    Share Story
                </button>
            </header>
            <div className="flex-1 flex items-center justify-center">
                {!image ? (
                    <div className="text-center text-white">
                        <label htmlFor="story-upload" className="cursor-pointer">
                            <div className="w-24 h-24 border-2 border-dashed border-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Icon name="Photo" className="w-10 h-10 text-gray-500"/>
                            </div>
                            <h2 className="font-bold text-lg">Create a story</h2>
                            <p className="text-sm text-gray-400">Select a photo to start</p>
                        </label>
                        <input id="story-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </div>
                ) : (
                    <img src={image} alt="Story preview" className="w-full h-full object-cover" />
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    );
};

export default CreateStoryModal;
