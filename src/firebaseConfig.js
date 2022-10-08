// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChah1kAOtISl5KqDh3bOXSdRwjG4Xt6Ig",
  authDomain: "mybankr-45af7.firebaseapp.com",
  projectId: "mybankr-45af7",
  storageBucket: "mybankr-45af7.appspot.com",
  messagingSenderId: "595485763992",
  appId: "1:595485763992:web:f9d3afb3ddc8a95fc463ed",
  measurementId: "G-116WH6HZEK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getFirestore(app)

