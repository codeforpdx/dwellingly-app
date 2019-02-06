import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Icon from '../../components/icon/Icon';
import Navigation from '../../components/navigation/Navigation';
import { properties, tenants } from '../../data'
import './PropertyManagerDetailsTwo.scss';


class PropertyManagerDetailsTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {

    return(
      <div className="admin page">
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
              <h2 className="propertyManagerName ">
                John Oliver
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
                      <td id="test">
                        First Name
                      </td>
                      <td>
                        John
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Last Name
                      </td>
                      <td>
                        Oliver
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Phone
                      </td>
                      <td>
                        (503) 123-1234
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
                        <ul className="test">
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
      )
    }
  }

  export default PropertyManagerDetailsTwo;
