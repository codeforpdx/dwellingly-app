import React, {useState, useContext}  from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import UserContext from '../../UserContext'
import { columns } from './tenantTicketTableComponent'
import { TicketModal } from '../../components/TicketModal'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import Modal from '../../components/Modal'
import {pagination_options, makeEditNoteFn,
  makeGetTicketsFn, makeHandleAddNoteFn,
  makeDeleteTicketsFn, makeDeleteNoteFn} from './tenantTicketUtils'


export const TenantTickets = (
  {tenant_id, ticketList, setTicketList, 
   activeTab}) => {

  const userContext = useContext(UserContext)

  const [viewedTicket, setViewedTicket] = useState(null) 
  const [editNoteModal, setEditNoteModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState({})   
  const [deleteNoteModal, setDeleteNoteModal] = useState(false)
  const [selectedTickets, setSelectedTickets] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false) 

  const getTickets = makeGetTicketsFn(setTicketList, userContext, tenant_id)   
  const deleteTickets = makeDeleteTicketsFn(selectedTickets, 
    setSelectedTickets, ticketList, setTicketList, setShowDeleteModal,
    userContext) 
const closeNoteModal = () => {
    setDeleteNoteModal(false)
    setEditNoteModal(false)
  }
  // update the make... functions to remove userContext
  const deleteNote = makeDeleteNoteFn(selectedNote, viewedTicket, 
    setViewedTicket, getTickets, closeNoteModal,userContext)

  const editNote = makeEditNoteFn(viewedTicket,setViewedTicket, 
    selectedNote,setEditNoteModal,userContext)

  const handleAddNote = makeHandleAddNoteFn(viewedTicket, getTickets, userContext)

  const handleDeleteNote = (note) => {
    setSelectedNote(note)
    setDeleteNoteModal(true)
  }

  const handleEditNoteText = (note) => {
    setSelectedNote(note)
    setEditNoteModal(true)
  }

  const handleSelectRow = (ticket) => {
    setSelectedTickets([...selectedTickets, ticket])
  }

  const handleDeselectRow = (ticket) => {
    setSelectedTickets(selectedTickets.filter((t) => t.id !== ticket.id)) 
  }

  const handleSelectAll = (tickets) => {
    setSelectedTickets(tickets)
  }

  const handleDeselectAll = () => {
    setSelectedTickets([])
  }

  const updateSelectedTicket = (updatedTicket) => {
    setViewedTicket(updatedTicket)
  }

  const ticketFilter = (ticketList, tab) =>  {
    return ticketList.filter((ticket) => 
      (tab === "Closed") ? 
        ticket.status === "Closed" : 
        ticket.status !== "Closed")
  }

  const toggleTicketModal = (ticket) => {
    setViewedTicket((prevState) => (prevState ? null : ticket))
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }
  
  return (
    <div>
      <div className='bulk-actions-container py-3'>
        <button
          className={`button is-rounded is-primary ml-3 ${selectedTickets.length && 'is-active-button'}`}
          onClick={toggleDeleteModal}
        >
          <FontAwesomeIcon
            className="mr-3"
            icon={faTrash}
          />
          Delete Tickets
        </button>
      </div>
      <div> 
        <BootstrapTable
          keyField="id"
          data={ticketFilter(ticketList, activeTab)}
          columns={columns(toggleTicketModal)} 
          pagination={paginationFactory(pagination_options)}
          defaultSortDirection="asc"
          bootstrap4={true}
          headerClasses="table-header"
          classes="full-size-table"
          selectRow={({
            mode: 'checkbox',
            clickToSelect: true,
            clickToExpand: false,
            onSelect: (row, isSelect) => isSelect ? handleSelectRow(row): handleDeselectRow(row),
            onSelectAll: (isSelect, rows) => isSelect ? handleSelectAll(rows) : handleDeselectAll(rows),
            sort: true,
            headerColumnStyle: () => ({width: "5%"}),
            nonSelectableStyel: () => ({ color: '#999999'})
          })}
        />
        <TicketModal
          show={viewedTicket}
          onClose={toggleTicketModal}
          ticket={viewedTicket}
          handleAddNote={handleAddNote}
          getTickets={getTickets}
          updateSelectedTicket={updateSelectedTicket}
          handleDeleteNote={handleDeleteNote}
          handleEditNoteText={handleEditNoteText}
          editNoteModal={editNoteModal}
        />
      </div>
      {
        showDeleteModal &&
        <Modal
          titleText={selectedTickets.length > 1 ? "Delete Tickets" : "Delete Ticket"}
          content={
            <div className="content">
              <p>You have selected the following {selectedTickets.length} tickets to be deleted:</p>
              <ul className="archive-tickets-list has-text-weight-bold">
                {selectedTickets.map(t => 
                  <li key={t.id}>{t.tenant}: {t.issue}</li>
                )}
              </ul>
              <br />
              <p>Are you sure you want to delete these tickets? This cannot be undone.</p>
            </div>
          }
          hasButtons={true}
          hasRedirectButton={false}
          confirmButtonHandler={deleteTickets}
          confirmText="Delete"
          cancelButtonHandler={toggleDeleteModal}
          cancelText="Cancel"
          closeHandler={toggleDeleteModal}
        />}
      {
        deleteNoteModal &&
        <div className="note-modal">
          <Modal
            titleText={"Delete Note"}
            content={
              <div className="content">
                <p>You have selected the following note to be deleted:</p>
                <div className="selected-note-text">
                  {selectedNote.text}
                </div>
                <br />
                <p>Are you sure you want to delete this note? This cannot be undone.</p>
              </div>
            }
            hasButtons={true}
            hasRedirectButton={false}
            confirmButtonHandler={deleteNote}
            confirmText="Delete"
            cancelButtonHandler={closeNoteModal}
            cancelText="Cancel"
            closeHandler={closeNoteModal}
          />
        </div>}
      {
        editNoteModal &&
        <div className="note-modal">
          <Modal
            titleText={"Edit Note"}
            content={
              <div className="content">
                <p>You have attempted to change this note's text to:</p>
                <div className="selected-note-text">
                  {selectedNote.text}
                </div>
                <br />
                <p>Are you sure you want to change this note? This cannot be undone.</p>
              </div>
            }
            hasButtons={true}
            hasRedirectButton={false}
            confirmButtonHandler={editNote}
            confirmText="Change"
            cancelButtonHandler={closeNoteModal}
            cancelText="Cancel"
            closeHandler={closeNoteModal}
          />
        </div>}
    </div>
  )
}
