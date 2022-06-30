import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYRT_EWNdgdPljvsZotYbI75HaCDLv0PY",
  authDomain: "chat-app-2cac4.firebaseapp.com",
  projectId: "chat-app-2cac4",
  storageBucket: "chat-app-2cac4.appspot.com",
  messagingSenderId: "577519703796",
  appId: "1:577519703796:web:82c0a21e19b18e0baeb0a1",
  measurementId: "G-2SV2D2RXTF"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db=app.firestore();
const auth=app.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {auth,provider,db};

