
import React, { useState } from 'react';
import { stories, currentUser } from '../constants';
import Icon from './Icon';
import StoryViewerModal from './StoryViewerModal';

const Stories: React.FC = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const openViewer = (index: number) => {
    setCurrentStoryIndex(index);
    setIsViewerOpen(true);
  };

  return (
    <>
      <div className="bg-primary p-4 rounded-xl shadow-md mb-8">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {/* Add Story Button */}
          <div className="flex-shrink-0 w-20 text-center">
             <div className="relative w-16 h-16 mx-auto">
                <img className="w-full h-full rounded-full object-cover" src={currentUser.avatarUrl} alt={currentUser.name} />
                <button className="absolute bottom-0 right-0 bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-primary">
                    <Icon name="Plus" className="w-4 h-4" />
                </button>
             </div>
             <p className="text-xs mt-2 text-text-secondary">Your Story</p>
          </div>
          {/* Friend Stories */}
          {stories.map((story, index) => (
            <button key={story.id} onClick={() => openViewer(index)} className="flex-shrink-0 w-20 text-center">
              <div className="w-16 h-16 p-0.5 rounded-full bg-gradient-to-r from-accent-start to-accent-end mx-auto">
                 <img className="w-full h-full rounded-full object-cover border-2 border-primary" src={story.user.avatarUrl} alt={story.user.name} />
              </div>
              <p className="text-xs mt-2 truncate text-text-secondary">{story.user.name}</p>
            </button>
          ))}
        </div>
      </div>
      <StoryViewerModal 
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        stories={stories}
        startIndex={currentStoryIndex}
      />
    </>
  );
};

export default Stories;
