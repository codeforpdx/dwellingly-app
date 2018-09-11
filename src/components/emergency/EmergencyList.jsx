import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { getEmergencyNumbers } from '../../dux/emergencyNumbers';

import EmergencyNumber from './EmergencyNumber';
import './Emergency.scss';

class EmergencyList extends React.Component {
  componentWillMount() {
    console.log('Emergency list');
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getEmergencyNumbers());
  }

  render() {
    const { emergencyNumbers } = this.props;
    const EMERGENCYNUM_QUERY = gql`
      {
        emergencyNumbers(orderBy: sortOrder_ASC) {
          id
          title
          number01
          number02
        }
      }
    `;
    return (
      <div className="emergencyNumberList">
        <h2>
          Emergency List
        </h2>
        {emergencyNumbers.numbers.length > 0 &&
          emergencyNumbers.numbers.map(number =>
            console.log(number)
          )
        }
        <Query query={EMERGENCYNUM_QUERY}>
          { ({ loading, error, data }) => {
            if (loading) {
              return (
                <div>
                  Loading Numbers...
                </div>
              );
            }
            if (error) {
              return (
                <div>
                  Error - Something went wrong with the EMERGENCYNUM_QUERY call!
                </div>
              );
            }
            const emergencyNumbersList = data.emergencyNumbers;
            return (
              <div>
                {emergencyNumbersList.map(emergency => (
                  <EmergencyNumber
                    key={emergency.id}
                    emergency={emergency}
                  />))}
              </div>
            );
          }
        }
        </Query>
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
