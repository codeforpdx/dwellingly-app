import React, { Fragment } from 'react';
import dwellinglylogo from '../assets/images/dwellingly_logo_white.png';
import { MODULE_DATA, ACCESS_REQUEST_DATA } from '../components/DashboardModule/data';
import DashboardModule from '../components/DashboardModule';
import Collapsible from '../components/Collapsible';
import RequestItem from '../components/RequestItem';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
            areStaffAssigned: false,
        }
    }

    handleAddClick = (id) => {
        console.log('handle add access', id);
        //TODO: route to add page with id (or switch the click handler within requestItem to a traditional link)
    }

    handleDeclineClick = (id) => {
        //console.log('decline',id);
        this.setState({
            modalActive: true
        })
    }

    handleDenyAccess(doDeny) {
        this.setState({ modalActive: false });
        if (doDeny) {
            console.log('handle deny access');
            //TODO: handle deny access
        }
    }

    handleStaffAssignmentChange = () => {
        this.setState({
            areStaffAssigned: true, //TODO: should handle which dropdowns are selected and check to make sure that not all values are none, in which case this state should be set to false
        });
    }

    render() {
        return (
            <>
                <div className="dashboard__container">
                    <div className="dashboard__sidebar_container">
                        <div className="dashboard__sidebar_user_container">
                            <span className="icon dashboard__sidebar_user_icon">
                                <i className="fas fa-user"></i>
                            </span>
                            <span className="dashboard__sidebar_user_name">Raymond Holt</span>
                        </div>
                    </div>
                    <div className="dashboard__main_container">
                        <div className="dashboard__header">
                            <img className="dashboard__header_logo" src={dwellinglylogo} />
                        </div>
                        <div className="dashboard__main">
                            <h2 className="page-title">Admin Dashboard</h2>
                            <div className="dashboard__modules_container">
                                <DashboardModule
                                    data={MODULE_DATA.openTickets}
                                />
                                <DashboardModule
                                    data={MODULE_DATA.reports}
                                />
                                <DashboardModule
                                    data={MODULE_DATA.managers}
                                />
                            </div>
                            <Collapsible
                                title="New Staff Assignments"
                                count="3"
                            >
                                <div className="dashboard__assignments_container">
                                    <div className="collapsible__row columns">
                                        <div className="collapsible__col column">Tenant Name</div>
                                        <div className="collapsible__col column">
                                            Meerkat Manner<br />
                                            <span className="subtext">Property Manager Name</span>
                                        </div>
                                        <div className="dashboard__colapsible_col column">
                                            <div className="select is-rounded">
                                                <select
                                                    onChange={this.handleStaffAssignmentChange}
                                                >
                                                    <option>None</option>
                                                    <option>Staff Name</option>
                                                    <option>Staff Name 2</option>
                                                    <option>Staff Name 3</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="collapsible__row columns">
                                        <div className="collapsible__col column">Tenant Name</div>
                                        <div className="collapsible__col column">
                                            Meerkat Manner<br />
                                            <span className="subtext">Property Manager Name</span>
                                        </div>
                                        <div className="dashboard__colapsible_col column">
                                            <div className="select is-rounded">
                                                <select>
                                                    <option>None</option>
                                                    <option>Staff Name</option>
                                                    <option>Staff Name 2</option>
                                                    <option>Staff Name 3</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dashboard__assignments_button_container">
                                        <button className={`${this.state.areStaffAssigned && 'active'} dashboard__save_assignments_button button is-rounded`}>SAVE ASSIGNMENTS</button>
                                    </div>
                                </div>
                            </Collapsible>
                            <Collapsible
                                title="Request for Access"
                            >
                                {
                                    ACCESS_REQUEST_DATA.map((requestItemData, index) => {
                                        return (<RequestItem key={`requestItem--${index}`} data={requestItemData} onDeclineClick={this.handleDeclineClick} onAddClick={this.handleAddClick} />);
                                    })
                                }
                            </Collapsible>
                        </div>
                        <footer className="dashboard__footer">
                            <p className="dashboard__footer_logo_text">
                                <span className="bold">JOIN</span> 2018
                        </p>
                        </footer>
                    </div>
                </div>
                <div className={`modal ${this.state.modalActive && 'is-active'}`}>
                    <div className="modal-background" onClick={() => { this.handleDenyAccess(false) }}></div>
                    <div className="modal-content">
                        <div className="modal__message_container">
                            <div className="modal__message">
                                <h4>Are you sure you want to decline access?</h4>
                            </div>
                            <div className="modal__button_container">
                                <button className="button is-primary is-rounded" onClick={() => { this.handleDenyAccess(true) }}>YES</button>
                                <button className="button is-dark is-rounded" onClick={() => { this.handleDenyAccess(false) }}>NO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}