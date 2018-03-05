'use strict';

import CounterElement from './../counter-element';
import {store} from './../../store';
import connect from './../../..';

class ConnectedCounter extends connect(store, CounterElement) {
  _mapStateToProps(state) {
    return {
      value: state.counter
    };
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('connected-counter', ConnectedCounter);
