import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { USER } from '../../translations/messages';

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
      if (user) {
        this.setState({ userId: user.email, activeUser: true });
        this.props.setUser(user);
      } else {
        this.setState({ userId: null, activeUser: false });
        this.props.clearUser();
      }
    });
  }

  render() {
    return (
      <div>
        { this.state.userId
          && (
            <span>
              { this.props.intl.formatMessage(USER.HELLO) }
              &nbsp;
              { this.state.userId }
              { this.props.user.email }
            </span>
          )
        }
        { !this.state.activeUser
          && (
            <span>
              No user
            </span>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
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
