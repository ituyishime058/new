import React from 'react';
import { Highlight } from '../types';

interface HighlightsProps {
    highlights: Highlight[];
}

const Highlights: React.FC<HighlightsProps> = ({ highlights }) => {
    return (
        <div className="p-4 border-t border-border-color">
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
                {highlights.map(highlight => (
                    <button key={highlight.id} className="text-center group flex-shrink-0">
                        <div className="w-24 h-32 rounded-xl overflow-hidden border-2 border-border-color group-hover:border-accent transition-colors">
                            <img src={highlight.coverUrl} alt={highlight.title} className="w-full h-full object-cover"/>
                        </div>
                        <p className="text-sm mt-2 font-semibold">{highlight.title}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Highlights;
