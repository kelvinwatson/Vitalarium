import * as firebase from 'firebase';
// import DebugLog from '../Utils/DebugLog';

var FirebaseUtil = {
  init: function(){
    let config = {
      apiKey: "AIzaSyAZQ0IZnW75Y4e7O2eUmq2F4c1mrXZHe3s",
      authDomain: "vitalarium-ae815.firebaseapp.com",
      databaseURL: "https://vitalarium-ae815.firebaseio.com",
      projectId: "vitalarium-ae815",
      storageBucket: "vitalarium-ae815.appspot.com",
      messagingSenderId: "739292378240"
    };
    firebase.initializeApp(config); //synchronous
  },

  getFirebase: function(){
    return firebase;
  },

};

export default FirebaseUtil;
