import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
// import EmergencyContactsList from '../../components/emergency/EmergencyContactsList';
// import EmergencyList from '../../components/emergency/EmergencyList';
import Header from '../../components/header/Header';
// import Navigation from '../../components/navigation/Navigation';
import Tile from '../../components/tile/Tile';
import Accordion from '../../components/accordion/Accordion';

class Administration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion01: false,
      accordion02: false,
      accordion03: false
    };
    this.handleClosingAccordion = this.handleClosingAccordion.bind(this);
  }

  componentDidMount() {
    // const { dispatch } = this.props;
    window.scrollTo(0, 0);
    // TODO: I've commented out this action to get the collection of Users for now. It currently only updates the store
    // dispatch(getUsers());
  }

  handleClosingAccordion(currentSelected) {
    this.setState(prevState => ({
      [currentSelected]: !prevState[currentSelected]
    }));
  }

  render() {
    // const { intl } = this.props;
    return (
      <div className="admin page">
        <Header>
          {() => (
            <div>
              {/* <Navigation /> */}
              <Header.Label
                label="JOIN Messenger Administration"
                type="basic"
              />
              {/* <nav className="tabs">
                <div className="width-wrapper">
                  <ul>
                    <li className="tab">
                      <Link to= ROUTES.ADMIN_EMERGENCY >
                        <strong>
                          <Icon icon="asterisk" />
                          {intl.formatMessage(ADMIN.EMERGENCY_NUMS_CREATE)}
                        </strong>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav> */}
            </div>
          )}
        </Header>

        <section className="main">
          <div className="width-wrapper">
            <h2 className="admin--header">Admin Dashboard</h2>
            <div className="admin__tiles">
              <Tile>
                <Tile.Top title="Open Tickets" />
                <Tile.Content>
                  <Tile.Inner>
                    <div className="count--container">
                      <h3>
                        <span className="count--number">4</span>
                      </h3>
                      <p>
                        <span className="count--number">2</span>
                      </p>
                    </div>
                    <div className="count--container">
                      <h3>
                        <span className="count--type">NEW</span>
                      </h3>
                      <p>
                        <span className="count--type count--time">
                          Unseen for 24 hours
                        </span>
                      </p>
                    </div>
                  </Tile.Inner>
                  <Tile.Inner>
                    <div className="count--container">
                      <h3>
                        <span className="count--number">34</span>
                      </h3>
                      <p>
                        <span className="count--number">2</span>
                      </p>
                    </div>
                    <div className="count--container">
                      <h3>
                        <span className="count--type">IN PROGRESS</span>
                      </h3>
                      <p>
                        <span className="count--type count--time">
                          Still in progress for 1 week
                        </span>
                      </p>
                    </div>
                  </Tile.Inner>
                </Tile.Content>
              </Tile>
              <Tile>
                <Tile.Top title="Reports" />
                <Tile.Content>
                  <Tile.Inner>
                    <div className="count--container">
                      <h3>
                        <span className="count--number">4</span>
                      </h3>
                    </div>
                    <div className="count--container">
                      <h3>
                        <span className="count--type">COMPLIMENTS</span>
                      </h3>
                      <p>
                        <span className="count--type count--time">
                          in the last week
                        </span>
                      </p>
                    </div>
                  </Tile.Inner>
                  <Tile.Inner>
                    <div className="count--container">
                      <h3>
                        <span className="count--number">12</span>
                      </h3>
                    </div>
                    <div className="count--container">
                      <h3>
                        <span className="count--type">CLOSED TICKETS</span>
                      </h3>
                      <p>
                        <span className="count--type count--time">
                          in the last week
                        </span>
                      </p>
                    </div>
                  </Tile.Inner>
                </Tile.Content>
              </Tile>
              <Tile>
                <Tile.Top title="New PMs" />
                <Tile.Content>
                  <Tile.Inner>
                    <ul>
                      <li className="count--time">
                        <span className="count--date">Today</span>
                        <div>
                          <p>Property Manager Name</p>
                          <p>Meerkat Manor</p>
                        </div>
                      </li>
                      <li className="count--time">
                        <span className="count--date">02/04</span>
                        <div>
                          <p>Property Manager Name</p>
                          <p>Meerkat Manor</p>
                        </div>
                      </li>
                      <li className="count--time">
                        <span className="count--date">01/14</span>
                        <div>
                          <p>Property Manager Name</p>
                          <p>Meerkat Manor</p>
                        </div>
                      </li>
                    </ul>
                  </Tile.Inner>
                </Tile.Content>
              </Tile>
            </div>
          </div>
        </section>
        <section className="main main--white">
          <div className="width-wrapper">
            <Accordion>
              <Accordion.Label
                label="NEW STAFF ASSIGNMENTS (3)"
                onToggle={() => this.handleClosingAccordion('accordion01')}
              />
              <Accordion.Table hidden={this.state.accordion01} />
            </Accordion>
            <Accordion>
              <Accordion.Label
                label="REQUESTS FOR ACCESS"
                onToggle={() => this.handleClosingAccordion('accordion02')}
              />
              <Accordion.List hidden={this.state.accordion02} />
            </Accordion>
            <Accordion>
              <Accordion.Label
                label="TENANTS READY TO ARCHIVE"
                onToggle={() => this.handleClosingAccordion('accordion03')}
              />
              <Accordion.Select hidden={this.state.accordion03} />
            </Accordion>
          </div>
        </section>
        {/* <section className="main width-wrapper">
          <EmergencyContactsList />
          <EmergencyList />
        </section> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

Administration.propTypes = {
  user: PropTypes.shape({}).isRequired
  // intl: intlShape.isRequired,
  // dispatch: PropTypes.func.isRequired
};

export default injectIntl(connect(mapStateToProps)(Administration));
