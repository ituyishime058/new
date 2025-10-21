
import React, { useState } from 'react';
import { Highlight } from '../types.ts';
import Icon from './Icon.tsx';
import CreateHighlightModal from './CreateHighlightModal.tsx';
// import HighlightViewerModal from './HighlightViewerModal.tsx'; // Assuming this component exists

interface HighlightsProps {
  highlights: Highlight[];
}

const Highlights: React.FC<HighlightsProps> = ({ highlights }) => {
    const [isCreateOpen, setCreateOpen] = useState(false);
    // const [viewingHighlight, setViewingHighlight] = useState<Highlight | null>(null);

    return (
        <>
        <div className="px-4 py-2">
            <div className="flex space-x-4 items-center overflow-x-auto scrollbar-hide">
                <div className="flex-shrink-0 w-20 text-center">
                    <button onClick={() => setCreateOpen(true)} className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center ring-2 ring-border-color hover:ring-accent transition-all">
                        <Icon name="Plus" className="w-8 h-8 text-text-secondary"/>
                    </button>
                    <p className="text-xs mt-2 font-semibold">New</p>
                </div>
                {highlights.map(highlight => (
                    <div key={highlight.id} className="flex-shrink-0 w-20 text-center">
                        <button /*onClick={() => setViewingHighlight(highlight)}*/ className="w-16 h-16 rounded-full p-0.5 bg-secondary ring-2 ring-border-color">
                           <img src={highlight.coverImageUrl} alt={highlight.title} className="w-full h-full object-cover rounded-full" />
                        </button>
                        <p className="text-xs mt-2 font-semibold truncate">{highlight.title}</p>
                    </div>
                ))}
            </div>
        </div>
        <CreateHighlightModal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} />
        {/* {viewingHighlight && <HighlightViewerModal highlight={viewingHighlight} onClose={() => setViewingHighlight(null)} />} */}
        </>
    );
};

export default Highlights;
