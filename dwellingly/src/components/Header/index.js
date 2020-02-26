import React from 'react';
import { Link } from 'react-router-dom';
import dwellinglylogo from '../../assets/images/dwellingly_logo_white.png';

const Header = props => {
  // Don't render header on login or signup pages
  if (window.location.pathname === '/login' || window.location.pathname === '/signup') return null;

  return (
    <header className='navbar bg-gradient'>
      <div className='navbar-brand'>
        <Link className='navbar-item' to='/'>
          <img src={dwellinglylogo} alt='dwellingly logo' />
        </Link>
      </div>
    </header>

    // <header className='App-header'>
    //   <img src={dwellinglylogo} className='' alt='dwellingly' />
    //   <img src={PDXlogo} className='App-logo' alt='logo' />

    //   <a
    //     className='App-link'
    //     href='http://www.codeforpdx.org'
    //     target='_blank'
    //     rel='noopener noreferrer'
    //   >
    //     Code for PDX
    //   </a>
    //   <p>Community Built Civic Tech.</p>
    // </header>
  );
};

export default Header;
