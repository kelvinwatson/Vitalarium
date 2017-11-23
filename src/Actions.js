import FirebaseUtil from './Utils/InitializeFirebase';
import DebugLog from './Utils/DebugLog';

/**
 * action types
 */

export const APP = {
  INITIALIZE: 'INITIALIZE_APP',
};

export const NAVIGATION = {
  GET: 'GET_NAVIGATION',
  SET: 'SET_SELECTED_NAVIGATION',
  UNSET: 'UNSET_SELECTED_NAVIGATION'
};

export const USER = {
  LOGIN: {
    LOADING: 'LOADING_LOGIN_USER',
    SUCCESS: 'SUCCESS_LOGIN_USER',
    FAILURE: 'FAILURE_LOGIN_USER',
  },
  UPDATE: {

  },
  //TODO: assign to, assigned tasks?
  LOGOUT: {
    LOADING: 'LOADING_LOGOUT_USER',
    SUCCESS: 'SUCCESS_LOGOUT_USER',
    FAILURE: 'FAILURE_LOGOUT_USER',
  }
}

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

/*
 * App
 */
 export function initializeApp(filter){
   return function (dispatch) {

     //NOTE Perform all app initialization
		FirebaseUtil.getFirebase().auth().onAuthStateChanged(function(user) {
			if (user) { // User is signed in.
				dispatch(loginSuccess(user));
			}
		});
		// FirebaseUtil.getFirebase().auth().getRedirectResult().then(function(result) {
		// //  DebugLog('result', result);
		// //  console.log()
		//  if (result.credential) {
		//     // This gives you a Google Access Token. You can use it to access the Google API.
		//     // let token = result.credential.accessToken;
		// 	  let user = result.user; //the signed-in user info
		//   if (user) {
		//     dispatch(loginSuccess(user));
		//   }
		// } else {
		//   dispatch(loginFailure('Authentication failed: missing credential.'));
		// }
		// }).catch(function(err) {
		//  dispatch(loginFailure(err.message))
		// });
   }
 }

/*
 * User
 */
export function login(provider){
  return function (dispatch) {
    dispatch(loginLoading());
    let firebase = FirebaseUtil.getFirebase();
    let authProvider;
    switch(provider){
      case 'Google':
        authProvider = new firebase.auth.GoogleAuthProvider();
        break;
			case 'Facebook':
				authProvider = new firebase.auth.FacebookAuthProvider();
				break;
			case 'Twitter':
				authProvider = new firebase.auth.TwitterAuthProvider();
				break;
			case 'Github':
				authProvider = new firebase.auth.GithubAuthProvider();
				break;
			default:
				// DebugLog('Provider not supported', provider);
				dispatch(loginFailure('Provider not supported'));
				break;
    }
    firebase.auth().signInWithRedirect(authProvider);

    //TODO record user in database if not already exists

    // return FirebaseUtil.getFirebase().database().ref('tasks').once('value').then((snap)=>{
    //   // DebugLog('snap',snap.val());
    //   dispatch(getTasksSuccess(snap && snap.val()));
    // }).catch(err=>{
    //   dispatch(getTasksFailure(err.message));
    // });
  }
}

export function loginLoading(){
  return {
    type: USER.LOGIN.LOADING,
    status: 'Logging you in...',
  }
}

export function loginSuccess(user){
  return {
    type: USER.LOGIN.SUCCESS,
    status: 'Successfully logged in',
    user,
  }
}

export function loginFailure(err){
  return {
    type: USER.LOGIN.FAILURE,
    status: err
  }
}

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

/*
 * Get tasks
 */
export function getTasks(filter){
  //TODO: use filter
  return function (dispatch) {
    dispatch(getTasksLoading(filter));
    return FirebaseUtil.getFirebase().database().ref('tasks').once('value').then((snap)=>{
      // DebugLog('snap',snap.val());
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

/*
 * Create task
 */
export function createTask(task) {
  const t = Date.now();
  task.created = t;
  return function (dispatch) {
    dispatch(createTaskLoading());
    return FirebaseUtil.getFirebase().database().ref('tasks/'+t).set(task).then(()=>{
      dispatch(createTaskSuccess(task));
    }).catch((err)=>{
      dispatch(createTaskFailure(task, err.message))
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
