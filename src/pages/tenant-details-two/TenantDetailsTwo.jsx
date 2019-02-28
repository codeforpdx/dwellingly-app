import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import Icon from '../../components/icon/Icon';
import Navigation from '../../components/navigation/Navigation';
import { tenants } from '../../data'
import '../property-manager-details-two/PropertyManagerDetailsTwo.scss';

class TenantDetailsTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.tenant = tenants.find(
      ({ id }) => id === this.props.match.params.id
    );
  }

  render() {
    const { name, firstName, lastName, phone, address } = this.tenant;

    return(
      <div className="admin page">
        {this.tenant && (
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
                      <table className="accordion__table">
                        <tr>
                          <td id="contact-table-cell">
                            First Name
                          </td>
                          <td>
                            {firstName}
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
                            {lastName}
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
                            {phone}
                          </td>
                          <td className="pencil-icon-cell">
                            <Icon className="pencil-icon" icon="pencil"/>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Property
                          </td>
                          <td>
                            {address}
                          </td>
                          <td className="pencil-icon-cell">
                            <Icon className="pencil-icon" icon="pencil"/>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Unit
                          </td>
                          <td>
                            283
                          </td>
                          <td className="pencil-icon-cell">
                            <Icon className="pencil-icon" icon="pencil"/>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Occupants
                          </td>
                          <td>
                            3
                          </td>
                          <td className="pencil-icon-cell">
                            <Icon className="pencil-icon" icon="pencil"/>
                          </td>
                        </tr>
                      </table>
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

  TenantDetailsTwo.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired
  };

  export default TenantDetailsTwo;
