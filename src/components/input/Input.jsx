import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RadioArray from './RadioArray';
import Toggle from './Toggle';

import './Input.scss';

function InputContent({
  blockClass,
  children,
  id, // identifier for use with htmlFor and key properties
  label,
  maxLength, // maximum length
  model, // value of key in state
  name, // name of input
  onChange, // passes along the onChange function through props
  onClick, // for use with button/Link
  placeholder,
  type, // defines input type ["radio", "button", etc.]
  url, // for use with button/Link
  value // value from state, object, or string
}) {
  let inputContent = (
    <label htmlFor={id}>
      <span className={`${blockClass}__label`}>{label}</span>
      <input
        id={id}
        maxLength={maxLength || 200}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  );

  if (type === 'radio') {
    inputContent = (
      <label htmlFor={id}>
        <input
          checked={value === model}
          id={id}
          model={model}
          name={name}
          onChange={onChange}
          type="radio"
          value={value}
        />
        <span className="inline-input__radio-btn" />
        {label}
      </label>
    );
  }

  if (type === 'button') {
    inputContent = (
      <div>
        {!url && (
          <button aria-label={label} type="button" onClick={onClick}>
            {children}
          </button>
        )}
        {url && <Link to={url}>{children}</Link>}
      </div>
    );
  }

  if (type === 'date') {
    inputContent = (
      <label htmlFor={id}>
        <span className={`${blockClass}__label`}>{label}</span>
        <input
          id={id}
          name={name}
          onChange={onChange}
          type="datetime-local"
          value={value}
        />
      </label>
    );
  }

  return inputContent;
}

export default class Input extends Component {
  render() {
    const { blockClass, type, variants } = this.props;

    const variantsClasses =
      variants.length > 0
        ? variants
            .map(variant => `${blockClass}__${type}--${variant}`)
            .join(' ')
        : '';

    return (
      <div className={`input ${blockClass}`}>
        <div className={`${blockClass}__${type} ${variantsClasses}`}>
          <InputContent {...this.props} variantsClasses={variantsClasses} />
        </div>
      </div>
    );
  }
}

Input.propTypes = {
  blockClass: PropTypes.string,
  type: PropTypes.string,
  variants: PropTypes.arrayOf(PropTypes.string)
};

Input.defaultProps = {
  blockClass: 'inline-input',
  type: 'text',
  variants: []
};

export { Input, RadioArray, Toggle };
