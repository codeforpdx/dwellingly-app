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
                        <img className="dashboard__header_logo" src={dwellinglylogo} />
                    </div>
                    <div className="dashboard__main">
                        <h2 className="page-title">Admin Dashboard</h2>
                        <div className="dashboard__modules_container">
                            <div className="dashboard__module">
                                <div className="dashboard__module_header">
                                    <h3 className="dashboard__module_title h2">Open Tickets</h3>
                                </div>
                                <div className="dashboard__module_row">
                                    <div className="dashboard__module_stat_container primary">
                                        <p className="dashboard__module_stat">4</p>
                                        <p className="dashboard__module_desc">New</p>
                                    </div>
                                    <div className="dashboard__module_stat_container">
                                        <p className="dashboard__module_stat">2</p>
                                        <p className="dashboard__module_desc">Unseen for > 24 hours</p>
                                    </div>
                                </div>
                                <div className="dashboard__module_row">
                                    <div className="dashboard__module_stat_container primary">
                                        <p className="dashboard__module_stat">32</p>
                                        <p className="dashboard__module_desc">In Progress</p>
                                    </div>
                                    <div className="dashboard__module_stat_container">
                                        <p className="dashboard__module_stat">2</p>
                                        <p className="dashboard__module_desc">In progress for > 1 week</p>
                                    </div>
                                </div>
                            </div>
                            <div className="column dashboard__module">
                                <div className="dashboard__module_header">
                                    <h3 className="dashboard__module_title h2">Reports</h3>
                                    <a href="#" className="dashboard__module_title_link">></a>
                                </div>
                                <div className="dashboard__module_row">
                                    <div className="dashboard__module_stat_container primary">
                                        <p className="dashboard__module_stat">4</p>
                                        <p className="dashboard__module_desc">Compliments
                                        <span className="dashboard__module_subtext">in the last week</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="dashboard__module_row">
                                    <div className="dashboard__module_stat_container primary">
                                        <p className="dashboard__module_stat">12</p>
                                        <p className="dashboard__module_desc">Closed tickets
                                        <span className="dashboard__module_subtext">in the last week</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="column dashboard__module">
                                <div className="dashboard__module_header">
                                    <h3 className="dashboard__module_title h2">New Property Managers</h3>
                                    <a href="#" className="dashboard__module_title_link">></a>
                                </div>
                                <div className="dashboard__module_row">
                                    <div className="dashboard__module_stat_container">
                                        <p className="dashboard__module_date">Today</p>
                                        <p className="dashboard__module_desc">Compliments
                                        <span className="dashboard__module_subtext">in the last week</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="dashboard__module_row">
                                    <div className="dashboard__module_stat_container">
                                        <p className="dashboard__module_date">02/04</p>
                                        <p className="dashboard__module_desc">Property Manager Name
                                        <span className="dashboard__module_subtext">Meerkat Manor</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="dashboard__module_row">
                                    <div className="dashboard__module_stat_container">
                                        <p className="dashboard__module_date">02/04</p>
                                        <p className="dashboard__module_desc">Property Manager Name
                                        <span className="dashboard__module_subtext">Meerkat Manor</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="collapsible">
                            <div className="dashboard__collapsible_header">
                                <h3 className="dashboard__collapsible_header_title">NEW STAFF ASSIGNMENTS <span className="count">(3)</span></h3>
                                <button href="#" className="dashboard__collapsible_toggle">></button>
                            </div>
                            <div className="dashboard__collapsible_row">
                                <div className="dashboard__collapsible_col">Tenant Name</div>
                                <div className="dashboard__collapsible_col">
                                    Meerkat Manner<br />
                                    <span class="subtext">Property Manager Name</span>
                                </div>
                                <div className="dashboard__colapsible_col select is-rounded">
                                    <select>
                                        <option>Staff Name</option>
                                        <option>Staff Name 2</option>
                                        <option>Staff Name 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="dashboard__collapsible_row">
                                <div className="dashboard__collapsible_col">Tenant Name</div>
                                <div className="dashboard__collapsible_col">
                                    Meerkat Manner<br />
                                    <span class="subtext">Property Manager Name</span>
                                </div>
                                <div className="dashboard__colapsible_col select is-rounded">
                                    <select>
                                        <option>Staff Name</option>
                                        <option>Staff Name 2</option>
                                        <option>Staff Name 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="collapsible">
                            <div className="dashboard__collapsible_header">
                                <h3 className="dashboard__collapsible_header_title">REQUEST FOR ACCESS</h3>
                                <button href="#" className="dashboard__collapsible_toggle">></button>
                            </div>
                            <div className="dashboard__collapsible_row">
                                <div className="dashboard__collapsible_col">Leann Lovejoy</div>
                                <div className="dashboard__collapsible_col">
                                    <a href="">propertymanager@email.com</a>
                                </div>
                                <div className="dashboard__collapsible_col">(503)123-1234</div>
                                <div className="dashboard__colapsible_col dashboard__collapsible_buttons">
                                    <button className="button is-primary is-rounded">ADD</button>
                                    <button className="button is-dark is-rounded">DECLINE</button>
                                </div>
                            </div>
                            <div className="dashboard__collapsible_row">
                                <div className="dashboard__collapsible_col">Leann Lovejoy</div>
                                <div className="dashboard__collapsible_col">
                                    <a href="">propertymanager@email.com</a>
                                </div>
                                <div className="dashboard__collapsible_col">(503)123-1234</div>
                                <div className="dashboard__colapsible_col dashboard__collapsible_buttons">
                                    <button className="button is-primary is-rounded">ADD</button>
                                    <button className="button is-dark is-rounded">DECLINE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="dashboard__footer">
                        <p className="dashboard__footer_logo_text">
                            <span class="bold">JOIN</span> 2018
                        </p>
                    </footer>
                </div>
            </div>
        )
    }
}