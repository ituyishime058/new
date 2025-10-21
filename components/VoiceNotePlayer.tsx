
import React, { useState, useEffect, useRef } from 'react';
// FIX: Add file extension to import.
import { Message } from '../types.ts';
import Icon from './Icon';

interface VoiceNotePlayerProps {
  voiceNote: NonNullable<Message['voiceNote']>;
  isCurrentUser: boolean;
}

const VoiceNotePlayer: React.FC<VoiceNotePlayerProps> = ({ voiceNote, isCurrentUser }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 100 / voiceNote.duration;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, voiceNote.duration]);

  useEffect(() => {
      if (!isPlaying) {
          setProgress(0);
      }
  }, [isPlaying])

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const trackColor = isCurrentUser ? 'bg-white/30' : 'bg-black/20';
  const progressColor = isCurrentUser ? 'bg-white' : 'bg-accent';
  
  return (
    <div className="flex items-center space-x-2 my-1 w-56">
      <button onClick={togglePlay} className={`p-2 rounded-full ${isCurrentUser ? 'bg-white/20 hover:bg-white/30' : 'bg-black/10 hover:bg-black/20'}`}>
        <Icon name={isPlaying ? "Pause" : "Play"} variant="solid" className="w-5 h-5" />
      </button>
      <div className={`flex-1 h-1.5 ${trackColor} rounded-full`}>
        <div className={`h-full ${progressColor} rounded-full relative`} style={{width: `${progress}%`}}>
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 ${progressColor} rounded-full`}></div>
        </div>
      </div>
      <span className="text-xs w-10 text-right">{formatDuration(voiceNote.duration)}</span>
    </div>
  );
};

export default VoiceNotePlayer;