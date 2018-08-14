import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmergencyNumberEdit from '../forms/EmergencyNumberEdit';
import EmergencyNumberStatic from './EmergencyNumberStatic';

class EmergencyNumber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      doneEditing: false,
      title: '',
      number01: '',
      number02: ''
    }
    this.handleEditingNumber = this.handleEditingNumber.bind(this);
    this.handleChangedNumberField = this.handleChangedNumberField.bind(this);
    this.handleSavingNewEmergencyNumber = this.handleSavingNewEmergencyNumber.bind(this);
  }

  handleEditingNumber(prevState) {
    this.setState({ editing: !prevState.editing })
  }

  handleSavingNewEmergencyNumber(prevState) {
    this.setState({ doneEditing: !prevState.doneEditing })
    this.setState({ editing: !prevState.editing })
  }

  handleChangedNumberField(e) {
    const targetName = e.target.name;
    this.setState({
      [targetName]: e.target.value
    })
  }

  render() {
    const { emergency } = this.props;
    return (
      <div onClick={this.handleEditingNumber} role="presentation">
      {
        !this.state.editing ?
          <EmergencyNumberStatic
            emergency={emergency}
            doneEditing={this.state.doneEditing}
            newTitle={this.state.title}
            newNumber01={this.state.number01}
            newNumber02={this.state.number02} /> :
          <EmergencyNumberEdit
            id={emergency.id}
            title={emergency.title}
            number01={emergency.number01}
            number02={emergency.number02 !== null && emergency.number02 !== '' ? emergency.number02 : null }
            onCancellingEditEmergencyNumber={this.handleEditingNumber}
            onEditingEmergencyNumber={this.handleChangedNumberField}
            onSavingNewEmergencyNumber={this.handleSavingNewEmergencyNumber}
          />
      }
      </div>
    );
  }
}

EmergencyNumber.propTypes = {
  emergency: PropTypes.shape({
    title: PropTypes.string.isRequired,
    number01: PropTypes.string.isRequired,
    number02: PropTypes.string,
  }),
};

EmergencyNumber.defaultProps = {
  emergency: null,
};

export default EmergencyNumber;
