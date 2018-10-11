import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EmergencyNumberEdit from '../forms/EmergencyNumberEdit';
import EmergencyNumberStatic from './EmergencyNumberStatic';

import './Emergency.scss';

import { editingEmergencyNumber, archivingEmergencyNumber } from '../../dux/emergencyNumbers';

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
  }


  handleEditingNumber() {
    this.setState(prevState => ({ editing: !prevState.editing }))
  }

  handleSavingNewEmergencyNumber() {
    const { dispatch } = this.props;
    const { id, contact, phoneNumberOne, phoneNumberTwo, phoneNumberThree } = this.state;
    // const currentKey = Object.keys(this.state).map(numberItem => {
    //   const updatedNumberItem = this.state[numberItem];
    //   return {
    //     id,
    //     contact,
    //     phoneNumberOne,
    //     phoneNumberTwo,
    //     phoneNumberThree
    //   }
    // });
    // console.log(currentKey);
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
    // Parses Text from numbers and returns an object of key value pairs containg parsed data.
    // const handleRemovingTextContentFromLink = (number) => {
    //   const textRegex = /[a-zA-Z]\D/g;
    //   const numberRegex = /[0-9]\S/g;
    //   if(number !== null || number !== '') {
    //     const textContent = number.match(textRegex);
    //     const numberContent = number.match(numberRegex);
    //     if(textContent !== null && numberContent !== null) {
    //       return {
    //         textContentOfNumber: textContent.join('').trim(),
    //         number: numberContent.join('')
    //       }
    //     }
    //   }
    //   return number
    // }
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
