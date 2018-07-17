import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/constants';

const Header = () => (
  <header className="appHeader">
    <Link to={ROUTES.ROOT}>
      Home
    </Link>
    &nbsp;
    <Link to={ROUTES.COUNTING}>
      Counter
    </Link>
  </header>
);

export default Header;
