
export default class CounterElement extends HTMLElement {
  static get observedAttributes() {
    return ['value'];
  }

  constructor() {
    super();

    this.state = {
      value: 0
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const condition = this.state[name] !== newValue;
    condition ? this.state[name] = newValue : null; // eslint-disable-line no-unused-expressions
    this.render();
  }

  render() {
    this.innerHTML = `
      <section>
        <p>Total: <strong>${this.state.value}</strong></p>
      </section>
    `;
  }

  setProperties(props) {
    this.state = props;
    this.render();
  }

  _update(obj, prop, value) {
    obj[prop] = value;
    this.setAttribute('value', value);
    this.render();
    return true;
  }

  connectedCallback() {
    console.log('<counter-element> INIT');

    this.state = new Proxy({
      value: this.getAttribute('value') || 0
    }, {set: this._update.bind(this)});
  }
}

customElements.define('counter-element', CounterElement);
