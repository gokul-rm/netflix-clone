import React from 'react';
import { Movie } from '../types';
import StarRating from './StarRating';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  onGenreClick: (genre: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, onGenreClick }) => {
  return (
    <div
      className="relative flex-shrink-0 w-32 md:w-48 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 hover:z-20 group"
      onClick={() => onClick(movie)}
    >
      <img
        className="w-full h-auto rounded-md object-cover"
        src={movie.poster_path}
        alt={movie.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 rounded-md">
        <div className="flex-grow flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="text-left">
          <h3 className="text-white text-sm md:text-base font-bold truncate">{movie.title}</h3>
          <div className="text-xs mt-1 flex flex-wrap gap-1">
            {movie.genres?.slice(0, 2).map((genre) => (
              <button
                key={genre}
                onClick={(e) => {
                  e.stopPropagation();
                  onGenreClick(genre);
                }}
                className="bg-gray-700/80 px-2 py-0.5 rounded-full text-gray-300 hover:bg-red-600 hover:text-white transition-colors text-xs"
              >
                {genre}
              </button>
            ))}
          </div>
          {movie.vote_average && movie.vote_average > 0 && (
            <div className="mt-2">
              <StarRating rating={movie.vote_average} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;