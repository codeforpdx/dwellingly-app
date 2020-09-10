import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import "./modal.scss";

// TODO make this work when hasButtons is true!
// replace modal component in dashboard view with this reusable component!!

const Modal = ({
  titleText,
  contentText,
  hasButtons,
  yesButtonHandler,
  noButtonHandler,
  closeHandler,
}) => (
  <div className="modal">
    <div className="modal__container">
      <FontAwesomeIcon className="modal__close-icon" size={"lg"} icon={faTimesCircle} onClick={closeHandler}/>
      <div className="modal__title">{titleText}</div>
      <div className="modal__content">{contentText}</div>
      {hasButtons ? (
        <div className="modal__button-container">
          <Button
            type={"submit"}
            onClick={yesButtonHandler}
            isCancelButton={false}
            isValidFlag={true}
          >
            Yes
          </Button>
          <Button
            type={"submit"}
            onClick={noButtonHandler}
            isCancelButton={true}
            isValidFlag={true}
          >
            No
          </Button>
        </div>
      ) : (
        <Link className="modal__link" to="/login">
          Return to Log In
        </Link>
      )}
    </div>
  </div>
);

export default Modal;
