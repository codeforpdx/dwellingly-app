import { ENDPOINTS } from '../constants/constants';
// Constants
export const FETCHING_PROPERTY_MANAGERS = 'users/FETCHING_PROPERTY_MANAGERS';
export const FETCHING_PROPERTY_MANAGERS_SUCCEEDED = 'users/FETCHING_PROPERTY_MANAGERS_SUCCEEDED';
export const FETCHING_PROPERTY_MANAGERS_ERROR = 'users/FETCHING_PROPERTY_MANAGERS_ERROR';

// Initial State
const initialState = {
  propertyManagers: {},
  isFetchingDataFromFirebase: false,
  error: null
}

// Reducer
export default (state = initialState, action) => {
  switch(action.type) {
    case FETCHING_PROPERTY_MANAGERS:
      return {
        ...state,
        isFetchingDataFromFirebase: action.isFetchingDataFromFirebase
      };
    case FETCHING_PROPERTY_MANAGERS_SUCCEEDED:
      return {
        ...state,
        propertyManagers: action.propertyManagers,
        isFetchingDataFromFirebase: action.isFetchingDataFromFirebase
      };
    default:
      return state
  }
}

// Action Creators
export const getPropertyManagersCollection = (data) => (dispatch) => {
  dispatch({
    type: FETCHING_PROPERTY_MANAGERS,
    isFetchingDataFromFirebase: true
  });
  dispatch({
    type: FETCHING_PROPERTY_MANAGERS_SUCCEEDED,
    propertyManagers: data,
    isFetchingDataFromFirebase: false
  })
}

// Synchronous Functions

// Asynchronous Functions

// GET Property Managers
export const getPropertyManagers = () => async dispatch => {
  const response = await fetch(`${ENDPOINTS.USER}`);
  const data = await response.json();
  const isPropertyManager = data.filter(user =>
    user.role.isPropertyManager !== false && user
  );
  dispatch(getPropertyManagersCollection(isPropertyManager))
}
