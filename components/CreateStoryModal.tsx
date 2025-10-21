import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ isOpen, onClose }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePost = () => {
        if (!imageFile) return;
        // In a real app, you would upload the story
        console.log("Posting story:", imageFile.name);
        handleClose();
    };

    const handleClose = () => {
        onClose();
        // Delay resetting state to allow for exit animation
        setTimeout(() => {
            setImageFile(null);
            setPreviewUrl(null);
        }, 300);
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-primary rounded-xl w-full max-w-md shadow-xl flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header className="p-4 border-b border-border-color text-center relative">
                            <h2 className="font-bold text-lg text-text-primary">Create Story</h2>
                            <button onClick={handleClose} className="absolute top-1/2 -translate-y-1/2 right-2 p-2 rounded-full hover:bg-secondary"><Icon name="XMark" className="w-5 h-5"/></button>
                        </header>
                        <div className="p-4 flex-1">
                            {previewUrl ? (
                                <div className="aspect-[9/16] bg-black rounded-lg flex items-center justify-center overflow-hidden relative">
                                    <img src={previewUrl} alt="Preview" className="max-h-full max-w-full"/>
                                    <button onClick={() => { setImageFile(null); setPreviewUrl(null); }} className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white hover:bg-black/70"><Icon name="XMark" className="w-4 h-4"/></button>
                                </div>
                            ) : (
                                <label htmlFor="story-upload" className="aspect-[9/16] bg-secondary rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-border-color cursor-pointer hover:border-accent transition-colors">
                                    <Icon name="Photo" className="w-16 h-16 text-text-secondary"/>
                                    <p className="mt-2 font-semibold text-text-primary">Select photo</p>
                                    <input id="story-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                </label>
                            )}
                        </div>
                        <footer className="p-4 border-t border-border-color">
                             <button
                                onClick={handlePost}
                                disabled={!imageFile}
                                className="w-full bg-accent text-white font-bold py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                            >
                                Post Story
                            </button>
                        </footer>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CreateStoryModal;
