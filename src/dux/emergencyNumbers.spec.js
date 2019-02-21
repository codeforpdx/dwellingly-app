import emergencyNumbers from './emergencyNumbers'
import { getEmergencyNumbersCollection, getEmergencyNumbers, editEmergencyNumber, createEmergencyNumber, editingEmergencyNumber, onEditingEmergencyNumber, creatingEmergencyNumber, deleteEmergencyNumber, onDeletingEmergencyNumber,  deletingEmergencyNumber, archiveEmergencyNumber, onArchivingEmergencyNumber, archivingEmergencyNumber } from './emergencyNumbers'

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
  
  it('should delete state of number', () => {
    let action = {
      type: 'emergency/DELETE_EMERGENCY_NUMBER',
      id: 1,
      contact: 'test 1',
      numbers:[]
    };
    let newState = emergencyNumbers({numbers: [{id: 1, contact: 'test 2'}]}, action)
    expect(newState.numbers[0]).toEqual(undefined)
  });
  
  it('should archive state of number', () => {
    let action = {
      type: 'emergency/ARCHIVE_EMERGENCY_NUMBER',
      id: 1,
      contact: 'test 1',
      numbers:[]
    };
    let newState = emergencyNumbers({numbers: [{id: 1, contact: 'test 2'}]}, action)
    expect(newState.numbers[0]).toEqual(undefined)
  });
  
  it('should return edited number', () => {
    let action = {
      type: 'test type',
    };
    let newState = emergencyNumbers({id: 1}, action)
    expect(newState.id).toEqual(1)
  }); 
  
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

describe('getEmergencyNumbers', () => {
  it('should fetch mock data', () => {
    window.fetch = mockFetch({id: 1});
    let dispatch = jest.fn();
    return getEmergencyNumbers()(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe('creatingEmergencyNumber', () => {
  it('should take data and dispatch creatingEmergencyNumber function', () => {
    window.fetch = mockFetch({id: 1});
    let dispatch = jest.fn();
    return creatingEmergencyNumber({})(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
  it('should throw error log on catch', () => {
    window.fetch = mockError({id: 1});
    let dispatch = jest.fn();
    return creatingEmergencyNumber({})(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe('onEditingEmergencyNumber', () => {
  it('should fetch mock number data', () => {
    window.fetch = mockFetch({id: 1});
    return onEditingEmergencyNumber({}).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe('editingEmergencyNumber', () => {
  it('should take data and dispatch editingEmergencyNumber function', () => {
    window.fetch = mockFetch({id: 1});
    let dispatch = jest.fn();
    return editingEmergencyNumber({})(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
  it('should throw error log on catch', () => {
    window.fetch = mockError({id: 1});
    let dispatch = jest.fn();
    return editingEmergencyNumber({})(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe('onDeletingEmergencyNumber', () => {
  it('should fetch mock data', () => {
    window.fetch = mockFetch({id: 1});
    return onDeletingEmergencyNumber({}).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe('deletingEmergencyNumber', () => {
  it('should fetch mock data', () => {
    window.fetch = mockFetch({id: 1});
    let dispatch = jest.fn();
    return deletingEmergencyNumber({})(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
  it('should throw error log on catch', () => {
    window.fetch = mockError({id: 1});
    let dispatch = jest.fn();
    return deletingEmergencyNumber({})(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe('onArchivingEmergencyNumber', () => {
  it('should fetch mock data', () => {
    window.fetch = mockFetch({id: 1});
    return onArchivingEmergencyNumber({}).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe('archivingEmergencyNumber', () => {
  it('should take data and dispatch archivingEmergencyNumber function', () => {
    window.fetch = mockFetch({id: 1});
    let dispatch = jest.fn();
    return archivingEmergencyNumber({})(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
  it('should throw error log on catch', () => {
    window.fetch = mockError({id: 1});
    let dispatch = jest.fn();
    return archivingEmergencyNumber({})(dispatch).then( () => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });
  });
});