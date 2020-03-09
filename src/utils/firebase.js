// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};

// // Official Recommended Settings
// // Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyBuRc03LvtY55WHAkzyUfaNInvRPsp5Enc",
//   authDomain: "social-pomo-94112.firebaseapp.com",
//   databaseURL: "https://social-pomo-94112.firebaseio.com",
//   projectId: "social-pomo-94112",
//   storageBucket: "social-pomo-94112.appspot.com",
//   messagingSenderId: "105418250972",
//   appId: "1:105418250972:web:ac64214fc0c27528bdf219",
//   measurementId: "G-2JGFMCP86V"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const config = {
  apiKey: "AIzaSyA-EVP5tjgcdoSp6l2KG7azuoq3jsRzl8o",
  authDomain: "pomopal-dev.firebaseapp.com",
  databaseURL: "https://pomopal-dev.firebaseio.com",
  projectId: "pomopal-dev",
  storageBucket: "pomopal-dev.appspot.com",
  messagingSenderId: "504847911416",
};
firebase.initializeApp(config);
// firebase.analytics();
// firebase.firestore().settings(settings);
firebase.firestore().settings({});

export default firebase;
