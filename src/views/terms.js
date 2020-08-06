import React from 'react';
import { Link, useLocation } from "react-router-dom";
import dwellinglylogo from "../assets/images/dwellingly_logo_white.png";

export const Terms = () => {
  return (
    <>
    <header className="navbar bg-gradient">
      <Link className="navbar-item" id="header-logo" to="/">
        <img src={dwellinglylogo} alt="dwellingly logo" />
      </Link>
    </header>
    <div className="main-container">
      <h2 className='subtitle'>Terms and Conditions</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus
        nibh a nisi vestibulum, id laoreet nibh blandit. Aliquam ut
        ullamcorper lacus, id sollicitudin massa. Duis lorem tellus, eleifend
        nec vulputate id, luctus eget enim. Phasellus id sapien cursus,
        vehicula nulla sed, facilisis nunc. Curabitur mollis dignissim dui, a
        facilisis erat sodales et. Quisque ut semper nunc. Nulla dolor nibh,
        venenatis eget cursus a, suscipit nec velit. Vivamus vel condimentum
        tortor. Maecenas ac diam magna. Quisque ut eros congue, varius tortor
        ullamcorper, convallis sapien. Mauris lacinia accumsan nibh ut
        euismod. Nunc at arcu volutpat metus semper ultricies in eu neque.
        Class aptent taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Suspendisse potenti. Phasellus justo magna,
        luctus a ipsum ut, egestas accumsan nunc. Donec a nulla nec justo
        elementum dignissim non vel quam.
      </p>
      <br />
      <div className='buttons'>
        <button className='button is-info has-text-weight-bold is-rounded'>
          AGREE
        </button>
        <button className='button has-background-grey has-text-weight-bold has-text-white is-rounded'>
          DISAGREE
        </button>
      </div>
    </div>
    </>
  );
}
