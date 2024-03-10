// Import the functions you need from the SDKs you need --->>>
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDKWYAvnCHYaMnifZ-jze70LUk8wGQayEA',
  authDomain: 'be-otp-proj.firebaseapp.com',
  projectId: 'be-otp-proj',
  storageBucket: 'be-otp-proj.appspot.com',
  messagingSenderId: '236869388566',
  appId: '1:236869388566:web:6b9e2bb5a5a45104e5a837',
  measurementId: 'G-LG3T4SWFBJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
