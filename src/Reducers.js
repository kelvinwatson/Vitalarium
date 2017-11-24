import { combineReducers } from 'redux';
// import DebugLog from './Utils/DebugLog';

import {
  USER,
  // NAVIGATION,
} from './Actions';

// export function navigation(state = {
//   page: undefined,
//   underlinedItem: undefined,
//   list: []
// }, action){
//   switch(action.type){
//     case NAVIGATION.GET:
//       return Object.assign({}, state, {
//         page: undefined,
//         list: ['Me', 'Music', 'Reach', 'Collaborate']
//       });
//     default:
//       return state;
//   }
// }

export function login(state = {
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
    default:
      return state;
  }
}

/*
 * root reducer
 */
const RootReducer = combineReducers({
  login,
  // navigation,

});

export default RootReducer;
