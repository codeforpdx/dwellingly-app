import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import EmergencyList from '../../components/emergency/EmergencyList';
import { ROUTES } from '../../constants/constants';
import { ADMIN } from '../../translations/messages';


class Administration extends React.Component {
  componentDidMount() {
    console.log('Admin panel ahoy-hoy');
  }

  render() {
    const { intl } = this.props;
    return (
      <div className="admin">
        <p>
          Administration
        </p>
        <div>
          <EmergencyList />
        </div>
        <Link to={ROUTES.ADMIN_EMERGENCY}>
          {intl.formatMessage(ADMIN.EMERGENCY_NUMS_CREATE)}
        </Link>
      </div>
    );
  }
}

Administration.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Administration);
