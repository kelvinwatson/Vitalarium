import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as Reducer from '../Reducers';
import * as Actions from '../Actions';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import FirebaseUtil from '../Utils/InitializeFirebase';
import RootReducer from '../Reducers';
import Root from '../Components/Root/Root';
import DebugLog from '../Utils/DebugLog';
import Task from '../Models/Task';

/*
 * Mocks
 */
const task = new Task('12345abc_' + Date.now(), //id
	'Test Task Title inserted from a test', //title
	'This is a test task description (inserted from a task)', //description
	'LARGE', //size
	null, //sprint (null == backlog)
	new Date().setDate(new Date().getDate() + 7), //dueDate
	null, //comments
	Date.now(),
	'12345abc'); //createdOn

const err = { errMsg: 'mock err' };

var getRedirectResult = function(){
	return new Promise((resolve, reject) => {
		resolve({
			credential: {
				accessToken: 'mockToken',
			},
			user: {
				name: 'Mock name'
			}
		})
	});
};

var getRedirectResultFailure = function(){
	return new Promise((resolve, reject) => {
		throw { message: {} };
	});
}

var signOutFailure = function() {
	return new Promise((resolve, reject) => {
		reject();
	});
}

var authStateFailure = function(callback){
  callback(null, {message: {}});
}

beforeAll(() => {
  const store = createStore(
    RootReducer,
    applyMiddleware(
      thunkMiddleware // lets us dispatch() functions
    )
  );
  ReactDOM.render(
    <Root store={store} />,
    document.createElement('root'));
  return FirebaseUtil.init();
});

afterAll(() => {
  FirebaseUtil.close();
});

/*
 * Test Redux actions
 */
describe('Actions: USER', () => {
	describe('USER.LOGIN', () => {
		it('USER.LOGIN should authenticate with Google & return success', (done) => {
			const dispatch = function(object) {
				switch(object.type){
					case Actions.USER.LOGIN.FIRST_TIME:
						expect(object).toEqual(Actions.loginFirstTime());
						return;
					case Actions.USER.LOGIN.LOADING:
						expect(object).toEqual(Actions.loginLoading());
						return;
					case Actions.USER.LOGIN.SUCCESS:
						if(object.user) {
							done();
						}
						break;
					case Actions.USER.LOGIN.FAILURE:
						expect(object).toEqual(Actions.loginFailure());
						done('Should be success.');
						break;
					case Actions.USER.UPDATE.SUCCESS:
						done();
					default:
						break;
				}
			};
      Actions.initializeApp()(dispatch); //required for getRedirectResult listener
			Actions.login('Google')(dispatch);
		});
		it('USER.LOGIN should authenticate with Google & return failure', (done) => {
			const dispatch = function(object) {
				switch(object.type){
					case Actions.USER.LOGIN.LOADING:
						expect(object).toEqual({
					    type: Actions.USER.LOGIN.LOADING,
					    status: 'Logging you in...',
					  });
						done();
						break;
					case Actions.USER.LOGIN.SUCCESS:
						expect(object).toEqual({
					    type: Actions.USER.LOGIN.SUCCESS,
					    status: 'Successfully logged in',
					    user: { name: 'Mock name' },
					  });
						done('Should be failure.');
						break;
					case Actions.USER.LOGIN.FAILURE:
						expect(object).toEqual({
							type: Actions.USER.LOGIN.FAILURE,
							status: {
								message: 'User not found.'
							}
						});
						done();
						break;
				}
			};
			FirebaseUtil.changeAuthStateFunction(authStateFailure);
      Actions.initializeApp()(dispatch); //required for getRedirectResult listener
			Actions.login('Google')(dispatch);
		});
	});
	describe('USER.LOGOUT', () => {
		it('USER.LOGOUT should return sign out success', (done) => {
			const dispatch = function(object) {
				switch(object.type){
					case Actions.USER.LOGOUT.LOADING:
						expect(object).toEqual(Actions.logoutLoading());
						return;
					case Actions.USER.LOGOUT.SUCCESS:
						expect(object).toEqual(Actions.logoutSuccess());
						done();
						break;
					case Actions.USER.LOGOUT.FAILURE:
						expect(object).toEqual(Actions.logoutFailure());
						done('Should be success.');
						break;
				}
			};
			Actions.logout()(dispatch);
		});
	});
});

describe('Actions: TASK', () => {
  describe('TASK.CREATE', ()=>{
    it('TASK.CREATE should add a task to a project backlog in the db', (done)=>{
      const dispatch = function(object) {
        switch(object.type){
          case Actions.TASK.CREATE.LOADING:
            expect(object).toEqual({
              type: Actions.TASK.CREATE.LOADING,
              status: 'Creating task...',
              task: undefined
            });
            done();
            break;
          case Actions.TASK.CREATE.SUCCESS:
						expect(object).toHaveProperty('task.id');
						let db = FirebaseUtil.getFirebase().database();
						db.ref('projects/-Kzxhkha5X75WV4aDRCy').once('value').then((projectSnap) => {
							let project = projectSnap.val();
							expect(project).toHaveProperty('backlog');
							expect(project.backlog.includes(object.task.id)).toEqual(true);
							done();
						}).catch((err) => {
							done(err);
						});
            break;
          case Actions.TASK.CREATE.FAILURE:
            expect(object).toEqual({
              type: TASK.CREATE.FAILURE,
              status: expect.anything(),
              task,
            });
						done('Should be success.');
          default:
						done();
            // done('Unexpected dispatch called');
        }
      };
			let task = new Task(null,
				'Test Title',
				'Test Description',
				'M',
				null,//sprint
				'-Kzxhkha5X75WV4aDRCy',
				null,//dueDate
				null,//comments
				Date.now(),//createdOn
				'MUcd9AkztsMOnrvlXS6gR661AFm2');//createdBy

      Actions.createTask(task)(dispatch);
    });

		it('TASK.CREATE should add a task to a sprint in the db', (done)=>{
      const dispatch = function(object) {
        switch(object.type){
          case Actions.TASK.CREATE.LOADING:
            expect(object).toEqual({
              type: Actions.TASK.CREATE.LOADING,
              status: 'Creating task...',
              task: undefined
            });
            done();
            break;
          case Actions.TASK.CREATE.SUCCESS:
						expect(object).toHaveProperty('task.id');
						let db = FirebaseUtil.getFirebase().database();
						db.ref('sprints/-Kzxhkha5X75WV4aDRCw').once('value').then((sprintSnap) => {
							let sprint = sprintSnap.val();
							expect(sprint).toHaveProperty('tasks');
							expect(sprint.tasks.includes(object.task.id)).toEqual(true);
							done();
						}).catch((err) => {
							done(err);
						});
            break;
          case Actions.TASK.CREATE.FAILURE:
            expect(object).toEqual({
              type: TASK.CREATE.FAILURE,
              status: expect.anything(),
              task,
            });
						done('Should be success.');
          default:
            done();
        }
      };
			let task = new Task(null,
				'Test Title 2',
				'Test Description 2',
				'M',
				'-Kzxhkha5X75WV4aDRCw',//sprint
				null,//project
				null,//dueDate
				null,//comments
				Date.now(),//createdOn
				'MUcd9AkztsMOnrvlXS6gR661AFm2');//createdBy
      Actions.createTask(task)(dispatch);
    });

    it('TASK.CREATE.MODAL should create an open modal action', () => {
      const expectedAction = {
        type: Actions.TASK.CREATE.MODAL.OPEN,
        status: 'Opening create task modal...',
      }
      expect(Actions.createTaskOpenModal()).toEqual(expectedAction);
    });

    it('TASK.CREATE.MODAL should create a close modal action', () => {
      const expectedAction = {
        type: Actions.TASK.CREATE.MODAL.CLOSE.SUCCESS,
        status: 'Closing create task modal...',
      }
      expect(Actions.createTaskCloseModal()).toEqual(expectedAction);
    });

    it('TASK.CREATE.LOADING should create a loading action', () => {
      const expectedAction = {
        type: Actions.TASK.CREATE.LOADING,
        status: 'Creating task...',
        task,
      }
      expect(Actions.createTaskLoading(task)).toEqual(expectedAction);
    });

    it('TASK.CREATE.SUCCESS should create a success action', () => {
      const expectedAction = {
        type: Actions.TASK.CREATE.SUCCESS,
        status: 'Successfully created task.',
        task,
      }
      expect(Actions.createTaskSuccess(task)).toEqual(expectedAction);
    });

    it('TASK.CREATE.FAILURE should create a failure action', () => {
      const expectedAction = {
        type: Actions.TASK.CREATE.FAILURE,
        status: err,
        task,
      }
      expect(Actions.createTaskFailure(task, err)).toEqual(expectedAction);
    });

		it('TASK.CREATE.MODAL.OPEN should create an open modal action', () => {
			const expectedAction = {
				type: Actions.TASK.CREATE.MODAL.OPEN,
		    status: 'Opening create task modal...',
			}
			expect(Actions.createTaskOpenModal()).toEqual(expectedAction);
		});

		it('TASK.CREATE.MODAL.CLOSE should create an close modal action', () => {
			const expectedAction = {
				type: Actions.TASK.CREATE.MODAL.CLOSE.SUCCESS,
				status: 'Closing create task modal...',
			}
			expect(Actions.createTaskCloseModal()).toEqual(expectedAction);
		});

		it('TASK.CREATE.MODAL.CLOSE.WARNING should create a open warning modal action', () => {
			const expectedAction = {
				type: Actions.TASK.CREATE.MODAL.CLOSE.WARNING,
		    status: 'Are you sure you want to delete this task?',
			}
			expect(Actions.createTaskCloseWarningModal()).toEqual(expectedAction);
		});

		it('TASK.CREATE.MODAL.CLOSE.WARNING should create a open warning modal action', () => {
			const expectedAction = {
				type: Actions.TASK.CREATE.MODAL.CLOSE.CANCEL,
				status: 'Returning to task...',
			}
			expect(Actions.createTaskCancelCloseWarningModal()).toEqual(expectedAction);
		});

		it('TASK.CREATE.MODAL.CLOSE.WARNING should create a open warning modal action', () => {
			const expectedAction = {
				type: Actions.TASK.CREATE.MODAL.CLOSE.DELETE,
				status: 'Closing create task modal, all changes lost.',
			}
			expect(Actions.createTaskDeleteCloseWarningModal()).toEqual(expectedAction);
		});
  });
});

describe('Actions: TASKS', () => {
  describe('TASKS.GET', ()=>{
		it('TASKS.GET.SUCCESS should retrieve a sorted list of tasks', (done) => {
			const dispatch = function(object) {
        switch(object.type){
          case Actions.TASKS.GET.LOADING:
            expect(object).toEqual({
              type: Actions.TASKS.GET.LOADING,
              status: 'Fetching tasks...',
            });
            break;
          case Actions.TASKS.GET.SUCCESS:
            expect(Array.isArray(object.tasks) && object.tasks.length > 1).toEqual(true);
            done();
            break;
          case Actions.TASKS.GET.FAILURE:
            expect(object).toEqual({
              type: Actions.TASKS.GET.FAILURE,
              status: err
            });
						done(err);
        }
      };
			//FIXME: Add real task data & update IDs
			Actions.getTasks(['12345_1511635143977', '12345_1511635143980'])(dispatch);
		});

    it('TASKS.GET.LOADING should create a loading action', () => {
      const expectedAction = {
        type: Actions.TASKS.GET.LOADING,
        status: 'Fetching tasks...',
        filter: undefined,
      }
      expect(Actions.getTasksLoading()).toEqual(expectedAction);
    });

    it('TASKS.GET.LOADING should create a loading action', () => {
      const filter = {
        type: 'BACKLOG',
      };
      const expectedAction = {
        type: Actions.TASKS.GET.LOADING,
        status: 'Fetching tasks...',
        filter,
      }
      expect(Actions.getTasksLoading(filter)).toEqual(expectedAction);
    });

    it('TASKS.GET.SUCCESS should create a success action', () => {
      const tasks = [{
        title: 'mock task',
      }];
      const expectedAction = {
        type: Actions.TASKS.GET.SUCCESS,
        status: 'Successfully retrieved tasks.',
        tasks,
      }
      expect(Actions.getTasksSuccess(tasks)).toEqual(expectedAction)
    });

    it('TASKS.GET.FAILURE should create a failure action', () => {
      const expectedAction = {
        type: Actions.TASKS.GET.FAILURE,
        status: 'Mock error!',
      }
      expect(Actions.getTasksFailure('Mock error!')).toEqual(expectedAction)
    });
  });
});

describe('Actions: PROJECT', () => {
  describe('PROJECT.GET', ()=>{

    it('PROJECT.GET.LOADING should create a loading action', () => {
      const expectedAction = {
        type: Actions.PROJECT.GET.LOADING,
        status: 'Fetching project...',
      }
      expect(Actions.getProjectLoading()).toEqual(expectedAction);
    });

    it('PROJECT.GET.SUCCESS should create a success action', () => {
      const project = {
				id: '123',
				sprints: [],
				backlog: [],
				timezone: '123',
			};
      const expectedAction = {
        type: Actions.PROJECT.GET.SUCCESS,
        status: 'Successfully retrieved project.',
				project,
      }
      expect(Actions.getProjectSuccess(project)).toEqual(expectedAction)
    });

    it('PROJECT.GET.FAILURE should create a failure action', () => {
			const err = {
				msg: 'mock err',
			};
			const expectedAction = {
        type: Actions.PROJECT.GET.FAILURE,
        status: 'Failed to get project.',
				err,
      }
      expect(Actions.getProjectFailure(err)).toEqual(expectedAction)
    });
  });
});

/*
 * Misc action utils
 */
describe('Misc Action Utils', ()=>{

	it('preprocessProjectDates should return a sprint with dates processed', () => {
		let mockProject = {};
		mockProject.sprints = [{
			startDate: 1511810873000,
			endDate: 1513020473000
		}, {
			startDate: 1513020474000,
			endDate: 1514230073000
		}]
		expect(Actions.preprocessProjectDates(mockProject)).toEqual({
			sprints: [{
				startDate: '27-Nov-2017',
				endDate: '11-Dec-2017',
			}, {
				startDate: '11-Dec-2017',
				endDate: '25-Dec-2017',
			}]
		});
	});

	it('preprocessTaskDueDate should return a sprint with dates processed', () => {
		let mockTask = { dueDate: '2018-01-01' }
		expect(Actions.preprocessTaskDueDate(mockTask)).toEqual({dueDate: 1514764800000});
	});
});
