import { ENDPOINTS, HTTP_METHODS } from '../constants/constants';
// Constants
export const FETCHING_PROPERTIES = 'properties/FETCHING_PROPERTIES';
export const FETCHING_PROPERTIES_SUCCEEDED = 'properties/FETCHING_PROPERTIES_SUCCEEDED';
export const FETCHING_PROPERTIES_ERROR = 'properties/FETCHING_PROPERTIES_ERROR';
export const CREATE_PROPERTY = 'properties/CREATE_PROPERTY';

// Initial State
const initialState = {
  properties: {},
  isFetchingDataFromFirebase: false,
  error: null
}

// Reducer
export default (state = initialState, action) => {
  switch(action.type) {
    case FETCHING_PROPERTIES:
      return {
        ...state,
        isFetchingDataFromFirebase: action.isFetchingDataFromFirebase
      };
    case FETCHING_PROPERTIES_SUCCEEDED:
      return {
        ...state,
        properties: action.properties,
        isFetchingDataFromFirebase: action.isFetchingDataFromFirebase
      };
    case CREATE_PROPERTY:
        return {
          ...state
        }
    default:
      return state
  }
}

// Action Creators
export const getPropertysCollection = (data) => (dispatch) => {
  dispatch({
    type: FETCHING_PROPERTIES,
    isFetchingDataFromFirebase: true
  });
  dispatch({
    type: FETCHING_PROPERTIES_SUCCEEDED,
    properties: data,
    isFetchingDataFromFirebase: false
  });
}
// Create Property
export const createProperty = (data) => (dispatch) => {
  dispatch({
    type: CREATE_PROPERTY,
    id: data.id,
    addressOne: data.addressOne,
    addressTwo: data.addressTwo,
    numberOfUnits: data.numberOfUnits,
    city: data.city,
    name: data.name,
    state: data.state,
    zipCode: data.zipCode
  })
}

// Synchronous Functions

// Asynchronous Functions

// GET Properties
export const getProperties = () => async dispatch =>  {
  const response = await fetch(`${ENDPOINTS.PROPERTY}`)
  const data = await response.json();
  dispatch(getPropertysCollection(data));
}

// POST Property
export const onAddingProperty = async data => {
  const response = await fetch(`${ENDPOINTS.PROPERTY}`, {
    method: HTTP_METHODS.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}
export const creatingProperty = data => async dispatch => {
  try {
    const resData = await onAddingProperty(data);
    dispatch(createProperty(resData))
  } catch(e) {
    console.log(e);
  }
}
