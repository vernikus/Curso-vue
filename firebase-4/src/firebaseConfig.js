import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth' //importamos auth la cual es para la autenticasion con los correos
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAayNVDt32Ite9Y-UzcVAAN7FmbEmXCZB4",
  authDomain: "app-firebase-5f4b2.firebaseapp.com",
  projectId: "app-firebase-5f4b2",
  storageBucket: "app-firebase-5f4b2.appspot.com",
  messagingSenderId: "34814062296",
  appId: "1:34814062296:web:bb1f650daea87abbb9f1ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {auth};