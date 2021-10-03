import React from 'react'

export const columns = (toggleTicketModal) => ([{
  dataField: 'id',
  text: 'Ticket',
  sort: true,
  formatter: (cell, row) => <button
    onClick={() => toggleTicketModal(row)}
    className="link-button cell-align-left">
    <p className="cell-header">{row.issue}</p>
  </button>,
  headerStyle: () => {
    return { width: "25%" }
  }
}, {
  dataField: 'urgency',
  text: 'Urgency',
  sort: true,
  headerStyle: () => {
    return { width: "25%" }
  }
}, {
  dataField: 'assigned',
  text: 'Assigned To',
  sort: true,
  headerStyle: () => {
    return { width: "25%" }
  }
}, {
  dataField: 'updated_at',
  text: 'Updated',
  sort: true,
  headerStyle: () => {
    return { width: "25%" }
  }
}])
