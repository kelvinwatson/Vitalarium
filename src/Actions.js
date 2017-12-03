import FirebaseUtil from './Utils/InitializeFirebase';
import axios from 'axios';
import DebugLog from './Utils/DebugLog';
import {
  convertDateMillsecondsToHyphenatedMonthName, convertDateHyphenatedToMilliseconds,
} from './Utils/DateUtils';
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
    FIRST_TIME: 'FIRST_TIME_LOGIN_USER', //first time login
    LOADING: 'LOADING_LOGIN_USER',
    SUCCESS: 'SUCCESS_LOGIN_USER',
    FAILURE: 'FAILURE_LOGIN_USER',
    LINK: {
      SHOW: 'SHOW_LINK_ACCOUNT',
    },
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
      CLOSE: {
        SUCCESS: 'SUCCESS_CLOSE_MODAL_CREATE_TASK',
        WARNING: 'WARNING_CLOSE_MODAL_CREATE_TASK',
        CANCEL: 'CANCEL_CLOSE_MODAL_CREATE_TASK',
        DELETE: 'DELETE_CLOSE_MODAL_CREATE_TASK',
      },
    },
    LOADING: 'LOADING_CREATE_TASK',
    SUCCESS: 'SUCCESS_CREATE_TASK',
    FAILURE: 'FAILURE_CREATE_TASK',
  },
  UPDATE: {
    PANEL: {
      OPEN: 'OPEN_PANEL_UPDATE_TASK',
      CLOSE: {
        SUCCESS: 'SUCCESS_CLOSE_PANEL_UPDATE_TASK',
        WARNING: 'WARNING_CLOSE_PANEL_UPDATE_TASK',
        CANCEL: 'CANCEL_CLOSE_PANEL_UPDATE_TASK',
        DELETE: 'DELETE_CLOSE_PANEL_UPDATE_TASK',
      },
    },
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

export const SPRINTS = {
  GET: {
    LOADING: 'LOADING_GET_SPRINTS',
    SUCCESS: 'SUCCESS_GET_SPRINTS',
    FAILURE: 'FAILURE_GET_SPRINTS',
  },
};

export const BACKLOG = {
  GET: {
    LOADING: 'LOADING_GET_BACKLOG',
    SUCCESS: 'SUCCESS_GET_BACKLOG',
    FAILURE: 'FAILURE_GET_BACKLOG',
  },
};

export const PROJECT = {
  GET: {
    LOADING: 'LOADING_GET_PROJECT',
    SUCCESS: 'SUCCESS_GET_PROJECT',
    FAILURE: 'FAILURE_GET_PROJECT'
  },
};

let functionUrl = 'https://us-central1-vitalarium-ae815.cloudfunctions.net';

/*
 * @param areSprintsLoading true if sprint is loading, false if backlog is loading
 */
export function getProject(projectId, isPostTaskManipulation) {
  return function(dispatch) {
    getProjectFromDb(projectId, dispatch, isPostTaskManipulation);
  }
}

/*
 * Create initial sprint objects and push to database
 */
export function initializeUserObjectsInDb(u, dispatch) {
  dispatch(getProjectLoading());
  axios.post(`${functionUrl}/initializeUserObjectsInDb`, {
    user: u,
  }).then((response)=>{
    DebugLog('initializeUserObjectsInDb YAY', response);
    dispatch(loginSuccess(response.data.user));
    dispatch(getProjectSuccess(response.data.project));
  }).catch((err)=>{
    DebugLog('initializeUserObjectsInDb NAY', err);
    dispatch(userUpdatedFailure(err));
  });
};


export function getProjectFromDb(projectId, dispatch, isPostTaskManipulation) {
  if (isPostTaskManipulation === undefined)
    dispatch(getProjectLoading());

  axios.get(`${functionUrl}/getProjectFromDb?projectId=${projectId}`).then((response) => {
    const project = response.data.project;
    if (response.data.success === true) {
      dispatch(getProjectSuccess(project))
    } else {
      dispatch(getProjectFailure(response.data.err));
    }
  })
  .catch((err) => {
    dispatch(getProjectFailure(err));
  });
}

/*
 * App
 */
export function initializeApp(filter) {
  return function(dispatch) {
    FirebaseUtil.getFirebase().auth().onAuthStateChanged(function(user) {
      if (user) { // User is signed in.
        // Get user from DB.
        FirebaseUtil.getFirebase().database().ref('users/' + user.uid).once('value').then((snap) => {
          let dbUser = snap.val();
          dispatch(loginSuccess(dbUser));
          if (dbUser && Array.isArray(dbUser.projects)) {
            getProjectFromDb(dbUser.projects[0], dispatch); // one project only
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
      if (result && result.user) {
        let calls = [];
        //check for existing user entry
        FirebaseUtil.getFirebase().database().ref('users/' + result.user.uid).once('value').then((userSnap) => {
          let userResult = userSnap.val();
          if (!userResult) {
            //no user exists, initialize user data for the first time.
            DebugLog('result.user', result.user);
            initializeUserObjectsInDb(result.user, dispatch);
          } else {
            dispatch(loginSuccess(userResult));
          }
        }).catch((err) => {
          dispatch(userUpdatedFailure(err));
        });
      }
    }).catch((err) => {
      switch (err.code) {
        case 'auth/account-exists-with-different-credential':
          dispatch(loginLinkAccount(err.email));
      }
    });
  }
}

/*
 * User
 */
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

export function loginFirstTime() {
  return {
    type: USER.LOGIN.FIRST_TIME,
    status: 'First time login (new user)',
  }
}

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

export function login(provider) {
  return function(dispatch) {
    dispatch(loginLoading());
    let firebase = FirebaseUtil.getFirebase();
    let authProvider;
    switch (provider) {
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
        dispatch(loginFailure('Provider not supported'));
        break;
    }
    firebase.auth().signInWithRedirect(authProvider);
  }
}

export function logout() {
  return function(dispatch) {
    dispatch(logoutLoading());
    let firebase = FirebaseUtil.getFirebase();
    firebase.auth().signOut().then(function() {
      dispatch(logoutSuccess());
    }).catch((err) => {
      dispatch(logoutFailure());
    });
  }
}

export function loginLoading() {
  return {
    type: USER.LOGIN.LOADING,
    status: 'Logging you in...',
  }
}

export function loginSuccess(user) {
  return {
    type: USER.LOGIN.SUCCESS,
    status: 'Successfully logged in',
    user,
  }
}

export function loginFailure(err) {
  return {
    type: USER.LOGIN.FAILURE,
    status: err
  }
}

export function logoutLoading() {
  return {
    type: USER.LOGOUT.LOADING,
    status: 'Logging you out...',
  }
}

export function logoutSuccess() {
  return {
    type: USER.LOGOUT.SUCCESS,
    status: 'Successfully logged out',
  }
}

export function logoutFailure(err) {
  return {
    type: USER.LOGIN.FAILURE,
    status: err
  }
}

export function getNavigation() {
  return {
    type: NAVIGATION.GET
  }
}

export function setNavigation(page) {
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

export function getTasksLoading(filter) {
  return {
    type: TASKS.GET.LOADING,
    status: 'Fetching tasks...',
    filter,
  }
}

export function getTasksSuccess(tasks) {
  return {
    type: TASKS.GET.SUCCESS,
    status: 'Successfully retrieved tasks.',
    tasks,
  }
}

export function getTasksFailure(err) {
  return {
    type: TASKS.GET.FAILURE,
    status: err
  }
}

export function taskComparatorDesc(a, b) {
  return (a.createdOn < b.createdOn) ? 1 : a.createdOn > b.createdOn ? -1 : 0;
}

export function sprintComparatorDesc(a, b) {
  return (a.startDate < b.startDate) ? -1 : (a.startDate > b.startDate) ? 1 : 0;
}

/*
 * Create task
 * task : ./Models/Task.js
 * At least one of projectId or sprintId is required.
 */
export function createTask(task) {
  return function(dispatch) {
    dispatch(createTaskLoading());

    axios.post(`${functionUrl}/createTask`, {
      task: task,
    }).then((response)=>{
      DebugLog('createTask YAY', response);
      if (response.data.success === true){
        dispatch(createTaskSuccess(task));
        dispatch(createTaskCloseModal());
        dispatch(getProject(task.project, true));
      } else {
        dispatch(createTaskFailure(task, response.data.err));
      }
    }).catch((err)=>{
      DebugLog('createTask NAY', err);
      dispatch(createTaskFailure(task, err));
    });
  }
}

export function createTaskOpenModal() {
  return {
    type: TASK.CREATE.MODAL.OPEN,
    status: 'Opening create task modal...',
  }
}

export function createTaskCloseModal() {
  return {
    type: TASK.CREATE.MODAL.CLOSE.SUCCESS,
    status: 'Closing create task modal...',
  }
}

export function createTaskCloseWarningModal() {
  return {
    type: TASK.CREATE.MODAL.CLOSE.WARNING,
    status: 'Are you sure you want to delete this task?',
  }
}

export function createTaskCancelCloseWarningModal() {
  return {
    type: TASK.CREATE.MODAL.CLOSE.CANCEL,
    status: 'Returning to task...',
  }
}

export function createTaskDeleteCloseWarningModal() {
  return {
    type: TASK.CREATE.MODAL.CLOSE.DELETE,
    status: 'Closing create task modal, all changes lost.',
  }
}

export function createTaskLoading(task) {
  return {
    type: TASK.CREATE.LOADING,
    status: 'Creating task...',
    task,
  }
}

export function createTaskSuccess(task) {
  return {
    type: TASK.CREATE.SUCCESS,
    status: 'Successfully created task.',
    task,
  }
}

export function createTaskFailure(task, err) {
  return {
    type: TASK.CREATE.FAILURE,
    status: err,
    task,
  }
}

/*
 * Update Task
 * Handles 3 cases, where task goes from:
 *  1. backlog-->sprint
 *  2. sprint-->sprint
 *  3. sprint-->backlog
 */
export function updateTask(task, prevSprintId) {
  return function(dispatch) {
    dispatch(updateTaskLoading());
    axios.post(`${functionUrl}/updateTask`, {
      task: task,
      prevSprintId: prevSprintId,
    }).then((response)=>{
      if(response.data.success === true){
        dispatch(updateTaskSuccess(task));
        dispatch(updateTaskClosePanel());
        dispatch(getProject(task.project, true));
      } else {
        dispatch(updateTaskFailure(task, response.data.err));
      }
    }).catch((err)=>{
      dispatch(updateTaskFailure(task, err));

    });
  }
}

export function updateTaskOpenPanel(task) {
  return {
    type: TASK.UPDATE.PANEL.OPEN,
    status: 'Opening update task panel...',
    task,
  }
}

export function updateTaskClosePanel() {
  return {
    type: TASK.UPDATE.PANEL.CLOSE.SUCCESS,
    status: 'Closing create task modal...',
  }
}

export function updateTaskCloseWarningModal() {
  return {
    type: TASK.UPDATE.PANEL.CLOSE.WARNING,
    status: 'Are you sure you want to abandon changes?',
  }
}

export function updateTaskCancelCloseWarningModal() {
  return {
    type: TASK.UPDATE.PANEL.CLOSE.CANCEL,
    status: 'Returning to task...',
  }
}

export function updateTaskDeleteCloseWarningModal() {
  return {
    type: TASK.UPDATE.PANEL.CLOSE.DELETE,
    status: 'Closing update task panel, all changes lost.',
  }
}

export function updateTaskLoading(task) {
  return {
    type: TASK.UPDATE.LOADING,
    status: 'Updating task...',
    task,
  }
}

export function updateTaskSuccess(task) {
  return {
    type: TASK.UPDATE.SUCCESS,
    status: 'Successfully updated task.',
    task,
  }
}

export function updateTaskFailure(task, err) {
  return {
    type: TASK.UPDATE.FAILURE,
    status: err,
    task,
  }
}

/**
 * Project
 */
export function getProjectLoading() {
  return {
    type: PROJECT.GET.LOADING,
    status: 'Fetching project...',
  }
}

export function getProjectSuccess(project, user) {
  return {
    type: PROJECT.GET.SUCCESS,
    status: 'Successfully retrieved project.',
    project,
    user,
  }
}
export function getProjectFailure(err) {
  return {
    type: PROJECT.GET.FAILURE,
    status: 'Failed to get project.',
    err
  }
}

/*
 * Misc Utils
 */
export function preprocessProjectDates(project) {
  if (!project.sprints) //no sprints
    return project;

  for (let i = 0; i < project.sprints.length; i += 1) {
    project.sprints[i].startDate = convertDateMillsecondsToHyphenatedMonthName(project.sprints[i].startDate)
    project.sprints[i].endDate = convertDateMillsecondsToHyphenatedMonthName(project.sprints[i].endDate)
  }

  return project;
}

export function preprocessTaskDueDate(task){
  task.dueDate = convertDateHyphenatedToMilliseconds(task.dueDate);
  return task;
}
