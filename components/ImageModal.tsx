
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={imageUrl} alt="Full screen view" className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg" />
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 bg-primary text-text-primary rounded-full p-2 shadow-lg"
            >
              <Icon name="XMark" className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
