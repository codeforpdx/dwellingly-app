import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ContactsList from '../list/ContactsList';
import Icon from '../icon/Icon';

class EmergencyContactsList extends Component {
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
      <div>
        <div className="message message--light">
          <p>
            In the event of a life-threatening emergency with your JOIN tenants,
            please dial 911.<br />
            <br />
            <a href="tel:+911" className="btn btn--strong btn--lg btn--urgent">
              <Icon icon="phone" /> 911
            </a>
          </p>
        </div>
        <Query query={EMERGENCYNUM_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading Numbers...</div>;
            }
            if (error) {
              return (
                <div>
                  Error - Something went wrong with the EMERGENCYNUM_QUERY call!
                </div>
              );
            }
            return <ContactsList items={data.emergencyNumbers} />;
          }}
        </Query>
      </div>
    );
  }
}

export default EmergencyContactsList;
