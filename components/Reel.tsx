import React, { useState, useRef, useEffect } from 'react';
import { Reel as ReelType } from '../types';
import Icon from './Icon';
import Avatar from './Avatar';

interface ReelProps {
  reel: ReelType;
}

const Reel: React.FC<ReelProps> = ({ reel }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPress = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            videoRef.current?.play();
            setIsPlaying(true);
        } else {
            videoRef.current?.pause();
            setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );
  
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
  
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full max-w-md mx-auto bg-black rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        onClick={handleVideoPress}
        className="w-full h-full object-cover"
        src={reel.videoUrl}
        loop
        playsInline
      />
      
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Icon name="Play" variant="solid" className="w-20 h-20 text-white/70" />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex items-end">
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    <Avatar src={reel.user.avatarUrl} alt={reel.user.name} />
                    <span className="font-bold">{reel.user.name}</span>
                </div>
                <p className="mt-2 text-sm">{reel.caption}</p>
                <div className="flex items-center space-x-2 mt-2 text-xs">
                    <Icon name="MusicalNote" className="w-4 h-4" />
                    <span>{reel.audio.title} - {reel.audio.artist}</span>
                </div>
            </div>
            <div className="flex flex-col items-center space-y-4">
                <button className="flex flex-col items-center">
                    <Icon name="Heart" className="w-8 h-8" />
                    <span className="text-xs">{reel.likes}</span>
                </button>
                 <button className="flex flex-col items-center">
                    <Icon name="ChatBubbleOvalLeft" className="w-8 h-8" />
                    <span className="text-xs">{reel.comments}</span>
                </button>
                 <button className="flex flex-col items-center">
                    <Icon name="ArrowPathRoundedSquare" className="w-8 h-8" />
                    <span className="text-xs">{reel.shares}</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Reel;
