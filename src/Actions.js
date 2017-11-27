import FirebaseUtil from './Utils/InitializeFirebase';
import DebugLog from './Utils/DebugLog';
import User from './Models/User';
import Project from './Models/Project';
import Sprint from './Models/Sprint';
import Task from './Models/Task';

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
    MODAL: {
      OPEN: 'OPEN_MODAL_CREATE_TASK',
      CLOSE: 'CLOSE_MODAL_CREATE_TASK',
    },
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

export const PROJECT = {
	GET: {
		LOADING: 'LOADING_GET_PROJECT',
		SUCCESS: 'SUCCESS_GET_PROJECT',
		FAILURE: 'FAILURE_GET_PROJECT'
	},
};

export function initializeUserObjectsInDB(redirectResult, dispatch) {
	//1. Create initial sprint objects
	const db = FirebaseUtil.getFirebase().database();
	let firstSprintRef = db.ref('sprints/').push();
	let secondSprintRef = db.ref('sprints/').push();
	let projectRef = db.ref('projects/').push();
	let firstSprint = new Sprint(firstSprintRef.key,
		[], Date.now(), new Date().setDate(new Date().getDate() + 14));
	let secondSprint = new Sprint(secondSprintRef.key,
		[], new Date().setDate(new Date().getDate() + 14), new Date().setDate(new Date().getDate() + 28));
	let project = new Project(projectRef.key, [firstSprintRef.key, secondSprintRef.key], [], Intl.DateTimeFormat().resolvedOptions().timeZone);
	let user = new User(redirectResult.user.uid,
		redirectResult.user.displayName,
		redirectResult.user.email,
		redirectResult.user.photoURL,
		redirectResult.additionalUserInfo && redirectResult.additionalUserInfo.providerId,
		[projectRef.key]);
	//push all to DB
	let calls = [
		firstSprintRef.push(firstSprint),
		secondSprintRef.push(secondSprint),
		projectRef.push(project),
		db.ref('/users/' + user.id).set(user)
	];
	Promise.all(calls).then((results) => {
		dispatch(loginSuccess(user));
		project.sprints = [firstSprint, secondSprint];
		dispatch(getProjectSuccess(project));
	}).catch((err) => {
		dispatch(userUpdatedFailure(err));
	});
};

export function getSprintsFromDB(sprintIds) {
	return new Promise((resolve, reject) => {
		const db = FirebaseUtil.getFirebase().database();
		let sprintCalls = [];
		for(let i = 0; i < sprintIds.length; i += 1) {
			sprintCalls.push(db.ref('sprints/' + sprintIds[i]).once('value'));
		}
		Promise.all(sprintCalls).then((sprintResponses) => {
			let sprints = [];
			for(let i = 0; i < sprintResponses.length; i += 1) {
				let sprint = sprintResponses.val();
				if(Array.isArray(sprint.tasks)) {
					let taskCalls = [];
					for(let j = 0; j < sprint.tasks.length; j += 1) {
						taskCalls.push(db.ref('tasks/' + sprint.tasks[i]).once('value'));
					}
					Promise.all(taskCalls).then((taskResults) => {
						let tasks = [];
						for(let j = 0; j < taskResults.length; j += 1) {
							tasks.push(taskResults.val());
						}
						tasks.sort(taskComparatorDesc);
						sprint.tasks = tasks;
						sprints.push(sprint);
						if(sprints.length === sprintIds.length) {
							resolve(sprints);
						}
					});
				}
			}
		});
	});
}

export function getTasksFromDB(taskList) {
	return new Promise((resolve, reject) => {
		getTasks(taskList)((dispatchResult) => {
			if(dispatchResult.type === TASKS.GET.SUCCESS) {
				resolve(dispatchResult.tasks);
			} else {
				reject(dispatchResult);
			}
		});
	});
}

export function getProjectFromDB(projectId, dispatch) {
	const db = FirebaseUtil.getFirebase().database();
	db.ref('projects/' + projectId).once('value').then((projectSnap) => {
		let project = projectSnap.val();
		let projectCalls = [];
		if(project && Array.isArray(project.sprints)) {
			projectCalls.push(getSprintsFromDB(project.sprints));
		}
		if(project && Array.isArray(project.backlog)) {
			projectCalls.push(getTasksFromDB(project.backlog));
		}
		Promise.all(projectCalls).then((projectResults) => {
			let sprints = projectResults[0];
			let backlog = projectResults[1];
			project.sprints = sprints;
			project.backlog = backlog;
			dispatch(getProjectSuccess(project));
		});
	}).catch((err) => {
		dispatch(getProjectFailure(err));
	});
}

/*
 * App
 */
 export function initializeApp(filter){
   return function (dispatch) {

		FirebaseUtil.getFirebase().auth().onAuthStateChanged(function(user) {
			if (user) { // User is signed in.
				// Get user from DB.
				FirebaseUtil.getFirebase().database().ref('users/' + user.uid).once('value').then((snap)=>{
					let dbUser = snap.val();
					dispatch(loginSuccess(dbUser));
					if(dbUser && Array.isArray(dbUser.projects)) {
						getProjectFromDB(dbUser.projects[0]);
					}
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
				let calls = [];
				//check for existing user entry
				FirebaseUtil.getFirebase().database().ref('users/' + result.user.uid).once('value').then((userSnap) => {
					let userResult = userSnap.val();
					if(!userResult) {
						//no user exists, initialize user data for the first time.
						initializeUserObjectsInDB(result, dispatch);
					} else {
						dispatch(loginSuccess(userResult));
					}
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

export function taskComparatorDesc(a, b) {
  if (a.createdOn < b.createdOn)
     return 1;
  if (a.createdOn > b.createdOn)
    return -1;
  return 0;
}

export function getTasks(taskList) {
	return function (dispatch) {
		let calls = [];
		let db = FirebaseUtil.getFirebase().database();
		for(let i = 0; i < taskList.length; i += 1) {
			calls.push(db.ref('tasks/' + taskList[i]).once('value'));
		}
		Promise.all(calls).then((results) => {
			let tasks = [];
			for(let i = 0; i < results.length; i += 1) {
				let task = results[i].val();
				tasks.push(task);
			}
			tasks.sort(taskComparatorDesc);
			dispatch(getTasksSuccess(tasks));
		}).catch((err) => {
			dispatch(getTasksFailure(err));
		});
	}
}

/*
 * Create task
 */
export function createTask(task) {
  return function (dispatch) {
    dispatch(createTaskLoading());
    return FirebaseUtil.getFirebase().database().ref('tasks/' + task.id).set(task).then(()=>{
      dispatch(createTaskSuccess(task));
    }).catch((err)=>{
      dispatch(createTaskFailure(task, err.message))
    });
  }
}

export function createTaskOpenModal(){
  return {
    type: TASK.CREATE.MODAL.OPEN,
    status: 'Opening create task modal...',
  }
}

export function createTaskCloseModal(){
  return {
    type: TASK.CREATE.MODAL.CLOSE,
    status: 'Closing create task modal...',
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

/**
 * Project
 */
export function getProjectSuccess(project) {
	return {
		type: PROJECT.GET.SUCCESS,
		status: 'Successfully got project',
		project
	}
}
export function getProjectFailure(err) {
	return {
		type: PROJECT.GET.FAILURE,
		status: 'Failed to get project',
		err
	}
}
