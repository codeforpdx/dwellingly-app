import React, { Component } from 'react';
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import { COMMON } from "../../translations/messages";
import logo from '../../assets/images/logo.svg';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h1 className="App-title">{ this.props.intl.formatMessage( COMMON.APP_TITLE ) }</h1>
        </header>
        <p>{ this.props.intl.formatMessage( COMMON.QUESTION ) }</p>
        <p>{ this.props.intl.formatMessage( COMMON.ANSWER ) }</p>
      </div>
    );
  }
}

App.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl( App );
