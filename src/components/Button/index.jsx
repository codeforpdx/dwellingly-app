import React from "react";
import PropTypes from "prop-types";
import "./button.scss";

const Button = ({
  type,
  onClick,
  isCancelButton,
  isValidFlag,
  disabledFlag,
  children,
}) =>
  isCancelButton ? (
    <button
      type={type}
      className="styled-button__cancel styled-button"
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <button
      type={type}
      disabled={disabledFlag}
      className={`styled-button__commit-action${isValidFlag ? "--valid" : "--invalid"} styled-button`}
      onClick={onClick}
    >
      {children}
    </button>
  );

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  isCancelButton: PropTypes.bool,
  isValidFlag: PropTypes.bool,
  disabledFlag: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default Button;
