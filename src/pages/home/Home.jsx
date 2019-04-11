import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import PropertyManagerHome from './PropertyManagerHome';
// import UserControls from '../../components/user-controls/UserControls';
import { ROLES, ROUTES } from '../../constants/constants';
import { getUserRoleString } from '../../utils';

import { dummyUser, properties, tenants } from '../../data';

class Home extends Component {
  constructor(props) {
    super(props);

    this.tenants = tenants;
    this.properties = properties;

    this.user = dummyUser;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { match } = this.props;
    const { user } = this;
    const roleStr = getUserRoleString(user.role, ROLES);
    return (
      // do check agains user roles
      <div className="page">
        {roleStr === ROLES.PROPERTY_MANAGER && (
          <PropertyManagerHome
            match={match}
            tenants={this.tenants}
            properties={this.properties}
            user={user}
          />
        )}
        {roleStr === ROLES.STAFF && <Redirect to={`${ROUTES.TICKETS}/open`} />}
        {roleStr === ROLES.ADMIN && <Redirect to={ROUTES.ADMIN} />}
        {/* <UserControls /> */}
      </div>
    );
  }
}

Home.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default Home;
