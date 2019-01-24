import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { COMMON } from '../../translations/messages';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import './PropertyDashboard.scss';
import { properties } from '../../data';

function getPropertyData() {
  // Match tenants and managers to property?
  // Return array of all properties with added data?
  return properties
}

function getTableRow(property) {
  return (
    <tr className="table-list">
      <td><input type="checkbox" />{property.name}</td>
      <td>{property.manager}</td>
      <td>{property.address}</td>
      <td>{property.tenants}</td>
      <td>{property.date}</td>
    </tr>
  )
}

const PropertyDashboard = ({ intl }) => (
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
        <p className="property-header">PROPERTIES<button type="button" className="btn btn--lrg add-new-btn">+ ADD NEW</button></p>
      </div>
      <input
        type="text"
        className="property-search"
        placeholder="search" />
    </section>
    <section className="property-dashboard-header property-table">
      <div className="gray-bar">
        <button type="button" className="btn archive-btn">ARCHIVE</button>
      </div>
      <div className="table-wrapper">
      {
        // Is there a table library for sorting/styling? 
      }
        <table>
          <tr className="table-list">
            <th><input type="checkbox" />Name</th>
            <th>Property Manager</th>
            <th>Address</th>
            <th>Tenants</th>
            <th>Date Added</th>
          </tr>
          {getPropertyData().map(property => (getTableRow(property)))}
        </table>
      </div>
      <hr/>
    </section>
  </div>
);

PropertyDashboard.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(PropertyDashboard);