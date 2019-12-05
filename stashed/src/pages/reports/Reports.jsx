import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import Header from '../../components/header/Header';
import Icon from '../../components/icon/Icon';
import Navigation from '../../components/navigation/Navigation';
import ReportsTicketModal from '../../components/reports-ticket-modal/ReportsTicketModal';
import './Reports.scss';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }

    this.toggleReportsModal = this.toggleReportsModal.bind(this);

  }

  toggleReportsModal(event) {
    event.preventDefault();
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
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
                <h2 className="reports-title">
                  Reports
                </h2>
              </div>
              <section className="contact-details-section">
                <div>
                  <div className="table-header-container">
                    <div className="table-header-left">
                      <p className="table-header-text">OPENED FROM</p>
                      <select className="table-header-select">
                        <option>01/01/2018 - 12/31/2018</option>
                      </select>
                    </div>
                    <div className="table-header-right">
                      <p className="table-header-text">Average time to close: </p>
                      <p className="table-header-text">2 days, 4 hours</p>
                    </div>
                  </div>
                  <table id="reports-table" className="accordion__table">
                    <tr className="table-row" onClick={this.toggleReportsModal}>
                      <td className="icon-container">
                        <Icon icon="heart" />
                      </td>
                      <td id="reports-issue-table-cell">
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
        <ReportsTicketModal
          show={this.state.showModal}
          onClose={this.toggleReportsModal}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  properties: state.properties
})

export default injectIntl(connect(mapStateToProps)(Reports));
