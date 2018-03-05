'use strict';

import {store} from './../../store';
import './../counter-element';
import './../dispatcher-element';

export default class CounterApp extends HTMLElement {
  constructor() {
    super();

    this.counter = store.getState().counter;
  }

  render() {
    this.innerHTML = `
      <aside class="card">
        <header>
          <h4>Counter app</h4>
        </header>
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
