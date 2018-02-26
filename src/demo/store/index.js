'use strict';

import { createStore } from 'redux';

// Actions
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

// Action creators
export const actions = {
  increment: () => Object.create({ type: INCREMENT }),
  decrement: () => Object.create({ type: DECREMENT })
}

// Reducer
const counter = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return Object.assign({}, state, { counter: state.counter + 1});
    case DECREMENT:
      return Object.assign({}, state, { counter: state.counter - 1});
    default:
      return state
  }
}

// Creating the Redux store
export const store = createStore(counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());