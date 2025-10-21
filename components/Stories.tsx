
import React, { useState } from 'react';
import { stories, currentUser } from '../constants.ts';
import { Story } from '../types.ts';
import Icon from './Icon.tsx';
import StoryViewer from './StoryViewer.tsx';

interface StoryCircleProps {
  story?: Story;
  isCurrentUser?: boolean;
  onClick: () => void;
}

const StoryCircle: React.FC<StoryCircleProps> = ({ story, isCurrentUser = false, onClick }) => {
  const user = story?.user || currentUser;
  const imageUrl = story?.imageUrl || currentUser.avatarUrl;

  return (
    <button onClick={onClick} className="flex flex-col items-center space-y-1 w-20 flex-shrink-0">
      <div className={`relative w-16 h-16 rounded-full p-0.5 flex items-center justify-center
        ${isCurrentUser ? '' : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500'}
      `}>
        <div className="bg-primary p-0.5 rounded-full">
            <img src={imageUrl} alt={user.name} className="w-full h-full object-cover rounded-full" />
        </div>
        {isCurrentUser && !story && (
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center border-2 border-primary">
            <Icon name="Plus" className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      <p className="text-xs text-text-secondary truncate w-full">{user.name}</p>
    </button>
  );
};

const Stories: React.FC = () => {
    const [isViewerOpen, setViewerOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    const currentUserStory = stories.find(s => s.user.id === currentUser.id);
    const otherStories = stories.filter(s => s.user.id !== currentUser.id);

    const handleStoryClick = (index: number) => {
        setStartIndex(index);
        setViewerOpen(true);
    };

    return (
        <>
        <div className="p-4 border-b border-border-color">
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                <StoryCircle story={currentUserStory} isCurrentUser={true} onClick={() => console.log('Create story')} />
                {otherStories.map((story, index) => (
                    <StoryCircle key={story.id} story={story} onClick={() => handleStoryClick(index)} />
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
