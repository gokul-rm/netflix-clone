
import React, { useState, useEffect, useRef } from 'react';
import { Movie } from '../types';
import { fetchMoviesByCategory } from '../services/geminiService';
import MovieCard from './MovieCard';
import Loader from './Loader';
import DetailsModal from './DetailsModal';

interface RowProps {
  title: string;
  categoryPrompt?: string;
  movies?: Movie[];
  rowIndex?: number;
}

const Row: React.FC<RowProps> = ({ title, categoryPrompt, movies: initialMovies, rowIndex = 0 }) => {
  const [movies, setMovies] = useState<Movie[]>(initialMovies || []);
  const [loading, setLoading] = useState<boolean>(!initialMovies);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [filteredGenre, setFilteredGenre] = useState<string | null>(null);

  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    if (categoryPrompt && !initialMovies) {
      const delay = rowIndex * 300; // Stagger API calls to avoid rate limiting
      const timer = setTimeout(() => {
        setLoading(true);
        const getMovies = async () => {
          try {
            const fetchedMovies = await fetchMoviesByCategory(categoryPrompt);
            setMovies(fetchedMovies);
          } catch (error) {
            console.error(`Failed to fetch movies for row "${title}":`, error);
          } finally {
            setLoading(false);
          }
        };
        getMovies();
      }, delay);

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [categoryPrompt, title, initialMovies, rowIndex]);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 1);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };
  
  const displayedMovies = filteredGenre ? movies.filter(movie => movie.genres.includes(filteredGenre)) : movies;

  useEffect(() => {
    const timer = setTimeout(() => handleScroll(), 100);
    const currentRef = rowRef.current;
    currentRef?.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      clearTimeout(timer);
      currentRef?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [displayedMovies]);


  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  
  const handleGenreClick = (genre: string) => {
    setFilteredGenre(prev => (prev === genre ? null : genre));
     if (rowRef.current) {
      rowRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };
  
  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };


  if (loading) {
    return (
      <div className="my-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>
        <div className="flex items-center justify-center h-44">
          <Loader />
        </div>
      </div>
    );
  }
  
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="my-4 md:my-8">
      <div className="flex items-baseline mb-4">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {filteredGenre && (
          <div className="flex items-center ml-4">
            <span className="text-gray-400 text-lg font-semibold">/ {filteredGenre}</span>
            <button 
              onClick={() => handleGenreClick(filteredGenre)} 
              className="ml-2 text-sm text-gray-400 hover:text-white"
              aria-label={`Clear ${filteredGenre} filter`}
            >
              (clear)
            </button>
          </div>
        )}
      </div>
      <div className="relative group">
        <button 
          className={`absolute top-0 bottom-0 left-0 z-20 w-12 bg-black bg-opacity-50 hover:bg-opacity-75 flex items-center justify-center text-white text-4xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${!showLeftArrow && 'hidden'}`}
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          &#8249;
        </button>
        <div ref={rowRef} className="flex overflow-x-scroll overflow-y-hidden no-scrollbar py-2 space-x-2 md:space-x-4">
          {displayedMovies.map((movie) => (
            <MovieCard key={`${movie.id}-${filteredGenre}`} movie={movie} onClick={handleMovieClick} onGenreClick={handleGenreClick} />
          ))}
        </div>
         <button 
          className={`absolute top-0 bottom-0 right-0 z-20 w-12 bg-black bg-opacity-50 hover:bg-opacity-75 flex items-center justify-center text-white text-4xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${!showRightArrow && 'hidden'}`}
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          &#8250;
        </button>
      </div>
      {selectedMovie && (
        <DetailsModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default Row;