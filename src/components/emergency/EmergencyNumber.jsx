import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EmergencyNumberEdit from '../forms/EmergencyNumberEdit';
import EmergencyNumberStatic from './EmergencyNumberStatic';

import './Emergency.scss';

import { editingEmergencyNumber, archivingEmergencyNumber, deletingEmergencyNumber } from '../../dux/emergencyNumbers';

class EmergencyNumber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      doneEditing: false,
      id: this.props.emergency.id,
      contact: this.props.emergency.contact,
      phoneNumberOne: this.props.emergency.phoneNumberOne,
      phoneNumberTwo: this.props.emergency.phoneNumberTwo,
      phoneNumberThree: this.props.emergency.phoneNumberThree
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleEditingNumber = this.handleEditingNumber.bind(this);
    this.handleChangedNumberField = this.handleChangedNumberField.bind(this);
    this.handleSavingNewEmergencyNumber = this.handleSavingNewEmergencyNumber.bind(this);
    this.handleArchivingEmergencyNumber = this.handleArchivingEmergencyNumber.bind(this);
    this.handleDeletingEmergencyNumber = this.handleDeletingEmergencyNumber.bind(this);
  }


  handleEditingNumber() {
    this.setState(prevState => ({ editing: !prevState.editing }))
  }

  handleSavingNewEmergencyNumber() {
    const { dispatch } = this.props;
    const { id, contact, phoneNumberOne, phoneNumberTwo, phoneNumberThree } = this.state;
    dispatch(editingEmergencyNumber({
      id,
      contact,
      phoneNumberOne,
      phoneNumberTwo,
      phoneNumberThree
    }));
    this.setState(prevState => ({ doneEditing: !prevState.doneEditing }))
  }

  handleArchivingEmergencyNumber() {
    const { dispatch } = this.props;
    const { id, contact, phoneNumberOne, phoneNumberTwo, phoneNumberThree } = this.state;
    dispatch(archivingEmergencyNumber({
      id,
      contact,
      phoneNumberOne,
      phoneNumberTwo,
      phoneNumberThree
    }));
  }

  handleDeletingEmergencyNumber() {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch(deletingEmergencyNumber(id))
  }

  handleChange(event) {
    const { target } = event;
    const { name } = target;
    const { value } = target;

    this.setState({
      [name]: value
    })
  }

  handleChangedNumberField(e) {
    const { target } = e;
    const { name } = target;
    const { parentElement } = target;
    const { value } = target;
    const targetName = name;
    const parentName = parentElement.name;
    this.setState(prevState => ({
      [parentName]: {
        ...prevState[parentName],
        [targetName]: value
      }
    }))
  }

  render() {
    const { emergency } = this.props;
    const { contact, id, phoneNumberOne, phoneNumberTwo, phoneNumberThree } = emergency;
    return (
      <div className="emergencyNumberRow">
      {
        !this.state.editing ?
          <EmergencyNumberStatic
            emergency={emergency}
            doneEditing={this.state.doneEditing}
            newContact={this.state.contact}
            newNumberOne={this.state.phoneNumberOne}
            newNumberTwo={this.state.phoneNumberTwo}
            newNumberThree={this.state.phoneNumberThree}
            onArchivingNumber={this.handleArchivingEmergencyNumber}
            onEditingNumber={this.handleEditingNumber} /> :
          <EmergencyNumberEdit
            id={id}
            contact={contact}
            numberOne={phoneNumberOne}
            numberTwo={phoneNumberTwo !== '' && phoneNumberTwo }
            numberThree={phoneNumberThree !== '' && phoneNumberThree }
            onCancellingEditEmergencyNumber={this.handleEditingNumber}
            onEditingEmergencyText={this.handleChange}
            onEditingEmergencyNumber={this.handleChangedNumberField}
            onSavingNewEmergencyNumber={this.handleSavingNewEmergencyNumber}
            onDeletingEmergencyNumber={this.handleDeletingEmergencyNumber}
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
    phoneNumberOne: PropTypes.shape({}).isRequired,
    phoneNumberTwo: PropTypes.shape({}),
    phoneNumberThree: PropTypes.shape({}),
    subtext: PropTypes.any
  }),
};

EmergencyNumber.defaultProps = {
  emergency: null,
};

export default connect(null)(EmergencyNumber);
