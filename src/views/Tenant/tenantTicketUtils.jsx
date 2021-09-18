import React from 'react'
import * as axios from 'axios'
import Toast from '../../utils/toast'


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

export const makeAuthHeader = ({ user }) => (
  {headers: 
    {'Authorization': `Bearer ${user.accessJwt}`}
  }
)
/* need to fix get tickets needs to be filtered by 
 * tenant
 * */
export const makeGetTicketsFn = (setTicketsState, userContext, tenant_id) => {
  return (() => {
      axios.get(`/api/tickets?tenant_id=${tenant_id}`, 
        makeAuthHeader(userContext))
        .then((response) => {
          setTicketsState(response.data.tickets?.map(t => {
            return {
              ...t,
              assigned: t.assigned_staff?.map(
                as => `${as.firstName} ${as.lastName}`
              ).join(', ')
            }}))
        })
        .catch((error) => {
          Toast(error.message, "error")
          console.log(error)
        })
  }
  )
}

export const makeHandleAddNoteFn = (viewedTicketState, getTicketsFn, userContext) => {
  return (
    (noteText, ticketID) => {
      axios.post(`/api/tickets/${ticketID}/notes`, 
        { text: noteText },
        makeAuthHeader(userContext))
        .then(({ data }) => {
          viewedTicketState.notes.push(data)
          getTicketsFn(userContext)
        })
        .catch((error) => {
          Toast(error.message, "error")
          console.log(error)
        })
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
    let ticketIds = selectedTicketsState.map(t => t.id)
    axios( {
      method: 'delete',
      url: '/api/tickets',
      data: {
        ids: ticketIds
      }
    }, makeAuthHeader(userContext))
      .then((response) => {
        let ticketsToDelete = ticketListState.filter(t => !ticketIds.includes(t.id))
        setTicketListState(ticketsToDelete)
        setSelectedTicketsState([])
        setShowDeleteModalState(false)

        Toast(response.data.message, "success")
      })
      .catch((error) => {
        Toast(error.message, "error")
      })
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

    axios.patch(
      `/api/tickets/${ticketID}/notes/${selectedNoteState.id}`,
      { text: selectedNoteState.text },
      makeAuthHeader(userContext))
      .then(({ data }) => {
        setViewedTicketState( {
          ...viewedTicketState, 
          notes: viewedTicketState.notes.map(note => {
            if (note.id === data.id) note.text = data.text
            return note
          })
        })
        setEditNoteModalState(false)

        Toast("Note Updated", "success")
      })
      .catch((error) => {
        Toast(error.message, "error")
        console.log(error)
      })
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
    const { id, ticket_id } = selectedNoteState

    axios.delete(`/api/tickets/${ticket_id}/notes/${id}`,
      makeAuthHeader(userContext))
      .then(({ data }) => {
        const filteredNotes = viewedTicketState.notes.filter(
          note => note.id !== id
        )
        setViewedTicketState({ ...viewedTicketState, notes: filteredNotes })
        getTicketsFn(userContext)

        Toast(data.message, "success")
      })
      .catch((error) => {
        Toast(error.message, "error")
        console.log(error)
      })

    closeNoteModalFn()
  }
}
