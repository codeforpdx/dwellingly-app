import React from 'react';
import './googlebutton.scss';

//Documentation

// Simple asthetic component, can be exported as <GoogleButton/>
// Component accepts one prop, called 'innerText'. 
// innerText will either be 'LOG IN WITH GOOGLE' or 'SIGN UP WITH GOOGLE' depending on where it is imported
// You can see working example within: src/views/login.js


function GoogleButton(props){
  const { innerText } = props;



return (
  <button className="login__button login__button__google">
    <div className="googleIconContainer">
      <img className="googleIcon" src="../../../google-dwellingly-favicon.png" alt="Dwellingly icon"/>
    </div>
    <span className="login__button__google__text">
      {innerText}
    </span>
  </button>
    );
};

export default GoogleButton;

