import React from 'react';
import './googlebutton.scss';

//Write documentation here


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

