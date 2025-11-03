
import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { useMyList } from '../context/MyListContext';
import VideoPlayer from './VideoPlayer';

interface DetailsModalProps {
  movie: Movie;
  onClose: () => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ movie, onClose }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { addToList, removeFromList, isInList } = useMyList();

  const inList = isInList(movie.id);

  const handleMyListClick = () => {
    if (inList) {
      removeFromList(movie.id);
    } else {
      addToList(movie);
    }
  };
  
  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to finish before calling parent's onClose
    setTimeout(onClose, 200); // Duration should match animation duration in index.html
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (showPlayer) {
    return <VideoPlayer trailerId={movie.youtube_trailer_id} onClose={() => setShowPlayer(false)} />;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4"
      onClick={handleClose}
    >
      <div 
        className={`bg-[#141414] w-full max-w-3xl rounded-lg overflow-hidden relative ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-70 rounded-full p-1 z-20 hover:bg-opacity-90"
          aria-label="Close details view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative">
          <img src={movie.backdrop_path} alt={movie.title} className="w-full h-auto" />
          <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-[#141414] to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white shadow-lg">{movie.title}</h1>
            <div className="flex items-center space-x-3 mt-4">
              <button 
                className="flex items-center justify-center bg-white text-black font-bold rounded px-4 md:px-6 py-2 hover:bg-gray-200 transition"
                onClick={() => setShowPlayer(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Play Trailer
              </button>
              <button 
                onClick={handleMyListClick}
                className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-gray-400 bg-black bg-opacity-60 hover:border-white transition"
                aria-label={inList ? "Remove from My List" : "Add to My List"}
              >
                {inList ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="p-8">
          <p className="text-base leading-relaxed">{movie.overview}</p>
          {movie.genres && movie.genres.length > 0 && (
            <p className="mt-4 text-sm text-gray-400">
              <span className="font-bold text-white pr-2">Genres:</span>
              {movie.genres.join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;