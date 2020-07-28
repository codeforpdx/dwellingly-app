import React from "react";
import "./modal.scss";

const Modal = ({ titleText, contentJSX, buttonText, buttonClickHandler }) => {
  <div className="modal">
    <div className="modal-container">
      <div className="modal-container__title">
        {titleText}
      </div>
      <div className="modal-container__content">
        {contentJSX}
      </div>
      <button className="modal-container__button" onClick={buttonClickHandler}>
        {buttonText}
      </button>
    </div>
  </div>
};

export default Modal;