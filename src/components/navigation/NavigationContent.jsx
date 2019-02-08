import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import AdminMenu from './AdminMenu';
import StaffMenu from './StaffMenu';
import { ROLES } from '../../constants/constants';
// import { getUserRoleString } from '../../utils';
// import { NAVIGATION } from '../../translations/messages';

class NavigationContent extends Component {
  render() {
    const { handleToggleMenu, intl, type, user, userRole } = this.props;
    // const roleStr = getUserRoleString(user.role, ROLES);
    return (
      <nav className={`menu${type && ` menu--${type}`}`}>
        {type === 'mobile' &&
          handleToggleMenu && (
            <button
              type="button"
              aria-label="Close Menu"
              className="menu__bg"
              onClick={handleToggleMenu}
            />
          )}
        <div className="menu__groups">
          {userRole === ROLES.STAFF && (
            <StaffMenu
              handleToggleMenu={handleToggleMenu}
              intl={intl}
              type={type}
              user={user}
            />
          )}
          {userRole === ROLES.ADMIN && (
            <AdminMenu
              handleToggleMenu={handleToggleMenu}
              intl={intl}
              type={type}
              user={user}
            />
          )}
        </div>
      </nav>
    );
  }
}

NavigationContent.propTypes = {
  userRole: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  handleToggleMenu: PropTypes.func,
  type: PropTypes.string,
  user: PropTypes.shape({})
};

NavigationContent.defaultProps = {
  handleToggleMenu: undefined,
  type: 'mobile',
  user: undefined
};

export default injectIntl(NavigationContent);
