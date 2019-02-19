import user from './user'
import { getUsersCollection, initiateUserDetailsCall, initiateCreateUserCall, setUserFromFirebaseEmail, setUserFromGoogle, clearUser, addError, clearError, initiateUserPasswordEmail, resetUserPasswordEmail, resetUserPasswordEmailError } from './user'

describe('default reducer', () => {
  it('should set isFetchingAuthorization to true', () => {
    let action = {
      type: 'user/GET_AUTHORIZATION',
      isFetchingAuthorization: true,
    };
    let newState = user({}, action)
    expect(newState.isFetchingAuthorization).toEqual(true)
  });  
  
  it('should set isFetchingAuthorization to true with default parameter', () => {
    let action = {
      type: 'user/GET_AUTHORIZATION',
      isFetchingAuthorization: true
    };
    let newState = user(undefined, action)
    expect(newState.isFetchingAuthorization).toEqual(true)
  });
  
  it('should set haveToken to false', () => {
    let action = {
      type: 'user/GET_AUTHORIZATION',
      haveToken: false,
    };
    let newState = user({}, action)
    expect(newState.haveToken).toEqual(false)
  });
  
  it('should set error to null', () => {
    let action = {
      type: 'user/GET_AUTHORIZATION',
      error: null,
    };
    let newState = user({}, action)
    expect(newState.error).toEqual(null)
  });
  
  it('should set isFetchingAuthorization to false', () => {
    let action = {
      type: 'user/GET_AUTHORIZATION_COMPLETE',
      isFetchingAuthorization: false,
    };
    let newState = user({}, action)
    expect(newState.isFetchingAuthorization).toEqual(false)
  });
  
  it('should set user', () => {
    let action = {
      type: 'user/GET_AUTHORIZATION_COMPLETE',
      user: {name: 'bob ross'}
    };
    let newState = user({}, action)
    expect(newState.user.name).toEqual('bob ross')
  });
  
  it('should set isFetchingUserData to true', () => {
    let action = {
      type: 'user/GET_USER_DATA',
      isFetchingUserData: true,
    };
    let newState = user({}, action)
    expect(newState.isFetchingUserData).toEqual(true)
  }); 
  
  it('should set isFetchingUserData to false', () => {
    let action = {
      type: 'user/GET_USER_DATA_COMPLETE',
      isFetchingUserData: false,
    };
    let newState = user({}, action)
    expect(newState.isFetchingUserData).toEqual(false)
  }); 
  
  it('should set users', () => {
    let action = {
      type: 'user/FETCHING_USERS',
      users: {name: 'bob ross'}
    };
    let newState = user({}, action)
    expect(newState.users.name).toEqual('bob ross')
  });
  
  it('should set isFetchingDataFromFirebase to false', () => {
    let action = {
      type: 'user/LOGIN',
      isFetchingDataFromFirebase: true,
    };
    let newState = user({}, action)
    expect(newState.isFetchingDataFromFirebase).toEqual(true)
  }); 
  
  it('should set user to null', () => {
    let action = {
      type: 'user/LOGOUT',
      user: null
    };
    let newState = user({}, action)
    expect(newState.user).toEqual(null)
  });
  
  it('should catch user error', () => {
    let action = {
      type: 'user/USER_ERROR',
      error: true
    };
    let newState = user({}, action)
    expect(newState.error).toEqual(true)
  });
  
  it('should set isCreatingUser to true', () => {
    let action = {
      type: 'user/CREATE_USER',
      isCreatingUser: true,
    };
    let newState = user({}, action)
    expect(newState.isCreatingUser).toEqual(true)
  });
  
  it('should set haveUser to false', () => {
    let action = {
      type: 'user/CREATE_USER',
      haveUser: false
    };
    let newState = user({}, action)
    expect(newState.haveUser).toEqual(false)
  });
  
  it('should set isCreatingUser to false', () => {
    let action = {
      type: 'user/CREATE_USER_COMPLETE',
      isCreatingUser: false
    };
    let newState = user({}, action)
    expect(newState.isCreatingUser).toEqual(false)
  });
  
  it('should set haveUser to true', () => {
    let action = {
      type: 'user/CREATE_USER_COMPLETE',
      haveUser: true
    };
    let newState = user({}, action)
    expect(newState.haveUser).toEqual(true)
  });
  
  it('should set isFetchingUserData to true', () => {
    let action = {
      type: 'user/NO_USER',
      isFetchingUserData: false
    };
    let newState = user({}, action)
    expect(newState.isFetchingUserData).toEqual(false)
  });
  
  it('should set error to true', () => {
    let action = {
      type: 'user/ADD_ERROR',
      error: true
    };
    let newState = user({}, action)
    expect(newState.error).toEqual(true)
  });
  
  it('should set error to null', () => {
    let action = {
      type: 'user/CLEAR_ERROR',
      error: null
    };
    let newState = user({}, action)
    expect(newState.error).toEqual(null)
  });
  
  it('should set isResettingPassword to true', () => {
    let action = {
      type: 'user/RESET_USER_PASSWORD',
      isResettingPassword: true
    };
    let newState = user({}, action)
    expect(newState.isResettingPassword).toEqual(true)
  });
  
  it('should set passwordResetComplete to false', () => {
    let action = {
      type: 'user/RESET_USER_PASSWORD',
      passwordResetComplete: false
    };
    let newState = user({}, action)
    expect(newState.passwordResetComplete).toEqual(false)
  });
  
  it('should set passwordResetComplete to true', () => {
    let action = {
      type: 'user/RESET_USER_PASSWORD_COMPLETE',
      passwordResetComplete: true
    };
    let newState = user({}, action)
    expect(newState.passwordResetComplete).toEqual(true)
  });
  
  it('should set error to true', () => {
    let action = {
      type: 'user/RESET_USER_PASSWORD_ERROR',
      error: true
    };
    let newState = user({}, action)
    expect(newState.error).toEqual(true)
  });
  
  it('should use default case', () => {
    let action = {
      type: 'test type'
    };
    let newState = user({test: true}, action)
    expect(newState.test).toEqual(true)
  });
});

describe('getUsersCollection', () => {
  it('should call getUsersCollection', () => {
    let data = {user: 'test'}
    let getUsersCollection = jest.fn()
    getUsersCollection(data);
    expect(getUsersCollection).toHaveBeenCalled();
  });
});

describe('initiateUserDetailsCall', () => {
  it('should dispatch actions', () => {
    let data = {user: 'test'}
    let dispatch = jest.fn()
    initiateUserDetailsCall(data)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('initiateCreateUserCall', () => {
  it('should dispatch actions', () => {
    let dispatch = jest.fn()
    initiateCreateUserCall()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('setUserFromFirebaseEmail', () => {
  it('should call setUserFromFirebaseEmail', () => {
    let user = {email: 'email@gmail.com',
      id: 1}
    let dispatch = jest.fn()
    setUserFromFirebaseEmail(user)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

// describe('setUserFromGoogle', () => {
//   it('should call setUserFromGoogle', () => {
//     let user = {email: 'test'}
//     let dispatch = jest.fn()
//     setUserFromGoogle(user)(dispatch);
//     expect(dispatch).toHaveBeenCalled();
//   });
// });

describe('clearUser', () => {
  it('should dispatch actions', () => {
    let dispatch = jest.fn()
    clearUser()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('addError', () => {
  it('should dispatch actions', () => {
    let error: true
    let dispatch = jest.fn()
    addError(error)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('clearError', () => {
  it('should dispatch actions', () => {
    let dispatch = jest.fn()
    clearError()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('initiateUserPasswordEmail', () => {
  it('should dispatch actions', () => {
    let dispatch = jest.fn()
    initiateUserPasswordEmail()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('resetUserPasswordEmail', () => {
  it('should dispatch actions', () => {
    let dispatch = jest.fn()
    resetUserPasswordEmail()(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('resetUserPasswordEmailError', () => {
  it('should dispatch actions', () => {
    let error = true
    let dispatch = jest.fn()
    resetUserPasswordEmailError(error)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});