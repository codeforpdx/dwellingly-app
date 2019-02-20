import propertyManagers from './propertyManagers'
import { getPropertyManagersCollection, getPropertyManagers } from './propertyManagers'

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

describe('getPropertyManagersCollection', () => {
  it('should dispatch actions', () => {
    let data = {name: 'test'}
    let dispatch = jest.fn()
    getPropertyManagersCollection(data)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

function mockFetch(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
}

describe('getPropertyManagers', () => {
  it('should fetch mock data', () => {
    window.fetch = mockFetch({id: 1});
    let dispatch = jest.fn();
    return getPropertyManagers()(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
});