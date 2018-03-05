'use strict';

import DispatcherElement from './../dispatcher-element';
import {store} from './../../store';
import connect from './../../..';

class ConnectedDispatcher extends connect(store, DispatcherElement) {
  _mapDispatchToEvents(dispatch) {
    return {
      'increment'() {
        dispatch({type: 'INCREMENT'});
      },
      'decrement'() {
        dispatch({type: 'DECREMENT'});
      }
    };
  }
}

customElements.define('connected-dispatcher', ConnectedDispatcher);
