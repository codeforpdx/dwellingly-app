import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import List from '../../components/list/List';
import Icon from '../../components/icon/Icon';

class PropertyManagerTenantsDirectory extends Component {
  constructor(props) {
    super(props);

    this.propertyManager = this.props.propertyManagers.find(
      ({ id }) => id === this.props.match.params.id
    );
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { match, history } = this.props;
    const pm = this.propertyManager;

    return (
      <div className="page page--light">
        <Header>
          {() => (
            <div>
              <Navigation />
              <div className="actions">
                <button
                  type="button"
                  aria-label="Go Back"
                  className="action action--left"
                  onClick={() => {
                    // make new array from url
                    const url = match.url.split('/');
                    // remove last path
                    url.pop();
                    // return new array for "Go Back" function in case user got here from a link
                    // and has no history
                    const closeUrl = url.join('/');
                    history.push(closeUrl);
                  }}>
                  <Icon icon="arrowLeft" />
                </button>
              </div>
              <Header.Label label={`${pm.name}'s Tenants`} type="basic" />
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <List url="tenant" showStaff showNumber items={[]} />
        </section>
      </div>
    );
  }
}

PropertyManagerTenantsDirectory.propTypes = {
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  propertyManagers: PropTypes.arrayOf(PropTypes.shape({}))
};

PropertyManagerTenantsDirectory.defaultProps = {
  propertyManagers: []
};

export default PropertyManagerTenantsDirectory;
