import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import List from '../../components/list/List';
import Icon from '../../components/icon/Icon';
import { backURL } from '../../utils';

// mock data
import { propertyManagers, tenants } from '../../data';
import { ROUTES } from '../../constants/constants';

class PropertyManagerTenantsDirectory extends Component {
  constructor(props) {
    super(props);

    this.propertyManager = propertyManagers.find(
      ({ id }) => id === this.props.match.params.id
    );
    this.tempTenantsList = tenants.filter(({ staff }) => {
      const names = staff.filter(
        ({ name }) => name === this.propertyManager.name
      );
      return names.length > 0;
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { match } = this.props;
    const { name } = this.propertyManager;
    const backUrl = backURL(match.url, 'ongoing');
    return (
      <div className="page">
        {this.propertyManager && (
          <div>
            <Header>
              {() => (
                <div>
                  <Navigation />
                  <div className="actions">
                    <Link
                      aria-label="Go Back"
                      className="action action--left"
                      to={backUrl}
                      title="Go Back">
                      <Icon icon="arrowLeft" />
                    </Link>
                  </div>
                  <Header.Label label={`${name}'s Tenants`} type="basic" />
                </div>
              )}
            </Header>

            <section className="main width-wrapper">
              <List
                url={`${ROUTES.TENANTS}/:id/ongoing`}
                showStaff
                showNumber
                items={this.tempTenantsList}
              />
            </section>
          </div>
        )}
      </div>
    );
  }
}

PropertyManagerTenantsDirectory.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default PropertyManagerTenantsDirectory;
