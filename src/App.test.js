import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

/*
 * Redux
 */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as Reducer from './Reducers';
import * as Actions from './Actions';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

/*
 * Test Redux actions
 */
describe('Actions: GET_NAVIGATION', () => {
  it('should create an action to get navigation', () => {
    const expectedAction = {
      type: Actions.NAVIGATION.GET,
    }
    expect(Actions.getNavigation()).toEqual(expectedAction)
  })
});

/*
 * Test Redux reducers
 */
describe('Reducer: navigation (initial state)', () => {
  it('should return the initial state', () => {
    expect(Reducer.navigation(undefined, Actions.NAVIGATION.GET)).toEqual({
      page: undefined,
      list: []
    })
  })
})
