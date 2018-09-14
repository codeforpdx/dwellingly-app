import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EmergencyNumberEdit from '../forms/EmergencyNumberEdit';
import EmergencyNumberStatic from './EmergencyNumberStatic';

import { editingEmergencyNumber } from '../../dux/emergencyNumbers';

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
    this.handleEditingNumber = this.handleEditingNumber.bind(this);
    this.handleChangedNumberField = this.handleChangedNumberField.bind(this);
    this.handleSavingNewEmergencyNumber = this.handleSavingNewEmergencyNumber.bind(this);
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

  handleChangedNumberField(e) {
    const targetName = e.target.name;
    this.setState({
      [targetName]: e.target.value
    })
  }

  render() {
    const { emergency } = this.props;
    // TODO: Get this working to parse text from numbers
    // const handleRemovingTextContentFromLink = (number) => {
    //   const textRegex = /[a-zA-Z]\D/g;
    //   const numberRegex = /[0-9]\S/g;
    //   if(number !== null || number !== '') {
    //     const textContent = number.match(textRegex);
    //     const numberContent = number.match(numberRegex);
    //     if(textContent !== null || numberContent !== null) {
    //       return {
    //         textContentOfNumber: textContent.join('').trim(),
    //         number: numberContent.join('')
    //       }
    //     }
    //   }
    //   return this
    // }
    return (
      <div>
      {
        !this.state.editing ?
          <EmergencyNumberStatic
            emergency={emergency}
            doneEditing={this.state.doneEditing}
            newContact={this.state.contact}
            newNumberOne={this.state.phoneNumberOne}
            newNumberTwo={this.state.phoneNumberTwo}
            newNumberThree={this.state.phoneNumberThree}
            onEditingNumber={this.handleEditingNumber} /> :
          <EmergencyNumberEdit
            id={emergency.id}
            contact={emergency.contact}
            numberOne={emergency.phoneNumberOne}
            numberTwo={emergency.phoneNumberTwo !== null && emergency.phoneNumberTwo !== '' ? emergency.phoneNumberTwo : null }
            numberThree={emergency.phoneNumberThree !== null && emergency.phoneNumberThree !== '' ? emergency.phoneNumberThree : null }
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
    phoneNumberThree: PropTypes.string
  }),
};

EmergencyNumber.defaultProps = {
  emergency: null,
};

export default connect(null)(EmergencyNumber);
