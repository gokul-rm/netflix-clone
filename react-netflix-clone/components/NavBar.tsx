
import React, { useState, useEffect } from 'react';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-10 lg:px-16 flex justify-between items-center h-16">
        <div className="flex items-center space-x-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
            className="h-6"
          />
          <ul className="hidden md:flex space-x-4 text-sm font-medium">
            <li className="cursor-pointer hover:text-gray-300">Home</li>
            <li className="cursor-pointer hover:text-gray-300">TV Shows</li>
            <li className="cursor-pointer hover:text-gray-300">Movies</li>
            <li className="cursor-pointer hover:text-gray-300">New & Popular</li>
            <li className="cursor-pointer hover:text-gray-300">My List</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <img
            src="https://picsum.photos/32/32"
            alt="User Avatar"
            className="h-8 w-8 rounded-md cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
