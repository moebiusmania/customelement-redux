
import {JSDOM} from 'jsdom-wc';

const {window} = new JSDOM(`<!DOCTYPE html>`);

Object.assign(global, {
  document: window.document,
  HTMLElement: window.HTMLElement,
  customElements: window.customElements,
  window
});

// CustomEvent Polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
const CustomEvent = (event, params) => {
  params = params || {bubbles: false, cancelable: false, detail: undefined};
  const evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
  return evt;
};

CustomEvent.prototype = window.Event.prototype;
window.CustomEvent = CustomEvent;

// Example class to test
export default class extends HTMLElement {
  constructor() {
    super();
    this.data = 42;
  }

  set(num) {
    this.dispatchEvent(
      new CustomEvent('set', {
        bubbles: true,
        composed: true,
        detail: num
      })
    );
  }

  increment() {
    this.dispatchEvent(
      new CustomEvent('increment', {
        bubbles: true, composed: true
      })
    );
  }
}
