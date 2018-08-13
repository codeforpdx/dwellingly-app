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
    // <h2>
    //   Emergency List
    // </h2>
    return (
      <div className="emergencyNumberList">
        <div className="emergencyImmediate">
          <p className="emergencyImmediateStatement">In an event of a life-threatening emergency with your JOIN tenants, please dial 911.</p>
          <button className="emergencyNumberButton" type="button">
            <Icon icon="phone" />
            <span className="emergencyNumberStatic">911</span>
          </button>
        </div>
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
