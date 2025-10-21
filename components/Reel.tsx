
import React from 'react';
import { Reel as ReelType } from '../types';
import Icon from './Icon';
import Avatar from './Avatar';
import VideoPlayer from './VideoPlayer';

interface ReelProps {
  reel: ReelType;
}

const Reel: React.FC<ReelProps> = ({ reel }) => {
  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden bg-black">
      <VideoPlayer src={reel.videoUrl} />

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-center space-x-2">
          <Avatar src={reel.user.avatarUrl} alt={reel.user.name} size="md" />
          <p className="font-bold">{reel.user.name}</p>
          <button className="border border-white px-3 py-1 text-xs rounded-md">Follow</button>
        </div>
        <p className="mt-2 text-sm">{reel.caption}</p>
        <div className="flex items-center space-x-2 mt-2 text-xs">
          <Icon name="MusicalNote" className="w-4 h-4" />
          <p>{reel.audio.title} - {reel.audio.artist}</p>
        </div>
      </div>

      <div className="absolute bottom-4 right-2 flex flex-col items-center space-y-4 text-white">
        <button className="flex flex-col items-center">
          <Icon name="Heart" variant="solid" className="w-8 h-8" />
          <span className="text-xs mt-1">{reel.likes.toLocaleString()}</span>
        </button>
        <button className="flex flex-col items-center">
          <Icon name="ChatBubbleOvalLeftEllipsis" variant="solid" className="w-8 h-8" />
          <span className="text-xs mt-1">{reel.comments.toLocaleString()}</span>
        </button>
        <button className="flex flex-col items-center">
          <Icon name="ArrowUpOnSquare" variant="solid" className="w-8 h-8" />
          <span className="text-xs mt-1">{reel.shares.toLocaleString()}</span>
        </button>
         <button className="flex flex-col items-center">
          <Icon name="EllipsisHorizontal" variant="solid" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default Reel;
