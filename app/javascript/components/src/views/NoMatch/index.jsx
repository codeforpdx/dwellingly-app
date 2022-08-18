import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div className='main-container'>
      <div className="noMatch__container">
        <h2>404</h2>
        <p>Sorry, but no page matching your request was found.</p>
        <p>Click <Link to="/dashboard">here</Link> to go back to your Dashboard.</p>
      </div>
    </div>
  );
};

export default NoMatch;
