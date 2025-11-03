
import React from 'react';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Row from './components/Row';
import { MOVIE_CATEGORIES } from './constants';
import { useMyList } from './context/MyListContext';

const App: React.FC = () => {
  const { myList } = useMyList();

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <NavBar />
      <main>
        <Banner />
        <div className="pl-4 md:pl-10 lg:pl-16 relative z-10 -mt-8 md:-mt-20 pb-16">
          {myList.length > 0 && (
            <Row title="My List" movies={myList} rowIndex={0} />
          )}
          {MOVIE_CATEGORIES.map((category, index) => (
            <Row key={category.id} title={category.title} categoryPrompt={category.prompt} rowIndex={myList.length > 0 ? index + 1 : index} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;