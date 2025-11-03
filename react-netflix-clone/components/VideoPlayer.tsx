
import React from 'react';

interface VideoPlayerProps {
  trailerId: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ trailerId, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl z-10"
          aria-label="Close video player"
        >
          &times;
        </button>
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&controls=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
