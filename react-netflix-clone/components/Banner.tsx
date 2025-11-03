
import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { fetchMoviesByCategory } from '../services/geminiService';
import Loader from './Loader';
import DetailsModal from './DetailsModal';
import VideoPlayer from './VideoPlayer';

const Banner: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showPlayer, setShowPlayer] = useState<boolean>(false);

  useEffect(() => {
    const getFeaturedMovie = async () => {
      setLoading(true);
      try {
        const movies = await fetchMoviesByCategory("Generate details for one epic, visually stunning blockbuster movie to feature on a streaming service homepage.");
        if (movies.length > 0) {
          setMovie(movies[0]);
        }
      } catch (error) {
        console.error("Failed to fetch banner movie:", error);
      } finally {
        setLoading(false);
      }
    };
    getFeaturedMovie();
  }, []);

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  
  if (loading || !movie) {
    return (
      <header className="relative h-[448px] md:h-[600px] text-white flex items-center justify-center bg-black">
        <Loader />
      </header>
    );
  }

  return (
    <>
      <header
        className="relative h-[448px] md:h-[600px] text-white object-cover"
        style={{
          backgroundImage: `url(${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />
        <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-10 lg:px-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold pb-2 md:pb-4">
            {movie.title}
          </h1>
          <div className="flex space-x-3 mb-4">
            <button 
              onClick={() => setShowPlayer(true)}
              className="flex items-center justify-center bg-white text-black font-bold rounded px-4 md:px-6 py-1 md:py-2 hover:bg-gray-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play
            </button>
            <button 
              onClick={() => setShowDetails(true)}
              className="flex items-center justify-center bg-gray-500 bg-opacity-70 text-white font-bold rounded px-4 md:px-6 py-1 md:py-2 hover:bg-gray-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Info
            </button>
          </div>
          <h2 className="w-full md:w-3/5 lg:w-2/5 text-sm md:text-base leading-snug">
            {truncate(movie.overview, 150)}
          </h2>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black to-transparent"
        />
      </header>
      {showDetails && movie && (
        <DetailsModal movie={movie} onClose={() => setShowDetails(false)} />
      )}
      {showPlayer && movie && (
        <VideoPlayer trailerId={movie.youtube_trailer_id} onClose={() => setShowPlayer(false)} />
      )}
    </>
  );
};

export default Banner;