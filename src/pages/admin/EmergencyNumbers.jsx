import React from 'react';
import CreateEmergencyNumberForm from '../../components/forms/CreateEmergencyNumber';

class EmergencyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'create',
    };
  }

  componentWillMount() {
    console.log('Emergency list');
  }

  render() {
    let pageContent = 'Content one';

    if (this.state.mode === 'create') {
      pageContent = <CreateEmergencyNumberForm />;
    }

    return (
      <div>
        {pageContent}
      </div>
    );
  }
}

export default EmergencyList;
