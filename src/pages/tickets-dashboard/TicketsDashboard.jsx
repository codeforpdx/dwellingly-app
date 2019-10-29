import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { intlShape, injectIntl } from 'react-intl';
import { COMMON } from '../../translations/messages';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import './TicketsDashboard.scss';
import Icon from '../../components/icon/Icon';
import { getProperties } from '../../dux/properties';

class TicketsDashboard extends Component {
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
          {headerName: "Ticket", field: "name", filter: "agTextColumnFilter", width: 180, sortable: true, checkboxSelection: true, unSortIcon: true, rowDrag: false, suppressMovable:true },
          {headerName: "Sender", field: "city", width: 180, sortable: true, unSortIcon: true, rowDrag: false, suppressMovable:true },
          {headerName: "Assigned To", field: "addressOne", width:180, sortable: true, unSortIcon: true, rowDrag: false, suppressMovable:true },
          {headerName: "Created", field: "numberOfUnits", width: 180,sortable: true, unSortIcon: true, rowDrag: false, suppressMovable:true },
          {headerName: "Updated", field: "state", width: 180, sortable: true, unSortIcon: true, rowDrag: false, suppressMovable:true }
        ]
    }
  }
}

  componentWillMount() {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch(getProperties());
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
      <section className="tickets-dashboard-header">
        <div className="add-new">
          <h2 className="tickets-header">TICKETS</h2>
        </div>
        <div className="search-and-archive">
          <form action="" className="search" onSubmit={this.handleSearch}>
            <div className="icon-wrapper">
              <Icon icon="search" />
              <input      
                type="text"
                className="property-search"
                placeholder="Search by tenant, property, manager, or JOIN staff . . ." />
            </div>
          </form>
        </div>
      </section>
      <section className="tickets-dashboard-header tickets-table">
        <div className="gray-dash-bar-tickets">
        <div className="ticket-categories">
        <span className="filter-icon"><Icon icon="search" /></span>
          Opened From <span className="calendar-search"><Icon icon="calendar" /></span>
          <td>
            <select className="select-start">
              <option>01/01/2018 - 12/31/2018</option>
              <option><input type="checkbox" />option</option>
              <option><input type="checkbox" />option</option>
              <option><input type="checkbox" />option</option>
            </select>
          </td>
        </div>
        <div className="ticket-categories">
          Category
          <td>
            <select className="select-start">
              <option>All</option>
              <option><input type="checkbox" />option</option>
              <option><input type="checkbox" />option</option>
              <option><input type="checkbox" />option</option>
            </select>
          </td>
        </div>
        <div className="ticket-categories">
          Status
          <td>
            <select className="select-start">
              <option><input type="checkbox" />New</option>
              <option><input type="checkbox" />In progress</option>
              <option><input type="checkbox" />Closed</option>
              <option><input type="checkbox" />Resolved</option>
            </select>
          </td>
        </div>
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

TicketsDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  properties: PropTypes.shape({
    properties: PropTypes.arrayOf(PropTypes.object)
  })
}

TicketsDashboard.defaultProps = {
  properties: {properties: []}
};

const mapStateToProps = state => ({
  properties: state.properties
})

export default injectIntl(connect(mapStateToProps)(TicketsDashboard));