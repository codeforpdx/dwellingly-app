import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { COMMON } from '../../translations/messages';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import './PropertyDashboard.scss';

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
      <div className="table-header">
      <table>
        <tr className="table-list">
          <td><input type="checkbox" />Name</td>
          <td>Property Manager</td>
          <td>Address</td>
          <td>Tenants</td>
        </tr>
      </table>
      </div>
      <table>
        <tr className="table-list">
          <td><input type="checkbox" />name</td>
          <td>property manager</td>
          <td>address</td>
          <td>tenants</td>
        </tr>
      </table>
      <hr/>
      <table>
        <tr className="table-list">
          <td><input type="checkbox" />name</td>
          <td>property manager</td>
          <td>address</td>
          <td>tenants</td>
        </tr>
      </table>
      <hr/>
    </section>
  </div>
);

PropertyDashboard.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(PropertyDashboard);