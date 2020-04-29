import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { UserContext } from '../App';
import { Link } from "react-router-dom"
import Accordion from '../components/Accordion';
import * as axios from 'axios';

const columns = [{
    dataField: 'name',
    text: 'Ticket',
    headerStyle: () => {
      return { width: "20%" };
    }
  }, {
    dataField: 'propertyManager',
    text: 'Sender',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    }
  }, {
    dataField: 'address',
    text: 'Assigned To',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    }
  }, {
    dataField: 'tenants',
    text: 'Created',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    }
  }, {
    dataField: 'dateAdded',
    text: 'Updated',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    }
  }];



export class Tickets extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        tickets: [],
        }

        this.getTickets = this.getTickets.bind(this)
    }    

    componentDidMount() {
        this.getTickets(this.context);
    }

    getTickets = (context) => {
        axios.get(`${process.env.REACT_APP_API_URL}/properties`, { headers: {"Authorization" : `Bearer ${context.user.accessJwt}`} })
        .then((response) => {
            this.setState({properties: response.data.properties});
        })
        .catch((error) => {
            alert(error);
            console.log(error);
        })
    }

    render() {
        return (
            <UserContext.Consumer>
                {session => {
                    this.context = session;
                    return (
                        <div className="tickets__container">
                            <div className="section-header">
                                <h2 className="page-title">Tickets</h2>
                            </div>
                            <div className="search-section">
                              <input class="input is-rounded" placeholder="Search by tenant, manager, property, or JOIN staff"></input>
                            </div>
                            <Accordion
                              icon={<i class="fas fa-filter"></i>}
                              header={"Filters"}
                            >
                              <div className="section-row">
                                <div className="filter-control">
                                  <label>Opened From</label>
                                  <input class="input is-rounded"></input>
                                </div>
                                <div className="filter-control">
                                  <label>Category</label>
                                  <div class="select is-rounded">
                                    <select>
                                      <option>All</option>
                                      <option>Complaints</option>
                                      <option>Maintenance</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="filter-control">
                                  <label>Status</label>
                                  <div class="buttons has-addons">
                                    <button class="button is-rounded btn-group">New </button>
                                    <button class="button is-rounded btn-group">In Progress</button>
                                    <button class="button is-rounded btn-group">Closed</button>
                                  </div>
                                </div>
                              </div>
                            </Accordion>
                            <div className="tickets-list">
                                <BootstrapTable
                                    keyField='id'
                                    data={ this.state.tickets }
                                    columns={ columns }
                                    bootstrap4={true}
                                    headerClasses="table-header"
                                    />
                            </div>
                        </div>
                    )
                }}
            </UserContext.Consumer>
        )
    }
}
