import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Icon from '../icon/Icon';

import EmergencyNumber from './EmergencyNumber';
import './Emergency.scss';

class EmergencyList extends React.Component {
  componentWillMount() {
    console.log('Emergency list');
  }

  render() {
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

export default EmergencyList;
