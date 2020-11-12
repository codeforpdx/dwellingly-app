import React from 'react';

import './noMatch.scss';

const noMatch = () => {
  return (
    <>
      <div className="noMatch__container">
        <h2>404</h2>
        <p>Beep, boop. Sorry, but no page matching your request was found.</p>
      </div>
    </>
  );
};

export default noMatch;
