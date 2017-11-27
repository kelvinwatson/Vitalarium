import { combineReducers } from 'redux';
import DebugLog from './Utils/DebugLog';

import {
  USER,
  TASK,
  PROJECT,
  //NAVIGATION,
} from './Actions';

export function login(state = {
  isFirstTime: false,
  isLoading: true,
  isSuccess: false,
  isFailure: false,
  isLoggedIn: false,
  status: undefined,
  user: undefined,
  redirectUrl: undefined,
  previousProvider: undefined,
}, action){
  switch(action.type){
    case USER.LOGIN.FIRST_TIME:
      return Object.assign({}, state, {
        isFirstTime: true,
      });
    case USER.LOGIN.LOADING:
      return Object.assign({}, state, {
        isLoading: true,
        isSuccess: false,
        isFailure: false,
        isLoggedIn: false,
        status: action.status,
        user: undefined,
        redirectUrl: undefined,
        previousProvider: undefined,
      });
    case USER.LOGIN.SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: true,
        isFailure: false,
        isLoggedIn: true,
        status: action.status,
        user: action.user,
        redirectUrl: '/dashboard',
        previousProvider: undefined,
      });
    case USER.LOGIN.FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: false,
        isFailure: true,
        isLoggedIn: false,
        status: action.status,
        user: undefined,
        redirectUrl: undefined,
        previousProvider: undefined,
      });
    case USER.LOGOUT.LOADING:
      return Object.assign({}, state, {
        isLoading: true,
        isSuccess: false,
        isFailure: false,
        isLoggedIn: true,
        status: action.status,
        user: undefined,
        redirectUrl: undefined,
        previousProvider: undefined,
      });
    case USER.LOGOUT.SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: true,
        isFailure: false,
        isLoggedIn: false,
        status: action.status,
        user: undefined,
        redirectUrl: '/',
        previousProvider: undefined,
      });
    case USER.LOGOUT.FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: false,
        isFailure: true,
        isLoggedIn: true,
        status: action.status,
        redirectUrl: undefined,
        previousProvider: undefined,
      });
    case USER.LOGIN.LINK.SHOW:
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: false,
        isFailure: false,
        isLoggedIn: false,
        status: action.status,
        redirectUrl: undefined,
        previousProvider: action.previousProvider,
      });
    case USER.LOGOUT.LOADING:
      return Object.assign({}, state, {
        isLoading: true,
        isSuccess: false,
        isFailure: false,
        isLoggedIn: true,
        status: action.status,
        user: undefined,
        redirectUrl: undefined,
      });
    case USER.LOGOUT.SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: true,
        isFailure: false,
        isLoggedIn: false,
        status: action.status,
        user: undefined,
        redirectUrl: '/',
      });
    case USER.LOGOUT.FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: false,
        isFailure: true,
        isLoggedIn: true,
        status: action.status,
        redirectUrl: undefined,
      });
    default: return state;
  }
}

export function task(state = {
  isOpenCreateTaskModal: false,
  isSaving: false,
  isCreateSuccess: false,
  isCreateFailure: false,
  isShowCloseWarningModal: false,
}, action){
  switch(action.type){
    case TASK.CREATE.MODAL.OPEN:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: true,
      });
    case TASK.CREATE.MODAL.CLOSE:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: false,
      });
    case TASK.CREATE.MODAL.CLOSE.WARNING:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: true,
        isShowCloseWarningModal: true,
      });
    case TASK.CREATE.MODAL.CLOSE.CANCEL:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: true,
        isShowCloseWarningModal: false,
      });
    case TASK.CREATE.MODAL.CLOSE.DELETE:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: false,
        isCreateFailure: true,
        isShowCloseWarningModal: false,
      });
    default: return state;
  }
}

export function project(state = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  status: undefined,
  project: undefined,
}, action){
  switch(action.type){
    case PROJECT.GET.LOADING:
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: false,
        isFailure: false,
        status: action.status,
        project: undefined,
      });
    case PROJECT.GET.SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: true,
        isFailure: false,
        status: action.status,
        project: action.project,
      });
    case PROJECT.GET.FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: false,
        isFailure: true,
        status: action.status,
      });
    default: return state;
  }
}
/*
 * root reducer
 */
const RootReducer = combineReducers({
  login,
  task,
  project,
  // navigation,

});

export default RootReducer;
