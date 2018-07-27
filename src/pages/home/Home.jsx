import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PropertyManagerHome from './PropertyManagerHome';
import UserControls from '../../components/user-controls/UserControls';

import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.tenants = [];
    this.properties = [];
  }

  render() {
    const { match } = this.props;
    return (
      // do check agains user roles
      <div className="messenger">
        <UserControls />
        <PropertyManagerHome
          match={match}
          tenants={this.tenants}
          properties={this.properties}
        />
      </div>
    );
  }
}

Home.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default Home;
