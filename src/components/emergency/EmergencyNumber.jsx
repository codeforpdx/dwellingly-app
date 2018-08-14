import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EmergencyNumber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
    this.handleEditingNumber = this.handleEditingNumber.bind(this);
  }

  handleEditingNumber(prevState) {
    this.setState({ editing: !prevState.editing })
  }

  render() {
    const { emergency } = this.props;
    return (
      <div onClick={this.handleEditingNumber} role="presentation">
      {!this.state.editing ?
        <div className="emergencyNumberRow" key={`row-${emergency.id}`}>
          <div className="emergencyTitle">
            {emergency.title}
          </div>
          <div className="emergencyNumberContainer">
            <div className="emergencyNumber">
              <a href={`tel:${emergency.number01}`}>
                {emergency.number01}
              </a>
            </div>
            {emergency.number02 !== null && emergency.number02 !== ''
              && (
              <div className="emergencyNumber">
                |&nbsp;&nbsp;&nbsp;<a href={`tel:${emergency.number02}`}>
                  {emergency.number02}
                </a>
              </div>
              )
            }
          </div>
        </div> :
        <div>Editing!!!!!!!</div>}
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
