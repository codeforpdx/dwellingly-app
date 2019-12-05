import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './RadioArray.scss';

class RadioArray extends Component {
  render() {
    const { model, name, onChange, options } = this.props;
    return (
      <div className="radio-array">
        {options &&
          options.length > 0 && (
            <div className="radio-array__wrapper">
              {options.map(option => {
                const { id, label, value } = option;
                return (
                  <label key={id} htmlFor={id}>
                    <input
                      checked={value === model}
                      id={id}
                      name={name}
                      onChange={onChange}
                      type="radio"
                      value={label}
                    />
                    <span className="radio-array__option">{label}</span>
                  </label>
                );
              })}
            </div>
          )}
      </div>
    );
  }
}

RadioArray.propTypes = {
  model: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string
    })
  )
};

RadioArray.defaultProps = {
  model: undefined,
  name: undefined,
  onChange: () => {},
  options: []
};

export default RadioArray;
