import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';
// import { CARD_TYPES } from '../../constants/constants';
import Icon from '../icon/Icon';
import './ConfirmationModal.scss';

class ConfirmationModal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (

//       <div className="modal" tabIndex="-1" role="dialog">
//   <div className="modal-dialog" role="document">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title">Modal title</h5>
//         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div className="modal-body">
//         <p>Modal body text goes here.</p>
//       </div>
//       <div className="modal-footer">
//         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//         <button type="button" className="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>
      <Card className="confirmCard" >
        <Card.Content className="card__content">
          <Icon icon="checkbox"/>
          <p className="title">
            {this.props.children}
          </p>
          <div className="button-container">
            <button className="cancel" onClick={this.props.onClose}
              type="button">
              Cancel
            </button>
            <button className="btn" onClick={this.props.onClose}
              type="button">
              Confirm
            </button>
          </div>
        </Card.Content>
      </Card>
      // <div className="confirmCard">
      //   <Card className="card__content">
      //     {this.props.children}
      //
      //     <div className="confirmFooter">
      //       <button onClick={this.props.onClose}
      //         type="button">
      //         Cancel
      //       </button>
      //       <button onClick={this.props.onClose}
      //         type="button">
      //         Confirm
      //       </button>
      //     </div>
      //   </Card>
      // </div>
    );
  }
}

ConfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default ConfirmationModal;
