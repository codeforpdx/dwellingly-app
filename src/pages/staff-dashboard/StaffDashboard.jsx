import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { COMMON } from '../../translations/messages';
import Header from '../../components/header/Header';
import Navigation from '../../components/navigation/Navigation';
import './StaffDashboard.scss';
import Icon from '../../components/icon/Icon';
import { getProperties } from '../../dux/properties';
import { getPropertyManagers } from '../../dux/propertyManagers';

class StaffDashboard extends Component {
  constructor(props) {
    super(props);
    this.getUserData = this.getUserData.bind(this);
    this.getUserGrid = this.getUserGrid.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch(getProperties());
    dispatch(getPropertyManagers());
  }

  getUserData() {   
    const users = this.props.propertyManagers.propertyManagers.length > 0 ? this.props.propertyManagers.propertyManagers : [];
    return users.map(user => (this.getUserGrid(user)))
  }

  getUserGrid (user) {
    console.log(this.props);
    return (   
        <div className="staff-card">
          <div className="staff-header">
            <h2>{user.name}</h2> <Icon icon="archive"/>
          </div>
          <div className="email-and-number">
            <p>{user.phone}</p>
            <p>{user.email}</p>
          </div>
          <p className="out-of-office">Set out of office  <Link to="/settings/out-of-office"><Icon icon="arrowRight"/></Link> </p>
          <div className="staff-info">
            <p>12 open tickets</p>
            <p>58 Tenants</p>
          </div>
          <p className="reassign">Reassign  <Icon icon="arrowRight"/> </p>
        </div>
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
      <section className="staff-dashboard-header">
        <div className="staff-banner">
          <div className="add-new-flex">
            <h2>JOIN Staff</h2>
          <button type="button" className="btn btn--lrg add-new-btn"><Icon icon="plus"/> ADD NEW</button>
          </div>
            <div>
              ARCHIVED:<button className="switch__btn" type="button">hide</button>
            </div>
        </div>
      </section> 
      <section>    
        <div className="staff-dash-container">
          {this.getUserData()}
        </div>
      </section>
  </div>
  )}
};

// StaffDashboard.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   intl: intlShape.isRequired,
//   users: PropTypes.shape({
//     users: PropTypes.arrayOf(PropTypes.object)
//   }),
// }
// 
// StaffDashboard.defaultProps = {
//   users: {users: []},
// };
// 
// const mapStateToProps = state => ({
//   users: state.users,
// })

StaffDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  propertyManagers: PropTypes.shape({
    propertyManagers: PropTypes.arrayOf(PropTypes.object)
  })
}

StaffDashboard.defaultProps = {
  propertyManagers: {propertyManagers: []},
};

const mapStateToProps = state => ({
  propertyManagers: state.propertyManagers,
})

export default injectIntl(connect(mapStateToProps)(StaffDashboard));