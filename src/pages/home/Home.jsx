import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PropertyManagerHome from './PropertyManagerHome';

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
      <PropertyManagerHome
        match={match}
        tenants={this.tenants}
        properties={this.properties}
      />
    );
  }
}

Home.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default Home;
