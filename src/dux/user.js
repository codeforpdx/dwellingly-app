// Actions
export const FETCHING_USER_DATA = 'user/FETCHING_USER_DATA';
export const LOGIN = 'user/LOGIN';
export const LOGOUT = 'user/LOGOUT';
export const USER_ERROR = 'user/USER_ERROR';

// Initial State
const initialState = {
  user: [],
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
    user: [],
  });
};
