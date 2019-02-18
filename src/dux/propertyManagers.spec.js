import propertyManagers from './propertyManagers'

describe('default reducer', () => {
  it('should set isFetchingDataFromFirebase to true', () => {
    let action = {
      type: 'users/FETCHING_PROPERTY_MANAGERS',
      isFetchingDataFromFirebase: true
    };
    let newState = propertyManagers({}, action)
    expect(newState.isFetchingDataFromFirebase).toEqual(true)
  });
  
  it('should set isFetchingDataFromFirebase to true with default parameter', () => {
    let action = {
      type: 'users/FETCHING_PROPERTY_MANAGERS',
      isFetchingDataFromFirebase: true
    };
    let newState = propertyManagers(undefined, action)
    expect(newState.isFetchingDataFromFirebase).toEqual(true)
  });
  
  it('should set propertyManagers', () => {
    let action = {
      type: 'users/FETCHING_PROPERTY_MANAGERS_SUCCEEDED',
      isFetchingDataFromFirebase: true,
      propertyManagers: {name: 'test manager'}
    };
    let newState = propertyManagers({}, action)
    expect(newState.propertyManagers.name).toEqual('test manager')
  });
  
  it('should use default case', () => {
    let action = {
      type: 'test type'
    };
    let newState = propertyManagers({test: true}, action)
    expect(newState.test).toEqual(true)
  });
});