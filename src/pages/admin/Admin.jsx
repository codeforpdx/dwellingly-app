import React from 'react';
// import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
// import { injectIntl } from 'react-intl';
// import { Link } from 'react-router-dom';
// import EmergencyContactsList from '../../components/emergency/EmergencyContactsList';
// import EmergencyList from '../../components/emergency/EmergencyList';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
// import Icon from '../../components/icon/Icon';
// import { ROUTES } from '../../constants/constants';
// import { ADMIN } from '../../translations/messages';

// import { getUsers } from '../../dux/user'

class Administration extends React.Component {
  componentDidMount() {
    // const { dispatch } = this.props;
    window.scrollTo(0, 0);
    // TODO: I've commented out this action to get the collection of Users for now. It currently only updates the store
    // dispatch(getUsers());
  }

  render() {
    // const { intl } = this.props;
    return (
      <div className="admin page">
        <Header>
          {() => (
            <div>
              <Navigation />
              <Header.Label label="Administration" type="basic" />
              {/* <nav className="tabs">
                <div className="width-wrapper">
                  <ul>
                    <li className="tab">
                      <Link to= ROUTES.ADMIN_EMERGENCY >
                        <strong>
                          <Icon icon="asterisk" />
                          intl.formatMessage(ADMIN.EMERGENCY_NUMS_CREATE)
                        // </strong>
                      // </Link>
                    // </li>
                  // </ul>
                // </div>
                </nav> */}
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          {/* <EmergencyContactsList /> */}
          {/* <EmergencyList /> */}
        </section>
      </div>
    );
  }
}

Administration.propTypes = {
  // intl: intlShape.isRequired,
  // dispatch: PropTypes.func.isRequired
};

export default injectIntl(connect(null)(Administration))
