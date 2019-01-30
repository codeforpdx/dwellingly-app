import React from 'react';
import PropTypes from 'prop-types';
import './ConfirmationModal.scss';

class ConfirmationModal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="full-window-modal" >
        <div className="modal-content">
          <p className="title">
            {this.props.children}
          </p>
          <div className="button-container">
            <button form='newPropertyForm' className="btn"
              id="yes-button" type="submit"
              onClick={this.props.onSubmit}>
              YES
            </button>
            <button className="cancel" onClick={this.props.onClose}
              type="button">
              NO
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ConfirmationModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default ConfirmationModal;
