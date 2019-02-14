import React from 'react';
import PropTypes from 'prop-types';
import './SuccessModal.scss';

class SuccessModal extends React.Component {
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
              id="yes-button" type="button"
              onClick={this.props.onClick}>
              Add Another
            </button>
            <button className="cancel" onClick={this.props.onClose}
              type="button">
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }
}

SuccessModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default SuccessModal;
