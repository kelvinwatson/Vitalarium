import * as firebase from 'firebase';
import mockData from './MockData';

var FirebaseServer;

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
		throw { error: 'Mock exception.' };
	});
}

let FirebaseMock = {

	changeRedirectFunction: function(newRedirectFunction) {
		firebase.redirectFunction = newRedirectFunction;
	},
	init: function(){
    let config;
    FirebaseServer = require('firebase-server');
    FirebaseServer = new FirebaseServer(5000, 'localhost.firebaseio.test', mockData);
    config = {
      apiKey: 'fake-api-key-for-testing-purposes-only',
      databaseURL: 'ws://localhost.firebaseio.test:5000',
			authDomain: "vitalarium-ae815.firebaseapp.com",
    };
    firebase.initializeApp(config);
  },
	getFirebase: () => {
		var self = this;
		let auth = function() {
			return {
				signInWithRedirect: function(provider){ return {}; },
				getRedirectResult: firebase.redirectFunction || getRedirectResult
			}
		};
		auth.GoogleAuthProvider = () => { return { mock: 'GoogleAuthProvider' }; };
		auth.FacebookAuthProvider = () => { return { mock: 'FacebookAuthProvider' }; };
		auth.TwitterAuthProvider = () => { return { mock: 'TwitterAuthProvider' }; };
		auth.GithubAuthProvider = () => { return {  mock: 'GithubAuthProvider'}; };
		return {
			auth: auth,
			database: firebase.database
		};
	},
	close: function() {
		if (process.env.NODE_ENV === 'test') {
			FirebaseServer.close();
		}
	}
};

export default FirebaseMock;
