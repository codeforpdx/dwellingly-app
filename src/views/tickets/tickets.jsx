import React, { useState, useEffect, useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Form, Field, Formik } from "formik";
import paginationFactory from "react-bootstrap-table2-paginator";
import UserContext from "../../UserContext";
import Accordion from "../../components/Accordion";
import { TicketModal } from "../../components/TicketModal";
import * as axios from "axios";
import Search from "../../components/Search/index";
import Toast from "../../utils/toast";
import CalendarModal, {
  useCalendarState,
} from "../../components/CalendarModal/CalendarModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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

  const [status, setStatus] = useState(null);
  const [statusIsFiltered, setStatusIsFiltered] = useState(false);
  const [filteredStatusTickets, setFilteredStatusTickets] = useState([]);

  const [filtersOn, setFiltersOn] = useState(false);
  const [combinedTickets, setCombinedTickets] = useState([]);

  console.log(combinedTickets);

  const [filteredDates, setFilteredDates] = useState([]);
  const [datesInput, setDatesInput] = useState("");
  const [dateIsFiltered, setDateIsFiltered] = useState(false);

  const userContext = useContext(UserContext);

  const calendarState = useCalendarState();
  const { dateTimeStart, dateTimeEnd } = calendarState;

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

  const updateFilteredStatus = (e) => {
    if (!statusIsFiltered) {
      setStatusIsFiltered(true); // create if/else to avoid repetition
    }
    setStatus(e.target.innerHTML);
  };

  const updateFilteredOutputState = () => {
    let filteredSet = tickets.filter((ticket) => ticket.status === status);
    setFilteredStatusTickets(filteredSet);
  };

  const updateSearchDates = () => {
    let filteredSet = [];
    for (let i = 0; i < tickets.length; i++) {
      let createdAt = new Date(tickets[i].created_at);
      let updatedAt = new Date(tickets[i].updated_at);

      if (
        (createdAt >= dateTimeStart && createdAt <= dateTimeEnd) ||
        (updatedAt >= dateTimeStart && updatedAt <= dateTimeEnd)
      ) {
        filteredSet.push(tickets[i]);
      }
    }

    console.log(filteredSet);
    setFilteredDates(filteredSet);
  };

  const combineSearchAndStatusFilters = () => {
    let searchStatusFiltered = [];

    if (filteredTickets.length > 0 && filteredStatusTickets.length > 0) {
      for (let i = 0; i < filteredStatusTickets.length; i++) {
        filteredTickets.forEach((item) => {
          if (filteredStatusTickets[i].id === item.id) {
            searchStatusFiltered.push(item);
          }
        });
      }
      console.log(searchStatusFiltered);
      return searchStatusFiltered;
    } else if (isFiltered && statusIsFiltered) {
      console.log(searchStatusFiltered);
      return searchStatusFiltered;
    } else if (isFiltered) {
      console.log(filteredTickets);
      return filteredTickets;
    } else if (statusIsFiltered) {
      console.log(filteredStatusTickets);
      return filteredStatusTickets;
    } else {
      console.log(searchStatusFiltered);
      return searchStatusFiltered;
    }
  };

  const combineDatesFinalFilter = (searchStatusArray) => {
    let finalFilteredArray = [];

    console.log(filteredDates);
    if (searchStatusArray.length > 0 && filteredDates.length > 0) {
      for (let i = 0; i < filteredDates.length; i++) {
        searchStatusArray.forEach((item) => {
          if (filteredDates[i].id === item.id) {
            finalFilteredArray.push(item);
          }
        });
      }
      console.log(finalFilteredArray);
      setCombinedTickets(finalFilteredArray);
    } else if (searchStatusArray.length > 0 && !dateIsFiltered) {
      setCombinedTickets(searchStatusArray);
    } else if (searchStatusArray.length > 0 && filteredDates.length === 0) {
      setCombinedTickets([]);
    } else if ((isFiltered || statusIsFiltered) && dateIsFiltered) {
      setCombinedTickets([]);
    } else if (searchStatusArray.length === 0) {
      setCombinedTickets(filteredDates);
    }
    setFiltersOn(true);
  };

  const updateDates = () => {
    if (dateTimeEnd !== dateTimeStart) {
      setDateIsFiltered(true);
      setDatesInput(
        `${dateTimeStart.toDateString()} - ${dateTimeEnd.toDateString()}`
      );
      updateSearchDates();
    } else {
      setDateIsFiltered(false);
      setDatesInput("");
    }
  };

  const clearStatusFilter = () => {
    setStatus(null);
    setStatusIsFiltered(false);
    setFilteredStatusTickets([]);
  };

  const showData = () => {
    if (filtersOn) {
      return combinedTickets;
    } else if (isFiltered) {
      return filteredTickets;
    } else if (statusIsFiltered) {
      return filteredStatusTickets;
    } else if (dateIsFiltered) {
      return filteredDates;
    } else {
      return tickets;
    }
  };

  useEffect(() => {
    getTickets(userContext);
    if (statusIsFiltered && status) {
      updateFilteredOutputState();
    }
  }, [userContext, status, statusIsFiltered]);

  useEffect(() => {
    // updateSearchDates();
    updateDates();
    // updateSearchDates();
  }, [dateTimeStart, dateTimeEnd]);

  useEffect(() => {
    if (isFiltered || statusIsFiltered || dateIsFiltered) {
      combineDatesFinalFilter(combineSearchAndStatusFilters());
      console.log("hello");
    } else {
      setFiltersOn(false);
    }
    // setFiltersOn()
  }, [
    filteredTickets,
    filteredStatusTickets,
    filteredDates,
    isFiltered,
    statusIsFiltered,
    dateIsFiltered,
    // combinedTickets,
  ]);

  return (
    <div className="main-container">
      <div>
        <div>
          <div className="section-header">
            <h2 className="page-title">Tickets</h2>
          </div>
          <Formik>
            {() => (
              <>
                <Search
                  input={tickets}
                  outputLocation={filteredTickets}
                  isFilteredLocation={isFiltered}
                  setIsFilteredStateFalse={setIsFilteredTicketsFalse}
                  setOutputState={setOutputState}
                  setFilteredTickets={setFilteredTickets}
                  filteredTickets={filteredTickets}
                  placeholderMessage="Search by Ticket, Sender, Assignee, Status, or Date"
                />
                <Accordion
                  icon={<i className="fas fa-filter"></i>}
                  header="Filters"
                >
                  <div className="section-row">
                    <div className="filter-control opened-from-container">
                      <label>Opened From</label>

                      <div className="input is-rounded opened-from-input-container">
                        <Field
                          className="form-field opened-from-input"
                          value={datesInput}
                          // value={props.values.dates}
                          // name="dates"
                        />
                        <CalendarModal calendarState={calendarState} />
                      </div>
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
                      <div className="section-row-status">
                        <label>Status</label>
                        {statusIsFiltered ? (
                          <FontAwesomeIcon
                            icon={faTimes}
                            onClick={clearStatusFilter}
                          />
                        ) : null}
                      </div>
                      <div className="buttons has-addons">
                        <button
                          className="button is-rounded btn-group"
                          onClick={updateFilteredStatus}
                        >
                          New
                        </button>
                        <button
                          className="button is-rounded btn-group"
                          onClick={updateFilteredStatus}
                        >
                          In Progress
                        </button>
                        <button
                          className="button is-rounded btn-group"
                          onClick={updateFilteredStatus}
                        >
                          Closed
                        </button>
                      </div>
                    </div>
                  </div>
                </Accordion>
              </>
            )}
          </Formik>
          <div>
            <BootstrapTable
              keyField="id"
              data={showData()}
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
