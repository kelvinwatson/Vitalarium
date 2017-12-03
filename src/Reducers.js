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
  //create task
  isOpenCreateTaskModal: false,
  isCreating: false,
  isCreateSuccess: false,
  isCreateFailure: false,
  isShowCreateCloseWarningModal: false,

  //update task
  isOpenUpdateTaskPanel: false,
  isUpdating: false,
  isUpdateSuccess: false,
  isUpdateFailure: false,
  isShowUpdateCloseWarningModal: false,

  task: undefined
}, action){
  switch(action.type){
    case TASK.CREATE.LOADING:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: true,
        isCreating: true,
        isCreateSuccess: false,
        isCreateFailure: false,
        isShowCreateCloseWarningModal: false,

        isOpenUpdateTaskPanel: false,
        isUpdating: false,
        isUpdateSuccess: false,
        isUpdateFailure: false,
        isShowUpdateCloseWarningModal: false,

        task: undefined
      });
    case TASK.CREATE.SUCCESS:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: false,
        isCreating: false,
        isCreateSuccess: true,
        isCreateFailure: false,
        isShowCreateCloseWarningModal: false,

        isOpenUpdateTaskPanel: false,
        isUpdating: false,
        isUpdateSuccess: false,
        isUpdateFailure: false,
        isShowUpdateCloseWarningModal: false,

        task: action.task,
      });
    case TASK.CREATE.CLEAR:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: false,
        isCreating: false,
        isCreateSuccess: true,
        isCreateFailure: false,
        isShowCreateCloseWarningModal: false,

        isOpenUpdateTaskPanel: false,
        isUpdating: false,
        isUpdateSuccess: false,
        isUpdateFailure: false,
        isShowUpdateCloseWarningModal: false,

        task: undefined,
      });
    case TASK.CREATE.FAILURE:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: true,
        isCreating: false,
        isCreateSuccess: false,
        isCreateFailure: true,
        isShowCreateCloseWarningModal: false,

        isOpenUpdateTaskPanel: false,
        isUpdating: false,
        isUpdateSuccess: false,
        isUpdateFailure: false,
        isShowUpdateCloseWarningModal: false,

        task: action.task,
      });
    case TASK.CREATE.MODAL.OPEN:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: true,
        isCreating: false,
        isCreateSuccess: false,
        isCreateFailure: false,
        isShowCreateCloseWarningModal: false,

        isOpenUpdateTaskPanel: false,
        isUpdating: false,
        isUpdateSuccess: false,
        isUpdateFailure: false,
        isShowUpdateCloseWarningModal: false,

        task: undefined,
      });
    case TASK.CREATE.MODAL.CLOSE.SUCCESS:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: false,
        isCreating: false,
        isCreateSuccess: false,
        isCreateFailure: false,
        isShowCreateCloseWarningModal: false,

        isOpenUpdateTaskPanel: false,
        isUpdating: false,
        isUpdateSuccess: false,
        isUpdateFailure: false,
        isShowUpdateCloseWarningModal: false,
      });
    case TASK.CREATE.MODAL.CLOSE.WARNING:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: true,
        isCreating: false,
        isCreateSuccess: false,
        isCreateFailure: false,
        isShowCreateCloseWarningModal: true,

        isOpenUpdateTaskPanel: false,
        isUpdating: false,
        isUpdateSuccess: false,
        isUpdateFailure: false,
        isShowUpdateCloseWarningModal: false,
      });
    case TASK.CREATE.MODAL.CLOSE.CANCEL:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: true,
        isCreating: false,
        isCreateSuccess: false,
        isCreateFailure: true,
        isShowCreateCloseWarningModal: false,

        isOpenUpdateTaskPanel: false,
        isUpdating: false,
        isUpdateSuccess: false,
        isUpdateFailure: false,
        isShowUpdateCloseWarningModal: false,
      });
    case TASK.CREATE.MODAL.CLOSE.DELETE:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: false,
        isCreating: false,
        isCreateSuccess: false,
        isCreateFailure: true,
        isShowCreateCloseWarningModal: false,

        isOpenUpdateTaskPanel: false,
        isUpdating: false,
        isUpdateSuccess: false,
        isUpdateFailure: false,
        isShowUpdateCloseWarningModal: false,
      });
    //UPDATE
    case TASK.UPDATE.LOADING:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: false,
        isCreating: false,
        isCreateSuccess: false,
        isCreateFailure: false,
        isShowCreateCloseWarningModal: false,

        // isOpenUpdateTaskPanel: true,
        isUpdating: true,
        isUpdateSuccess: false,
        isUpdateFailure: false,
        isShowUpdateCloseWarningModal: false,

        task: action.task,
      });
    case TASK.UPDATE.SUCCESS:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: false,
        isCreating: false,
        isCreateSuccess: false,
        isCreateFailure: false,
        isShowCreateCloseWarningModal: false,

        isOpenUpdateTaskPanel: false,
        isUpdating: false,
        isUpdateSuccess: true,
        isUpdateFailure: false,
        isShowUpdateCloseWarningModal: false,

        task: action.task,
      });
    case TASK.UPDATE.FAILURE:
      return Object.assign({}, state, {
        isOpenCreateTaskModal: false,
        isCreating: false,
        isCreateSuccess: false,
        isCreateFailure: false,
        isShowCreateCloseWarningModal: false,

        isOpenUpdateTaskPanel: true,
        isUpdating: false,
        isUpdateSuccess: false,
        isUpdateFailure: true,
        isShowUpdateCloseWarningModal: false,

        task: action.task,
      });
    case TASK.UPDATE.PANEL.OPEN:
      return Object.assign({}, state, {
        isOpenUpdateTaskPanel: true,
        task: action.task,
      });
    case TASK.UPDATE.PANEL.CLOSE.SUCCESS:
      return Object.assign({}, state, {
        isOpenUpdateTaskPanel: false,
        task: action.task,
      });
    default: return state;
  }
}

export function project(state = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  status: undefined,
  project: {
    backlog: [],
    sprints: [],
  },
}, action){
  switch(action.type){
    case PROJECT.GET:
    case PROJECT.GET.LOADING:
      return Object.assign({}, state, {
        isLoading: true,
        isSuccess: false,
        isFailure: false,
        status: action.status,
        project: {
          backlog: [],
          sprints: [],
        },
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
        project: {
          backlog: [],
          sprints: [],
        },
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
