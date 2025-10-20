
import React, { useState, useRef, useEffect } from 'react';
import VideoPlayerControls from './VideoPlayerControls';

interface VideoPlayerProps {
    src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };
    
    const toggleMuteUnmute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        videoElement.addEventListener('play', handlePlay);
        videoElement.addEventListener('pause', handlePause);
        
        return () => {
            videoElement.removeEventListener('play', handlePlay);
            videoElement.removeEventListener('pause', handlePause);
        }
    }, [])

    return (
        <div className="relative w-full h-full bg-black cursor-pointer" onClick={togglePlayPause}>
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-contain"
                loop
                muted={isMuted}
                playsInline
            />
            <VideoPlayerControls 
                isPlaying={isPlaying}
                isMuted={isMuted}
                onPlayPause={togglePlayPause}
                onMuteUnmute={toggleMuteUnmute}
            />
        </div>
    );
};

export default VideoPlayer;
