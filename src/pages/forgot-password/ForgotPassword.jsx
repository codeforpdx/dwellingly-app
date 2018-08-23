import React, { Component } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import { FORGOT_PASSWORD } from '../../translations/messages';

class ForgotPassword extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="main page page--login">
        <Header>
          {() => (
            <div>
              <Navigation />
              <Header.Label 
                label={this.props.intl.formatMessage(FORGOT_PASSWORD.TITLE)}
                type="basic" />
            </div>
          )}
        </Header>
       
        <section className="width-wrapper">
          <p>Forgot password form goes here</p>
       
         </section>
       </div>
    );
  }
}

ForgotPassword.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(ForgotPassword);
