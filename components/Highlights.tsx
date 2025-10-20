
import React from 'react';
import { Highlight } from '../types';

interface HighlightsProps {
    highlights: Highlight[];
}

const Highlights: React.FC<HighlightsProps> = ({ highlights }) => {
    return (
        <div className="p-4 border-t border-border-color">
            <h2 className="font-bold mb-2">Highlights</h2>
            <div className="flex space-x-4">
                {highlights.map(highlight => (
                    <div key={highlight.id} className="text-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border-color">
                            <img src={highlight.coverUrl} alt={highlight.title} className="w-full h-full object-cover"/>
                        </div>
                        <p className="text-xs mt-1">{highlight.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Highlights;
