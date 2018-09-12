import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EmergencyNumberEdit from '../forms/EmergencyNumberEdit';
import EmergencyNumberStatic from './EmergencyNumberStatic';

import { onEditingEmergencyNumber } from '../../dux/emergencyNumbers';

class EmergencyNumber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      doneEditing: false,
      id: this.props.emergency.id,
      contact: '',
      phoneNumberOne: '',
      phoneNumberTwo: ''
    }
    this.handleEditingNumber = this.handleEditingNumber.bind(this);
    this.handleChangedNumberField = this.handleChangedNumberField.bind(this);
    this.handleSavingNewEmergencyNumber = this.handleSavingNewEmergencyNumber.bind(this);
  }

  handleEditingNumber() {
    this.setState(prevState => ({ editing: !prevState.editing }))
  }

  handleSavingNewEmergencyNumber() {
    const { dispatch } = this.props;
    const { id, contact, phoneNumberOne, phoneNumberTwo } = this.state;
    dispatch(onEditingEmergencyNumber({
      id,
      contact,
      phoneNumberOne,
      phoneNumberTwo,
    }));
    this.setState(prevState => ({ doneEditing: !prevState.doneEditing }))
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
      <div>
      {
        !this.state.editing ?
          <EmergencyNumberStatic
            emergency={emergency}
            doneEditing={this.state.doneEditing}
            newContact={this.state.contact}
            newNumber01={this.state.phoneNumberOne}
            newNumber02={this.state.phoneNumberTwo}
            onEditingNumber={this.handleEditingNumber} /> :
          <EmergencyNumberEdit
            id={emergency.id}
            contact={emergency.contact}
            number01={emergency.phoneNumberOne}
            number02={emergency.phoneNumberTwo !== null && emergency.phoneNumberTwo !== '' ? emergency.phoneNumberTwo : null }
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
  dispatch: PropTypes.func.isRequired,
  emergency: PropTypes.shape({
    id: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    phoneNumberOne: PropTypes.string.isRequired,
    phoneNumberTwo: PropTypes.string,
  }),
};

EmergencyNumber.defaultProps = {
  emergency: null,
};

export default connect(null)(EmergencyNumber);
