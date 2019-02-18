import common from './common'

describe('default reducer', () => {
  it('should set isFetchingDataFromFirebase to true', () => {
    let action = {
      type: 'counter/INCREMENT_REQUESTED',
      isIncrementing: true
    };
    let newState = common({}, action)
    expect(newState.isIncrementing).toEqual(true)
  });
  
  it('should set isIncrementing to true with default parameter', () => {
    let action = {
      type: 'counter/INCREMENT_REQUESTED',
      isIncrementing: true
    };
    let newState = common(undefined, action)
    expect(newState.isIncrementing).toEqual(true)
  });
  
  it('should increment', () => {
    let count = 0
    let action = {
      type: 'counter/INCREMENT',
      isIncrementing: true,
      count: count + 1
    };
    let newState = common({count: 0}, action)
    expect(newState.count).toEqual(1)
  });
  
  it('should set isDecrementing to true', () => {
    let action = {
      type: 'counter/DECREMENT_REQUESTED',
      isDecrementing: true
    };
    let newState = common({}, action)
    expect(newState.isDecrementing).toEqual(true)
  });
  
  it('should decrement', () => {
    let count = 0
    let action = {
      type: 'counter/DECREMENT',
      isDecrementing: true,
      count: count - 1
    };
    let newState = common({count: 1}, action)
    expect(newState.count).toEqual(0)
  });
  
  it('should use default case', () => {
    let action = {
      type: 'test type'
    };
    let newState = common({test: true}, action)
    expect(newState.test).toEqual(true)
  });
});