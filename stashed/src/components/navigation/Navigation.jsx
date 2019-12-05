import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { ROLES } from '../../constants/constants';
import { getUserRoleString } from '../../utils';
// import UserControls from '../user-controls/UserControls';
import LogoutButton from '../login/LogoutButton';
import NavigationContent from './NavigationContent';
import Icon from '../icon/Icon';
import { clearUser } from '../../dux/user';

import './Navigation.scss';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.clearUserCookie = this.clearUserCookie.bind(this);

    this.state = {
      showMenu: false
    };
  }

  handleToggleMenu() {
    this.setState(({ showMenu }) => ({ showMenu: !showMenu }));
  }

  clearUserCookie() {
    const cookies = new Cookies();
    this.props.clearUser();
    cookies.remove('messengerUser');
    cookies.remove('messengerUserId');
    cookies.remove('messengerUserRole');
  }

  render() {
    const { desktopOnly, intl, user } = this.props;
    let userRole;
    if (user) {
      userRole = getUserRoleString(user.role, ROLES);
    }
    const { showMenu } = this.state;
    if (userRole && userRole.isPropertyManager !== true) {
      return (
        <div className="navigation">
          {desktopOnly && (
            <div className="frontmatter">
              <NavigationContent
                intl={intl}
                type="desktop"
                userRole={userRole}
                user={user}
              />
              {/* <UserControls type="desktop" /> */}
            </div>
          )}
          {!showMenu &&
            !desktopOnly && (
              <div className="actions">
                <button
                  type="button"
                  aria-label="Show Menu"
                  className="menu__btn action action--right"
                  onClick={this.handleToggleMenu}>
                  <Icon icon="menu" />
                </button>
              </div>
            )}

          {showMenu &&
            !desktopOnly && (
              <NavigationContent
                handleToggleMenu={this.handleToggleMenu}
                intl={intl}
                user={user}
              />
            )}
          <LogoutButton clearCookie={this.clearUserCookie} />
        </div>
      );
    }

    return null;
  }
}

// const mapStateToProps = state => ({
//   user: state.user
// });

const mapDispatchToProps = dispatch => ({
  clearUser: () => dispatch(clearUser())
});

Navigation.propTypes = {
  user: PropTypes.shape({}),
  desktopOnly: PropTypes.bool,
  intl: intlShape.isRequired,
  clearUser: PropTypes.func.isRequired
};

Navigation.defaultProps = {
  user: null,
  desktopOnly: false
};

export default injectIntl(
  connect(
    null,
    mapDispatchToProps
  )(Navigation)
);
