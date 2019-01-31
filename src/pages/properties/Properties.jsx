import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProperties } from '../../dux/properties';

class Properties extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProperties());
    // dispatch(creatingProperty({
    //   addressOne: '1234 Yellowbrick Rd',
    //   addressTwo: '',
    //   numberOfUnits: '2',
    //   city: 'Neverland',
    //   name: 'Somewhere in the Wizard of Oz',
    //   state: 'Kansas',
    //   zipCode: 23456
    // }))
  }

  render() {
    return (
      <div className="page">
        Properties Page
      </div>
    )
  }
};

Properties.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(null)(Properties);
