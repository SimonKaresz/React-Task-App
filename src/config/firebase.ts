// Import the functions you need from the SDKs you need
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDy7J7h8kVXEkz7vtjKcStFLPIN2R9lRbA",
  authDomain: "react-to-do-app-ea286.firebaseapp.com",
  projectId: "react-to-do-app-ea286",
  storageBucket: "react-to-do-app-ea286.appspot.com",
  messagingSenderId: "695070275273",
  appId: "1:695070275273:web:2d9b667c504b9f795dbf18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);