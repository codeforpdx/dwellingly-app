import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import LoginForm from '../../components/login/LoginForm';
import LoginWithGoogle from '../../components/login/LoginWithGoogle';
import Spinner from '../../components/spinner/Spinner';
import { COMMON, FORMS } from '../../translations/messages';
import { ROUTES } from '../../constants/constants';

import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.userRoutes = {
      isAdmin: ROUTES.ADMIN,
      isPropertyManager: ROUTES.TERMS_CONDITIONS,
      isStaff: ROUTES.PRIVACY,
      default: ROUTES.AWAITING_ROLE
    };
    this.userType = 'default';
    this.ourUser = null;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    const { history } = this.props;
    if (this.props.haveUser && this.props.user) {
      this.ourUser = this.props.user;
      if (
        this.ourUser &&
        this.ourUser.role &&
        (this.ourUser.role.isAdmin ||
          this.ourUser.role.isPropertyManager ||
          this.ourUser.role.isStaff) &&
        !this.props.isFetchingUserData &&
        !this.props.isFetchingAuthorization
      ) {
        if (
          this.ourUser.role.isAdmin === 'true' ||
          this.ourUser.role.isAdmin === true
        ) {
          this.userType = 'isAdmin';
        } else if (
          this.ourUser.role.isPropertyManager === 'true' ||
          this.ourUser.role.isPropertyManager === true
        ) {
          this.userType = 'isPropertyManager';
        } else if (
          this.ourUser.role.isStaff === 'true' ||
          this.ourUser.role.isStaff === true
        ) {
          this.userType = 'isStaff';
        }
      }
      console.log('we are going to ', this.userRoutes[this.userType]);
      history.push(this.userRoutes[this.userType]);
    }
  }

  render() {
    const {
      isFetchingUserData,
      isFetchingAuthorization,
      haveUser
    } = this.props;
    return (
      <div className="main page page--login">
        <section className="main login-form">
          {!isFetchingAuthorization &&
            !isFetchingUserData &&
            !haveUser && <LoginForm />}
          {(isFetchingAuthorization || isFetchingUserData) &&
            !haveUser && <Spinner />}
          {this.props.error &&
            this.props.error.message &&
            this.props.error.message.length > 0 && (
              <p className="error">{this.props.error.message}</p>
            )}
          {!isFetchingAuthorization &&
            !isFetchingUserData &&
            !haveUser && (
              <div className="width-wrapper">
                <div className="login-separator">
                  <span className="separator">&nbsp;</span>
                  <div className="allCaps">
                    {this.props.intl.formatMessage(COMMON.CONJUNCTION_OR)}
                  </div>
                  <span className="separator">&nbsp;</span>
                </div>
                <LoginWithGoogle />
              </div>
            )}
          <div className="width-wrapper account-links">
            <Link to={ROUTES.FORGOT_PASSWORD}>
              {this.props.intl.formatMessage(FORMS.FORGOT_PASSWORD_LABEL)}
            </Link>
            <Link to={ROUTES.SIGNUP}>
              {this.props.intl.formatMessage(FORMS.CREATE_ACCOUNT)}
            </Link>
            {/* <p className="login-conditions align-left">
              {this.props.intl.formatMessage(LOGIN.INSTRUCTIONS)}{' '}
              <Link to="/terms-conditions">
                {this.props.intl.formatMessage(TERMS.TITLE)}
              </Link>{' '}
              {this.props.intl.formatMessage(COMMON.CONJUNCTION_AND)}{' '}
              <Link to="/privacy-policy">
                {this.props.intl.formatMessage(PRIVACY.TITLE_STANDALONE)}
              </Link>
              .
            </p> */}
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
  location: PropTypes.shape({
    state: PropTypes.shape({})
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
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
    role: PropTypes.shape({
      isAdmin: PropTypes.bool,
      isPropertyManager: PropTypes.bool,
      isStaff: PropTypes.bool
    })
  })
};

Login.defaultProps = {
  error: {
    code: null,
    message: null
  },
  user: null
};

export default injectIntl(withRouter(connect(mapStateToProps)(Login)));
