
import React from 'react';
// FIX: Add file extension to import.
import { reels } from '../constants';
import Reel from '../components/Reel';

const ReelsPage: React.FC = () => {
  return (
    <div className="relative h-[calc(100vh-12rem)] md:h-[calc(100vh-8rem)] snap-y snap-mandatory overflow-y-scroll scrollbar-hide rounded-xl">
        {reels.map((reel) => (
            <div key={reel.id} className="snap-start w-full h-full flex items-center justify-center">
                <Reel reel={reel} />
            </div>
        ))}
    </div>
  );
};

export default ReelsPage;