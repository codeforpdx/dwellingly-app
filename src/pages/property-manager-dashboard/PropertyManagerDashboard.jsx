import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import { intlShape, injectIntl } from 'react-intl';
import { COMMON } from '../../translations/messages';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import './PropertyManagerDashboard.scss';
import '../../components/search-form/SearchForm.scss';
import '../../components/input/Input.scss';
import SearchForm from '../../components/search-form/SearchForm';
import Icon from '../../components/icon/Icon';
import { getPropertyManagers } from '../../dux/propertyManagers';
import ParamsRenderer from './ParamsRenderer';
import DateUpdatedRenderer from './DateUpdatedRenderer';

class PropertyManagerDashboard extends Component {
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
          {
            headerName: 'Name',
            field: 'name',
            filter: 'agTextColumnFilter',
            // width: 180,
            sortable: true,
            checkboxSelection: true,
            unSortIcon: true,
            rowDrag: false,
            suppressMovable: true
          },
          {
            headerName: 'Property Id',
            field: 'leases',
            cellRendererFramework: ParamsRenderer,
            // width: 180,
            sortable: true,
            unSortIcon: true,
            rowDrag: false,
            suppressMovable: true
          },
          {
            headerName: 'Email',
            field: 'email',
            // width: 180,
            sortable: true,
            unSortIcon: true,
            rowDrag: false,
            suppressMovable: true
          },
          {
            headerName: 'Invited',
            field: 'email',
            // width: 180,
            sortable: true,
            unSortIcon: true,
            rowDrag: false,
            suppressMovable: true
          },
          {
            headerName: 'Last Usage',
            field: 'leases',
            cellRendererFramework: DateUpdatedRenderer,
            // width: 180,
            sortable: true,
            unSortIcon: true,
            rowDrag: false,
            suppressMovable: true
          }
        ]
      }
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch(getPropertyManagers());
  }

  handleSearch(event) {
    if (event) event.preventDefault();
    return this;
  }

  render() {
    const { intl } = this.props;
    return (
      <div className="page">
        <Header>
          {() => (
            <div>
              <Navigation />
              <Header.Label
                label={intl.formatMessage(COMMON.HELLO)}
                type="basic"
              />
              <SearchForm onSubmit={this.handleSearch} />
            </div>
          )}
        </Header>
        <section className="property-dashboard-header">
          <div className="add-new">
            <h2 className="property-header">PROPERTY MANAGERS</h2>
            <Link to="admin/add-new-property-manager">
              <button type="button" className="btn btn--lrg add-new-btn">
                <Icon icon="plus" /> ADD NEW
              </button>
            </Link>
          </div>
          <div className="search-and-archive">
            <form action="" className="search" onSubmit={this.handleSearch}>
              <div className="icon-wrapper">
                <Icon icon="search" />
                <input
                  type="search"
                  placeholder="Search property managers by name, property, or status . . ."
                />
              </div>
            </form>
            <div className="btn-archive archive-flex">
              ARCHIVED:
              <button type="button" className="switch__btn" />
            </div>
          </div>
        </section>
        <section className="property-dashboard-header property-table">
          <div className="gray-bar">
            <button type="button" className="btn archive-btn">
              <Icon icon="calendar" /> INVITE AGAIN
            </button>
            <button type="button" className="btn archive-btn">
              <Icon icon="archive" /> ARCHIVE
            </button>
          </div>
          <div className="ag-grid-wrapper">
            <AgGridReact
              gridOptions={this.state.gridOptions}
              defaultColDef={this.state.defaultColDef}
              columnDefs={this.state.columnDefs}
              rowData={
                this.props.propertyManagers.propertyManagers.length > 0
                  ? this.props.propertyManagers.propertyManagers
                  : []
              }
              pagination
              paginationPageSize={10}
            />
          </div>
        </section>
      </div>
    );
  }
}

PropertyManagerDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  propertyManagers: PropTypes.shape({
    propertyManagers: PropTypes.arrayOf(PropTypes.object)
  })
};

PropertyManagerDashboard.defaultProps = {
  propertyManagers: { propertyManagers: [] }
};

const mapStateToProps = state => ({
  propertyManagers: state.propertyManagers
});

export default injectIntl(connect(mapStateToProps)(PropertyManagerDashboard));
