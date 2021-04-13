import React, { useState, useEffect, useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import UserContext from "../../UserContext";
import Accordion from "../../components/Accordion";
import { TicketModal } from "../../components/TicketModal";
import * as axios from "axios";
import Search from "../../components/Search/index";
import Toast from "../../utils/toast";

import "./tickets.scss";

const pageButtonRenderer = ({ page, active, disable, title, onPageChange }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onPageChange(page);
  };
  if (title === "previous page") {
    return (
      <li key={title} className="page-item">
        <a
          href="#"
          onClick={handleClick}
          title={title}
          className="button is-rounded is-small"
        >
          Prev
        </a>
      </li>
    );
  }
  if (title === "next page") {
    return (
      <li key={title} className="page-item">
        <a
          href="#"
          onClick={handleClick}
          title={title}
          className="button is-rounded is-small"
        >
          Next
        </a>
      </li>
    );
  }
  if (active) {
    return (
      <li key={page} className="active page-item">
        <a href="#" onClick={handleClick} title={title}>
          {page}
        </a>
      </li>
    );
  }
  return (
    <li key={page} className="page-item">
      <a href="#" onClick={handleClick} title={title}>
        {page}
      </a>
    </li>
  );
};

const options = {
  // pageStartIndex: 0,
  sizePerPage: 5,
  hideSizePerPage: true,
  hidePageListOnlyOnePage: true,
  pageButtonRenderer,
};

export function Tickets(props) {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const userContext = useContext(UserContext);

  const toggleTicketModal = (ticket) => {
    setSelectedTicket((prevState) => (prevState ? null : ticket));
  };

  const columns = [
    {
      dataField: "id",
      text: "Ticket",
      sort: true,
      formatter: (cell, row) => (
        <button
          onClick={() => toggleTicketModal(row)}
          className="link-button cell-align-left"
        >
          <p className="cell-header">{row.tenant}</p>
          <p className="cell-subheader">{row.issue}</p>
        </button>
      ),
      headerStyle: () => {
        return { width: "20%" };
      },
    },
    {
      dataField: "sender",
      text: "Sender",
      sort: true,
      headerStyle: () => {
        return { width: "20%" };
      },
    },
    {
      dataField: "assigned",
      text: "Assigned To",
      sort: true,
      headerStyle: () => {
        return { width: "20%" };
      },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      dataField: "created_at",
      text: "Created",
      sort: true,
      headerStyle: () => {
        return { width: "15%" };
      },
    },
    {
      dataField: "updated_at",
      text: "Updated",
      sort: true,
      headerStyle: () => {
        return { width: "15%" };
      },
    },
  ];

  const getTickets = (context) => {
    axios
      .get(`/api/tickets`, {
        headers: { Authorization: `Bearer ${context.user.accessJwt}` },
      })
      .then((response) => {
        setTickets(response.data.tickets);
      })
      .catch((error) => {
        Toast(error.message, "error");
        console.log(error);
      });
  };

  const setIsFilteredTicketsFalse = () => {
    setIsFiltered(false);
  };

  const setOutputState = (output, isTrue) => {
    setFilteredTickets(output);
    setIsFiltered(isTrue);
  };

  useEffect(() => {
    getTickets(userContext);
  }, [userContext]);

  return (
    <div className="main-container">
      <div>
        <div>
          <div className="section-header">
            <h2 className="page-title">Tickets</h2>
          </div>
          <Search
            input={tickets}
            outputLocation={filteredTickets}
            isFilteredLocation={isFiltered}
            setIsFilteredStateFalse={setIsFilteredTicketsFalse}
            setOutputState={setOutputState}
            placeholderMessage="Search by Ticket, Sender, Assignee, Status, or Date"
          />
          <Accordion icon={<i className="fas fa-filter"></i>} header="Filters">
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
                  <button className="button is-rounded btn-group">
                    In Progress
                  </button>
                  <button className="button is-rounded btn-group">
                    Closed
                  </button>
                </div>
              </div>
            </div>
          </Accordion>
          <div>
            <BootstrapTable
              keyField="id"
              data={isFiltered === true ? filteredTickets : tickets}
              columns={columns}
              pagination={paginationFactory(options)}
              defaultSortDirection="asc"
              bootstrap4={true}
              headerClasses="table-header"
              classes="full-size-table"
            />
          </div>
        </div>
        <TicketModal
          show={selectedTicket}
          onClose={toggleTicketModal}
          ticket={selectedTicket}
        ></TicketModal>
      </div>
    </div>
  );
}
