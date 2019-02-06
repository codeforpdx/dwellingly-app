import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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

class PropertyManagerDashboard extends Component {
  constructor(props) {
    super(props);
    this.getPropertyManagerData = this.getPropertyManagerData.bind(this);
    this.getTableRow = this.getTableRow.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch(getPropertyManagers());
  }

  getPropertyManagerData() { 
    const managers = this.props.propertyManagers.propertyManagers.length > 0 ? this.props.propertyManagers.propertyManagers : [];
    return managers.map(manager => (this.getTableRow(manager)))
  }
  
  getTableRow (manager) {
    console.log(this.props);
    return (
      <tr>
        <td><input type="checkbox" />{manager.name}</td>
        <td>{manager.leases[0].propertyId}</td>
        <td>{manager.email}</td>
        <td>Invited</td>
        <td>{manager.leases[0].dateUpdated}</td>
      </tr>
    )
  }
  
  handleSearch(event) {
    if (event) event.preventDefault();
    return this;
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
            <SearchForm onSubmit={this.handleSearch} />
          </div>
        )}
      </Header>
      <section className="property-dashboard-header">
        <div className="add-new">
          <h2 className="property-header">PROPERTY MANAGERS</h2>
          <Link to="admin/add-new-property-manager"><button type="button" className="btn btn--lrg add-new-btn"><Icon icon="plus"/> ADD NEW</button></Link>
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
          <div className="archive-flex">ARCHIVED:<button type="button" className="switch__btn" /></div>
        </div>
      </section>
      <section className="property-dashboard-header property-table">
        <div className="gray-bar">
          <button type="button" className="btn archive-btn"><Icon icon="calendar"/> INVITE AGAIN</button>
          <button type="button" className="btn archive-btn"><Icon icon="archive"/> ARCHIVE</button>
        </div>
        <div className="table-wrapper">
          <table>
            <tr>
              <th><input type="checkbox" /> Name</th>
              <th>Properties</th>
              <th>Email</th>
              <th>Status</th>
              <th>Last Usage</th>
            </tr>
            {this.getPropertyManagerData()}
          </table>
        </div>
      </section>
    </div>
  )}
};

PropertyManagerDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  propertyManagers: PropTypes.shape({
    propertyManagers: PropTypes.arrayOf(PropTypes.object)
  })
}

PropertyManagerDashboard.defaultProps = {
  propertyManagers: {propertyManagers: []},
};

const mapStateToProps = state => ({
  propertyManagers: state.propertyManagers,
})

export default injectIntl(connect(mapStateToProps)(PropertyManagerDashboard));