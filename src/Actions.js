import FirebaseUtil from './Utils/InitializeFirebase';
import DebugLog from './Utils/DebugLog';
import User from './Models/User';

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
		LINK: {
			SHOW: 'SHOW_LINK_ACCOUNT',
		}
  },
  UPDATE: {
		SUCCESS: 'SUCCESS_UPDATE_USER',
		FAILURE: 'FAILURE_UPDATE_USER'
  },
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

/*
 * App
 */
 export function initializeApp(filter){
   return function (dispatch) {

		FirebaseUtil.getFirebase().auth().onAuthStateChanged(function(user) {
			if (user) { // User is signed in.
				// Get user from DB.
				FirebaseUtil.getFirebase().database().ref('users/' + user.uid).once('value').then((snap)=>{
					dispatch(loginSuccess(snap.val()));
				}).catch((err) => {
					dispatch(loginFailure(err));
				});
			} else {
        dispatch(loginFailure({
          message: 'User not found.',
        })); //not really a failure, it's just to stop the loading
      }
		});

		FirebaseUtil.getFirebase().auth().getRedirectResult().then(function(result) {
			if(result && result.user) {
				let localUser = new User(result.user.uid,
					result.user.displayName,
					result.user.email,
					result.user.photoURL,
					result.additionalUserInfo && result.additionalUserInfo.providerId);
				//update user in db
				FirebaseUtil.getFirebase().database().ref('users/' + localUser.id).set(localUser).then(()=>{
					dispatch(userUpdatedSuccess(localUser));
				}).catch((err) => {
					dispatch(userUpdatedFailure(err));
				});
			}
		}).catch((err) => {
			switch(err.code) {
				case 'auth/account-exists-with-different-credential':
					dispatch(loginLinkAccount(err.email));
			}
		});
   }
 }

export function loginLinkWithRedirect(previousProvider) {
	return function(dispatch) {
		FirebaseUtil.getFirebase().auth.currentUser.linkWithRedirect(previousProvider);
	}
}

export function loginLinkAccount(email) {
	return function(dispatch) {
		FirebaseUtil.getFirebase().auth().fetchProvidersForEmail(email).then((providers) => {
			dispatch(loginShowLinkAccount(providers[0]));
		})
	}
}

export function loginShowLinkAccount(previousProvider) {
	//Reducer must display login option for previous provider & store current credential in local storage.
	return {
    type: USER.LOGIN.LINK.SHOW,
    status: 'Please link your account',
    previousProvider,
  }
}

/*
 * User
 */
export function userUpdatedSuccess(user) {
	return {
		type: USER.UPDATE.SUCCESS,
		status: 'User updated successfully',
		user
	}
}

export function userUpdatedFailure(err) {
	return {
		type: USER.UPDATE.FAILURE,
		status: 'Failed to update user',
		err
	}
}

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
  }
}

export function logout(){
  return function (dispatch) {
    dispatch(logoutLoading());
    let firebase = FirebaseUtil.getFirebase();
    firebase.auth().signOut().then(function() {
			dispatch(logoutSuccess());
		}).catch((err) => {
			dispatch(logoutFailure());
		});
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

export function logoutLoading(){
  return {
    type: USER.LOGOUT.LOADING,
    status: 'Logging you out...',
  }
}

export function logoutSuccess(){
  return {
    type: USER.LOGOUT.SUCCESS,
    status: 'Successfully logged out',
  }
}

export function logoutFailure(err){
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
