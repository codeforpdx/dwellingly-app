import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';
import './ConfirmationModal.scss';

class ConfirmationModal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <Card className="confirmCard" >
        <Card.Content className="card__content">
          <p className="title">
            {this.props.children}
          </p>
          <div className="button-container">
            <button className="btn" id="yes-button" onClick={this.props.onClose}
              type="button">
              YES
            </button>
            <button className="cancel" onClick={this.props.onClose}
              type="button">
              NO
            </button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

ConfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default ConfirmationModal;
