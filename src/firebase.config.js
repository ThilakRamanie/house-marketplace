// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmfgSEXv0N-6VH7b5PfgtrQwupgpB9oWc",
  authDomain: "house-marketplace-8d2dc.firebaseapp.com",
  projectId: "house-marketplace-8d2dc",
  storageBucket: "house-marketplace-8d2dc.appspot.com",
  messagingSenderId: "130998759705",
  appId: "1:130998759705:web:e539f6680d6902ce089588"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()