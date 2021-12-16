import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import "./styles/index.scss";

const Modal = ({
  titleText,
  content,
  hasButtons,
  confirmButtonHandler,
  cancelButtonHandler,
  confirmText,
  cancelText,
  closeHandler,
  hasRedirectButton,
  redirectButtonPath,
  redirectButtonText
}) => (
    <div className="modal">
      <div className="modal__container">
        <FontAwesomeIcon className="modal__close-icon" size={"lg"} icon={faTimesCircle} onClick={closeHandler} />
        <div className="modal__title">{titleText}</div>
        <div className="modal__content">{content}</div>
        {hasButtons ? (
          <div className="modal__button-container">
            <Button
              type={"submit"}
              onClick={confirmButtonHandler}
              isCancelButton={false}
              isValidFlag={true}
            >
              {confirmText}
            </Button>
            <Button
              type={"submit"}
              onClick={cancelButtonHandler}
              isCancelButton={true}
              isValidFlag={true}
            >
              {cancelText}
          </Button>
          </div>
        ) : hasRedirectButton && (
            <Link className="modal__link" to={redirectButtonPath}>
              {redirectButtonText}
            </Link>
          )}
      </div>
    </div>
  );

Modal.propTypes = {
  titleText: PropTypes.string,
  content: PropTypes.object,
  hasButtons: PropTypes.bool,
  confirmButtonHandler: PropTypes.func,
  cancelButtonHandler: PropTypes.func,
  closeHandler: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  hasRedirectButton: PropTypes.bool,
  redirectButtonPath: PropTypes.string,
  redirectButtonText: PropTypes.string
};

export default Modal;
