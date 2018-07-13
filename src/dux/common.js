// Actions
export const INCREMENT_REQUESTED = "counter/INCREMENT_REQUESTED";
export const INCREMENT = "counter/INCREMENT";
export const DECREMENT_REQUESTED = "counter/DECREMENT_REQUESTED";
export const DECREMENT = "counter/DECREMENT";

// Initial State
const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false,
};

// Reducer
export default ( state = initialState, action ) => {
  switch ( action.type ) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true,
      };

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing,
      };

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true,
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing,
      };

    default:
      return state;
  }
};

// Synchronous functions
export function increment() {
  console.log( "go up" );
  return {
    type: INCREMENT,
  };
}

export function decrement() {
  console.log( "go down" );
  return {
    type: DECREMENT,
  };
}

// Asynchronous functions
