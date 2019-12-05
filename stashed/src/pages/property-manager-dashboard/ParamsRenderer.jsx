import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class ParamsRenderer extends Component {
    render() {
      console.log(this.props);
      const propertyId = this && this.props.value && this.props.value[0] && this.props.value[0].propertyId
        return (
          <span title={this.props.value}>{propertyId}</span>
        );
    }
};

ParamsRenderer.propTypes = {
  value: PropTypes.shape({

  })
}

ParamsRenderer.defaultProps = {
  value: {},
};