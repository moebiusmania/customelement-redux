import {createStore} from 'redux';

// Mock reducer
const counter = (state = {counter: 24}, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      return Object.assign({}, state, {counter: state.counter + 1});
    }
    case 'DECREMENT': {
      return Object.assign({}, state, {counter: state.counter - 1});
    }
    case 'SET': {
      const counter = action.payload;
      return Object.assign({}, state, {counter});
    }
    default:
      return state;
  }
};

// Exporting mock store
export default createStore(counter);
