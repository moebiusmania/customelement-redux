'use strict';

import { store } from './../store';
import './../counter-element';

export class CounterApp extends HTMLElement {

  constructor(){
    super();

    this.shadow = this.attachShadow({mode: 'open'});
    this.counter = store.getState().counter;
  }

  render(){
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
        <button data-action="INCREMENT">+</button>
        <button data-action="DECREMENT">-</button>
      </aside>
    `;
  }

  action(event){
    console.log(event);
  }

  connectedCallback(){
    this.render();

    store.subscribe(() => {
      this.counter = store.getState().counter;
      this.render();
    });

    this.addEventListener('click', (evt) => {
      const subj = this.shadowRoot.activeElement || evt.__target;
      const action = subj.dataset.action;
      store.dispatch({ type: action });
    });
  }
}

customElements.define('counter-app', CounterApp);
