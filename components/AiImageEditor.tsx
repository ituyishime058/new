
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon.tsx';
// FIX: Add file extension to import.
import { editImageWithAi } from '../services/geminiService.ts';

interface AiImageEditorProps {
  isOpen: boolean;
  onClose: () => void;
  imageFile: File;
  onImageEdited: (newBase64Image: string) => void;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}


const AiImageEditor: React.FC<AiImageEditorProps> = ({ isOpen, onClose, imageFile, onImageEdited }) => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');

    useEffect(() => {
        if (imageFile) {
            const objectUrl = URL.createObjectURL(imageFile);
            setCurrentImageUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [imageFile]);
    
    const handleGenerate = async () => {
        if (!prompt.trim() || !imageFile) return;

        setIsGenerating(true);
        setError(null);

        try {
            const base64Data = await blobToBase64(imageFile);
            const editedImageString = await editImageWithAi(base64Data, imageFile.type, prompt);
            // The service returns a full data URL, so we can use it directly
            onImageEdited(editedImageString);
            onClose();
        } catch (e: any) {
            setError(e.message || "Failed to edit image.");
        } finally {
            setIsGenerating(false);
        }
    };
    
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
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="bg-primary rounded-xl w-full max-w-lg shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="p-4 border-b border-border-color">
                <h2 className="font-bold text-lg text-text-primary">Edit with AI</h2>
            </header>
            <div className="p-4">
                <div className="aspect-square bg-secondary rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {currentImageUrl && <img src={currentImageUrl} alt="Image to edit" className="max-w-full max-h-full object-contain" />}
                </div>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., 'add sunglasses to the person'"
                        className="w-full bg-secondary border border-border-color rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
                        disabled={isGenerating}
                    />
                    <button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="bg-gradient-to-r from-accent-start to-accent-end text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
                        {isGenerating ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> : <Icon name="Sparkles" className="w-5 h-5"/>}
                        <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
                    </button>
                </div>
            </div>
            <footer className="p-4 border-t border-border-color text-right">
                <button onClick={onClose} className="px-4 py-2 rounded-md hover:bg-secondary font-semibold">Cancel</button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AiImageEditor;