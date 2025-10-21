
import React from 'react';
import { Highlight } from '../types';
import StoryViewerModal from './StoryViewerModal'; // Re-use the story viewer logic

interface HighlightViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlight: Highlight | null;
}

const HighlightViewerModal: React.FC<HighlightViewerModalProps> = ({ isOpen, onClose, highlight }) => {
  if (!isOpen || !highlight) return null;

  return (
    <StoryViewerModal
      isOpen={isOpen}
      onClose={onClose}
      stories={highlight.stories}
      startIndex={0}
    />
  );
};

export default HighlightViewerModal;
