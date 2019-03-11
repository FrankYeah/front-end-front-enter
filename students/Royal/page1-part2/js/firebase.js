  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA394T0ozplwnMVMgWiPPbfL8mubWWy0qI",
    authDomain: "front-end-enter.firebaseapp.com",
    databaseURL: "https://front-end-enter.firebaseio.com",
    projectId: "front-end-enter",
    storageBucket: "front-end-enter.appspot.com",
    messagingSenderId: "361623837884"
  };
  firebase.initializeApp(config);

    let database = firebase.database();
    let storage = firebase.storage();