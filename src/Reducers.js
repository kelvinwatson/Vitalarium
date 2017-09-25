import { combineReducers } from 'redux';
// import DebugLog from './Utils/DebugLog';

import {
  NAVIGATION,
} from './Actions';

export function navigation(state = {
  page: undefined,
  underlinedItem: undefined,
  list: []
}, action){
  switch(action.type){
    case NAVIGATION.GET:
      return Object.assign({}, state, {
        page: undefined,
        list: ['Me', 'Music', 'Reach', 'Collaborate']
      });
    default:
      return state;
  }
}

/*
 * root reducer
 */
const RootReducer = combineReducers({

  navigation,

});

export default RootReducer;
