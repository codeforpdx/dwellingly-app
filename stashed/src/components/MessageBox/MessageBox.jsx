import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageBox extends Component {
  render() {
    const { user, message } = this.props;
    return (
      <div className={`msgbox${user ? ' msgbox--highlighted' : ''}`}>
        {message.split('\n').map(i => <p key={i}>{i}</p>)}
      </div>
    );
  }
}

MessageBox.propTypes = {
  user: PropTypes.string,
  message: PropTypes.string
};

MessageBox.defaultProps = {
  user: undefined,
  message: undefined
};

export default MessageBox;
