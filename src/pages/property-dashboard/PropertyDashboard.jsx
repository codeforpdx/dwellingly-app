import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { COMMON } from '../../translations/messages';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import './PropertyDashboard.scss';
import Icon from '../../components/icon/Icon';
import { getProperties } from '../../dux/properties';
import { getPropertyManagers } from '../../dux/propertyManagers';


// implement data from dux, mapped the store state to props. 

class PropertyDashboard extends Component {
  constructor(props) {
    super(props);
    this.getPropertyData = this.getPropertyData.bind(this);
    this.getTableRow = this.getTableRow.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch(getProperties());
    dispatch(getPropertyManagers());
  }

  getPropertyData() {
    // If I fetch here, and no result, return empty array
    // How to match number of tenants, date added, and managers to property objects?
    // Return array of all properties with added manager/tenants data?
    const properties = this.props.properties.properties.length > 0 ? this.props.properties.properties : [];
    return properties.map(property => (this.getTableRow(property)))
  }
  
  getTableRow (property) {
    console.log(this.props);
    return (
      <tr>
        <td><input type="checkbox" />{property.name}</td>
        <td>{property.city}</td>
        <td>{`${property.addressOne} ${property.addressTwo}`}</td>
        <td>{property.numberOfUnits}</td>
        <td>{property.state}</td>
      </tr>
    )
  }

  render() {
    const { intl } = this.props;
    return(  
    <div className="page">
      <Header>
        {() => (
          <div>
            <Navigation />
            <Header.Label label={intl.formatMessage(COMMON.HELLO)} type="basic" />
          </div>
        )}
      </Header>
      <section className="property-dashboard-header">
        <div className="add-new">
          <h2 className="property-header">PROPERTIES</h2>
          <button type="button" className="btn btn--lrg add-new-btn">+ ADD NEW</button>
        </div>
        <div className="property-search-wrapper">
        <Icon icon="search" />
          <input
            type="text"
            className="property-search"
            placeholder="search... " />
        </div>
      </section>
      <section className="property-dashboard-header property-table">
        <div className="gray-bar">
          <button type="button" className="btn archive-btn">ARCHIVE</button>
        </div>
        <div className="table-wrapper">
          <table>
            <tr>
              <th><input type="checkbox" /> Name</th>
              <th>Property Manager</th>
              <th>Address</th>
              <th>Tenants</th>
              <th>Date Added</th>
            </tr>
            {this.getPropertyData()}
          </table>
        </div>
      </section>
      <div className="next-button">
        <button type="button" className="btn next-btn">NEXT</button>
      </div>
    </div>
  )}
};

PropertyDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  properties: PropTypes.shape({
    properties: PropTypes.arrayOf(PropTypes.object)
  }),
  propertyManagers: PropTypes.shape({
    propertyManagers: PropTypes.arrayOf(PropTypes.object)
  })
}

PropertyDashboard.defaultProps = {
  properties: {properties: []},
  propertyManagers: {propertyManagers: []},
};

const mapStateToProps = state => ({
  properties: state.properties,
  propertyManagers: state.propertyManagers,
})

export default injectIntl(connect(mapStateToProps)(PropertyDashboard));