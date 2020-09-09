import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import UserContext from '../UserContext';
import Accordion from '../components/Accordion';
import * as axios from 'axios';

const columns = [{
    dataField: 'id',
    text: 'Ticket',
    headerStyle: () => {
      return { width: "10%" };
    }
  }, {
    dataField: 'sender',
    text: 'Sender',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    }
  }, {
    dataField: 'assigned',
    text: 'Assigned To',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    }
  }, {
    dataField: 'opened',
    text: 'Created',
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    }
  }, {
    dataField: 'updated',
    text: 'Updated',
    sort: true,
    headerStyle: () => {
      return { width: "10%" };
    }
  }];

const pageButtonRenderer = ({
  page,
  active,
  disable,
  title,
  onPageChange
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onPageChange(page);
  };
  if (title === 'previous page') {
    return (
      <li key={title} className="page-item">
        <a href="#" onClick={ handleClick } title={title} className='button is-rounded is-small' >Prev</a>
      </li>
    );
  }
  if (title === 'next page') {
    return (
      <li key={title} className="page-item">
        <a href="#" onClick={ handleClick } title={title}className='button is-rounded is-small' >Next</a>
      </li>
    );
  }
  if (active) {
    return (
      <li key={page} className="active page-item">
        <a href="#" onClick={ handleClick } title={title}>{ page }</a>
      </li>
    );
  }
  return (
    <li key={page} className="page-item">
      <a href="#" onClick={ handleClick } title={title}>{ page }</a>
    </li>
  );
};

const options = {
  // pageStartIndex: 0,
  sizePerPage: 5,
  hideSizePerPage: true,
  hidePageListOnlyOnePage: true,
  pageButtonRenderer
};

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
        axios.get(`/api/tickets`, { headers: {"Authorization" : `Bearer ${context.user.accessJwt}`} })
        .then((response) => {
            this.setState({tickets: response.data.tickets});
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
                        <>
                            <div className="section-header">
                                <h2 className="page-title">Tickets</h2>
                            </div>
                            <div className="search-section">
                              <input className="input is-rounded" placeholder="Search by tenant, manager, property, or JOIN staff"></input>
                            </div>
                            <Accordion
                              icon={<i className="fas fa-filter"></i>}
                              header={"Filters"}
                            >
                              <div className="section-row">
                                <div className="filter-control">
                                  <label>Opened From</label>
                                  <input className="input is-rounded"></input>
                                </div>
                                <div className="filter-control">
                                  <label>Category</label>
                                  <div className="select is-rounded">
                                    <select>
                                      <option>All</option>
                                      <option>Complaints</option>
                                      <option>Maintenance</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="filter-control">
                                  <label>Status</label>
                                  <div className="buttons has-addons">
                                    <button className="button is-rounded btn-group">New </button>
                                    <button className="button is-rounded btn-group">In Progress</button>
                                    <button className="button is-rounded btn-group">Closed</button>
                                  </div>
                                </div>
                              </div>
                            </Accordion>
                            <div className="tickets-list">
                                <BootstrapTable
                                    keyField='id'
                                    data={ this.state.tickets }
                                    columns={ columns }
                                    pagination={ paginationFactory(options) }
                                    bootstrap4={true}
                                    headerClasses="table-header"
                                    />
                            </div>
                        </>
                    )
                }}
            </UserContext.Consumer>
        )
    }
}
