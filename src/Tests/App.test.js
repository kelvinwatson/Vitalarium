import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import FirebaseUtil from '../Utils/InitializeFirebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../Reducers';
import * as Actions from '../Actions';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import Root from '../Components/Root/Root';

it('renders without crashing', () => {
	const store = createStore(
    RootReducer,
    applyMiddleware(
      thunkMiddleware // lets us dispatch() functions
    )
  );
	ReactDOM.render(
    <Root store={store} />,
    document.createElement('root'));
});
