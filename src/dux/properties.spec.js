import properties from './properties'
import { getPropertysCollection, getProperties } from './properties'
import { ENDPOINTS, HTTP_METHODS } from '../constants/constants';

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

describe('getPropertysCollection', () => {
  it('should dispatch actions', () => {
    let data = {name: 'test'}
    let dispatch = jest.fn()
    getPropertysCollection(data)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

// describe('getProperties', () => {
//   it('should fetch mock json', done => {
//     let propertyObj = {id: 1, name: 'test property'}
//     let dispatch = jest.fn()
//     getPropertysCollection = jest.fn()
//     let fetch = jest.fn(() => new Promise(resolve => resolve()));
//     getProperties()(dispatch)
//     expect(dispatch).toHaveBeenCalled();
//     expect(getPropertysCollection).toHaveBeenCalled();
//   });
// });


// describe('getProperties', () => {
//   it('fetches data from server when server returns a successful response', done => { // 1
//     window.fetch = mockFetch;
//     const mockSuccessResponse = {};
//     const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
//     const mockFetchPromise = Promise.resolve({ // 3
//       json: () => mockJsonPromise,
//     });
//     jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4  
//     expect(global.fetch).toHaveBeenCalledTimes(1);
//     expect(global.fetch).toHaveBeenCalledWith(`${ENDPOINTS.PROPERTY}`);
// 
//       global.fetch.mockClear(); // 7
//       done(); // 8
//     });
//   });

  