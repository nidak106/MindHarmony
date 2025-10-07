// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB04aE6kvSp-7m02ejzTg_Hmji7ALI0onk",
  authDomain: "mindauth-11277.firebaseapp.com",
  projectId: "mindauth-11277",
  storageBucket: "mindauth-11277.firebasestorage.app",
  messagingSenderId: "1085580851927",
  appId: "1:1085580851927:web:0e2d19d17941574da2ce92",
  measurementId: "G-2R9QFBSB0G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();