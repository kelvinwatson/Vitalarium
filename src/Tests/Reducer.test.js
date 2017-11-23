import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as Reducer from '../Reducers';
import * as Actions from '../Actions';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

/*
 * Test Redux reducers
 */
describe('Reducer: login (initial state)', () => {
  it('should return the initial state', () => {
    expect(Reducer.login(undefined, Actions.USER.LOGIN)).toEqual({
      isLoading: true,
      isSuccess: false,
      isFailure: false,
      status: undefined,
      user: undefined,
      redirectUrl: undefined,
    });
  });

  it('should return the loading state', () => {
    const action = {
      type: Actions.USER.LOGIN.LOADING,
      status: 'Logging you in...',
    };
    expect(Reducer.login(undefined, action)).toEqual({
      isLoading: true,
      isSuccess: false,
      isFailure: false,
      status: action.status,
      user: undefined,
      redirectUrl: undefined,
    });
  });

  it('should return the success state', () => {
    const action = {
      type: Actions.USER.LOGIN.SUCCESS,
      status: 'Successfully logged in',
      user: {
        userId: 'mockUserId',
      },
    };
    expect(Reducer.login(undefined, action)).toEqual({
      isLoading: false,
      isSuccess: true,
      isFailure: false,
      status: 'Successfully logged in',
      user: action.user,
      redirectUrl: '/dashboard',
    });
  });

  it('should return the failure state', () => {
    const action = {
      type: Actions.USER.LOGIN.FAILURE,
      status: {
        message: 'mock error msg'
      }
    };
    expect(Reducer.login(undefined, action)).toEqual({
      isLoading: false,
      isSuccess: false,
      isFailure: true,
      status: action.status,
      user: undefined,
      redirectUrl: undefined,
    });
  });
});
