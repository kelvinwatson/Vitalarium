/*
 * Redux
 */
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
describe('Actions: GET_NAVIGATION', () => {
  it('should create an action to get navigation', () => {
    const expectedAction = {
      type: Actions.NAVIGATION.GET,
    }
    expect(Actions.getNavigation()).toEqual(expectedAction)
  })
});


describe('Actions: TASKS', () => {
  describe('TASKS.GET', ()=>{

    it('TASKS.GET should retrieve tasks from database', (done)=>{
      const dispatch = function(object) {
        console.log('Dispatch called: ', object);
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

    it('TASKS.GET.LOADING should create an action to load existing tasks', () => {
      const expectedAction = {
        type: Actions.TASKS.GET.LOADING,
        status: 'Fetching tasks...',
        filter: undefined,
      }
      expect(Actions.getTasksLoading()).toEqual(expectedAction);
    });

    it('TASKS.GET.LOADING should create an action to load filtered tasks', () => {
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
