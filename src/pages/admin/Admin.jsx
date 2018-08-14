import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import EmergencyContactsList from '../../components/emergency/EmergencyContactsList';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import Icon from '../../components/icon/Icon';
import { ROUTES } from '../../constants/constants';
import { ADMIN } from '../../translations/messages';

class Administration extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { intl } = this.props;
    return (
      <div className="admin page">
        <Header>
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
                          <Icon icon="plus" />
                          {intl.formatMessage(ADMIN.EMERGENCY_NUMS_CREATE)}
                        </strong>
                      </Link>
                    </li>
                  </ul>
                  <Link
                    to={ROUTES.EMERGENCY}
                    className="tab__link tab__link--right">
                    <Icon icon="asterisk" />
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </Header>

        <section className="main width-wrapper">
          <EmergencyContactsList />
        </section>
      </div>
    );
  }
}

Administration.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Administration);
