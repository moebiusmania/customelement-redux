# customelement-redux
Implementation of one of [@kevinpschaaf](https://github.com/kevinpschaaf) proposal for [Redux/Custom Elements integration](https://gist.github.com/kevinpschaaf/995c9d1fd0f58fe021b174c4238b38c3).

### Install
The module will soon be available on NPM, right now you can add it from GitHub:
```
$ yarn add https://github.com/moebiusmania/customelement-redux
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

> HEADS UP: this module **only** syncs specified properties to Redux store paths, but it is not responsibile to refresh the view of your elements when the change happens. Data binding of internal properties with the view is easily handled by libraries like Polymer or HyperHTML.

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
