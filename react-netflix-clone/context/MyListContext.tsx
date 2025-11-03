import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie } from '../types';

interface MyListContextType {
  myList: Movie[];
  addToList: (movie: Movie) => void;
  removeFromList: (movieId: number) => void;
  isInList: (movieId: number) => boolean;
}

const MyListContext = createContext<MyListContextType | undefined>(undefined);

export const MyListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [myList, setMyList] = useState<Movie[]>([]);

  const addToList = (movie: Movie) => {
    setMyList((prevList) => {
      if (!prevList.some(item => item.id === movie.id)) {
        return [...prevList, movie];
      }
      return prevList;
    });
  };

  const removeFromList = (movieId: number) => {
    setMyList((prevList) => prevList.filter((movie) => movie.id !== movieId));
  };

  const isInList = (movieId: number) => {
    return myList.some((movie) => movie.id === movieId);
  };

  return (
    <MyListContext.Provider value={{ myList, addToList, removeFromList, isInList }}>
      {children}
    </MyListContext.Provider>
  );
};

export const useMyList = () => {
  const context = useContext(MyListContext);
  if (context === undefined) {
    throw new Error('useMyList must be used within a MyListProvider');
  }
  return context;
};
