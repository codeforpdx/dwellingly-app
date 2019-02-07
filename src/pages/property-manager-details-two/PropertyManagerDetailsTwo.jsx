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
                  <h2 className="propertyManagerName">
                    {name}
                  </h2>
                  <a
                    href='/'
                    id="archive-button"
                    className="btn btn--strong">
                    <Icon icon="archive" />Archive
                    </a>
                  </div>
                  <section className="contactDetailsSection">
                    <div >
                      <h2 className="detailSectionHeading" id="contactHeading">Contact</h2>
                      <table className="accordion__table">
                        <tr>
                          <td id="contactTableCell">
                            First Name
                          </td>
                          <td>
                            {name}
                          </td>
                          <td className="pencilIconCell">
                            <Icon className="pencilIcon" icon="pencil"/>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Last Name
                          </td>
                          <td>
                            {name}
                          </td>
                          <td className="pencilIconCell">
                            <Icon className="pencilIcon" icon="pencil"/>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Phone
                          </td>
                          <td>
                            {number}
                          </td>
                          <td className="pencilIconCell">
                            <Icon icon="pencil"/>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </section>
                  <section>
                    <h2 className="detailSectionHeading">Properties</h2>
                    <div className="cardContainer">
                      {properties && properties.map(property => {
                        const { name, address} = property;
                        return(
                          <div className="propertyCard">
                            <ul>
                              <li className="cardName">{name}</li>
                              <li>{address}</li>
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                  <section>
                    <h2 className="detailSectionHeading">Tenants</h2>
                    <div className="cardContainer">
                      {tenants && tenants.map(tenant => {
                        const { name, phone, address} = tenant;
                        return(
                          <div className="tenantCard">
                            <ul>
                              <li className="cardName">{name}</li>
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
