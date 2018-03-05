# customelement-redux
[![Build Status](https://travis-ci.org/moebiusmania/customelement-redux.svg?branch=master)](https://travis-ci.org/moebiusmania/customelement-redux)
![Custom Elements v1](https://img.shields.io/badge/custom--elements-v1-blue.svg)
![MIT license](https://img.shields.io/github/license/mashape/apistatus.svg)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/sindresorhus/xo)

Implementation of one of [@kevinpschaaf](https://github.com/kevinpschaaf) proposal for [Redux/Custom Elements integration](https://gist.github.com/kevinpschaaf/995c9d1fd0f58fe021b174c4238b38c3).

The goal of this project is to provide a simple and thin layer to easily connect Redux store data and action dispatching to a standard Custom Element.

This package follows the `react-redux` principles but contextualize them on the Custom Elements environment.

### Install
You can install the package via Yarn or NPM:
```
$ yarn add customelement-redux
```

### How to use - basic example
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
  _mapStateToProps(state) {
    return {
      value: state.value
    };
  }

  // execute an action dispatch when a custom event is fired
  _mapDispatchToEvents(dispatch) {
    return {
      'increment'(e) {
        dispatch({ type: 'INCREMENT' });
      }
    };
  }

}

customElements.define('connected-element', ConnectedElement);
```

You can check fully working examples on the `./src/demo` folder.

> HEADS UP: this module **only** syncs specified properties to Redux store paths, but it is not responsibile to refresh the view of your elements when the change happens. Data binding of internal properties with the template view is easily handled by libraries like Polymer, HyperHTML or Lit-HTML.

### To-do for v1.0.0
Check out the [v1.0.0 milestone](https://github.com/moebiusmania/customelement-redux/milestone/1).

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
