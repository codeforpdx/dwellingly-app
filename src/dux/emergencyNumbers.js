import { SETTINGS, ROUTES } from '../constants/constants';
// Constants
export const FETCHING_EMERGENCY_NUMBERS = 'emergency/FETCHING_EMERGENCY_NUMBERS';
export const FETCHING_EMERGENCY_NUMBERS_SUCCEEDED = 'emergency/FETCHING_EMERGENCY_NUMBERS_SUCCEEDED';
export const FETCHING_EMERGENCY_NUMBERS_ERROR = 'emergency/FETCHING_EMERGENCY_NUMBERS_ERROR';
export const EDIT_EMERGENCY_NUMBER = 'emergency/EDIT_EMERGENCY_NUMBER';
export const CREATE_EMERGENCY_NUMBER = 'emergency/CREATE_EMERGENCY_NUMBER';
export const DELETE_EMERGENCY_NUMBER = 'emergency/DELETE_EMERGENCY_NUMBER';
export const ARCHIVE_EMERGENCY_NUMBER = 'emergency/ARCHIVE_EMERGENCY_NUMBER';

// Initial State
const initialState = {
  numbers: {},
  isFetchingDataFromFirebase: false,
  error: null
}

// Reducer
export default (state = initialState, action) => {
  switch(action.type) {
    case FETCHING_EMERGENCY_NUMBERS:
      return {
        ...state,
        isFetchingDataFromFirebase: action.isFetchingDataFromFirebase,
      };
    case FETCHING_EMERGENCY_NUMBERS_SUCCEEDED:
      return {
        ...state,
        numbers: action.numbers,
        isFetchingDataFromFirebase: action.isFetchingDataFromFirebase
      }
    case FETCHING_EMERGENCY_NUMBERS_ERROR:
      return {
        ...state,
        error: action.error
      }
    case EDIT_EMERGENCY_NUMBER: {
      const targetObj = state.numbers.findIndex(({ id }) => id === action.id);
      const numberArrCopy = state.numbers.slice(0);
      numberArrCopy[targetObj] = {
        id: action.id,
        contact: action.contact,
        subtext: action.subtext,
        phoneNumberOne: { ...action.phoneNumberOne },
        phoneNumberTwo: { ...action.phoneNumberTwo },
        phoneNumberThree: { ...action.phoneNumberThree },
      };
      return {
        ...state,
        numbers: numberArrCopy
      }
    }
    case CREATE_EMERGENCY_NUMBER:
      return {
        ...state
      }
    case DELETE_EMERGENCY_NUMBER: {
      const numberId = action.id
      return {
        ...state,
        numbers: state.numbers.filter(({ id }) => id !== numberId)
      }
    }
    case ARCHIVE_EMERGENCY_NUMBER: {
      const numberId = action.id
      return {
        ...state,
        numbers: state.numbers.filter(({ id }) => id !== numberId)
      }
    }
    default:
      return state
  }
}

// Actions Creators
export const getEmergencyNumbersCollection = (data) => (dispatch) => {
  dispatch({
    type: FETCHING_EMERGENCY_NUMBERS,
    isFetchingDataFromFirebase: true
  })

  dispatch({
    type: FETCHING_EMERGENCY_NUMBERS_SUCCEEDED,
    numbers: data,
    isFetchingDataFromFirebase: false
  })
}
// Edit Emergency Number
export const editEmergencyNumber = (data) => (dispatch) => {
  dispatch({
    type: EDIT_EMERGENCY_NUMBER,
    id: data.id,
    contact: data.contact,
    phoneNumberOne: data.phoneNumberOne,
    phoneNumberTwo: data.phoneNumberTwo,
    phoneNumberThree: data.phoneNumberThree
  })
}
// Create Emergency Number
export const createEmergencyNumber = (data) => (dispatch) => {
  dispatch({
    type: CREATE_EMERGENCY_NUMBER,
    id: data.id,
    contact: data.contact,
    phoneNumberOne: data.phoneNumberOne,
    phoneNumberTwo: data.phoneNumberTwo,
    phoneNumberThree: data.phoneNumberThree
  })
}
// Delete Emergency Number
export const deleteEmergencyNumber = (data) => (dispatch) => {
  dispatch({
    type: DELETE_EMERGENCY_NUMBER,
    id: data
  })
}
// Archive Emergency Number
export const archiveEmergencyNumber = (data) => (dispatch) => {
  dispatch({
    type: ARCHIVE_EMERGENCY_NUMBER,
    id: data.id
  })
}

// Asynchronous Functions

// GET Emergency Numbers
export const getEmergencyNumbers = () => async dispatch => {
  const response = await fetch(`${SETTINGS.FIREBASE_API}${ROUTES.EMERGENCY_NUMBERS}`);
  const data = await response.json();
  dispatch(getEmergencyNumbersCollection(data))
}

// POST Emergency Number
export const onCreatingEmergencyNumber = async data => {
  const response = await fetch(`${SETTINGS.FIREBASE_API}${ROUTES.EMERGENCY_NUMBERS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json();
}
export const creatingEmergencyNumber = data => async dispatch => {
  try {
    const resData = await onCreatingEmergencyNumber(data);
    dispatch(createEmergencyNumber(resData))
  } catch(e) {
    console.log(e);
  }
}

// PATCH Selected Emergency Number
export const onEditingEmergencyNumber = async data => {
  const response = await fetch(`${SETTINGS.FIREBASE_API}${ROUTES.EMERGENCY_NUMBERS}/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json();
}
// Once the PATCH request is successful, update the store.
export const editingEmergencyNumber = data => async dispatch => {
  try {
    const resData = await onEditingEmergencyNumber(data)
    dispatch(editEmergencyNumber(resData))
  } catch(e) {
    console.log(e);
  }
}

// Delete Emergency Number
export const onDeletingEmergencyNumber = async data => {
  const response = await fetch(`${SETTINGS.FIREBASE_API}${ROUTES.EMERGENCY_NUMBERS}/${data}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json'
    },
    body: JSON.stringify(data)
  })
  return response;
}
export const deletingEmergencyNumber = data => async dispatch => {
  try {
    await onDeletingEmergencyNumber(data);
    dispatch(deleteEmergencyNumber(data));
  } catch(e) {
    console.log(e);
  }
}
// Archive Emergency Number
export const onArchivingEmergencyNumber = async data => {
  const response = await fetch(`${SETTINGS.FIREBASE_API}${ROUTES.EMERGENCY_NUMBERS}/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response;
}
export const archivingEmergencyNumber = data => async dispatch => {
  try {
    await onArchivingEmergencyNumber(data);
    dispatch(archiveEmergencyNumber(data));
  } catch(e) {
    console.log(e);
  }
}
