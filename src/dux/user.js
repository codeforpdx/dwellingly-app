// Actions for users
export const GET_AUTHORIZATION = 'user/GET_AUTHORIZATION';
export const GET_AUTHORIZATION_COMPLETE = 'user/GET_AUTHORIZATION_COMPLETE';
export const GET_USER_DATA = 'user/GET_USER_DATA';
export const GET_USER_DATA_COMPLETE = 'user/GET_USER_DATA_COMPLETE';
export const CREATE_USER = 'user/CREATE_USER';
export const FETCHING_USER_DATA = 'user/FETCHING_USER_DATA';
export const FETCHING_USERS = 'user/FETCHING_USERS';
export const CREATE_USER_COMPLETE = 'user/CREATE_USER_COMPLETE';
export const RESET_USER_PASSWORD = 'user/RESET_USER_PASSWORD';
export const RESET_USER_PASSWORD_COMPLETE = 'user/RESET_USER_PASSWORD_COMPLETE';
export const RESET_USER_PASSWORD_ERROR = 'user/RESET_USER_PASSWORD_ERROR';
export const NO_USER = 'user/NO_USER';
export const ADD_ERROR = 'user/ADD_ERROR';
export const LOGIN = 'user/LOGIN';
export const LOGOUT = 'user/LOGOUT';
export const USER_ERROR = 'user/USER_ERROR';
export const CLEAR_ERROR = 'user/CLEAR_ERROR';

// Initial state for users
const initialState = {
  user: null,
  accountSource: null,
  isFetchingAuthorization: false,
  isFetchingUserData: false,
  isCreatingUser: false,
  isResettingPassword: false,
  haveToken: false,
  haveUser: false,
  passwordResetComplete: false,
  error: null,
};

// Reducer for the user store
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTHORIZATION:
      return {
        ...state,
        isFetchingAuthorization: action.isFetchingAuthorization,
        haveToken: action.haveToken,
        error: action.error,
      };

    case GET_AUTHORIZATION_COMPLETE:
      return {
        ...state,
        isFetchingAuthorization: action.isFetchingAuthorization,
        haveToken: action.haveToken,
        user: action.user,
        error: action.error,
      };

    case GET_USER_DATA:
      return {
        ...state,
        isFetchingUserData: action.isFetchingUserData,
        haveUser: action.haveUser,
        error: action.error,
      };

    case GET_USER_DATA_COMPLETE:
      return {
        ...state,
        isFetchingUserData: action.isFetchingUserData,
        isFetchingAuthorization: action.isFetchingAuthorization,
        haveUser: action.haveUser,
        user: action.user,
        error: action.error,
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


    case CREATE_USER:
      return {
        ...state,
        isCreatingUser: action.isCreatingUser,
        haveUser: action.haveUser,
        error: action.error,
      };

    case CREATE_USER_COMPLETE:
      return {
        ...state,
        creatingUser: action.creatingUser,
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
      
    case RESET_USER_PASSWORD:
      return {
        ...state,
        isResettingPassword: action.isResettingPassword,
        passwordResetComplete: action.passwordResetComplete,
      };

    case RESET_USER_PASSWORD_COMPLETE:
      return {
        ...state,
        isResettingPassword: action.isResettingPassword,
        passwordResetComplete: action.passwordResetComplete,
      };
    case RESET_USER_PASSWORD_ERROR:
      return {
        ...state,
        isResettingPassword: action.isResettingPassword,
        passwordResetComplete: action.passwordResetComplete,
        error: action.error,
      };
    default:
      return state;
  }
};

// Sychronous functions

export const getUsersCollection = (data) => ({
  type: FETCHING_USERS,
  users: data
})

export const getUsers = () => async dispatch => {
  const response = await fetch(SETTINGS.FIREBASE_API + ROUTES.USERS);
  const data = await response.json();
  dispatch(getUsersCollection(data))
}



export const initiateFirebaseCall = () => (dispatch) => {
  console.log('initiate firebase call');
  dispatch({
    type: GET_AUTHORIZATION,
    isFetchingAuthorization: true,
    haveToken: false,
    error: null,
  });  
}

export const getAuthDetailsFromFirebase = (user, accountSource) => (dispatch) => {
  console.log('here are the details about user from firebase');
  console.log(user)
  dispatch({
    type: GET_AUTHORIZATION_COMPLETE,
    isFetchingAuthorization: false,
    haveToken: true,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accountSource,
      id: user.localId,
      role: user.role,
    },
    error: user.error
  });  
}

export const initiateUserDetailsCall = () => (dispatch) => {
  dispatch({
    type: GET_USER_DATA,
    isFetchingUserData: true,
    haveUser: false,
    error: null,
  });  
}

export const addCustomUserData = (userData, accountSource, userID) => (dispatch) => {
  let userIdentifier = userID
  if (userData && userData.id && userData.id.length > 0) {
    userIdentifier = userData.id
  } else if (userData && userData.localId && userData.localId.length > 0) {
    userIdentifier = userData.localId
  }
  let userRole = {};
  if (userData && userData.role) {
    userRole = {
          isAdmin: userData.role.isAdmin,
          isPropertyManager: userData.role.isPropertyManager,
          isStaff: userData.role.isStaff,
        }
  }
  if (userData && accountSource) {
    dispatch({
      type: GET_USER_DATA_COMPLETE,
      isCreatingUser: false,
      isFetchingAuthorization: false,
      isFetchingUserData: false,
      haveUser: true,
      user: {
        accountSource,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        id: userIdentifier,
        role: userRole,
      },
      error: null,
    });
  }
};

export const initiateCreateUserCall = () => (dispatch) => {
  dispatch({
    type: CREATE_USER,
    isFetchingUserData: true,
    haveUser: false,
    error: null,
  });  
}

export const setUserFromFirebaseEmail = (user) => (dispatch) => {
  console.log('is this thing on?', user)
  dispatch({
    type: CREATE_USER_COMPLETE,
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
  dispatch({
    type: CREATE_USER_COMPLETE,
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

export const clearUser = () => (dispatch) => {
  dispatch({
    type: NO_USER,
    isFetchingAuthorization: false,
    isFetchingUserData: false,
    haveToken: false,
    haveUser: false,
    user: null,
  });
};

export const addError = error => (dispatch) => {
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


export const initiateUserPasswordEmail = () => (dispatch) => {
  dispatch({
    type: RESET_USER_PASSWORD,
    isResettingPassword: true,
    passwordResetComplete: false,
    error: null
  });
};


export const resetUserPasswordEmail = () => (dispatch) => {
  dispatch({
    type: RESET_USER_PASSWORD_COMPLETE,
    isResettingPassword: false,
    passwordResetComplete: true,
  });
};

export const resetUserPasswordEmailError = error => (dispatch) => {
  dispatch({
    type: RESET_USER_PASSWORD_ERROR,
    isResettingPassword: false,
    passwordResetComplete: false,
    error
  });
};



