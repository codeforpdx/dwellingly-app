// Actions
export const FETCHING_AUTHORIZATION = 'user/FETCHING_AUTHORIZATION';
export const FETCHING_USER_DATA = 'user/FETCHING_USER_DATA';
export const LOGIN = 'user/LOGIN';
export const NO_USER = 'user/NO_USER';
export const ADD_ERROR = 'user/ADD_ERROR';
export const CLEAR_ERROR = 'user/CLEAR_ERROR';

// Initial State
const initialState = {
  user: {},
  accountSource: null,
  isFetchingAuthorization: false,
  isFetchingUserData: false,
  haveUser: false,
  error: null,
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_AUTHORIZATION:
      return {
        ...state,
        isFetchingAuthorization: action.isFetchingAuthorization,
        haveUser: action.haveUser,
        error: action.error,
      };

    case FETCHING_USER_DATA:
      return {
        ...state,
        isFetchingUserData: action.isFetchingUserData,
        haveUser: action.haveUser,
        error: action.error,
      };

    case LOGIN:
      return {
        ...state,
        user: action.user,
        isFetchingAuthorization: action.isFetchingAuthorization,
        isFetchingUserData: action.isFetchingUserData,
        haveUser: action.haveUser,
        error: action.error,
      };

    case NO_USER:
      return {
        ...state,
        user: action.user,
        isFetchingAuthorization: action.isFetchingAuthorization,
        isFetchingUserData: action.isFetchingUserData,
        haveUser: action.haveUser,
      };

    case ADD_ERROR:
      return {
        ...state,
        haveUser: action.haveUser,
        isFetchingAuthorization: action.isFetchingAuthorization,
        isFetchingUserData: action.isFetchingUserData,
        error: action.error,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        haveUser: action.haveUser,
        isFetchingAuthorization: action.isFetchingAuthorization,
        isFetchingUserData: action.isFetchingUserData,
        error: action.error,
      };

    default:
      return state;
  }
};

// Sychronous functions
export const initiateFirebaseCall = () => (dispatch) => {
  dispatch({
    type: FETCHING_AUTHORIZATION,
    isFetchingAuthorization: true,
    haveUser: false,
    error: null,
  });  
}

export const initiateUserDataCall = () => (dispatch) => {
  dispatch({
    type: FETCHING_USER_DATA,
    isFetchingUserData: true,
    haveUser: false,
  });  
}



export const createUser = user => (dispatch) => {
  dispatch({
    type: LOGIN,
    isFetchingUserData: false,
    haveUser: true,
    user: {
      email: user.email,
      accountSource: user.providerData.providerId,
      id: user.l,
    },
  });
};

export const setUserFromFirebaseEmail = (user) => (dispatch) => {
  console.log(user);
  dispatch({
    type: LOGIN,
    isFetchingAuthorization: false,
    isFetchingUserData: false,
    haveUser: true,
    user: {
      email: user.email,
      id: user.id,
    },
    error: null,
  });
};

export const setUserFromGoogle = (user) => (dispatch) => {
  console.log(user)
  dispatch({
    type: LOGIN,
    isFetchingAuthorization: false,
    isFetchingUserData: false,
    haveUser: true,
    user: {
      email: user.email,
      accountSource: user.credential.signInMethod,
      id: user.uid,
    },
    error: null,
  });
};

export const addCustomUserData = (user, accountSource) => (dispatch) => {
  dispatch({
    type: LOGIN,
    isFetchingAuthorization: false,
    isFetchingUserData: false,
    haveUser: true,
    user: {
      accountSource,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      role: user.role,
    },
    error: null,
  });
};

export const clearUser = () => (dispatch) => {
  dispatch({
    type: NO_USER,
    isFetchingAuthorization: false,
    isFetchingUserData: false,
    haveUser: false,
    user: null,
  });
};

export const addError = error => (dispatch) => {
  console.log(error);
  dispatch({
    type: ADD_ERROR,
    isFetchingAuthorization: false,
    isFetchingUserData: false,
    haveUser: false,
    error,
  });
};

export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
    isFetchingDataFromFirebase: false,
    haveUser: false,
    error: null,
  });
};

// User data from Firestore
export const getFirestoreUserData = ( json ) => (dispatch) => {
  console.log(json)
  dispatch(initiateUserDataCall())
  .then(console.log(json.id))
}
