// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABeLbhcDAtXQ6pYI5sJqxB4YZ597Axu9E",
  authDomain: "nate-port.firebaseapp.com",
  projectId: "nate-port",
  storageBucket: "nate-port.firebasestorage.app",
  messagingSenderId: "713609599285",
  appId: "1:713609599285:web:5851e704e6b1991ff0547c",
  measurementId: "G-HFC6NDRQHG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);