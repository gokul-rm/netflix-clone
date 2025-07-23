import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import caret_icon from '../../assets/caret_icon.svg';
import profile_img from '../../assets/profile_img.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCaretClick = (e) => {
    e.stopPropagation(); // prevent bubbling
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt="" />
        <ul>
          <li>HOME</li>
          <li>TV SHOWS</li>
          <li>MOVIES</li>
          <li>NEW & POPULAR</li>
          <li>MY LIST</li>
          <li>MY LANGUAGE</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={search_icon} alt="" className='icons' />
        <img src={bell_icon} alt="" className='icons' />
        <div className={`navbar-profile ${dropdownOpen ? 'active' : ''}`}>
          <img src={profile_img} alt="" className='profile' />
          <img src={caret_icon} alt="" onClick={handleCaretClick} />
          <div className="dropdown">
            <p>sign out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
