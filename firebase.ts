// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC205N_DRMeISzBEEm0E_ggyNbDuP9JSuo",
  authDomain: "web-avancefront.firebaseapp.com",
  projectId: "web-avancefront",
  storageBucket: "web-avancefront.appspot.com",
  messagingSenderId: "827309773890",
  appId: "1:827309773890:web:7ccd8d5a4f9564fa7649db",
  measurementId: "G-PZF95Y9KFP"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const db = getFirestore(app);


export {db,auth}