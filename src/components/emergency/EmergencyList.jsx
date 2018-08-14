import React from 'react';

import EmergencyNumber from './EmergencyNumber';
import './Emergency.scss';

class EmergencyList extends React.Component {
  componentWillMount() {
    console.log('Emergency list');
  }



  render() {
    const emergencyNumbersList = [
      {
        id: '135135',
        number01: '503-111-1111',
        title: 'test',
      }
    ]
    return (
      <div className="emergencyNumberList">
        <h2>
          Emergency List
        </h2>
        <p>List of emergency numbers</p>
        {emergencyNumbersList.map(emergency => (
        <EmergencyNumber
          key={emergency.id}
          emergency={emergency}
        />))}
      </div>
    );
  }
}

export default EmergencyList;
