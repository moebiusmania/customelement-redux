'use strict';

export default class DispatcherElement extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
  }

  render() {
    this.shadow.innerHTML = `
      <section>
        <button data-action="increment">+</button>
        <button data-action="decrement">-</button>
      </section>
    `;
  }

  connectedCallback() {
    this.render();

    this.addEventListener('click', evt => {
      const subj = this.shadowRoot.activeElement || evt.__target;
      const action = subj.dataset.action;
      this.dispatchEvent(
        new CustomEvent(action, {bubbles: true, composed: true})
      );
    });
  }
}

customElements.define('dispatcher-element', DispatcherElement);
