
import React, { useState } from 'react';
import { Highlight } from '../types';
import HighlightViewerModal from './HighlightViewerModal';
import CreateHighlightModal from './CreateHighlightModal';
import Icon from './Icon';

interface HighlightsProps {
  highlights: Highlight[];
}

const Highlights: React.FC<HighlightsProps> = ({ highlights }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null);

  const openViewer = (highlight: Highlight) => {
    setSelectedHighlight(highlight);
    setIsViewerOpen(true);
  };
  
  return (
    <>
      <div className="px-6 py-4 border-t border-b border-border-color">
        <div className="flex items-center space-x-6">
          {highlights.map(highlight => (
            <button key={highlight.id} onClick={() => openViewer(highlight)} className="text-center group">
              <div className="w-16 h-16 rounded-full bg-secondary p-1 ring-2 ring-border-color group-hover:ring-accent transition-all">
                <img src={highlight.coverImageUrl} alt={highlight.title} className="w-full h-full object-cover rounded-full" />
              </div>
              <p className="text-sm mt-2 font-semibold text-text-primary">{highlight.title}</p>
            </button>
          ))}
           <button onClick={() => setIsCreatorOpen(true)} className="text-center group">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center ring-2 ring-border-color group-hover:ring-accent transition-all">
                <Icon name="Plus" className="w-8 h-8 text-text-secondary" />
              </div>
              <p className="text-sm mt-2 font-semibold text-text-primary">New</p>
            </button>
        </div>
      </div>
      <HighlightViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        highlight={selectedHighlight}
      />
      <CreateHighlightModal
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
      />
    </>
  );
};

export default Highlights;
