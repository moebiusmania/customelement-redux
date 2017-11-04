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
      }
    
    }
  
  }