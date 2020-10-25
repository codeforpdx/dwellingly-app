import React from "react";
import PropTypes from "prop-types";

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
      className="button is-dark is-rounded"
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
      <button
        type={type}
        disabled={disabledFlag}
        className="button is-primary is-rounded"
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
