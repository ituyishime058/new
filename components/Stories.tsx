
import React, { useState } from 'react';
// FIX: Corrected import path for constants
import { stories, currentUser } from '../constants';
import Icon from './Icon';
// FIX: Corrected import path for StoryViewerModal
import StoryViewerModal from './StoryViewerModal';
import CreateStoryModal from './CreateStoryModal';
import Avatar from './Avatar';

const Stories: React.FC = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const openViewer = (index: number) => {
    setCurrentStoryIndex(index);
    setIsViewerOpen(true);
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
          {/* Add Story Button */}
          <button 
            onClick={() => setIsCreatorOpen(true)} 
            className="flex-shrink-0 w-28 h-44 rounded-xl relative overflow-hidden bg-secondary focus:outline-none focus:ring-2 focus:ring-accent-end ring-offset-2 ring-offset-background transition-transform duration-200 ease-in-out hover:-translate-y-1"
          >
             <img className="w-full h-full object-cover" src={currentUser.avatarUrl} alt={currentUser.name} />
             <div className="absolute inset-0 bg-black/30"></div>
             <div className="absolute bottom-2 left-2 right-2 text-center text-white">
                <div className="relative w-10 h-10 mx-auto mb-1">
                    <div className="absolute inset-0 bg-primary rounded-full"></div>
                    <div className="absolute inset-1 bg-accent text-white rounded-full flex items-center justify-center border-2 border-primary">
                        <Icon name="Plus" className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-xs font-semibold">Create Story</p>
             </div>
          </button>
          
          {/* Friend Stories */}
          {stories.map((story, index) => (
            <button 
              key={story.id} 
              onClick={() => openViewer(index)} 
              className="flex-shrink-0 w-28 h-44 rounded-xl relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-accent-end ring-offset-2 ring-offset-background transition-transform duration-200 ease-in-out hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-start to-accent-end p-0.5 rounded-xl">
                 <img className="w-full h-full rounded-lg object-cover" src={story.imageUrl} alt={story.user.name} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300"></div>
              <div className="absolute bottom-2 left-2 right-2 flex items-center space-x-2 text-white">
                <Avatar src={story.user.avatarUrl} alt={story.user.name} size="sm" />
                <p className="text-xs font-bold truncate">{story.user.name}</p>
              </div>
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
      <CreateStoryModal 
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
      />
    </>
  );
};

export default Stories;
