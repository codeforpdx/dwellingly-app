import 'whatwg-fetch';
import properties from './properties'
import { getPropertysCollection, getProperties, createProperty, onAddingProperty, creatingProperty } from './properties'

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
  
  it('should be the correct type', () => {
    let action = {
      type: 'properties/FETCHING_PROPERTIES',
    };
    let newState = properties({type: 'properties/FETCHING_PROPERTIES'}, action)
    expect(newState.type).toEqual('properties/FETCHING_PROPERTIES')
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

describe('createProperty', () => {
  it('should dispatch actions', () => {
    let data = {name: 'test property'}
    let dispatch = jest.fn()
    createProperty(data)(dispatch);
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

function mockError(data) {
  return jest.fn().mockImplementation(() => {
    throw new Error();
  });
}


describe('getProperties', () => {
  it('should fetch mock data', () => {
    window.fetch = mockFetch({id: 1});
    let dispatch = jest.fn();
    return getProperties()(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe('onAddingProperty', () => {
  it('should fetch mock data', () => {
    window.fetch = mockFetch({id: 1});
    return onAddingProperty({}).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe('creatingProperty', () => {
  it('should fetch mock data', () => {
    window.fetch = mockFetch({id: 1});
    let dispatch = jest.fn();
    return creatingProperty({})(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
  
  it('should fetch mock data', () => {
    let dispatch = jest.fn();
    return creatingProperty({})(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(2);
    });
  });
});

describe('creatingProperty', () => {
  it('should fetch mock data', () => {
    window.fetch = mockFetch({id: 1});
    let dispatch = jest.fn();
    return creatingProperty({})(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
  
  it('should fetch mock data', () => {
    let dispatch = jest.fn();
    return creatingProperty({})(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(2);
    });
  });
});

describe('creatingProperty', () => {
  it('should throw error log on catch', () => {
    window.fetch = mockError({id: 1});
    let dispatch = jest.fn();
    return creatingProperty({})(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
});

  
  
  