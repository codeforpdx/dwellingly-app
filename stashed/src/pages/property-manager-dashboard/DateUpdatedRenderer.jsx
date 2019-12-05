import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class DateUpdatedRenderer extends Component {
    render() {
      console.log(this.props);
      const dateUpdated = this && this.props.value && this.props.value[0] && this.props.value[0].dateUpdated
        return (
          <span title={this.props.value}>{dateUpdated}</span>
        );
    }
};

DateUpdatedRenderer.propTypes = {
  value: PropTypes.shape({

  })
}

DateUpdatedRenderer.defaultProps = {
  value: {},
};