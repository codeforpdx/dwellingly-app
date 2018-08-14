import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Header.scss';

class Header extends Component {
  static Label({ label, type, children }) {
    return (
      <div className={`hero__wrapper${type && ` hero__wrapper--${type}`}`}>
        {label && <h2>{label}</h2>}
        {children && children()}
      </div>
    );
  }

  render() {
    const { label, type, variant, variants, children } = this.props;
    const variantClasses =
      variants && variants.length > 0
        ? variants.map(variant => `hero--${variant}`).join(' ')
        : '';
    return (
      <header
        className={`hero ${
          variant ? `hero--${variant}` : ''
        } ${variantClasses}`}>
        {label && type && <Header.Label label={label} type={type} />}
        {children && children(...this.props)}
      </header>
    );
  }
}

Header.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.func,
  variant: PropTypes.string,
  variants: PropTypes.arrayOf(PropTypes.string)
};

Header.defaultProps = {
  children: undefined,
  label: undefined,
  type: undefined,
  variant: undefined,
  variants: undefined
};

export default Header;
