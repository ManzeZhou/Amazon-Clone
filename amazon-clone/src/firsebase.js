// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDQLBthMzJ2LjAXkIYyDVCr_RFEQnxndQg",
    authDomain: "v2-550c9.firebaseapp.com",
    projectId: "v2-550c9",
    storageBucket: "v2-550c9.appspot.com",
    messagingSenderId: "503241815602",
    appId: "1:503241815602:web:371af727696b691ccd2e2b",
    measurementId: "G-1P5E5YGC9Z"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };