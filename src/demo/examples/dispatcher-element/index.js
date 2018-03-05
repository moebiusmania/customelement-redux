
export default class DispatcherElement extends HTMLElement {
  render() {
    this.innerHTML = `
      <section>
        <button 
          data-action="increment" 
          class="button outline">+</button>
        <button 
          data-action="decrement" 
          class="button outline">-</button>
      </section>
    `;
  }

  connectedCallback() {
    this.render();

    this.addEventListener('click', evt => {
      const subj = evt.target;
      const action = subj.dataset.action;
      this.dispatchEvent(
        new CustomEvent(action, {bubbles: true, composed: true})
      );
    });
  }
}

customElements.define('dispatcher-element', DispatcherElement);
