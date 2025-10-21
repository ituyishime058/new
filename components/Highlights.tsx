import React from 'react';
import { Highlight } from '../types.ts';
import Icon from './Icon.tsx';

interface HighlightsProps {
  highlights: Highlight[];
}

const Highlights: React.FC<HighlightsProps> = ({ highlights }) => {
  return (
    <div className="px-6 py-4 border-t border-border-color">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide -my-2 py-2">
            {/* Create New Highlight */}
            <button className="flex-shrink-0 w-24 h-40 rounded-xl bg-secondary flex flex-col items-center justify-center text-text-secondary hover:bg-border-color transition-colors">
                 <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center border-2 border-dashed border-border-color">
                    <Icon name="Plus" className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold mt-2">New</p>
            </button>
            
            {/* Existing Highlights */}
            {highlights.map((highlight) => (
                 <button key={highlight.id} className="flex-shrink-0 w-24 h-40 rounded-xl relative overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105">
                    <img src={highlight.coverImageUrl} alt={highlight.title} className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-bold truncate">{highlight.title}</p>
                </button>
            ))}
        </div>
    </div>
  );
};

export default Highlights;