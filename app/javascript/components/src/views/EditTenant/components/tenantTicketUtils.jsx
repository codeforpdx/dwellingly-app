import React from 'react';
import Toast from '../../../utils/toast';

export const pageButtonRenderer = ({
  page,
  active,
  disable,
  title,
  onPageChange
}) => {
  const handleClick = (e) => {
    e.preventDefault()
    onPageChange(page)
  }

  if (title === 'previous page') {
    return (
      <li key={title} className="page-item">
        <button
          onClick={handleClick}
          title={title}
          className='button is-rounded is-small'
        >
        Prev
        </button>
      </li>)}

  if(title === 'next page') {
    return (
      <li key={title} className="page-item">
        <button
          onClick={handleClick}
          title={title}
          className='button is-rounded is-small'
        >
        Next
        </button>
      </li>
    )}

  if (active) {
    return (
      <li key={page} className="active page-item">
        <button
          onClick={handleClick}
          title={title}
        >
        {page}
        </button>
      </li>
    )
  }

  return (
      <li key={page} className="page-item">
        <button
          onClick={handleClick}
          title={title}
        >
        {page}
        </button>
      </li>
  )
}

export const pagination_options = {
  sizePerPage: 5,
  hideSizePerPage: true,
  hidePageListOnlyOnePage: true,
  pageButtonRenderer
}

export const makeGetTicketsFn = (setTicketsState, userContext, tenant_id) => (
  () =>
  userContext.apiCall('get', `/tickets?tenant_id=${tenant_id}`, {}, {})
    .then((response) => {
      setTicketsState(response.data.tickets?.map(t => {
        return {
          ...t,
          assigned: t.assigned_staff?.map(
            as => `${as.firstName} ${as.lastName}`
          ).join(', ')
        }}))
    }));

export const makeHandleAddNoteFn = (viewedTicketState, getTicketsFn, userContext, setViewedTicketState) => {
  return (
    (noteText, ticketID) => {
      userContext.apiCall('post', `/tickets/${ticketID}/notes`, { text: noteText }, { success: 'Note added' })
        .then(({ data }) => {
          var notes = viewedTicketState.notes;
          notes.push(data);
          setViewedTicketState({
            ...viewedTicketState,
            notes: notes
          });
          getTicketsFn(userContext)
        });
    }
  )
}


export const makeDeleteTicketsFn = (
  selectedTicketsState,
  setSelectedTicketsState,
  ticketListState,
  setTicketListState,
  setShowDeleteModalState,
  userContext
  ) => {
  return () => {
    let ticketIds = selectedTicketsState.map(t => t.id);
    userContext.apiCall('delete', '/tickets/bulk_delete', { ids: ticketIds }, {})
      .then((response) => {
        let ticketsToDelete = ticketListState.filter(t => !ticketIds.includes(t.id))
        setTicketListState(ticketsToDelete)
        setSelectedTicketsState([])
        setShowDeleteModalState(false)

        Toast(response.data.message, "success")
      });
  }
}

export const makeEditNoteFn = (
  viewedTicketState,
  setViewedTicketState,
  selectedNoteState,
  setEditNoteModalState,
  userContext) => {
  return () => {
    const ticketID = viewedTicketState.id
    userContext.apiCall('patch', `/tickets/${ticketID}/notes/${selectedNoteState.id}`,
      { text: selectedNoteState.text }, { success: 'Note Updated' })
      .then(({ data }) => {
        setViewedTicketState( {
          ...viewedTicketState,
          notes: viewedTicketState.notes.map(note => {
            if (note.id === data.id) note.text = data.text
            return note
          })
        });
        setEditNoteModalState(false);
      });
  }
}

export const makeDeleteNoteFn = (
  selectedNoteState,
  viewedTicketState,
  setViewedTicketState,
  getTicketsFn,
  closeNoteModalFn,
  userContext
  ) => {

  return () => {
    const { id, ticket_id } = selectedNoteState;

    userContext.apiCall('delete', `/tickets/${ticket_id}/notes/${id}`, {}, {})
      .then(({ data }) => {
        const filteredNotes = viewedTicketState.notes.filter(
          note => note.id !== id
        )
        setViewedTicketState({ ...viewedTicketState, notes: filteredNotes })
        getTicketsFn(userContext)
      });

    closeNoteModalFn();
  }
}
