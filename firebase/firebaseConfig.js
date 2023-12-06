// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD8yv47IsHHds_P04TaAsnfv7502W4TKU",
  authDomain: "region-skane-1-test.firebaseapp.com",
  projectId: "region-skane-1-test",
  storageBucket: "region-skane-1-test.appspot.com",
  messagingSenderId: "1044801464291",
  appId: "1:1044801464291:web:b8dcaf560972e94ec7a2d6",
  measurementId: "G-52DYB3KW8Q"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const db = getFirestore(FIREBASE_APP);