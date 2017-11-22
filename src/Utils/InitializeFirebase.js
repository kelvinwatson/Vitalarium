import * as firebase from 'firebase';
import mockData from '../Tests/MockData';
import DebugLog from '../Utils/DebugLog';

var FirebaseUtil = {
  init: function(){

    let config;
    if (process.env.NODE_ENV === 'test'){
      var FirebaseServer = require('firebase-server');
      FirebaseServer = new FirebaseServer(5000, 'localhost.firebaseio.test', mockData);
      const config = {
        apiKey: 'fake-api-key-for-testing-purposes-only',
        databaseURL: 'ws://localhost.firebaseio.test:5000'
      };
      firebase.initializeApp(config);
    } else { //test
      config = {
        apiKey: "AIzaSyAZQ0IZnW75Y4e7O2eUmq2F4c1mrXZHe3s",
        authDomain: "vitalarium-ae815.firebaseapp.com",
        databaseURL: "https://vitalarium-ae815.firebaseio.com",
        projectId: "vitalarium-ae815",
        storageBucket: "vitalarium-ae815.appspot.com",
        messagingSenderId: "739292378240"
      };
      firebase.initializeApp(config); //synchronous
    }
  },

  getFirebase: function(){
    return firebase;
  },

  close: function() {
    if (process.env.NODE_ENV === 'test') {
      FirebaseServer.close();
    }
  }
};

export default FirebaseUtil;
