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
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  status: undefined,
  user: undefined,
  redirectUrl: undefined,
}, action){
  switch(action.type){
    case USER.LOGIN.LOADING:
      return Object.assign({}, state, {
        isLoading: true,
        isSuccess: false,
        isFailure: false,
        status: action.status,
        user: undefined,
        redirectUrl: undefined,
      });
    case USER.LOGIN.SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: true,
        isFailure: false,
        status: action.status,
        user: action.user,
        redirectUrl: '/dashboard',
      });
    case USER.LOGIN.FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: false,
        isFailure: true,
        status: action.status,
        user: undefined,
        redirectUrl: undefined,
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
