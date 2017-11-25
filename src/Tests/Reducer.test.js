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
      isLoggedIn: false,
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
      isLoggedIn: false,
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
      isLoggedIn: true,
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
      isLoggedIn: false,
      status: action.status,
      user: undefined,
      redirectUrl: undefined,
    });
  });
});

describe('Reducer: logout (initial state)', () => {
  it('should return the initial state', () => {
    expect(Reducer.login(undefined, Actions.USER.LOGOUT)).toEqual({
      isLoading: true,
      isSuccess: false,
      isFailure: false,
      isLoggedIn: false,
      status: undefined,
      user: undefined,
      redirectUrl: undefined,
    });
  });

  it('should return the loading state', () => {
    const action = {
      type: Actions.USER.LOGOUT.LOADING,
      status: 'Logging you out...',
    };
    expect(Reducer.login(undefined, action)).toEqual({
      isLoading: true,
      isSuccess: false,
      isFailure: false,
      isLoggedIn: true,
      status: action.status,
      user: undefined,
      redirectUrl: undefined,
    });
  });

  it('should return the success state', () => {
    const action = {
      type: Actions.USER.LOGOUT.SUCCESS,
      status: 'Successfully logged out',
      user: {
        userId: 'mockUserId',
      },
    };
    expect(Reducer.login(undefined, action)).toEqual({
      isLoading: false,
      isSuccess: true,
      isFailure: false,
      isLoggedIn: false,
      status: action.status,
      user: undefined,
      redirectUrl: '/',
    });
  });

  it('should return the failure state', () => {
    const action = {
      type: Actions.USER.LOGOUT.FAILURE,
      status: {
        message: 'mock error msg'
      }
    };
    expect(Reducer.login(undefined, action)).toEqual({
      isLoading: false,
      isSuccess: false,
      isFailure: true,
      isLoggedIn: true,
      status: action.status,
      user: undefined,
      redirectUrl: undefined,
    });
  });
});

describe('Reducer: task (initial state)', () => {
  it('should return the initial state', () => {
    expect(Reducer.task(undefined, Actions.TASK.CREATE)).toEqual({
      isOpenModal: false,
      isSaving: false,
      isCreateSuccess: false,
      isCreateFailure: false,
    });
  });

  it('should return the open modal state', () => {
    const action = {
      type: Actions.TASK.CREATE.MODAL.OPEN,
    };
    expect(Reducer.task(undefined, action)).toEqual({
      isOpenModal: true,
      isSaving: false,
      isCreateSuccess: false,
      isCreateFailure: false,
    });
  });

  it('should return the close modal state', () => {
    const action = {
      type: Actions.TASK.CREATE.MODAL.CLOSE,
    };
    expect(Reducer.task(undefined, action)).toEqual({
      isOpenModal: false,
      isSaving: false,
      isCreateSuccess: false,
      isCreateFailure: false,
    });
  });
});
