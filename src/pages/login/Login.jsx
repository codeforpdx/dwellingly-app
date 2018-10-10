import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import LoginForm from '../../components/login/LoginForm';
import LoginWithGoogle from '../../components/login/LoginWithGoogle';
import Spinner from '../../components/spinner/Spinner';
import { COMMON, LOGIN, TERMS, PRIVACY } from '../../translations/messages';
import { SETTINGS, ROUTES } from '../../constants/constants';

import './Login.scss';

class Login extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const userRoutes = {
      "isAdmin": ROUTES.ADMIN,
      "isPropertyManager": ROUTES.TERMS_CONDITIONS,
      "isStaff": ROUTES.PRIVACY,
      "default": ROUTES.AWAITING_ROLE,
    }

    const ourUser = this.props.user;
    let userType = "default";
    if (ourUser && (ourUser.role.isAdmin || ourUser.role.isPropertyManager || ourUser.role.isStaff ) && !this.props.isFetchingUserData && !this.props.isFetchingAuthorization) {
      if (ourUser.role.isAdmin === "true" || ourUser.role.isAdmin === true) {
        userType = "isAdmin";
      } else if (ourUser.role.isPropertyManager === "true"  || ourUser.role.isPropertyManager === true) {
        userType = "isPropertyManager";
      } else if (ourUser.role.isStaff === "true" || ourUser.role.isStaff === true) {
        userType = "isStaff";
      }
      console.log('we would be going to ', userRoutes[userType]);
    } 
    return (
      <div className="main page page--login">
        <Header>
          {() => (
            <div>
              <Navigation />
              <Header.Label 
                label={this.props.intl.formatMessage(LOGIN.TITLE, {org: SETTINGS.ORGANIZATION, appname: SETTINGS.APP_NAME})} 
                type="basic" />
            </div>
          )}
        </Header>
        <section className="main">
          { !this.props.isFetchingAuthorization && ! this.props.isFetchingUserData && !this.props.haveUser &&
            <LoginForm />
          }
          { (this.props.isFetchingAuthorization || this.props.isFetchingUserData) &&
            <Spinner />
          }
          { this.props.haveUser && this.props.user && this.props.user.id && this.props.user.email && 

            <p>This is a redirect that we need to fix on some other pages to avoid an inifite loop...</p>             /* <Redirect to={userRoutes[userType]} /> */
          }

          { this.props.error && this.props.error.message.length > 0 &&
            <p className="error">
              { this.props.error.message }
            </p>
          }
          { !this.props.isFetchingAuthorization && ! this.props.isFetchingUserData && !this.props.haveUser &&
            <div className="width-wrapper">
              <div className="allCaps separator">{this.props.intl.formatMessage(COMMON.CONJUNCTION_OR)}</div>
              <h2 className="align-left">{this.props.intl.formatMessage(LOGIN.INSTRUCTIONS_GOOGLE)}</h2>
              <LoginWithGoogle />
            </div>
          }
          <div className="width-wrapper">
            <p className="login-conditions align-left">{this.props.intl.formatMessage(LOGIN.INSTRUCTIONS)} <Link to="/terms-conditions">{this.props.intl.formatMessage(TERMS.TITLE)}</Link> {this.props.intl.formatMessage(COMMON.CONJUNCTION_AND)} <Link to="/privacy-policy">{this.props.intl.formatMessage(PRIVACY.TITLE_STANDALONE)}</Link>.</p>
           </div>
         </section>
       </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
  userCreated: user.userCreated,
  accountSource: user.accountSource,
  isCreatingUser: user.isCreatingUser, 
  isFetchingAuthorization: user.isFetchingAuthorization,
  isFetchingUserData: user.isFetchingUserData,
  haveUser: user.haveUser,
  error: user.error
});

Login.propTypes = {
  intl: intlShape.isRequired,
  isFetchingAuthorization: PropTypes.bool.isRequired,
  isFetchingUserData: PropTypes.bool.isRequired,
  haveUser: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    code: PropTypes.string,
    message: PropTypes.string
  }),
  user: PropTypes.shape({
    accountSource: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    role:  PropTypes.shape({
      isAdmin: PropTypes.bool,
      isPropertyManager: PropTypes.bool,
      isStaff: PropTypes.bool
    })
  }),
};

Login.defaultProps = {
  error: {
    code: null,
    message: null,
  },
  user: null,
}

export default connect(
  mapStateToProps,
)(injectIntl(Login));
