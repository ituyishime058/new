
import React from 'react';
import { Highlight } from '../types.ts';
import Icon from './Icon.tsx';

interface HighlightsProps {
  highlights: Highlight[];
}

const Highlights: React.FC<HighlightsProps> = ({ highlights }) => {
  return (
    <div className="px-6 py-4 border-t border-border-color">
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
            {/* Create New Highlight */}
            <button className="flex flex-col items-center space-y-2 w-20 flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center border-2 border-dashed border-border-color hover:border-accent transition-colors">
                    <Icon name="Plus" className="w-8 h-8 text-text-secondary"/>
                </div>
                <p className="text-xs font-semibold">New</p>
            </button>
            
            {/* Existing Highlights */}
            {highlights.map((highlight) => (
                <button key={highlight.id} className="flex flex-col items-center space-y-2 w-20 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full p-1 bg-secondary ring-1 ring-border-color">
                        <img src={highlight.coverImageUrl} alt={highlight.title} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <p className="text-sm font-semibold truncate w-full">{highlight.title}</p>
                </button>
            ))}
        </div>
    </div>
  );
};

export default Highlights;
