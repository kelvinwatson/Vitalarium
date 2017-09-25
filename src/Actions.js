import FirebaseUtil from './Utils/InitializeFirebase';
import DebugLog from './Utils/DebugLog';

/**
 * action types
 */

export const NAVIGATION = {
  GET: 'GET_NAVIGATION',
  SET: 'SET_SELECTED_NAVIGATION',
  UNSET: 'UNSET_SELECTED_NAVIGATION'
};

/**
 * action creators
 */

// export function fetchMusic() {
//   return function (dispatch) {
//     // First dispatch: the app state is updated to inform
//     // that the API call is starting.
//
//     dispatch(getMusicRequest());
//
//     let arr = [];
//
//     let firebase = FirebaseUtil.getFirebase();
//     let storage = firebase.storage();
//     let ref = storage.ref();
//
//     return FirebaseUtil.getFirebase().storage().ref().child('Music/MindlessGraffiti.mp3').getDownloadURL().then(function(url){
//       arr.push(url);
//       dispatch(getMusicSuccess(arr));
//     }).catch(function(err) {
//       dispatch(getMusicFailure(err));
//     });
//   }
// }

export function getNavigation(){
  return {
    type: NAVIGATION.GET
  }
}

export function setNavigation(page){
  return {
    type: NAVIGATION.SET,
    page
  }
}

export function unsetNavigation() {
  return {
    type: NAVIGATION.UNSET
  }
}
