import React, { Component } from 'react';
import Header from '../../components/header/Header';
import Icon from '../../components/icon/Icon';
import Navigation from '../../components/navigation/Navigation';
import './Reports.scss';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

render() {

  return(
    <div className="admin page">
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
              <div className="name-header-container">
                <h2 className="name-header">
                  Reports
                </h2>
                </div>
                <section className="contact-details-section">
                  <div>
                    <div className="table-header-container">
                      <div className="table-header-left">
                        <p>OPENED FROM</p>
                        <select>
                          <option>01/01/2018 - 12/31/2018</option>
                        </select>
                      </div>
                      <div className="table-header-right">
                        <p>Average time to close: </p>
                        <p>2 days, 4 hours</p>
                      </div>
                    </div>
                    <table className="accordion__table">
                      <tr className="table-row">
                        <td className="icon-container">
                          <Icon icon="heart" />
                        </td>
                        <td id="contact-table-cell">
                          25
                        </td>
                        <td>
                          Compliments
                        </td>
                      </tr>
                      <tr>
                        <td className="icon-container">
                          <Icon icon="comment" />
                        </td>
                        <td>
                          12
                        </td>
                        <td>
                          Unpaid Rent
                        </td>
                      </tr>
                      <tr>
                        <td className="icon-container">
                          <Icon icon="comment" />
                        </td>
                        <td>
                          3
                        </td>
                        <td>
                          Other Financial
                        </td>
                      </tr>
                      <tr>
                        <td className="icon-container">
                          <Icon icon="comment" />
                        </td>
                        <td>
                          0
                        </td>
                        <td>
                          Unauthorized Guests
                        </td>
                      </tr>
                      <tr>
                        <td className="icon-container">
                          <Icon icon="comment" />
                        </td>
                        <td>
                          1
                        </td>
                        <td>
                          Unit Conditions
                        </td>
                      </tr>
                      <tr>
                        <td className="icon-container">
                          <Icon icon="comment" />
                        </td>
                        <td>
                          0
                        </td>
                        <td>
                          Rule Violations
                        </td>
                      </tr>
                      <tr>
                        <td className="icon-container">
                          <Icon icon="comment" />
                        </td>
                        <td>
                          2
                        </td>
                        <td>
                          Noise
                        </td>
                      </tr>
                      <tr>
                        <td className="icon-container">
                          <Icon icon="comment" />
                        </td>
                        <td>
                          1
                        </td>
                        <td>
                          Property Damage
                        </td>
                      </tr>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Reports;
