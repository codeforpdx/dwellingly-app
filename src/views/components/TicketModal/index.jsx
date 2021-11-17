import React, { useState, useEffect, useContext } from "react";
import Card from "./components/Card";
import AddNote from "./components/AddNote"
import { CARD_TYPES } from "../../../constants";
import Icon from "../icon/Icon";
import "./styles/index.scss";
import TicketModalDetails from "./components/TicketModalDetails";
import EditTicketModalDetails from "./components/EditTicketModal/EditTicketModalDetails";
import TitleAndPen, { useEditingStatus } from "../TitleAndPen";
import NoteListItem from "./components/NoteListItem";
import { updateTicket } from "./components/EditTicketModal/EditTicketModalFetches";
import UserContext from '../../../contexts/UserContext';

const sortNotes = (noteA, noteB) => {
  if (noteA.created_at > noteB.created_at) return -1;
  return 1;
}


export const TicketModal = ({ show, onClose, ticket, handleAddNote, getTickets, updateSelectedTicket, handleDeleteNote, handleEditNoteText, editNoteModal }) => {
  const userContext = useContext(UserContext);
  const [showAddNote, setShowAddNote] = useState(false)
  const [editNotes, setEditNotes] = useState(false);
  const sortedNotes = ticket ? ticket.notes.sort(sortNotes) : null;
  const { isEditing, setEditingStatus } = useEditingStatus();
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!editNoteModal) setEditNotes(false);
  }, [editNoteModal])

  useEffect(() => {
    if(ticket) {
      setStatus(ticket.status);
    }
  }, [ticket])

  if (!show || !ticket) {
    return null;
  }

  const {
    issue,
    notes,
    id
  } = ticket;

  const toggleShowAddNote = () => {
    setShowAddNote(!showAddNote)
  }

  const handleIsEditing = (input = !isEditing) => {
    setEditingStatus(input)
  }

  const handleCloseTicket = () => {
    setEditingStatus(false);
    setShowAddNote(false)
    setEditNotes(false)
    onClose();
  }

  const handleEditNotes = () => {
    setEditNotes(!editNotes);
  }

  const localDeleteNote = (note) => {
    setEditNotes(false);
    handleDeleteNote(note);
  }

  const handleSubmit = (requestBody) => {
    if (requestBody !== {}) {
      if(ticket.status !== status) {
        // The backend is sending us the string representation of the enum but it expects us to send back the enum key
        requestBody.status = status === 'In Progress' ? 'In_Progress' : status;
      }
      updateTicket(requestBody, ticket.id, userContext)
        .then(response => {
          updateSelectedTicket(response.data);
          getTickets(userContext);
        });
    }
    setEditingStatus(false);
  }

  return (
    <div className="ticket-window-modal">
      <div className="ticket-modal-container">
        <Card types={[CARD_TYPES.TICKET]}>
          <Card.Top>
            <Card.Content>
              <div className="card__summary">
                <div className="close-icon-container">
                  <button type="button" onClick={handleCloseTicket}>
                    <Icon id="close-icon" icon="close" />
                  </button>
                </div>
                  {isEditing
                  ? <select
                      id="status"
                      value={status}
                      onChange={({ target }) => setStatus(target.value)}>
                      <option value="New">NEW</option>
                      <option value="In Progress">IN PROGRESS</option>
                      <option value="Closed">CLOSED</option>
                    </select>
                  : <h3 id="ticket-modal-title" className="subtitle">{status.toUpperCase()}</h3>}
                <div className="ticket-modal-title-container">
                  <TitleAndPen
                    title={issue}
                    isEditing={isEditing}
                    setEditingStatus={setEditingStatus}
                  />
                </div>
                <hr />
                {isEditing ?
                  <EditTicketModalDetails
                    ticket={ticket}
                    handleIsEditing={handleIsEditing}
                    handleSubmit={handleSubmit}
                  />
                  :
                  <TicketModalDetails ticket={ticket} />
                }
              </div>
            </Card.Content>
          </Card.Top>
          <Card.Bottom>
            <Card.Content>
              <div className="ticket-card-bottom-header">
                {` NOTES (${notes ? notes.length : 0})`}
                <div className="ticket-note-button-container">
                  <button
                    onClick={toggleShowAddNote}
                    className={`rounded${showAddNote ? "--is-editing" : ""}`} >
                    <i className={`fas fa-plus icon`} />
                  </button>
                  <button
                    className={`rounded${editNotes ? "--is-editing" : ""}`}
                    onClick={handleEditNotes}
                  >
                    <i className="fas fa-pen icon"></i>
                  </button>
                </div>
              </div>
              {showAddNote ?
                <AddNote
                  handleAddNote={handleAddNote}
                  toggleShowAddNote={toggleShowAddNote}
                  ticketID={id}
                />
                : null}
              <div id="scroll-container">
                {sortedNotes ? (
                  sortedNotes.map(note =>
                    <NoteListItem key={note.created_at}
                      note={note}
                      editNotes={editNotes}
                      localDeleteNote={localDeleteNote}
                      handleEditNoteText={handleEditNoteText}
                    />
                  )
                ) : (
                  <div className="ticket-card-note">
                    <p>No Notes found</p>
                  </div>
                )}
              </div>
            </Card.Content>
          </Card.Bottom>
        </Card>
      </div>
    </div >
  );
};
