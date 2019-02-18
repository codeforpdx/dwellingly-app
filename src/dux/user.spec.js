import user from './user'

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
  
  // HOW TO TEST LOGIN
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
  // SHOULD THIS CASE BE isCreatingUser???
  it('should set creatingUser to false', () => {
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
});