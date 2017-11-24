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

/*
 * Mocks
 */
const task = {
  title: 'mock task',
};

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
					case Actions.USER.LOGIN.LOADING:
						expect(object).toEqual(Actions.loginLoading());
						return;
					case Actions.USER.LOGIN.SUCCESS:
						expect(object).toEqual({
					    type: Actions.USER.LOGIN.SUCCESS,
					    status: 'Successfully logged in',
					    user: { name: 'Mock name' },
					  });
						done();
						break;
					case Actions.USER.LOGIN.FAILURE:
						expect(object).toEqual(Actions.loginFailure());
						done('Should be success.');
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
					    status: {} //TODO: Add error object
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
    it('TASK.CREATE should write task to database', (done)=>{
      const dispatch = function(object) {
        switch(object){
          case Actions.TASK.CREATE.LOADING:
            expect(object).toEqual({
              type: Actions.TASK.CREATE.LOADING,
              status: 'Creating task...',
              task: undefined
            });
            done();
            break;
          case Actions.TASK.CREATE.SUCCESS:
            expect(object).toEqual({
              type: Actions.TASK.CREATE.SUCCESS,
              status: 'Successfully created task.',
              task,
            });
            done();
            break;
          case Actions.TASK.CREATE.FAILURE:
            expect(object).toEqual({
              type: TASK.CREATE.FAILURE,
              status: expect.anything(),
              task,
            });
          default:
            done();
        }
      };
      Actions.createTask(task)(dispatch);
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
  });
});

describe('Actions: TASKS', () => {
  describe('TASKS.GET', ()=>{
    it('TASKS.GET should retrieve tasks from database', (done)=>{
      const dispatch = function(object) {
        switch(object){
          case Actions.TASKS.GET.LOADING:
            expect(object).toEqual({
              type: Actions.TASKS.GET.LOADING,
              status: 'Fetching tasks...',
              filter,
            });
            done();
            break;
          case Actions.TASKS.GET.SUCCESS:
            expect(object).toEqual({
              type: Actions.TASKS.GET.SUCCESS,
              status: 'Successfully retrieved tasks.',
              tasks,
            });
            done();
            break;
          case Actions.TASKS.GET.FAILURE:
            expect(object).toEqual({
              type: Actions.TASKS.GET.FAILURE,
              status: err
            });
          default:
            done();
        }
        if(object && object.tasks) {
          expect(object.tasks['12345']).toEqual({
            title: 'mock task title 1',
          });
          done();
        } else {
          return;
        }
      };
      Actions.getTasks()(dispatch);
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
