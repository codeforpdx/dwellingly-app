import React from "react";
import dwellinglylogo from "images/dwellingly_logo_white.png";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {

  return (
    <div className-="privacy-policy__container">
      <header className="navbar bg-gradient">
        <Link className="navbar-item" id="header-logo" to="/">
          <img src={dwellinglylogo} alt="dwellingly logo" />
        </Link>
      </header>
      <div className="main-container">

        <h1 className="privacy-policy__heading page-title">Privacy Policy</h1>

        <h2 className="privacy-policy__heading">UPDATE CONTACT INFORMATION</h2>
        <p className="privacy-policy__text">
          I'm baby blog taxidermy roof party activated charcoal man bun.
          Fashion axe ramps actually, chicharrones flannel kickstarter mumblecore chartreuse kombucha shaman.
          Food truck lo-fi bespoke, twee activated charcoal disrupt DIY church-key cornhole chicharrones.
          Asymmetrical poke seitan lumbersexual authentic paleo keffiyeh trust fund marfa iceland letterpress you probably haven't heard of them.
          Artisan irony art party fixie vinyl, gochujang mustache yr succulents unicorn letterpress meggings craft beer kinfolk.
          Iceland everyday carry farm-to-table blue bottle direct trade messenger bag.
          </p>
        <ul className="privacy-policy__list privacy-policy__text">
          <li className="privacy-policy__list__item">Iceland everyday carry farm-to-table blue bottle direct trade messenger bag. </li>
          <li className="privacy-policy__list__item">Artisan irony art party fixie vinyl, gochujang mustache yr succulents unicorn letterpress meggings craft beer kinfolk. </li>
          <li className="privacy-policy__list__item">Food truck lo-fi bespoke, twee activated charcoal disrupt DIY church-key cornhole chicharrones. </li>
        </ul>

        <h2 className="privacy-policy__heading">PERSONAL INFORMATION WE COLLECT</h2>
        <p className="privacy-policy__text">
          I'm baby blog taxidermy roof party activated charcoal man bun.
          Fashion axe ramps actually, chicharrones flannel kickstarter mumblecore chartreuse kombucha shaman.
          Food truck lo-fi bespoke, twee activated charcoal disrupt DIY church-key cornhole chicharrones.
          Asymmetrical poke seitan lumbersexual authentic paleo keffiyeh trust fund marfa iceland letterpress you probably haven't heard of them.
          Artisan irony art party fixie vinyl, gochujang mustache yr succulents unicorn letterpress meggings craft beer kinfolk.
          Iceland everyday carry farm-to-table blue bottle direct trade messenger bag.
          </p>

        <h2 className="privacy-policy__heading">HOW DO WE USE YOUR PERSONAL INFORMATION?</h2>
        <p className="privacy-policy__text">
          I'm baby blog taxidermy roof party activated charcoal man bun.
          Fashion axe ramps actually, chicharrones flannel kickstarter mumblecore chartreuse kombucha shaman.
          Food truck lo-fi bespoke, twee activated charcoal disrupt DIY church-key cornhole chicharrones.
          Asymmetrical poke seitan lumbersexual authentic paleo keffiyeh trust fund marfa iceland letterpress you probably haven't heard of them.
          Artisan irony art party fixie vinyl, gochujang mustache yr succulents unicorn letterpress meggings craft beer kinfolk.
          Iceland everyday carry farm-to-table blue bottle direct trade messenger bag.
          </p>

        <h2 className="privacy-policy__heading">SHARING YOUR PERSONAL INFORMATION</h2>
        <p className="privacy-policy__text">
          I'm baby blog taxidermy roof party activated charcoal man bun.
          Fashion axe ramps actually, chicharrones flannel kickstarter mumblecore chartreuse kombucha shaman.
          Food truck lo-fi bespoke, twee activated charcoal disrupt DIY church-key cornhole chicharrones.
          Asymmetrical poke seitan lumbersexual authentic paleo keffiyeh trust fund marfa iceland letterpress you probably haven't heard of them.
          Artisan irony art party fixie vinyl, gochujang mustache yr succulents unicorn letterpress meggings craft beer kinfolk.
          Iceland everyday carry farm-to-table blue bottle direct trade messenger bag.
          </p>
      </div>

      <div className="privacy-policy__signUpWrapper">
        <div className="privacy-policy__signUpText">
          <Link to="/signup" >
            Sign Up
            </Link>
        </div>
      </div>

    </div>
  );
};

export default PrivacyPolicy;
