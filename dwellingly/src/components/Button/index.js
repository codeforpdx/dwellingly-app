import React from 'react';
import classnames from 'classnames'
import { bool, oneOf, func, string, object, oneOfType } from 'prop-types';
import './button.scss';


const Button = ({ disabled, onClick, classes, size, type, variant, copy }) => {
    return (
        <button
            disabled={disabled}
            type={type}
            className={classnames('button', variant, size, classes, {disabled: disabled})}
            onClick={onClick}>
            {copy}
        </button>
    );
};

Button.defaultProps = {
    disabled: false,
    variant: primary,
    size: 'regular',
    type: 'button',
}

Button.propTypes = {
    copy: oneOfType([string, object]),
    disabled: bool,
    onClick: func.isRequired,
    variant: oneOf(['primary', 'secondary', 'cancel']),
    size: oneOf(['small', 'regular', 'large']),
};

export default Button;