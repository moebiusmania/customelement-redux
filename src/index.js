'use strict';

export default (store, superClass) => {
  return class extends superClass {
    constructor() {
      super();
      // Map state to props
      if (this._mapStateToProps) {
        const setProps = this.setProperties ?
          props => this.setProperties(props) :
          props => Object.assign(this, props);
        const update = () => setProps(this._mapStateToProps(store.getState()));
        // Sync with store
        store.subscribe(update);
        update();
      }

      // Map dispatch to events
      if (this._mapDispatchToEvents) {
        const eventMap = this._mapDispatchToEvents(store.dispatch);
        for (const type in eventMap) {
          if (type) {
            this.addEventListener(type, event => {
              event.stopImmediatePropagation();
              eventMap[type](event);
            });
          }
        }
      }
    }
  };
};
