'use strict';

import { DispatcherElement } from './../dispatcher-element';
import { store } from './../store';
import { connect } from './../../index';

class ConnectedDispatcher extends connect(store, DispatcherElement) {

  _mapDispatchToEvents(dispatch) {
    return {
      'increment'(e) {
        dispatch({ type: 'INCREMENT' });
      }, 
      'decrement'(e) {
        dispatch({ type: 'DECREMENT' });
      }
    };
  }

}

customElements.define('connected-dispatcher', ConnectedDispatcher);