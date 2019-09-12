import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { intlShape, injectIntl } from 'react-intl';
import { COMMON } from '../../translations/messages';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import './TenantDashboard.scss';
import Icon from '../../components/icon/Icon';
import { getProperties } from '../../dux/properties';
import { getPropertyManagers } from '../../dux/propertyManagers';

class TenantDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
       gridOptions: {
        rowHeight: 55,
        headerHeight: 60,
        defaultColDef: {
          filter: true
        },
        columnDefs: [
          {headerName: "Name", field: "name", filter: "agTextColumnFilter", width: 250, sortable: true, checkboxSelection: true, unSortIcon: true, rowDrag: false, suppressMovable:true },
          {headerName: "Property", field: "city", width: 250, sortable: true, unSortIcon: true, rowDrag: false, suppressMovable:true },
          {headerName: "JOIN Staff", field: "addressOne", width:250, sortable: true, unSortIcon: true, rowDrag: false, suppressMovable:true },
          {headerName: "Added On", field: "numberOfUnits", width: 250,sortable: true, unSortIcon: true, rowDrag: false, suppressMovable:true }
        ]
    }
  }
}

  componentWillMount() {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch(getProperties());
    dispatch(getPropertyManagers());
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
          <h2 className="property-header">Tenants</h2>
          <Link to="admin/add-new-property"><button type="button" className="btn btn--lrg add-new-btn"><Icon icon="plus"/> ADD NEW</button></Link>
        </div>
        <div className="search-and-archive">
          <form action="" className="search" onSubmit={this.handleSearch}>
            <div className="icon-wrapper">
              <Icon icon="search" />
              <input      
                type="text"
                className="property-search"
                placeholder="Search properties by name, property, or status . . ." />
            </div>
          </form>
          <div>ARCHIVED:<button className="switch__btn" type="button">hide</button></div>
        </div>
      </section>
      <section className="property-dashboard-header property-table">
        <div className="gray-tenant-dash-bar">
          <div className="update-tenant">
            UPDATE
            <td className="tenant-update">
              <select>
                <option>JOIN Staff</option>
                <option>staff props tsuff</option>
                <option>staff props what it do</option>
              </select>
            </td>
          </div>
          <button type="button" className="btn archive-btn"><Icon icon="archive"/> ARCHIVE</button>
        </div>
        <div className="ag-grid-wrapper">
          <AgGridReact
            gridOptions={this.state.gridOptions}
            defaultColDef={this.state.defaultColDef}
            columnDefs={this.state.columnDefs}
            rowData={this.props.properties.properties.length > 0 ? this.props.properties.properties : []}
            pagination
            paginationPageSize={10}
          />    
        </div>
      </section>
    </div>
  )}
};

TenantDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  properties: PropTypes.shape({
    properties: PropTypes.arrayOf(PropTypes.object)
  }),
  propertyManagers: PropTypes.shape({
    propertyManagers: PropTypes.arrayOf(PropTypes.object)
  })
}

TenantDashboard.defaultProps = {
  properties: {properties: []},
  propertyManagers: {propertyManagers: []},
};

const mapStateToProps = state => ({
  properties: state.properties,
  propertyManagers: state.propertyManagers,
})

export default injectIntl(connect(mapStateToProps)(TenantDashboard));