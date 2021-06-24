import { Link } from "react-router-dom";
import React from 'react';

const toggleTicketModal = (ticket) => {
  setViewedTicket((prevState) => (prevState ? null : ticket));
}

const columns = [{
  dataField: 'id',
  text: 'Ticket',
  sort: true,
  formatter: (cell, row) => <button
    onClick={() => toggleTicketModal(row)}
    className="link-button cell-align-left">
    <p className="cell-header">{row.tenant}</p>
    <p className="cell-subheader">{row.issue}</p>
  </button>,
  headerStyle: () => {
    return { width: "20%" };
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
  dataField: 'status',
  text: 'Status',
  sort: true,
  headerStyle: () => {
    return { width: "10%" };
  }
}, {
  dataField: 'created_at',
  text: 'Created',
  sort: true,
  headerStyle: () => {
    return { width: "15%" };
  }
}, {
  dataField: 'updated_at',
  text: 'Updated',
  sort: true,
  headerStyle: () => {
    return { width: "15%" };
  }
}];

const mobileColumns = [{
  dataField: 'id',
  text: 'Ticket',
  sort: true,
  formatter: (cell, row) => <button
    onClick={() => toggleTicketModal(row)}
    className="link-button cell-align-left">
    <p className="cell-header">{row.tenant}</p>
    <p className="cell-subheader">{row.issue}</p>
  </button>,
  headerStyle: () => {
    return { width: "40%" };
  }
}, {
  dataField: 'sender',
  text: 'Sender',
  sort: true,
  headerStyle: () => {
    return { width: "40%" };
  }
}, {
  dataField: 'status',
  text: 'Status',
  sort: true,
  headerStyle: () => {
    return { width: "20%" };
  }
}];
