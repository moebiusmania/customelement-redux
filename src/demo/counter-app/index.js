'use strict';

import {store} from './../store';
import './../counter-element';
import './../dispatcher-element';

export default class CounterApp extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
    this.counter = store.getState().counter;
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        aside{
          background-color: rgba(0,0,0,0.03);
          padding: 1px 15px 10px;
        }
      </style>
      <aside>
        <h4>Counter app</h4>
        <counter-element value="${this.counter}"></counter-element>
        <dispatcher-element></dispatcher-element>
      </aside>
    `;
  }

  action(event) {
    console.log(event);
  }

  connectedCallback() {
    this.render();

    store.subscribe(() => {
      this.counter = store.getState().counter;
      this.render();
    });

    this.addEventListener('increment', () => {
      store.dispatch({type: 'INCREMENT'});
    });

    this.addEventListener('decrement', () => {
      store.dispatch({type: 'DECREMENT'});
    });
  }
}

customElements.define('counter-app', CounterApp);
