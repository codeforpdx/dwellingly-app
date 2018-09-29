import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getEmergencyNumbers } from '../../dux/emergencyNumbers';
import { ROUTES } from '../../constants/constants';
import { ADMIN } from '../../translations/messages';
import Icon from '../icon/Icon';

import EmergencyNumber from './EmergencyNumber';
import './Emergency.scss';

class EmergencyList extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getEmergencyNumbers());
  }

  render() {
    const { emergencyNumbers, intl } = this.props;
    return (
      <div className="emergencyNumberList">
        <div className="emergencyHeader">
          <h2>
            Emergency List
          </h2>
          <Link className="createEmergencyNumberLink" to={ROUTES.ADMIN_EMERGENCY}>
            <div className="emergencyCreateNumberIcon">
              <Icon icon="plus" />
            </div>
            {intl.formatMessage(ADMIN.EMERGENCY_NUMS_CREATE)}
          </Link>
        </div>
        {
          emergencyNumbers.numbers.length > 0 ?
          emergencyNumbers.numbers.map(number =>
            <EmergencyNumber
              key={number.id}
              emergency={number} />
          ) : 'Loading...'
        }
      </div>
    );
  }
}

EmergencyList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  emergencyNumbers: PropTypes.shape({}).isRequired,
}

const mapStateToProps = state => ({
  emergencyNumbers: state.emergencyNumbers,
})

export default injectIntl(connect(mapStateToProps)(EmergencyList));
