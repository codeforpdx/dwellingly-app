import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import firebase from 'firebase/app';
import 'firebase/auth';
import {getFirestoreUserData} from '../../firebase/auth';
import LogoutButton from '../login/LogoutButton';
import { USER } from '../../translations/messages';

import './UserControls.scss';

import {
  addCustomUserData,
  clearUser,
} from '../../dux/user';



class UserControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: null,
      userId: null,
      activeUser: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      // Monitor Firebase authorization for user state, adding cookie for user email
      const cookies = new Cookies();
      const cookieExpiration = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
      let accountSource = 'email';
      if (user && !this.props.isCreatingUser) {
        if (user && user.providerData[0]) {
          accountSource = user.providerData[0].providerId;
        }
        if (user && user.email && (user.id || user.l)){
          let userID = user.id
          if (user.l) {
            userID = user.l
          }
          this.setState({ userEmail: user.email, userId: userID, activeUser: true });
        }
       
        console.log( user);
        this.props.addCustomUserData(user);
        if (user && !this.props.isCreatingUser) {
          getFirestoreUserData(user.uid, accountSource, user.uid);
        }
        const userEmailCookieExist = cookies.get('messengerUser');
        const userIDCookieExist = cookies.get('messengerUserId');
        if (!userEmailCookieExist) {
          cookies.set(
            'messengerUser', 
            this.state.userEmail,
            { path: '/', expires: cookieExpiration,  }
          );
        }
        if (!userIDCookieExist) {
          cookies.set(
            'messengerUserId', 
            this.state.userId,
            { path: '/', expires: cookieExpiration,  }
          );
        }
      } else {
        this.setState({ userEmail: null, userId: null, activeUser: false });
        this.props.clearUser();
        cookies.remove('messengerUser');
        cookies.remove('messengerUserId');
      }
    });
  }

  render() {
    return (
      <div className="user-controls">
        { this.props.user
          && this.props.haveUser
          && (
            <span className="user-id">
              { this.props.intl.formatMessage(USER.HELLO) }
              &nbsp;
              { this.state.userId }
              <br />
              { this.props.user.email }
              <LogoutButton />
            </span>
          )
        }
        { !this.state.activeUser
          && (
            <ul className="no-user">
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )
        }
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
});

const mapDispatchToProps = dispatch => ({
  addCustomUserData: (user, accountSource) => dispatch(addCustomUserData(user, accountSource)),
  clearUser: () => dispatch(clearUser()),
});

UserControls.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.shape({
    accountSource: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
  }),
  isCreatingUser: PropTypes.bool.isRequired,
  haveUser: PropTypes.bool.isRequired,
  addCustomUserData: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
};

UserControls.defaultProps = {
  user: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(UserControls));
