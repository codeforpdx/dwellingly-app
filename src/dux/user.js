import { ROUTES, SETTINGS } from '../constants/constants';
// Actions
export const FETCHING_USER_DATA = 'user/FETCHING_USER_DATA';
export const FETCHING_USERS = 'user/FETCHING_USERS';
export const LOGIN = 'user/LOGIN';
export const LOGOUT = 'user/LOGOUT';
export const USER_ERROR = 'user/USER_ERROR';

// Initial State
const initialState = {
  user: {},
  isFetchingDataFromFirebase: false,
  error: null,
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER_DATA:
      return {
        ...state,
        isFetchingDataFromFirebase: action.isFetchingDataFromFirebase,
      };

    case FETCHING_USERS:
      return {
        ...state,
        users: action.users
      };

    case LOGIN:
      return {
        ...state,
        user: action.user,
        isFetchingDataFromFirebase: action.isFetchingDataFromFirebase,
      };

    case LOGOUT:
      return {
        ...state,
        user: action.user,
      };

    case USER_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

// Synchronous functions
export const createUser = user => (dispatch) => {
  dispatch({
    type: FETCHING_USER_DATA,
    isFetchingDataFromFirebase: true,
  });

  dispatch({
    type: LOGIN,
    isFetchingDataFromFirebase: false,
    user: {
      email: user.email,
      account_source: user.providerData.providerId,
      id: user.l,
    },
  });
};

export const setUser = user => (dispatch) => {
  dispatch({
    type: FETCHING_USER_DATA,
    isFetchingDataFromFirebase: true,
  });

  dispatch({
    type: LOGIN,
    isFetchingDataFromFirebase: false,
    user: {
      email: user.email,
      account_source: user.providerData[0].providerId,
      id: user.l,
    },
  });
};

export const clearUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
    isFetchingDataFromFirebase: false,
    user: null,
  });
};

export const getUsersCollection = (data) => ({
  type: FETCHING_USERS,
  users: data
})

export const getUsers = () => async dispatch => {
  const response = await fetch(SETTINGS.FIREBASE_API + ROUTES.USERS);
  const data = await response.json();
  console.log(data);
  dispatch(getUsersCollection(data))
}
