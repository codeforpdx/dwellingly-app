import React from "react";
import dwellinglyLogoMobile from "../assets/images/dwellingly_logo_white.png";



const PrivacyPolicy = () => {

return(
  <div className-="privacy-policy__container">
    <div className = "privacy-policy__mobile__header">
      <img className= "privacy-policy__mobile__logo" src={dwellinglyLogoMobile}></img>
    </div>
    <div className="privacy-policy__text-container">
      <h3 className="privacy-policy__heading">Privacy Policy</h3>
        <p className="privacy-policy__text"> 
              I'm baby blog taxidermy roof party activated charcoal man bun. 
            Fashion axe ramps actually, chicharrones flannel kickstarter mumblecore chartreuse kombucha shaman. 
            Food truck lo-fi bespoke, twee activated charcoal disrupt DIY church-key cornhole chicharrones. 
            Asymmetrical poke seitan lumbersexual authentic paleo keffiyeh trust fund marfa iceland letterpress you probably haven't heard of them. 
            Artisan irony art party fixie vinyl, gochujang mustache yr succulents unicorn letterpress meggings craft beer kinfolk. 
            Iceland everyday carry farm-to-table blue bottle direct trade messenger bag. 
        </p>
      <h4 className="privacy-policy__heading">UPDATE CONTACT INFORMATION</h4>
        <p className="privacy-policy__text"> 
                I'm baby blog taxidermy roof party activated charcoal man bun. 
              Fashion axe ramps actually, chicharrones flannel kickstarter mumblecore chartreuse kombucha shaman. 
              Food truck lo-fi bespoke, twee activated charcoal disrupt DIY church-key cornhole chicharrones. 
              Asymmetrical poke seitan lumbersexual authentic paleo keffiyeh trust fund marfa iceland letterpress you probably haven't heard of them. 
              Artisan irony art party fixie vinyl, gochujang mustache yr succulents unicorn letterpress meggings craft beer kinfolk. 
              Iceland everyday carry farm-to-table blue bottle direct trade messenger bag. 
          <ul className="privacy-policy__list">
            <li className="privacy-policy__list__item">Iceland everyday carry farm-to-table blue bottle direct trade messenger bag. </li>
            <li className="privacy-policy__list__item">Artisan irony art party fixie vinyl, gochujang mustache yr succulents unicorn letterpress meggings craft beer kinfolk. </li>
            <li className="privacy-policy__list__item">Food truck lo-fi bespoke, twee activated charcoal disrupt DIY church-key cornhole chicharrones. </li>

          </ul>
          </p>
      <h4 className="privacy-policy__heading">PERSONAL INFORMATION WE COLLECT</h4>
      <h4 className="privacy-policy__heading">HOW DO WE USE YOUR PERSONAL INFORMATION?</h4>
      <h4 className="privacy-policy__heading">SHARING YOUR PERSONAL INFORMATION</h4>


    </div>


  </div>



  );
};

export default PrivacyPolicy;