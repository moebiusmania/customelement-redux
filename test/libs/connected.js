import connect from './../../src';
import store from './store';
import Example from './example';

// A mock connected class
export default class extends connect(store, Example) {
  _mapStateToProps(state) {
    return {
      data: state.counter
    };
  }

  _mapDispatchToEvents(dispatch) {
    return {
      'increment'() {
        dispatch({type: 'INCREMENT'});
      },
      'set'(e) {
        dispatch({type: 'SET', payload: e.detail});
      }
    };
  }
}
