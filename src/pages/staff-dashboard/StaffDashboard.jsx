// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { intlShape, injectIntl } from 'react-intl';
// import { COMMON } from '../../translations/messages';
// import Header from '../../components/header/Header';
// import Navigation from '../../components/navigation/Navigation';
// import './StaffDashboard.scss';
// import Icon from '../../components/icon/Icon';
// import { getUsers } from '../../dux/user';
// 
// class StaffDashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.getUserData = this.getUserData.bind(this);
//     this.getUserGrid = this.getUserGrid.bind(this);
//   }
// 
//   componentWillMount() {
//     console.log(this.props);
//     const { dispatch } = this.props;
//     dispatch(getUsers());
//   }
// 
//   getUserData() {   
//     const users = this.props.users.users.length > 0 ? this.props.users.users : [];
//     return users.map(user => (this.getUserGrid(user)))
//   }
// 
//   getUserGrid (user) {
//     console.log(this.props);
//     return (
//       <div className="staff-card">
//         <h3><input type="checkbox" />{user.firstName} {user.lastName}</h3>
//         <p>test</p>
//       </div>
//     )
//   }
// 
//   render() {
//     const { intl } = this.props;
//     return(  
//     <div className="page">
//       <Header>
//         {() => (
//           <div>
//             <Navigation />
//             <Header.Label label={intl.formatMessage(COMMON.HELLO)} type="basic" />
//           </div>
//         )}
//       </Header>
//       <section className="property-dashboard-header">
//         <div className="add-new">
//           <h2 className="property-header">STAFF MEMBERS</h2>
//           <Link to="admin/add-new-property"><button type="button" className="btn btn--lrg add-new-btn"><Icon icon="plus"/> ADD NEW</button></Link>
//         </div>
//       </section>
//       <section className="staff-members-wrapper">      
//           <div className="staff-card-wrapper">
//             <div>
//               {this.getUserData()}
//             </div>
//           </div>
//       </section>
//     </div>
//   )}
// };
// 
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
// 
// export default injectIntl(connect(mapStateToProps)(StaffDashboard));