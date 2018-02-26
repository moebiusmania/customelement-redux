# customelement-redux
Implementation of one of [@kevinpschaaf](https://github.com/kevinpschaaf) proposal for [Redux/Custom Elements integration](https://gist.github.com/kevinpschaaf/995c9d1fd0f58fe021b174c4238b38c3).

The goal of this project is to provide a simple and thin layer to easily connect Redux store data and action dispatching to a standard Custom Element.

This package follows the `react-redux` principles but contextualize them on the Custom Elements environment.

### Install
You can install the package via Yarn or NPM:
```
$ yarn add customelement-redux
```

### How to use
The core idea is that you write regular Web Components and when you want to connect them to a Redux store just subclass them using the `connect` mixin.

```javascript
// my dumb web component
import { MyElement } from './my-element';
// a Redux store
import { store } from './store';
// the 'connect' mixin from this module
import { connect } from 'customelement-redux';

// subclass of 'my-element' with the mixin applied
class ConnectedElement extends connect(store, MyElement){

  // "bind" and internal property to a Redux state node
  _mapStateToProps(state){
    return {
        value: state.value
    };
  }

}

customElements.define('connected-element', ConnectedElement);
```

You can check fully working examples on the `./src/demo` folder.

> HEADS UP: this module **only** syncs specified properties to Redux store paths, but it is not responsibile to refresh the view of your elements when the change happens. Data binding of internal properties with the template view is easily handled by libraries like Polymer, HyperHTML or Lit-HTML.

### Development
On command line:
```
$ git clone https://github.com/moebiusmania/customelement-redux

$ cd customelement-redux

$ yarn

$ yarn start
```

On the browser open:
```
http://localhost:8081
```

### License
Released under the [MIT license](LICENSE).
