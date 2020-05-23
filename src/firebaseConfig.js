import * as firebase from "firebase";
// import keyConfig from './config';


var config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "luke-42ed0.firebaseapp.com",
    databaseURL: process.env.REACT_APP_API_URL,
    projectId: "luke-42ed0",
    storageBucket: "luke-42ed0.appspot.com",
    messagingSenderId: "125216827995",
    appId: "1:125216827995:web:82d358ba8207f42a182d7e",
    measurementId: "G-SGXR8MMG8E"
};

let firebaseConfig = firebase.initializeApp(config);

export default firebaseConfig;