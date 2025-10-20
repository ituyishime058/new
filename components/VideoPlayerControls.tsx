
import React from 'react';
import Icon from './Icon';

interface VideoPlayerControlsProps {
    isPlaying: boolean;
    isMuted: boolean;
    onPlayPause: () => void;
    onMuteUnmute: (e: React.MouseEvent) => void;
}

const VideoPlayerControls: React.FC<VideoPlayerControlsProps> = ({ isPlaying, isMuted, onPlayPause, onMuteUnmute }) => {
    return (
        <>
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                    <Icon name="Play" variant="solid" className="w-20 h-20 text-white/70" />
                </div>
            )}
            <button onClick={onMuteUnmute} className="absolute top-4 right-4 bg-black/30 p-2 rounded-full text-white">
                <Icon name={isMuted ? "SpeakerXMark" : "SpeakerWave"} className="w-6 h-6" />
            </button>
        </>
    );
};

export default VideoPlayerControls;
