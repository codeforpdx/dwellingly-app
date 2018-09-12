import { SETTINGS, ROUTES } from '../constants/constants';
// Constants
export const FETCHING_EMERGENCY_NUMBERS = 'emergency/FETCHING_EMERGENCY_NUMBERS';
export const FETCHING_EMERGENCY_NUMBERS_SUCCEEDED = 'emergency/FETCHING_EMERGENCY_NUMBERS_SUCCEEDED';
export const FETCHING_EMERGENCY_NUMBERS_ERROR = 'emergency/FETCHING_EMERGENCY_NUMBERS_ERROR';
export const EDIT_EMERGENCY_NUMBER = 'emergency/EDIT_EMERGENCY_NUMBER';

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
    case EDIT_EMERGENCY_NUMBER:
      return {
        ...state,
        numbers: {
          ...state.numbers,
          [action.id]: {
            id: action.id,
            contact: action.contact,
            phoneNumberOne: action.phoneNumberOne,
            phoneNumberTwo: action.phoneNumberTwo
          }
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

export const editEmergencyNumber = (response) => (dispatch) => {
  dispatch({
    type: EDIT_EMERGENCY_NUMBER,
    id: response.id,
    contact: response.contact,
    phoneNumberOne: response.phoneNumberOne,
    phoneNumberTwo: response.phoneNumberTwo
  })
}

// Asynchronous Functions
export const getEmergencyNumbers = () => async dispatch => {
  const response = await fetch(`${SETTINGS.FIREBASE_API}${ROUTES.EMERGENCY_NUMBERS}`);
  const data = await response.json();
  dispatch(getEmergencyNumbersCollection(data))
}

export const onEditingEmergencyNumber = (data) => async dispatch => {
  const response = await fetch(`${SETTINGS.FIREBASE_API}${ROUTES.EMERGENCY_NUMBERS}/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: await JSON.stringify(data)
  })
  console.log(response);
  dispatch(editEmergencyNumber(data))
}
