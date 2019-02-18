import emergencyNumbers from './emergencyNumbers'

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
  
  it('should return state', () => {
    let action = {
      type: 'emergency/CREATE_EMERGENCY_NUMBER'
    };
    let newState = emergencyNumbers({test: true}, action)
    expect(newState.test).toEqual(true)
  });
});