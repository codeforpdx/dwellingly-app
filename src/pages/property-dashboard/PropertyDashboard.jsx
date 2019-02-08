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
import './PropertyDashboard.scss';
import Icon from '../../components/icon/Icon';
import { getProperties } from '../../dux/properties';
import { getPropertyManagers } from '../../dux/propertyManagers';


class PropertyDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
       gridOptions: {
        rowHeight: 50,
        defaultColDef: {
          filter: true
        },
        columnDefs: [
          {headerName: "Name", field: "name", filter: "agTextColumnFilter", sortable: true, checkboxSelection: true, unSortIcon: true },
          {headerName: "Property Manager", field: "city", cellClass: 'my-class', sortable: true, unSortIcon: true },
          {headerName: "Address", field: "addressOne", sortable: true, unSortIcon: true },
          {headerName: "Tenants", field: "numberOfUnits", sortable: true, unSortIcon: true },
          {headerName: "Date Added", field: "state", sortable: true, unSortIcon: true }
        ]
    }
  }
    // this.jsFunction = this.jsFunction.bind(this);
    // this.doesExternalFilterPass = this.doesExternalFilterPass.bind(this);
    // this.getPropertyData = this.getPropertyData.bind(this);
    // this.getTableRow = this.getTableRow.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch(getProperties());
    dispatch(getPropertyManagers());
  }

  // getPropertyData() {  
  //   // Do we need to update the current data query to include date the property (not lease?) is saved to db, as well as number of residents? Not all properties will have leases. 
  //   // Are we missing a foreign key to link managers to properties?  
  //   // If we are thinking of using server-side pagination, I'm not sure we should be mapping through multiple objects in the front-end to find those fields 
  //   const properties = this.props.properties.properties.length > 0 ? this.props.properties.properties : [];
  //   return properties.map(property => (this.getTableRow(property)))
  // }
  
  // getTableRow (property) {
  //   console.log(this.props);
  //   return (
  //     <tr>
  //       <td><input type="checkbox" />{property.name}</td>
  //       <td>{property.city}</td>
  //       <td>{property.addressOne} <br/> {property.addressTwo}</td>
  //       <td>{property.numberOfUnits}</td>
  //       <td>{property.state}</td>
  //     </tr>
  //   )
  // }
  
  // jsFunction(filterVal) {
  //   this.filterVal= filterVal;
  //   this.state.api.onFilterChanged(); 
  // }
  // 
  // doesExternalFilterPass(node) {
  //     if (this.filterVal) {
  //         return node.data.this.state.columnDefs === this.filterVal;
  //      }
  //     return true; // default case return all rows
  //    }

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
          <Link to="admin/add-new-property"><button type="button" className="btn btn--lrg add-new-btn"><Icon icon="plus"/> ADD NEW</button></Link>
        </div>
        <div className="search-and-archive">
          <form action="" className="search" onSubmit={this.handleSearch}>
            <div className="icon-wrapper">
              <Icon icon="search" />
              <input      
                // onChange={this.jsFunction(this.filterVal)}
                type="text"
                className="property-search"
                placeholder="Search properties by name, property, or status . . ." />
            </div>
          </form>
          <div>ARCHIVED:<button className="switch__btn" type="button">hide</button></div>
        </div>
      </section>
      <section className="property-dashboard-header property-table">
        <div className="gray-dash-bar">
          <div className="ghost-dot"> .</div>
          <button type="button" className="btn archive-btn"><Icon icon="archive"/> ARCHIVE</button>
        </div>
        {
        // <div className="table-wrapper">
        //   <table>
        //     <tr>
        //       <th><input type="checkbox" /> Name</th>
        //       <th>Property Manager</th>
        //       <th>Address</th>
        //       <th>Tenants</th>
        //       <th>Date Added</th>
        //     </tr>
        //     {this.getPropertyData()}
        //   </table>
        // </div>
      }
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

PropertyDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  properties: PropTypes.shape({
    properties: PropTypes.arrayOf(PropTypes.object)
  }),
  archivedProperties: PropTypes.shape({
    archivedProperties: PropTypes.arrayOf(PropTypes.object)
  }),
  propertyManagers: PropTypes.shape({
    propertyManagers: PropTypes.arrayOf(PropTypes.object)
  })
}

PropertyDashboard.defaultProps = {
  properties: {properties: []},
  archivedProperties: {archivedProperties: []},
  propertyManagers: {propertyManagers: []},
};

const mapStateToProps = state => ({
  properties: state.properties,
  archivedProperties: state.archivedProperties,
  propertyManagers: state.propertyManagers,
})

export default injectIntl(connect(mapStateToProps)(PropertyDashboard));