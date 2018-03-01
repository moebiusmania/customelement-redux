import { createStore } from 'redux';
import { connect } from './../src/index';

// Example class to test
export const example = class {
  constructor(){
    this.data = 42;
  }
}

// Mock reducer
const counter = (state = { counter: 24 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, { counter: state.counter + 1 });
    case 'DECREMENT':
      return Object.assign({}, state, { counter: state.counter - 1 });
    case 'SET':
      const counter = action.payload;
      return Object.assign({}, state, { counter });
    default:
      return state;
  }
}

// Exporting mock store
export const store = createStore(counter);

// A mock connected class
export const connected = class extends connect(store, example) {
  _mapStateToProps(state) {
    return {
      data: state.counter
    };
  }
};