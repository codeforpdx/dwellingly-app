import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import UserContext from '../../contexts/UserContext';
import Accordion from '../components/Accordion';
import { TicketModal } from '../components/TicketModal';
import Search from "../components/Search/index";
import Toast from '../../utils/toast';
import Modal from '../components/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown, faTrash, faFilterCircleXmark, faFilter } from '@fortawesome/free-solid-svg-icons';
import { tabletWidth } from '../../constants/index.js';
import { useMediaQueries } from '@react-hook/media-query';
import './styles/index.scss';
import { columns, mobileColumns } from './components/ticketsTableComponents';
import { formatDate } from '../../utils/date';
import Filter from "./components/ticketsFilter";

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
  if(title === 'previous page') {
    return (
      <li key={title} className="page-item">
        <button onClick={handleClick} title={title} className='button is-rounded is-small' >Prev</button>
      </li>
    );
  }
  if(title === 'next page') {
    return (
      <li key={title} className="page-item">
        <button onClick={handleClick} title={title} className='button is-rounded is-small' >Next</button>
      </li>
    );
  }
  if(active) {
    return (
      <li key={page} className="active page-item">
        <button onClick={handleClick} title={title}>{page}</button>
      </li>
    );
  }
  return (
    <li key={page} className="page-item">
      <button onClick={handleClick} title={title}>{page}</button>
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

const expandRow = isSmallScreen => ({
  renderer: row => (
    <div>
      <label for="assigned-to">
        Assigned To
      </label>
      <p id="assigned-to">{row.assigned}</p>

      <label for="created-at">
        Created
      </label>
      <p id="created-at">{row.created_at}</p>

      <label for="updated-at">
        Updated
      </label>
      <p id="updated-at">{row.updated_at}</p>
    </div>
  ),
  showExpandColumn: isSmallScreen ? true : false,
  expandColumnRenderer: ({ expanded }) => {
    if(expanded) {
      return (
        <FontAwesomeIcon
          className="button__envelope-icon mr-3"
          icon={faChevronDown}
        />
      );
    }
    return (
      <FontAwesomeIcon
        className="button__envelope-icon mr-3"
        icon={faChevronRight}
      />
    );
  },
});

const Tickets = (props) => {
  const userContext = useContext(UserContext);
  const [tickets, setTickets] = useState([]);
  const [viewedTicket, setViewedTicket] = useState(null);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState({})
  const [deleteNoteModal, setDeleteNoteModal] = useState(false);
  const [editNoteModal, setEditNoteModal] = useState(false);

  const { matchesAll: isSmallScreen } = useMediaQueries({
    screen: 'screen',
    width: `(max-width: ${tabletWidth})`
  });

  const toggleTicketModal = (ticket) => {
    setViewedTicket((prevState) => (prevState ? null : ticket));
  };

  const getTickets = (context) => {
    userContext.apiCall('get', '/tickets', {}, {})
      .then(( { data }) => {
        setTickets(data?.map(t => {
          return {
            ...t,
            created_at: formatDate(t.created_at),
            updated_at: formatDate(t.updated_at),
            assigned: t.assigned_staff?.map(as => `${as.firstName} ${as.lastName}`).join(', ')
          }}));
      })
  };

  const setIsFilteredTicketsFalse = async () => {
    await setIsFiltered(false);
  };

  const setOutputState = async (output, isTrue) => {
    await setFilteredTickets(output);
    await setIsFiltered(isTrue);
  };

  const handleAddNote = (noteText, ticketID) => {
    userContext.apiCall('post', `/tickets/${ticketID}/notes`, { text: noteText }, { success: 'Note added' })
      .then(({ data }) => {
        var notes = viewedTicket.notes;
        notes.push(data);
        setViewedTicket({
          ...viewedTicket ,
          notes: notes
        });
        getTickets(userContext);
      });
  };

  const handleSelectRow = (ticket) => {
    setSelectedTickets([...selectedTickets, ticket]);
  };

  const handleDeleteNote = (note) => {
    setSelectedNote(note);
    setDeleteNoteModal(true);
  }

  const handleEditNoteText = (note) => {
    setSelectedNote(note);
    setEditNoteModal(true)
  }


  const editNote = () => {
    const ticketID = viewedTicket.id;

    userContext.apiCall('patch', `/tickets/${ticketID}/notes/${selectedNote.id}`,
      { text: selectedNote.text },
      { success: 'Note updated!' })
      .then(({ data }) => {
        setViewedTicket({
          ...viewedTicket, notes: viewedTicket.notes.map(note => {
            if (note.id === data.id) note.text = data.text;
            return note;
          })
        })
        setEditNoteModal(false);
      });
  }


  const deleteNote = () => {
    const { id, ticket_id } = selectedNote;
    userContext.apiCall('delete', `/tickets/${ticket_id}/notes/${id}`, {}, {})
      .then(({ data }) => {

        const filteredNotes = viewedTicket.notes.filter(note => note.id !== id);
        setViewedTicket({ ...viewedTicket, notes: filteredNotes })
        getTickets(userContext);

        Toast(data.message, "success");
      })

    closeNoteModal();
  }

  const closeNoteModal = () => {
    setDeleteNoteModal(false);
    setEditNoteModal(false);
  }

  const handleDeselectRow = (ticket) => {
    let filteredSet = selectedTickets.filter((t) => t.id !== ticket.id);
    setSelectedTickets(filteredSet);
  };

  const handleSelectAll = (tickets) => {
    setSelectedTickets(tickets);
  };

  const handleDeselectAll = (_) => {
    setSelectedTickets([]);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const deleteTickets = () => {
    let ticketIds = selectedTickets.map(t => t.id);
    userContext.apiCall('delete', '/tickets/bulk_delete', { ids: ticketIds }, {})
      .then((response) => {
        let ticketsToDelete = tickets.filter(t => !ticketIds.includes(t.id));

        setTickets(ticketsToDelete);
        setSelectedTickets([]);
        setShowDeleteModal(false);

        Toast(response.data.message, "success");
      });
  };

  const updateSelectedTicket = (updatedTicket) => {
    setViewedTicket(updatedTicket);
  };

  useEffect(() => {
    getTickets(userContext);
  }, [userContext]);

  return (
    <div className='main-container'>
      <div>
        <div>
          <div className="section-header">
            <h2 className="page-title">Tickets</h2>
            <Link className="button is-primary is-rounded ml-4" to="/add/ticket">+ ADD NEW</Link>
          </div>
          <Search
            input={tickets}
            outputLocation={filteredTickets}
            isFilteredLocation={isFiltered}
            setIsFilteredStateFalse={setIsFilteredTicketsFalse}
            setOutputState={setOutputState}
            placeholderMessage="Search by Ticket, Sender, Assignee, Status, or Date"
          />
          <Accordion
            icon={
              isFiltered ? 
              <FontAwesomeIcon icon={faFilter} /> : 
              <FontAwesomeIcon icon={faFilterCircleXmark} />
              }
            header="Filters"
            
          >
          <Filter 
            input={tickets}
            outputLocation={filteredTickets}
            isFilteredLocation={isFiltered}
            setIsFilteredStateFalse={setIsFilteredTicketsFalse}
            setOutputState={setOutputState}
          />
          </Accordion>
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
              data={isFiltered === true ? filteredTickets : tickets}
              columns={isSmallScreen ? mobileColumns(toggleTicketModal) : columns(toggleTicketModal)}
              pagination={paginationFactory(options)}
              defaultSortDirection="asc"
              bootstrap4={true}
              headerClasses="table-header"
              classes="full-size-table"
              selectRow={({
                mode: 'checkbox',
                clickToSelect: isSmallScreen ? false : true,
                clickToExpand: isSmallScreen ? true : false,
                onSelect: (row, isSelect) => isSelect ? handleSelectRow(row) : handleDeselectRow(row),
                onSelectAll: (isSelect, rows) => isSelect ? handleSelectAll(rows) : handleDeselectAll(rows),
                sort: true,
                headerColumnStyle: () => ({ width: "5%" }),
                nonSelectableStyle: () => ({ color: '#999999' })
              })}
              defaultSorted={[
                {
                  dataField: 'propertyName',
                  order: 'asc'
                }]}
              expandRow={expandRow(isSmallScreen)}
            />
          </div>
        </div>
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
                {selectedTickets.map(t => (
                  <li>{t.tenant}: {t.issue}</li>
                ))}
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
        />
      }
      {deleteNoteModal &&
        <div className="note-modal"
        >
          <Modal
            titleText={"Delete Note"}
            content={
              <div className="content">
                <p>
                  You have selected the following note to be deleted:
                </p>
                <div className="selected-note-text">
                  {selectedNote.text}
                </div>
                <br />
                <p>Are you sure you want to delete this note?  This cannot be undone.</p>
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
        </div>
      }
      {editNoteModal &&
        <div className="note-modal"
        >
          <Modal
            titleText={"Edit Note"}
            content={
              <div className="content">
                <p>
                  You have attempted to change this note's text to:
                </p>
                <div className="selected-note-text">
                  {selectedNote.text}
                </div>
                <br />
                <p>Are you sure you want to change this note?</p>
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
        </div>
      }
    </div>
  );
}

export default Tickets;
