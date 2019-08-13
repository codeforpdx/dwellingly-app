import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import Icon from '../../components/icon/Icon';
import Navigation from '../../components/navigation/Navigation';
import { propertyManagers, properties, tenants } from '../../data'
import './PropertyManagerDetailsTwo.scss';

class PropertyManagerDetailsTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.pm = propertyManagers.find(
      ({ id }) => id === this.props.match.params.id
    );
  }

  render() {
    const { name, number } = this.pm;

    return(
      <div className="admin page">
        {this.pm && (
          <div>
            <Header>
              {() => (
                <div>
                  <Navigation />
                  <Header.Label
                    label="JOIN Messenger Administration"
                    type="basic"
                    />
                </div>
              )}
            </Header>
            <div>
              <div className="width-wrapper">
                <div className="name-header">
                  <h2 className="property-manager-name">
                    {name}
                  </h2>
                  <a
                    href='/'
                    id="archive-button"
                    className="btn btn--strong">
                    <Icon icon="archive" />Archive
                    </a>
                  </div>
                  <section className="contact-details-section">
                    <div >
                      <h2 className="detail-section-heading" id="contact-heading">Contact</h2>
                      <table id="property-manager-contact-table" className="accordion__table">
                        <tr>
                          <td id="property-manager-contact-table-cell">
                            First Name
                          </td>
                          <td>
                            {name}
                          </td>
                          <td className="pencil-icon-cell">
                            <Icon className="pencil-icon" icon="pencil"/>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Last Name
                          </td>
                          <td>
                            {name}
                          </td>
                          <td className="pencil-icon-cell">
                            <Icon className="pencil-icon" icon="pencil"/>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Phone
                          </td>
                          <td>
                            {number}
                          </td>
                          <td className="pencil-icon-cell">
                            <Icon className="pencil-icon" icon="pencil"/>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </section>
                  <section>
                    <h2 className="detail-section-heading">Properties</h2>
                    <div className="card-container">
                      {properties && properties.map(property => {
                        const { name, address} = property;
                        return(
                          <div className="property-card">
                            <ul className="property-card-list">
                              <li className="card-name">{name}</li>
                              <li>{address}</li>
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                  <section>
                    <h2 className="detail-section-heading">Tenants</h2>
                    <div className="card-container">
                      {tenants && tenants.map(tenant => {
                        const { name, phone, address } = tenant;
                        return(
                          <div className="tenant-card">
                            <ul className="tenant-card-list">
                              <li className="card-name">{name}</li>
                              <li>{phone}</li>
                              <li>{address}</li>
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  }

  PropertyManagerDetailsTwo.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired
  };

  export default PropertyManagerDetailsTwo;
