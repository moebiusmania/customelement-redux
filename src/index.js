'use strict';

export const connect = (store, superClass) => {
  
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
          for (let type in eventMap) {
            this.addEventListener(type, event => {
              event.stopImmediatePropagation();
              eventMap[type](event);
            });
          }
        }

        
      }
    
    }
  
  }