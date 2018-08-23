import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import firebase from 'firebase/app';
import LogoutButton from '../login/LogoutButton';
import 'firebase/auth';
import { USER } from '../../translations/messages';

import './UserControls.scss';

import {
  setUser,
  clearUser,
} from '../../dux/user';

class UserControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      activeUser: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      const cookies = new Cookies();
      const cookieExpiration = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
      if (user) {
        this.setState({ userId: user.email, activeUser: true });
        this.props.setUser(user);
        const cookieExist = cookies.get('messengerUser');
        if (!cookieExist) {
          cookies.set(
            'messengerUser', 
            user.email,
            { path: '/', expires: cookieExpiration,  }
          );
        }
      } else {
        this.setState({ userId: null, activeUser: false });
        this.props.clearUser();
        cookies.remove('messengerUser');
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
  haveUser: user.haveUser,
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  clearUser: () => dispatch(clearUser()),
});

UserControls.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    account_source: PropTypes.string,
    id: PropTypes.string,
  }),
  haveUser: PropTypes.bool.isRequired,
  setUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
};

UserControls.defaultProps = {
  user: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(UserControls));
