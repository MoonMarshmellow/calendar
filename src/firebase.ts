// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQGPtapcJs62cXLNq08Vlks2IWpz0m6mE",
  authDomain: "calendar-4e31b.firebaseapp.com",
  projectId: "calendar-4e31b",
  storageBucket: "calendar-4e31b.appspot.com",
  messagingSenderId: "477886244322",
  appId: "1:477886244322:web:e3a537d5ab73467dcb85bb",
  measurementId: "G-91MFR5E8X9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
const auth = getAuth(app)

export {app, firestore, auth}