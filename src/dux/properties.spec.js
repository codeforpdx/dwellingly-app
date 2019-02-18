import properties from './properties'

describe('default reducer', () => {
  it('should set isFetchingDataFromFirebase to true', () => {
    let action = {
      type: 'properties/FETCHING_PROPERTIES',
      isFetchingDataFromFirebase: true
    };
    let newState = properties({}, action)
    expect(newState.isFetchingDataFromFirebase).toEqual(true)
  });
  
  it('should set isFetchingDataFromFirebase to true with default parameter', () => {
    let action = {
      type: 'properties/FETCHING_PROPERTIES',
      isFetchingDataFromFirebase: true
    };
    let newState = properties(undefined, action)
    expect(newState.isFetchingDataFromFirebase).toEqual(true)
  });
  
  it('should set properties', () => {
    let action = {
      type: 'properties/FETCHING_PROPERTIES_SUCCEEDED',
      isFetchingDataFromFirebase: true,
      properties: {name: 'test property'}
    };
    let newState = properties({}, action)
    expect(newState.properties.name).toEqual('test property')
  });
  
  it('should return state', () => {
    let action = {
      type: 'properties/CREATE_PROPERTY'
    };
    let newState = properties({test: true}, action)
    expect(newState.test).toEqual(true)
  });
  
  it('should use default case', () => {
    let action = {
      type: 'test type'
    };
    let newState = properties({test: true}, action)
    expect(newState.test).toEqual(true)
  });
});