// Main test

import test from 'ava';
import { connect } from './../src/index';
import { 
  example, store, connected 
} from './mocks';

const mixed = new connected();

test('Mock class initial data', t => {
  const mock = new example();
  t.is(mock.data, 42);
});

test('Mock store initial value', t => {
  const value = store.getState().counter;
  t.is(value, 24);
});

test('Applying mixin to class', t => {
  t.is(typeof mixed, 'object');
  t.is(typeof mixed._mapStateToProps, 'function');
});

test('Connected class \'data\' and store \'counter\' match', t => {
  const fromStore = store.getState().counter;

  t.is(mixed.data, fromStore);
});

test('Dispatching \'INCREMENT\' from store updates both store and class', t => {
  store.dispatch({ type: 'INCREMENT' });  
  const fromStore = store.getState().counter;

  t.is(fromStore, 25);
  t.is(mixed.data, fromStore);
});

test('Dispatching \'SET\' from updates both store and class', t => {
  const value = 42;
  store.dispatch({ type: 'SET', payload: value });
  const fromStore = store.getState().counter;

  t.is(fromStore, value);
  t.is(mixed.data, fromStore);
});

