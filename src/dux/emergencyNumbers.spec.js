import emergencyNumbers from './emergencyNumbers'
import { getEmergencyNumbersCollection, editEmergencyNumber, createEmergencyNumber, deleteEmergencyNumber, archiveEmergencyNumber } from './emergencyNumbers'

describe('default reducer', () => {
  it('should set isFetchingDataFromFirebase to true', () => {
    let action = {
      type: 'emergency/FETCHING_EMERGENCY_NUMBERS',
      isFetchingDataFromFirebase: true
    };
    let newState = emergencyNumbers({}, action)
    expect(newState.isFetchingDataFromFirebase).toEqual(true)
  });  
  
  it('should set isFetchingDataFromFirebase to true with default parameter', () => {
    let action = {
      type: 'emergency/FETCHING_EMERGENCY_NUMBERS',
      isFetchingDataFromFirebase: true
    };
    let newState = emergencyNumbers(undefined, action)
    expect(newState.isFetchingDataFromFirebase).toEqual(true)
  });
  
  it('should set numbers', () => {
    let action = {
      type: 'emergency/FETCHING_EMERGENCY_NUMBERS_SUCCEEDED',
      isFetchingDataFromFirebase: true,
      numbers: {number: 'test number'}
    };
    let newState = emergencyNumbers({}, action)
    expect(newState.numbers.number).toEqual('test number')
  });
  
  it('should catch error', () => {
    let action = {
      type: 'emergency/FETCHING_EMERGENCY_NUMBERS_ERROR',
      error: true
    };
    let newState = emergencyNumbers({}, action)
    expect(newState.error).toEqual(true)
  });
  
  it('should return edited number', () => {
    let action = {
      type: 'emergency/EDIT_EMERGENCY_NUMBER',
      id: 1,
      contact: 'test 1'
    };
    let newState = emergencyNumbers({numbers: [{id: 1, contact: 'test 2'}]}, action)
    expect(newState.numbers[0].contact).toEqual('test 1')
  });  
  
  // it('should delete state', () => {
  //   let action = {
  //     type: 'emergency/DELETE_EMERGENCY_NUMBER',
  //     id: 1,
  //     number: {}
  //   };
  //   let newState = emergencyNumbers({id: 1, number: 123}, action)
  //   expect(newState.number).toEqual({})
  // });
  // 
  // it('should archive state', () => {
  //   let action = {
  //     type: 'emergency/DELETE_EMERGENCY_NUMBER',
  //     id: 1,
  //     number: {}
  //   };
  //   let newState = emergencyNumbers({id: 1, number: 123}, action)
  //   expect(newState.number).toEqual({})
  // });
  
  it('should return state', () => {
    let action = {
      type: 'emergency/CREATE_EMERGENCY_NUMBER'
    };
    let newState = emergencyNumbers({test: true}, action)
    expect(newState.test).toEqual(true)
  });
});

describe('getEmergencyNumbersCollection', () => {
  it('should dispatch actions', () => {
    let data = {number: 'test'}
    let dispatch = jest.fn()
    getEmergencyNumbersCollection(data)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('editEmergencyNumber', () => {
  it('should dispatch actions', () => {
    let data = {number: 'test'}
    let dispatch = jest.fn()
    editEmergencyNumber(data)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('createEmergencyNumber', () => {
  it('should dispatch actions', () => {
    let data = {number: 'test'}
    let dispatch = jest.fn()
    createEmergencyNumber(data)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('deleteEmergencyNumber', () => {
  it('should dispatch actions', () => {
    let data = {number: 'test'}
    let dispatch = jest.fn()
    deleteEmergencyNumber(data)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('archiveEmergencyNumber', () => {
  it('should dispatch actions', () => {
    let data = {number: 'test'}
    let dispatch = jest.fn()
    archiveEmergencyNumber(data)(dispatch);
    expect(dispatch).toHaveBeenCalled();
  });
});