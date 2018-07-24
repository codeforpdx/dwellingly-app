import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
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
        <button type="button">
          {intl.formatMessage(ADMIN.EMERGENCY_NUMS_SHOW)}
        </button>
      </div>
    );
  }
}

Administration.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Administration);
