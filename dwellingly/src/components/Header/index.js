import React from 'react';
import logo from '../../assets/images/c4pdx.gif';
import dwellinglylogo from '../../assets/images/dwellingly.png';

const Header = props => {
  return (
    <header className='App-header'>
      <img src={dwellinglylogo} className='' alt='dwellingly' />
      <img src={logo} className='App-logo' alt='logo' />

      <a
        className='App-link'
        href='http://www.codeforpdx.org'
        target='_blank'
        rel='noopener noreferrer'
      >
        Code for PDX
      </a>
      <p>Community Built Civic Tech.</p>
    </header>
  );
};

export default Header;
