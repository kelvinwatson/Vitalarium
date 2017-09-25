import * as firebase from 'firebase';

var FirebaseUtil = {
  init: function(){
    var config = {
     apiKey: "AIzaSyBPY4upYrG7KTASEOS8McUXgZii4Mb0Gr4",
     authDomain: "kelvinwatson-53204.firebaseapp.com",
     databaseURL: "https://kelvinwatson-53204.firebaseio.com",
     projectId: "kelvinwatson-53204",
     storageBucket: "kelvinwatson-53204.appspot.com",
     messagingSenderId: "565863015502"
   };
   firebase.initializeApp(config); //synchronous
  },

  getFirebase: function(){
    return firebase;
  }
};

export default FirebaseUtil;
