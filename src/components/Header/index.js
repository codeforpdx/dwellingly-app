import React from 'react';
import { Link } from 'react-router-dom';
import dwellinglylogo from '../../assets/images/dwellingly_logo_white.png';
import { LogOutButton } from './../NavigationMenu/navigationMenu';

const Header = props => {
  return (
    <header className='navbar bg-gradient'>
      <div className='navbar-brand'>
        <Link className='navbar-item' to='/'>
          <img src={dwellinglylogo} alt='dwellingly logo' />
        </Link>
      </div>
      <div className="is-logout-button">
        <LogOutButton />
      </div>
    </header>
  );
};

export default Header;
