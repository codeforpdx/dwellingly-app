import React from 'react';
import { Link } from 'react-router-dom';
import dwellinglylogo from '../../assets/images/dwellingly_logo_white.png';

const Header = props => {
  // Don't render header on login or signup pages
  if (window.location.pathname === '/login') return null;

  return (

    <header className='App-header'>
    <div className='App-navbar'>
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/'>Home</Link>
        </li>
      </ul>
    </div>
    </header>
  );
};

export default Header;
