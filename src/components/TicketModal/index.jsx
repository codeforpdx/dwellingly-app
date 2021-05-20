import React, { useState } from "react";
import Card from "../card/Card";
import AddNote from "../AddNote/AddNote"
import { CARD_TYPES } from "../../constants";
import Icon from "../icon/Icon";
import "./TicketModal.scss";
import TicketModalDetails from "./TicketModalDetails";
import EditTicketModalDetails from "./EditTicketModalDetails";
import TitleAndPen, { useEditingStatus } from "../../components/TitleAndPen";



export const TicketModal = ({ show, ticket, handleAddNote, handleDeleteNote, onClose, getTickets, updateSelectedTicket }) => {
  const [showAddNote, setShowAddNote] = useState(false)
  const [editNotes, setEditNotes] = useState(false);
  const { isEditing, setEditingStatus } = useEditingStatus()

  if (!show || !ticket) {
    return null;
  }
  const {
    issue,
    status,
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
                <h3 id="ticket-modal-title" className="subtitle">
                  {status.toUpperCase()}
                </h3>
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
                    getTickets={getTickets}
                    updateSelectedTicket={updateSelectedTicket}
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
                {notes ? (
                  notes.map((note) => {
                    return (
                      <div className="ticket-card-note-container">
                        <div className="ticket-card-note-header-row">
                          <div className="ticket-card-note-header-row-left">
                            {editNotes ?
                              <div onClick={() => localDeleteNote(note)}>
                                <i className="fas fa-minus-circle icon-inline-space" />
                              </div>
                              : null
                            }
                            <div
                              className="ticket-card-note-header"
                            >
                              {note.user}
                            </div>
                          </div>
                          <div
                            style={{ float: "right" }}
                            className="ticket-card-note-header"
                          >
                            {note.created_at}
                          </div>
                        </div>
                        <div className="ticket-card-note">
                          <p>{note.text}</p>
                        </div>
                      </div>
                    );
                  })
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
