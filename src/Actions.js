import FirebaseUtil from './Utils/InitializeFirebase';
import DebugLog from './Utils/DebugLog';
import {
  convertTimeStampToDate
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

/*
 * @param areSprintsLoading true if sprint is loading, false if backlog is loading
 */
export function getProject(projectId, isPostTaskManipulation) {
  return function(dispatch) {
    DebugLog('getProject projectId', projectId);
    getProjectFromDb(projectId, dispatch, isPostTaskManipulation);
  }
}

export function initializeUserObjectsInDb(redirectResult, dispatch) {
  //1. Create initial sprint objects
  const db = FirebaseUtil.getFirebase().database();
  let firstSprintRef = db.ref('sprints/').push();
  let secondSprintRef = db.ref('sprints/').push();
  let projectRef = db.ref('projects/').push();
  let firstSprint = new Sprint(firstSprintRef.key, [], Date.now(), new Date().setDate(new Date().getDate() + 14));
  let secondSprint = new Sprint(secondSprintRef.key, [], new Date().setDate(new Date().getDate() + 14), new Date().setDate(new Date().getDate() + 28));
  let project = new Project(projectRef.key, [firstSprintRef.key, secondSprintRef.key], [], Intl.DateTimeFormat().resolvedOptions().timeZone);
  let user = new User(redirectResult.user.uid,
    redirectResult.user.displayName,
    redirectResult.user.email,
    redirectResult.user.photoURL,
    redirectResult.additionalUserInfo && redirectResult.additionalUserInfo.providerId, [projectRef.key]);
  //push all to DB
  let calls = [
    db.ref('sprints/' + firstSprintRef.key).set(firstSprint),
    db.ref('sprints/' + secondSprintRef.key).set(secondSprint),
    db.ref('projects/' + projectRef.key).set(project),
    db.ref('users/' + user.id).set(user)
  ];
  Promise.all(calls).then((results) => {
    dispatch(loginSuccess(user));
    project.sprints = [firstSprint, secondSprint];

    project = preprocessSprintDates(project);
    dispatch(getProjectSuccess(project));
  }).catch((err) => {
    dispatch(userUpdatedFailure(err));
  });
};

export function getSprintsFromDb(sprintIds) {
  DebugLog('sprintIds', sprintIds);
  return new Promise((resolve, reject) => {
    const db = FirebaseUtil.getFirebase().database();
    let sprintCalls = [];
    for (let i = 0; i < sprintIds.length; i += 1) {
      DebugLog('sprintIds[i]',sprintIds[i]);
      sprintCalls.push(db.ref('sprints/' + sprintIds[i]).once('value'));
    }
    Promise.all(sprintCalls).then((sprintResponses) => {
      let sprints = [];
      for (let i = 0; i < sprintResponses.length; i += 1) {
        let sprint = sprintResponses[i].val();
        DebugLog('sprint',sprint);
        if (Array.isArray(sprint.tasks)) {
          let taskCalls = [];
          for (let j = 0; j < sprint.tasks.length; j += 1) {
            DebugLog('sprint.tasks[j]',sprint.tasks[j]);
            taskCalls.push(db.ref('tasks/' + sprint.tasks[j]).once('value'));
          }
          Promise.all(taskCalls).then((taskResults) => {
            DebugLog('taskResults', taskResults);
            let tasks = [];
            for (let k = 0; k < taskResults.length; k += 1) {
              let task = taskResults[k].val();
              DebugLog('task',task);
              tasks.push(taskResults[k].val());
            }
            tasks.sort(taskComparatorDesc);
            sprint.tasks = tasks;
            sprints.push(sprint);
            if (sprints.length === sprintIds.length) {
              resolve(sprints);
            }
          });
        } else {
          sprint.tasks = [];
          sprints.push(sprint);
          DebugLog('sprint',sprint);
          DebugLog('sprints',sprints);
          if (sprints.length === sprintIds.length) {
            resolve(sprints);
          }
        }
      }
    });
  });
}

export function getTasksFromDb(taskList) {
  return new Promise((resolve, reject) => {
    getTasks(taskList)((dispatchResult) => {
      if (dispatchResult.type === TASKS.GET.SUCCESS) {
        resolve(dispatchResult.tasks);
      } else {
        reject(dispatchResult);
      }
    });
  });
}

export function getProjectFromDb(projectId, dispatch, isPostTaskManipulation) {
  if (isPostTaskManipulation === undefined)
    dispatch(getProjectLoading());

  const db = FirebaseUtil.getFirebase().database();
  db.ref('projects/' + projectId).once('value').then((projectSnap) => {
    // DebugLog('projectSnap.val()', projectSnap.val());
    let project = projectSnap.val();
    let projectCalls = [];
    if (project && Array.isArray(project.sprints)) {
      // DebugLog('project.sprints',project.sprints);
      projectCalls.push(getSprintsFromDb(project.sprints));
    }
    if (project && Array.isArray(project.backlog)) {
      // DebugLog('project.backlog',project.backlog);
      projectCalls.push(getTasksFromDb(project.backlog));
    }
    Promise.all(projectCalls).then((projectResults) => {
      // DebugLog('projectResults',projectResults);
      let sprints = projectResults[0];
      let backlog = projectResults[1] || [];
      project.sprints = sprints;
      project.backlog = backlog;
      project = preprocessSprintDates(project);
      dispatch(getProjectSuccess(project));
    });
  }).catch((err) => {
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
            DebugLog('dbUser.projects', dbUser.projects);
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
            initializeUserObjectsInDb(result, dispatch);
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
  if (a.createdOn < b.createdOn)
    return 1;
  if (a.createdOn > b.createdOn)
    return -1;
  return 0;
}

export function getTasks(taskList) {
  return function(dispatch) {
    let calls = [];
    let db = FirebaseUtil.getFirebase().database();
    for (let i = 0; i < taskList.length; i += 1) {
      calls.push(db.ref('tasks/' + taskList[i]).once('value'));
    }
    Promise.all(calls).then((results) => {
      let tasks = [];
      for (let i = 0; i < results.length; i += 1) {
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
 * task : ./Models/Task.js
 * At least one of projectId or sprintId is required.
 */
export function createTask(task) {
  return function(dispatch) {
    DebugLog('Action createTask', task);
    dispatch(createTaskLoading());
    let db = FirebaseUtil.getFirebase().database();
    const taskRef = db.ref('tasks/').push();
    task.id = taskRef.key;
    if (task.sprint && task.sprint !== 'backlog') { //save to sprint
      db.ref('sprints/' + task.sprint).once('value').then((sprintSnap) => {
        let destSprint = sprintSnap.val();
        if (destSprint) {
          destSprint.tasks = Array.isArray(destSprint.tasks) ? destSprint.tasks : [];
          destSprint.tasks.push(taskRef.key);
          let sprintCalls = [];
          sprintCalls.push(db.ref('tasks/' + taskRef.key).set(task));
          sprintCalls.push(db.ref('sprints/' + task.sprint).set(destSprint));
          Promise.all(sprintCalls).then((responses) => {
            dispatch(createTaskSuccess(task));
            dispatch(createTaskCloseModal());
            dispatch(getProject(task.project, true));
          }).catch((err) => {
            dispatch(createTaskFailure(task, err));
          });
        } else {
          dispatch(createTaskFailure(task, 'Destination sprint does not exist.'));
        }
      }).catch((err) => {
        dispatch(createTaskFailure(task, err));
      });
    } else if (task.project) { //save to backlog since no sprint specified
      db.ref('projects/' + task.project).once('value').then((projectSnap) => {
        let destProject = projectSnap.val();
        if (destProject) {
          destProject.backlog = Array.isArray(destProject.backlog) ? destProject.backlog : [];
          destProject.backlog.push(taskRef.key);
          let projectCalls = [];
          projectCalls.push(db.ref('tasks/' + taskRef.key).set(task));
          projectCalls.push(db.ref('projects/' + task.project).set(destProject));
          Promise.all(projectCalls).then((responses) => {
            dispatch(createTaskSuccess(task));
            dispatch(createTaskCloseModal());
            dispatch(getProject(task.project, true));
          }).catch((err) => {
            dispatch(createTaskFailure(task, err));
          });
        } else {
          dispatch(createTaskFailure(task, 'Destination project does not exist.'));
        }
      }).catch((err) => {
        dispatch(createTaskFailure(task, err));
      });
    }
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
  //FIXME:
  return function(dispatch) {
    DebugLog('Action updateTask', task);
    DebugLog('prevSprintId', prevSprintId);
    dispatch(updateTaskLoading());
    let db = FirebaseUtil.getFirebase().database();
    const taskRef = db.ref('tasks/' + task.id).set(task);

    //TODO: for future: did the user change the project???

    if (prevSprintId !== task.sprint){
      DebugLog('sprint has changed');
      if (prevSprintId === null || prevSprintId === 'backlog'){
        DebugLog('BACKLOG-->SPRINT'); //task was in backlog, and did not live any sprint
        //delete from project object
        db.ref('projects/'+task.project).once('value').then((projectSnap)=>{
          let project = projectSnap.val();
          if (project){
            project.backlog = Array.isArray(project.backlog) ? project.backlog : [];
            project.backlog = project.backlog.filter(t => t !== task.id); //remove the task
            db.ref('projects/' + task.project).set(project).then(()=>{
              // add task to a sprint
              db.ref('sprints/'+task.sprint).once('value').then((newSprintSnap)=>{
                let destSprint = newSprintSnap.val();
                if (destSprint){
                  destSprint.tasks = Array.isArray(destSprint.tasks) ? destSprint.tasks : [];
                  if (destSprint.tasks.indexOf(task.id) === -1){ //check existence
                    destSprint.tasks.push(task.id); //add to the sprint
                    let sprintCalls = [];
                    sprintCalls.push(db.ref('tasks/'+task.id).set(task));
                    sprintCalls.push(db.ref('sprints/'+task.sprint).set(destSprint));
                    Promise.all(sprintCalls).then((responses)=>{
                      dispatch(updateTaskSuccess(task));
                      dispatch(updateTaskClosePanel());
                      dispatch(getProject(task.project, true));
                    }).catch((err)=>{
                      dispatch(updateTaskFailure(task, err));
                    });
                  } else {
                    dispatch(updateTaskFailure(task, 'task already exists in sprint'));
                  }
                }
              }).catch((err)=>{
                dispatch(updateTaskFailure(task, err)); //unable to delete task from previous sprint
              });
            });
          } else {
            dispatch(updateTaskFailure(task, 'Destination project does not exist.'));
          }
        });

      } else {
        //NOTE SPRINT-->BACKLOG OR SPRINT-->SPRINT
        //delete task id from previous sprint, then add to new sprint
        db.ref('sprints/'+prevSprintId).once('value').then((sprintSnap)=>{
          DebugLog('GOT prevSprint', sprintSnap.val());
          let prevSprint = sprintSnap.val();
          if (prevSprint && prevSprint.tasks){
            prevSprint.tasks = Array.isArray(prevSprint.tasks) ? prevSprint.tasks : [];
            //filter out all occurrences of the task
            DebugLog('prevSprint.tasks', prevSprint.tasks);
            prevSprint.tasks = prevSprint.tasks.filter(taskId => taskId !== task.id);

            db.ref('sprints/'+prevSprintId).set(prevSprint).then(() => {
              DebugLog('deleted task from the previous sprint');
              //update the new sprint
              if (task.sprint && task.sprint !== 'backlog') {
                DebugLog('SPRINT-->SPRINT');
                db.ref('sprints/'+task.sprint).once('value').then((newSprintSnap)=>{
                  let destSprint = newSprintSnap.val();
                  DebugLog('destSprint.tasks', destSprint.tasks);
                  DebugLog('taskId', task.id);
                  DebugLog('destSprint.tasks.indexOf(task.id)',destSprint.tasks.indexOf(task.id));
                  if (destSprint){
                    destSprint.tasks = Array.isArray(destSprint.tasks) ? destSprint.tasks : [];
                    if (destSprint.tasks.indexOf(task.id) === -1){ //check existence
                      destSprint.tasks.push(task.id); //add to the sprint
                      let sprintCalls = [];
                      sprintCalls.push(db.ref('tasks/'+task.id).set(task));
                      sprintCalls.push(db.ref('sprints/'+task.sprint).set(destSprint));
                      Promise.all(sprintCalls).then((responses)=>{
                        dispatch(updateTaskSuccess(task));
                        dispatch(updateTaskClosePanel());
                        dispatch(getProject(task.project, true));
                      }).catch((err)=>{
                        dispatch(updateTaskFailure(task, err));
                      });
                    } else {
                      dispatch(updateTaskFailure(task, 'task already exists in sprint'));
                    }
                  }
                }).catch((err)=>{
                  dispatch(updateTaskFailure(task, err)); //unable to delete task from previous sprint
                });
              } else {
                DebugLog('SPRINT-->BACKLOG');
                task.sprint = null;
                db.ref('tasks/'+task.id).set(task).then(()=>{
                  dispatch(updateTaskSuccess(task));
                  dispatch(updateTaskClosePanel());
                  dispatch(getProject(task.project, true));
                }).catch((err)=>{
                  dispatch(updateTaskFailure(task, err));
                });
              }
            }).catch((err) => {
              dispatch(updateTaskFailure(task, err));
            });
          }
        })
      }
    } else {
      DebugLog('SPRINT HAS NOT CHANGED');
      db.ref('tasks/'+task.id).set(task).then(()=>{
        dispatch(updateTaskSuccess(task));
        dispatch(updateTaskClosePanel());
        dispatch(getProject(task.project, true));
      }).catch((err)=>{
        dispatch(updateTaskFailure(task, err));
      });
    }
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

export function getProjectSuccess(project) {
  return {
    type: PROJECT.GET.SUCCESS,
    status: 'Successfully retrieved project.',
    project
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
export function preprocessSprintDates(project) {
  if (!project.sprints) //no sprints
    return project;

  for (let i = 0; i < project.sprints.length; i += 1) {
    project.sprints[i].startDate = convertTimeStampToDate(project.sprints[i].startDate)
    project.sprints[i].endDate = convertTimeStampToDate(project.sprints[i].endDate)
  }

  return project;
}
