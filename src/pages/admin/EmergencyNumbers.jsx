import React from 'react';
import CreateEmergencyNumberForm from '../../components/forms/EmergencyNumberCreate';

class EmergencyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'create'
    };
  }

  render() {
    let pageContent = 'Content one';

    if (this.state.mode === 'create') {
      pageContent = <CreateEmergencyNumberForm />;
    }

    return <div className="page">{pageContent}</div>;
  }
}

export default EmergencyList;
