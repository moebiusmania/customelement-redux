// TODO: better organize the code here

import { createStore } from 'redux';
import { connect } from './../src/index';
import { JSDOM } from 'jsdom-wc';

const { window } = new JSDOM(`<!DOCTYPE html>`);

Object.assign(global, {
  document: window.document,
  HTMLElement: window.HTMLElement,
  customElements: window.customElements,
  window,
});

// Mocking CustomEvent spec in node
const CustomEvent = function (event, params) {
  var evt, origPrevent;
  params = params || {
    bubbles: false,
    cancelable: false,
    detail: undefined
  };

  evt = document.createEvent("CustomEvent");
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  origPrevent = evt.preventDefault;
  evt.preventDefault = function () {
    origPrevent.call(this);
    try {
      Object.defineProperty(this, 'defaultPrevented', {
        get: function () {
          return true;
        }
      });
    } catch (e) {
      this.defaultPrevented = true;
    }
  };
  return evt;
};

CustomEvent.prototype = window.Event.prototype;
window.CustomEvent = CustomEvent; // expose definition to window


// Example class to test
export const example = class extends HTMLElement {
  constructor(){
    super();
    this.data = 42;
  }

  set(num){
    this.dispatchEvent(
      new CustomEvent('set', { 
        bubbles: true, 
        composed: true ,
        detail: num
      })
    );
  }

  increment(){
    this.dispatchEvent(
      new CustomEvent('increment', { 
        bubbles: true, composed: true 
      })
    );
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

  _mapDispatchToEvents(dispatch) {
    return {
      'increment'(e) {
        dispatch({ type: 'INCREMENT' });
      },
      'set'(e) {
        dispatch({ type: 'SET', payload: e.detail });
      }
    };
  }
};