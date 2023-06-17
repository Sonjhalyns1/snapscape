// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF7VK-01ptRpH0Hu1e8afpvraaGqT6wBk",
  authDomain: "snapscapes-b3a39.firebaseapp.com",
  projectId: "snapscapes-b3a39",
  storageBucket: "snapscapes-b3a39.appspot.com",
  messagingSenderId: "979152848522",
  appId: "1:979152848522:web:db2820f2812528ad4e4f73"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()