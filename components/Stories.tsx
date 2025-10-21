
import React, { useState } from 'react';
import { stories, currentUser } from '../constants.ts';
import Icon from './Icon.tsx';
import StoryViewer from './StoryViewer.tsx';
import CreateStoryModal from './CreateStoryModal.tsx';

const Stories: React.FC = () => {
    const [viewingStory, setViewingStory] = useState<typeof stories[0] | null>(null);
    const [isCreateOpen, setCreateOpen] = useState(false);

    return (
        <>
            <div className="p-4 border-b border-border-color">
                <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                     <div className="flex-shrink-0 w-20 text-center">
                        <button onClick={() => setCreateOpen(true)} className="relative w-16 h-16 rounded-full p-1 bg-secondary flex items-center justify-center group">
                           <img src={currentUser.avatarUrl} alt="Create story" className="w-full h-full object-cover rounded-full opacity-50"/>
                           <div className="absolute inset-0 flex items-center justify-center">
                                <div className="p-2 bg-accent text-white rounded-full group-hover:scale-110 transition-transform">
                                    <Icon name="Plus" className="w-5 h-5"/>
                                </div>
                           </div>
                        </button>
                        <p className="text-xs mt-2 font-semibold">Your Story</p>
                    </div>
                    {stories.map(story => (
                        <div key={story.id} className="flex-shrink-0 w-20 text-center">
                            <button onClick={() => setViewingStory(story)} className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-r from-accent-start to-accent-end">
                                <img src={story.user.avatarUrl} alt={story.user.name} className="w-full h-full object-cover rounded-full border-2 border-primary" />
                            </button>
                            <p className="text-xs mt-2 truncate">{story.user.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            {viewingStory && <StoryViewer stories={stories} startIndex={stories.findIndex(s => s.id === viewingStory.id)} onClose={() => setViewingStory(null)} />}
            <CreateStoryModal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} />
        </>
    );
};

export default Stories;
