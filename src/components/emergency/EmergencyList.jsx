import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmergencyNumbers } from '../../dux/emergencyNumbers';

import EmergencyNumber from './EmergencyNumber';
import './Emergency.scss';

class EmergencyList extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getEmergencyNumbers());
  }

  render() {
    const { emergencyNumbers } = this.props;
    console.log(emergencyNumbers);
    return (
      <div className="emergencyNumberList">
        <h2>
          Emergency List
        </h2>
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
  emergencyNumbers: PropTypes.shape({}).isRequired,
}

const mapStateToProps = state => ({
  emergencyNumbers: state.emergencyNumbers,
})

export default connect(mapStateToProps)(EmergencyList);
