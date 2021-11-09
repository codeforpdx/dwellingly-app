import React from 'react';
import './styles/index.scss';

//Documentation

// Simple asthetic component, can be exported as <GoogleButton/>
// Component accepts one prop, called 'innerText'. 
// innerText will either be 'LOG IN WITH GOOGLE' or 'SIGN UP WITH GOOGLE' depending on where it is imported
// You can see working example within: src/views/login.js


function GoogleButton(props) {
  const { innerText } = props;



  return (
    <button
      className="login__button__google button is-primary is-rounded py-4 mt-2"
    >

      <img className="icon mr-3" src="../../../google-dwellingly-favicon.png" alt="Dwellingly icon" />

      <span className="login__button__google__text">
        {innerText}
      </span>
    </button>
  );

};

export default GoogleButton;

