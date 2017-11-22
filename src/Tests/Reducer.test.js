/*
 * Redux
 */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as Reducer from '../Reducers';
import * as Actions from '../Actions';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';


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
