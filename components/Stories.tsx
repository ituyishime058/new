
import React, { useState } from 'react';
import { stories, currentUser } from '../constants.ts';
import { Story } from '../types.ts';
import Icon from './Icon.tsx';
import StoryViewer from './StoryViewer.tsx';
import Avatar from './Avatar.tsx';

interface StoryCardProps {
  story?: Story;
  isCreateCard?: boolean;
  onClick: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, isCreateCard = false, onClick }) => {
    if (isCreateCard) {
        return (
            <button onClick={onClick} className="flex-shrink-0 w-24 h-40 rounded-xl bg-secondary flex flex-col items-center justify-center text-text-secondary hover:bg-border-color transition-colors">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center border-2 border-dashed border-border-color">
                    <Icon name="Plus" className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold mt-2">Create Story</p>
            </button>
        );
    }
    
    if (!story) return null;

    const user = story.user;
    
    return (
        <button onClick={onClick} className="flex-shrink-0 w-24 h-40 rounded-xl relative overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105">
            <div className={`absolute inset-0 rounded-xl ring-2 ring-offset-2 ring-offset-primary transition-all ${!story.isSeen ? 'ring-accent' : 'ring-border-color'}`}></div>
            <img src={story.imageUrl} alt={`Story by ${user.name}`} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-2 left-2 right-2 text-white">
                <p className="text-xs font-bold truncate">{user.name}</p>
            </div>
        </button>
    );
};

const Stories: React.FC = () => {
    const [isViewerOpen, setViewerOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [storyData, setStoryData] = useState(stories);

    const currentUserStory = storyData.find(s => s.user.id === currentUser.id);
    const otherStories = storyData.filter(s => s.user.id !== currentUser.id);

    const handleStoryClick = (index: number) => {
        setStartIndex(index);
        setViewerOpen(true);
        // Mark story as seen
        setStoryData(prev => {
            const newStories = [...prev];
            const clickedStoryIndex = newStories.findIndex(s => s.id === otherStories[index].id);
            if (clickedStoryIndex !== -1) {
                newStories[clickedStoryIndex].isSeen = true;
            }
            return newStories;
        });
    };

    return (
        <>
            <div className="p-4 border-b border-border-color">
                <div className="flex space-x-3 overflow-x-auto scrollbar-hide -my-2 py-2">
                    <StoryCard isCreateCard={true} onClick={() => console.log('Create story')} />
                    {currentUserStory && (
                        <StoryCard story={currentUserStory} onClick={() => console.log('View own story')} />
                    )}
                    {otherStories.map((story, index) => (
                        <StoryCard key={story.id} story={story} onClick={() => handleStoryClick(index)} />
                    ))}
                </div>
            </div>
            {isViewerOpen && (
                <StoryViewer 
                    stories={otherStories} 
                    startIndex={startIndex} 
                    onClose={() => setViewerOpen(false)} 
                />
            )}
        </>
    );
};

export default Stories;