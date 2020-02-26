import React from 'react';
import dwellinglylogo from '../assets/images/dwellingly_logo_white.png';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
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
                        <img className="dashboard__header_logo" src={dwellinglylogo}/>
                    </div>
                    <div className="dashboard__main">
                        <h2 className="page-title">Admin Dashboard</h2>
                    </div>
                </div>
                
            </div>
        )
    }
}