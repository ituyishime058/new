
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

interface MediaViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrls: string[];
  startIndex?: number;
}

const MediaViewerModal: React.FC<MediaViewerModalProps> = ({ isOpen, onClose, mediaUrls, startIndex = 0 }) => {
    const [currentIndex, setCurrentIndex] = React.useState(startIndex);

    React.useEffect(() => {
        setCurrentIndex(startIndex);
    }, [startIndex]);

    if (!isOpen || mediaUrls.length === 0) return null;

    const goToNext = () => setCurrentIndex((prev) => (prev + 1) % mediaUrls.length);
    const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + mediaUrls.length) % mediaUrls.length);

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
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={mediaUrls[currentIndex]} alt="Media content" className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-primary text-text-primary rounded-full p-2 shadow-lg"
            >
              <Icon name="XMark" className="w-6 h-6" />
            </button>

            {mediaUrls.length > 1 && (
                <>
                <button
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/50 text-white rounded-full p-2"
                >
                    <Icon name="ChevronLeft" className="w-8 h-8" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/50 text-white rounded-full p-2"
                >
                    <Icon name="ChevronRight" className="w-8 h-8" />
                </button>
                </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MediaViewerModal;
