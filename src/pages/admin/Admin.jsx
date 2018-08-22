import React from 'react';
// import { intlShape, injectIntl } from 'react-intl';
import { injectIntl } from 'react-intl';
// import { Link } from 'react-router-dom';
// import EmergencyContactsList from '../../components/emergency/EmergencyContactsList';
// import EmergencyList from '../../components/emergency/EmergencyList';
// import Header from '../../components/header/Header';
// import Navigation from '../../components/navigation/Navigation';
import Tile from '../../components/tile/Tile';
import Accordion from '../../components/accordion/Accordion';
// import Icon from '../../components/icon/Icon';
// import { ROUTES } from '../../constants/constants';
// import { ADMIN } from '../../translations/messages';

class Administration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion01: false,
      accordion02: true,
      accordion03: true
    }
    this.handleClosingAccordion = this.handleClosingAccordion.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClosingAccordion() {
    this.setState(prevState => ({ accordion01: !prevState.accordion01 }))
  }

  render() {
    // const { intl } = this.props;
    return (
      <div className="admin page page--light">
        {/* <Header>
          {() => (
            <div>
              <Navigation />
              <Header.Label label="Administration" type="basic" />
              <nav className="tabs">
                <div className="width-wrapper">
                  <ul>
                    <li className="tab">
                      <Link to={ROUTES.ADMIN_EMERGENCY}>
                        <strong>
                          <Icon icon="asterisk" />
                          {intl.formatMessage(ADMIN.EMERGENCY_NUMS_CREATE)}
                        </strong>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          )}
        </Header> */}

        <section className="main">
          <div className="width-wrapper">
            <h1 className="admin--header">Admin Dashboard</h1>
            <div className="admin__tiles">
              <Tile>
                <Tile.Top title="Open Tickets"/>
                <Tile.Content>
                  <Tile.Inner>
                    <h3><span className="count--number">4</span> <span className="count--type">NEW</span></h3>
                    <p><span className="count--number">2</span> <span className="count--type count--time">Unseen for 24 hours</span></p>
                  </Tile.Inner>
                  <Tile.Inner>
                    <h3><span className="count--number">34</span> <span className="count--type">IN PROGRESS</span></h3>
                    <p><span className="count--number">2</span> <span className="count--type count--time">Still in progress for 1 week</span></p>
                  </Tile.Inner>
                </Tile.Content>
              </Tile>
              <Tile>
                <Tile.Top title="Reports" />
                <Tile.Content>
                  <Tile.Inner>
                    <h3><span className="count--number">4</span> <span className="count--type">COMPLIMENTS</span></h3>
                    <p><span className="count--type count--time">in the last week</span></p>
                  </Tile.Inner>
                  <Tile.Inner>
                    <h3><span className="count--number">12</span> <span className="count--type">CLOSED TICKETS</span></h3>
                    <p><span className="count--type count--time">in the last week</span></p>
                  </Tile.Inner>
                </Tile.Content>
              </Tile>
              <Tile>
                <Tile.Top title="New PMs" />
                <Tile.Content>
                  <Tile.Inner>
                    <p>
                      <span>Today</span>
                      <span className="count--time">Property Manager Name</span>
                    </p>
                    <p>
                      <span>02/04</span>
                      <span className="count--time">Property Manager Name</span>
                    </p>
                    <p>
                      <span>01/14</span>
                      <span className="count--time">Property Manager Name</span>
                    </p>
                  </Tile.Inner>
                </Tile.Content>
              </Tile>
            </div>
          </div>
        </section>
        <section className="main main--white">
          <div className="width-wrapper">
            <Accordion>
              <Accordion.Label label="New Retention Assignments (4)" onToggle={() => this.handleClosingAccordion()}/>
              <Accordion.Table hidden={this.state.accordion01}/>
            </Accordion>
            <Accordion>
              <Accordion.Label label="Requests For Access" onToggle={() => this.handleClosingAccordion()}/>
              <Accordion.List hidden={this.state.accordion02} />
            </Accordion>
            <Accordion>
              <Accordion.Label label="Tenants Ready To Archive" onToggle={() => this.handleClosingAccordion()} />
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

Administration.propTypes = {
  // intl: intlShape.isRequired
};

export default injectIntl(Administration);
