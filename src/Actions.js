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

export const TASK = {
  GET: {
    LOADING: 'LOADING_GET_TASK',
    SUCCESS: 'SUCCESS_GET_TASK',
    FAILURE: 'FAILURE_GET_TASK',
  },
  CREATE: {
    LOADING: 'LOADING_CREATE_TASK',
    SUCCESS: 'SUCCESS_CREATE_TASK',
    FAILURE: 'FAILURE_CREATE_TASK',
  },
  UPDATE: {
    LOADING: 'LOADING_UPDATE_TASK',
    SUCCESS: 'SUCCESS_UPDATE_TASK',
    FAILURE: 'FAILURE_UPDATE_TASK',
  },
  DELETE: {
    LOADING: 'LOADING_DELETE_TASK',
    CONFIRM: 'CONFIRM_DELETE_TASK',
    SUCCESS: 'SUCCESS_DELETE_TASK',
    FAILURE: 'FAILURE_DELETE_TASK',
  },
};

export const TASKS = {
  GET: {
    LOADING: 'LOADING_GET_TASKS',
    SUCCESS: 'SUCCESS_GET_TASKS',
    FAILURE: 'FAILURE_GET_TASKS',
  },
};

/**
 * action creators
 */

// export function fetchMusic() {
//   return function (dispatch) {
//     // First dispatch: the app state is updated to inform
//     // that the API call is starting.
//
//     dispatch(getMusicLoading());
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

export function getTasks(filter){
  //TODO: use filter

  return function (dispatch) {
    dispatch(getTasksLoading(filter));
    return FirebaseUtil.getFirebase().database().ref('tasks').once('value').then((snap)=>{
      console.log('snap',snap.val());
      dispatch(getTasksSuccess(snap && snap.val()));
    });
  }
}

export function getTasksLoading(filter){
  return {
    type: TASKS.GET.LOADING,
    status: 'Fetching tasks...',
    filter,
  }
}

export function getTasksSuccess(tasks){
  return {
    type: TASKS.GET.SUCCESS,
    status: 'Successfully retrieved tasks.',
    tasks,
  }
}

export function getTasksFailure(err){
  return {
    type: TASKS.GET.FAILURE,
    status: err
  }
}

export function createTask(task) {
  return function (dispatch) {
    dispatch(createTaskLoading());
    return FirebaseUtil.getFirebase().database().ref('tasks').push(task, function(err){
      err ? dispatch(createTaskFailure(task, err)) : dispatch(createTaskSuccess(task));
    });
  }
}

export function createTaskLoading(task){
  return {
    type: TASK.CREATE.LOADING,
    status: 'Creating task...',
    task,
  }
}

export function createTaskSuccess(task){
  return {
    type: TASK.CREATE.SUCCESS,
    status: 'Successfully created task.',
    task,
  }
}

export function createTaskFailure(task, err){
  return {
    type: TASK.CREATE.FAILURE,
    status: err,
    task,
  }
}
